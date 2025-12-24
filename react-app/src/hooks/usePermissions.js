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
  const { userRole, isAdmin, isProfissional, isDiretoria, isActive } = useAuth();
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'usePermissions.js:13',message:'usePermissions called',data:{userRole:userRole,isAdmin:isAdmin,isProfissional:isProfissional,isDiretoria:isDiretoria,isActive:isActive},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
  // #endregion

  // Verificações de permissões
  const permissions = {
    // Avisos
    canViewAvisos: () => {
      const result = isActive;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'usePermissions.js:18',message:'canViewAvisos checked',data:{result:result,isActive:isActive},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
      // #endregion
      return result;
    },
    canCreateAvisos: () => {
      const result = isActive && (isAdmin || isProfissional);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'usePermissions.js:19',message:'canCreateAvisos checked',data:{result:result,isActive:isActive,isAdmin:isAdmin,isProfissional:isProfissional},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
      // #endregion
      return result;
    },
    canEditAvisos: () => {
      const result = isActive && (isAdmin || isProfissional);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'usePermissions.js:20',message:'canEditAvisos checked',data:{result:result,isActive:isActive,isAdmin:isAdmin,isProfissional:isProfissional},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
      // #endregion
      return result;
    },
    canDeleteAvisos: () => {
      const result = isActive && isAdmin;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'usePermissions.js:21',message:'canDeleteAvisos checked',data:{result:result,isActive:isActive,isAdmin:isAdmin},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
      // #endregion
      return result;
    },

    // Usuários
    canViewUsers: () => isActive && isAdmin,
    canCreateUsers: () => isActive && isAdmin,
    canEditUsers: () => isActive && isAdmin,
    canDeleteUsers: () => isActive && isAdmin,
    canManageUsers: () => isActive && isAdmin,

    // Helpers de role
    isAdmin: () => isAdmin,
    isProfissional: () => isProfissional,
    isDiretoria: () => isDiretoria,
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
        case 'diretoria':
          return 'Diretória';
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
        case 'diretoria':
          return 'bg-green-100 text-green-700';
        default:
          return 'bg-neutral-100 text-neutral-700';
      }
    }
  };

  return permissions;
}

