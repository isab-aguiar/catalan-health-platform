import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  X,
  FileText,
  XCircle,
} from 'lucide-react';
import { validarArquivo } from '../../services/uploadService';

export default function ChatInput({ onSend, loading, disabled, onCancel }) {
  const [message, setMessage] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [erro, setErro] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validacao = validarArquivo(file);
    if (!validacao.valido) {
      setErro(validacao.erros[0]);
      setTimeout(() => setErro(''), 5000);
      return;
    }
    
    setErro('');
    
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
    setArquivo(file);
  };

  const handleRemoverArquivo = () => {
    setArquivo(null);
    setPreviewURL(null);
    setErro('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = () => {
    if (!loading && !disabled) {
      if (message.trim() || arquivo) {
        const dataToSend = {
          texto: message.trim(),
          arquivo: arquivo,
          tipo: arquivo ? 'campanha' : 'aviso',
        };
        
        onSend(dataToSend);
        setMessage('');
        handleRemoverArquivo();
        
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gov-border">
      <div className="max-w-3xl mx-auto space-y-3">
        {erro && (
          <div className="bg-error/10 border border-red-200 text-red-800 px-3 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 font-medium">{erro}</span>
          </div>
        )}

        {arquivo && (
          <div className="bg-gov-light border border-gov-blue/20 rounded-md p-3 flex items-center gap-3 shadow-sm animate-fadeIn">
            {previewURL ? (
              <img
                src={previewURL}
                alt="Preview"
                className="w-12 h-12 rounded object-cover border border-gov-border"
              />
            ) : (
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center border border-gov-blue/20">
                <FileText className="w-6 h-6 text-gov-blue" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gov-text truncate text-sm">
                {arquivo.name}
              </p>
              <p className="text-xs text-gov-muted">
                {(arquivo.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <button
              onClick={handleRemoverArquivo}
              className="p-1.5 hover:bg-white rounded-full transition-colors text-gov-muted hover:text-error"
              title="Remover arquivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || disabled || arquivo}
            className="p-3 bg-gov-bg hover:bg-gray-100 text-gov-muted hover:text-gov-blue rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gov-border"
            title="Anexar arquivo"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                arquivo
                  ? "Adicione instruções para a Atena (opcional)..."
                  : "Digite sua mensagem..."
              }
              disabled={loading || disabled}
              rows={1}
              className="w-full px-4 py-3 border border-gov-border rounded-lg focus:ring-2 focus:ring-gov-blue focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto text-sm bg-white text-gov-text placeholder-gray-400 shadow-sm"
            />
            {message.length > 0 && (
              <div className="absolute right-2 bottom-2 text-[10px] text-gray-300 pointer-events-none">
                {message.length}/500
              </div>
            )}
          </div>
          
          <button
            onClick={loading ? onCancel : handleSend}
            disabled={(!loading && !message.trim() && !arquivo) || disabled}
            className={`
              p-3 rounded-lg transition-all shadow-sm flex items-center justify-center min-w-[44px]
              ${loading
                ? "bg-error/10 text-error hover:bg-red-100 border border-red-200"
                : "bg-gov-blue hover:bg-gov-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed"
              }
            `}
            title={loading ? "Cancelar processamento" : "Enviar mensagem"}
          >
            {loading ? (
              <XCircle className="w-5 h-5 animate-pulse" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}