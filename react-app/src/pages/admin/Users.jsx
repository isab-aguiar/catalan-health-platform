import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import { useModal } from "../../contexts/ModalContext";
import AdminLayout from "../../layouts/AdminLayout";
import {
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
  Key,
} from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Alert from "../../components/common/Alert";

// Validation utilities
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

const validateEmail = (email) => {
  if (!email?.trim()) return "Email é obrigatório";
  if (!EMAIL_REGEX.test(email)) return "Email inválido. Use o formato: usuario@exemplo.com";
  return null;
};

const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return "Senha deve ter no mínimo 8 caracteres";
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Senha deve conter pelo menos uma letra E um número";
  }
  return null;
};

const validateDisplayName = (name) => {
  if (!name?.trim()) return "Nome é obrigatório";
  if (name.trim().length < 3) return "Nome deve ter no mínimo 3 caracteres";
  return null;
};

export default function Users() {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const {
    users,
    loading,
    error,
    createUser,
    updateUserRole,
    toggleUserActive,
    deleteUser,
    updateUser,
    resetPassword,
    setPassword,
  } = useUsers();
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    role: "diretoria",
    active: true,
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalType, setPasswordModalType] = useState('reset');
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

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

  const handleNovoUsuario = () => {
    setEditingUser(null);
    setFormData({
      email: "",
      displayName: "",
      password: "",
      role: "diretoria",
      active: true,
    });
    setFormError("");
    setShowFormModal(true);
  };
  // Abrir modal para editar usuário
  const handleEditarUsuario = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      displayName: user.displayName,
      password: "", // Não permitir mudança de senha aqui
      role: user.role,
      active: user.active,
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
      active: true,
    });
    setFormError("");
  };
  // Validar formulário
  const validarFormulario = () => {
    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) return emailError;

    // Validate display name
    const nameError = validateDisplayName(formData.displayName);
    if (nameError) return nameError;

    // Validate password (only for new users)
    if (!editingUser) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) return passwordError;
    }

    // Validate role
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
        // Build updates object
        const updates = {};

        if (formData.displayName !== editingUser.displayName) {
          updates.displayName = formData.displayName;
        }

        if (formData.role !== editingUser.role) {
          updates.role = formData.role;
        }

        if (formData.active !== editingUser.active) {
          updates.active = formData.active;
        }

        // Email change requires confirmation
        if (formData.email !== editingUser.email) {
          const confirmEmailChange = await showModal({
            type: 'warning',
            title: 'Alterar Email',
            message: 'Alterar o email do usuário irá:\n• Atualizar no Firebase Authentication\n• Pode deslogar o usuário\n• Requerer novo login\n\nDeseja continuar?',
            confirmText: 'Sim, alterar',
            cancelText: 'Cancelar',
          });

          if (!confirmEmailChange) {
            setFormLoading(false);
            return;
          }

          updates.email = formData.email;
        }

        // If nothing changed
        if (Object.keys(updates).length === 0) {
          setFormError("Nenhuma alteração detectada");
          setFormLoading(false);
          return;
        }

        // Update user
        const result = await updateUser(editingUser.uid, updates);
        if (result.success) {
          handleFecharModal();
          await showModal({
            type: 'success',
            title: 'Usuário Atualizado',
            message: 'Dados do usuário atualizados com sucesso!',
            confirmText: 'OK',
          });
        } else {
          setFormError(result.error || "Erro ao atualizar usuário");
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
          await showModal({
            type: 'success',
            title: 'Usuário Criado',
            message: 'Usuário criado com sucesso!',
            confirmText: 'OK',
          });
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
  const handleResetPassword = (user) => {
    setSelectedUserForPassword(user);
    setPasswordModalType('reset');
    setNewPasswordInput('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handleSetPassword = (user) => {
    setSelectedUserForPassword(user);
    setPasswordModalType('set');
    setNewPasswordInput('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setSelectedUserForPassword(null);
    setNewPasswordInput('');
    setPasswordError('');
    setPasswordModalType('reset');
  };

  const handlePasswordSubmit = async () => {
    setPasswordError('');

    if (passwordModalType === 'reset') {
      setPasswordLoading(true);
      try {
        const result = await resetPassword(selectedUserForPassword.email);
        if (result.success) {
          handleClosePasswordModal();
          await showModal({
            type: 'success',
            title: 'Email Enviado',
            message: `Email de reset enviado para ${selectedUserForPassword.email}`,
            confirmText: 'OK',
          });
        } else {
          setPasswordError(result.error || 'Erro ao enviar email');
        }
      } finally {
        setPasswordLoading(false);
      }
    } else {
      const passwordValidation = validatePassword(newPasswordInput);
      if (passwordValidation) {
        setPasswordError(passwordValidation);
        return;
      }

      setPasswordLoading(true);
      try {
        const result = await setPassword(selectedUserForPassword.uid, newPasswordInput);
        if (result.success) {
          handleClosePasswordModal();
          await showModal({
            type: 'success',
            title: 'Senha Atualizada',
            message: `Senha definida com sucesso para ${selectedUserForPassword.email}`,
            confirmText: 'OK',
          });
        } else {
          setPasswordError(result.error || 'Erro ao definir senha');
        }
      } finally {
        setPasswordLoading(false);
      }
    }
  };

  const handleToggleActive = async (uid, currentActive) => {
    if (uid === currentUser.uid) {
      await showModal({
        type: 'error',
        title: 'Ação Não Permitida',
        message: 'Você não pode desativar sua própria conta!',
        confirmText: 'OK',
      });
      return;
    }

    const newStatus = !currentActive;
    const confirmMsg = newStatus
      ? "Tem certeza que deseja ativar este usuário?"
      : "Tem certeza que deseja desativar este usuário? Ele não poderá mais fazer login.";

    const confirmed = await showModal({
      type: newStatus ? 'info' : 'warning',
      title: newStatus ? 'Ativar Usuário' : 'Desativar Usuário',
      message: confirmMsg,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) {
      return;
    }

    setActionLoading(uid);
    try {
      const result = await toggleUserActive(uid, newStatus);
      if (result.success) {
        await showModal({
          type: 'success',
          title: 'Status Atualizado',
          message: newStatus ? 'Usuário ativado com sucesso!' : 'Usuário desativado com sucesso!',
          confirmText: 'OK',
        });
      } else {
        await showModal({
          type: 'error',
          title: 'Erro',
          message: result.error || 'Erro desconhecido',
          confirmText: 'OK',
        });
      }
    } catch (err) {
      await showModal({
        type: 'error',
        title: 'Erro',
        message: 'Erro inesperado ao alterar status do usuário',
        confirmText: 'OK',
      });
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
    <AdminLayout currentPage="users">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6">
            <Alert type="error">{error}</Alert>
          </div>
        )}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Usuários</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Gerencie os usuários do sistema e suas permissões
            </p>
          </div>
          <button
            onClick={handleNovoUsuario}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Novo Usuário</span>
          </button>
        </div>
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
                  className={`bg-white rounded-xl p-4 sm:p-6 shadow-sm border ${
                    !user.active
                      ? "border-red-200 opacity-60"
                      : "border-neutral-200"
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getRoleColor(user.role)}`}
                      >
                        <RoleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                            {user.displayName || user.email}
                          </h3>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {getRoleLabel(user.role)}
                            </span>
                            {!user.active && (
                              <span className="px-2 py-0.5 sm:py-1 bg-red-100 text-red-700 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                Inativo
                              </span>
                            )}
                            {isCurrentUser && (
                              <span className="px-2 py-0.5 sm:py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                Você
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mb-1 sm:mb-2 truncate" title={user.email}>
                          {user.email}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-neutral-500">
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
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 justify-end border-t sm:border-t-0 pt-3 sm:pt-0 mt-1 sm:mt-0">
                      <button
                        onClick={() => handleEditarUsuario(user)}
                        disabled={isCurrentUser}
                        className="p-1.5 sm:p-2 text-info hover:bg-info/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Editar Usuário"
                      >
                        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      {/* Dropdown para gerenciar senha */}
                      <div className="relative group">
                        <button
                          disabled={isCurrentUser}
                          className="p-1.5 sm:p-2 text-warning hover:bg-warning/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Gerenciar Senha"
                        >
                          <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {!isCurrentUser && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                              onClick={() => handleResetPassword(user)}
                              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-t-lg"
                            >
                              Enviar Email de Reset
                            </button>
                            <button
                              onClick={() => handleSetPassword(user)}
                              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-b-lg"
                            >
                              Definir Senha Manualmente
                            </button>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          handleToggleActive(user.uid, user.active)
                        }
                        disabled={actionLoading === user.uid || isCurrentUser}
                        className={`p-1.5 sm:p-2 rounded-lg transition-colors disabled:opacity-50 ${
                          user.active
                            ? "text-error hover:bg-error/10"
                            : "text-success hover:bg-success/10"
                        }`}
                        title={user.active ? "Desativar" : "Ativar"}
                      >
                        {actionLoading === user.uid ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : user.active ? (
                          <PowerOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Power className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.uid, user.email)}
                        disabled={actionLoading === user.uid || isCurrentUser || user.email === "root@esfcatalao.com"}
                        className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Deletar usuário permanentemente"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Voltar para o site público
          </a>
        </div>
        {/* Password Management Modal */}
        {showPasswordModal && selectedUserForPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900">
                  {passwordModalType === 'reset' ? 'Enviar Email de Reset' : 'Definir Nova Senha'}
                </h3>
                <button
                  onClick={handleClosePasswordModal}
                  className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {passwordError && <Alert type="error">{passwordError}</Alert>}

                <Alert type="info">
                  Usuário: <strong>{selectedUserForPassword.displayName}</strong><br />
                  Email: <strong>{selectedUserForPassword.email}</strong>
                </Alert>

                {passwordModalType === 'reset' ? (
                  <div>
                    <p className="text-sm text-neutral-700 mb-4">
                      Um email será enviado para <strong>{selectedUserForPassword.email}</strong> com instruções para redefinir a senha.
                    </p>
                    <Alert type="warning">
                      O usuário receberá um link por email que expira em 1 hora.
                    </Alert>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nova Senha <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Mínimo 8 caracteres (letras e números)"
                      minLength={8}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      A senha deve ter no mínimo 8 caracteres, contendo letras E números
                    </p>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={handleClosePasswordModal}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  disabled={passwordLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {passwordLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {passwordModalType === 'reset' ? 'Enviando...' : 'Definindo...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {passwordModalType === 'reset' ? 'Enviar Email' : 'Definir Senha'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </h3>
              <button
                onClick={handleFecharModal}
                className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {formError && <Alert type="error">{formError}</Alert>}
              {editingUser && (
                <Alert type="info">
                  Você pode editar o nome, email, role e status do usuário:{" "}
                  <strong>{editingUser.displayName}</strong>
                  <br />
                  <span className="text-xs">Nota: Alterar o email pode deslogar o usuário temporariamente.</span>
                </Alert>
              )}
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
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="usuario@exemplo.com"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nome do usuário"
                />
              </div>
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
                    placeholder="Mínimo 8 caracteres (letras e números)"
                    minLength={8}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    A senha deve ter no mínimo 8 caracteres, contendo letras E números
                  </p>
                </div>
              )}
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
              {editingUser && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.value === 'true' })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-1">
                    Usuários inativos não podem fazer login
                  </p>
                </div>
              )}
            </div>
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
    </AdminLayout>
  );
}
