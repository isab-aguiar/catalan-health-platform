import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  ChevronDown,
  AlertCircle,
  FileText,
  Menu,
  X,
  MapPin,
  Clock,
  AlertTriangle,
  Search,
  CheckCircle,
  Users,
  ArrowLeft,
} from "lucide-react";
import { procedimentosMedicos, informacoesAdicionais } from "../../data/procedimentosMedicos";

function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-info/10",
      border: "border-info",
      text: "text-neutral-900",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-neutral-900",
      icon: "text-warning-dark",
    },
    error: {
      bg: "bg-error/10",
      border: "border-error",
      text: "text-neutral-900",
      icon: "text-error",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success",
      text: "text-neutral-900",
      icon: "text-success",
    },
  };
  const style = types[type] || types.info;
  return (
    <div
      className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}
    >
      <div className="flex gap-3">
        <AlertCircle
          size={20}
          className={`flex-shrink-0 mt-0.5 ${style.icon}`}
        />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Badge({ type, children }) {
  const types = {
    filaUnica: "bg-info text-white",
    urgente: "bg-error text-white",
    semPrestador: "bg-neutral-400 text-white",
    localAlternativo: "bg-success text-white",
    horarioEspecifico: "bg-warning text-neutral-900",
  };
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1`}>
      {children}
    </span>
  );
}

export default function OrientacoesPosConsulta() {
  const navigate = useNavigate();
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const menuRef = useRef(null);

  const procedimentoAtual = procedimentoSelecionado
    ? procedimentosMedicos[procedimentoSelecionado]
    : null;

  const procedimentosPorCategoria = useMemo(() => {
    const grupos = {};
    Object.entries(procedimentosMedicos).forEach(([key, proc]) => {
      if (!grupos[proc.categoria]) {
        grupos[proc.categoria] = [];
      }
      grupos[proc.categoria].push({ key, ...proc });
    });

    Object.keys(grupos).forEach((categoria) => {
      grupos[categoria].sort((a, b) => a.nome.localeCompare(b.nome));
    });

    return grupos;
  }, []);

  const categoriasOrdenadas = useMemo(() => {
    return Object.keys(procedimentosPorCategoria).sort();
  }, [procedimentosPorCategoria]);

  const procedimentosFiltrados = useMemo(() => {
    if (!termoBusca.trim()) return null;

    const termo = termoBusca.toLowerCase();
    const filtrados = [];

    Object.entries(procedimentosMedicos).forEach(([key, proc]) => {
      if (
        proc.nome.toLowerCase().includes(termo) ||
        proc.categoria.toLowerCase().includes(termo) ||
        proc.local.toLowerCase().includes(termo)
      ) {
        filtrados.push({ key, ...proc });
      }
    });

    return filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
  }, [termoBusca]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }

    if (menuAberto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  const handleProcedimentoClick = (key) => {
    setProcedimentoSelecionado(key);
    setMenuAberto(false);
    setTermoBusca("");
  };

  const procedimentoSelecionadoNome = procedimentoSelecionado
    ? procedimentosMedicos[procedimentoSelecionado].nome
    : "Selecione o procedimento médico";

  const highlightMatch = (text, search) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={i} className="bg-warning/30 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <AdminLayout currentPage="orientacoes">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 sm:gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">Voltar</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 truncate">
                Orientações Pós-Consulta
              </h1>
            </div>
          </div>
          <p className="text-neutral-600 text-xs sm:text-sm">
            Consulte as orientações, documentos necessários e informações importantes
            para cada procedimento médico oferecido pela unidade.
          </p>
        </div>

        {/* Seletor de Procedimento */}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
              Buscar Procedimento
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 sm:w-5 sm:h-5"
              />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                onFocus={() => setMenuAberto(true)}
                placeholder="Digite para buscar..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="w-full flex items-center justify-between bg-white border-2 border-neutral-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-left font-medium text-xs sm:text-sm text-neutral-700 hover:border-info focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent transition-colors"
            >
              <span className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <Menu size={18} className="text-neutral-500 flex-shrink-0 sm:w-5 sm:h-5" />
                <span className="truncate">{procedimentoSelecionadoNome}</span>
              </span>
              {menuAberto ? (
                <X size={16} className="text-neutral-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
              ) : (
                <ChevronDown size={16} className="text-neutral-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
              )}
            </button>

            {menuAberto && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-neutral-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                <div className="p-2">
                  {/* Visualização com busca ativa */}
                  {procedimentosFiltrados ? (
                    procedimentosFiltrados.length > 0 ? (
                      procedimentosFiltrados.map((proc) => (
                        <button
                          key={proc.key}
                          onClick={() => handleProcedimentoClick(proc.key)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                            procedimentoSelecionado === proc.key
                              ? "bg-info text-white"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="flex-1 min-w-0">
                              {highlightMatch(proc.nome, termoBusca)}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${
                              procedimentoSelecionado === proc.key
                                ? "bg-white/20 text-white"
                                : "bg-neutral-200 text-neutral-600"
                            }`}>
                              {proc.categoria}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-neutral-500">
                        <Search size={32} className="mx-auto mb-2 text-neutral-300" />
                        <p className="text-sm">Nenhum procedimento encontrado</p>
                      </div>
                    )
                  ) : (
                    /* Visualização agrupada por categoria */
                    categoriasOrdenadas.map((categoria) => (
                      <div key={categoria} className="mb-3">
                        <div className="px-3 py-2 bg-neutral-100 rounded-lg mb-1">
                          <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
                            {categoria}
                          </h4>
                        </div>
                        {procedimentosPorCategoria[categoria].map((proc) => (
                          <button
                            key={proc.key}
                            onClick={() => handleProcedimentoClick(proc.key)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                              procedimentoSelecionado === proc.key
                                ? "bg-info text-white"
                                : "text-neutral-700 hover:bg-neutral-100"
                            }`}
                          >
                            {proc.nome}
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detalhes do Procedimento */}
        {procedimentoAtual && (
          <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-4 sm:p-6">
            {/* Cabeçalho do Procedimento */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <FileText size={24} className="text-info flex-shrink-0 sm:w-7 sm:h-7" />
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-800 truncate">
                    {procedimentoAtual.nome}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 sm:mt-1">
                    {procedimentoAtual.categoria}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {procedimentoAtual.filaUnica && (
                  <Badge type="filaUnica">
                    <CheckCircle size={14} />
                    Fila Única
                  </Badge>
                )}
                {procedimentoAtual.urgente && (
                  <Badge type="urgente">
                    <AlertTriangle size={14} />
                    Urgente
                  </Badge>
                )}
                {procedimentoAtual.semPrestador && (
                  <Badge type="semPrestador">
                    <AlertCircle size={14} />
                    Sem Prestador
                  </Badge>
                )}
                {procedimentoAtual.localAlternativo && (
                  <Badge type="localAlternativo">
                    <MapPin size={14} />
                    {procedimentoAtual.localAlternativo}
                  </Badge>
                )}
                {procedimentoAtual.horarioEspecifico && (
                  <Badge type="horarioEspecifico">
                    <Clock size={14} />
                    Horário Específico
                  </Badge>
                )}
              </div>
            </div>

            {/* Aviso para procedimentos sem prestador */}
            {procedimentoAtual.semPrestador && (
              <Alert type="error">
                <strong>Serviço Indisponível:</strong> Este procedimento está
                temporariamente sem prestador credenciado. Entre em contato com
                a unidade para mais informações.
              </Alert>
            )}

            {/* Local de Atendimento */}
            <div className="bg-info/10 border border-info rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={20} className="text-info" />
                <h3 className="text-sm font-bold text-neutral-800">
                  Local de Atendimento
                </h3>
              </div>
              <p className="text-sm text-neutral-700 ml-7">
                {procedimentoAtual.local}
              </p>
            </div>

            {/* Horário Específico */}
            {procedimentoAtual.horarioEspecifico && (
              <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={20} className="text-warning-dark" />
                  <h3 className="text-sm font-bold text-neutral-800">
                    Horários de Atendimento
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 ml-7">
                  {procedimentoAtual.horarioEspecifico}
                </p>
              </div>
            )}

            {/* Orientações */}
            {procedimentoAtual.orientacoes.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={20} className="text-neutral-600" />
                  <h3 className="text-sm font-bold text-neutral-800">
                    Orientações
                  </h3>
                </div>
                <div className="space-y-2 ml-7">
                  {procedimentoAtual.orientacoes.map((orientacao, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-neutral-50 p-3 rounded border border-neutral-200"
                    >
                      <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-neutral-700">{orientacao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentos Necessários */}
            {procedimentoAtual.documentosNecessarios.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-neutral-600" />
                  <h3 className="text-sm font-bold text-neutral-800">
                    Documentos Necessários
                  </h3>
                </div>
                <div className="space-y-2 ml-7">
                  {procedimentoAtual.documentosNecessarios.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-neutral-50 p-3 rounded border border-neutral-200"
                    >
                      <CheckCircle
                        size={16}
                        className="text-success mt-0.5 flex-shrink-0"
                      />
                      <p className="text-sm text-neutral-700 font-medium">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Observações */}
            {procedimentoAtual.observacoes.length > 0 && (
              <Alert type="warning">
                <strong>Observações Importantes:</strong>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  {procedimentoAtual.observacoes.map((obs, index) => (
                    <li key={index} className="text-sm">
                      {obs}
                    </li>
                  ))}
                </ul>
              </Alert>
            )}
          </div>
        )}

        {/* Placeholder quando nenhum procedimento está selecionado */}
        {!procedimentoSelecionado && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-md shadow-sm p-8 text-center">
            <FileText size={48} className="text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600 text-sm">
              Selecione um procedimento médico acima para visualizar as orientações
            </p>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-800">
            Informações Adicionais
          </h2>

          {/* Porta Aberta */}
          <Alert type="info">
            <strong>{informacoesAdicionais.portaAberta.titulo}</strong>
            <p className="mt-2 text-sm">
              {informacoesAdicionais.portaAberta.descricao}
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              {informacoesAdicionais.portaAberta.casos.map((caso, index) => (
                <li key={index} className="text-sm">
                  {caso}
                </li>
              ))}
            </ul>
          </Alert>

          {/* Fisioterapias UNA */}
          <Alert type="success">
            <strong>{informacoesAdicionais.fisioterapias.titulo}</strong>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              {informacoesAdicionais.fisioterapias.tipos.map((tipo, index) => (
                <li key={index} className="text-sm">
                  {tipo}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm italic">
              {informacoesAdicionais.fisioterapias.observacao}
            </p>
          </Alert>

          {/* Fisioterapias CRER */}
          <Alert type="info">
            <strong>{informacoesAdicionais.fisioterapiaCrer.titulo}</strong>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              {informacoesAdicionais.fisioterapiaCrer.tipos.map((tipo, index) => (
                <li key={index} className="text-sm">
                  {tipo}
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      </div>
    </AdminLayout>
  );
}
