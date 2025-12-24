// =========================================
// PÁGINA DE LOGIN
// =========================================
// Tela onde o admin faz login com email e senha

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, AlertCircle, Building2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Se já estiver logado, redireciona para o painel
  useEffect(() => {
    if (currentUser) {
      navigate('/admin/painel', { replace: true });
    }
  }, [currentUser, navigate]);

  // Função que executa quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previne reload da página
    
    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setError('');  // Limpa erros anteriores
    setLoading(true);  // Ativa estado de carregamento

    // Tenta fazer login
    const result = await login(email, password);
    
    if (result.success) {
      // Login bem-sucedido! Redireciona para o painel
      navigate('/admin/painel', { replace: true });
    } else {
      // Mostra mensagem de erro
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card de Login */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary-600">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  ESF CATALÃO
                </h1>
                <p className="text-xs text-neutral-500">Sistema Interno</p>
              </div>
            </div>
            <div className="h-px bg-neutral-200 my-4"></div>
            <h2 className="text-sm font-semibold text-neutral-700">
              Acesso Restrito
            </h2>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                  placeholder="usuario@exemplo.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Autenticando...</span>
                </>
              ) : (
                'Acessar'
              )}
            </button>
          </form>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
            >
              ← Voltar
            </a>
          </div>
        </div>

        {/* Aviso informativo */}
        <div className="mt-4 text-center text-xs text-neutral-600">
          <p>Área destinada a profissionais da unidade. Sem acesso? Contate o administrador.</p>
        </div>

        {/* Rodapé institucional */}
        <div className="mt-3 text-center text-xs text-neutral-500">
          <p>Secretaria Municipal de Saúde</p>
        </div>
      </div>
    </div>
  );
}

