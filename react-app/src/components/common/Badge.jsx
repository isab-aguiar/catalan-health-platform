export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-300',
    primary: 'bg-primary-600 text-white border border-primary-700',
    secondary: 'bg-neutral-200 text-neutral-900 border border-neutral-300',
    warning: 'bg-warning/20 text-warning-dark border border-warning',
    error: 'bg-error/10 text-error border border-error',
    success: 'bg-success/10 text-success-dark border border-success',
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
