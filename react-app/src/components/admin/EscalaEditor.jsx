import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function EscalaEditor({ escala, onSave, onClose }) {
  const [editingData, setEditingData] = useState(escala?.profissionais || {});
  const [selectedDate, setSelectedDate] = useState(null);
  const [profissionalInput, setProfissionalInput] = useState('');
  const [turnoSelecionado, setTurnoSelecionado] = useState('manha');
  const [observacoesInput, setObservacoesInput] = useState('');

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
    if (!profissionalInput.trim()) return;

    const diaData = editingData[data] || { manha: [], almoco: [], tarde: [], observacoes: '' };
    const turnoArray = diaData[turno] || [];

    setEditingData({
      ...editingData,
      [data]: {
        ...diaData,
        [turno]: [...turnoArray, profissionalInput.trim()],
      },
    });

    setProfissionalInput('');
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
    setSelectedDate(null);
  };

  const handleSave = () => {
    const escalaAtualizada = {
      ...escala,
      profissionais: editingData,
    };
    onSave(escalaAtualizada);
  };

  const dias = getDiasDoMes(escala.mes, escala.ano);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-200 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-neutral-900">
              Editar Escala - {escala.titulo || `${escala.mes}/${escala.ano}`}
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Clique em um dia para adicionar profissionais
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
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 bg-neutral-50">
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 sticky left-0 bg-neutral-50">
                    Dia
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[150px]">
                    Manhã
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[150px]">
                    Almoço
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[150px]">
                    Tarde
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-neutral-700 min-w-[150px]">
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
                      } ${isSelected ? 'ring-2 ring-gov-blue' : ''} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="py-3 px-3 sticky left-0 bg-inherit">
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
                                <span>{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'manha', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-red-600 transition-opacity"
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
                                <span>{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'almoco', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-orange-500 hover:text-red-600 transition-opacity"
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
                                <span>{prof}</span>
                                <button
                                  onClick={() => handleRemoveProfissional(diaInfo.data, 'tarde', idx)}
                                  className="opacity-0 group-hover:opacity-100 text-amber-500 hover:text-red-600 transition-opacity"
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
                          onClick={() => setSelectedDate(isSelected ? null : diaInfo.data)}
                          className={`p-1.5 rounded transition-colors ${
                            isSelected
                              ? 'bg-gov-blue text-white'
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
            <div className="mt-6 p-4 border-2 border-gov-blue rounded-lg bg-blue-50">
              <h4 className="font-semibold text-neutral-900 mb-4">
                Editando: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Adicionar Profissional */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Adicionar Profissional
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={turnoSelecionado}
                      onChange={(e) => setTurnoSelecionado(e.target.value)}
                      className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                    >
                      <option value="manha">Manhã</option>
                      <option value="almoco">Almoço</option>
                      <option value="tarde">Tarde</option>
                    </select>
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
                      placeholder="Nome do profissional"
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                    />
                    <button
                      onClick={() => handleAddProfissional(selectedDate, turnoSelecionado)}
                      className="px-4 py-2 bg-gov-blue text-white rounded-lg hover:bg-gov-blue-dark transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Observações do Dia
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={observacoesInput}
                      onChange={(e) => setObservacoesInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveObservacao(selectedDate);
                        }
                      }}
                      placeholder="Ex: Feriado, Treinamento, etc."
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                    />
                    <button
                      onClick={() => handleSaveObservacao(selectedDate)}
                      className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-6 border-t border-neutral-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gov-blue text-white rounded-lg hover:bg-gov-blue-dark transition-colors"
          >
            Salvar Escala
          </button>
        </div>
      </div>
    </div>
  );
}
