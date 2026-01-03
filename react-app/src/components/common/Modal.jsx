import { useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
  X,
} from "lucide-react";

const modalConfig = {
  success: {
    icon: CheckCircle,
    iconColor: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-success",
    buttonBg: "bg-success hover:bg-success-dark",
  },
  error: {
    icon: XCircle,
    iconColor: "text-error",
    iconBg: "bg-error/10",
    borderColor: "border-error",
    buttonBg: "bg-error hover:bg-error-dark",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-warning-dark",
    iconBg: "bg-warning/10",
    borderColor: "border-warning",
    buttonBg: "bg-warning hover:bg-warning-dark",
  },
  info: {
    icon: Info,
    iconColor: "text-info",
    iconBg: "bg-info/10",
    borderColor: "border-info",
    buttonBg: "bg-info hover:bg-info-dark",
  },
  confirmation: {
    icon: AlertCircle,
    iconColor: "text-primary-600",
    iconBg: "bg-primary-50",
    borderColor: "border-primary-600",
    buttonBg: "bg-primary-600 hover:bg-primary-700",
  },
};

export default function Modal({
  type = "info",
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  onClose,
}) {
  const config = modalConfig[type] || modalConfig.info;
  const Icon = config.icon;
  const isConfirmation = type === "confirmation";

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onCancel ? onCancel() : onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onCancel || onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-strong max-w-md w-full animate-scale-in overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 pb-3 sm:pb-4">
            <div
              className={`${config.iconBg} rounded-full p-2 sm:p-3 flex-shrink-0`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              {title && (
                <h2
                  id="modal-title"
                  className="text-base sm:text-xl font-bold text-neutral-900 mb-1 sm:mb-2 truncate"
                >
                  {title}
                </h2>
              )}
              {message && (
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line line-clamp-6">
                  {message}
                </p>
              )}
            </div>
            <button
              onClick={onCancel || onClose}
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Fechar modal"
            >
              <X size={18} className="sm:w-5 sm:h-5 text-neutral-600" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 pt-2 border-t border-neutral-100">
            {isConfirmation || onCancel ? (
              <>
                <button
                  onClick={onCancel}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 rounded-lg text-sm sm:text-base font-semibold transition-colors truncate"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors truncate ${config.buttonBg}`}
                  autoFocus
                >
                  {confirmText}
                </button>
              </>
            ) : (
              <button
                onClick={onConfirm || onClose}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors truncate ${config.buttonBg}`}
                autoFocus
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
