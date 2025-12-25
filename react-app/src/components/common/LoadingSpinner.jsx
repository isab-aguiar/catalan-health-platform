import React from "react";
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="ml-4 text-lg text-neutral-700">Carregando...</p>
    </div>
  );
}
