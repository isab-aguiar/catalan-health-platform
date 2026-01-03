import React from "react";

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center animate-fade-in">
      <div className="mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-100 flex items-center justify-center">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-400" />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-neutral-600 mb-6 max-w-md">
        {message}
      </p>

      {action && <div className="animate-scale-in">{action}</div>}
    </div>
  );
}
