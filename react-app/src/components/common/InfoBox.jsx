/**
 * InfoBox Component
 * Box informativa usada nas páginas de serviços
 * Similar ao estilo do site original
 */

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
      className={`bg-white rounded-lg p-6 ${
        highlight
          ? 'border-l-4 border-primary-500 shadow-md'
          : 'border border-neutral-200 shadow-sm'
      } ${className}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
              {typeof icon === 'function' ? (
                // Icon is a component reference (from ServicesIndex)
                React.createElement(icon, { size: 18 })
              ) : React.isValidElement(icon) ? (
                // Icon is already a JSX element (from service pages)
                React.cloneElement(icon, {
                  size: icon.props.size || 18,
                  className: icon.props.className || ''
                })
              ) : (
                // Icon is a string or other value
                <span>{icon}</span>
              )}
            </div>
          )}
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        </div>
      )}
      <div className="text-neutral-700">{children}</div>
    </div>
  );
}
