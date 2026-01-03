import React from "react";
import { X, Search, Filter, Users, Bell, FileText } from "lucide-react";
import { TIPOS_EVENTO } from "../../services/calendarioService";
import { getEventColors } from "../../constants/calendarDesign";

export default function CalendarFilters({
  filters,
  onFiltersChange,
  eventCounts,
}) {
  const handleTypeToggle = (tipo) => {
    const newTipos = filters.tipos.includes(tipo)
      ? filters.tipos.filter((t) => t !== tipo)
      : [...filters.tipos, tipo];

    onFiltersChange({ ...filters, tipos: newTipos });
  };

  const handleSearchChange = (search) => {
    onFiltersChange({ ...filters, search });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const handleStatusChange = (status) => {
    onFiltersChange({ ...filters, status });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      tipos: [],
      search: "",
      dateRange: { start: "", end: "" },
      status: "all",
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.tipos.length > 0 ||
      filters.search ||
      filters.dateRange?.start ||
      filters.dateRange?.end ||
      filters.status !== "all"
    );
  };

  const FilterChip = ({
    icon: Icon,
    label,
    count,
    active,
    onClick,
    colorClass,
  }) => (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 rounded-lg border-2 transition-all duration-200
        flex items-center gap-2 text-sm font-medium
        ${
          active
            ? `${colorClass.border} ${colorClass.bg} ${colorClass.text}`
            : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      <span
        className={`
        px-1.5 py-0.5 rounded-full text-xs font-semibold
        ${active ? colorClass.badgeBg : "bg-neutral-100"}
      `}
      >
        {count}
      </span>
    </button>
  );

  const StatusButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-primary-600 text-white shadow-sm"
            : "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 space-y-4">
      <div>
        <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Buscar
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por título, descrição ou local..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Tipo de Evento
        </label>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            icon={Users}
            label="Reuniões"
            count={eventCounts?.reuniao || 0}
            active={filters.tipos.includes(TIPOS_EVENTO.REUNIAO)}
            onClick={() => handleTypeToggle(TIPOS_EVENTO.REUNIAO)}
            colorClass={{
              border: "border-blue-500",
              bg: "bg-blue-50",
              text: "text-blue-700",
              badgeBg: "bg-blue-100",
            }}
          />
          <FilterChip
            icon={Bell}
            label="Lembretes"
            count={eventCounts?.lembrete || 0}
            active={filters.tipos.includes(TIPOS_EVENTO.LEMBRETE)}
            onClick={() => handleTypeToggle(TIPOS_EVENTO.LEMBRETE)}
            colorClass={{
              border: "border-purple-500",
              bg: "bg-purple-50",
              text: "text-purple-700",
              badgeBg: "bg-purple-100",
            }}
          />
          <FilterChip
            icon={FileText}
            label="Agendamentos"
            count={eventCounts?.agendamento || 0}
            active={filters.tipos.includes(TIPOS_EVENTO.AGENDAMENTO)}
            onClick={() => handleTypeToggle(TIPOS_EVENTO.AGENDAMENTO)}
            colorClass={{
              border: "border-green-500",
              bg: "bg-green-50",
              text: "text-green-700",
              badgeBg: "bg-green-100",
            }}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 mb-2 block">
          Período
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-neutral-600 mb-1 block">
              Data Início
            </label>
            <input
              type="date"
              value={filters.dateRange?.start || ""}
              onChange={(e) => handleDateRangeChange("start", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-600 mb-1 block">
              Data Fim
            </label>
            <input
              type="date"
              value={filters.dateRange?.end || ""}
              onChange={(e) => handleDateRangeChange("end", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 mb-2 block">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          <StatusButton
            active={filters.status === "all"}
            onClick={() => handleStatusChange("all")}
          >
            Todos
          </StatusButton>
          <StatusButton
            active={filters.status === "active"}
            onClick={() => handleStatusChange("active")}
          >
            Ativos
          </StatusButton>
          <StatusButton
            active={filters.status === "completed"}
            onClick={() => handleStatusChange("completed")}
          >
            Concluídos
          </StatusButton>
        </div>
      </div>

      {hasActiveFilters() && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
        >
          <X className="w-4 h-4" />
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
