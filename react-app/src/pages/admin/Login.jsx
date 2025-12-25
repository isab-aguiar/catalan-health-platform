import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Lock, Mail, AlertCircle, Building2, Eye, EyeOff } from "lucide-react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  // Se já estiver logado, redireciona para o painel
  useEffect(() => {
    if (currentUser) {
      navigate("/admin/painel", { replace: true });
    }
  }, [currentUser, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    setError(""); // Limpa erros anteriores
    setLoading(true); // Ativa estado de carregamento
    // Tenta fazer login
    const result = await login(email, password);
    if (result.success) {
      // Login bem-sucedido! Redireciona para o painel
      navigate("/admin/painel", { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {}
        <div className="bg-white rounded-md shadow-md border border-slate-200 p-8">
          {}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-slate-700 rounded-md flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className="text-lg font-semibold text-slate-900"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  ESF CATALÃO
                </h1>
                <p
                  className="text-xs text-slate-500"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Sistema Interno
                </p>
              </div>
            </div>
            <div className="h-px bg-slate-200 my-4"></div>
            <h2
              className="text-sm font-semibold text-slate-700 uppercase tracking-wide"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              Acesso Restrito
            </h2>
          </div>
          {}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p
                className="text-sm text-red-700"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                {error}
              </p>
            </div>
          )}
          {}
          <form onSubmit={handleSubmit} className="space-y-5">
            {}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-sm"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                  placeholder="usuario@exemplo.com"
                  disabled={loading}
                />
              </div>
            </div>
            {}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-sm"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Autenticando...</span>
                </>
              ) : (
                "Acessar"
              )}
            </button>
          </form>
          {}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-slate-600 hover:text-slate-800 transition-colors"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              ← Voltar
            </a>
          </div>
        </div>
        {}
        <div
          className="mt-4 text-center text-xs text-slate-600"
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        >
          <p>
            Área destinada a profissionais da unidade. Sem acesso? Contate o
            administrador.
          </p>
        </div>
      </div>
    </div>
  );
}
