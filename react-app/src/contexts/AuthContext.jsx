// =========================================
// CONTEXTO DE AUTENTICAÇÃO
// =========================================
// Este arquivo gerencia o estado de autenticação em todo o app
// Ele fornece: informações do usuário logado, funções de login/logout, estado de carregamento

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useUserData } from '../hooks/useUserData';

// Cria o contexto
const AuthContext = createContext({});

// Hook personalizado para usar o contexto (facilita o uso em outros componentes)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente Provider que envolve o app e fornece autenticação
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);  // Usuário logado
  const [authLoading, setAuthLoading] = useState(true);  // Estado de carregamento do Auth
  
  // Buscar dados do usuário do Firestore
  const { userData, loading: userDataLoading } = useUserData(currentUser?.uid);

  // Função de LOGIN
  const login = async (email, password) => {
    if (!auth) {
      return { success: false, error: 'Firebase não configurado. Configure as variáveis de ambiente.' };
    }
    
    // Validação de email
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Email inválido' };
    }
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      // Log detalhado do erro para diagnóstico
      console.error('Erro no login:', {
        code: error.code,
        message: error.message,
        email: email
      });
      
      // Tratamento de erros em português
      let errorMessage = 'Erro ao fazer login';
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      } else if (error.code === 'auth/invalid-api-key' || 
                 error.message?.includes('API key') || 
                 error.message?.includes('INVALID_ARGUMENT') ||
                 error.message?.includes('badRequest')) {
        errorMessage = 'Erro de configuração: API Key do Firebase inválida. Verifique as variáveis de ambiente no console.';
        console.error('🔑 API Key inválida detectada durante login');
        console.error('   Verifique o console do navegador para instruções detalhadas');
      } else if (error.code?.startsWith('auth/')) {
        errorMessage = `Erro de autenticação: ${error.code}`;
      } else {
        // Para erros 400 ou outros erros não categorizados
        errorMessage = `Erro: ${error.message || 'Requisição inválida. Verifique as configurações do Firebase.'}`;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Função de LOGOUT
  const logout = async () => {
    if (!auth) {
      return { success: false, error: 'Firebase não configurado' };
    }
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer logout' };
    }
  };

  // Monitora mudanças no estado de autenticação (login/logout)
  useEffect(() => {
    // Se o Firebase não foi inicializado, apenas define loading como false
    if (!auth) {
      console.warn('⚠️ Firebase Auth não disponível - variáveis de ambiente não configuradas');
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // Atualiza o usuário atual
      setAuthLoading(false);  // Terminou de carregar Auth
    });

    // Cleanup: cancela a inscrição quando o componente desmontar
    return unsubscribe;
  }, []);
  
  // Loading combinado: Auth + UserData
  // IMPORTANTE: Aguardar o UserData carregar COMPLETAMENTE antes de liberar o app
  // Isso garante que as permissões estarão disponíveis quando o componente renderizar
  const loading = authLoading || (currentUser && userDataLoading);

  // Helpers de role - com garantia de que userData está carregado
  const userRole = userData?.role || null;
  const isAdmin = userRole === 'admin';
  const isProfissional = userRole === 'profissional';
  const isDiretoria = userRole === 'diretoria';
  const isActive = userData?.active !== false; // Considera ativo se não houver campo active
  
  // Log de debug APENAS para admin (útil para diagnóstico)
  if (currentUser && userData && isAdmin) {
    console.log('🔐 Admin autenticado:', {
      uid: currentUser.uid,
      email: currentUser.email,
      role: userRole,
      isAdmin,
      isActive
    });
  }

  // Valores e funções disponíveis para todo o app
  const value = {
    currentUser,          // Usuário logado (null se não estiver logado)
    userData,             // Dados do usuário do Firestore (com role, etc)
    userRole,             // Role do usuário: admin, profissional, diretoria
    isAdmin,              // É admin?
    isProfissional,       // É profissional?
    isDiretoria,          // É diretória?
    isActive,             // Usuário está ativo?
    login,                // Função para fazer login
    logout,               // Função para fazer logout
    loading,              // Estado de carregamento
    isAuthenticated: !!currentUser && isActive  // Booleano: está logado e ativo?
  };

  // NÃO bloqueia o render inicial - permite que páginas públicas carreguem imediatamente
  // O loading será gerenciado individualmente por rotas protegidas que precisam de auth
  // Isso melhora drasticamente o tempo de carregamento inicial para usuários não autenticados
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

