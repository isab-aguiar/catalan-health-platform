/**
 * PageContainer Component
 * Container padrão para páginas com layout consistente
 */

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`container mx-auto px-4 py-8 max-w-6xl ${className}`}>
      {children}
    </div>
  );
}
