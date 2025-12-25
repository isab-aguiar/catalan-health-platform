import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    });
  }
  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      const isDev = import.meta.env.DEV;
      return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Ops! Algo deu errado
            </h1>
            <p className="text-neutral-600 mb-6">
              Não foi possível carregar esta página. Por favor, tente novamente.
            </p>
            {isDev && error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-semibold text-red-800 mb-2">
                  Detalhes do erro (modo desenvolvimento):
                </p>
                <p className="text-xs text-red-700 font-mono break-all">
                  {error.toString()}
                </p>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-600 cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="text-xs text-red-700 mt-2 overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = "/";
                }}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
              >
                Voltar para Início
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg font-semibold transition-colors"
              >
                Recarregar
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
