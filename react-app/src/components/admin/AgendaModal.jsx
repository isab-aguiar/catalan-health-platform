import React, { useState, useEffect } from 'react';
import { X, Clock, Plus, Trash2, Calendar } from 'lucide-react';
import { CATEGORIAS_PROFISSIONAL, DIAS_SEMANA, criarAgenda, atualizarAgenda } from '../../services/agendasService';

/**
 * Modal para criar/editar agendas semanais
 */
export default function AgendaModal({ isOpen, agendaEditando = null, onAgendaSalva, onClose }) {
  const isEditMode = !!agendaEditando;

  const [formData, setFormData] = useState({
    nome: '',
    categoria: CATEGORIAS_PROFISSIONAL.MEDICO,
    horarioAtendimento: {
      manha: { inicio: '07:00', fim: '11:00', display: '07:00 às 11:00' },
      tarde: { inicio: '13:00', fim: '17:00', display: '13:00 às 17:00' }
    },
    agendaSemanal: {},
    ativa: true,
    observacoes: ''
  });

  useEffect(() => {
    if (agendaEditando) {
      setFormData({
        nome: agendaEditando.nome || '',
        categoria: agendaEditando.categoria || CATEGORIAS_PROFISSIONAL.MEDICO,
        horarioAtendimento: agendaEditando.horarioAtendimento || {
          manha: { inicio: '07:00', fim: '11:00', display: '07:00 às 11:00' },
          tarde: { inicio: '13:00', fim: '17:00', display: '13:00 às 17:00' }
        },
        agendaSemanal: agendaEditando.agendaSemanal || {},
        ativa: agendaEditando.ativa !== undefined ? agendaEditando.ativa : true,
        observacoes: agendaEditando.observacoes || ''
      });
    } else {
      // Reset para estado inicial ao criar nova agenda
      setFormData({
        nome: '',
        categoria: CATEGORIAS_PROFISSIONAL.MEDICO,
        horarioAtendimento: {
          manha: { inicio: '07:00', fim: '11:00', display: '07:00 às 11:00' },
          tarde: { inicio: '13:00', fim: '17:00', display: '13:00 às 17:00' }
        },
        agendaSemanal: {},
        ativa: true,
        observacoes: ''
      });
    }
  }, [agendaEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        await atualizarAgenda(agendaEditando.id, formData);
      } else {
        await criarAgenda(formData);
      }
      onAgendaSalva();
    } catch (error) {
      console.error('Erro ao salvar agenda:', error);
      alert('Erro ao salvar agenda: ' + error.message);
    }
  };

  if (!isOpen) return null;

  const handleAddAtividade = (dia) => {
    setFormData(prev => ({
      ...prev,
      agendaSemanal: {
        ...prev.agendaSemanal,
        [dia]: [
          ...(prev.agendaSemanal[dia] || []),
          { horario: '07:00 às 11:00', atividade: 'Nova atividade' }
        ]
      }
    }));
  };

  const handleRemoveAtividade = (dia, index) => {
    setFormData(prev => {
      const novasAtividades = [...(prev.agendaSemanal[dia] || [])];
      novasAtividades.splice(index, 1);

      const novaAgenda = { ...prev.agendaSemanal };
      if (novasAtividades.length === 0) {
        delete novaAgenda[dia];
      } else {
        novaAgenda[dia] = novasAtividades;
      }

      return {
        ...prev,
        agendaSemanal: novaAgenda
      };
    });
  };

  const handleUpdateAtividade = (dia, index, campo, valor) => {
    setFormData(prev => {
      const novasAtividades = [...(prev.agendaSemanal[dia] || [])];
      novasAtividades[index] = {
        ...novasAtividades[index],
        [campo]: valor
      };

      return {
        ...prev,
        agendaSemanal: {
          ...prev.agendaSemanal,
          [dia]: novasAtividades
        }
      };
    });
  };

  const categoriasLabels = {
    [CATEGORIAS_PROFISSIONAL.MEDICO]: 'Médico',
    [CATEGORIAS_PROFISSIONAL.GINECOLOGISTA]: 'Ginecologista',
    [CATEGORIAS_PROFISSIONAL.PEDIATRA]: 'Pediatra',
    [CATEGORIAS_PROFISSIONAL.FISIOTERAPEUTA]: 'Fisioterapeuta',
    [CATEGORIAS_PROFISSIONAL.PSICOLOGA]: 'Psicóloga',
    [CATEGORIAS_PROFISSIONAL.ASSISTENTE_SOCIAL]: 'Assistente Social',
    [CATEGORIAS_PROFISSIONAL.ENFERMEIRA]: 'Enfermeira'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-600" />
            {isEditMode ? 'Editar Agenda Semanal' : 'Nova Agenda Semanal'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nome do Profissional *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  placeholder="Ex: Dr. João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {Object.entries(categoriasLabels).map(([valor, label]) => (
                    <option key={valor} value={valor}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Observações
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="2"
                placeholder="Informações adicionais sobre a agenda"
              />
            </div>

            {/* Agenda Semanal */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Agenda Semanal
              </h3>

              <div className="space-y-4">
                {DIAS_SEMANA.map(dia => (
                  <div key={dia} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-neutral-900">{dia}</h4>
                      <button
                        type="button"
                        onClick={() => handleAddAtividade(dia)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar
                      </button>
                    </div>

                    {formData.agendaSemanal[dia]?.length > 0 ? (
                      <div className="space-y-2">
                        {formData.agendaSemanal[dia].map((atividade, index) => (
                          <div key={index} className="flex gap-2 items-start bg-neutral-50 p-3 rounded-lg">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={atividade.horario}
                                onChange={(e) => handleUpdateAtividade(dia, index, 'horario', e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Horário"
                              />
                              <input
                                type="text"
                                value={atividade.atividade}
                                onChange={(e) => handleUpdateAtividade(dia, index, 'atividade', e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Atividade"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveAtividade(dia, index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500 text-center py-2">
                        Nenhuma atividade neste dia
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ativa"
                checked={formData.ativa}
                onChange={(e) => setFormData({ ...formData, ativa: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="ativa" className="text-sm font-medium text-neutral-700">
                Agenda ativa
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
            >
              {isEditMode ? 'Atualizar' : 'Criar'} Agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
