// =========================================
// HOOK usePermissions
// =========================================
// Hook para verificar permissões do usuário baseado no role

import { useAuth } from '../contexts/AuthContext';

/**
 * Hook que retorna funções helper para verificar permissões
 * Baseado no role do usuário logado
 */
export function usePermissions() {
  const { userRole, isAdmin, isProfissional, isDiretorio, isActive } = useAuth();

  // Verificações de permissões
  const permissions = {
    // Avisos
    canViewAvisos: () => isActive, // Todos podem visualizar se estiverem ativos
    canCreateAvisos: () => isActive && (isAdmin || isProfissional),
    canEditAvisos: () => isActive && (isAdmin || isProfissional),
    canDeleteAvisos: () => isActive && isAdmin,

    // Usuários
    canViewUsers: () => isActive && isAdmin,
    canCreateUsers: () => isActive && isAdmin,
    canEditUsers: () => isActive && isAdmin,
    canDeleteUsers: () => isActive && isAdmin,
    canManageUsers: () => isActive && isAdmin,

    // Helpers de role
    isAdmin: () => isAdmin,
    isProfissional: () => isProfissional,
    isDiretorio: () => isDiretorio,
    isActive: () => isActive,

    // Getter do role
    getRole: () => userRole,

    // Label do role em português
    getRoleLabel: () => {
      switch (userRole) {
        case 'admin':
          return 'Administrador';
        case 'profissional':
          return 'Profissional';
        case 'diretorio':
          return 'Diretório';
        default:
          return 'Sem permissão';
      }
    },

    // Cor do role para badges
    getRoleColor: () => {
      switch (userRole) {
        case 'admin':
          return 'bg-purple-100 text-purple-700';
        case 'profissional':
          return 'bg-blue-100 text-blue-700';
        case 'diretorio':
          return 'bg-green-100 text-green-700';
        default:
          return 'bg-neutral-100 text-neutral-700';
      }
    }
  };

  return permissions;
}

