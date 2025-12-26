import { useMemo, memo, useState, useEffect } from "react";
import { useVacinas } from "../../hooks/useVacinas";
import AdminLayout from "../../layouts/AdminLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { vacinas2025 } from "../../data/vacinas-sus";
import {
  Shield,
  AlertCircle,
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";
export default function EstoqueVacinas() {
  const { vacinas, loading, error, updateVacina, createVacina } = useVacinas();
  const [showModalVacina, setShowModalVacina] = useState(false);
  const estatisticas = useMemo(() => {
    if (!vacinas || vacinas.length === 0) {
      return {
        totalVacinas: 0,
        vacinasComEstoque: 0,
        vacinasSemEstoque: 0,
        totalDoses: 0,
        vacinasPublicadas: 0,
      };
    }
    const totalVacinas = vacinas.length;
    const vacinasComEstoque = vacinas.filter(
      (v) => (v.quantidade || 0) > 0
    ).length;
    const vacinasSemEstoque = vacinas.filter(
      (v) => (v.quantidade || 0) === 0
    ).length;
    const totalDoses = vacinas.reduce((sum, v) => sum + (v.quantidade || 0), 0);
    const vacinasPublicadas = vacinas.filter(
      (v) => v.publicado === true
    ).length;
    return {
      totalVacinas,
      vacinasComEstoque,
      vacinasSemEstoque,
      totalDoses,
      vacinasPublicadas,
    };
  }, [vacinas]);
  const formatarNumero = (num) => {
    return num.toLocaleString("pt-BR");
  };
  if (loading) {
    return (
      <AdminLayout currentPage="estoque-vacinas">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }
  if (error) {
    return (
      <AdminLayout currentPage="estoque-vacinas">
        <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
          <div className="flex gap-3">
            <AlertCircle
              size={20}
              className="text-error flex-shrink-0 mt-0.5"
            />
            <div className="text-sm text-error">{error}</div>
          </div>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout currentPage="estoque-vacinas">
      <div className="max-w-7xl mx-auto space-y-6">
        {}
        <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-neutral-700 rounded-md flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-neutral-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Estoque de Vacinas
              </h1>
              <p
                className="text-sm text-neutral-600"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Controle e monitoramento do estoque de vacinas
              </p>
            </div>
          </div>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold text-neutral-600 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Total de Vacinas
              </span>
              <Package className="w-4 h-4 text-neutral-500" />
            </div>
            <p
              className="text-2xl font-bold text-neutral-900"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {estatisticas.totalVacinas}
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold text-neutral-600 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Com Estoque
              </span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p
              className="text-2xl font-bold text-green-700"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {estatisticas.vacinasComEstoque}
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold text-neutral-600 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Sem Estoque
              </span>
              <TrendingDown className="w-4 h-4 text-error" />
            </div>
            <p
              className="text-2xl font-bold text-red-700"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {estatisticas.vacinasSemEstoque}
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold text-neutral-600 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Total de Doses
              </span>
              <Shield className="w-4 h-4 text-info" />
            </div>
            <p
              className="text-2xl font-bold text-primary-700"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {formatarNumero(estatisticas.totalDoses)}
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold text-neutral-600 uppercase tracking-wide"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Publicadas
              </span>
              <Shield className="w-4 h-4 text-neutral-500" />
            </div>
            <p
              className="text-2xl font-bold text-neutral-700"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {estatisticas.vacinasPublicadas}
            </p>
          </div>
        </div>
        {}
        <div className="bg-white rounded-md shadow-sm border border-neutral-300 overflow-hidden">
          <div className="bg-neutral-700 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    className="text-lg font-semibold text-white"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Programação de Vacinas
                  </h2>
                  <p
                    className="text-neutral-200 text-xs mt-1"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Gerencie quantidade, período e publicação das vacinas do SUS
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModalVacina(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors font-semibold text-sm shadow-sm"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                <Plus className="w-4 h-4" />
                Nova Vacina
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-100 border-b-2 border-neutral-300">
                <tr>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Vacina
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Finalidade
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Público-Alvo
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Quantidade
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Início do Período
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Fim do Período
                  </th>
                  <th
                    className="text-left p-4 font-semibold text-neutral-800 text-xs uppercase tracking-wide"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    Publicado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {vacinas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-8 text-center text-neutral-500"
                      style={{
                        fontFamily:
                          'Arial, "Helvetica Neue", Helvetica, sans-serif',
                      }}
                    >
                      Nenhuma vacina cadastrada. Clique em "Nova Vacina" para
                      adicionar.
                    </td>
                  </tr>
                ) : (
                  vacinas.map((vacina) => (
                    <VacinaRow
                      key={vacina.id}
                      vacina={vacina}
                      updateVacina={updateVacina}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {}
        {showModalVacina && (
          <ModalCriarVacina
            onClose={() => setShowModalVacina(false)}
            onCreate={createVacina}
            vacinasExistentes={vacinas}
          />
        )}
      </div>
    </AdminLayout>
  );
}
const VacinaEstoqueRow = memo(({ vacina, formatarNumero }) => {
  const quantidade = vacina.quantidade || 0;
  const temEstoque = quantidade > 0;
  const estoqueBaixo = quantidade > 0 && quantidade < 50;
  const getStatusColor = () => {
    if (!temEstoque) return "bg-red-100 text-red-800 border-red-300";
    if (estoqueBaixo) return "bg-warning/20 text-amber-800 border-warning";
    return "bg-success/10 text-green-800 border-success";
  };
  const getStatusText = () => {
    if (!temEstoque) return "Sem Estoque";
    if (estoqueBaixo) return "Estoque Baixo";
    return "Em Estoque";
  };
  const getStatusIcon = () => {
    if (!temEstoque) return <TrendingDown className="w-3.5 h-3.5" />;
    if (estoqueBaixo) return <AlertCircle className="w-3.5 h-3.5" />;
    return <TrendingUp className="w-3.5 h-3.5" />;
  };
  return (
    <tr
      className="hover:bg-neutral-50 transition-colors"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >
      <td className="p-4">
        <div className="font-semibold text-neutral-900">{vacina.nome}</div>
      </td>
      <td className="p-4">
        <div className="font-semibold text-neutral-900">
          {formatarNumero(quantidade)}
        </div>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border ${getStatusColor()}`}
        >
          {getStatusIcon()}
          {getStatusText()}
        </span>
      </td>
      <td className="p-4">
        {vacina.publicado ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-success/10 text-green-800 border border-success">
            <Shield className="w-3.5 h-3.5" />
            Sim
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300">
            <Minus className="w-3.5 h-3.5" />
            Não
          </span>
        )}
      </td>
    </tr>
  );
});
VacinaEstoqueRow.displayName = "VacinaEstoqueRow";
const VacinaRow = memo(({ vacina, updateVacina }) => {
  const timestampToDateString = (timestamp) => {
    if (!timestamp) return "";
    if (timestamp.toDate) {
      return timestamp.toDate().toISOString().split("T")[0];
    }
    if (timestamp instanceof Date) {
      return timestamp.toISOString().split("T")[0];
    }
    if (typeof timestamp === "string") {
      return timestamp.split("T")[0];
    }
    return "";
  };
  const [quantidade, setQuantidade] = useState(vacina.quantidade || 0);
  const [periodoInicio, setPeriodoInicio] = useState(
    timestampToDateString(vacina.periodoInicio)
  );
  const [periodoFim, setPeriodoFim] = useState(
    timestampToDateString(vacina.periodoFim)
  );
  const [publicado, setPublicado] = useState(vacina.publicado ?? false);
  // Sincronizar estado quando vacina mudar (atualização do Firestore)
  useEffect(() => {
    setQuantidade(vacina.quantidade || 0);
    setPeriodoInicio(timestampToDateString(vacina.periodoInicio));
    setPeriodoFim(timestampToDateString(vacina.periodoFim));
    setPublicado(vacina.publicado ?? false);
  }, [vacina]);
  const handleUpdate = async (campo, valor) => {
    await updateVacina(vacina.id, campo, valor);
  };
  return (
    <tr
      className="hover:bg-neutral-50 transition-colors"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >
      <td className="p-4">
        <div className="font-semibold text-neutral-900">{vacina.nome}</div>
      </td>
      <td className="p-4 text-neutral-600">{vacina.finalidade}</td>
      <td className="p-4 text-neutral-600">{vacina.publicoAlvo}</td>
      <td className="p-4">
        <input
          type="number"
          min="0"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          onBlur={(e) => handleUpdate("quantidade", Number(e.target.value))}
          className="w-24 border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        />
      </td>
      <td className="p-4">
        <input
          type="date"
          value={periodoInicio}
          onChange={(e) => setPeriodoInicio(e.target.value)}
          onBlur={(e) =>
            handleUpdate(
              "periodoInicio",
              e.target.value ? new Date(e.target.value) : null
            )
          }
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        />
      </td>
      <td className="p-4">
        <input
          type="date"
          value={periodoFim}
          onChange={(e) => setPeriodoFim(e.target.value)}
          onBlur={(e) =>
            handleUpdate(
              "periodoFim",
              e.target.value ? new Date(e.target.value) : null
            )
          }
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        />
      </td>
      <td className="p-4">
        <button
          onClick={() => {
            const novoStatus = !publicado;
            setPublicado(novoStatus);
            handleUpdate("publicado", novoStatus);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            publicado
              ? "bg-success/10 text-green-800 hover:bg-green-200 border border-success"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-300"
          }`}
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        >
          {publicado ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Sim
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              Não
            </>
          )}
        </button>
      </td>
    </tr>
  );
});
VacinaRow.displayName = "VacinaRow";
const ModalCriarVacina = memo(
  ({ onClose, onCreate, vacinasExistentes = [] }) => {
    const [formData, setFormData] = useState({
      nome: "",
      finalidade: "",
      publicoAlvo: "",
      quantidade: 0,
      periodoInicio: "",
      periodoFim: "",
      publicado: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vacinaSelecionada, setVacinaSelecionada] = useState("");
    // Filtrar vacinas que ainda não foram cadastradas
    const vacinasDisponiveis = vacinas2025.filter((vacina) => {
      // Verificar se a vacina já existe (por ID ou nome)
      return !vacinasExistentes.some(
        (existente) =>
          existente.id === vacina.id ||
          existente.nome.toLowerCase() === vacina.nome.toLowerCase()
      );
    });
    // Preencher formulário quando selecionar uma vacina pré-definida
    const handleSelecionarVacina = (vacinaId) => {
      if (!vacinaId) {
        // Limpar formulário
        setFormData({
          nome: "",
          finalidade: "",
          publicoAlvo: "",
          quantidade: 0,
          periodoInicio: "",
          periodoFim: "",
          publicado: false,
        });
        setVacinaSelecionada("");
        return;
      }
      const vacina = vacinas2025.find((v) => v.id === vacinaId);
      if (vacina) {
        setFormData({
          nome: vacina.nome,
          finalidade: vacina.finalidade,
          publicoAlvo: vacina.publicoAlvo,
          quantidade: vacina.quantidade || 0,
          periodoInicio: "",
          periodoFim: "",
          publicado: false,
        });
        setVacinaSelecionada(vacinaId);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      // Validações
      if (!formData.nome.trim()) {
        setError("O nome da vacina é obrigatório");
        setLoading(false);
        return;
      }
      if (!formData.finalidade.trim()) {
        setError("A finalidade é obrigatória");
        setLoading(false);
        return;
      }
      if (!formData.publicoAlvo.trim()) {
        setError("O público-alvo é obrigatório");
        setLoading(false);
        return;
      }
      if (formData.periodoInicio && formData.periodoFim) {
        const inicio = new Date(formData.periodoInicio);
        const fim = new Date(formData.periodoFim);
        if (fim < inicio) {
          setError("A data de fim deve ser posterior à data de início");
          setLoading(false);
          return;
        }
      }
      const result = await onCreate({
        nome: formData.nome.trim(),
        finalidade: formData.finalidade.trim(),
        publicoAlvo: formData.publicoAlvo.trim(),
        quantidade: Number(formData.quantidade) || 0,
        periodoInicio: formData.periodoInicio || null,
        periodoFim: formData.periodoFim || null,
        publicado: formData.publicado,
      });
      setLoading(false);
      if (result.success) {
        onClose();
        setFormData({
          nome: "",
          finalidade: "",
          publicoAlvo: "",
          quantidade: 0,
          periodoInicio: "",
          periodoFim: "",
          publicado: false,
        });
      } else {
        setError(result.error || "Erro ao criar vacina");
      }
    };
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {}
          <div className="bg-neutral-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Nova Vacina
                </h2>
                <p
                  className="text-neutral-200 text-sm"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Adicione uma nova vacina ao sistema
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-md p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-md">
                <div className="flex gap-3">
                  <AlertCircle
                    size={20}
                    className="text-error flex-shrink-0 mt-0.5"
                  />
                  <div
                    className="text-sm text-error"
                    style={{
                      fontFamily:
                        'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    }}
                  >
                    {error}
                  </div>
                </div>
              </div>
            )}
            {}
            {vacinasDisponiveis.length > 0 && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-md p-4">
                <label
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Ou selecione uma vacina pré-definida do SUS:
                </label>
                <select
                  value={vacinaSelecionada}
                  onChange={(e) => handleSelecionarVacina(e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  <option value="">-- Selecione uma vacina --</option>
                  {vacinasDisponiveis.map((vacina) => (
                    <option key={vacina.id} value={vacina.id}>
                      {vacina.nome}
                    </option>
                  ))}
                </select>
                <p
                  className="text-xs text-neutral-600 mt-2"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  {vacinasDisponiveis.length} vacina(s) disponível(is) para
                  cadastro
                </p>
              </div>
            )}
            {}
            <div>
              <label
                className="block text-sm font-semibold text-neutral-700 mb-2"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Nome da Vacina <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
                placeholder="Ex: BCG, Hepatite B, etc."
                required
              />
            </div>
            {}
            <div>
              <label
                className="block text-sm font-semibold text-neutral-700 mb-2"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Finalidade <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.finalidade}
                onChange={(e) =>
                  setFormData({ ...formData, finalidade: e.target.value })
                }
                className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
                placeholder="Ex: Prevenção das formas graves da tuberculose"
                rows="2"
                required
              />
            </div>
            {}
            <div>
              <label
                className="block text-sm font-semibold text-neutral-700 mb-2"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Público-Alvo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.publicoAlvo}
                onChange={(e) =>
                  setFormData({ ...formData, publicoAlvo: e.target.value })
                }
                className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
                placeholder="Ex: Crianças (Ao nascer até 4 anos)"
                required
              />
            </div>
            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantidade}
                  onChange={(e) =>
                    setFormData({ ...formData, quantidade: e.target.value })
                  }
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Início do Período
                </label>
                <input
                  type="date"
                  value={formData.periodoInicio}
                  onChange={(e) =>
                    setFormData({ ...formData, periodoInicio: e.target.value })
                  }
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
                  Fim do Período
                </label>
                <input
                  type="date"
                  value={formData.periodoFim}
                  onChange={(e) =>
                    setFormData({ ...formData, periodoFim: e.target.value })
                  }
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  style={{
                    fontFamily:
                      'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  }}
                />
              </div>
            </div>
            {}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="publicado"
                checked={formData.publicado}
                onChange={(e) =>
                  setFormData({ ...formData, publicado: e.target.checked })
                }
                className="w-4 h-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500"
              />
              <label
                htmlFor="publicado"
                className="text-sm font-semibold text-neutral-700"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Publicar imediatamente (visível na página pública)
              </label>
            </div>
            {}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors font-semibold"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Criar Vacina
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);
ModalCriarVacina.displayName = "ModalCriarVacina";
