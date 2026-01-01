import { Info, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

const variants = {
  info: {
    container: 'bg-info/10 border-l-4 border-info text-neutral-900',
    icon: Info,
    iconColor: 'text-info',
  },
  success: {
    container: 'bg-success/10 border-l-4 border-success text-neutral-900',
    icon: CheckCircle,
    iconColor: 'text-success',
  },
  warning: {
    container: 'bg-warning/10 border-l-4 border-warning text-neutral-900',
    icon: AlertTriangle,
    iconColor: 'text-warning-dark',
  },
  error: {
    container: 'bg-error/10 border-l-4 border-error text-neutral-900',
    icon: XCircle,
    iconColor: 'text-error',
  },
};

export function Alert({ type = 'info', title, children, onClose, className = '' }) {
  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  return (
    <div
      role="alert"
      className={`flex p-3 sm:p-4 rounded-r-md shadow-sm overflow-hidden ${variant.container} ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${variant.iconColor}`} strokeWidth={2} />
      </div>
      <div className="ml-2 sm:ml-3 flex-1 min-w-0 overflow-hidden">
        {title && (
          <h3 className="text-xs sm:text-sm font-bold mb-1 truncate">
            {title}
          </h3>
        )}
        <div className="text-xs sm:text-sm leading-relaxed opacity-90 line-clamp-4">
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 sm:ml-auto -mx-1 sm:-mx-1.5 -my-1 sm:-my-1.5 p-1 sm:p-1.5 rounded-md focus:ring-2 focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
          aria-label="Fechar alerta"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;
