// =========================================
// HOOK useGemini
// =========================================
// Hook para gerenciar estado e interações com o Gemini

import { useState, useCallback, useRef } from 'react';
import { sendMessageToGemini, analyzeImageForCampanha } from '../services/geminiService';
import { prepararParaIA } from '../services/uploadService';
import { uploadArquivo } from '../services/uploadService';
import { criarCampanha } from '../services/campanhasService';
import { useInteractiveForm } from './useInteractiveForm';

/**
 * Hook para usar o serviço Gemini
 * @returns {Object} Estado e funções para interagir com a IA
 */
export function useGemini() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastGeneratedAviso, setLastGeneratedAviso] = useState(null);
  const [draftCampanha, setDraftCampanha] = useState(null); // Rascunho de campanha em edição
  const [uploadedFile, setUploadedFile] = useState(null); // Arquivo já enviado
  const abortControllerRef = useRef(null);
  
  // Sistema de perguntas interativas
  const interactiveForm = useInteractiveForm();

  /**
   * Cancela o processamento atual
   */
  const cancelProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      
      // Adicionar mensagem de cancelamento
      const cancelMsg = {
        id: Date.now(),
        role: 'assistant',
        content: 'Processamento cancelado pelo usuário.',
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, cancelMsg]);
      setLoading(false);
      setError('Cancelado');
    }
  }, []);

  /**
   * Envia uma mensagem para o Gemini
   * @param {string|Object} userMessage - Mensagem do usuário ou objeto com arquivo
   */
  const sendMessage = useCallback(async (userMessage, userId = null) => {
    console.log('🟣 useGemini sendMessage recebeu:', userMessage);
    console.log('🟣 userId:', userId);

    // Extrair texto e arquivo do input (pode ser string ou objeto)
    const isObject = typeof userMessage === 'object' && userMessage !== null && !Array.isArray(userMessage);
    const texto = isObject ? (userMessage.texto || '') : (userMessage || '');
    const arquivo = isObject ? userMessage.arquivo : null;

    console.log('📝 Texto extraído:', texto);
    console.log('📎 Arquivo extraído:', arquivo);

    // Se já está carregando, cancelar
    if (loading && abortControllerRef.current) {
      console.log('⚠️ Já está carregando, cancelando...');
      cancelProcessing();
      return null;
    }

    // Se o fluxo interativo estiver ativo, processar resposta
    if (interactiveForm.isActive) {
      console.log('📝 Fluxo interativo ativo, processando resposta...');
      const result = interactiveForm.processAnswer(texto);

      // Adicionar mensagem do usuário
      const userMsg = {
        id: Date.now(),
        role: 'user',
        content: texto,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMsg]);

      if (result.error) {
        // Resposta inválida
        const errorMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `❌ ${result.error}\n\n${result.question}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMsg]);
        return null;
      }

      if (result.completed) {
        // Fluxo concluído
        const completedMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: '✅ Informações coletadas com sucesso!\n\n**Resumo:**\n' +
            `📍 Página: ${result.data.paginaDestino === 'home' ? 'Homepage' : result.data.paginaDestino}\n` +
            `📌 Título: ${result.data.titulo}\n` +
            `📄 Descrição: ${result.data.descricao.substring(0, 100)}...\n` +
            `🏷️ Categoria: ${result.data.categoria}\n\n` +
            'Deseja criar este conteúdo agora? (Digite "sim" para confirmar)',
          avisoData: result.data,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completedMsg]);
        setLastGeneratedAviso(result.data);
        return result.data;
      }

      // Próxima pergunta
      const nextMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `**Passo ${result.step}/${result.total}**\n\n${result.question}${result.isOptional ? '\n\n_(Opcional - deixe em branco para pular)_' : ''}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, nextMsg]);
      return null;
    }

    // Detectar comando "criar aviso"
    const lowerMsg = texto.trim().toLowerCase();
    if (lowerMsg === 'criar aviso' || lowerMsg === 'novo aviso' || lowerMsg === 'criar campanha') {
      console.log('🆕 Comando detectado: iniciar fluxo interativo');

      // Adicionar mensagem do usuário
      const userMsg = {
        id: Date.now(),
        role: 'user',
        content: texto,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMsg]);

      // Iniciar fluxo
      const flow = interactiveForm.startFlow();

      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `✨ Ótimo! Vou fazer algumas perguntas para criar seu ${lowerMsg.includes('campanha') ? 'campanha' : 'aviso'} profissional.\n\n**Passo ${flow.step}/${flow.total}**\n\n${flow.question}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      return null;
    }

    // Criar novo AbortController
    abortControllerRef.current = new AbortController();

    // Se tiver arquivo, processar campanha
    if (arquivo) {
      console.log('📸 Detectado arquivo, chamando sendCampanha...');
      console.log('📸 Arquivo:', arquivo);
      return await sendCampanha({ arquivo, texto }, userId);
    }

    // Processar como aviso de texto normal
    console.log('💬 Processando como mensagem de texto...');
    if (!texto.trim()) {
      console.error('❌ Mensagem vazia');
      setError('Mensagem não pode estar vazia');
      return null;
    }

    // Adicionar mensagem do usuário
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: texto,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);
    setLastGeneratedAviso(null);

    try {
      // Enviar para Gemini
      const result = await sendMessageToGemini(texto);

      if (result.success) {
        // Verificar se é conversa casual ou geração de aviso
        if (result.isConversation) {
          // Resposta conversacional simples
          const aiMsg = {
            id: Date.now() + 1,
            role: 'assistant',
            content: result.message,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMsg]);
          return null; // Não há aviso gerado
        }

        // Criar mensagem da IA com os dados do aviso
        const aiMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Aviso gerado com sucesso! Confira abaixo:',
          avisoData: result.data,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMsg]);
        setLastGeneratedAviso(result.data);
        
        return result.data;
      } else {
        // Erro da API
        const errorMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Erro: ${result.error}`,
          isError: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMsg]);
        setError(result.error);
        
        return null;
      }

    } catch (err) {
      // Se foi cancelado, não mostrar erro
      if (err.name === 'AbortError' || err.message.includes('cancelado')) {
        return null;
      }

      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Erro inesperado ao processar sua mensagem.',
        isError: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMsg]);
      setError('Erro inesperado');
      
      return null;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [loading, cancelProcessing]);

  /**
   * Processa campanha com imagem/arquivo
   * @param {Object} data - Dados com arquivo e texto opcional
   * @param {string} userId - ID do usuário
   */
  const sendCampanha = useCallback(async (data, userId) => {
    console.log('🟠 sendCampanha iniciado');
    console.log('🟠 Data recebida:', data);
    console.log('🟠 userId:', userId);
    
    const { arquivo, texto } = data;

    console.log('📎 Arquivo extraído:', arquivo);
    console.log('📝 Texto extraído:', texto);

    if (!arquivo) {
      console.error('❌ Nenhum arquivo fornecido!');
      setError('Nenhum arquivo fornecido');
      return null;
    }

    // Adicionar mensagem do usuário
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: texto || 'Enviei uma imagem para análise',
      hasFile: true,
      fileName: arquivo.name,
      timestamp: new Date()
    };

    console.log('💬 Adicionando mensagem do usuário:', userMsg);
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);
    setLastGeneratedAviso(null);
    
    console.log('✅ Estado atualizado, iniciando processamento...');

    try {
      console.log('📤 Iniciando processamento de arquivo:', arquivo.name);
      
      // Preparar arquivo para IA
      console.log('🔄 Preparando arquivo para IA...');
      const arquivoPreparado = await prepararParaIA(arquivo);
      console.log('✅ Arquivo preparado:', arquivoPreparado.tipo);

      // Fazer upload primeiro
      console.log('☁️ Fazendo upload para Firebase Storage...');
      const uploadResult = await uploadArquivo(arquivo, userId);
      if (!uploadResult.sucesso) {
        throw new Error('Falha no upload do arquivo');
      }
      console.log('✅ Upload concluído:', uploadResult.url);

      // Enviar para Gemini 2.5 Flash com timeout de 30 segundos
      console.log('🤖 Enviando para Gemini 2.5 Flash...');
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: A API demorou muito para responder. Tente uma imagem menor ou mais simples.')), 30000)
      );

      const result = await Promise.race([
        analyzeImageForCampanha(
          arquivoPreparado.base64,
          arquivoPreparado.mimeType,
          texto || ''
        ),
        timeoutPromise
      ]);
      
      console.log('✅ Gemini respondeu:', result.success ? 'Sucesso' : 'Erro');

      if (result.success) {
        // NÃO criar campanha ainda - apenas mostrar SUGESTÃO para refinamento
        const campanhaData = {
          ...result.data,
          imagemURL: uploadResult.url
        };

        console.log('📋 Campanha Data criada:', campanhaData);
        console.log('🖼️ URL da imagem:', uploadResult.url);

        // Salvar como rascunho para edição colaborativa
        setDraftCampanha(campanhaData);
        setUploadedFile(uploadResult);

        // Criar mensagem da IA com SUGESTÃO
        const aiMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: '📋 Análise concluída! Criei uma sugestão profissional de campanha.\n\n✏️ COMANDOS DE REFINAMENTO:\n\n📝 Conteúdo:\n• "Mude o título para: [novo título]"\n• "Encurte a descrição"\n• "Adicione que é gratuito"\n\n📍 Local e Horário:\n• "Local: ESF Catalão - Sala de Vacinas"\n• "Horário: 8h às 17h, segunda a sexta"\n\n👥 Público e Datas:\n• "Público-alvo: gestantes"\n• "De 15 a 20 de janeiro de 2025"\n\n⚙️ Configurações:\n• "Marcar como urgente"\n• "Exibir na página de vacinas"\n• "Botão com texto: Agende Agora"\n• "Adicionar telefone (35) 3333-3333"\n\n✅ Quando estiver satisfeito, clique em "Publicar Campanha"',
          campanhaData: campanhaData,
          isDraft: true, // Indica que é rascunho editável
          timestamp: new Date()
        };

        console.log('💬 Mensagem da IA criada:', aiMsg);
        console.log('🖼️ imagemURL na mensagem:', aiMsg.campanhaData?.imagemURL);

        setMessages(prev => [...prev, aiMsg]);
        
        return campanhaData;

      } else {
        // Erro da API
        const errorMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Erro: ${result.error}`,
          isError: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMsg]);
        setError(result.error);
        
        return null;
      }

    } catch (err) {
      // Se foi cancelado, não mostrar erro
      if (err.name === 'AbortError' || err.message.includes('cancelado')) {
        return null;
      }

      console.error('❌ Erro ao processar campanha:', err);

      // Mensagem de erro personalizada
      let errorMessage = err.message;
      
      if (err.message.includes('Firebase Storage não configurado')) {
        errorMessage = '⚠️ Firebase Storage não está configurado!\n\n' +
          'Configure as regras de segurança primeiro:\n' +
          '1. Acesse: https://console.firebase.google.com/\n' +
          '2. Vá em Storage > Rules\n' +
          '3. Veja o arquivo: docs/CONFIGURAR-FIREBASE-STORAGE.md\n\n' +
          'Após configurar, tente novamente.';
      }

      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: errorMessage,
        isError: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMsg]);
      setError(err.message);
      
      return null;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [loading, cancelProcessing]);

  /**
   * Limpa o histórico de mensagens
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setLastGeneratedAviso(null);
  }, []);

  /**
   * Remove o último aviso gerado (para resetar após criar)
   */
  const clearLastAviso = useCallback(() => {
    setLastGeneratedAviso(null);
  }, []);

  /**
   * Refina a campanha com base em feedback do usuário
   */
  const refineCampanha = useCallback(async (feedback) => {
    if (!draftCampanha) {
      setError('Nenhuma campanha em edição');
      return null;
    }

    // Adicionar mensagem do usuário
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: feedback,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      // Criar contexto avançado para refinamento
      const contexto = `
Você é um assistente especializado em refinar campanhas governamentais da ESF Catalão.

CAMPANHA ATUAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Template: ${draftCampanha.template || 'informativo'}
Título: ${draftCampanha.titulo}
Subtítulo: ${draftCampanha.subtitulo || 'N/A'}
Descrição: ${draftCampanha.descricao}
Categoria: ${draftCampanha.categoria}
Urgente: ${draftCampanha.urgente ? 'Sim' : 'Não'}
Destaque: ${draftCampanha.destaque ? 'Sim' : 'Não'}
Data Início: ${draftCampanha.dataInicio || 'N/A'}
Data Fim: ${draftCampanha.dataFim || 'N/A'}
Horário: ${draftCampanha.horario || 'N/A'}
Local: ${draftCampanha.local || 'N/A'}
Público-Alvo: ${draftCampanha.publicoAlvo || 'N/A'}
Tópicos: ${draftCampanha.topicos?.join(', ') || 'N/A'}
Contato: ${draftCampanha.contato || 'N/A'}
CTA (Botão): ${draftCampanha.cta || 'Saiba Mais'}
Página Destino: ${draftCampanha.paginaDestino || 'home'}
Exibir na Homepage: ${draftCampanha.exibirNaHomepage ? 'Sim' : 'Não'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SOLICITAÇÃO DO USUÁRIO:
"${feedback}"

INSTRUÇÕES DE REFINAMENTO:

1. COMANDOS ACEITOS (exemplos):
   - Conteúdo: "Mude o título para...", "Encurte a descrição", "Adicione que..."
   - Local: "Coloque que será na ESF Catalão", "Local: Sala de Vacinas"
   - Horário: "Adicione horário 8h às 17h", "Funciona de segunda a sexta"
   - Público: "Público-alvo: gestantes", "Para idosos acima de 60 anos"
   - Datas: "De 15 a 20 de janeiro", "Válido até 31/12"
   - Página: "Exibir na página de vacinas", "Mostrar em educação"
   - Urgência: "Marcar como urgente", "Destacar na home"
   - Categoria: "Mudar para vacina/material/campanha"
   - Botão CTA: "Botão com texto: Agende Agora"
   - Contato: "Adicionar telefone (35) 3333-3333"

2. PÁGINAS DISPONÍVEIS:
   - "home": Página inicial (padrão)
   - "vacinas": Seção de vacinas
   - "servicos": Serviços oferecidos
   - "educacao": Educação em saúde

3. TEMPLATES DISPONÍVEIS:
   - "vacinacao": Campanhas de vacinação
   - "material": Avisos sobre materiais/medicamentos
   - "educacao": Atividades educativas
   - "evento": Eventos e ações
   - "urgente": Avisos urgentes
   - "informativo": Informações gerais

4. REGRAS:
   - Mantenha tom FORMAL e PROFISSIONAL
   - NÃO invente informações - apenas ajuste o que foi solicitado
   - Se não entender, mantenha o campo original
   - Priorize CLAREZA e OBJETIVIDADE
   - Use português correto

FORMATO DE RESPOSTA (JSON COMPLETO):
{
  "template": "vacinacao|material|educacao|evento|urgente|informativo",
  "titulo": "Título atualizado (máx 80 caracteres)",
  "subtitulo": "Subtítulo complementar (opcional)",
  "descricao": "Descrição completa e profissional (200-500 caracteres)",
  "categoria": "vacina|material|campanha",
  "urgente": true ou false,
  "destaque": true ou false,
  "dataInicio": "YYYY-MM-DD ou null",
  "dataFim": "YYYY-MM-DD ou null",
  "horario": "Horário de funcionamento",
  "local": "Local específico",
  "publicoAlvo": "Público-alvo específico",
  "topicos": ["tópico 1", "tópico 2", "tópico 3"],
  "contato": "Telefone ou contato",
  "cta": "Texto do botão de ação",
  "paginaDestino": "home|vacinas|servicos|educacao",
  "exibirNaHomepage": true ou false
}

Retorne APENAS o JSON com TODOS os campos atualizados conforme solicitação.
`;

      const result = await sendMessageToGemini(contexto);

      if (result.success) {
        // Se for conversa, não atualizar campanha
        if (result.isConversation) {
          const aiMsg = {
            id: Date.now() + 1,
            role: 'assistant',
            content: result.message + '\n\n💡 Para refinar a campanha, seja mais específico. Exemplo: "Mude o título para..."',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMsg]);
          return null;
        }

        // Atualizar rascunho com os dados retornados
        const campanhaAtualizada = {
          ...draftCampanha,
          ...result.data
        };

        setDraftCampanha(campanhaAtualizada);

        // Criar mensagem da IA
        const aiMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: '✅ Campanha atualizada! Confira as mudanças abaixo.\n\nPode pedir mais ajustes ou clicar em "Publicar Campanha".',
          campanhaData: campanhaAtualizada,
          isDraft: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMsg]);
        
        return campanhaAtualizada;
      } else {
        throw new Error(result.error);
      }

    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Erro ao refinar: ${err.message}. Tente reformular seu pedido.`,
        isError: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMsg]);
      setError(err.message);
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [draftCampanha]);

  /**
   * Publica a campanha finalizada no Firestore
   */
  const publishCampanha = useCallback(async (userId) => {
    if (!draftCampanha) {
      setError('Nenhuma campanha para publicar');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Criar campanha no Firestore
      const campanhaResult = await criarCampanha(
        draftCampanha,
        userId,
        draftCampanha.imagemURL
      );

      // Mensagem de sucesso
      const successMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '🎉 Campanha publicada com sucesso na página inicial!',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, successMsg]);
      
      // Limpar rascunho
      setDraftCampanha(null);
      setUploadedFile(null);
      
      return {
        ...draftCampanha,
        id: campanhaResult.id
      };

    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Erro ao publicar campanha: ${err.message}`,
        isError: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMsg]);
      setError(err.message);
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [draftCampanha]);

  return {
    messages,
    loading,
    error,
    lastGeneratedAviso,
    draftCampanha,
    sendMessage,
    clearMessages,
    clearLastAviso,
    cancelProcessing,
    refineCampanha,
    publishCampanha
  };
}

