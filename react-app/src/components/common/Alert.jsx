import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
export function Alert({ type = "info", children, className = "" }) {
  const types = {
    info: {
      bg: "bg-slate-50 border-slate-300",
      text: "text-slate-800",
      icon: Info,
      iconColor: "text-slate-600",
    },
    warning: {
      bg: "bg-amber-50 border-amber-300",
      text: "text-amber-900",
      icon: AlertTriangle,
      iconColor: "text-amber-700",
    },
    success: {
      bg: "bg-green-50 border-green-300",
      text: "text-green-900",
      icon: CheckCircle,
      iconColor: "text-green-700",
    },
    error: {
      bg: "bg-red-50 border-red-300",
      text: "text-red-900",
      icon: XCircle,
      iconColor: "text-red-700",
    },
  };
  const config = types[type];
  const Icon = config.icon;
  return (
    <div
      role="alert"
      className={`${config.bg} border ${config.text} rounded-md p-4 flex items-start gap-3 ${className}`}
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >
      <Icon
        size={18}
        className={`${config.iconColor} flex-shrink-0 mt-0.5`}
        strokeWidth={2}
      />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
export default Alert;
