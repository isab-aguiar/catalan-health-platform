import { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  Paperclip,
  X,
  Image,
  FileText,
  XCircle,
} from "lucide-react";
import { validarArquivo, obterInfoArquivo } from "../../services/uploadService";
export default function ChatInput({ onSend, loading, disabled, onCancel }) {
  const [message, setMessage] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [erro, setErro] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  // Auto-resize do textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
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
      setTimeout(() => setErro(""), 5000);
      return;
    }
    // Limpar erro
    setErro("");
    // Criar preview para imagens
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
    setArquivo(file);
  };
  // Remover arquivo selecionado
  const handleRemoverArquivo = () => {
    setArquivo(null);
    setPreviewURL(null);
    setErro("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // Enviar mensagem/arquivo
  const handleSend = () => {
    console.log("🟢 ChatInput handleSend chamado");
    console.log("Loading:", loading, "Disabled:", disabled);
    console.log("Message:", message);
    console.log("Arquivo:", arquivo);
    if (!loading && !disabled) {
      if (message.trim() || arquivo) {
        const dataToSend = {
          texto: message.trim(),
          arquivo: arquivo,
          tipo: arquivo ? "campanha" : "aviso",
        };
        console.log("📤 Enviando dados:", dataToSend);
        console.log(
          "📤 Arquivo sendo enviado:",
          arquivo
            ? {
                name: arquivo.name,
                size: arquivo.size,
                type: arquivo.type,
              }
            : "Nenhum arquivo"
        );
        onSend(dataToSend);
        setMessage("");
        handleRemoverArquivo();
        // Reset altura do textarea
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      } else {
        console.warn("⚠️ Nada para enviar - sem texto nem arquivo");
      }
    } else {
      console.warn("⚠️ Envio bloqueado - loading ou disabled");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="bg-white p-2.5">
      <div className="max-w-3xl mx-auto space-y-2">
        {}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-2.5 py-1.5 rounded-md text-xs flex items-center gap-1.5">
            <X className="w-3 h-3 flex-shrink-0" />
            <span className="flex-1">{erro}</span>
          </div>
        )}
        {}
        {arquivo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-2">
            <div className="flex items-center gap-2">
              {}
              {previewURL && (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-10 h-10 rounded object-cover"
                />
              )}
              {}
              {!previewURL && (
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              )}
              {}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate text-xs">
                  {arquivo.name}
                </p>
                <p className="text-[10px] text-slate-600">
                  {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {}
              <button
                onClick={handleRemoverArquivo}
                className="p-1 hover:bg-blue-100 rounded transition-colors"
                title="Remover arquivo"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
        {}
        <div className="flex items-end gap-2">
          {}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || disabled || arquivo}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            title="Anexar arquivo"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          {}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          {}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                arquivo
                  ? "Instruções extras (opcional)..."
                  : "Digite sua mensagem..."
              }
              disabled={loading || disabled}
              rows={1}
              className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-neutral-100 disabled:cursor-not-allowed max-h-24 overflow-y-auto text-sm"
            />
            {message.length > 0 && (
              <div className="absolute right-2 bottom-2 text-[10px] text-neutral-400">
                {message.length}/500
              </div>
            )}
          </div>
          {}
          <button
            onClick={loading ? onCancel : handleSend}
            disabled={(!loading && !message.trim() && !arquivo) || disabled}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center min-w-[40px] ${
              loading
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
            title={loading ? "Cancelar" : "Enviar"}
          >
            {loading ? (
              <XCircle className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {}
        {!loading && !arquivo && (
          <div className="text-center">
            <p className="text-[10px] text-slate-400">
              <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px]">
                Enter
              </kbd>{" "}
              enviar |{" "}
              <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px]">
                Shift+Enter
              </kbd>{" "}
              nova linha
            </p>
          </div>
        )}
        {}
        {loading && (
          <div className="text-center">
            <span className="text-red-600 font-medium text-[10px] animate-pulse">
              Clique no botão vermelho para cancelar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
