import { lazy } from 'react';

/**
 * Helper function for lazy loading with error handling
 * Wraps lazy() to provide better error messages in production
 */
export function lazyLoad(importFunc, fallback = null) {
  const LazyComponent = lazy(() =>
    importFunc()
      .then((module) => {
        // Ensure we have a default export
        if (!module.default) {
          throw new Error('Component must have a default export');
        }
        return module;
      })
      .catch((error) => {
        console.error('Error loading component:', error);
        // Return a fallback component if available
        if (fallback) {
          return { default: fallback };
        }
        throw error;
      })
  );

  return LazyComponent;
}
