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
      className={`flex p-4 rounded-r-md shadow-sm ${variant.container} ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`w-5 h-5 ${variant.iconColor}`} strokeWidth={2} />
      </div>
      <div className="ml-3 flex-1">
        {title && (
          <h3 className="text-sm font-bold mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm leading-relaxed opacity-90">
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:ring-2 focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Fechar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;
