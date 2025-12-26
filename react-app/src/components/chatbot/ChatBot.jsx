import React, { useEffect, useRef } from 'react';
import { Bot, Trash2, X, Check } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useGemini } from '../../hooks/useGemini';

export default function ChatBot({ onCreateAviso, onEditAviso, userId }) {
  const {
    messages,
    loading,
    draftCampanha,
    sendMessage,
    clearMessages,
    cancelProcessing,
    refineCampanha,
    publishCampanha,
  } = useGemini();

  const messagesContainerRef = useRef(null);

  const handleSend = (data) => {
    const isObject = typeof data === 'object' && data !== null;
    const texto = isObject ? data.texto : data;
    const arquivo = isObject ? data.arquivo : null;

    if (draftCampanha && !arquivo && texto?.trim()) {
      refineCampanha(texto);
    } else if (arquivo) {
      sendMessage({ arquivo, texto }, userId);
    } else if (texto?.trim()) {
      sendMessage(texto, userId);
    }
  };

  const handlePublishCampanha = async () => {
    if (!draftCampanha) return;
    const result = await publishCampanha(userId);
    if (result) {
      alert('Campanha publicada com sucesso!');
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scroll({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content:
      "Seja bem-vindo ao atendimento digital da ESF Catalão.\n\n" +
      "Sou Atena, assistente virtual técnica da unidade. Estou habilitada para prestar suporte operacional e informações institucionais.\n\n" +
      "Por favor, descreva sua solicitação.",
    timestamp: new Date(),
  };

  const allMessages = messages.length === 0 ? [welcomeMessage] : messages;

  return (
    <div className="flex flex-col h-full bg-gov-bg">
      <div className="bg-gov-blue text-white px-4 py-3 border-b border-gov-dark/20 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight">
                Assistente Virtual
              </h2>
              <p className="text-xs text-blue-100 font-medium flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`} />
                {loading
                  ? 'Processando...'
                  : draftCampanha
                  ? 'Modo Edição'
                  : 'Atena Online'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {draftCampanha && !loading && (
              <button
                onClick={handlePublishCampanha}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-xs font-bold flex items-center gap-1.5 shadow-sm"
                title="Publicar campanha"
              >
                <Check className="w-3.5 h-3.5" />
                Publicar
              </button>
            )}
            
            {loading && (
              <button
                onClick={cancelProcessing}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors text-xs font-medium flex items-center gap-1.5 border border-white/20"
                title="Cancelar"
              >
                <X className="w-3.5 h-3.5" />
                Cancelar
              </button>
            )}
            
            {messages.length > 0 && !loading && !draftCampanha && (
              <button
                onClick={clearMessages}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-blue-100 hover:text-white"
                title="Limpar conversa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4 h-0 scroll-smooth"
        ref={messagesContainerRef}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {allMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCreateAviso={onCreateAviso}
              onEditAviso={onEditAviso}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gov-border bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSend={handleSend}
            loading={loading}
            disabled={false}
            onCancel={cancelProcessing}
          />
        </div>
      </div>
    </div>
  );
}