import React, { useState, useMemo, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Filter, Clock, Users, FileText, Edit2, Trash2, X, MapPin, Stethoscope, Briefcase, LayoutGrid, List, BarChart3 } from 'lucide-react';
import { TIPOS_EVENTO } from '../../services/calendarioService';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import AdminLayout from '../../layouts/AdminLayout';
import { useEventos } from '../../hooks/useEventos';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import EventoModal from '../../components/admin/EventoModal';
import AgendaModal from '../../components/admin/AgendaModal';
import { useAgendas } from '../../hooks/useAgendas';
import CalendarDashboard from '../../components/calendar/CalendarDashboard';
import CalendarListView from '../../components/calendar/CalendarListView';
import CalendarAgendaView from '../../components/calendar/CalendarAgendaView';
import CalendarFilters from '../../components/calendar/CalendarFilters';
import CalendarSkeleton from '../../components/calendar/CalendarSkeleton';

export default function CalendarioAdmin() {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard', 'month', 'list', 'agendas'
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tipos: [],
    search: '',
    dateRange: { start: '', end: '' },
    status: 'all'
  });
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [eventoVisualizando, setEventoVisualizando] = useState(null);
  const [showEscalasModal, setShowEscalasModal] = useState(false);
  const [escalasDoDia, setEscalasDoDia] = useState([]);
  const [showModalDia, setShowModalDia] = useState(false);
  const [dataModalDia, setDataModalDia] = useState(null);
  const [agendaEditando, setAgendaEditando] = useState(null);
  const [showAgendaModal, setShowAgendaModal] = useState(false);

  const { eventos, loading, deletar, recarregar } = useEventos(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  // Hook para gerenciar agendas do Firestore
  const {
    agendas: agendasFirestore,
    agendasAgrupadas,
    loading: loadingAgendas,
    criar: criarAgenda,
    atualizar: atualizarAgenda,
    deletar: deletarAgenda,
    recarregar: recarregarAgendas
  } = useAgendas();

  useBodyScrollLock(showEventModal || showDetalhesModal || showEscalasModal || showModalDia || showAgendaModal);

  // Debug: Log de agendas carregadas
  useEffect(() => {
    console.log('[CalendarioAdmin] Agendas do Firestore:', agendasFirestore?.length || 0, agendasFirestore);
    console.log('[CalendarioAdmin] Loading agendas:', loadingAgendas);
  }, [agendasFirestore, loadingAgendas]);

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

  // Filtrar eventos baseado nos filtros avançados
  const eventosFiltrados = useMemo(() => {
    return eventos.filter(evento => {
      // Filtro por tipo
      if (filters.tipos.length > 0 && !filters.tipos.includes(evento.tipo)) {
        return false;
      }

      // Filtro por busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchTitulo = evento.titulo?.toLowerCase().includes(searchLower);
        const matchDescricao = evento.descricao?.toLowerCase().includes(searchLower);
        const matchLocal = evento.local?.toLowerCase().includes(searchLower);
        if (!matchTitulo && !matchDescricao && !matchLocal) {
          return false;
        }
      }

      // Filtro por data
      if (filters.dateRange?.start) {
        const dataInicio = new Date(filters.dateRange.start);
        const eventoData = new Date(evento.dataInicio);
        if (eventoData < dataInicio) return false;
      }
      if (filters.dateRange?.end) {
        const dataFim = new Date(filters.dateRange.end);
        const eventoData = new Date(evento.dataInicio);
        if (eventoData > dataFim) return false;
      }

      // Filtro por status
      if (filters.status === 'active' && (!evento.ativo || evento.concluido)) {
        return false;
      }
      if (filters.status === 'completed' && !evento.concluido) {
        return false;
      }

      return true;
    });
  }, [eventos, filters]);

  // Contagem de eventos por tipo (para os filtros)
  const eventCounts = useMemo(() => ({
    reuniao: eventos.filter(e => e.tipo === TIPOS_EVENTO.REUNIAO).length,
    lembrete: eventos.filter(e => e.tipo === TIPOS_EVENTO.LEMBRETE).length,
    agendamento: eventos.filter(e => e.tipo === TIPOS_EVENTO.AGENDAMENTO).length,
  }), [eventos]);

  const getEventosNoDia = (data) => {
    return eventosFiltrados.filter(evento => {
      if (!evento.dataInicio) return false;
      const eventoData = new Date(evento.dataInicio);
      return (
        eventoData.getDate() === data.getDate() &&
        eventoData.getMonth() === data.getMonth() &&
        eventoData.getFullYear() === data.getFullYear()
      );
    });
  };

  /**
   * Pega as agendas semanais de um dia específico (DO FIRESTORE)
   */
  const getAgendasSemanaisNoDia = (data) => {
    const diasSemanaMap = {
      0: 'Domingo',
      1: 'Segunda-feira',
      2: 'Terça-feira',
      3: 'Quarta-feira',
      4: 'Quinta-feira',
      5: 'Sexta-feira',
      6: 'Sábado'
    };

    const diaSemana = diasSemanaMap[data.getDay()];
    const agendasDoDia = [];

    // Buscar agendas do Firestore (não mais dos dados locais)
    if (agendasFirestore && agendasFirestore.length > 0) {
      agendasFirestore.forEach((agenda) => {
        if (agenda.agendaSemanal && agenda.agendaSemanal[diaSemana]) {
          const atividades = agenda.agendaSemanal[diaSemana];
          if (atividades && atividades.length > 0) {
            agendasDoDia.push({
              id: agenda.id,
              categoria: agenda.categoria,
              profissional: agenda.nome,
              nome: agenda.nome,
              atividades,
              agendaSemanal: agenda.agendaSemanal,
              horarioAtendimento: agenda.horarioAtendimento
            });
          }
        }
      });
    }

    return agendasDoDia;
  };

  /**
   * Conta o total de itens (eventos + agendas do Firestore) de um dia
   */
  const getTotalItensNoDia = (data) => {
    const eventosNoDia = getEventosNoDia(data);
    const agendasSemanaisNoDia = getAgendasSemanaisNoDia(data);
    
    return eventosNoDia.length + agendasSemanaisNoDia.length;
  };

  /**
   * Abre modal com todos os eventos e agendas do dia
   */
  const handleVerDiaCompleto = (data, e) => {
    if (e) e.stopPropagation();
    setDataModalDia(data);
    setShowModalDia(true);
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
   * Se a data do evento estiver em outro mês, navega para esse mês
   */
  const handleEventoSalvo = (dataEvento) => {
    // Se foi fornecida a data do evento, verificar se precisa mudar de mês
    if (dataEvento) {
      const dataEventoObj = new Date(dataEvento);
      const mesEvento = dataEventoObj.getMonth();
      const anoEvento = dataEventoObj.getFullYear();
      const mesAtual = currentDate.getMonth();
      const anoAtual = currentDate.getFullYear();

      // Se o evento foi criado para um mês diferente, navegar para esse mês
      if (mesEvento !== mesAtual || anoEvento !== anoAtual) {
        console.log(`📅 Evento criado para ${mesEvento + 1}/${anoEvento}, navegando para esse mês...`);
        setCurrentDate(new Date(anoEvento, mesEvento, 1));
      } else {
        // Mesmo mês, apenas recarregar
        recarregar();
      }
    } else {
      // Sem data fornecida, apenas recarregar
      recarregar();
    }

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

  /**
   * Wrapper para deletar evento sem stopPropagation
   */
  const handleDeletarEventoSemStop = async (evento) => {
    await handleDeletarEvento(evento, { stopPropagation: () => {} });
  };

  /**
   * Wrapper para editar evento sem stopPropagation
   */
  const handleEditarEventoSemStop = (evento) => {
    handleEditarEvento(evento, { stopPropagation: () => {} });
  };

  /**
   * Wrapper para visualizar evento sem stopPropagation
   */
  const handleVisualizarEventoSemStop = (evento) => {
    handleVisualizarEvento(evento, { stopPropagation: () => {} });
  };

  /**
   * Abre modal para editar agenda
   */
  const handleEditarAgenda = (agenda) => {
    setAgendaEditando(agenda);
    setShowAgendaModal(true);
  };

  /**
   * Deleta agenda com confirmação
   */
  const handleDeletarAgenda = async (agenda) => {
    const confirmed = await showModal({
      type: 'warning',
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja deletar a agenda de "${agenda.nome}"? Esta ação não pode ser desfeita.`,
      confirmText: 'Deletar',
      cancelText: 'Cancelar'
    });

    if (!confirmed) return;

    try {
      await deletarAgenda(agenda.id);
      await showModal({
        type: 'success',
        title: 'Agenda Deletada',
        message: 'Agenda deletada com sucesso!',
        confirmText: 'OK'
      });
    } catch (error) {
      console.error('Erro ao deletar agenda:', error);
      await showModal({
        type: 'error',
        title: 'Erro ao Deletar',
        message: `Não foi possível deletar a agenda: ${error.message}`,
        confirmText: 'OK'
      });
    }
  };


  const diasDoMes = getDiasNoMes(currentDate);
  const dataHoje = new Date();

  const diasSemanaCompletos = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  return (
    <AdminLayout currentPage="calendario">
      <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-neutral-900 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 md:w-7 md:h-7 text-primary-600" />
                <span className="truncate">Calendário Administrativo</span>
              </h1>
              <p className="text-sm md:text-base text-neutral-600 mt-1">
                Gerencie reuniões, lembretes e agendamentos
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Botão Adicionar Agenda */}
              <button
                onClick={() => {
                  setAgendaEditando(null);
                  setShowAgendaModal(true);
                }}
                className="bg-indigo-600 text-white px-3 md:px-4 py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md text-sm md:text-base"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Nova Agenda</span>
                <span className="sm:hidden">Agenda</span>
              </button>
              {/* Botão Adicionar Evento */}
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-primary-600 text-white px-3 md:px-4 py-2.5 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md text-sm md:text-base"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Adicionar Evento</span>
                <span className="sm:hidden">Evento</span>
              </button>
            </div>
          </div>

          {/* Toggle de Visualização */}
          <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs md:text-sm font-semibold text-neutral-700 hidden sm:block">Visualização:</span>
              
              {/* Botão Filtros Mobile - Movido para o topo */}
              {(viewMode === 'month' || viewMode === 'list' || viewMode === 'agenda') && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`sm:hidden flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    showFilters
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 active:bg-neutral-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  viewMode === 'dashboard'
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95'
                }`}
              >
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Dashboard</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95'
                }`}
              >
                <List className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Lista</span>
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  viewMode === 'agenda'
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95'
                }`}
              >
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Agenda</span>
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  viewMode === 'month'
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95'
                }`}
              >
                <LayoutGrid className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Calendário</span>
              </button>

              {/* Botão Filtros Desktop */}
              {(viewMode === 'month' || viewMode === 'list' || viewMode === 'agenda') && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`hidden sm:flex px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 items-center gap-2 ${
                    showFilters
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros Avançados */}
      {showFilters && (viewMode === 'month' || viewMode === 'list') && (
        <div className="animate-slide-down">
          <CalendarFilters
            filters={filters}
            onFiltersChange={setFilters}
            eventCounts={eventCounts}
          />
        </div>
      )}

      {/* Loading State */}
      {loading && <CalendarSkeleton viewMode={viewMode} />}

      {/* Dashboard View */}
      {!loading && viewMode === 'dashboard' && (
        <CalendarDashboard
          eventos={eventosFiltrados}
          agendas={agendasFirestore}
          onEventClick={handleVisualizarEventoSemStop}
          onEventEdit={handleEditarEventoSemStop}
          onEventDelete={handleDeletarEventoSemStop}
          onCreateEvent={() => setShowEventModal(true)}
          onAgendaEdit={handleEditarAgenda}
          onAgendaDelete={handleDeletarAgenda}
          onCreateAgenda={() => {
            setAgendaEditando(null);
            setShowAgendaModal(true);
          }}
        />
      )}

      {/* List View */}
      {!loading && viewMode === 'list' && (
        <CalendarListView
          eventos={eventosFiltrados}
          agendas={agendasFirestore}
          onEventClick={handleVisualizarEventoSemStop}
          onEventEdit={handleEditarEventoSemStop}
          onEventDelete={handleDeletarEventoSemStop}
          onAgendaEdit={handleEditarAgenda}
          onAgendaDelete={handleDeletarAgenda}
        />
      )}

      {/* Agenda View */}
      {!loading && viewMode === 'agenda' && (
        <CalendarAgendaView
          eventos={eventosFiltrados}
          agendas={agendasFirestore}
          onEventClick={handleVisualizarEventoSemStop}
          onEventEdit={handleEditarEventoSemStop}
          onEventDelete={handleDeletarEventoSemStop}
          onAgendaEdit={handleEditarAgenda}
          onAgendaDelete={handleDeletarAgenda}
          onCreateAgenda={() => {
            setAgendaEditando(null);
            setShowAgendaModal(true);
          }}
          initialDate={currentDate}
        />
      )}

      {/* Controles do Calendário */}
      {!loading && viewMode === 'month' && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <div className="flex flex-col gap-4">
            {/* Navegação de Meses */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <button
                  onClick={mesAnterior}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-700" />
                </button>

                <div className="text-center flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-900 truncate">
                    {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                </div>

                <button
                  onClick={proximoMes}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-700" />
                </button>

                <button
                  onClick={hoje}
                  className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Hoje
                </button>
              </div>

              {/* Filtros */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="px-2 sm:px-3 py-1.5 border border-neutral-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 flex-1 min-w-0"
                >
                  <option value="todos">Todos os Eventos</option>
                  <option value={TIPOS_EVENTO.REUNIAO}>Reuniões</option>
                  <option value={TIPOS_EVENTO.LEMBRETE}>Lembretes</option>
                  <option value={TIPOS_EVENTO.AGENDAMENTO}>Agendamentos</option>
                </select>
              </div>
            </div>

            {/* Legenda */}
            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="text-neutral-600">Reunião</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                <span className="text-neutral-600">Lembrete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                <span className="text-neutral-600">Agendamento</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid do Calendário */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Versão Desktop */}
              <div className="hidden md:block">
                <div className="min-w-full">
                  {/* Cabeçalho dos Dias da Semana */}
                  <div className="grid grid-cols-7 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
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
                      const totalItens = getTotalItensNoDia(diaInfo.data);
                      const isHoje =
                        diaInfo.data.getDate() === dataHoje.getDate() &&
                        diaInfo.data.getMonth() === dataHoje.getMonth() &&
                        diaInfo.data.getFullYear() === dataHoje.getFullYear();

                      return (
                        <div
                          key={index}
                          className={`group min-h-[110px] border-r border-b border-neutral-200 last:border-r-0 p-3 flex flex-col ${
                            diaInfo.mes !== 'atual'
                              ? 'bg-neutral-50 opacity-60'
                              : isHoje
                                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-primary-300'
                                : 'bg-white hover:bg-neutral-50'
                          } transition-all duration-200 cursor-pointer relative hover:shadow-md hover:z-10`}
                          onClick={(e) => {
                            if (totalItens > 0) {
                              handleVerDiaCompleto(diaInfo.data, e);
                            } else {
                              handleCriarEventoNoDia(diaInfo.data);
                            }
                          }}
                        >
                          <div
                            className={`text-sm font-semibold inline-flex items-center justify-center ${
                              diaInfo.mes !== 'atual'
                                ? 'text-neutral-400'
                                : isHoje
                                ? 'text-white bg-primary-600 rounded-full w-7 h-7 flex items-center justify-center'
                                : 'text-neutral-900'
                            }`}
                          >
                            {diaInfo.dia}
                          </div>

                          {/* Indicador com total de itens no footer */}
                          <div className="mt-auto flex justify-end pt-1">
                            {totalItens > 0 && diaInfo.mes === 'atual' && (
                              <div className="bg-green-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm">
                                {totalItens}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Versão Mobile */}
              <div className="md:hidden">
                <div className="p-4 space-y-4">
                  {/* Cabeçalho do mês */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                  </div>

                  {/* Botão para adicionar evento */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowEventModal(true)}
                      className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                      Adicionar Evento
                    </button>
                  </div>

                  {/* Cards dos dias com eventos/agendas */}
                  {diasDoMes
                    .filter((diaInfo) => {
                      const totalItens = getTotalItensNoDia(diaInfo.data);
                      return diaInfo.mes === 'atual' && totalItens > 0;
                    })
                    .map((diaInfo, index) => {
                      const totalItens = getTotalItensNoDia(diaInfo.data);
                      const isHoje =
                        diaInfo.data.getDate() === dataHoje.getDate() &&
                        diaInfo.data.getMonth() === dataHoje.getMonth() &&
                        diaInfo.data.getFullYear() === dataHoje.getFullYear();

                      return (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 flex flex-col ${
                            isHoje ? 'border-primary-600 bg-blue-50' : 'border-neutral-200 bg-white'
                          }`}
                          onClick={() => handleVerDiaCompleto(diaInfo.data, { stopPropagation: () => {} })}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`text-lg font-bold ${
                                isHoje ? 'text-primary-600' : 'text-neutral-900'
                              }`}
                            >
                              {diaInfo.dia}
                            </div>
                            <div className="text-sm text-neutral-600">
                              {diasSemana[diaInfo.data.getDay()]}
                            </div>
                          </div>
                          <div className="mt-auto flex justify-end pt-2">
                            <div className="bg-green-400 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-sm">
                              {totalItens}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {diasDoMes.filter((diaInfo) => {
                    const totalItens = getTotalItensNoDia(diaInfo.data);
                    return diaInfo.mes === 'atual' && totalItens > 0;
                  }).length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
                      <p className="text-sm">Nenhum evento ou agenda neste mês</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Seção de Agendas Semanais */}
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

      {/* Modal de Agenda (Criar/Editar) */}
      <AgendaModal
        isOpen={showAgendaModal}
        onClose={() => {
          setShowAgendaModal(false);
          setAgendaEditando(null);
        }}
        agendaEditando={agendaEditando}
        onAgendaSalva={async () => {
          setShowAgendaModal(false);
          setAgendaEditando(null);
          await recarregarAgendas();
        }}
      />

      {/* Modal de Escalas/Agendas do Dia */}
      {showEscalasModal && escalasDoDia.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={() => {
          setShowEscalasModal(false);
          setEscalasDoDia([]);
        }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-teal-600" />
                Agendas Médicas e de Enfermagem
              </h3>
              <button
                onClick={() => {
                  setShowEscalasModal(false);
                  setEscalasDoDia([]);
                }}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo */}
            <div className="p-6 space-y-6">
              {escalasDoDia.map((escala, idx) => (
                <div key={idx} className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                  {/* Cabeçalho da Escala */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                        {escala.categoria === 'Médico' ? (
                          <Stethoscope className="w-5 h-5 text-teal-600" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        )}
                        {escala.nome}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">{escala.descricao}</p>
                    </div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                      {escala.categoria}
                    </span>
                  </div>

                  {/* Profissionais */}
                  {escala.profissionais && escala.profissionais.length > 0 && (
                    <div className="mb-4">
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        Profissional(is):
                      </label>
                      <div className="space-y-2">
                        {escala.profissionais.map((prof, profIdx) => (
                          <div key={profIdx} className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-neutral-500" />
                            <span className="font-medium text-neutral-900">{prof.nome}</span>
                            <span className="text-neutral-600">- {prof.funcao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Horários */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      Horários:
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {escala.horarios?.manha?.ativo && (
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Manhã:</span>
                          <span>{escala.horarios.manha.display}</span>
                        </div>
                      )}
                      {escala.horarios?.tarde?.ativo && (
                        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Tarde:</span>
                          <span>{escala.horarios.tarde.display}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Agenda do Dia */}
                  {escala.agendaDoDia && (
                    <div className="border-t border-neutral-300 pt-4">
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        Atividade do Dia ({escala.diaSemana}):
                      </label>
                      <div className="bg-teal-50 border border-teal-200 rounded p-3">
                        <div className="text-sm text-neutral-800 font-medium">
                          {escala.agendaDoDia}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => {
                  setShowEscalasModal(false);
                  setEscalasDoDia([]);
                }}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eventos e Agendas do Dia */}
      {showModalDia && dataModalDia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={() => {
          setShowModalDia(false);
          setDataModalDia(null);
        }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-primary-600" />
                {dataModalDia.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => {
                  setShowModalDia(false);
                  setDataModalDia(null);
                }}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo */}
            <div className="p-6 space-y-6">
              {/* Eventos do Dia */}
              {getEventosNoDia(dataModalDia).length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">Eventos</h4>
                  <div className="space-y-3">
                    {getEventosNoDia(dataModalDia).map((evento) => (
                      <div
                        key={evento.id}
                        className={`${getCorEvento(evento.tipo)} text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => {
                          setShowModalDia(false);
                          handleVisualizarEvento(evento, { stopPropagation: () => {} });
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-0.5">
                              {getIconeEvento(evento.tipo)}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold mb-1">{evento.titulo}</h5>
                              {evento.descricao && (
                                <p className="text-sm text-white/90 line-clamp-2">{evento.descricao}</p>
                              )}
                              {(evento.horaInicio || evento.local) && (
                                <div className="flex items-center gap-4 mt-2 text-xs text-white/80">
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
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agendas Semanais do Dia */}
              {getAgendasSemanaisNoDia(dataModalDia).length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">Agendas Semanais</h4>
                  <div className="space-y-4">
                    {getAgendasSemanaisNoDia(dataModalDia).map((agenda, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-200">
                        <h5 className="font-semibold text-neutral-900 mb-3">{agenda.profissional}</h5>
                        <div className="space-y-2">
                          {agenda.atividades.map((atividade, atvIdx) => (
                            <div key={atvIdx} className="flex items-start gap-2 text-sm">
                              <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-neutral-900">{atividade.horario}</span>
                                <span className="text-neutral-700"> – {atividade.atividade}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensagem quando não há itens */}
              {getEventosNoDia(dataModalDia).length === 0 && 
               getAgendasSemanaisNoDia(dataModalDia).length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
                  <p className="text-sm">Nenhum evento ou agenda para este dia</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-neutral-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModalDia(false);
                  setDataModalDia(null);
                }}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setShowModalDia(false);
                  handleCriarEventoNoDia(dataModalDia);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Evento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Evento */}
      {showDetalhesModal && eventoVisualizando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={() => {
          setShowDetalhesModal(false);
          setEventoVisualizando(null);
        }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
