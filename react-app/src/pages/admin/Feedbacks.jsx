import { useState, useEffect, useMemo } from "react";
import { useFeedbacks } from "../../hooks/useFeedbacks";
import AdminLayout from "../../layouts/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useModal } from "../../contexts/ModalContext";
import {
  MessageSquareHeart,
  AlertCircle,
  Search,
  Filter,
  X,
  CheckCircle,
  Clock,
  Archive,
  Send,
  Eye,
  Trash2,
} from "lucide-react";

export default function Feedbacks() {
  const [filters, setFilters] = useState({
    tipo: "todos",
    status: "todos",
    busca: "",
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [resposta, setResposta] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { feedbacks, loading, error, updateFeedback, deleteFeedback } = useFeedbacks(filters);
  const { showModal } = useModal();

  const stats = useMemo(() => {
    const total = feedbacks.length;
    const pendentes = feedbacks.filter((f) => f.status === "pendente").length;
    const emAnalise = feedbacks.filter((f) => f.status === "em_analise").length;
    const resolvidos = feedbacks.filter((f) => f.status === "resolvido").length;
    const arquivados = feedbacks.filter((f) => f.status === "arquivado").length;

    return {
      total,
      pendentes,
      emAnalise,
      resolvidos,
      arquivados,
    };
  }, [feedbacks]);

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setResposta(feedback.resposta || "");
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedFeedback(null);
    setResposta("");
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedFeedback) return;

    setUpdating(true);
    try {
      const result = await updateFeedback(selectedFeedback.id, {
        status: newStatus,
      });

      if (result.success) {
        await showModal({
          type: "success",
          title: "Status Atualizado",
          message: `Feedback marcado como ${newStatus.replace("_", " ")}.`,
          confirmText: "OK",
        });
        handleCloseModal();
      } else {
        await showModal({
          type: "error",
          title: "Erro",
          message: result.error || "Erro ao atualizar status.",
          confirmText: "Fechar",
        });
      }
    } catch (error) {
      await showModal({
        type: "error",
        title: "Erro",
        message: "Erro inesperado ao atualizar status.",
        confirmText: "Fechar",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleResponder = async () => {
    if (!selectedFeedback || !resposta.trim()) {
      await showModal({
        type: "warning",
        title: "Atenção",
        message: "Preencha a resposta antes de enviar.",
        confirmText: "OK",
      });
      return;
    }

    setUpdating(true);
    try {
      const result = await updateFeedback(selectedFeedback.id, {
        status: "resolvido",
        resposta: resposta.trim(),
      });

      if (result.success) {
        await showModal({
          type: "success",
          title: "Resposta Enviada",
          message: "A resposta foi salva e o feedback foi marcado como resolvido.",
          confirmText: "OK",
        });
        handleCloseModal();
      } else {
        await showModal({
          type: "error",
          title: "Erro",
          message: result.error || "Erro ao salvar resposta.",
          confirmText: "Fechar",
        });
      }
    } catch (error) {
      await showModal({
        type: "error",
        title: "Erro",
        message: "Erro inesperado ao salvar resposta.",
        confirmText: "Fechar",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (feedbackId, feedbackTipo) => {
    const confirmed = await showModal({
      type: "confirmation",
      title: "Confirmar Exclusão",
      message: `Tem certeza que deseja excluir este ${feedbackTipo}? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
    });

    if (!confirmed) return;

    setDeleteLoading(feedbackId);
    try {
      const result = await deleteFeedback(feedbackId);

      if (result.success) {
        await showModal({
          type: "success",
          title: "Feedback Excluído",
          message: "O feedback foi excluído com sucesso.",
          confirmText: "OK",
        });
        if (selectedFeedback?.id === feedbackId) {
          handleCloseModal();
        }
      } else {
        await showModal({
          type: "error",
          title: "Erro ao Excluir",
          message: result.error || "Erro ao excluir feedback.",
          confirmText: "Fechar",
        });
      }
    } catch (error) {
      await showModal({
        type: "error",
        title: "Erro",
        message: "Erro inesperado ao excluir feedback.",
        confirmText: "Fechar",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const getTipoLabel = (tipo) => {
    const labels = {
      elogio: "Elogio",
      sugestao: "Sugestão",
      reclamacao: "Reclamação",
    };
    return labels[tipo] || tipo;
  };

  const getTipoColor = (tipo) => {
    const colors = {
      elogio: "bg-green-100 text-green-800 border-green-200",
      sugestao: "bg-yellow-100 text-yellow-800 border-yellow-200",
      reclamacao: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[tipo] || "bg-neutral-100 text-neutral-800 border-neutral-200";
  };

  const getStatusLabel = (status) => {
    const labels = {
      pendente: "Pendente",
      em_analise: "Em Análise",
      resolvido: "Resolvido",
      arquivado: "Arquivado",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      em_analise: "bg-blue-100 text-blue-800 border-blue-200",
      resolvido: "bg-green-100 text-green-800 border-green-200",
      arquivado: "bg-neutral-100 text-neutral-800 border-neutral-200",
    };
    return colors[status] || "bg-neutral-100 text-neutral-800 border-neutral-200";
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (showDetailModal) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [showDetailModal]);

  if (loading) {
    return (
      <AdminLayout currentPage="feedbacks">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="feedbacks">
      <div className="space-y-6">
        <div className="bg-white border border-neutral-300 rounded-md shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-700 rounded-md flex items-center justify-center shadow-sm">
              <MessageSquareHeart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Feedbacks e Ouvidoria
              </h1>
              <p className="text-neutral-600 text-sm">
                Gerencie elogios, sugestões e reclamações dos usuários
              </p>
            </div>
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            icon={MessageSquareHeart}
            title="Total de Feedbacks"
            value={stats.total}
            subtitle="Todos os feedbacks registrados"
            bgColor="bg-blue-600"
            iconColor="text-info"
          />
          <StatsCard
            icon={Clock}
            title="Pendentes"
            value={stats.pendentes}
            subtitle="Aguardando análise"
            bgColor="bg-yellow-600"
            iconColor="text-warning-dark"
          />
          <StatsCard
            icon={Eye}
            title="Em Análise"
            value={stats.emAnalise}
            subtitle="Sendo analisados"
            bgColor="bg-blue-600"
            iconColor="text-info"
          />
          <StatsCard
            icon={CheckCircle}
            title="Resolvidos"
            value={stats.resolvidos}
            subtitle="Concluídos"
            bgColor="bg-green-600"
            iconColor="text-success"
          />
        </div>

        <div className="bg-white rounded-md p-6 shadow-sm border border-neutral-300">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={filters.busca}
                  onChange={(e) =>
                    setFilters({ ...filters, busca: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filters.tipo}
                onChange={(e) =>
                  setFilters({ ...filters, tipo: e.target.value })
                }
                className="px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="elogio">Elogios</option>
                <option value="sugestao">Sugestões</option>
                <option value="reclamacao">Reclamações</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="todos">Todos os Status</option>
                <option value="pendente">Pendente</option>
                <option value="em_analise">Em Análise</option>
                <option value="resolvido">Resolvido</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
          </div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-200">
                <MessageSquareHeart className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Nenhum Feedback Encontrado
              </h3>
              <p className="text-neutral-600">
                {filters.tipo !== "todos" || filters.status !== "todos" || filters.busca
                  ? "Tente ajustar os filtros"
                  : "Ainda não há feedbacks registrados"}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 border-b border-neutral-300">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Data
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((feedback) => (
                      <tr
                        key={feedback.id}
                        className="border-b border-neutral-200 hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold border ${getTipoColor(
                              feedback.tipo
                            )}`}
                          >
                            {getTipoLabel(feedback.tipo)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-900">
                          {feedback.anonimo ? (
                            <span className="text-neutral-500 italic">
                              Anônimo
                            </span>
                          ) : (
                            feedback.nome || "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">
                          {feedback.email || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(
                              feedback.status
                            )}`}
                          >
                            {getStatusLabel(feedback.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">
                          {formatarData(feedback.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleViewDetails(feedback)}
                              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
                            >
                              <Eye size={16} />
                              Ver Detalhes
                            </button>
                            <button
                              onClick={() => handleDelete(feedback.id, getTipoLabel(feedback.tipo).toLowerCase())}
                              disabled={deleteLoading === feedback.id}
                              className="text-error hover:text-error-dark font-medium text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleteLoading === feedback.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                                  Excluindo...
                                </>
                              ) : (
                                <>
                                  <Trash2 size={16} />
                                  Excluir
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold border ${getTipoColor(
                          feedback.tipo
                        )}`}
                      >
                        {getTipoLabel(feedback.tipo)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(
                          feedback.status
                        )}`}
                      >
                        {getStatusLabel(feedback.status)}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-neutral-500 uppercase">
                          Nome
                        </span>
                        <p className="text-sm text-neutral-900">
                          {feedback.anonimo ? (
                            <span className="text-neutral-500 italic">
                              Anônimo
                            </span>
                          ) : (
                            feedback.nome || "-"
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-neutral-500 uppercase">
                          Email
                        </span>
                        <p className="text-sm text-neutral-600">
                          {feedback.email || "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-neutral-500 uppercase">
                          Data
                        </span>
                        <p className="text-sm text-neutral-600">
                          {formatarData(feedback.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(feedback)}
                        className="flex-1 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-1 py-2 border border-primary-200 rounded-md hover:bg-primary-50"
                      >
                        <Eye size={16} />
                        Ver Detalhes
                      </button>
                      <button
                        onClick={() => handleDelete(feedback.id, getTipoLabel(feedback.tipo).toLowerCase())}
                        disabled={deleteLoading === feedback.id}
                        className="flex-1 text-error hover:text-error-dark font-medium text-sm flex items-center justify-center gap-1 py-2 border border-error-200 rounded-md hover:bg-error-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleteLoading === feedback.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                            Excluindo...
                          </>
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Excluir
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-full sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-neutral-300">
            <div className="sticky top-0 bg-neutral-50 border-b border-neutral-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                Detalhes do Feedback
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Tipo
                  </span>
                  <p>
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-sm font-semibold border ${getTipoColor(
                        selectedFeedback.tipo
                      )}`}
                    >
                      {getTipoLabel(selectedFeedback.tipo)}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Status
                  </span>
                  <p>
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-sm font-semibold border ${getStatusColor(
                        selectedFeedback.status
                      )}`}
                    >
                      {getStatusLabel(selectedFeedback.status)}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Nome
                  </span>
                  <p className="text-sm text-neutral-900">
                    {selectedFeedback.anonimo ? (
                      <span className="text-neutral-500 italic">Anônimo</span>
                    ) : (
                      selectedFeedback.nome || "-"
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Email
                  </span>
                  <p className="text-sm text-neutral-600">
                    {selectedFeedback.email || "-"}
                  </p>
                </div>
                {selectedFeedback.telefone && (
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">
                      Telefone
                    </span>
                    <p className="text-sm text-neutral-600">
                      {selectedFeedback.telefone}
                    </p>
                  </div>
                )}
                {selectedFeedback.categoria && (
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">
                      Categoria
                    </span>
                    <p className="text-sm text-neutral-600 capitalize">
                      {selectedFeedback.categoria}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Data de Envio
                  </span>
                  <p className="text-sm text-neutral-600">
                    {formatarData(selectedFeedback.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase block mb-2">
                  Mensagem
                </span>
                <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {selectedFeedback.mensagem}
                  </p>
                </div>
              </div>

              {selectedFeedback.resposta && (
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase block mb-2">
                    Resposta
                  </span>
                  <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                      {selectedFeedback.resposta}
                    </p>
                    {selectedFeedback.respondidoEm && (
                      <p className="text-xs text-neutral-500 mt-2">
                        Respondido em: {formatarData(selectedFeedback.respondidoEm)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  Resposta
                </label>
                <textarea
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Digite sua resposta aqui..."
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-300 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(selectedFeedback.id, getTipoLabel(selectedFeedback.tipo).toLowerCase())}
                disabled={updating || deleteLoading === selectedFeedback.id}
                className="px-4 py-2 bg-error hover:bg-error-dark text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleteLoading === selectedFeedback.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Excluir
                  </>
                )}
              </button>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-md transition-colors font-medium border border-neutral-300"
                  disabled={updating || deleteLoading === selectedFeedback.id}
                >
                  Fechar
                </button>
                <button
                  onClick={() => handleUpdateStatus("em_analise")}
                  disabled={updating || selectedFeedback.status === "em_analise" || deleteLoading === selectedFeedback.id}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Clock size={16} className="inline mr-1" />
                  Em Análise
                </button>
                <button
                  onClick={() => handleUpdateStatus("arquivado")}
                  disabled={updating || selectedFeedback.status === "arquivado" || deleteLoading === selectedFeedback.id}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Archive size={16} className="inline mr-1" />
                  Arquivar
                </button>
                <button
                  onClick={handleResponder}
                  disabled={updating || !resposta.trim() || deleteLoading === selectedFeedback.id}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Responder e Resolver
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

