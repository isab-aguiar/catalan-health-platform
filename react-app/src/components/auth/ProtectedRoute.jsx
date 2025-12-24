// =========================================
// ROTA PROTEGIDA
// =========================================
// Este componente protege rotas que só usuários logados podem acessar
// Se não estiver logado, redireciona para a página de login

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Se ainda está carregando, mostra spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Se não está logado, redireciona para login
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Se está logado, mostra o conteúdo protegido
  return children;
}

