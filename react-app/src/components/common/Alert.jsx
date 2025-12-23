import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

/**
 * Alert Component
 * Alertas para mensagens informativas, avisos, erros e sucessos
 */

export default function Alert({ type = 'info', children, className = '' }) {
  const types = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: XCircle,
      iconColor: 'text-red-600',
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`${config.bg} border-2 ${config.text} rounded-lg p-4 flex items-start gap-3 ${className}`}
    >
      <Icon size={20} className={`${config.iconColor} flex-shrink-0 mt-0.5`} strokeWidth={2} />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
