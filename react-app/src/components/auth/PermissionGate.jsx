import { usePermissions } from "../../hooks/usePermissions";
export default function PermissionGate({
  requiredPermission,
  requiredRole,
  children,
  fallback = null,
}) {
  const permissions = usePermissions();
  let hasPermission = false;
  if (requiredPermission) {
    const permissionFn = permissions[requiredPermission];
    if (typeof permissionFn === "function") {
      hasPermission = permissionFn();
    } else {
      console.warn(`Permission "${requiredPermission}" não encontrada`);
      return fallback;
    }
  }
  if (requiredRole && !requiredPermission) {
    const currentRole = permissions.getRole();
    if (requiredRole === "admin") {
      hasPermission = permissions.isAdmin();
    } else if (requiredRole === "profissional") {
      hasPermission = permissions.isProfissional();
    } else if (requiredRole === "diretoria") {
      hasPermission = permissions.isDiretoria();
    } else {
      hasPermission = currentRole === requiredRole;
    }
  }
  return hasPermission ? children : fallback;
}
