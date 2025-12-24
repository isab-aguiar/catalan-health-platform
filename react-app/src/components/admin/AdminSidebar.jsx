// =========================================
// SIDEBAR ADMINISTRATIVO
// =========================================
// Barra lateral de navegação do painel administrativo

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import {
  LayoutDashboard,
  Bell,
  Users,
  MessageSquare,
  User,
  LogOut,
  Home,
  Building2,
  Megaphone,
  X
} from 'lucide-react';

export default function AdminSidebar({ currentPage, onLogout, isMobile = false, onNavigate }) {
  const location = useLocation();
  const { userData } = useAuth();
  const permissions = usePermissions();

  // Função para lidar com clique em link (fechar menu no mobile)
  const handleLinkClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  // Itens do menu
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Painel de Controle',
      icon: LayoutDashboard,
      path: '/admin/painel',
      permission: null
    },
    {
      id: 'avisos',
      label: 'Gerenciar Avisos',
      icon: Bell,
      path: '/admin/avisos',
      permission: 'canViewAvisos'
    },
    {
      id: 'campanhas',
      label: 'Gerenciar Campanhas',
      icon: Megaphone,
      path: '/admin/campanhas',
      permission: 'canViewAvisos'
    },
    {
      id: 'users',
      label: 'Gerenciar Usuários',
      icon: Users,
      path: '/admin/users',
      permission: 'canManageUsers'
    },
    {
      id: 'chat-ia',
      label: 'Assistente IA',
      icon: MessageSquare,
      path: '/admin/chat-ia',
      permission: 'canCreateAvisos'
    }
  ];

  // Filtrar itens baseado em permissões
  const visibleItems = menuItems.filter(item => {
    if (!item.permission) return true;
    const permissionFn = permissions[item.permission];
    return typeof permissionFn === 'function' && permissionFn();
  });

  return (
    <div className={`${isMobile ? 'w-full h-full' : 'w-full h-full border-r border-slate-300 shadow-sm'} bg-white overflow-hidden flex flex-col`}>
      {/* Container com scroll único para todo o conteúdo */}
      <div className="h-full overflow-y-auto flex flex-col">
        {/* Header com botão fechar (mobile) ou logo (desktop) */}
        <div className="p-6 border-b border-slate-300 bg-slate-50 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight">Sistema Administrativo</h1>
                <p className="text-xs text-slate-600 leading-tight">ESF Catalão</p>
              </div>
            </div>
            {/* Botão fechar apenas no mobile */}
            {isMobile && onNavigate && (
              <button
                onClick={onNavigate}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 p-4 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
          })}
        </nav>

        {/* Footer - Informações do Usuário */}
        <div className="p-4 border-t border-slate-300 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-md border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center border border-slate-200 ${permissions.getRoleColor()}`}>
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {userData?.displayName || 'Administrador'}
              </p>
              <p className="text-xs text-slate-600 truncate">
                {permissions.getRoleLabel()}
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-2">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors w-full border border-slate-200"
            >
              <Home className="w-4 h-4" />
              <span>Site Público</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors w-full shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Encerrar Sessão</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
