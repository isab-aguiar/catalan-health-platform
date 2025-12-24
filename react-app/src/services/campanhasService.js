// =========================================
// SERVIÇO DE GERENCIAMENTO DE CAMPANHAS
// =========================================
// Gerencia campanhas visuais no Firestore

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'campanhas';

/**
 * Cria uma nova campanha
 * @param {Object} campanhaData - Dados da campanha
 * @param {string} userId - ID do usuário criador
 * @param {string} imagemURL - URL da imagem no Storage
 * @param {string} pdfURL - URL do PDF no Storage (opcional)
 * @returns {Promise<Object>} Campanha criada
 */
export const criarCampanha = async (campanhaData, userId, imagemURL, pdfURL) => {
  try {
    // Validar dados obrigatórios
    if (!campanhaData.titulo || !campanhaData.descricao) {
      throw new Error('Título e descrição são obrigatórios');
    }

    // Preparar dados para salvar
    const campanha = {
      // Dados principais
      titulo: campanhaData.titulo.trim(),
      subtitulo: campanhaData.subtitulo?.trim() || null,
      descricao: campanhaData.descricao.trim(),
      
      // Template e categorização
      template: campanhaData.template || 'informativo',
      categoria: campanhaData.categoria || 'campanha',
      
      // Flags
      urgente: campanhaData.urgente || false,
      destaque: campanhaData.destaque !== false, // Default true
      ativo: true,
      exibirNaHomepage: campanhaData.exibirNaHomepage !== false, // Default true
      
      // Datas
      dataInicio: campanhaData.dataInicio 
        ? Timestamp.fromDate(new Date(campanhaData.dataInicio))
        : null,
      dataFim: campanhaData.dataFim 
        ? Timestamp.fromDate(new Date(campanhaData.dataFim))
        : null,
      
      // Informações adicionais
      horario: campanhaData.horario || null,
      local: campanhaData.local || 'ESF Catalão',
      publicoAlvo: campanhaData.publicoAlvo || null,
      topicos: Array.isArray(campanhaData.topicos) ? campanhaData.topicos : [],
      contato: campanhaData.contato || null,
      
      // Call to Action
      cta: campanhaData.cta || 'Saiba Mais',
      paginaDestino: campanhaData.paginaDestino || 'home',
      
      // Imagens (suporte a múltiplas - retrocompatível)
      imagens: campanhaData.imagens || (imagemURL ? [{ url: imagemURL, caminho: campanhaData.imagemCaminho, ordem: 0 }] : []),
      imagemURL: imagemURL || null, // Manter retrocompatibilidade
      imagemCaminho: campanhaData.imagemCaminho || null,

      // PDF
      pdfURL: pdfURL || null,
      pdfNome: campanhaData.pdfNome || null,
      pdfCaminho: campanhaData.pdfCaminho || null,

      // Metadados
      criadoPor: userId,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
      
      // Estatísticas
      visualizacoes: 0,
      cliques: 0
    };

    // Salvar no Firestore
    const campanhasRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(campanhasRef, campanha);

    return {
      success: true,
      id: docRef.id,
      data: { id: docRef.id, ...campanha }
    };

  } catch (error) {
    console.error('Erro ao criar campanha:', error);
    throw new Error(`Falha ao criar campanha: ${error.message}`);
  }
};

/**
 * Busca todas as campanhas
 * @param {Object} filtros - Filtros opcionais
 * @returns {Promise<Array>} Lista de campanhas
 */
export const buscarCampanhas = async (filtros = {}) => {
  try {
    const campanhasRef = collection(db, COLLECTION_NAME);
    let q = query(campanhasRef);

    // Aplicar filtros
    if (filtros.ativo !== undefined) {
      q = query(q, where('ativo', '==', filtros.ativo));
    }

    if (filtros.destaque !== undefined) {
      q = query(q, where('destaque', '==', filtros.destaque));
    }

    if (filtros.categoria) {
      q = query(q, where('categoria', '==', filtros.categoria));
    }

    if (filtros.exibirNaHomepage !== undefined) {
      q = query(q, where('exibirNaHomepage', '==', filtros.exibirNaHomepage));
    }

    // Buscar documentos
    const snapshot = await getDocs(q);
    
    const campanhas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Converter Timestamps para Date
      dataInicio: doc.data().dataInicio?.toDate() || null,
      dataFim: doc.data().dataFim?.toDate() || null,
      criadoEm: doc.data().criadoEm?.toDate() || null,
      atualizadoEm: doc.data().atualizadoEm?.toDate() || null
    }));

    // Ordenar por data de criação (mais recente primeiro)
    campanhas.sort((a, b) => {
      const dateA = a.criadoEm || new Date(0);
      const dateB = b.criadoEm || new Date(0);
      return dateB - dateA;
    });

    // Filtrar por validade (se tem dataFim, verificar se não expirou)
    const campanhasValidas = campanhas.filter(camp => {
      if (!camp.dataFim) return true; // Sem data fim, sempre válida
      return camp.dataFim >= new Date(); // Não expirou
    });

    return campanhasValidas;

  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    throw new Error(`Falha ao buscar campanhas: ${error.message}`);
  }
};

/**
 * Busca campanhas para exibir na home
 * @returns {Promise<Array>} Campanhas ativas para home
 */
export const buscarCampanhasHome = async () => {
  return buscarCampanhas({
    ativo: true,
    exibirNaHomepage: true
  });
};

/**
 * Busca campanhas por página específica
 * @param {string} paginaNome - Nome da página (vacinas, servicos, educacao, etc)
 * @returns {Promise<Array>} Campanhas ativas para a página
 */
