import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Filter, Clock, Users, FileText, Bell, Edit2, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TIPOS_EVENTO } from '../../services/calendarioService';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import AdminLayout from '../../layouts/AdminLayout';
import { useEventos } from '../../hooks/useEventos';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import EventoModal from '../../components/admin/EventoModal';

export default function CalendarioAdmin() {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [eventoVisualizando, setEventoVisualizando] = useState(null);

  const { eventos, loading, deletar, recarregar } = useEventos(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  useBodyScrollLock(showEventModal || showDetalhesModal);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDiasNoMes = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    const dias = [];

    const diasMesAnterior = new Date(ano, mes, 0).getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      dias.push({
        dia: diasMesAnterior - i,
        mes: 'anterior',
        data: new Date(ano, mes - 1, diasMesAnterior - i)
      });
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      dias.push({
        dia,
        mes: 'atual',
        data: new Date(ano, mes, dia)
      });
    }

    const diasRestantes = 42 - dias.length;
    for (let dia = 1; dia <= diasRestantes; dia++) {
      dias.push({
        dia,
        mes: 'proximo',
        data: new Date(ano, mes + 1, dia)
      });
    }

    return dias;
  };

  const getEventosNoDia = (data) => {
    return eventos.filter(evento => {
      if (!evento.dataInicio) return false;
      const eventoData = new Date(evento.dataInicio);
      return (
        eventoData.getDate() === data.getDate() &&
        eventoData.getMonth() === data.getMonth() &&
        eventoData.getFullYear() === data.getFullYear() &&
        (filtroTipo === 'todos' || evento.tipo === filtroTipo)
      );
    });
  };

  const mesAnterior = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const proximoMes = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const hoje = () => {
    setCurrentDate(new Date());
  };

  const getCorEvento = (tipo) => {
    const cores = {
      [TIPOS_EVENTO.REUNIAO]: 'bg-blue-500',
      [TIPOS_EVENTO.LEMBRETE]: 'bg-purple-500',
      [TIPOS_EVENTO.AGENDAMENTO]: 'bg-green-500',
    };
    return cores[tipo] || 'bg-gray-500';
  };

  const getIconeEvento = (tipo) => {
    switch (tipo) {
      case TIPOS_EVENTO.REUNIAO:
        return <Users className="w-3 h-3" />;
      case TIPOS_EVENTO.LEMBRETE:
        return <Bell className="w-3 h-3" />;
      case TIPOS_EVENTO.AGENDAMENTO:
        return <FileText className="w-3 h-3" />;
      default:
        return <CalendarIcon className="w-3 h-3" />;
    }
  };

  /**
   * Abre modal para visualizar detalhes do evento
   */
  const handleVisualizarEvento = (evento, e) => {
    e.stopPropagation();
    setEventoVisualizando(evento);
    setShowDetalhesModal(true);
  };

  /**
   * Abre modal para editar evento
   */
  const handleEditarEvento = (evento, e) => {
    e.stopPropagation();
    setEventoEditando(evento);
    setShowEventModal(true);
  };

  /**
   * Deleta evento com confirmação
   */
  const handleDeletarEvento = async (evento, e) => {
    e.stopPropagation();

    const confirmed = await showModal({
      type: 'warning',
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja deletar o evento "${evento.titulo}"? Esta ação não pode ser desfeita.`,
      confirmText: 'Deletar',
      cancelText: 'Cancelar'
    });

    if (!confirmed) return;

    try {
      await deletar(evento.id);
      await showModal({
        type: 'success',
        title: 'Evento Deletado',
        message: 'Evento deletado com sucesso!',
        confirmText: 'OK'
      });
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      await showModal({
        type: 'error',
        title: 'Erro ao Deletar',
        message: `Não foi possível deletar o evento: ${error.message}`,
        confirmText: 'OK'
      });
    }
  };

  /**
   * Fecha modal de criação/edição e recarrega eventos
   */
  const handleEventoSalvo = () => {
    recarregar();
    setShowEventModal(false);
    setEventoEditando(null);
    setSelectedDate(null);
  };

  /**
   * Abre modal para criar evento em um dia específico
   */
  const handleCriarEventoNoDia = (data) => {
    setSelectedDate(data);
    setEventoEditando(null);
    setShowEventModal(true);
  };

  const diasDoMes = getDiasNoMes(currentDate);
  const dataHoje = new Date();

  return (
    <AdminLayout currentPage="calendario">
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <CalendarIcon className="w-7 h-7 text-primary-600" />
              Calendário Administrativo
            </h1>
            <p className="text-neutral-600 mt-1">
              Gerencie reuniões, lembretes e agendamentos
            </p>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-primary-600 text-white px-4 py-2.5 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-800 transition-colors flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Adicionar Evento
          </button>
        </div>
      </div>

      {/* Controles do Calendário */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Navegação de Meses */}
          <div className="flex items-center gap-3">
            <button
              onClick={mesAnterior}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>

            <div className="text-center min-w-[200px]">
              <h2 className="text-lg font-semibold text-neutral-900">
                {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>

            <button
              onClick={proximoMes}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>

            <button
              onClick={hoje}
              className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Hoje
            </button>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="todos">Todos os Eventos</option>
              <option value={TIPOS_EVENTO.REUNIAO}>Reuniões</option>
              <option value={TIPOS_EVENTO.LEMBRETE}>Lembretes</option>
              <option value={TIPOS_EVENTO.AGENDAMENTO}>Agendamentos</option>
            </select>
          </div>
        </div>

        {/* Legenda */}
        <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-neutral-600">Reunião</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-neutral-600">Lembrete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-neutral-600">Agendamento</span>
          </div>
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Cabeçalho dos Dias da Semana */}
              <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
                {diasSemana.map((dia, index) => (
                  <div
                    key={index}
                    className="py-3 text-center text-sm font-semibold text-neutral-700 border-r border-neutral-200 last:border-r-0"
                  >
                    {dia}
                  </div>
                ))}
              </div>

              {/* Grid de Dias */}
              <div className="grid grid-cols-7">
                {diasDoMes.map((diaInfo, index) => {
                  const eventosNoDia = getEventosNoDia(diaInfo.data);
                  const isHoje =
                    diaInfo.data.getDate() === dataHoje.getDate() &&
                    diaInfo.data.getMonth() === dataHoje.getMonth() &&
                    diaInfo.data.getFullYear() === dataHoje.getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] border-r border-b border-neutral-200 last:border-r-0 p-2 ${
                        diaInfo.mes !== 'atual'
                          ? 'bg-neutral-50'
                          : isHoje
                            ? 'bg-blue-50'
                            : 'bg-white hover:bg-neutral-50'
                      } transition-colors cursor-pointer`}
                      onClick={() => handleCriarEventoNoDia(diaInfo.data)}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          diaInfo.mes !== 'atual'
                            ? 'text-neutral-400'
                            : isHoje
                            ? 'text-white bg-primary-600 rounded-full w-7 h-7 flex items-center justify-center'
                            : 'text-neutral-700'
                        }`}
                      >
                        {diaInfo.dia}
                      </div>

                      {/* Eventos do Dia */}
                      <div className="space-y-1">
                        {eventosNoDia.slice(0, 3).map((evento) => (
                          <div
                            key={evento.id}
                            className={`${getCorEvento(evento.tipo)} text-white text-xs px-2 py-1 rounded flex items-center justify-between gap-1 group`}
                            onClick={(e) => handleVisualizarEvento(evento, e)}
                          >
                            <div className="flex items-center gap-1 truncate min-w-0">
                              {getIconeEvento(evento.tipo)}
                              <span className="truncate">{evento.titulo}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={(e) => handleEditarEvento(evento, e)}
                                className="hover:bg-white/20 rounded p-0.5"
                                title="Editar evento"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => handleDeletarEvento(evento, e)}
                                className="hover:bg-white/20 rounded p-0.5"
                                title="Deletar evento"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {eventosNoDia.length > 3 && (
                          <div className="text-xs text-neutral-500 pl-2">
                            +{eventosNoDia.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Evento (Criar/Editar) */}
      <EventoModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedDate(null);
          setEventoEditando(null);
        }}
        eventoEditando={eventoEditando}
        dataInicial={selectedDate}
        onEventoSalvo={handleEventoSalvo}
      />

      {/* Modal de Detalhes do Evento */}
      {showDetalhesModal && eventoVisualizando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                {getIconeEvento(eventoVisualizando.tipo)}
                {eventoVisualizando.titulo}
              </h3>
              <button
                onClick={() => {
                  setShowDetalhesModal(false);
                  setEventoVisualizando(null);
                }}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo */}
            <div className="p-6 space-y-4">
              {/* Tipo */}
              <div>
                <label className="text-sm font-medium text-neutral-700">Tipo</label>
                <p className="mt-1 text-neutral-900 capitalize">{eventoVisualizando.tipo}</p>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Data Início
                  </label>
                  <p className="mt-1 text-neutral-900">
                    {eventoVisualizando.dataInicio
                      ? new Date(eventoVisualizando.dataInicio).toLocaleDateString('pt-BR')
                      : '-'}
                  </p>
                </div>
                {eventoVisualizando.dataFim && (
                  <div>
                    <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Data Fim
                    </label>
                    <p className="mt-1 text-neutral-900">
                      {new Date(eventoVisualizando.dataFim).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>

              {/* Horário */}
              {(eventoVisualizando.horaInicio || eventoVisualizando.horaFim) && (
                <div className="grid grid-cols-2 gap-4">
                  {eventoVisualizando.horaInicio && (
                    <div>
                      <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Hora Início
                      </label>
                      <p className="mt-1 text-neutral-900">{eventoVisualizando.horaInicio}</p>
                    </div>
                  )}
                  {eventoVisualizando.horaFim && (
                    <div>
                      <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Hora Fim
                      </label>
                      <p className="mt-1 text-neutral-900">{eventoVisualizando.horaFim}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Descrição */}
              {eventoVisualizando.descricao && (
                <div>
                  <label className="text-sm font-medium text-neutral-700">Descrição</label>
                  <p className="mt-1 text-neutral-900 whitespace-pre-wrap">
                    {eventoVisualizando.descricao}
                  </p>
                </div>
              )}

              {/* Local */}
              {eventoVisualizando.local && (
                <div>
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Local
                  </label>
                  <p className="mt-1 text-neutral-900">{eventoVisualizando.local}</p>
                </div>
              )}

              {/* Participantes */}
              {eventoVisualizando.participantes && eventoVisualizando.participantes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Participantes
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {eventoVisualizando.participantes.map((participante, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-sm"
                      >
                        {participante}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ata */}
              {eventoVisualizando.ata && (
                <div>
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Ata/Observações
                  </label>
                  <p className="mt-1 text-neutral-900 whitespace-pre-wrap">
                    {eventoVisualizando.ata}
                  </p>
                </div>
              )}

              {/* Lembrete */}
              {eventoVisualizando.lembrete && (
                <div>
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    Lembrete
                  </label>
                  <p className="mt-1 text-neutral-900">
                    {eventoVisualizando.lembreteMinutos} minutos antes
                  </p>
                </div>
              )}
            </div>

            {/* Footer com Ações */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-neutral-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDetalhesModal(false);
                  setEventoVisualizando(null);
                }}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setShowDetalhesModal(false);
                  handleEditarEvento(eventoVisualizando, { stopPropagation: () => {} });
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-800 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => {
                  setShowDetalhesModal(false);
                  handleDeletarEvento(eventoVisualizando, { stopPropagation: () => {} });
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
