import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Componente para exibir estados de erro de forma clara
 */
export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center animate-fade-in">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Erro ao Carregar Eventos
      </h3>

      <p className="text-sm text-red-700 mb-4">
        {error?.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 mx-auto font-medium shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar Novamente
        </button>
      )}
    </div>
  );
}
