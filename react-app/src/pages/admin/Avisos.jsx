import { useState } from "react";
import { Link } from "react-router-dom";
import { useAvisos } from "../../hooks/useAvisos";
import { usePermissions } from "../../hooks/usePermissions";
import AdminLayout from "../../layouts/AdminLayout";
import AvisosTable from "../../components/admin/AvisosTable";
import PermissionGate from "../../components/auth/PermissionGate";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  Plus,
  X,
  Save,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { allPages } from "../../data/services";
export default function Avisos() {
  const { avisos, loading, error, createAviso, updateAviso, deleteAviso } =
    useAvisos();
  const permissions = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [editingAviso, setEditingAviso] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "campanha",
    data: "",
    exibirNaHomepage: false,
    paginaDestino: "home",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  // Abrir modal para criar novo aviso
  const handleNovoAviso = () => {
    setEditingAviso(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "campanha",
      data: new Date().toISOString().split("T")[0],
      exibirNaHomepage: false,
      paginaDestino: "home",
    });
    setFormError("");
    setShowModal(true);
  };
  // Abrir modal para editar aviso
  const handleEditarAviso = (aviso) => {
    setEditingAviso(aviso);
    let dataFormatada = "";
    if (aviso.data) {
      const date = aviso.data.toDate
        ? aviso.data.toDate()
        : new Date(aviso.data);
      dataFormatada = date.toISOString().split("T")[0];
    }
    setFormData({
      titulo: aviso.titulo || "",
      descricao: aviso.descricao || "",
      categoria: aviso.categoria || "campanha",
      data: dataFormatada,
      exibirNaHomepage: aviso.exibirNaHomepage || false,
      paginaDestino: aviso.paginaDestino || "home",
    });
    setFormError("");
    setShowModal(true);
  };
  // Fechar modal
  const handleFecharModal = () => {
    setShowModal(false);
    setEditingAviso(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "campanha",
      data: "",
      exibirNaHomepage: false,
      paginaDestino: "home",
    });
    setFormError("");
  };
  // Validar formulário
  const validarFormulario = () => {
    if (!formData.titulo.trim() || formData.titulo.trim().length < 3) {
      return "O título deve conter no mínimo 3 caracteres";
    }
    if (!formData.descricao.trim() || formData.descricao.trim().length < 10) {
      return "A descrição deve conter no mínimo 10 caracteres";
    }
    if (!formData.categoria) {
      return "Selecione uma categoria";
    }
    if (!formData.data) {
      return "Informe a data do aviso";
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
      if (editingAviso) {
        const result = await updateAviso(editingAviso.id, formData);
        if (result.success) {
          handleFecharModal();
          alert("Aviso atualizado com sucesso");
        } else {
          setFormError(result.error || "Erro ao atualizar o aviso");
        }
      } else {
        const result = await createAviso(formData);
        if (result.success) {
          handleFecharModal();
          alert("Aviso cadastrado com sucesso");
        } else {
          setFormError(result.error || "Erro ao cadastrar o aviso");
        }
      }
    } catch (err) {
      setFormError("Erro inesperado. Tente novamente.");
      console.error("Erro ao salvar:", err);
    } finally {
      setFormLoading(false);
    }
  };
  const handleDeletar = async (id) => {
    fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "Avisos.jsx:150",
        message: "handleDeletar called",
        data: { id: id, canDelete: permissions.canDeleteAvisos() },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "H2,H3",
      }),
    }).catch(() => {});
    if (!window.confirm("Confirma a exclusão deste aviso?")) {
      fetch(
        "http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "Avisos.jsx:151",
            message: "User cancelled deletion",
            data: { id: id },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "H3",
          }),
        }
      ).catch(() => {});
      return;
    }
    setDeleteLoading(id);
    fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "Avisos.jsx:155",
        message: "Before deleteAviso service call",
        data: { id: id },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "H3",
      }),
    }).catch(() => {});
    try {
      const result = await deleteAviso(id);
      fetch(
        "http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "Avisos.jsx:157",
            message: "After deleteAviso service call",
            data: { id: id, success: result.success, error: result.error },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "H3",
          }),
        }
      ).catch(() => {});
      if (result.success) {
        alert("Aviso excluído com sucesso");
      } else {
        alert("Erro ao excluir: " + (result.error || "Erro desconhecido"));
      }
    } catch (err) {
      fetch(
        "http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "Avisos.jsx:163",
            message: "handleDeletar CATCH ERROR",
            data: { id: id, errorMessage: err.message, errorName: err.name },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "H3",
          }),
        }
      ).catch(() => {});
      alert("Erro inesperado ao excluir o aviso");
      console.error("Erro ao deletar:", err);
    } finally {
      setDeleteLoading(null);
    }
  };
  if (loading) {
    return (
      <AdminLayout currentPage="avisos">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout currentPage="avisos">
      <div className="max-w-7xl mx-auto space-y-6">
        {}
        <div className="bg-white border border-neutral-300 rounded-md shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Gerenciar Avisos
              </h1>
              <p className="text-neutral-600 text-sm mt-1">
                Cadastro e manutenção de avisos do sistema
              </p>
            </div>
            <div className="flex items-center gap-3">
              {permissions.canCreateAvisos() && (
                <>
                  <Link
                    to="/admin/chat-ia"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium text-sm border border-purple-700 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Assistente IA</span>
                    <span className="sm:hidden">IA</span>
                  </Link>
                  <button
                    onClick={handleNovoAviso}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-info-700 text-white rounded-md transition-colors font-medium text-sm border border-blue-700 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Cadastrar Aviso</span>
                    <span className="sm:hidden">Novo</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {}
        {error && (
          <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle
                size={20}
                className="text-error flex-shrink-0 mt-0.5"
              />
              <div className="text-sm text-error">{error}</div>
            </div>
          </div>
        )}
        {}
        {permissions.canCreateAvisos() && avisos.length > 0 && (
          <div className="bg-info/10 border border-blue-200 rounded-md p-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-info font-semibold">
                  Utilize o Assistente Inteligente
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Gere avisos automaticamente descrevendo a situação em
                  linguagem natural.
                </p>
              </div>
            </div>
          </div>
        )}
        {}
        {avisos.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center border border-neutral-300 shadow-sm">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-200">
              <Plus className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              Nenhum Aviso Cadastrado
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Cadastre o primeiro aviso do sistema utilizando o formulário
              manual ou o assistente inteligente
            </p>
            <div className="flex items-center justify-center gap-3">
              {permissions.canCreateAvisos() && (
                <>
                  <Link
                    to="/admin/chat-ia"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium border border-purple-700 shadow-sm"
                  >
                    <Sparkles className="w-5 h-5" />
                    Usar Assistente IA
                  </Link>
                  <button
                    onClick={handleNovoAviso}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-info-700 text-white rounded-md transition-colors font-medium border border-blue-700 shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                    Cadastrar Manualmente
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <AvisosTable
            avisos={avisos}
            onEdit={handleEditarAviso}
            onDelete={handleDeletar}
            deleteLoading={deleteLoading}
          />
        )}
      </div>
      {}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-neutral-300">
            {}
            <div className="sticky top-0 bg-neutral-50 border-b border-neutral-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                {editingAviso ? "Editar Aviso" : "Cadastrar Novo Aviso"}
              </h3>
              <button
                onClick={handleFecharModal}
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {}
            <div className="p-6 space-y-4">
              {formError && (
                <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={20}
                      className="text-error flex-shrink-0"
                    />
                    <div className="text-sm text-error">{formError}</div>
                  </div>
                </div>
              )}
              {}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Título do Aviso <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Exemplo: Campanha de Vacinação contra Gripe"
                  maxLength={100}
                />
              </div>
              {}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Descrição Completa <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Descreva detalhadamente o conteúdo do aviso..."
                  rows={5}
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.descricao.length}/500 caracteres
                </p>
              </div>
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Categoria <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                  >
                    <option value="vacina">Vacina</option>
                    <option value="material">Material</option>
                    <option value="campanha">Campanha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Data <span className="text-error">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) =>
                      setFormData({ ...formData, data: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              {}
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-neutral-50 rounded-md border border-neutral-200">
                  <input
                    type="checkbox"
                    id="exibirNaHomepage"
                    checked={formData.exibirNaHomepage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        exibirNaHomepage: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-info border-neutral-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="exibirNaHomepage"
                    className="text-sm font-medium text-neutral-700 cursor-pointer"
                  >
                    Exibir na página inicial (público)
                  </label>
                </div>
                {!formData.exibirNaHomepage && (
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Página Destino
                    </label>
                    <select
                      value={formData.paginaDestino}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paginaDestino: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                      <option value="home">Homepage</option>
                      <optgroup label="Serviços">
                        {allPages
                          .filter((p) => p.category === "services")
                          .map((page) => (
                            <option key={page.id} value={page.id}>
                              {page.title}
                            </option>
                          ))}
                      </optgroup>
                    </select>
                    <p className="text-xs text-neutral-500 mt-1">
                      Selecione em qual página o aviso será exibido
                    </p>
                  </div>
                )}
              </div>
            </div>
            {}
            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-300 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={handleFecharModal}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-md transition-colors font-medium border border-neutral-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={formLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-info-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 border border-blue-700 shadow-sm"
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
    </AdminLayout>
  );
}
