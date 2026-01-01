import { useState, useEffect } from "react";
import {
  getAllEscalas,
  saveEscala,
  deleteEscala,
  updateEscala
} from "../../services/escalasService";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, User } from "lucide-react";
import ProfissionalAutocomplete from "../../components/admin/ProfissionalAutocomplete";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";

export default function EscalasTrabalho() {
  const [escalas, setEscalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [modalConfig, setModalConfig] = useState(null);
  const [togglingVisibility, setTogglingVisibility] = useState(null); // ID da escala sendo atualizada

  useEffect(() => {
    loadEscalas();
  }, []);

  const loadEscalas = async () => {
    setLoading(true);
    const result = await getAllEscalas();
    if (result.success) {
      setEscalas(result.data);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setCreating(true);
    setEditingId(null);
    setEditData({
      nome: "",
      categoria: "Enfermagem",
      descricao: "",
      department: "tecnicoEnfermagem",
      horarios: {
        manha: {
          inicio: "07h00",
          fim: "11h00",
          display: "07h00 às 11h00",
          ativo: true
        },
        tarde: {
          inicio: "13h00",
          fim: "16h00",
          display: "13h00 às 16h00",
          ativo: true
        },
        saudeNaHora: {
          inicio: "17h00",
          fim: "22h00",
          display: "17h00 às 22h00",
          ativo: false
        }
      },
      profissionais: [],
      escalaSemanal: {
        habilitado: false,
        dias: {
          segunda: { profissionais: [] },
          terca: { profissionais: [] },
          quarta: { profissionais: [] },
          quinta: { profissionais: [] },
          sexta: { profissionais: [] }
        }
      },
      exibirNoPublico: true,
      observacoes: []
    });
  };

  const handleEdit = (escala) => {
    setEditingId(escala.id);
    setCreating(false);
    
    // Garantir que escalaSemanal tenha a estrutura completa
    const escalaSemanalCompleta = {
      habilitado: escala.escalaSemanal?.habilitado || false,
      dias: escala.escalaSemanal?.dias || {
        segunda: { profissionais: [], ativo: false },
        terca: { profissionais: [], ativo: false },
        quarta: { profissionais: [], ativo: false },
        quinta: { profissionais: [], ativo: false },
        sexta: { profissionais: [], ativo: false }
      }
    };

    // Garantir que cada dia tenha a estrutura correta
    ['segunda', 'terca', 'quarta', 'quinta', 'sexta'].forEach(dia => {
      if (!escalaSemanalCompleta.dias[dia]) {
        escalaSemanalCompleta.dias[dia] = { profissionais: [], ativo: false };
      } else {
        if (!escalaSemanalCompleta.dias[dia].profissionais) {
          escalaSemanalCompleta.dias[dia].profissionais = [];
        }
        if (escalaSemanalCompleta.dias[dia].ativo === undefined) {
          escalaSemanalCompleta.dias[dia].ativo = false;
        }
      }
    });

    setEditData({ 
      ...escala, 
      escalaSemanal: escalaSemanalCompleta 
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setCreating(false);
    setEditData({});
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    // Gerar ID se for criação
    const id = creating
      ? editData.nome.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      : editingId;

    const result = await saveEscala(id, editData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      await loadEscalas();
      handleCancel();
    } else {
      setMessage({ type: "error", text: "Erro ao salvar: " + result.error });
    }

    setSaving(false);
  };

  const handleDelete = (escalaId, escalaNome) => {
    setModalConfig({
      type: "warning",
      title: "Confirmar Exclusão",
      message: `Tem certeza que deseja deletar a escala "${escalaNome}"?\n\nEsta ação não pode ser desfeita.`,
      confirmText: "Sim, Deletar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        setModalConfig(null);
        setSaving(true);
        setMessage(null);

        const result = await deleteEscala(escalaId);

        if (result.success) {
          setMessage({ type: "success", text: "Escala deletada com sucesso!" });
          await loadEscalas();
        } else {
          setMessage({ type: "error", text: "Erro ao deletar: " + result.error });
        }

        setSaving(false);
      },
      onCancel: () => setModalConfig(null)
    });
  };

  const handleFieldChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHorarioChange = (periodo, field, value) => {
    setEditData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [periodo]: {
          ...prev.horarios[periodo],
          [field]: value
        }
      }
    }));
  };

  const handleAddProfissional = (profissional) => {
    setEditData(prev => ({
      ...prev,
      profissionais: [...(prev.profissionais || []), profissional]
    }));
  };

  const handleRemoveProfissional = (index) => {
    setEditData(prev => ({
      ...prev,
      profissionais: prev.profissionais.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateProfissionalTurno = (index, turno) => {
    setEditData(prev => ({
      ...prev,
      profissionais: prev.profissionais.map((prof, i) =>
        i === index ? { ...prof, turno } : prof
      )
    }));
  };

  const handleToggleEscalaSemanal = (habilitado) => {
    setEditData(prev => ({
      ...prev,
      escalaSemanal: {
        ...prev.escalaSemanal,
        habilitado,
        dias: habilitado ? {
          segunda: { profissionais: [] },
          terca: { profissionais: [] },
          quarta: { profissionais: [] },
          quinta: { profissionais: [] },
          sexta: { profissionais: [] }
        } : {
          segunda: { profissionais: [] },
          terca: { profissionais: [] },
          quarta: { profissionais: [] },
          quinta: { profissionais: [] },
          sexta: { profissionais: [] }
        }
      }
    }));
  };

  const handleToggleDiaSemanal = (dia) => {
    setEditData(prev => {
      const diasAtuais = prev.escalaSemanal?.dias || {};
      const diaAtual = diasAtuais[dia] || { profissionais: [] };
      const diasAtualizados = { ...diasAtuais };
      
      if (diaAtual.ativo) {
        diasAtualizados[dia] = { profissionais: [], ativo: false };
      } else {
        diasAtualizados[dia] = { profissionais: [], ativo: true };
      }

      return {
        ...prev,
        escalaSemanal: {
          ...prev.escalaSemanal,
          dias: diasAtualizados
        }
      };
    });
  };

  const handleAddProfissionalPorDia = (dia, profissional) => {
    setEditData(prev => {
      const diasAtuais = prev.escalaSemanal?.dias || {};
      const diaAtual = diasAtuais[dia] || { profissionais: [] };
      const profissionaisAtuais = diaAtual.profissionais || [];
      
      const profissionalJaExiste = profissionaisAtuais.some(
        p => p.id === profissional.id
      );

      if (profissionalJaExiste) {
        return prev;
      }

      return {
        ...prev,
        escalaSemanal: {
          ...prev.escalaSemanal,
          dias: {
            ...diasAtuais,
            [dia]: {
              ...diaAtual,
              profissionais: [...profissionaisAtuais, {
                ...profissional,
                turno: profissional.turno || 'manha'
              }]
            }
          }
        }
      };
    });
  };

  const handleRemoveProfissionalPorDia = (dia, index) => {
    setEditData(prev => {
      const diasAtuais = prev.escalaSemanal?.dias || {};
      const diaAtual = diasAtuais[dia] || { profissionais: [] };
      
      return {
        ...prev,
        escalaSemanal: {
          ...prev.escalaSemanal,
          dias: {
            ...diasAtuais,
            [dia]: {
              ...diaAtual,
              profissionais: diaAtual.profissionais.filter((_, i) => i !== index)
            }
          }
        }
      };
    });
  };

  const handleUpdateProfissionalTurnoPorDia = (dia, index, turno) => {
    setEditData(prev => {
      const diasAtuais = prev.escalaSemanal?.dias || {};
      const diaAtual = diasAtuais[dia] || { profissionais: [] };
      
      return {
        ...prev,
        escalaSemanal: {
          ...prev.escalaSemanal,
          dias: {
            ...diasAtuais,
            [dia]: {
              ...diaAtual,
              profissionais: diaAtual.profissionais.map((prof, i) =>
                i === index ? { ...prof, turno } : prof
              )
            }
          }
        }
      };
    });
  };

  const handleToggleVisibilidade = async (e, escalaId, currentValue) => {
    e.preventDefault();
    e.stopPropagation();

    setTogglingVisibility(escalaId);
    setMessage(null);

    const result = await updateEscala(escalaId, {
      exibirNoPublico: !currentValue
    });

    if (result.success) {
      setMessage({
        type: "success",
        text: !currentValue ? "Escala agora está visível no site público" : "Escala ocultada do site público"
      });
      await loadEscalas();
    } else {
      setMessage({ type: "error", text: "Erro ao atualizar visibilidade: " + result.error });
    }

    setTogglingVisibility(null);
  };

  const filteredEscalas = escalas.filter(escala => {
    if (filter === "all") return true;
    if (filter === "publicas") return escala.exibirNoPublico;
    if (filter === "internas") return !escala.exibirNoPublico;
    return escala.categoria === filter;
  });

  const categorias = ["Enfermagem", "Administrativo", "Farmácia", "Médico", "Exames"];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <BackButton />
        <button
          onClick={handleCreate}
          disabled={saving || creating}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 w-full sm:w-auto text-sm"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Nova Escala</span>
        </button>
      </div>

      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">Escalas de Trabalho</h1>
        <p className="text-xs sm:text-sm md:text-base text-neutral-600">Gerencie as escalas de trabalho dos profissionais</p>
      </div>

      {message && (
        <div className={`p-3 sm:p-4 mb-3 sm:mb-4 rounded text-sm ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
          Filtrar
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">Todas as Escalas</option>
          <option value="publicas">Apenas Públicas</option>
          <option value="internas">Apenas Internas</option>
          <option value="---" disabled>───────────</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Formulário de Criação/Edição - Modal Overlay */}
      {(creating || editingId) && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleCancel}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {creating ? "Criar Nova Escala" : "Editar Escala"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Fechar"
                >
                  <X size={18} className="sm:w-5 sm:h-5 text-neutral-600" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                value={editData.nome || ""}
                onChange={(e) => handleFieldChange("nome", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Sala de Curativos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Categoria *
              </label>
              <select
                value={editData.categoria || ""}
                onChange={(e) => handleFieldChange("categoria", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Descrição
              </label>
              <textarea
                value={editData.descricao || ""}
                onChange={(e) => handleFieldChange("descricao", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Descrição do serviço..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Departamento
              </label>
              <input
                type="text"
                value={editData.department || ""}
                onChange={(e) => handleFieldChange("department", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: tecnicoEnfermagem"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editData.exibirNoPublico || false}
                  onChange={(e) => handleFieldChange("exibirNoPublico", e.target.checked)}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Exibir no site público
                </span>
              </label>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <h3 className="font-semibold mb-3">Horários</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Manhã</h4>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={editData.horarios?.manha?.ativo || false}
                      onChange={(e) => handleHorarioChange("manha", "ativo", e.target.checked)}
                      className="mr-1"
                    />
                    Ativo
                  </label>
                </div>
                <input
                  type="text"
                  value={editData.horarios?.manha?.display || ""}
                  onChange={(e) => handleHorarioChange("manha", "display", e.target.value)}
                  className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                  placeholder="07h00 às 11h00"
                />
              </div>

              <div className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Tarde</h4>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={editData.horarios?.tarde?.ativo || false}
                      onChange={(e) => handleHorarioChange("tarde", "ativo", e.target.checked)}
                      className="mr-1"
                    />
                    Ativo
                  </label>
                </div>
                <input
                  type="text"
                  value={editData.horarios?.tarde?.display || ""}
                  onChange={(e) => handleHorarioChange("tarde", "display", e.target.value)}
                  className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                  placeholder="13h00 às 16h00"
                />
              </div>

              <div className="border rounded p-3 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900">Saúde na Hora</h4>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={editData.horarios?.saudeNaHora?.ativo || false}
                      onChange={(e) => handleHorarioChange("saudeNaHora", "ativo", e.target.checked)}
                      className="mr-1"
                    />
                    Ativo
                  </label>
                </div>
                <input
                  type="text"
                  value={editData.horarios?.saudeNaHora?.display || ""}
                  onChange={(e) => handleHorarioChange("saudeNaHora", "display", e.target.value)}
                  className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                  placeholder="17h00 às 22h00"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Profissionais
              </h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editData.escalaSemanal?.habilitado || false}
                  onChange={(e) => handleToggleEscalaSemanal(e.target.checked)}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Escala por dias da semana
                </span>
              </label>
            </div>

            {editData.escalaSemanal?.habilitado ? (
              /* Modo Escala Semanal - Profissionais por Dia */
              <div className="space-y-4">
                {['segunda', 'terca', 'quarta', 'quinta', 'sexta'].map((dia) => {
                  const diaLabel = {
                    segunda: 'Segunda-feira',
                    terca: 'Terça-feira',
                    quarta: 'Quarta-feira',
                    quinta: 'Quinta-feira',
                    sexta: 'Sexta-feira'
                  }[dia];
                  
                  const diaAtual = editData.escalaSemanal?.dias?.[dia] || { profissionais: [], ativo: false };
                  const profissionaisDoDia = diaAtual.profissionais || [];

                  return (
                    <div key={dia} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={diaAtual.ativo || false}
                            onChange={() => handleToggleDiaSemanal(dia)}
                            className="mr-2 w-4 h-4"
                          />
                          <span className="font-semibold text-neutral-900">
                            {diaLabel}
                          </span>
                        </label>
                      </div>

                      {diaAtual.ativo && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Adicionar Profissional para {diaLabel}
                            </label>
                            <ProfissionalAutocomplete 
                              onAddProfissional={(prof) => handleAddProfissionalPorDia(dia, prof)} 
                            />
                          </div>

                          {profissionaisDoDia.length > 0 ? (
                            <div className="space-y-2">
                              {profissionaisDoDia.map((prof, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded"
                                >
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-neutral-900">
                                      {prof.nome}
                                    </div>
                                    <div className="text-xs text-neutral-600">{prof.funcao}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={prof.turno || 'manha'}
                                      onChange={(e) => handleUpdateProfissionalTurnoPorDia(dia, index, e.target.value)}
                                      className="px-2 py-1 text-xs border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      <option value="manha">Manhã</option>
                                      <option value="tarde">Tarde</option>
                                      <option value="saudeNaHora">Saúde na Hora</option>
                                      <option value="both">Manhã e Tarde</option>
                                    </select>
                                    <button
                                      onClick={() => handleRemoveProfissionalPorDia(dia, index)}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                                      title="Remover"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 bg-white border border-neutral-200 rounded">
                              <p className="text-xs text-neutral-500">
                                Nenhum profissional adicionado para este dia
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Modo Normal - Profissionais Gerais */
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Adicionar Profissional
                  </label>
                  <ProfissionalAutocomplete onAddProfissional={handleAddProfissional} />
                  <p className="text-xs text-neutral-500 mt-1">
                    Digite o nome para buscar e adicionar profissionais
                  </p>
                </div>

                {editData.profissionais && editData.profissionais.length > 0 ? (
                  <div className="space-y-2">
                    {editData.profissionais.map((prof, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm text-neutral-900">
                            {prof.nome}
                          </div>
                          <div className="text-xs text-neutral-600">{prof.funcao}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={prof.turno}
                            onChange={(e) => handleUpdateProfissionalTurno(index, e.target.value)}
                            className="px-2 py-1 text-xs border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="saudeNaHora">Saúde na Hora</option>
                            <option value="both">Manhã e Tarde</option>
                          </select>
                          <button
                            onClick={() => handleRemoveProfissional(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Remover"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-neutral-50 border border-neutral-200 rounded">
                    <User className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                    <p className="text-sm text-neutral-600">
                      Nenhum profissional adicionado
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Use o campo acima para adicionar profissionais
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-2 justify-end">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !editData.nome}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lista de Escalas - Desktop (Tabela) */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Horários
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-700">
                  Visibilidade
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredEscalas.map(escala => (
                <tr key={escala.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{escala.nome}</div>
                    <div className="text-xs text-neutral-500">{escala.descricao}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {escala.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {escala.horarios?.manha?.ativo && (
                      <div>Manhã: {escala.horarios.manha.display}</div>
                    )}
                    {escala.horarios?.tarde?.ativo && (
                      <div>Tarde: {escala.horarios.tarde.display}</div>
                    )}
                    {escala.horarios?.saudeNaHora?.ativo && (
                      <div className="text-green-700 font-medium">Saúde na Hora: {escala.horarios.saudeNaHora.display}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => handleToggleVisibilidade(e, escala.id, escala.exibirNoPublico)}
                      disabled={togglingVisibility === escala.id}
                      className={`p-2 rounded-lg transition-all disabled:opacity-50 ${
                        escala.exibirNoPublico
                          ? 'bg-green-50 hover:bg-green-100'
                          : 'bg-neutral-50 hover:bg-neutral-100'
                      }`}
                      title={escala.exibirNoPublico ? "✓ Visível no site - Clique para ocultar" : "✗ Oculto do site - Clique para exibir"}
                    >
                      {escala.exibirNoPublico ? (
                        <Eye size={20} className="text-green-600" />
                      ) : (
                        <EyeOff size={20} className="text-neutral-500" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(escala)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(escala.id, escala.nome)}
                        disabled={saving}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        title="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista de Escalas - Mobile (Cards) */}
      <div className="md:hidden space-y-4">
        {filteredEscalas.map(escala => (
          <div key={escala.id} className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-900 mb-1">{escala.nome}</h3>
                  <p className="text-xs text-neutral-500 mb-2">{escala.descricao}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {escala.categoria}
                  </span>
                </div>
                <button
                  onClick={(e) => handleToggleVisibilidade(e, escala.id, escala.exibirNoPublico)}
                  disabled={togglingVisibility === escala.id}
                  className={`p-2 rounded-lg transition-all disabled:opacity-50 flex-shrink-0 ${
                    escala.exibirNoPublico
                      ? 'bg-green-50 hover:bg-green-100'
                      : 'bg-neutral-50 hover:bg-neutral-100'
                  }`}
                  title={escala.exibirNoPublico ? "✓ Visível" : "✗ Oculto"}
                >
                  {escala.exibirNoPublico ? (
                    <Eye size={20} className="text-green-600" />
                  ) : (
                    <EyeOff size={20} className="text-neutral-500" />
                  )}
                </button>
              </div>

              <div className="border-t border-neutral-100 pt-3 mb-3">
                <div className="text-sm text-neutral-700 space-y-1">
                  {escala.horarios?.manha?.ativo && (
                    <div><strong>Manhã:</strong> {escala.horarios.manha.display}</div>
                  )}
                  {escala.horarios?.tarde?.ativo && (
                    <div><strong>Tarde:</strong> {escala.horarios.tarde.display}</div>
                  )}
                  {escala.horarios?.saudeNaHora?.ativo && (
                    <div className="text-green-700 font-medium">
                      <strong>Saúde na Hora:</strong> {escala.horarios.saudeNaHora.display}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 border-t border-neutral-100 pt-3">
                <button
                  onClick={() => handleEdit(escala)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 size={16} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(escala.id, escala.nome)}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEscalas.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          Nenhuma escala encontrada para este filtro.
        </div>
      )}

      {/* Modal de Confirmação */}
      {modalConfig && (
        <Modal
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          confirmText={modalConfig.confirmText}
          cancelText={modalConfig.cancelText}
          onConfirm={modalConfig.onConfirm}
          onCancel={modalConfig.onCancel}
        />
      )}
    </div>
  );
}
