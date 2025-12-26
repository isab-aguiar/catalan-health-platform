import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";
import LoadingSpinner from "../common/LoadingSpinner";
import { Shield } from "lucide-react";
export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
}) {
  const {
    currentUser,
    loading,
    isActive,
    userData,
    isAdmin: isAdminFromContext,
  } = useAuth();
  const permissions = usePermissions();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }
  if (currentUser && !userData) {
    return <LoadingSpinner />;
  }
  if (!isActive) {
    return <Navigate to="/admin/login" replace />;
  }
  if (requiredRole) {
    const currentRole = permissions.getRole();
    if (requiredRole === "admin" && !permissions.isAdmin()) {
      return (
        <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />
      );
    }
    if (
      requiredRole === "profissional" &&
      !permissions.isAdmin() &&
      !permissions.isProfissional()
    ) {
      return (
        <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />
      );
    }
    if (currentRole !== requiredRole && !permissions.isAdmin()) {
      return (
        <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />
      );
    }
  }
  if (requiredPermission) {
    const permissionFn = permissions[requiredPermission];
    if (typeof permissionFn === "function" && !permissionFn()) {
      return <AccessDenied requiredPermission={requiredPermission} />;
    }
  }
  return children;
}
function AccessDenied({ currentRole, requiredRole, requiredPermission }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-neutral-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-error" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Acesso Negado
        </h1>
        <p className="text-neutral-600 mb-4">
          Você não tem permissão para acessar esta página.
        </p>
        {currentRole && (
          <p className="text-sm text-neutral-500 mb-6">
            Seu perfil: <strong>{currentRole}</strong>
            {requiredRole && ` | Requerido: ${requiredRole}`}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <a
            href="/admin/painel"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            Voltar ao Painel
          </a>
          <a
            href="/"
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg transition-colors font-medium"
          >
            Página Inicial
          </a>
        </div>
      </div>
    </div>
  );
}
