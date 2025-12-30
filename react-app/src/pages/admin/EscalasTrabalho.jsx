import { useState, useEffect, useRef } from "react";
import {
  getAllEscalas,
  saveEscala,
  deleteEscala,
  bulkImportEscalas
} from "../../services/escalasService";
import { getAllEmployees } from "../../services/employeesService";
import { escalasTrabalho } from "../../data/escalasTrabalho";
import { useModal } from "../../contexts/ModalContext";
import { Plus, Edit2, Trash2, Eye, EyeOff, Upload, Save, X, Search } from "lucide-react";

export default function EscalasTrabalho() {
  const { showModal } = useModal();
  const [escalas, setEscalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [autocompleteStates, setAutocompleteStates] = useState({});
  const autocompleteRefs = useRef({});

  useEffect(() => {
    loadEscalas();
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const result = await getAllEmployees();
      if (result.success && result.data) {
        setEmployees(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    }
  };

  const loadEscalas = async () => {
    setLoading(true);
    const result = await getAllEscalas();
    if (result.success) {
      setEscalas(result.data);
    }
    setLoading(false);
  };

  const handleImportData = async () => {
    showModal({
      type: "confirmation",
      title: "Importar Dados",
      message: "Importar dados do arquivo escalasTrabalho.js? Isso irá sobrescrever escalas existentes.",
      onConfirm: async () => {
        setSaving(true);
        setMessage(null);

        const result = await bulkImportEscalas(escalasTrabalho);

        if (result.success) {
          setMessage({ type: "success", text: result.message });
          await loadEscalas();
          showModal({
            type: "success",
            title: "Sucesso",
            message: result.message,
          });
        } else {
          setMessage({ type: "error", text: "Erro ao importar: " + result.error });
          showModal({
            type: "error",
            title: "Erro",
            message: "Erro ao importar: " + result.error,
          });
        }

        setSaving(false);
      },
    });
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
        }
      },
      profissionais: [],
      exibirNoPublico: true,
      observacoes: []
    });
  };

  const handleEdit = (escala) => {
    setEditingId(escala.id);
    setCreating(false);
    setEditData({
      ...escala,
      horarios: {
        manha: {
          ...escala.horarios?.manha,
          ativo: escala.horarios?.manha?.ativo ?? false,
          display: escala.horarios?.manha?.display || "",
        },
        tarde: {
          ...escala.horarios?.tarde,
          ativo: escala.horarios?.tarde?.ativo ?? false,
          display: escala.horarios?.tarde?.display || "",
        },
      },
      profissionais: escala.profissionais || [],
      exibirNoPublico: escala.exibirNoPublico ?? true,
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

  const handleDelete = async (escalaId) => {
    showModal({
      type: "confirmation",
      title: "Deletar Escala",
      message: "Tem certeza que deseja deletar esta escala?",
      onConfirm: async () => {
        setSaving(true);
        setMessage(null);

        const result = await deleteEscala(escalaId);

        if (result.success) {
          setMessage({ type: "success", text: "Escala deletada com sucesso!" });
          await loadEscalas();
          showModal({
            type: "success",
            title: "Sucesso",
            message: "Escala deletada com sucesso!",
          });
        } else {
          setMessage({ type: "error", text: "Erro ao deletar: " + result.error });
          showModal({
            type: "error",
            title: "Erro",
            message: "Erro ao deletar: " + result.error,
          });
        }

        setSaving(false);
      },
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
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Escalas de Trabalho</h1>
          <p className="text-neutral-600">Gerencie as escalas de trabalho dos profissionais</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleImportData}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Upload size={18} />
            Importar Dados
          </button>
          <button
            onClick={handleCreate}
            disabled={saving || creating}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            <Plus size={18} />
            Nova Escala
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Filtrar
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Formulário de Criação/Edição */}
      {(creating || editingId) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-500">
          <h2 className="text-xl font-bold mb-4">
            {creating ? "Criar Nova Escala" : "Editar Escala"}
          </h2>

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
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Profissionais da Escala</h3>
              <button
                type="button"
                onClick={() => {
                  const novosProfissionais = [...(editData.profissionais || []), { nome: "", funcao: "", turno: "manha" }];
                  setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));
                }}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Plus size={16} />
                Adicionar Profissional
              </button>
            </div>
            <div className="space-y-3">
              {(editData.profissionais || []).map((prof, index) => {
                const autocompleteKey = `prof-${index}`;
                const currentState = autocompleteStates[autocompleteKey];
                const autocompleteState = currentState || {
                  showSuggestions: false,
                  suggestions: [],
                  inputValue: prof.nome || ""
                };

                const handleNameInputChange = (value) => {
                  const novosProfissionais = [...(editData.profissionais || [])];
                  novosProfissionais[index] = { ...prof, nome: value };
                  setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));

                  if (value.length >= 2 && employees.length > 0) {
                    const filtered = employees.filter(emp => {
                      const fullName = (emp.fullName || emp.displayName || "").toLowerCase();
                      const searchTerm = value.toLowerCase().trim();
                      return fullName.includes(searchTerm);
                    }).slice(0, 5);

                    setAutocompleteStates(prev => ({
                      ...prev,
                      [autocompleteKey]: {
                        showSuggestions: filtered.length > 0,
                        suggestions: filtered,
                        inputValue: value
                      }
                    }));
                  } else {
                    setAutocompleteStates(prev => ({
                      ...prev,
                      [autocompleteKey]: {
                        showSuggestions: false,
                        suggestions: [],
                        inputValue: value
                      }
                    }));
                  }
                };

                const handleSelectEmployee = (employee) => {
                  const novosProfissionais = [...(editData.profissionais || [])];
                  novosProfissionais[index] = {
                    ...prof,
                    nome: employee.fullName || employee.displayName || "",
                    funcao: employee.roleBase || employee.role || prof.funcao || ""
                  };
                  setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));

                  setAutocompleteStates(prev => ({
                    ...prev,
                    [autocompleteKey]: {
                      showSuggestions: false,
                      suggestions: [],
                      inputValue: employee.fullName || employee.displayName || ""
                    }
                  }));
                };

                return (
                  <div key={index} className="border rounded p-3 bg-neutral-50 relative">
                    <div className="grid md:grid-cols-3 gap-3 mb-2">
                      <div className="relative">
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Nome Completo (Nome e Sobrenome) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={prof.nome || ""}
                            onChange={(e) => handleNameInputChange(e.target.value)}
                            onFocus={() => {
                              const currentValue = prof.nome || "";
                              if (currentValue.length >= 2 && employees.length > 0) {
                                const filtered = employees.filter(emp => {
                                  const fullName = (emp.fullName || emp.displayName || "").toLowerCase();
                                  return fullName.includes(currentValue.toLowerCase().trim());
                                }).slice(0, 5);
                                setAutocompleteStates(prev => ({
                                  ...prev,
                                  [autocompleteKey]: {
                                    showSuggestions: filtered.length > 0,
                                    suggestions: filtered,
                                    inputValue: currentValue
                                  }
                                }));
                              } else if (employees.length > 0) {
                                setAutocompleteStates(prev => ({
                                  ...prev,
                                  [autocompleteKey]: {
                                    showSuggestions: false,
                                    suggestions: [],
                                    inputValue: currentValue
                                  }
                                }));
                              }
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setAutocompleteStates(prev => ({
                                  ...prev,
                                  [autocompleteKey]: {
                                    ...prev[autocompleteKey],
                                    showSuggestions: false
                                  }
                                }));
                              }, 200);
                            }}
                            className="w-full px-2 py-1 pr-8 border border-neutral-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={employees.length > 0 ? "Digite para buscar..." : "Carregando funcionários..."}
                            disabled={employees.length === 0}
                          />
                          <Search size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                        {autocompleteState && autocompleteState.showSuggestions && autocompleteState.suggestions && autocompleteState.suggestions.length > 0 && (
                          <div className="absolute z-[9999] w-full mt-1 bg-white border border-neutral-300 rounded-md shadow-xl max-h-60 overflow-y-auto">
                            {autocompleteState.suggestions.map((employee, idx) => (
                              <button
                                key={employee.id || `emp-${idx}`}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSelectEmployee(employee);
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSelectEmployee(employee);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-neutral-100 last:border-b-0 transition-colors cursor-pointer"
                              >
                                <div className="font-medium text-sm text-neutral-900">
                                  {employee.fullName || employee.displayName || 'Nome não disponível'}
                                </div>
                                <div className="text-xs text-neutral-600 mt-0.5">
                                  {employee.roleBase || employee.role || employee.departmentName || 'Profissional'}
                                </div>
                                {employee.departmentName && (
                                  <div className="text-xs text-neutral-400 mt-0.5">
                                    {employee.departmentName}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Função *
                      </label>
                      <input
                        type="text"
                        value={prof.funcao || ""}
                        onChange={(e) => {
                          const novosProfissionais = [...(editData.profissionais || [])];
                          novosProfissionais[index] = { ...prof, funcao: e.target.value };
                          setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));
                        }}
                        className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                        placeholder="Ex: Técnica de Enfermagem"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Turno *
                      </label>
                      <select
                        value={prof.turno || "manha"}
                        onChange={(e) => {
                          const novosProfissionais = [...(editData.profissionais || [])];
                          novosProfissionais[index] = { ...prof, turno: e.target.value };
                          setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));
                        }}
                        className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                      >
                        <option value="manha">Manhã</option>
                        <option value="tarde">Tarde</option>
                        <option value="both">Manhã e Tarde</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const novosProfissionais = (editData.profissionais || []).filter((_, i) => i !== index);
                      setEditData(prev => ({ ...prev, profissionais: novosProfissionais }));
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                    Remover
                  </button>
                </div>
                );
              })}
              {(!editData.profissionais || editData.profissionais.length === 0) && (
                <p className="text-sm text-neutral-500 italic text-center py-2">
                  Nenhum profissional adicionado. Clique em "Adicionar Profissional" para incluir.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
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
      )}

      {/* Lista de Escalas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Horário de Atendimento
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                  Profissionais
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-700">
                  Público
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredEscalas.map(escala => (
                <tr key={escala.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {escala.horarios?.manha?.ativo && (
                      <div className="flex items-center gap-1">
                        <span className="text-blue-600 font-medium">M:</span>
                        <span>{escala.horarios.manha.display}</span>
                      </div>
                    )}
                    {escala.horarios?.tarde?.ativo && (
                      <div className="flex items-center gap-1">
                        <span className="text-amber-600 font-medium">T:</span>
                        <span>{escala.horarios.tarde.display}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{escala.nome}</div>
                    <div className="text-xs text-neutral-500">{escala.descricao}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {escala.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {escala.profissionais && escala.profissionais.length > 0 ? (
                      <div className="space-y-2">
                        {escala.profissionais.map((prof, idx) => (
                          <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded p-2">
                            <div className="font-semibold text-neutral-900 text-sm break-words" title={prof.nome || 'Sem nome'}>
                              {prof.nome || 'Sem nome'}
                            </div>
                            {prof.funcao && (
                              <div className="text-xs text-neutral-600 mt-0.5">{prof.funcao}</div>
                            )}
                            {prof.turno && (
                              <div className="text-xs mt-1">
                                <span className={`px-2 py-0.5 rounded ${
                                  prof.turno === 'manha' ? 'bg-blue-100 text-blue-700' :
                                  prof.turno === 'tarde' ? 'bg-amber-100 text-amber-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {prof.turno === 'manha' ? 'Manhã' : prof.turno === 'tarde' ? 'Tarde' : 'Manhã e Tarde'}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-neutral-400 text-xs italic">Nenhum profissional cadastrado</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {escala.exibirNoPublico ? (
                      <Eye size={18} className="inline text-green-600" />
                    ) : (
                      <EyeOff size={18} className="inline text-neutral-400" />
                    )}
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
                        onClick={() => handleDelete(escala.id)}
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

      {filteredEscalas.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          Nenhuma escala encontrada para este filtro.
        </div>
      )}
    </div>
  );
}
