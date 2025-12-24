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
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      // Tratamento de erros em português
      let errorMessage = 'Erro ao fazer login';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
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
  const loading = authLoading || (currentUser && userDataLoading);

  // Helpers de role
  const userRole = userData?.role || null;
  const isAdmin = userRole === 'admin';
  const isProfissional = userRole === 'profissional';
  const isDiretoria = userRole === 'diretoria';
  const isActive = userData?.active !== false; // Considera ativo se não houver campo active

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

  // Enquanto carrega, mostra tela de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

