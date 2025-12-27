import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, AlertCircle, FileText, Menu, X } from "lucide-react";
import { procedimentosMedicos } from "../../data/procedimentosMedicos";

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

// Mapeamento dos procedimentos do novo formato para o antigo (somente documentos e observações)
const mapearProcedimentos = (procedimentos) => {
  const mapeados = {};

  Object.entries(procedimentos).forEach(([key, proc]) => {
    // Filtra procedimentos sem prestador disponível
    if (proc.semPrestador) {
      return;
    }

    // Filtra apenas observações relevantes para o usuário (não informações operacionais)
    const observacoesUsuario = proc.observacoes?.filter(obs => {
      // Remove observações operacionais/internas
      const obsLower = obs.toLowerCase();
      return !obsLower.includes('protocolar') &&
             !obsLower.includes('lançar') &&
             !obsLower.includes('encaminhar') &&
             !obsLower.includes('passar pela') &&
             !obsLower.includes('deixar na pasta');
    }) || [];

    mapeados[key] = {
      nome: proc.nome,
      documentos: proc.documentosNecessarios.map(doc => ({
        titulo: doc,
        descricao: "" // Não mostrar descrições detalhadas
      })),
      observacoes: observacoesUsuario
    };
  });

  return mapeados;
};


export default function DocumentacaoPorServico() {
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  // Mapeia os procedimentos do arquivo de dados
  const servicosDocumentacao = useMemo(() => mapearProcedimentos(procedimentosMedicos), []);

  const servicoAtual = servicoSelecionado
    ? servicosDocumentacao[servicoSelecionado]
    : null;

  const listaServicos = useMemo(() =>
    Object.entries(servicosDocumentacao)
      .map(([key, servico]) => ({
        key,
        nome: servico.nome,
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome)), // Ordenar alfabeticamente
    [servicosDocumentacao]
  );

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

  const handleServicoClick = (key) => {
    setServicoSelecionado(key);
    setMenuAberto(false);
  };

  const servicoSelecionadoNome = servicoSelecionado
    ? servicosDocumentacao[servicoSelecionado].nome
    : "Selecione o serviço e confira a documentação necessária";

  return (
    <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          Documentação necessária
        </h2>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="w-full flex items-center justify-between bg-white border-2 border-neutral-300 rounded-lg px-4 py-3 text-left font-medium text-sm text-neutral-700 hover:border-info focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <Menu size={20} className="text-neutral-500 flex-shrink-0" />
              <span className="truncate">{servicoSelecionadoNome}</span>
            </span>
            {menuAberto ? (
              <X size={18} className="text-neutral-500 flex-shrink-0 ml-2" />
            ) : (
              <ChevronDown size={18} className="text-neutral-500 flex-shrink-0 ml-2" />
            )}
          </button>

          {menuAberto && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-neutral-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              <div className="p-2">
                {listaServicos.map((servico) => (
                  <button
                    key={servico.key}
                    onClick={() => handleServicoClick(servico.key)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      servicoSelecionado === servico.key
                        ? "bg-info text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {servico.nome}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {servicoAtual && (
        <div className="bg-info/10 border border-info rounded-lg p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-info/30">
            <FileText size={24} className="text-info flex-shrink-0" />
            <h3 className="text-lg font-semibold text-neutral-800">
              {servicoAtual.nome}
            </h3>
          </div>

          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento neste serviço, é obrigatória a apresentação da
            seguinte documentação:
          </p>

          <div className="space-y-2 mb-4">
            {servicoAtual.documentos.map((documento, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200"
              >
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-neutral-800 font-medium">
                  {documento.titulo}
                </p>
              </div>
            ))}
          </div>

          {servicoAtual.observacoes && servicoAtual.observacoes.length > 0 && (
            <Alert type="info">
              <strong>Observações:</strong>
              <ul className="mt-2 space-y-1 ml-4 list-disc">
                {servicoAtual.observacoes.map((obs, index) => (
                  <li key={index} className="text-sm">
                    {obs}
                  </li>
                ))}
              </ul>
            </Alert>
          )}

          {(!servicoAtual.observacoes || servicoAtual.observacoes.length === 0) && (
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF do titular são obrigatórios para qualquer atendimento na
              unidade, independentemente do serviço solicitado.
            </Alert>
          )}
        </div>
      )}

      {!servicoSelecionado && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center">
          <FileText size={48} className="text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600 text-sm">
            Selecione um serviço acima para visualizar a documentação necessária
          </p>
        </div>
      )}
    </div>
  );
}