export const buscarCampanhasPorPagina = async (paginaNome) => {
  try {
    const campanhasRef = collection(db, COLLECTION_NAME);
    let q = query(
      campanhasRef,
      where('ativo', '==', true),
      where('exibirNaHomepage', '==', false), // Apenas campanhas que NÃO estão na home
      where('paginaDestino', '==', paginaNome)
    );

    const snapshot = await getDocs(q);
    
    const campanhas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataInicio: doc.data().dataInicio?.toDate() || null,
      dataFim: doc.data().dataFim?.toDate() || null,
      criadoEm: doc.data().criadoEm?.toDate() || null,
      atualizadoEm: doc.data().atualizadoEm?.toDate() || null
    }));

    // Ordenar por data de criação
    campanhas.sort((a, b) => {
      const dateA = a.criadoEm || new Date(0);
      const dateB = b.criadoEm || new Date(0);
      return dateB - dateA;
    });

    // Filtrar campanhas válidas
    return campanhas.filter(camp => {
      if (!camp.dataFim) return true;
      return camp.dataFim >= new Date();
    });

  } catch (error) {
    console.error('Erro ao buscar campanhas por página:', error);
    return []; // Retorna array vazio em caso de erro
  }
};

/**
 * Busca campanha por ID
 * @param {string} campanhaId - ID da campanha
 * @returns {Promise<Object>} Campanha encontrada
 */
export const buscarCampanhaPorId = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) {
      throw new Error('Campanha não encontrada');
    }

    const data = campanhaSnap.data();
    return {
      id: campanhaSnap.id,
      ...data,
      dataInicio: data.dataInicio?.toDate() || null,
      dataFim: data.dataFim?.toDate() || null,
      criadoEm: data.criadoEm?.toDate() || null,
      atualizadoEm: data.atualizadoEm?.toDate() || null
    };

  } catch (error) {
    console.error('Erro ao buscar campanha:', error);
    throw new Error(`Falha ao buscar campanha: ${error.message}`);
  }
};

/**
 * Atualiza uma campanha
 * @param {string} campanhaId - ID da campanha
 * @param {Object} dadosAtualizados - Dados para atualizar
 * @returns {Promise<Object>} Resultado da atualização
 */
export const atualizarCampanha = async (campanhaId, dadosAtualizados) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);

    // Preparar dados para atualização
    const updates = {
      ...dadosAtualizados,
      atualizadoEm: serverTimestamp()
    };

    // Converter datas se fornecidas
    if (dadosAtualizados.dataInicio) {
      updates.dataInicio = Timestamp.fromDate(new Date(dadosAtualizados.dataInicio));
    }
    if (dadosAtualizados.dataFim) {
      updates.dataFim = Timestamp.fromDate(new Date(dadosAtualizados.dataFim));
    }

    await updateDoc(campanhaRef, updates);

    return {
      success: true,
      message: 'Campanha atualizada com sucesso'
    };

  } catch (error) {
    console.error('Erro ao atualizar campanha:', error);
    throw new Error(`Falha ao atualizar campanha: ${error.message}`);
  }
};

/**
 * Desativa uma campanha (soft delete)
 * @param {string} campanhaId - ID da campanha
 * @returns {Promise<Object>} Resultado
 */
export const desativarCampanha = async (campanhaId) => {
  return atualizarCampanha(campanhaId, { ativo: false });
};

/**
 * Ativa uma campanha
 * @param {string} campanhaId - ID da campanha
 * @returns {Promise<Object>} Resultado
 */
export const ativarCampanha = async (campanhaId) => {
  return atualizarCampanha(campanhaId, { ativo: true });
};

/**
 * Deleta permanentemente uma campanha
 * @param {string} campanhaId - ID da campanha
 * @returns {Promise<Object>} Resultado
 */
export const deletarCampanha = async (campanhaId) => {
  try {
    if (!db) {
      throw new Error('Firebase não inicializado');
    }

    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    await deleteDoc(campanhaRef);
    
    console.log('✅ Campanha deletada com sucesso:', campanhaId);

    return {
      success: true,
      message: 'Campanha deletada com sucesso'
    };

  } catch (error) {
    console.error('❌ Erro ao deletar campanha:', {
      id: campanhaId,
      error: error.message,
      code: error.code
    });
    throw new Error(`Falha ao deletar campanha: ${error.message}`);
  }
};

/**
 * Incrementa visualizações da campanha
 * @param {string} campanhaId - ID da campanha
 */
export const incrementarVisualizacoes = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanha = await getDoc(campanhaRef);
    
    if (campanha.exists()) {
      const visualizacoesAtuais = campanha.data().visualizacoes || 0;
      await updateDoc(campanhaRef, {
        visualizacoes: visualizacoesAtuais + 1
      });
    }
  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error);
    // Não propagar erro, é só estatística
  }
};

/**
 * Incrementa cliques da campanha
 * @param {string} campanhaId - ID da campanha
 */
export const incrementarCliques = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanha = await getDoc(campanhaRef);
    
    if (campanha.exists()) {
      const cliquesAtuais = campanha.data().cliques || 0;
      await updateDoc(campanhaRef, {
        cliques: cliquesAtuais + 1
      });
    }
  } catch (error) {
    console.error('Erro ao incrementar cliques:', error);
    // Não propagar erro, é só estatística
  }
};

export default {
  criarCampanha,
  buscarCampanhas,
  buscarCampanhasHome,
  buscarCampanhaPorId,
  atualizarCampanha,
  desativarCampanha,
  ativarCampanha,
  deletarCampanha,
  incrementarVisualizacoes,
  incrementarCliques
};

