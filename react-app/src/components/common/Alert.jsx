import { Info, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

const variants = {
  info: {
    container: 'bg-slate-50 border-l-4 border-slate-300 text-slate-800',
    icon: Info,
    iconColor: 'text-slate-600',
  },
  success: {
    container: 'bg-green-50 border-l-4 border-green-600 text-green-900',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-amber-500 text-amber-900',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  error: {
    container: 'bg-red-50 border-l-4 border-red-600 text-red-900',
    icon: XCircle,
    iconColor: 'text-red-600',
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
