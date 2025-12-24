// =========================================
// ROTA PROTEGIDA
// =========================================
// Este componente protege rotas que só usuários logados podem acessar
// Se não estiver logado, redireciona para a página de login
// Suporta verificação de role específico

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import LoadingSpinner from '../common/LoadingSpinner';
import { Shield } from 'lucide-react';

/**
 * Componente de rota protegida
 * @param {ReactNode} children - Conteúdo da rota
 * @param {string} requiredRole - Role necessário (ex: "admin", "profissional")
 * @param {string} requiredPermission - Permissão necessária (ex: "canManageUsers")
 */
export default function ProtectedRoute({ children, requiredRole, requiredPermission }) {
  const { currentUser, loading, isActive, userData, isAdmin: isAdminFromContext } = useAuth();
  const permissions = usePermissions();

  // Se ainda está carregando (Auth OU UserData), mostra spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Se não está logado, redireciona para login
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Se userData ainda não carregou (safety check), aguarda
  if (currentUser && !userData) {
    return <LoadingSpinner />;
  }

  // Se usuário está desativado, redireciona para login
  if (!isActive) {
    return <Navigate to="/admin/login" replace />;
  }

  // Verificar role específico
  if (requiredRole) {
    const currentRole = permissions.getRole();
    
    // Se role for admin e usuário não for admin
    if (requiredRole === 'admin' && !permissions.isAdmin()) {
      return <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />;
    }
    
    // Se role for profissional e usuário não for admin nem profissional
    if (requiredRole === 'profissional' && !permissions.isAdmin() && !permissions.isProfissional()) {
      return <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />;
    }
    
    // Verificação genérica de role
    if (currentRole !== requiredRole && !permissions.isAdmin()) {
      return <AccessDenied currentRole={currentRole} requiredRole={requiredRole} />;
    }
  }

  // Verificar permissão específica
  if (requiredPermission) {
    const permissionFn = permissions[requiredPermission];
    if (typeof permissionFn === 'function' && !permissionFn()) {
      return <AccessDenied requiredPermission={requiredPermission} />;
    }
  }

  // Se passou todas as verificações, mostra o conteúdo protegido
  return children;
}

/**
 * Componente de acesso negado
 */
function AccessDenied({ currentRole, requiredRole, requiredPermission }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-neutral-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-red-600" />
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

