export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border border-slate-300',
    primary: 'bg-slate-700 text-white border border-slate-800',
    secondary: 'bg-slate-200 text-slate-900 border border-slate-300',
    warning: 'bg-amber-100 text-amber-900 border border-amber-300',
    error: 'bg-error text-white border border-error',
    success: 'bg-green-100 text-green-900 border border-green-300',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md shadow-sm ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
