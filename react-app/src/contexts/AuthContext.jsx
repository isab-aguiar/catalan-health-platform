import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useUserData } from "../hooks/useUserData";
const AuthContext = createContext({});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { userData, loading: userDataLoading } = useUserData(currentUser?.uid);
  const login = async (email, password) => {
    if (!auth) {
      return {
        success: false,
        error: "Firebase não configurado. Configure as variáveis de ambiente.",
      };
    }
    if (!email || !email.includes("@")) {
      return { success: false, error: "Email inválido" };
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Erro no login:", {
        code: error.code,
        message: error.message,
        email: email,
      });
      let errorMessage = "Erro ao fazer login";
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Email ou senha incorretos";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Usuário não encontrado";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email inválido";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Muitas tentativas. Tente novamente mais tarde";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Erro de conexão. Verifique sua internet";
      } else if (
        error.code === "auth/invalid-api-key" ||
        error.message?.includes("API key") ||
        error.message?.includes("INVALID_ARGUMENT") ||
        error.message?.includes("badRequest")
      ) {
        errorMessage =
          "Erro de configuração: API Key do Firebase inválida. Verifique as variáveis de ambiente no console.";
        console.error("🔑 API Key inválida detectada durante login");
        console.error(
          "   Verifique o console do navegador para instruções detalhadas"
        );
      } else if (error.code?.startsWith("auth/")) {
        errorMessage = `Erro de autenticação: ${error.code}`;
      } else {
        errorMessage = `Erro: ${error.message || "Requisição inválida. Verifique as configurações do Firebase."}`;
      }
      return { success: false, error: errorMessage };
    }
  };
  const logout = async () => {
    if (!auth) {
      return { success: false, error: "Firebase não configurado" };
    }
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao fazer logout" };
    }
  };
  useEffect(() => {
    if (!auth) {
      console.warn(
        "⚠️ Firebase Auth não disponível - variáveis de ambiente não configuradas"
      );
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);
  const loading = authLoading || (currentUser && userDataLoading);
  const userRole = userData?.role || null;
  const isAdmin = userRole === "admin";
  const isProfissional = userRole === "profissional";
  const isDiretoria = userRole === "diretoria";
  const isActive = userData?.active !== false;
  if (currentUser && userData && isAdmin) {
    console.log("🔐 Admin autenticado:", {
      uid: currentUser.uid,
      email: currentUser.email,
      role: userRole,
      isAdmin,
      isActive,
    });
  }
  const value = {
    currentUser,
    userData,
    userRole,
    isAdmin,
    isProfissional,
    isDiretoria,
    isActive,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser && isActive,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
