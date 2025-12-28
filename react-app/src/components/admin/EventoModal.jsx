import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Calendar, Clock, Users, MapPin, FileText, Bell } from 'lucide-react';
import { criarEvento, atualizarEvento, TIPOS_EVENTO } from '../../services/calendarioService';
import { useAuth } from '../../contexts/AuthContext';

export default function EventoModal({ isOpen, onClose, eventoEditando = null, dataInicial = null, onEventoSalvo }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: TIPOS_EVENTO.REUNIAO,
    dataInicio: '',
    dataFim: '',
    horaInicio: '',
    horaFim: '',
    participantes: [],
    local: 'ESF Catalão',
    ata: '',
    lembrete: false,
    lembreteMinutos: 30,
  });

  const [participanteInput, setParticipanteInput] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    if (eventoEditando) {
      // Edição de evento existente
      setFormData({
        titulo: eventoEditando.titulo || '',
        descricao: eventoEditando.descricao || '',
        tipo: eventoEditando.tipo || TIPOS_EVENTO.REUNIAO,
        dataInicio: eventoEditando.dataInicio
          ? new Date(eventoEditando.dataInicio).toISOString().split('T')[0]
          : '',
        dataFim: eventoEditando.dataFim
          ? new Date(eventoEditando.dataFim).toISOString().split('T')[0]
          : '',
        horaInicio: eventoEditando.horaInicio || '',
        horaFim: eventoEditando.horaFim || '',
        participantes: eventoEditando.participantes || [],
        local: eventoEditando.local || 'ESF Catalão',
        ata: eventoEditando.ata || '',
        lembrete: eventoEditando.lembrete || false,
        lembreteMinutos: eventoEditando.lembreteMinutos || 30,
      });
    } else if (dataInicial) {
      // Novo evento com data pré-selecionada
      setFormData({
        ...formData,
        dataInicio: dataInicial.toISOString().split('T')[0],
        dataFim: dataInicial.toISOString().split('T')[0],
      });
    }
  }, [eventoEditando, dataInicial]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.dataInicio) {
      alert('Título e data de início são obrigatórios');
      return;
    }

    try {
      setLoading(true);

      const eventoData = {
        ...formData,
        participantes: formData.participantes,
      };

      if (eventoEditando?.id) {
        await atualizarEvento(eventoEditando.id, eventoData);
        alert('Evento atualizado com sucesso!');
      } else {
        await criarEvento(eventoData, currentUser.uid);
        alert('Evento criado com sucesso!');
      }

      if (onEventoSalvo) {
        onEventoSalvo();
      }

      handleClose();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      titulo: '',
      descricao: '',
      tipo: TIPOS_EVENTO.REUNIAO,
      dataInicio: '',
      dataFim: '',
      horaInicio: '',
      horaFim: '',
      participantes: [],
      local: 'ESF Catalão',
      ata: '',
      lembrete: false,
      lembreteMinutos: 30,
    });
    setParticipanteInput('');
    setPdfFile(null);
    onClose();
  };

  const adicionarParticipante = () => {
    if (participanteInput.trim()) {
      setFormData({
        ...formData,
        participantes: [...formData.participantes, participanteInput.trim()],
      });
      setParticipanteInput('');
    }
  };

  const removerParticipante = (index) => {
    setFormData({
      ...formData,
      participantes: formData.participantes.filter((_, i) => i !== index),
    });
  };

  const getTipoLabel = (tipo) => {
    const labels = {
      [TIPOS_EVENTO.REUNIAO]: 'Reunião',
      [TIPOS_EVENTO.LEMBRETE]: 'Lembrete',
      [TIPOS_EVENTO.AGENDAMENTO]: 'Agendamento',
    };
    return labels[tipo] || tipo;
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case TIPOS_EVENTO.REUNIAO:
        return <Users className="w-4 h-4" />;
      case TIPOS_EVENTO.LEMBRETE:
        return <Bell className="w-4 h-4" />;
      case TIPOS_EVENTO.AGENDAMENTO:
        return <FileText className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-200 flex items-center justify-between z-10">
          <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gov-blue" />
            {eventoEditando ? 'Editar Evento' : 'Novo Evento'}
          </h3>
          <button
            onClick={handleClose}
            className="text-neutral-500 hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Evento */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tipo de Evento *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.values(TIPOS_EVENTO).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo })}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.tipo === tipo
                      ? 'border-gov-blue bg-blue-50 text-gov-blue'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  {getTipoIcon(tipo)}
                  <span className="text-sm font-medium">{getTipoLabel(tipo)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Reunião de Equipe, Lembrete de Compra de Material, etc."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Detalhes adicionais sobre o evento..."
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue resize-none"
            />
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Data de Início *
              </label>
              <input
                type="date"
                value={formData.dataInicio}
                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Data de Término
              </label>
              <input
                type="date"
                value={formData.dataFim}
                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
              />
            </div>
          </div>

          {/* Horários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Horário de Início
              </label>
              <input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Horário de Término
              </label>
              <input
                type="time"
                value={formData.horaFim}
                onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
              />
            </div>
          </div>

          {/* Local */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Local
            </label>
            <input
              type="text"
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              placeholder="Ex: Sala de Reuniões, Consultório 4, etc."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
            />
          </div>

          {/* Participantes (para Reuniões) */}
          {formData.tipo === TIPOS_EVENTO.REUNIAO && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Participantes
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={participanteInput}
                  onChange={(e) => setParticipanteInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      adicionarParticipante();
                    }
                  }}
                  placeholder="Nome do participante"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                />
                <button
                  type="button"
                  onClick={adicionarParticipante}
                  className="px-4 py-2 bg-gov-blue text-white rounded-lg hover:bg-gov-blue-dark transition-colors"
                >
                  Adicionar
                </button>
              </div>
              {formData.participantes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.participantes.map((participante, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      <span>{participante}</span>
                      <button
                        type="button"
                        onClick={() => removerParticipante(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Ata de Reunião (para Reuniões) */}
          {formData.tipo === TIPOS_EVENTO.REUNIAO && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Ata da Reunião
              </label>
              <textarea
                value={formData.ata}
                onChange={(e) => setFormData({ ...formData, ata: e.target.value })}
                placeholder="Registre aqui os pontos discutidos na reunião..."
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue resize-none"
              />
            </div>
          )}

          {/* Lembrete */}
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="lembrete"
                checked={formData.lembrete}
                onChange={(e) => setFormData({ ...formData, lembrete: e.target.checked })}
                className="w-4 h-4 text-gov-blue focus:ring-gov-blue border-neutral-300 rounded"
              />
              <label htmlFor="lembrete" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Ativar Lembrete
              </label>
            </div>

            {formData.lembrete && (
              <div>
                <label className="block text-sm text-neutral-600 mb-2">
                  Lembrar com antecedência de:
                </label>
                <select
                  value={formData.lembreteMinutos}
                  onChange={(e) => setFormData({ ...formData, lembreteMinutos: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={120}>2 horas</option>
                  <option value={1440}>1 dia</option>
                </select>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-6 border-t border-neutral-200 flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-gov-blue text-white rounded-lg hover:bg-gov-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Salvando...
              </>
            ) : (
              <>
                {eventoEditando ? 'Atualizar Evento' : 'Criar Evento'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
