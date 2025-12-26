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
      className={`bg-white rounded-md p-6 ${
        highlight
          ? 'border-l-4 border-slate-500 shadow-sm'
          : 'border border-slate-200 shadow-sm'
      } ${className}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
          {icon && (
            <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center text-slate-700">
              {typeof icon === 'function' ? (
                React.createElement(icon, { size: 18 })
              ) : React.isValidElement(icon) ? (
                React.cloneElement(icon, {
                  size: icon.props.size || 18,
                  className: icon.props.className || '',
                })
              ) : (
                <span>{icon}</span>
              )}
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
      )}
      <div className="text-slate-700">{children}</div>
    </div>
  );
}
