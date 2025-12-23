import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Card Component
 * Card reutilizável para exibir serviços, informações, etc.
 */

export default function Card({
  title,
  description,
  icon,
  href,
  badge,
  variant = 'default',
  className = '',
  children,
  colorScheme = 'primary', // nova prop para definir a cor
}) {
  const baseStyles = 'group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white shadow-lg';

  const colorSchemes = {
    primary: 'border-2 border-primary-200',
    secondary: 'border-2 border-secondary-200',
    accent: 'border-2 border-accent-200',
    green: 'border-2 border-green-200',
    default: 'border-2 border-neutral-200',
  };

  const iconBackgrounds = {
    primary: 'bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white',
    secondary: 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-500 group-hover:text-white',
    accent: 'bg-accent-100 text-accent-600 group-hover:bg-accent-500 group-hover:text-white',
    green: 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white',
    default: 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-500 group-hover:text-white',
  };

  const textColors = {
    primary: 'text-primary-600 group-hover:text-primary-700',
    secondary: 'text-secondary-600 group-hover:text-secondary-700',
    accent: 'text-accent-600 group-hover:text-accent-700',
    green: 'text-green-600 group-hover:text-green-700',
    default: 'text-neutral-600 group-hover:text-neutral-700',
  };

  const CardContent = () => {
    // Renderizar ícone (component Lucide ou string)
    const IconComponent = icon;
    // Verificar se é um componente React (tem $$typeof) ou uma função
    const isReactComponent = icon && (typeof icon === 'function' || (typeof icon === 'object' && icon.$$typeof));
    
    // Garantir que colorScheme seja válido
    const validColorScheme = colorSchemes[colorScheme] ? colorScheme : 'default';
    const iconBg = iconBackgrounds[validColorScheme] || iconBackgrounds.default;
    const textColor = textColors[validColorScheme] || textColors.default;

    return (
      <>
        {/* Icon & Badge */}
        {(icon || badge) && (
          <div className="flex items-start justify-between mb-4">
            {icon && (
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${iconBg}`}
              >
                {isReactComponent ? (
                  <IconComponent size={28} strokeWidth={2} />
                ) : (
                  <span className="text-2xl">{icon}</span>
                )}
              </div>
            )}
            {badge && (
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-700">
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        {children || (
          <>
            <h3 className="text-lg font-bold mb-2 line-clamp-2 text-neutral-900">{title}</h3>
            <p className="text-sm mb-4 line-clamp-3 text-neutral-600 leading-relaxed">
              {description}
            </p>
          </>
        )}

        {/* Arrow */}
        {href && (
          <div className={`flex items-center gap-2 text-sm font-semibold ${textColor}`}>
            <span>Acessar</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        )}
      </>
    );
  };

  const validColorScheme = colorSchemes[colorScheme] ? colorScheme : 'default';
  const classes = `${baseStyles} ${colorSchemes[validColorScheme]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={classes}>
      <CardContent />
    </div>
  );
}
