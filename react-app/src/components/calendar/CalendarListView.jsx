import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bell,
  FileText,
  Eye,
  Edit2,
  Trash2,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  X,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  CalendarDays,
  Tag,
  Type
} from 'lucide-react';
import { TIPOS_EVENTO } from '../../services/calendarioService';
import { getEventColors } from '../../constants/calendarDesign';
import { normalizarDataParaMidnight, isMesmoDia } from '../../utils/dateUtils';
import EmptyState from './EmptyState';

/**
 * Vista em lista de eventos com busca e filtros
 */
export default function CalendarListView({ 
  eventos, 
  agendas = [],
  onEventClick, 
  onEventEdit, 
  onEventDelete,
  onAgendaEdit,
  onAgendaDelete 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, tipo, titulo
  const [showAgendas, setShowAgendas] = useState(true);

  // Agrupar eventos por data
  const groupedEvents = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const estaSemanInicio = new Date(hoje);
    estaSemanInicio.setDate(hoje.getDate() - hoje.getDay()); // Domingo

    const estaSemanaFim = new Date(estaSemanInicio);
    estaSemanaFim.setDate(estaSemanInicio.getDate() + 7);

    // Filtrar por busca
    let filtrados = eventos.filter(evento =>
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar
    if (sortBy === 'date') {
      filtrados.sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio));
    } else if (sortBy === 'tipo') {
      filtrados.sort((a, b) => a.tipo.localeCompare(b.tipo));
    } else if (sortBy === 'titulo') {
      filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    // Agrupar
    const grupos = {
      'Hoje': [],
      'Amanhã': [],
      'Esta Semana': [],
      'Depois': []
    };

    filtrados.forEach(evento => {
      const dataEvento = normalizarDataParaMidnight(evento.dataInicio);
      if (!dataEvento) return;

      if (isMesmoDia(dataEvento, hoje)) {
        grupos['Hoje'].push(evento);
      } else if (isMesmoDia(dataEvento, amanha)) {
        grupos['Amanhã'].push(evento);
      } else if (dataEvento >= estaSemanInicio && dataEvento < estaSemanaFim) {
        grupos['Esta Semana'].push(evento);
      } else {
        grupos['Depois'].push(evento);
      }
    });

    return grupos;
  }, [eventos, searchTerm, sortBy]);

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

  const totalEventos = Object.values(groupedEvents).flat().length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Search and Sort */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-xl shadow-lg border border-neutral-200/50 p-3 md:p-6">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-10 py-2.5 md:py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Limpar busca"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2.5 md:py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm font-semibold min-w-0 sm:min-w-[160px] cursor-pointer"
            >
              <option value="date">Por Data</option>
              <option value="tipo">Por Tipo</option>
              <option value="titulo">Por Título</option>
            </select>
          </div>
        </div>

        {/* Results count and stats */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-neutral-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-sm font-semibold text-neutral-700">
            <span className="text-blue-600 text-base">{totalEventos}</span> {totalEventos === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {Object.entries(groupedEvents).map(([grupo, eventosGrupo]) => {
              if (eventosGrupo.length === 0) return null;
              return (
                <div key={grupo} className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-lg border border-neutral-200 backdrop-blur-sm">
                  <span className="text-sm font-bold text-neutral-900">{eventosGrupo.length}</span>
                  <span className="text-xs text-neutral-600">{grupo}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped Events */}
      {totalEventos === 0 && (!agendas || agendas.length === 0) ? (
        <EmptyState
          icon={Search}
          title="Nenhum evento ou agenda encontrado"
          message={searchTerm ? `Nenhum evento corresponde à busca "${searchTerm}"` : 'Não há eventos ou agendas para exibir'}
        />
      ) : (
        Object.entries(groupedEvents).map(([grupo, eventosGrupo]) => {
          if (eventosGrupo.length === 0) return null;

          return (
            <div key={grupo} className="space-y-3 md:space-y-4">
              {/* Group header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 md:px-5 py-2.5 md:py-3 rounded-xl shadow-md z-10 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 md:gap-3">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="truncate">{grupo}</span>
                  <span className="ml-auto px-2 md:px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs flex-shrink-0">
                    {eventosGrupo.length}
                  </span>
                </h3>
              </div>

              {/* Events in group */}
              <div className="space-y-4">
                {eventosGrupo.map(evento => {
                  const IconeEvento = getIconeEvento(evento.tipo);
                  const colors = getEventColors(evento.tipo);

                  return (
                    <div
                      key={evento.id}
                      className="relative bg-white rounded-xl shadow-md border-2 border-neutral-200 p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group overflow-hidden"
                      onClick={() => onEventClick(evento)}
                    >
                      {/* Barra lateral colorida */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bg}`} />

                      <div className="flex items-start justify-between gap-4 pl-3">
                        {/* Left: Event info */}
                        <div className="flex-1 space-y-3 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            {/* Type badge */}
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.light} border-2 ${colors.border} rounded-full text-xs font-bold ${colors.text} shadow-sm`}>
                              <IconeEvento className="w-4 h-4" />
                              {getTipoLabel(evento.tipo)}
                            </span>

                            {/* Status badges */}
                            {evento.concluido && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Concluído
                              </span>
                            )}

                            {evento.lembrete && !evento.lembreteEnviado && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700">
                                <Bell className="w-3.5 h-3.5" />
                                Lembrete ativo
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="font-bold text-lg text-neutral-900 leading-tight">{evento.titulo}</h4>

                          {/* Details in chips */}
                          <div className="flex flex-wrap gap-2.5">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                              <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium text-neutral-700">
                                {(evento.dataInicio?.toDate
                                  ? evento.dataInicio.toDate()
                                  : new Date(evento.dataInicio)
                                ).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            {evento.horaInicio && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                                <Clock className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-neutral-700">{evento.horaInicio}</span>
                                {evento.horaFim && <span className="text-xs text-neutral-500">- {evento.horaFim}</span>}
                              </div>
                            )}
                            {evento.local && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-neutral-700">{evento.local}</span>
                              </div>
                            )}
                            {evento.participantes && evento.participantes.length > 0 && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                                <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-neutral-700">
                                  {evento.participantes.length} {evento.participantes.length === 1 ? 'participante' : 'participantes'}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          {evento.descricao && (
                            <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                              {evento.descricao}
                            </p>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
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

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(evento);
                            }}
                            className="p-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-md group/btn"
                            title="Visualizar"
                          >
                            <Eye className="w-5 h-5 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventEdit(evento);
                            }}
                            className="p-2.5 rounded-lg hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200 hover:shadow-md group/btn"
                            title="Editar"
                          >
                            <Edit2 className="w-5 h-5 text-amber-600 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventDelete(evento);
                            }}
                            className="p-2.5 rounded-lg hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200 hover:shadow-md group/btn"
                            title="Deletar"
                          >
                            <Trash2 className="w-5 h-5 text-red-600 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Agendas Semanais */}
      {showAgendas && agendas && agendas.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50/30 to-blue-50/30 rounded-xl shadow-lg border border-indigo-200/50 p-3 md:p-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-indigo-600 rounded-lg shadow-md flex-shrink-0">
                <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-indigo-900">Agendas Semanais</h3>
                <p className="text-xs md:text-sm text-indigo-600">{agendas.length} profissionais</p>
              </div>
            </div>
            <button
              onClick={() => setShowAgendas(!showAgendas)}
              className="w-full sm:w-auto px-3 md:px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200 text-sm"
            >
              {showAgendas ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agendas.map((agenda) => (
              <div
                key={agenda.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-xl border-2 border-indigo-200 p-4 hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
              >
                {/* Header da Agenda - Mobile friendly sem sobreposição */}
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-indigo-900 text-sm md:text-base break-words leading-tight">{agenda.nome}</h4>
                    </div>
                    
                    {/* Ações - Sempre visíveis em mobile */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {onAgendaEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAgendaEdit(agenda);
                          }}
                          className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          title="Editar agenda"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onAgendaDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAgendaDelete(agenda);
                          }}
                          className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          title="Excluir agenda"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Badge da categoria */}
                  <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold w-fit">
                    {agenda.categoria}
                  </span>
                </div>

                {/* Atividades */}
                <div className="space-y-2">
                  {agenda.agendaSemanal && Object.entries(agenda.agendaSemanal).map(([dia, atividades]) => {
                    if (!atividades || atividades.length === 0) return null;
                    return (
                      <div key={dia} className="text-xs">
                        <div className="font-semibold text-indigo-700 mb-1">{dia}</div>
                        <div className="space-y-1 pl-2">
                          {atividades.map((ativ, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-indigo-600">
                              <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span className="text-xs">{ativ.horario} - {ativ.atividade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
