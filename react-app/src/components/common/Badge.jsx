export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}) {
  const variants = {
    default: "bg-neutral-100 text-neutral-800 border border-neutral-300",
    primary: "bg-primary text-white border border-primary-dark",
    secondary: "bg-secondary text-white border border-secondary-dark",
    warning: "bg-warning text-white border border-warning",
    error: "bg-error text-white border border-error",
    success: "bg-success text-white border border-success",
  };
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
  };
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
