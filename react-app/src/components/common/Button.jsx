export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-500',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400',
    outline: 'border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white focus:ring-slate-500',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
    danger: 'bg-error text-white hover:opacity-90 focus:ring-error/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
