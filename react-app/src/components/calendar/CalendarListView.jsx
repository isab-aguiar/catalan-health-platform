import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, MapPin, Users, Bell, FileText, Eye, Edit2, Trash2, SlidersHorizontal } from 'lucide-react';
import { TIPOS_EVENTO } from '../../services/calendarioService';
import { getEventColors } from '../../constants/calendarDesign';
import EmptyState from './EmptyState';

/**
 * Vista em lista de eventos com busca e filtros
 */
export default function CalendarListView({ eventos, onEventClick, onEventEdit, onEventDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, tipo, titulo

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
      const dataEvento = new Date(evento.dataInicio);
      dataEvento.setHours(0, 0, 0, 0);

      if (dataEvento.getTime() === hoje.getTime()) {
        grupos['Hoje'].push(evento);
      } else if (dataEvento.getTime() === amanha.getTime()) {
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
    <div className="space-y-6 animate-fade-in">
      {/* Search and Sort */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="date">Ordenar por Data</option>
              <option value="tipo">Ordenar por Tipo</option>
              <option value="titulo">Ordenar por Título</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-neutral-600">
          {totalEventos} {totalEventos === 1 ? 'evento encontrado' : 'eventos encontrados'}
        </div>
      </div>

      {/* Grouped Events */}
      {totalEventos === 0 ? (
        <EmptyState
          icon={Search}
          title="Nenhum evento encontrado"
          message={searchTerm ? `Nenhum evento corresponde à busca "${searchTerm}"` : 'Não há eventos para exibir'}
        />
      ) : (
        Object.entries(groupedEvents).map(([grupo, eventosGrupo]) => {
          if (eventosGrupo.length === 0) return null;

          return (
            <div key={grupo} className="space-y-3">
              {/* Group header */}
              <div className="sticky top-0 bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-200 z-10">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  {grupo}
                  <span className="text-xs font-normal text-neutral-500">
                    ({eventosGrupo.length})
                  </span>
                </h3>
              </div>

              {/* Events in group */}
              <div className="space-y-2">
                {eventosGrupo.map(evento => {
                  const IconeEvento = getIconeEvento(evento.tipo);
                  const colors = getEventColors(evento.tipo);

                  return (
                    <div
                      key={evento.id}
                      className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer group"
                      onClick={() => onEventClick(evento)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Event info */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            {/* Type badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.light} ${colors.border} border rounded-full text-xs font-medium ${colors.text}`}>
                              <IconeEvento className="w-3.5 h-3.5" />
                              {getTipoLabel(evento.tipo)}
                            </span>

                            {/* Title */}
                            <h4 className="font-semibold text-neutral-900 flex-1 min-w-0">{evento.titulo}</h4>
                          </div>

                          {/* Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              {new Date(evento.dataInicio).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                            {evento.horaInicio && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                {evento.horaInicio}
                              </span>
                            )}
                            {evento.local && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                {evento.local}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {evento.descricao && (
                            <p className="text-sm text-neutral-600 line-clamp-2">
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
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(evento);
                            }}
                            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="w-4 h-4 text-neutral-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventEdit(evento);
                            }}
                            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4 text-neutral-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventDelete(evento);
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
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
    </div>
  );
}
