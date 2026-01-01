import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";
import {
  LayoutDashboard,
  Bell,
  Users,
  User,
  LogOut,
  Home,
  Building2,
  Megaphone,
  X,
  Package,
  ClipboardList,
  Calendar,
  CalendarDays,
  MessageSquareHeart,
} from "lucide-react";
export default function AdminSidebar({
  currentPage,
  onLogout,
  isMobile = false,
  onNavigate,
}) {
  const location = useLocation();
  const { userData } = useAuth();
  const permissions = usePermissions();
  const handleLinkClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };
  const menuItems = [
    {
      id: "dashboard",
      label: "Painel de Controle",
      icon: LayoutDashboard,
      path: "/admin/painel",
      permission: null,
    },
    {
      id: "avisos",
      label: "Gerenciar Avisos",
      icon: Bell,
      path: "/admin/avisos",
      permission: "canViewAvisos",
    },
    {
      id: "campanhas",
      label: "Gerenciar Campanhas",
      icon: Megaphone,
      path: "/admin/campanhas",
      permission: "canViewAvisos",
    },
    {
      id: "users",
      label: "Gerenciar Usuários",
      icon: Users,
      path: "/admin/users",
      permission: "canManageUsers",
    },
    {
      id: "estoque-vacinas",
      label: "Estoque de Vacinas",
      icon: Package,
      path: "/admin/estoque-vacinas",
      permission: null,
    },
    {
      id: "orientacoes",
      label: "Orientações Pós-Consulta",
      icon: ClipboardList,
      path: "/admin/orientacoes-pos-consulta",
      permission: null,
    },
    {
      id: "calendario",
      label: "Calendário de Eventos",
      icon: Calendar,
      path: "/admin/calendario",
      permission: null,
    },
    {
      id: "escalas",
      label: "Escalas de Trabalho",
      icon: CalendarDays,
      path: "/admin/escalas",
      permission: null,
    },
    {
      id: "feedbacks",
      label: "Feedbacks e Ouvidoria",
      icon: MessageSquareHeart,
      path: "/admin/feedbacks",
      permission: null,
    },
  ];
  const visibleItems = menuItems.filter((item) => {
    if (!item.permission) return true;
    const permissionFn = permissions[item.permission];
    return typeof permissionFn === "function" && permissionFn();
  });
  return (
    <div
      className={`${isMobile ? "w-full h-full" : "w-full h-full border-r border-neutral-300 shadow-sm"} bg-white overflow-hidden flex flex-col`}
    >
      {}
      <div className="h-full overflow-y-auto flex flex-col">
        {}
        <div className="p-6 border-b border-neutral-300 bg-neutral-50 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary-700 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className="text-base font-bold text-neutral-900 leading-tight"
                >
                  Sistema Administrativo
                </h1>
                <p
                  className="text-xs text-neutral-600 leading-tight"
                >
                  ESF Catalão
                </p>
              </div>
            </div>
            {}
            {isMobile && onNavigate && (
              <button
                onClick={onNavigate}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors flex-shrink-0"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        {}
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
                    ? "bg-primary-700 text-white shadow-sm"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-500"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        {}
        <div className="p-4 border-t border-neutral-300 bg-neutral-50 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-md border border-neutral-200 shadow-sm">
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center border border-neutral-200 ${permissions.getRoleColor()}`}
            >
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-neutral-900 truncate"
              >
                {userData?.displayName || "Administrador"}
              </p>
              <p
                className="text-xs text-neutral-600 truncate"
              >
                {permissions.getRoleLabel()}
              </p>
            </div>
          </div>
          {}
          <div className="space-y-2">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors w-full border border-neutral-200"
            >
              <Home className="w-4 h-4" />
              <span>Site Público</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-700 hover:bg-primary-800 rounded-md transition-colors w-full shadow-sm"
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
