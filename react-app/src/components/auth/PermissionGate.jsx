// =========================================
// COMPONENTE PERMISSION GATE
// =========================================
// Controla exibição de conteúdo baseado em permissões do usuário

import { usePermissions } from '../../hooks/usePermissions';

/**
 * Componente que mostra/esconde conteúdo baseado em permissões
 * 
 * @param {string} requiredPermission - Nome da função de permissão (ex: "canDeleteAvisos")
 * @param {string} requiredRole - Role necessário (ex: "admin", "profissional")
 * @param {ReactNode} children - Conteúdo a ser exibido se tiver permissão
 * @param {ReactNode} fallback - Conteúdo alternativo se não tiver permissão
 * 
 * Exemplos:
 * <PermissionGate requiredPermission="canDeleteAvisos">
 *   <button>Deletar</button>
 * </PermissionGate>
 * 
 * <PermissionGate requiredRole="admin">
 *   <AdminPanel />
 * </PermissionGate>
 */
export default function PermissionGate({ 
  requiredPermission,
  requiredRole,
  children,
  fallback = null 
}) {
  const permissions = usePermissions();

  let hasPermission = false;

  // Verificar por permission
  if (requiredPermission) {
    const permissionFn = permissions[requiredPermission];
    if (typeof permissionFn === 'function') {
      hasPermission = permissionFn();
    } else {
      console.warn(`Permission "${requiredPermission}" não encontrada`);
      return fallback;
    }
  }

  // Verificar por role
  if (requiredRole && !requiredPermission) {
    const currentRole = permissions.getRole();
    if (requiredRole === 'admin') {
      hasPermission = permissions.isAdmin();
    } else if (requiredRole === 'profissional') {
      hasPermission = permissions.isProfissional();
    } else if (requiredRole === 'diretoria') {
      hasPermission = permissions.isDiretoria();
    } else {
      hasPermission = currentRole === requiredRole;
    }
  }

  // Mostrar conteúdo ou fallback
  return hasPermission ? children : fallback;
}

