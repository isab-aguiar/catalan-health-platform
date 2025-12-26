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

  const cardClasses = `bg-white rounded-md border border-neutral-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-neutral-300 hover:bg-neutral-50 ${
    onClick || href ? 'cursor-pointer' : ''
  } ${className}`;

  const CardContent = () => (
    <>
      {(icon || badge) && (
        <div className="flex items-start justify-between mb-4 px-6 pt-6">
          {icon && (
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary-50 text-primary-700">
              {isReactComponent ? (
                <IconComponent size={24} strokeWidth={2} />
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

      {children ? (
        <>
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center bg-white rounded-t-md">
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                {title}
              </h3>
              {headerAction && <div>{headerAction}</div>}
            </div>
          )}
          <div className="p-6 text-neutral-700 leading-relaxed">
            {children}
          </div>
        </>
      ) : (
        <>
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center bg-white rounded-t-md">
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                {title}
              </h3>
              {headerAction && <div>{headerAction}</div>}
            </div>
          )}
          {description && (
            <div className="p-6 text-neutral-700 leading-relaxed">
              {description}
            </div>
          )}
        </>
      )}

      {href && (
        <div className="px-6 pb-6 flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
          <span>Acessar</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
