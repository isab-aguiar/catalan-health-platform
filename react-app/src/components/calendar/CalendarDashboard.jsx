import React, { useMemo } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Bell,
  Plus,
  Users,
  FileText,
  CalendarCheck,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Stethoscope,
  Briefcase,
} from "lucide-react";
import StatsCard from "./StatsCard";
import EmptyState from "./EmptyState";
import { TIPOS_EVENTO } from "../../services/calendarioService";
import { getEventColors } from "../../constants/calendarDesign";
import { normalizarDataParaMidnight, isMesmoDia } from "../../utils/dateUtils";

export default function CalendarDashboard({
  eventos,
  agendas = [],
  onEventClick,
  onEventEdit,
  onEventDelete,
  onCreateEvent,
  onAgendaEdit,
  onAgendaDelete,
  onCreateAgenda,
}) {
  const stats = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const proximos7Dias = new Date(hoje);
    proximos7Dias.setDate(proximos7Dias.getDate() + 7);
    proximos7Dias.setHours(23, 59, 59, 999);

    console.log(
      "[CalendarDashboard] Eventos recebidos:",
      eventos?.length || 0,
      eventos
    );

    const eventosAtivos = eventos.filter((e) => {
      const isAtivo = e.ativo === true || e.ativo === undefined;
      const naoConcluido = !e.concluido;
      return isAtivo && naoConcluido;
    });

    console.log(
      "[CalendarDashboard] Eventos ativos:",
      eventosAtivos.length,
      eventosAtivos
    );

    const eventosHoje = eventosAtivos.filter((e) => {
      if (!e.dataInicio) return false;
      const dataEvento = normalizarDataParaMidnight(e.dataInicio);
      if (!dataEvento) return false;
      const isHoje = isMesmoDia(dataEvento, hoje);
      console.log(
        `[CalendarDashboard] Evento "${e.titulo}" - data: ${dataEvento.toLocaleDateString()}, hoje: ${hoje.toLocaleDateString()}, isHoje: ${isHoje}`
      );
      return isHoje;
    });

    const eventosProximos = eventosAtivos.filter((e) => {
      if (!e.dataInicio) return false;
      const dataEvento = normalizarDataParaMidnight(e.dataInicio);
      if (!dataEvento) return false;
      const isProximo = dataEvento >= hoje && dataEvento <= proximos7Dias;
      return isProximo;
    });

    console.log("[CalendarDashboard] Eventos hoje:", eventosHoje.length);
    console.log(
      "[CalendarDashboard] Eventos próximos 7 dias:",
      eventosProximos.length
    );

    const eventosTotal = eventos.length;
    const eventosConcluidos = eventos.filter((e) => e.concluido).length;
    const taxaConclusao =
      eventosTotal > 0
        ? Math.round((eventosConcluidos / eventosTotal) * 100)
        : 0;

    const lembretesAtivos = eventosAtivos.filter(
      (e) => e.lembrete && !e.lembreteEnviado
    ).length;

    const porTipo = {
      reuniao: eventosAtivos.filter((e) => e.tipo === TIPOS_EVENTO.REUNIAO)
        .length,
      lembrete: eventosAtivos.filter((e) => e.tipo === TIPOS_EVENTO.LEMBRETE)
        .length,
      agendamento: eventosAtivos.filter(
        (e) => e.tipo === TIPOS_EVENTO.AGENDAMENTO
      ).length,
    };

    const diasSemanaMap = {
      0: "Domingo",
      1: "Segunda-feira",
      2: "Terça-feira",
      3: "Quarta-feira",
      4: "Quinta-feira",
      5: "Sexta-feira",
      6: "Sábado",
    };
    const diaSemanaHoje = diasSemanaMap[hoje.getDay()];

    const agendasHoje = agendas.filter((agenda) => {
      if (!agenda.agendaSemanal) return false;
      const atividades = agenda.agendaSemanal[diaSemanaHoje];
      return atividades && atividades.length > 0;
    });

    return {
      eventosHoje,
      eventosProximos,
      taxaConclusao,
      lembretesAtivos,
      porTipo,
      total: eventosAtivos.length,
      agendasHoje,
      diaSemanaHoje,
      totalAgendas: agendas.length,
    };
  }, [eventos, agendas]);

  const formatarData = (data) => {
    const dateObj = data?.toDate ? data.toDate() : new Date(data);
    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
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

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        <StatsCard
          icon={Calendar}
          title="Eventos Hoje"
          value={stats.eventosHoje.length}
          bgColor="bg-blue-500"
        />
        <StatsCard
          icon={Clock}
          title="Próximos 7 Dias"
          value={stats.eventosProximos.length}
          bgColor="bg-purple-500"
        />
        <StatsCard
          icon={CheckCircle}
          title="Taxa de Conclusão"
          value={`${stats.taxaConclusao}%`}
          bgColor="bg-green-500"
        />
        <StatsCard
          icon={Bell}
          title="Lembretes Ativos"
          value={stats.lembretesAtivos}
          bgColor="bg-amber-500"
        />
        <StatsCard
          icon={Users}
          title="Agendas Profissionais"
          value={stats.totalAgendas}
          bgColor="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-3 md:p-6 border-b border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-600 flex-shrink-0" />
                <span className="truncate">Agenda de Hoje</span>
              </h3>
              <span className="text-xs md:text-sm text-neutral-600">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>

          <div className="p-3 md:p-6">
            {stats.eventosHoje.length === 0 ? (
              <EmptyState
                icon={CalendarCheck}
                title="Nenhum evento hoje"
                message="Aproveite seu dia livre ou crie um novo evento!"
                action={
                  <button
                    onClick={onCreateEvent}
                    className="px-3 md:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Criar Evento</span>
                    <span className="sm:hidden">Criar</span>
                  </button>
                }
              />
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stats.eventosHoje.map((evento) => {
                  const IconeEvento = getIconeEvento(evento.tipo);
                  const colors = getEventColors(evento.tipo);

                  return (
                    <div
                      key={evento.id}
                      className={`${colors.light} border ${colors.border} rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group`}
                      onClick={() => onEventClick(evento)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div
                            className={`${colors.base} rounded-lg p-2 flex-shrink-0`}
                          >
                            <IconeEvento className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-neutral-900 truncate">
                              {evento.titulo}
                            </h4>
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-600">
                              {evento.horaInicio && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {evento.horaInicio}
                                </span>
                              )}
                              {evento.local && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {evento.local}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventEdit(evento);
                            }}
                            className="p-1.5 rounded hover:bg-white transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4 text-neutral-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventDelete(evento);
                            }}
                            className="p-1.5 rounded hover:bg-white transition-colors"
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
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-3 md:p-6 border-b border-neutral-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-base md:text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              Próximos 7 Dias
            </h3>
          </div>

          <div className="p-3 md:p-6">
            {stats.eventosProximos.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="Nenhum evento próximo"
                message="Você não tem compromissos agendados para os próximos 7 dias."
              />
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stats.eventosProximos.slice(0, 10).map((evento) => {
                  const IconeEvento = getIconeEvento(evento.tipo);
                  const colors = getEventColors(evento.tipo);

                  return (
                    <div
                      key={evento.id}
                      className="border border-neutral-200 rounded-lg p-3 hover:shadow-md hover:border-neutral-300 transition-all duration-200 cursor-pointer group"
                      onClick={() => onEventClick(evento)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`${colors.base} rounded p-1.5 flex-shrink-0`}
                        >
                          <IconeEvento className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-neutral-900 text-sm truncate">
                              {evento.titulo}
                            </h4>
                            <span className="text-xs text-neutral-500 whitespace-nowrap">
                              {formatarData(evento.dataInicio)}
                            </span>
                          </div>
                          {evento.horaInicio && (
                            <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {evento.horaInicio}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-3 md:p-6 border-b border-neutral-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm md:text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 flex-shrink-0" />
              <span>Agendas de Hoje</span>
              <span className="text-xs md:text-sm font-normal text-neutral-600">
                ({stats.diaSemanaHoje})
              </span>
            </h3>
            {onCreateAgenda && (
              <button
                onClick={onCreateAgenda}
                className="px-2.5 py-1.5 md:px-3 md:py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-1.5 text-xs md:text-sm font-medium self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Nova Agenda</span>
                <span className="sm:hidden">Nova</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-3 md:p-6">
          {stats.agendasHoje.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Nenhuma agenda para hoje"
              message="Não há profissionais com atividades agendadas para este dia."
              action={
                onCreateAgenda && (
                  <button
                    onClick={onCreateAgenda}
                    className="px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Criar Agenda</span>
                    <span className="sm:hidden">Criar</span>
                  </button>
                )
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {stats.agendasHoje.map((agenda) => {
                const atividades =
                  agenda.agendaSemanal?.[stats.diaSemanaHoje] || [];

                return (
                  <div
                    key={agenda.id}
                    className="group border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-purple-50/30 rounded-xl p-3 md:p-5 transition-all duration-300 hover:shadow-lg hover:border-indigo-300"
                  >
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-2.5 bg-indigo-600 rounded-lg shadow-md">
                          <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base md:text-lg text-indigo-900">
                            {agenda.nome}
                          </h4>
                          <span className="text-xs px-2 py-0.5 bg-indigo-600 text-white rounded-full font-medium">
                            {agenda.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {onAgendaEdit && (
                          <button
                            onClick={() => onAgendaEdit(agenda)}
                            className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onAgendaDelete && (
                          <button
                            onClick={() => onAgendaDelete(agenda)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {atividades.slice(0, 3).map((atividade, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-100"
                        >
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-100 rounded text-xs font-bold text-indigo-900">
                            <Clock className="w-3 h-3" />
                            {atividade.horario}
                          </div>
                          <span className="text-sm text-indigo-800 flex-1">
                            {atividade.atividade}
                          </span>
                        </div>
                      ))}
                      {atividades.length > 3 && (
                        <p className="text-xs text-indigo-600 font-medium text-center pt-1">
                          + {atividades.length - 3} mais atividades
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          Eventos por Tipo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-3xl font-bold text-blue-700">
                {stats.porTipo.reuniao}
              </span>
            </div>
            <p className="text-sm font-medium text-blue-600 mb-2">Reuniões</p>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{
                  width:
                    stats.total > 0
                      ? `${(stats.porTipo.reuniao / stats.total) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <Bell className="w-6 h-6 text-purple-600" />
              <span className="text-3xl font-bold text-purple-700">
                {stats.porTipo.lembrete}
              </span>
            </div>
            <p className="text-sm font-medium text-purple-600 mb-2">
              Lembretes
            </p>
            <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{
                  width:
                    stats.total > 0
                      ? `${(stats.porTipo.lembrete / stats.total) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-6 h-6 text-green-600" />
              <span className="text-3xl font-bold text-green-700">
                {stats.porTipo.agendamento}
              </span>
            </div>
            <p className="text-sm font-medium text-green-600 mb-2">
              Agendamentos
            </p>
            <div className="h-2 bg-green-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full transition-all duration-500"
                style={{
                  width:
                    stats.total > 0
                      ? `${(stats.porTipo.agendamento / stats.total) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
