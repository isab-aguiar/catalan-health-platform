import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Filter, Clock, Users, FileText, Bell } from 'lucide-react';
import { buscarEventosPorMes, TIPOS_EVENTO } from '../../services/calendarioService';
import { useAuth } from '../../contexts/AuthContext';
import EventoModal from '../../components/admin/EventoModal';

export default function CalendarioAdmin() {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventoEditando, setEventoEditando] = useState(null);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  useEffect(() => {
    carregarEventos();
  }, [currentDate]);

  const carregarEventos = async () => {
    try {
      setLoading(true);
      const ano = currentDate.getFullYear();
      const mes = currentDate.getMonth() + 1;
      const eventosData = await buscarEventosPorMes(ano, mes);
      setEventos(eventosData);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiasNoMes = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    const dias = [];

    // Dias do mês anterior
    const diasMesAnterior = new Date(ano, mes, 0).getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      dias.push({
        dia: diasMesAnterior - i,
        mes: 'anterior',
        data: new Date(ano, mes - 1, diasMesAnterior - i)
      });
    }

    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      dias.push({
        dia,
        mes: 'atual',
        data: new Date(ano, mes, dia)
      });
    }

    // Dias do próximo mês
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

  const diasDoMes = getDiasNoMes(currentDate);
  const dataHoje = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <CalendarIcon className="w-7 h-7 text-gov-blue" />
              Calendário Administrativo
            </h1>
            <p className="text-neutral-600 mt-1">
              Gerencie reuniões, lembretes e agendamentos
            </p>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-gov-blue text-white px-4 py-2.5 rounded-lg hover:bg-gov-blue-dark transition-colors flex items-center gap-2 font-medium shadow-sm"
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
              className="px-3 py-1.5 text-sm font-medium text-gov-blue hover:bg-blue-50 rounded-lg transition-colors"
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
              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue"
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue"></div>
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
                        diaInfo.mes !== 'atual' ? 'bg-neutral-50' : 'bg-white hover:bg-neutral-50'
                      } transition-colors cursor-pointer`}
                      onClick={() => {
                        setSelectedDate(diaInfo.data);
                        setShowEventModal(true);
                      }}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          diaInfo.mes !== 'atual'
                            ? 'text-neutral-400'
                            : isHoje
                            ? 'text-white bg-gov-blue rounded-full w-7 h-7 flex items-center justify-center'
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
                            className={`${getCorEvento(evento.tipo)} text-white text-xs px-2 py-1 rounded flex items-center gap-1 truncate`}
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Abrir modal de detalhes do evento
                            }}
                          >
                            {getIconeEvento(evento.tipo)}
                            <span className="truncate">{evento.titulo}</span>
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

      {/* Modal de Evento */}
      <EventoModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedDate(null);
          setEventoEditando(null);
        }}
        eventoEditando={eventoEditando}
        dataInicial={selectedDate}
        onEventoSalvo={() => {
          carregarEventos();
        }}
      />
    </div>
  );
}
