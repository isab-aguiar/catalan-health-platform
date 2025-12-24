// =========================================
// SERVIÇO DE UPLOAD DE ARQUIVOS
// =========================================
// Gerencia upload para Firebase Storage e processamento com IA

import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Tipos de arquivo permitidos
export const TIPOS_PERMITIDOS = {
  imagens: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  pdf: ['application/pdf']
};

// Tamanho máximo: 10MB
export const TAMANHO_MAXIMO = 10 * 1024 * 1024;

/**
 * Valida se o arquivo é permitido
 */
export const validarArquivo = (file) => {
  const erros = [];

  // Verifica se existe
  if (!file) {
    erros.push('Nenhum arquivo selecionado');
    return { valido: false, erros };
  }

  // Verifica tipo
  const todosOsTipos = [
    ...TIPOS_PERMITIDOS.imagens,
    ...TIPOS_PERMITIDOS.pdf
  ];

  if (!todosOsTipos.includes(file.type)) {
    erros.push('Tipo de arquivo não permitido. Use apenas: imagens (JPG, PNG, WebP, GIF) ou PDF');
  }

  // Verifica tamanho
  if (file.size > TAMANHO_MAXIMO) {
    const tamanhoMB = (file.size / (1024 * 1024)).toFixed(2);
    erros.push(`Arquivo muito grande (${tamanhoMB}MB). Máximo permitido: 10MB`);
  }

  return {
    valido: erros.length === 0,
    erros
  };
};

/**
 * Detecta o tipo de arquivo
 */
export const detectarTipoArquivo = (file) => {
  if (TIPOS_PERMITIDOS.imagens.includes(file.type)) {
    return 'imagem';
  }
  if (TIPOS_PERMITIDOS.pdf.includes(file.type)) {
    return 'pdf';
  }
  return 'desconhecido';
};

/**
 * Upload de arquivo para Firebase Storage
 */
export const uploadArquivo = async (file, userId) => {
  try {
    // Validar arquivo
    const validacao = validarArquivo(file);
    if (!validacao.valido) {
      throw new Error(validacao.erros.join('. '));
    }

    // Gerar nome único
    const timestamp = Date.now();
    const nomeSeguro = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const caminho = `campanhas/${userId}/${timestamp}_${nomeSeguro}`;

    // Criar referência
    const storageRef = ref(storage, caminho);

    // Fazer upload
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        originalName: file.name
      }
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Obter URL de download
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      sucesso: true,
      url: downloadURL,
      caminho: caminho,
      nome: file.name,
      tipo: detectarTipoArquivo(file),
      tamanho: file.size,
      metadata: snapshot.metadata
    };

  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    
    // Mensagens de erro mais amigáveis
    if (error.code === 'storage/unauthorized' || error.message.includes('403')) {
      throw new Error('Sem permissão para fazer upload. Verifique as regras do Firebase Storage.');
    }
    
    if (error.code === 'storage/unknown' || error.message.includes('404')) {
      throw new Error('Firebase Storage não configurado. Configure as regras de segurança primeiro. Veja: docs/CONFIGURAR-FIREBASE-STORAGE.md');
    }
    
    if (error.code === 'storage/quota-exceeded') {
      throw new Error('Limite de armazenamento excedido no Firebase.');
    }
    
    if (error.code === 'storage/canceled') {
      throw new Error('Upload cancelado.');
    }
    
    throw new Error(`Falha no upload: ${error.message}`);
  }
};

/**
 * Deleta arquivo do Storage
 */
export const deletarArquivo = async (caminho) => {
  try {
    const storageRef = ref(storage, caminho);
    await deleteObject(storageRef);
    return { sucesso: true };
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    throw new Error(`Falha ao deletar: ${error.message}`);
  }
};

/**
 * Comprime e redimensiona imagem para processamento ultra-rápido
 */
const comprimirImagem = async (file, maxWidth = 1024, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensiona proporcionalmente
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Converte para blob JPEG comprimido
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(`✅ Imagem comprimida: ${(file.size / 1024).toFixed(0)}KB → ${(blob.size / 1024).toFixed(0)}KB`);
              resolve(blob);
            } else {
              reject(new Error('Falha na compressão'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Erro ao carregar imagem'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsDataURL(file);
  });
};

