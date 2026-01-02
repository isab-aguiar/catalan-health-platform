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
  onAgendaEdit,
  onAgendaDelete,
  onCreateAgenda,
  initialDate = new Date()
}) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [daysToShow, setDaysToShow] = useState(7); // 7 ou 14 dias

  // Log para debug
  useEffect(() => {
    console.log('[CalendarAgendaView] Eventos recebidos:', eventos?.length || 0, eventos);
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
      const dayKey = formatarDataParaChave(day);
      grupos[dayKey] = [];
    });

    eventos.forEach(evento => {
      const eventoData = new Date(evento.dataInicio);
      eventoData.setHours(0, 0, 0, 0);
      const dayKey = formatarDataParaChave(eventoData);

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

  // Formata data para YYYY-MM-DD no timezone local (não UTC)
  const formatarDataParaChave = (date) => {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const handleExportar = () => {
    // Gerar conteúdo da agenda em texto
    let conteudo = `AGENDA - ${formatarDataCompleta(days[0])} até ${formatarDataCompleta(days[days.length - 1])}\n\n`;

    days.forEach(day => {
      const dayKey = formatarDataParaChave(day);
      const eventosDay = eventosPorDia[dayKey] || [];

      conteudo += `\n${formatarDiaSemana(day).toUpperCase()} - ${formatarDataCompleta(day)}\n`;
      conteudo += '─'.repeat(60) + '\n';

      if (eventosDay.length === 0) {
        conteudo += 'Nenhum evento\n';
      } else {
        eventosDay.forEach(evento => {
          conteudo += `\n${evento.horaInicio || 'Dia inteiro'} - ${evento.titulo}\n`;
          if (evento.descricao) conteudo += `  ${evento.descricao}\n`;
          if (evento.local) conteudo += `  📍 ${evento.local}\n`;
          if (evento.participantes?.length) conteudo += `  👥 ${evento.participantes.length} participante(s)\n`;
        });
      }
      conteudo += '\n';
    });

    // Criar blob e download
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agenda_${formatarDataParaChave(days[0])}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCompartilhar = async () => {
    const textoAgenda = `Agenda de ${formatarDataCompleta(days[0])} até ${formatarDataCompleta(days[days.length - 1])}\n${eventos?.length || 0} eventos programados`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Agenda',
          text: textoAgenda,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
          copiarParaClipboard(textoAgenda);
        }
      }
    } else {
      copiarParaClipboard(textoAgenda);
    }
  };

  const copiarParaClipboard = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Agenda copiada para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar:', err);
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Controles Aprimorados */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-xl shadow-lg border border-neutral-200/50 p-3 md:p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:gap-5">
          {/* Header com Navegação */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Navegação */}
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <button
                onClick={handlePrevious}
                className="p-2 md:p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm border border-neutral-200 hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Período anterior"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-700" />
              </button>

              <div className="text-center flex-1 min-w-0 px-2">
                <h3 className="text-sm md:text-lg font-bold text-neutral-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                  {formatarDataCompleta(days[0])}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 font-medium mt-0.5 truncate">
                  até {formatarDataCompleta(days[days.length - 1])}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="p-2 md:p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm border border-neutral-200 hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Próximo período"
              >
                <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            </div>

            {/* Ações Rápidas */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={handleToday}
                className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 border border-primary-200 hover:shadow-md"
              >
                <span className="hidden sm:inline">Ir para </span>Hoje
              </button>

              {onCreateAgenda && (
                <button
                  onClick={onCreateAgenda}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  title="Nova Agenda"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Nova Agenda</span>
                  <span className="sm:hidden">Agenda</span>
                </button>
              )}

              <button
                onClick={handleExportar}
                className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200 border border-neutral-200 hover:shadow-md"
                title="Exportar agenda"
              >
                <Download className="w-4 h-4 text-neutral-700" />
              </button>

              <button
                onClick={handleCompartilhar}
                className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200 border border-neutral-200 hover:shadow-md"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4 text-neutral-700" />
              </button>
            </div>
          </div>

          {/* Período de Visualização e Estatísticas */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-3 md:pt-4 border-t border-neutral-200/50">
            {/* Toggle de dias */}
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-1.5 shadow-sm border border-neutral-200 w-full sm:w-auto">
              <button
                onClick={() => setDaysToShow(7)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
                  daysToShow === 7
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                7 dias
              </button>
              <button
                onClick={() => setDaysToShow(14)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
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
          const dayKey = formatarDataParaChave(day);
          const eventosDay = eventosPorDia[dayKey] || [];
          const hoje = isToday(day);

          return (
            <div
              key={dayKey}
              className={`group relative bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                hoje 
                  ? 'border-blue-400 ring-2 ring-blue-100 shadow-blue-100' 
                  : 'border-neutral-200 hover:border-blue-200'
              }`}
            >
              {/* Indicador lateral para hoje */}
              {hoje && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600" />
              )}

              {/* Header do Dia Aprimorado */}
              <div className={`p-5 border-b backdrop-blur-sm ${
                hoje
                  ? 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200'
                  : 'bg-gradient-to-r from-neutral-50 to-neutral-100/50 border-neutral-200'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                      <h4 className={`text-base md:text-xl font-bold capitalize truncate ${
                        hoje ? 'text-blue-700' : 'text-neutral-900'
                      }`}>
                        {formatarDiaSemana(day)}
                      </h4>
                      {hoje && (
                        <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          <span className="hidden sm:inline">HOJE</span>
                          <span className="sm:hidden">HJ</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-neutral-600 mt-1 font-medium truncate">
                      {day.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className={`text-right flex-shrink-0 ${hoje ? 'text-blue-600' : 'text-neutral-600'}`}>
                    <div className="text-2xl md:text-4xl font-black leading-none">{day.getDate()}</div>
                    <div className="text-xs font-semibold mt-1 opacity-70">
                      {day.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Resumo de Itens */}
                <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2">
                  {eventosDay.length > 0 && (
                    <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-white/80 backdrop-blur-sm rounded-lg border border-neutral-200 shadow-sm">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-bold text-neutral-900">{eventosDay.length}</span>
                      <span className="text-xs md:text-sm text-neutral-600 hidden sm:inline">{eventosDay.length === 1 ? 'evento' : 'eventos'}</span>
                    </div>
                  )}
                  {agendas.length > 0 && (
                    <>
                      {(() => {
                        const agendasCount = agendas.filter(a => {
                          const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' });
                          const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                          return (a.agendaSemanal?.[diaSemanaCapitalizado] || []).length > 0;
                        }).length;
                        
                        return agendasCount > 0 ? (
                          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200 shadow-sm">
                            <Users className="w-3 h-3 md:w-4 md:h-4 text-indigo-600 flex-shrink-0" />
                            <span className="text-xs md:text-sm font-bold text-neutral-900">{agendasCount}</span>
                            <span className="text-xs md:text-sm text-neutral-600 hidden sm:inline">{agendasCount === 1 ? 'agenda' : 'agendas'}</span>
                          </div>
                        ) : null;
                      })()}
                    </>
                  )}
                  {eventosDay.length === 0 && agendas.length === 0 && (
                    <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-neutral-100 rounded-lg">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-neutral-400" />
                      <span className="text-xs md:text-sm text-neutral-500">Sem atividades</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Eventos e Agendas do Dia */}
              <div className="p-3 md:p-5">{eventosDay.length === 0 && agendas.length === 0 ? (
                  <div className="text-center py-6 md:py-8">
                    <Calendar className="w-10 h-10 md:w-12 md:h-12 text-neutral-300 mx-auto mb-2" />
                    <p className="text-xs md:text-sm text-neutral-500">Nenhum evento ou agenda neste dia</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {/* Agendas dos Profissionais */}
                    {agendas.length > 0 && agendas.map(agenda => {
                      const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' });
                      const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                      const atividadesDoDia = agenda.agendaSemanal?.[diaSemanaCapitalizado] || [];

                      if (atividadesDoDia.length === 0) return null;

                      return (
                        <div 
                          key={agenda.id} 
                          className="group/agenda relative border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-purple-50/30 rounded-xl p-3 md:p-5 transition-all duration-300 hover:shadow-lg hover:border-indigo-300"
                        >
                          {/* Header com botões e categoria - Mobile: botões primeiro */}
                          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3 md:mb-4">
                            {/* Categoria badge - Mobile: embaixo, Desktop: esquerda */}
                            <span className="text-xs px-2 md:px-2.5 py-0.5 md:py-1 bg-indigo-600 text-white rounded-full font-bold uppercase tracking-wide shadow-md w-fit">
                              {agenda.categoria}
                            </span>
                            
                            {/* Botões de ação - Mobile: em cima, Desktop: direita */}
                            <div className="flex items-center gap-1 md:gap-2 sm:ml-auto justify-end">
                              {onAgendaEdit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAgendaEdit(agenda);
                                  }}
                                  className="p-1.5 md:p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                  title="Editar agenda"
                                >
                                  <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                                  <span className="text-xs font-medium sm:hidden">Editar</span>
                                </button>
                              )}
                              {onAgendaDelete && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAgendaDelete(agenda);
                                  }}
                                  className="p-1.5 md:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                                  title="Excluir agenda"
                                >
                                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                  <span className="text-xs font-medium sm:hidden">Excluir</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Título e informações do profissional */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 md:p-2.5 bg-indigo-600 rounded-lg shadow-md flex-shrink-0">
                              <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h6 className="font-bold text-base md:text-lg text-indigo-900 leading-tight break-words">{agenda.nome}</h6>
                              <p className="text-xs md:text-sm text-indigo-600 mt-0.5">Profissional de Saúde</p>
                            </div>
                          </div>

                          <div className="space-y-2.5 mt-4">
                            {atividadesDoDia.map((atividade, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-start gap-4 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md"
                              >
                                <div className="flex-shrink-0 min-w-[110px]">
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-lg">
                                    <Clock className="w-4 h-4 text-indigo-700" />
                                    <span className="text-sm font-bold text-indigo-900">{atividade.horario}</span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-indigo-900 leading-relaxed">{atividade.atividade}</p>
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
                          className="group/evento relative bg-white border-2 border-neutral-200 rounded-xl p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
                          onClick={() => onEventClick(evento)}
                        >
                          {/* Barra lateral colorida */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bg}`} />

                          <div className="flex items-start gap-5 pl-3">
                            {/* Horário em destaque */}
                            <div className="flex-shrink-0 text-center min-w-[100px]">
                              {evento.horaInicio ? (
                                <div className={`p-3 rounded-xl ${colors.light} border-2 ${colors.border}`}>
                                  <div className="flex items-center justify-center gap-1.5 mb-1">
                                    <Clock className={`w-4 h-4 ${colors.text}`} />
                                  </div>
                                  <div className={`text-xl font-black ${colors.text}`}>
                                    {evento.horaInicio}
                                  </div>
                                  {evento.horaFim && (
                                    <div className="text-xs text-neutral-600 mt-1 font-semibold">
                                      até {evento.horaFim}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className={`p-3 rounded-xl ${colors.light} border-2 ${colors.border}`}>
                                  <Calendar className={`w-6 h-6 ${colors.text} mx-auto mb-1`} />
                                  <div className="text-xs font-bold text-neutral-600">
                                    Dia inteiro
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Conteúdo */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1">
                                  {/* Badge tipo */}
                                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.light} border-2 ${colors.border} rounded-full text-xs font-bold ${colors.text} mb-2 shadow-sm`}>
                                    <IconeEvento className="w-4 h-4" />
                                    {getTipoLabel(evento.tipo)}
                                  </span>

                                  {/* Título */}
                                  <h5 className="font-bold text-lg text-neutral-900 leading-tight mt-2">
                                    {evento.titulo}
                                  </h5>

                                  {/* Descrição curta */}
                                  {evento.descricao && (
                                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                                      {evento.descricao}
                                    </p>
                                  )}
                                </div>

                                {/* Ações */}
                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover/evento:opacity-100 transition-all duration-200 flex-shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventClick(evento);
                                    }}
                                    className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200"
                                    title="Visualizar"
                                  >
                                    <Eye className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventEdit(evento);
                                    }}
                                    className="p-2 rounded-lg hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200"
                                    title="Editar"
                                  >
                                    <Edit2 className="w-4 h-4 text-amber-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventDelete(evento);
                                    }}
                                    className="p-2 rounded-lg hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200"
                                    title="Deletar"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </div>

                              {/* Detalhes em chips */}
                              <div className="flex flex-wrap gap-3 mt-4">
                                {evento.local && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                                    <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-neutral-700">{evento.local}</span>
                                  </div>
                                )}
                                {evento.participantes && evento.participantes.length > 0 && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                                    <Users className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-neutral-700">
                                      {evento.participantes.length} {evento.participantes.length === 1 ? 'participante' : 'participantes'}
                                    </span>
                                  </div>
                                )}
                                {evento.lembrete && (
                                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                                    evento.lembreteEnviado 
                                      ? 'bg-green-50 border border-green-200' 
                                      : 'bg-amber-50 border border-amber-200'
                                  }`}>
                                    <Bell className={`w-4 h-4 ${evento.lembreteEnviado ? 'text-green-600' : 'text-amber-600'}`} />
                                    <span className={`text-sm font-medium ${evento.lembreteEnviado ? 'text-green-700' : 'text-amber-700'}`}>
                                      {evento.lembreteEnviado ? 'Notificado' : `${evento.lembreteMinutos} min antes`}
                                    </span>
                                  </div>
                                )}
                                {evento.concluido && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-bold text-green-700">Concluído</span>
                                  </div>
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
