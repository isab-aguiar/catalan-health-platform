// =========================================
// PAINEL ADMINISTRATIVO
// =========================================
// Página principal da área administrativa (após login)

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  Home,
  Bell,
  Settings,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Painel() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Função de logout
  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      setLogoutLoading(true);
      const result = await logout();
      
      if (result.success) {
        navigate('/admin/login', { replace: true });
      } else {
        alert('Erro ao fazer logout. Tente novamente.');
        setLogoutLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Administrativo */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Título */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  Painel Administrativo
                </h1>
                <p className="text-xs text-neutral-500">PSF São José</p>
              </div>
            </div>

            {/* Usuário e Logout */}
            <div className="flex items-center gap-4">
              {/* Info do usuário */}
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-700">Admin</p>
                  <p className="text-xs text-neutral-500">{currentUser?.email}</p>
                </div>
              </div>

              {/* Botão de Logout */}
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Boas-vindas */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Bem-vindo de volta! 👋
              </h2>
              <p className="text-primary-100 mb-4">
                Sistema de gerenciamento do PSF São José
              </p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Login realizado com sucesso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              ETAPA 1
            </h3>
            <p className="text-sm text-neutral-600">
              Sistema de Login Básico
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                ✓ Completo
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <Link
            to="/admin/avisos"
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Bell className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              ETAPA 2
            </h3>
            <p className="text-sm text-neutral-600">
              Sistema de Avisos
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                ✓ Completo
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 opacity-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              ETAPA 3
            </h3>
            <p className="text-sm text-neutral-600">
              Múltiplos Níveis de Acesso
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 bg-neutral-100 px-2 py-1 rounded-full">
                Em breve
              </span>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-8">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-600" />
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/avisos"
              className="flex items-center gap-4 p-4 border-2 border-primary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <Bell className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Gerenciar Avisos</h4>
                <p className="text-sm text-neutral-600">Criar, editar e deletar avisos</p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Informações Úteis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-600" />
            Informações do Sistema
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Email do administrador:</span>
              <span className="font-medium text-neutral-900">{currentUser?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">ID do usuário:</span>
              <span className="font-mono text-xs text-neutral-700">{currentUser?.uid}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Status:</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Link para voltar ao site */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Voltar para o site público
          </a>
        </div>
      </main>
    </div>
  );
}

