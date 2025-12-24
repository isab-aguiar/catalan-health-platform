// =========================================
// PÁGINA ADMINISTRATIVA - GERENCIAR AVISOS
// =========================================
// Página para criar, editar e deletar avisos

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAvisos } from '../../hooks/useAvisos';
import {
  LogOut,
  User,
  Home,
  Bell,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Calendar,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function Avisos() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { avisos, loading, error, createAviso, updateAviso, deleteAviso } = useAvisos();
  
  const [showModal, setShowModal] = useState(false);
  const [editingAviso, setEditingAviso] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'campanha',
    data: '',
    exibirNaHomepage: false
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Função de logout
  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      const result = await logout();
      if (result.success) {
        navigate('/admin/login', { replace: true });
      } else {
        alert('Erro ao fazer logout. Tente novamente.');
      }
    }
  };

  // Abrir modal para criar novo aviso
  const handleNovoAviso = () => {
    setEditingAviso(null);
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'campanha',
      data: '',
      exibirNaHomepage: false
    });
    setFormError('');
    setShowModal(true);
  };

  // Abrir modal para editar aviso
  const handleEditarAviso = (aviso) => {
    setEditingAviso(aviso);
    
    // Converter Timestamp para formato de input date
    let dataFormatada = '';
    if (aviso.data) {
      const date = aviso.data.toDate ? aviso.data.toDate() : new Date(aviso.data);
      dataFormatada = date.toISOString().split('T')[0];
    }
    
    setFormData({
      titulo: aviso.titulo || '',
      descricao: aviso.descricao || '',
      categoria: aviso.categoria || 'campanha',
      data: dataFormatada,
      exibirNaHomepage: aviso.exibirNaHomepage || false
    });
    setFormError('');
    setShowModal(true);
  };

  // Fechar modal
  const handleFecharModal = () => {
    setShowModal(false);
    setEditingAviso(null);
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'campanha',
      data: '',
      exibirNaHomepage: false
    });
    setFormError('');
  };

  // Validar formulário
  const validarFormulario = () => {
    if (!formData.titulo.trim() || formData.titulo.trim().length < 3) {
      return 'Título deve ter no mínimo 3 caracteres';
    }
    if (!formData.descricao.trim() || formData.descricao.trim().length < 10) {
      return 'Descrição deve ter no mínimo 10 caracteres';
    }
    if (!formData.categoria) {
      return 'Categoria é obrigatória';
    }
    if (!formData.data) {
      return 'Data é obrigatória';
    }
    return null;
  };

  // Salvar aviso (criar ou editar)
  const handleSalvar = async () => {
    setFormError('');
    
    const erro = validarFormulario();
    if (erro) {
      setFormError(erro);
      return;
    }

    setFormLoading(true);
    
    try {
      if (editingAviso) {
        // Atualizar aviso existente
        const result = await updateAviso(editingAviso.id, formData);
        if (result.success) {
          handleFecharModal();
          alert('Aviso atualizado com sucesso!');
        } else {
          setFormError(result.error || 'Erro ao atualizar aviso');
        }
      } else {
        // Criar novo aviso
        const result = await createAviso(formData);
        if (result.success) {
          handleFecharModal();
          alert('Aviso criado com sucesso!');
        } else {
          setFormError(result.error || 'Erro ao criar aviso');
        }
      }
    } catch (err) {
      setFormError('Erro inesperado. Tente novamente.');
    } finally {
      setFormLoading(false);
    }
  };

  // Deletar aviso
  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este aviso?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const result = await deleteAviso(id);
      if (result.success) {
        alert('Aviso deletado com sucesso!');
      } else {
        alert('Erro ao deletar aviso: ' + (result.error || 'Erro desconhecido'));
      }
    } catch (err) {
      alert('Erro inesperado ao deletar aviso');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Formatar data para exibição
  const formatarData = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
  };

  // Obter label da categoria
  const getCategoriaLabel = (categoria) => {
    const labels = {
      vacina: 'Vacina',
      material: 'Material',
      campanha: 'Campanha'
    };
    return labels[categoria] || categoria;
  };

  // Obter cor da categoria
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: 'bg-blue-100 text-blue-700',
      material: 'bg-green-100 text-green-700',
      campanha: 'bg-amber-100 text-amber-700'
    };
    return colors[categoria] || 'bg-neutral-100 text-neutral-700';
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
      {/* Header Administrativo */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Título */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  Gerenciar Avisos
                </h1>
                <p className="text-xs text-neutral-500">PSF São José</p>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex items-center gap-4">
              <a
                href="/admin/painel"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Voltar ao Painel
              </a>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-700">Admin</p>
                  <p className="text-xs text-neutral-500">{currentUser?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Erro geral */}
        {error && (
          <div className="mb-6">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        {/* Botão Novo Aviso */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Avisos</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Gerencie os avisos que aparecem na homepage
            </p>
          </div>
          <button
            onClick={handleNovoAviso}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Aviso
          </button>
        </div>

        {/* Lista de Avisos */}
        {avisos.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
            <Bell className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Nenhum aviso cadastrado
            </h3>
            <p className="text-neutral-600 mb-6">
              Clique em "Novo Aviso" para criar o primeiro aviso
            </p>
            <button
              onClick={handleNovoAviso}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Criar Primeiro Aviso
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-neutral-900">
                        {aviso.titulo}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoriaColor(
                          aviso.categoria
                        )}`}
                      >
                        {getCategoriaLabel(aviso.categoria)}
                      </span>
                      {aviso.exibirNaHomepage && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Público
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {aviso.descricao}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatarData(aviso.data)}</span>
                      </div>
                      {aviso.createdAt && (
                        <span>
                          Criado em: {formatarData(aviso.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditarAviso(aviso)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeletar(aviso.id)}
                      disabled={deleteLoading === aviso.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Deletar"
                    >
                      {deleteLoading === aviso.id ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link para voltar */}
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

      {/* Modal de Criar/Editar Aviso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                {editingAviso ? 'Editar Aviso' : 'Novo Aviso'}
              </h3>
              <button
                onClick={handleFecharModal}
                className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              {formError && (
                <Alert type="error">{formError}</Alert>
              )}

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Campanha de Vacinação"
                  maxLength={100}
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Descreva o aviso em detalhes..."
                  rows={5}
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.descricao.length}/500 caracteres
                </p>
              </div>

              {/* Categoria e Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="vacina">Vacina</option>
                    <option value="material">Material</option>
                    <option value="campanha">Campanha</option>
                  </select>
                </div>

                {/* Data */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) =>
                      setFormData({ ...formData, data: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Exibir na Homepage */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="exibirNaHomepage"
                  checked={formData.exibirNaHomepage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      exibirNaHomepage: e.target.checked
                    })
                  }
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="exibirNaHomepage"
                  className="text-sm font-medium text-neutral-700 cursor-pointer"
                >
                  Exibir na homepage (público)
                </label>
              </div>
            </div>

            {/* Footer do Modal */}
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

