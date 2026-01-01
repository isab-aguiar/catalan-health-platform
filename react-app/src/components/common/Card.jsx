import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Card = ({
  title,
  description,
  icon,
  href,
  badge,
  className = '',
  headerAction,
  onClick,
  children,
}) => {
  const IconComponent = icon;
  const isReactComponent =
    icon &&
    (typeof icon === 'function' ||
      (typeof icon === 'object' && icon.$$typeof));

  const cardClasses = `bg-white rounded-md border border-neutral-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-neutral-300 hover:bg-neutral-50 overflow-hidden ${
    onClick || href ? 'cursor-pointer' : ''
  } ${className}`;

  const CardContent = () => (
    <>
      {(icon || badge) && (
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4 px-4 sm:px-6 pt-4 sm:pt-6">
          {icon && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center bg-primary-50 text-primary-700 flex-shrink-0">
              {isReactComponent ? (
                <IconComponent size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
              ) : (
                <span className="text-xl sm:text-2xl">{icon}</span>
              )}
            </div>
          )}
          {badge && (
            <span className="px-2 sm:px-3 py-1 bg-neutral-100 rounded-full text-[10px] sm:text-xs font-semibold text-neutral-700 truncate max-w-[120px] sm:max-w-none flex-shrink-0">
              {badge}
            </span>
          )}
        </div>
      )}

      {children ? (
        <>
          {title && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200 flex justify-between items-center gap-2 bg-white rounded-t-md min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight truncate flex-1 min-w-0">
                {title}
              </h3>
              {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
            </div>
          )}
          <div className="p-4 sm:p-6 text-sm sm:text-base text-neutral-700 leading-relaxed overflow-hidden">
            {children}
          </div>
        </>
      ) : (
        <>
          {title && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200 flex justify-between items-center gap-2 bg-white rounded-t-md min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight truncate flex-1 min-w-0">
                {title}
              </h3>
              {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
            </div>
          )}
          {description && (
            <div className="p-4 sm:p-6 text-sm sm:text-base text-neutral-700 leading-relaxed line-clamp-4">
              {description}
            </div>
          )}
        </>
      )}

      {href && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
          <span className="truncate">Acessar</span>
          <ArrowRight size={14} className="sm:w-4 sm:h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={`group ${cardClasses}`}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={cardClasses}>
      <CardContent />
    </div>
  );
};

export default Card;
