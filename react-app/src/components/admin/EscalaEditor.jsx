import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Users, Search } from 'lucide-react';
import { getAllEmployees } from '../../services/employeesService';

export default function EscalaEditor({ escala, onSave, onClose }) {
  const [editingData, setEditingData] = useState(escala?.profissionais || {});
  const [selectedDate, setSelectedDate] = useState(null);
  const [profissionalInput, setProfissionalInput] = useState('');
  const [turnoSelecionado, setTurnoSelecionado] = useState('manha');
  const [observacoesInput, setObservacoesInput] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    setLoadingEmployees(true);
    const result = await getAllEmployees();
    if (result.success) {
      // Ordenar por nome
      const sorted = result.data.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      setEmployees(sorted);
    }
    setLoadingEmployees(false);
  }

  const getDiasDoMes = (mes, ano) => {
    const diasNoMes = new Date(ano, mes, 0).getDate();
    const dias = [];
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const diaSemana = data.getDay();
      dias.push({
        dia,
        diaSemana,
        data: data.toISOString().split('T')[0],
        nomeDia: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaSemana],
      });
    }
    return dias;
  };

  const handleAddProfissional = (data, turno) => {
    const nome = selectedEmployee || profissionalInput.trim();
    if (!nome) return;

    const diaData = editingData[data] || { manha: [], almoco: [], tarde: [], observacoes: '' };
    const turnoArray = diaData[turno] || [];

    setEditingData({
      ...editingData,
      [data]: {
        ...diaData,
        [turno]: [...turnoArray, nome],
      },
    });

    setProfissionalInput('');
    setSelectedEmployee('');
    setSearchTerm('');
  };

  const handleRemoveProfissional = (data, turno, index) => {
    const diaData = editingData[data];
    const novoArray = diaData[turno].filter((_, i) => i !== index);

    setEditingData({
      ...editingData,
      [data]: {
        ...diaData,
        [turno]: novoArray,
      },
    });
  };

  const handleSaveObservacao = (data) => {
    const diaData = editingData[data] || { manha: [], almoco: [], tarde: [], observacoes: '' };

    setEditingData({
      ...editingData,
      [data]: {
        ...diaData,
        observacoes: observacoesInput,
      },
    });

    setObservacoesInput('');
  };

  const handleSave = () => {
    const escalaAtualizada = {
      ...escala,
      profissionais: editingData,
    };
    onSave(escalaAtualizada);
  };

  const filteredEmployees = employees.filter(emp => {
    const search = searchTerm.toLowerCase();
    return emp.displayName.toLowerCase().includes(search) ||
           emp.role.toLowerCase().includes(search);
  });

  const dias = getDiasDoMes(escala.mes, escala.ano);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-200 flex items-center justify-between z-10 rounded-t-lg">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Editar Escala - {escala.titulo || `${escala.mes}/${escala.ano}`}
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Clique em um dia para adicionar profissionais aos turnos
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid da Escala */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 bg-neutral-50">
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 sticky left-0 bg-neutral-50 z-10">
                    Dia
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[180px]">
                    Manhã
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[180px]">
                    Almoço
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[180px]">
                    Tarde
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[180px]">
                    Observações
                  </th>
                  <th className="text-center py-3 px-3 font-semibold text-neutral-700 w-20">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {dias.map((diaInfo) => {
                  const profissionaisDia = editingData[diaInfo.data] || {
                    manha: [],
                    almoco: [],
                    tarde: [],
                    observacoes: '',
                  };
                  const isWeekend = diaInfo.diaSemana === 0 || diaInfo.diaSemana === 6;
                  const isSelected = selectedDate === diaInfo.data;

                  return (
                    <tr
                      key={diaInfo.data}
                      className={`border-b border-neutral-200 ${
                        isWeekend ? 'bg-neutral-50' : 'bg-white'
                      } ${isSelected ? 'ring-2 ring-blue-500' : ''} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="py-3 px-3 sticky left-0 bg-inherit z-10">
                        <div className="font-medium text-neutral-900">{diaInfo.dia}</div>
                        <div className="text-xs text-neutral-500">{diaInfo.nomeDia}</div>
                      </td>

                      {/* Manhã */}
                      <td className="py-3 px-3">
                        {profissionaisDia.manha?.length > 0 ? (
                          <div className="space-y-1">
                            {profissionaisDia.manha.map((prof, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs group"
                              >
                                <span className="font-medium">{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'manha', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-red-600 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-xs italic">Vazio</span>
                        )}
                      </td>

                      {/* Almoço */}
                      <td className="py-3 px-3">
                        {profissionaisDia.almoco?.length > 0 ? (
                          <div className="space-y-1">
                            {profissionaisDia.almoco.map((prof, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs group"
                              >
                                <span className="font-medium">{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'almoco', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-orange-500 hover:text-red-600 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-xs italic">Vazio</span>
                        )}
                      </td>

                      {/* Tarde */}
                      <td className="py-3 px-3">
                        {profissionaisDia.tarde?.length > 0 ? (
                          <div className="space-y-1">
                            {profissionaisDia.tarde.map((prof, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs group"
                              >
                                <span className="font-medium">{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'tarde', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-amber-500 hover:text-red-600 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-xs italic">Vazio</span>
                        )}
                      </td>

                      {/* Observações */}
                      <td className="py-3 px-3">
                        {profissionaisDia.observacoes ? (
                          <span className="text-xs text-neutral-600">{profissionaisDia.observacoes}</span>
                        ) : (
                          <span className="text-neutral-400 text-xs italic">-</span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedDate(isSelected ? null : diaInfo.data);
                            if (!isSelected) {
                              setSearchTerm('');
                              setSelectedEmployee('');
                              setProfissionalInput('');
                            }
                          }}
                          className={`p-1.5 rounded transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Painel de Edição */}
          {selectedDate && (
            <div className="mt-6 p-5 border-2 border-blue-500 rounded-lg bg-blue-50">
              <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Editando: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Adicionar Profissional */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Adicionar Profissional
                  </label>

                  {/* Seletor de Turno */}
                  <select
                    value={turnoSelecionado}
                    onChange={(e) => setTurnoSelecionado(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="manha">☀️ Manhã</option>
                    <option value="almoco">🍽️ Almoço</option>
                    <option value="tarde">🌙 Tarde</option>
                  </select>

                  {/* Busca de Profissional */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar profissional..."
                      className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Lista de Profissionais */}
                  {loadingEmployees ? (
                    <div className="p-4 text-center text-neutral-500">
                      Carregando profissionais...
                    </div>
                  ) : searchTerm && filteredEmployees.length > 0 ? (
                    <div className="max-h-48 overflow-y-auto border border-neutral-300 rounded-lg bg-white">
                      {filteredEmployees.map(emp => (
                        <button
                          key={emp.id}
                          onClick={() => {
                            setSelectedEmployee(emp.displayName);
                            setSearchTerm(emp.displayName);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-neutral-100 last:border-0 transition-colors"
                        >
                          <div className="font-medium text-sm text-neutral-900">{emp.displayName}</div>
                          <div className="text-xs text-neutral-500">{emp.role}</div>
                        </button>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <div className="p-3 text-sm text-neutral-500 bg-white border border-neutral-300 rounded-lg">
                      Nenhum profissional encontrado. Você pode digitar manualmente.
                    </div>
                  ) : null}

                  {/* Input Manual (Fallback) */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profissionalInput}
                      onChange={(e) => setProfissionalInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddProfissional(selectedDate, turnoSelecionado);
                        }
                      }}
                      placeholder="Ou digite manualmente..."
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleAddProfissional(selectedDate, turnoSelecionado)}
                      disabled={!selectedEmployee && !profissionalInput.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Observações do Dia
                  </label>
                  <textarea
                    value={observacoesInput}
                    onChange={(e) => setObservacoesInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSaveObservacao(selectedDate);
                      }
                    }}
                    placeholder="Ex: Feriado, Treinamento, Reunião, etc."
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    onClick={() => handleSaveObservacao(selectedDate)}
                    className="w-full px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Salvar Observação
                  </button>
                  {editingData[selectedDate]?.observacoes && (
                    <div className="p-3 bg-white border border-neutral-300 rounded-lg">
                      <p className="text-sm text-neutral-600">
                        <strong>Observação atual:</strong> {editingData[selectedDate].observacoes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-6 border-t border-neutral-200 flex gap-3 justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Salvar Escala
          </button>
        </div>
      </div>
    </div>
  );
}
