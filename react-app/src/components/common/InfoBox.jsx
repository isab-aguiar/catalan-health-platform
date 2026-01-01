import React from 'react';

export default function InfoBox({
  title,
  children,
  highlight = false,
  className = '',
  icon,
}) {
  return (
    <div
      className={`bg-white rounded-md p-4 sm:p-6 overflow-hidden ${
        highlight
          ? 'border-l-4 border-primary-500 shadow-sm'
          : 'border border-neutral-200 shadow-sm'
      } ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-neutral-200 min-w-0">
          {icon && (
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-50 rounded-md flex items-center justify-center text-primary-700 flex-shrink-0">
              {typeof icon === 'function' ? (
                React.createElement(icon, { size: 16, className: 'sm:w-[18px] sm:h-[18px]' })
              ) : React.isValidElement(icon) ? (
                React.cloneElement(icon, {
                  size: icon.props.size || 16,
                  className: `${icon.props.className || ''} sm:w-[18px] sm:h-[18px]`,
                })
              ) : (
                <span className="text-sm sm:text-base">{icon}</span>
              )}
            </div>
          )}
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate flex-1 min-w-0">{title}</h3>
        </div>
      )}
      <div className="text-sm sm:text-base text-neutral-700 overflow-hidden">{children}</div>
    </div>
  );
}
