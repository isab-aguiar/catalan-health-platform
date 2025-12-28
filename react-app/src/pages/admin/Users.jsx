import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useModal } from "../../contexts/ModalContext";
import {
  LogOut,
  User,
  Home,
  Users as UsersIcon,
  Plus,
  Edit,
  Power,
  PowerOff,
  X,
  Save,
  Shield,
  Briefcase,
  Eye,
  Trash2,
} from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Alert from "../../components/common/Alert";
export default function Users() {
  const { currentUser, logout, userData } = useAuth();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const {
    users,
    loading,
    error,
    createUser,
    updateUserRole,
    toggleUserActive,
    deleteUser,
  } = useUsers();
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    role: "diretoria",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    if (showFormModal) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showFormModal]);

  // Função de logout
  const handleLogout = async () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      const result = await logout();
      if (result.success) {
        navigate("/admin/login", { replace: true });
      } else {
        alert("Erro ao fazer logout. Tente novamente.");
      }
    }
  };
  const handleNovoUsuario = () => {
    setEditingUser(null);
    setFormData({
      email: "",
      displayName: "",
      password: "",
      role: "diretoria",
    });
    setFormError("");
    setShowFormModal(true);
  };
  // Abrir modal para editar role do usuário
  const handleEditarRole = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      displayName: user.displayName,
      password: "", // Não permitir mudança de senha
      role: user.role,
    });
    setFormError("");
    setShowFormModal(true);
  };
  // Fechar modal
  const handleFecharModal = () => {
    setShowFormModal(false);
    setEditingUser(null);
    setFormData({
      email: "",
      displayName: "",
      password: "",
      role: "diretoria",
    });
    setFormError("");
  };
  // Validar formulário
  const validarFormulario = () => {
    if (!formData.email.trim()) {
      return "Email é obrigatório";
    }
    if (!formData.displayName.trim()) {
      return "Nome é obrigatório";
    }
    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      return "Senha deve ter no mínimo 6 caracteres";
    }
    if (!formData.role) {
      return "Role é obrigatório";
    }
    return null;
  };
  const handleSalvar = async () => {
    setFormError("");
    const erro = validarFormulario();
    if (erro) {
      setFormError(erro);
      return;
    }
    setFormLoading(true);
    try {
      if (editingUser) {
        // Apenas atualizar role
        const result = await updateUserRole(editingUser.uid, formData.role);
        if (result.success) {
          handleFecharModal();
          alert("Role atualizado com sucesso!");
        } else {
          setFormError(result.error || "Erro ao atualizar role");
        }
      } else {
        const result = await createUser(
          {
            email: formData.email,
            displayName: formData.displayName,
            role: formData.role,
          },
          formData.password,
          currentUser.uid
        );
        if (result.success) {
          handleFecharModal();
          alert("Usuário criado com sucesso!");
        } else {
          setFormError(result.error || "Erro ao criar usuário");
        }
      }
    } catch (err) {
      setFormError("Erro inesperado. Tente novamente.");
    } finally {
      setFormLoading(false);
    }
  };
  const handleToggleActive = async (uid, currentActive) => {
    if (uid === currentUser.uid) {
      alert("Você não pode desativar sua própria conta!");
      return;
    }
    const newStatus = !currentActive;
    const confirmMsg = newStatus
      ? "Tem certeza que deseja ativar este usuário?"
      : "Tem certeza que deseja desativar este usuário? Ele não poderá mais fazer login.";
    if (!window.confirm(confirmMsg)) {
      return;
    }
    setActionLoading(uid);
    try {
      const result = await toggleUserActive(uid, newStatus);
      if (result.success) {
        alert(
          newStatus
            ? "Usuário ativado com sucesso!"
            : "Usuário desativado com sucesso!"
        );
      } else {
        alert("Erro: " + (result.error || "Erro desconhecido"));
      }
    } catch (err) {
      alert("Erro inesperado ao alterar status do usuário");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (uid, userEmail) => {
    // Não permitir deletar a própria conta
    if (uid === currentUser.uid) {
      await showModal({
        type: 'error',
        title: 'Ação Não Permitida',
        message: 'Você não pode deletar sua própria conta!',
        confirmText: 'OK',
      });
      return;
    }

    // Não permitir deletar o admin root
    if (userEmail === "root@esfcatalao.com") {
      await showModal({
        type: 'error',
        title: 'Ação Não Permitida',
        message: 'Não é permitido deletar o usuário administrador root!',
        confirmText: 'OK',
      });
      return;
    }

    // Primeira confirmação
    const confirmed = await showModal({
      type: 'warning',
      title: 'Confirmar Exclusão',
      message: `⚠️ ATENÇÃO: Tem certeza que deseja DELETAR PERMANENTEMENTE o usuário ${userEmail}?\n\nEsta ação NÃO pode ser desfeita!\n\n• O usuário será removido do Firebase Authentication\n• Os dados do usuário serão removidos do Firestore\n• O usuário não poderá mais fazer login`,
      confirmText: 'Sim, deletar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) {
      return;
    }

    // Segunda confirmação para segurança
    const doubleConfirmed = await showModal({
      type: 'error',
      title: 'Última Confirmação',
      message: `Confirma DELETAR ${userEmail}?\n\nEsta é sua ÚLTIMA CHANCE de cancelar!\n\nO usuário será PERMANENTEMENTE removido do sistema.`,
      confirmText: 'DELETAR PERMANENTEMENTE',
      cancelText: 'Cancelar',
    });

    if (!doubleConfirmed) {
      return;
    }

    setActionLoading(uid);
    try {
      const result = await deleteUser(uid);
      if (result.success) {
        await showModal({
          type: 'success',
          title: 'Usuário Deletado',
          message: `O usuário ${userEmail} foi deletado com sucesso!`,
          confirmText: 'OK',
        });
      } else {
        await showModal({
          type: 'error',
          title: 'Erro ao Deletar',
          message: result.error || 'Não foi possível deletar o usuário. Tente novamente.',
          confirmText: 'OK',
        });
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
      await showModal({
        type: 'error',
        title: 'Erro Inesperado',
        message: 'Ocorreu um erro inesperado ao deletar o usuário. Tente novamente.',
        confirmText: 'OK',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: "Administrador",
      profissional: "Profissional",
      diretoria: "Diretória",
    };
    return labels[role] || role;
  };
  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-700",
      profissional: "bg-info/10 text-primary-700",
      diretoria: "bg-success/10 text-green-700",
    };
    return colors[role] || "bg-neutral-100 text-neutral-700";
  };
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return Shield;
      case "profissional":
        return Briefcase;
      case "diretoria":
        return Eye;
      default:
        return User;
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-50">
      {}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
            {}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-neutral-900 truncate">
                  Usuários
                </h1>
                <p className="text-xs text-neutral-500 hidden sm:block">ESF Catalão</p>
              </div>
            </div>
            {}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <a
                href="/admin/painel"
                className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 transition-colors hidden sm:inline whitespace-nowrap"
              >
                Voltar ao Painel
              </a>
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div className="min-w-0 max-w-[150px]">
                  <p className="font-medium text-neutral-700 truncate">
                    {userData?.displayName || "Admin"}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        {error && (
          <div className="mb-6">
            <Alert type="error">{error}</Alert>
          </div>
        )}
        {}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Usuários</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Gerencie os usuários do sistema e suas permissões
            </p>
          </div>
          <button
            onClick={handleNovoUsuario}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Usuário
          </button>
        </div>
        {}
        {users.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
            <UsersIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Nenhum usuário cadastrado
            </h3>
            <p className="text-neutral-600 mb-6">
              Clique em "Novo Usuário" para criar o primeiro usuário
            </p>
            <button
              onClick={handleNovoUsuario}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Criar Primeiro Usuário
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => {
              const RoleIcon = getRoleIcon(user.role);
              const isCurrentUser = user.uid === currentUser.uid;
              return (
                <div
                  key={user.uid}
                  className={`bg-white rounded-xl p-6 shadow-sm border ${
                    !user.active
                      ? "border-red-200 opacity-60"
                      : "border-neutral-200"
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getRoleColor(user.role)}`}
                      >
                        <RoleIcon className="w-6 h-6" />
                      </div>
                      {}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-neutral-900 truncate">
                            {user.displayName || user.email}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {getRoleLabel(user.role)}
                            </span>
                            {!user.active && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold whitespace-nowrap">
                                Inativo
                              </span>
                            )}
                            {isCurrentUser && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold whitespace-nowrap">
                                Você
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2 truncate" title={user.email}>
                          {user.email}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          {user.createdAt && (
                            <span>
                              Criado em:{" "}
                              {user.createdAt.toDate
                                ? user.createdAt
                                    .toDate()
                                    .toLocaleDateString("pt-BR")
                                : new Date(user.createdAt).toLocaleDateString(
                                    "pt-BR"
                                  )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditarRole(user)}
                        disabled={isCurrentUser}
                        className="p-2 text-info hover:bg-info/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Editar Role"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleActive(user.uid, user.active)
                        }
                        disabled={actionLoading === user.uid || isCurrentUser}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                          user.active
                            ? "text-error hover:bg-error/10"
                            : "text-success hover:bg-success/10"
                        }`}
                        title={user.active ? "Desativar" : "Ativar"}
                      >
                        {actionLoading === user.uid ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : user.active ? (
                          <PowerOff className="w-5 h-5" />
                        ) : (
                          <Power className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.uid, user.email)}
                        disabled={actionLoading === user.uid || isCurrentUser || user.email === "root@esfcatalao.com"}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Deletar usuário permanentemente"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Voltar para o site público
          </a>
        </div>
      </main>
      {}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                {editingUser ? "Editar Role do Usuário" : "Novo Usuário"}
              </h3>
              <button
                onClick={handleFecharModal}
                className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {}
            <div className="p-6 space-y-4">
              {formError && <Alert type="error">{formError}</Alert>}
              {editingUser && (
                <Alert type="info">
                  Você está editando o role de:{" "}
                  <strong>{editingUser.displayName}</strong>
                </Alert>
              )}
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!!editingUser}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="usuario@exemplo.com"
                />
              </div>
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  disabled={!!editingUser}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  placeholder="Nome do usuário"
                />
              </div>
              {}
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Senha Inicial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                  />
                </div>
              )}
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nível de Acesso <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="admin">Administrador (acesso total)</option>
                  <option value="profissional">
                    Profissional (criar/editar avisos)
                  </option>
                  <option value="diretoria">
                    Diretória (apenas visualização)
                  </option>
                </select>
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.role === "admin" &&
                    "Pode gerenciar usuários e deletar avisos"}
                  {formData.role === "profissional" &&
                    "Pode criar e editar avisos"}
                  {formData.role === "diretoria" &&
                    "Pode apenas visualizar informações"}
                </p>
              </div>
            </div>
            {}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={handleFecharModal}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={formLoading}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                {formLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
