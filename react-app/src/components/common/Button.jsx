export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-light",
    ghost: "text-primary hover:bg-primary-surface focus:ring-primary-light",
    danger: "bg-error text-white hover:bg-error/90 focus:ring-error/50",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
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
