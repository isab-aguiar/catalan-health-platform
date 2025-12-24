// =========================================
// COMPONENTE MENSAGEM DO CHAT
// =========================================
// Exibe uma mensagem individual do chat (usuário ou IA)

import { User, Bot, AlertCircle, FileText } from 'lucide-react';
import AvisoPreview from './AvisoPreview';

export default function ChatMessage({ message, onCreateAviso, onEditAviso }) {
  const isUser = message.role === 'user';
  const isError = message.isError;

  // Formatar hora
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={`flex gap-2 animate-fade-in ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Compacto */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-teal-100'
            : isError
            ? 'bg-red-100'
            : 'bg-blue-100'
        }`}
      >
        {isUser ? (
          <User className="w-3 h-3 text-teal-600" />
        ) : isError ? (
          <AlertCircle className="w-3 h-3 text-red-600" />
        ) : (
          <Bot className="w-3 h-3 text-blue-600" />
        )}
      </div>

      {/* Conteúdo */}
      <div className={`flex-1 ${isUser ? 'flex flex-col items-end' : ''}`}>
        {/* Balão da mensagem compacto */}
        <div
          className={`inline-block max-w-[85%] rounded-xl px-3 py-2 ${
            isUser
              ? 'bg-teal-600 text-white'
              : isError
              ? 'bg-red-50 text-red-900 border border-red-200'
              : 'bg-white border border-neutral-200 text-neutral-900'
          }`}
        >
          <p className="text-xs whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Preview do Aviso (se houver) */}
        {message.avisoData && !isError && (
          <div className="mt-2 max-w-[85%]">
            <AvisoPreview
              aviso={message.avisoData}
              onCreateAviso={onCreateAviso}
              onEditAviso={onEditAviso}
            />
          </div>
        )}

        {/* Preview de Campanha compacto (se houver) */}
        {message.campanhaData && !isError && (
          <div className="mt-2 max-w-[85%]">
            <div className={`bg-white border-2 rounded-lg shadow-sm overflow-hidden ${
              message.isDraft ? 'border-yellow-300' : 'border-green-300'
            }`}>
              {message.isDraft && (
                <div className="bg-yellow-50 px-3 py-1.5 border-b border-yellow-200">
                  <p className="text-[10px] font-semibold text-yellow-800">
                    ✏️ RASCUNHO - Em edição
                  </p>
                </div>
              )}
              
              {/* Preview de imagem ou PDF */}
              {message.campanhaData.imagemURL && (
                <div className="relative">
                  {/* Se for PDF, mostrar placeholder */}
                  {message.campanhaData.imagemURL.includes('.pdf') ? (
                    <div className="w-full h-32 bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center gap-2 border-b border-red-200">
                      <FileText className="w-8 h-8 text-red-600" />
                      <p className="text-xs font-semibold text-red-800">Documento PDF</p>
                      <a 
                        href={message.campanhaData.imagemURL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        📎 Ver documento original
                      </a>
                    </div>
                  ) : (
                    /* Imagem normal */
                    <img
                      src={message.campanhaData.imagemURL}
                      alt={message.campanhaData.titulo}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        console.error('❌ Erro ao carregar imagem:', message.campanhaData.imagemURL);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-32 bg-red-50 flex items-center justify-center">
                            <p class="text-xs text-red-600">Erro ao carregar imagem</p>
                          </div>
                        `;
                      }}
                      onLoad={() => console.log('✅ Imagem carregada com sucesso')}
                    />
                  )}
                </div>
              )}
              
              {!message.campanhaData.imagemURL && (
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <p className="text-xs text-blue-600">📎 Imagem em processamento...</p>
                </div>
              )}
              
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {message.campanhaData.categoria || 'Campanha'}
                  </span>
                  {message.campanhaData.urgente && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-red-100 text-red-700 rounded">
                      ⚠️ Urgente
                    </span>
                  )}
                  {message.campanhaData.destaque && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                      ⭐ Destaque
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-sm text-neutral-900">
                  {message.campanhaData.titulo}
                </h3>
                
                {message.campanhaData.subtitulo && (
                  <p className="text-xs text-neutral-600 italic">
                    {message.campanhaData.subtitulo}
                  </p>
                )}
                
                <p className="text-xs text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {message.campanhaData.descricao}
                </p>

                {/* Informações adicionais */}
                <div className="pt-2 space-y-1 border-t border-neutral-200">
                  {(message.campanhaData.dataInicio || message.campanhaData.dataFim) && (
                    <div className="flex items-start gap-1">
                      <span className="text-[10px] text-neutral-500">📅</span>
                      <span className="text-[10px] text-neutral-600">
                        {message.campanhaData.dataInicio && new Date(message.campanhaData.dataInicio).toLocaleDateString('pt-BR')}
                        {message.campanhaData.dataFim && ` até ${new Date(message.campanhaData.dataFim).toLocaleDateString('pt-BR')}`}
                      </span>
                    </div>
                  )}
                  
                  {message.campanhaData.horario && (
                    <div className="flex items-start gap-1">
                      <span className="text-[10px] text-neutral-500">🕐</span>
                      <span className="text-[10px] text-neutral-600">{message.campanhaData.horario}</span>
                    </div>
                  )}
                  
                  {message.campanhaData.local && (
                    <div className="flex items-start gap-1">
                      <span className="text-[10px] text-neutral-500">📍</span>
                      <span className="text-[10px] text-neutral-600">{message.campanhaData.local}</span>
                    </div>
                  )}
                  
                  {message.campanhaData.publicoAlvo && (
                    <div className="flex items-start gap-1">
                      <span className="text-[10px] text-neutral-500">👥</span>
                      <span className="text-[10px] text-neutral-600">{message.campanhaData.publicoAlvo}</span>
                    </div>
                  )}
                  
                  {message.campanhaData.contato && (
                    <div className="flex items-start gap-1">
                      <span className="text-[10px] text-neutral-500">📞</span>
                      <span className="text-[10px] text-neutral-600">{message.campanhaData.contato}</span>
                    </div>
                  )}
                  
                  {message.campanhaData.topicos && message.campanhaData.topicos.length > 0 && (
                    <div className="pt-1">
                      <ul className="list-disc list-inside space-y-0.5">
                        {message.campanhaData.topicos.slice(0, 3).map((topico, idx) => (
                          <li key={idx} className="text-[10px] text-neutral-600">{topico}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {message.campanhaData.cta && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-200">
                        Botão: {message.campanhaData.cta}
                      </span>
                    )}
                    {message.campanhaData.paginaDestino && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded border border-purple-200">
                        Página: {message.campanhaData.paginaDestino}
                      </span>
                    )}
                  </div>
                </div>

                {message.isDraft && (
                  <div className="pt-2 border-t border-neutral-200">
                    <p className="text-[10px] text-neutral-600 font-semibold mb-1">
                      💬 Comandos de refinamento:
                    </p>
                    <p className="text-[9px] text-neutral-500 leading-relaxed">
                      "Mude o título para...", "Adicione horário...", "Local: ESF Catalão", 
                      "Público: gestantes", "Marcar como urgente", "Exibir na página de vacinas"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timestamp compacto */}
        <span className="text-[10px] text-neutral-400 mt-0.5 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

