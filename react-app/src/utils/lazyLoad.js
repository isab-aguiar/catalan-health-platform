import { lazy } from "react";
export function lazyLoad(importFunc, fallback = null) {
  const LazyComponent = lazy(() =>
    importFunc()
      .then((module) => {
        if (!module.default) {
          throw new Error("Component must have a default export");
        }
        return module;
      })
      .catch((error) => {
        console.error("Error loading component:", error);
        if (fallback) {
          return { default: fallback };
        }
        throw error;
      })
  );
  return LazyComponent;
}
