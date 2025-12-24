// =========================================
// COMPONENTE CHAT BOT
// =========================================
// Interface completa do chat com IA

import { useEffect, useRef } from 'react';
import { Bot, Trash2, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useGemini } from '../../hooks/useGemini';

export default function ChatBot({ onCreateAviso, onEditAviso, userId }) {
  const {
    messages,
    loading,
    error,
    draftCampanha,
    sendMessage,
    clearMessages,
    cancelProcessing,
    refineCampanha,
    publishCampanha,
    // Novo sistema de fluxo com botões
    campanhaFlowActive,
    startCampanhaFlow,
    handleFlowButtonClick,
    handleFlowInputSubmit,
    handleFlowFileUpload
  } = useGemini();

  // Wrapper para incluir userId ao enviar
  const handleSend = (data) => {
    console.log('🔵 ChatBot handleSend recebeu:', data);

    // data pode ser string (texto simples) ou objeto { texto, arquivo, tipo }
    const isObject = typeof data === 'object' && data !== null;
    const texto = isObject ? data.texto : data;
    const arquivo = isObject ? data.arquivo : null;

    console.log('📝 Texto:', texto);
    console.log('📎 Arquivo:', arquivo);
    console.log('📋 Draft Campanha:', draftCampanha);
    console.log('🎬 Fluxo Ativo:', campanhaFlowActive);

    // Se o fluxo de botões estiver ativo, ignorar (inputs são tratados por handleFlowInputSubmit)
    if (campanhaFlowActive) {
      console.log('⚠️ Fluxo de botões ativo, mensagem ignorada (usar inputs do fluxo)');
      return;
    }

    // Se tem arquivo de imagem, iniciar NOVO FLUXO COM BOTÕES
    if (arquivo && arquivo.type?.startsWith('image/')) {
      console.log('🎬 Iniciando novo fluxo de campanha com imagem...');
      startCampanhaFlow(arquivo, userId);
      return;
    }

    // Se tem rascunho de campanha e não tem arquivo, é refinamento (SISTEMA ANTIGO)
    if (draftCampanha && !arquivo && texto?.trim()) {
      console.log('✏️ Refinando campanha (sistema antigo)...');
      refineCampanha(texto);
    } else if (arquivo) {
      // Arquivo não-imagem - enviar para análise (SISTEMA ANTIGO)
      console.log('📸 Enviando arquivo para análise (sistema antigo)...');
      console.log('📸 Arquivo detalhes:', {
        name: arquivo.name,
        size: arquivo.size,
        type: arquivo.type
      });
      sendMessage({ arquivo, texto }, userId);
    } else if (texto?.trim()) {
      // Enviar mensagem normal para criar aviso
      console.log('💬 Enviando mensagem de texto...');
      sendMessage(texto, userId);
    } else {
      console.warn('⚠️ Nenhuma ação executada - sem texto nem arquivo');
    }
  };

  // Publicar campanha finalizada
  const handlePublishCampanha = async () => {
    if (!draftCampanha) return;
    
    const result = await publishCampanha(userId);
    if (result) {
      alert('Campanha publicada com sucesso!');
    }
  };

  const messagesEndRef = useRef(null);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mensagem de boas-vindas compacta
  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content: '👋 Olá! Sou o assistente da ESF Catalão.\n\n' +
      '**🆕 Criar Campanha COM IMAGEM (NOVO!):**\n' +
      '1. 📎 Clique e anexe a imagem\n' +
      '2. ✨ Fluxo interativo com botões\n' +
      '3. ✍️ Eu reformulo tudo em linguagem formal\n' +
      '4. ✅ Você aprova cada etapa\n' +
      '5. 🖼️ Adicione mais imagens se quiser\n' +
      '6. 🎉 Preview final e publicação\n\n' +
      '**📝 Criar Aviso/Campanha SEM IMAGEM:**\n' +
      'Digite: **"criar aviso"**\n' +
      '• Faço perguntas interativas\n' +
      '• Você responde cada uma\n' +
      '• Crio tudo prontinho!\n\n' +
      '💬 Também posso conversar normalmente!\n\n' +
      'O que deseja fazer?',
    timestamp: new Date()
  };

  // Todas as mensagens (boas-vindas + histórico)
  const allMessages = messages.length === 0 ? [welcomeMessage] : messages;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-neutral-50 to-white">
      {/* Header Compacto do Chat */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 border-b border-blue-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Chat IA</h2>
              <p className="text-[10px] text-blue-100 leading-tight">
                {loading 
                  ? 'Processando...' 
                  : draftCampanha 
                    ? 'Modo Edição' 
                    : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {draftCampanha && !loading && (
              <button
                onClick={handlePublishCampanha}
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-md transition-colors text-xs font-bold"
                title="Publicar campanha"
              >
                ✅ Publicar
              </button>
            )}
            {loading && (
              <button
                onClick={cancelProcessing}
                className="px-2.5 py-1 bg-red-500 hover:bg-red-600 rounded-md transition-colors text-xs font-semibold flex items-center gap-1"
                title="Cancelar"
              >
                <X className="w-3 h-3" />
                Cancelar
              </button>
            )}
            {messages.length > 0 && !loading && !draftCampanha && (
              <button
                onClick={clearMessages}
                className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors"
                title="Limpar conversa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Área de Mensagens com Scroll - Altura calculada automaticamente */}
      <div className="flex-1 overflow-y-auto px-3 py-3" style={{ height: 0 }}>
        <div className="max-w-3xl mx-auto space-y-3">
          {allMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCreateAviso={onCreateAviso}
              onEditAviso={onEditAviso}
              onButtonClick={handleFlowButtonClick}
              onInputSubmit={handleFlowInputSubmit}
              onFileUpload={(file) => handleFlowFileUpload(file, userId)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Fixo na Base */}
      <div className="flex-shrink-0 border-t border-neutral-200 bg-white">
        <ChatInput
          onSend={handleSend}
          loading={loading}
          disabled={false}
          onCancel={cancelProcessing}
        />
      </div>
    </div>
  );
}

