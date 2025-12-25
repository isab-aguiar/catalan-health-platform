import { useAuth } from "../contexts/AuthContext";
export function usePermissions() {
  const { userRole, isAdmin, isProfissional, isDiretoria, isActive } =
    useAuth();
  const permissions = {
    canViewAvisos: () => isActive,
    canCreateAvisos: () => isActive && (isAdmin || isProfissional),
    canEditAvisos: () => isActive && (isAdmin || isProfissional),
    canDeleteAvisos: () => isActive && isAdmin,
    canViewUsers: () => isActive && isAdmin,
    canCreateUsers: () => isActive && isAdmin,
    canEditUsers: () => isActive && isAdmin,
    canDeleteUsers: () => isActive && isAdmin,
    canManageUsers: () => isActive && isAdmin,
    isAdmin: () => isAdmin,
    isProfissional: () => isProfissional,
    isDiretoria: () => isDiretoria,
    isActive: () => isActive,
    getRole: () => userRole,
    getRoleLabel: () => {
      switch (userRole) {
        case "admin":
          return "Administrador";
        case "profissional":
          return "Profissional";
        case "diretoria":
          return "Diretória";
        default:
          return "Sem permissão";
      }
    },
    getRoleColor: () => {
      switch (userRole) {
        case "admin":
          return "bg-purple-100 text-purple-700";
        case "profissional":
          return "bg-blue-100 text-blue-700";
        case "diretoria":
          return "bg-green-100 text-green-700";
        default:
          return "bg-neutral-100 text-neutral-700";
      }
    },
  };
  return permissions;
}
