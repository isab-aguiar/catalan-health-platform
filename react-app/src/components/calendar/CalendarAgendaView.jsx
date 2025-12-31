import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  FileText, 
  Eye, 
  Edit2, 
  Trash2,
  Filter,
  Download,
  Share2,
  AlertCircle,
  CheckCircle2,
  Tag,
  MoreVertical
} from 'lucide-react';
import { TIPOS_EVENTO } from '../../services/calendarioService';
import { getEventColors } from '../../constants/calendarDesign';
import EmptyState from './EmptyState';

/**
 * Vista de Agenda - Mostra eventos dia por dia com horários
 */
export default function CalendarAgendaView({
  eventos,
  agendas = [],
  onEventClick,
  onEventEdit,
  onEventDelete,
  initialDate = new Date()
}) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [daysToShow, setDaysToShow] = useState(7); // 7 ou 14 dias

  // Log para debug
  useEffect(() => {
    console.log('📅 [CalendarAgendaView] Eventos recebidos:', eventos?.length || 0, eventos);
    console.log('📋 [CalendarAgendaView] Agendas recebidas:', agendas?.length || 0, agendas);
  }, [eventos, agendas]);

  // Gerar array de dias a partir da data atual
  const days = useMemo(() => {
    const daysArray = [];
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToShow; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      daysArray.push(day);
    }

    return daysArray;
  }, [currentDate, daysToShow]);

  // Agrupar eventos por dia
  const eventosPorDia = useMemo(() => {
    const grupos = {};

    days.forEach(day => {
      const dayKey = day.toISOString().split('T')[0];
      grupos[dayKey] = [];
    });

    eventos.forEach(evento => {
      const eventoData = new Date(evento.dataInicio);
      eventoData.setHours(0, 0, 0, 0);
      const dayKey = eventoData.toISOString().split('T')[0];

      if (grupos[dayKey]) {
        grupos[dayKey].push(evento);
      }
    });

    // Ordenar eventos de cada dia por horário
    Object.keys(grupos).forEach(dayKey => {
      grupos[dayKey].sort((a, b) => {
        if (!a.horaInicio && !b.horaInicio) return 0;
        if (!a.horaInicio) return 1;
        if (!b.horaInicio) return -1;
        return a.horaInicio.localeCompare(b.horaInicio);
      });
    });

    return grupos;
  }, [days, eventos]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - daysToShow);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + daysToShow);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getIconeEvento = (tipo) => {
    switch (tipo) {
      case TIPOS_EVENTO.REUNIAO:
        return Users;
      case TIPOS_EVENTO.LEMBRETE:
        return Bell;
      case TIPOS_EVENTO.AGENDAMENTO:
        return FileText;
      default:
        return Calendar;
    }
  };

  const getTipoLabel = (tipo) => {
    const labels = {
      [TIPOS_EVENTO.REUNIAO]: 'Reunião',
      [TIPOS_EVENTO.LEMBRETE]: 'Lembrete',
      [TIPOS_EVENTO.AGENDAMENTO]: 'Agendamento',
    };
    return labels[tipo] || tipo;
  };

  const isToday = (date) => {
    const hoje = new Date();
    return (
      date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear()
    );
  };

  const formatarDiaSemana = (date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

  const formatarDataCompleta = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Controles Aprimorados */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-xl shadow-lg border border-neutral-200/50 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-5">
          {/* Header com Navegação */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Navegação */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm border border-neutral-200 hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Período anterior"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-700" />
              </button>

              <div className="text-center min-w-[280px]">
                <h3 className="text-lg font-bold text-neutral-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatarDataCompleta(days[0])}
                </h3>
                <p className="text-sm text-neutral-600 font-medium mt-0.5">
                  até {formatarDataCompleta(days[days.length - 1])}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm border border-neutral-200 hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Próximo período"
              >
                <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            </div>

            {/* Ações Rápidas */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToday}
                className="px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 border border-primary-200 hover:shadow-md"
              >
                <span className="hidden sm:inline">Ir para </span>Hoje
              </button>

              <button
                className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200 border border-neutral-200 hover:shadow-md"
                title="Exportar agenda"
              >
                <Download className="w-4 h-4 text-neutral-700" />
              </button>

              <button
                className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200 border border-neutral-200 hover:shadow-md"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4 text-neutral-700" />
              </button>
            </div>
          </div>

          {/* Período de Visualização e Estatísticas */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/50">
            {/* Toggle de dias */}
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-1.5 shadow-sm border border-neutral-200">
              <button
                onClick={() => setDaysToShow(7)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  daysToShow === 7
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                7 dias
              </button>
              <button
                onClick={() => setDaysToShow(14)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  daysToShow === 14
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                14 dias
              </button>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-lg border border-neutral-200">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-neutral-900">
                  {eventos?.length || 0}
                </span>
                <span className="text-neutral-600">eventos</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-lg border border-neutral-200">
                <Users className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-neutral-900">
                  {agendas?.length || 0}
                </span>
                <span className="text-neutral-600">agendas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Dias */}
      <div className="space-y-5">{days.map((day, index) => {
          const dayKey = day.toISOString().split('T')[0];
          const eventosDay = eventosPorDia[dayKey] || [];
          const hoje = isToday(day);

          return (
            <div
              key={dayKey}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden ${
                hoje ? 'border-primary-300 ring-2 ring-primary-100' : 'border-neutral-200'
              }`}
            >
              {/* Header do Dia */}
              <div className={`p-4 border-b ${
                hoje
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-primary-200'
                  : 'bg-gradient-to-r from-neutral-50 to-neutral-100 border-neutral-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-lg font-semibold capitalize ${
                      hoje ? 'text-primary-700' : 'text-neutral-900'
                    }`}>
                      {formatarDiaSemana(day)}
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {day.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={`text-right ${hoje ? 'text-primary-600' : 'text-neutral-600'}`}>
                    <div className="text-3xl font-bold">{day.getDate()}</div>
                    {hoje && (
                      <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full mt-1">
                        Hoje
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-600 flex items-center gap-2">
                  <span>{eventosDay.length} {eventosDay.length === 1 ? 'evento' : 'eventos'}</span>
                  {agendas.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-600">{agendas.filter(a => {
                        const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' });
                        const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                        return (a.agendaSemanal?.[diaSemanaCapitalizado] || []).length > 0;
                      }).length} {agendas.filter(a => {
                        const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' });
                        const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                        return (a.agendaSemanal?.[diaSemanaCapitalizado] || []).length > 0;
                      }).length === 1 ? 'agenda' : 'agendas'}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Eventos e Agendas do Dia */}
              <div className="p-4">
                {eventosDay.length === 0 && agendas.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">Nenhum evento ou agenda neste dia</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Agendas dos Profissionais */}
                    {agendas.length > 0 && agendas.map(agenda => {
                      const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' });
                      const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                      const atividadesDoDia = agenda.agendaSemanal?.[diaSemanaCapitalizado] || [];

                      if (atividadesDoDia.length === 0) return null;

                      return (
                        <div key={agenda.id} className="border border-indigo-200 bg-indigo-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-indigo-600" />
                            <h6 className="font-bold text-indigo-900">{agenda.nome}</h6>
                            <span className="text-xs px-2 py-0.5 bg-indigo-200 text-indigo-800 rounded-full font-medium">
                              {agenda.categoria}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {atividadesDoDia.map((atividade, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-sm">
                                <div className="flex-shrink-0 min-w-[100px]">
                                  <div className="flex items-center gap-1 text-indigo-700 font-semibold">
                                    <Clock className="w-3.5 h-3.5" />
                                    {atividade.horario}
                                  </div>
                                </div>
                                <div className="flex-1 text-indigo-900">
                                  {atividade.atividade}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Eventos */}
                    {eventosDay.map(evento => {
                      const IconeEvento = getIconeEvento(evento.tipo);
                      const colors = getEventColors(evento.tipo);

                      return (
                        <div
                          key={evento.id}
                          className="group border border-neutral-200 rounded-lg p-4 hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer"
                          onClick={() => onEventClick(evento)}
                        >
                          <div className="flex items-start gap-4">
                            {/* Horário */}
                            <div className="flex-shrink-0 text-center min-w-[80px]">
                              {evento.horaInicio ? (
                                <>
                                  <div className="text-lg font-bold text-neutral-900">
                                    {evento.horaInicio}
                                  </div>
                                  {evento.horaFim && (
                                    <div className="text-xs text-neutral-500">
                                      até {evento.horaFim}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-sm text-neutral-500">
                                  Dia inteiro
                                </div>
                              )}
                            </div>

                            {/* Conteúdo */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {/* Badge tipo */}
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.light} ${colors.border} border rounded-full text-xs font-medium ${colors.text}`}>
                                    <IconeEvento className="w-3.5 h-3.5" />
                                    {getTipoLabel(evento.tipo)}
                                  </span>
                                </div>

                                {/* Ações */}
                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventClick(evento);
                                    }}
                                    className="p-1.5 rounded hover:bg-neutral-100 transition-colors"
                                    title="Visualizar"
                                  >
                                    <Eye className="w-4 h-4 text-neutral-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventEdit(evento);
                                    }}
                                    className="p-1.5 rounded hover:bg-neutral-100 transition-colors"
                                    title="Editar"
                                  >
                                    <Edit2 className="w-4 h-4 text-neutral-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventDelete(evento);
                                    }}
                                    className="p-1.5 rounded hover:bg-red-50 transition-colors"
                                    title="Deletar"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </div>

                              {/* Título */}
                              <h5 className="font-semibold text-neutral-900 mb-2">
                                {evento.titulo}
                              </h5>

                              {/* Detalhes */}
                              <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                                {evento.local && (
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    {evento.local}
                                  </span>
                                )}
                                {evento.participantes && evento.participantes.length > 0 && (
                                  <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    {evento.participantes.length} {evento.participantes.length === 1 ? 'participante' : 'participantes'}
                                  </span>
                                )}
                              </div>

                              {/* Descrição */}
                              {evento.descricao && (
                                <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                                  {evento.descricao}
                                </p>
                              )}

                              {/* Badges */}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {evento.lembrete && (
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    evento.lembreteEnviado
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    <Bell className="w-3 h-3" />
                                    {evento.lembreteEnviado ? 'Notificado' : 'Lembrete ativo'}
                                  </span>
                                )}
                                {evento.concluido && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    ✓ Concluído
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