/**
 * Converte arquivo para Base64 (para enviar para Gemini)
 */
export const arquivoParaBase64 = async (file) => {
  let arquivoFinal = file;
  
  // Se for imagem, comprimir para velocidade MÁXIMA
  if (TIPOS_PERMITIDOS.imagens.includes(file.type)) {
    try {
      // Sempre comprimir imagens > 300KB para resposta instantânea
      if (file.size > 300000) {
        console.log('🔄 Otimizando imagem para processamento instantâneo...');
        arquivoFinal = await comprimirImagem(file, 1024, 0.7);
      }
    } catch (error) {
      console.warn('⚠️ Falha na compressão, usando original:', error);
      arquivoFinal = file;
    }
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Remove o prefixo "data:image/jpeg;base64," etc
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    
    reader.onerror = (error) => {
      reject(new Error(`Erro ao ler arquivo: ${error}`));
    };
    
    reader.readAsDataURL(arquivoFinal);
  });
};

/**
 * Prepara arquivo para análise da IA
 */
export const prepararParaIA = async (file) => {
  try {
    const tipo = detectarTipoArquivo(file);
    
    // Para imagens, converte para base64
    if (tipo === 'imagem') {
      const base64 = await arquivoParaBase64(file);
      return {
        tipo: 'imagem',
        mimeType: file.type,
        base64: base64,
        nome: file.name
      };
    }

    // Para PDFs - usando Gemini 2.5 Flash
    if (tipo === 'pdf') {
      console.log('📄 Processando PDF com Gemini 2.5 Flash...');
      const base64 = await arquivoParaBase64(file);
      
      return {
        tipo: 'pdf',
        mimeType: file.type,
        base64: base64,
        nome: file.name
      };
    }

    // Outros tipos não suportados
    throw new Error(`Tipo de arquivo não suportado para análise: ${tipo}. Use apenas imagens (JPG, PNG, WebP, GIF) ou PDF.`);

  } catch (error) {
    console.error('Erro ao preparar arquivo:', error);
    throw error;
  }
};

/**
 * Obtém informações do arquivo sem fazer upload
 */
export const obterInfoArquivo = (file) => {
  return {
    nome: file.name,
    tipo: detectarTipoArquivo(file),
    mimeType: file.type,
    tamanho: file.size,
    tamanhoFormatado: formatarTamanho(file.size),
    ultimaModificacao: new Date(file.lastModified).toLocaleString('pt-BR')
  };
};

/**
 * Formata tamanho de arquivo para exibição
 */
const formatarTamanho = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

/**
 * Valida dimensões de imagem (opcional)
 */
export const validarDimensoesImagem = (file) => {
  return new Promise((resolve) => {
    if (!TIPOS_PERMITIDOS.imagens.includes(file.type)) {
      resolve({ valido: true }); // Não é imagem, não precisa validar
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const dimensoes = {
        largura: img.width,
        altura: img.height,
        aspectRatio: (img.width / img.height).toFixed(2)
      };

      // Recomendações para campanhas
      const recomendacoes = [];
      if (img.width < 800) {
        recomendacoes.push('Imagem com baixa resolução. Recomendado: mínimo 800px de largura');
      }
      if (img.width / img.height < 1.5 || img.width / img.height > 2.5) {
        recomendacoes.push('Proporção não ideal para banner. Recomendado: 16:9 ou 2:1');
      }

      resolve({
        valido: true,
        dimensoes,
        recomendacoes
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valido: false,
        erro: 'Não foi possível carregar a imagem'
      });
    };

    img.src = url;
  });
};

export default {
  validarArquivo,
  detectarTipoArquivo,
  uploadArquivo,
  deletarArquivo,
  arquivoParaBase64,
  prepararParaIA,
  obterInfoArquivo,
  validarDimensoesImagem,
  TIPOS_PERMITIDOS,
  TAMANHO_MAXIMO
};

