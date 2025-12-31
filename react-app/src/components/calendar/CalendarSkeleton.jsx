import React from 'react';

/**
 * Loading skeleton para o calendário
 */
export default function CalendarSkeleton({ viewMode = 'month' }) {
  if (viewMode === 'month') {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-12 bg-neutral-200 rounded-lg mb-6"></div>

        {/* Controls skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-10 w-32 bg-neutral-200 rounded-lg"></div>
          <div className="h-10 w-48 bg-neutral-200 rounded-lg"></div>
        </div>

        {/* Calendar grid skeleton - Desktop */}
        <div className="hidden md:block">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-8 bg-neutral-100 rounded-md"></div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-neutral-100 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-neutral-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="animate-pulse space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-neutral-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (viewMode === 'dashboard') {
    return (
      <div className="animate-pulse space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-neutral-100 rounded-lg"></div>
          ))}
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-neutral-100 rounded-lg"></div>
          <div className="h-64 bg-neutral-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-neutral-100 rounded-lg"></div>
    </div>
  );
}
