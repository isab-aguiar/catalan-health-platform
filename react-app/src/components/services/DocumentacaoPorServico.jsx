import { useState, useRef, useEffect } from "react";
import { ChevronDown, AlertCircle, FileText, Menu, X } from "lucide-react";

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

const servicosDocumentacao = {
  "administracao-medicacao-noripurum": {
    nome: "Administração de Medicação Noripurum",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação) do titular",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Prescrição Médica Original",
        descricao: "Documento original emitido pelo médico assistente com indicação do medicamento",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
    ],
  },
  "cirurgias": {
    nome: "Cirurgias",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto do Titular",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF do Titular",
        descricao: "Documento físico original ou número do CPF",
      },
      {
        titulo: "Guia de Encaminhamento Médico Original",
        descricao: "Documento original emitido pelo médico assistente",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Exames Pré-operatórios",
        descricao: "Resultados dos exames solicitados pelo médico (quando aplicável)",
      },
    ],
  },
  "consulta-enfermagem": {
    nome: "Consulta de Enfermagem",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
    ],
  },
  "consulta-farmaceutica": {
    nome: "Consulta Farmacêutica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Receitas Médicas (quando aplicável)",
        descricao: "Prescrições médicas para orientação sobre medicamentos",
      },
    ],
  },
  "consulta-ginecologica": {
    nome: "Consulta Ginecológica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Cartão de Pré-natal (quando aplicável)",
        descricao: "Cartão de acompanhamento pré-natal atualizado",
      },
    ],
  },
  "consulta-odontologica": {
    nome: "Consulta Odontológica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
    ],
  },
  "consulta-oftalmologica": {
    nome: "Consulta Oftalmológica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Guia de Encaminhamento (quando aplicável)",
        descricao: "Documento de encaminhamento médico original",
      },
    ],
  },
  "consulta-pediatrica": {
    nome: "Consulta Pediátrica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto do Responsável",
        descricao: "RG ou CNH do responsável legal",
      },
      {
        titulo: "Documento de Identificação da Criança",
        descricao: "Certidão de Nascimento ou RG da criança",
      },
      {
        titulo: "CPF do Responsável",
        descricao: "Documento físico original ou número do CPF",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS) da Criança",
        descricao: "Cartão do SUS da criança atualizado",
      },
      {
        titulo: "Cartão de Vacinação",
        descricao: "Cartão de vacinação atualizado",
      },
    ],
  },
  "consulta-psiquiatrica": {
    nome: "Consulta Psiquiátrica",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Guia de Encaminhamento Médico",
        descricao: "Documento de encaminhamento original (quando aplicável)",
      },
    ],
  },
  "consulta-psicologo": {
    nome: "Consulta com Psicólogo",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Guia de Encaminhamento (quando aplicável)",
        descricao: "Documento de encaminhamento médico original",
      },
    ],
  },
  "consultas-especializadas": {
    nome: "Consultas Especializadas",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Guia de Encaminhamento Médico Original",
        descricao: "Documento original emitido pelo médico assistente",
      },
    ],
  },
  "consultas-medicas": {
    nome: "Consultas Médicas",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
    ],
  },
  "eletrocardiograma-ecg": {
    nome: "Eletrocardiograma (ECG)",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Prescrição Médica Original",
        descricao: "Documento original emitido pelo médico assistente",
      },
    ],
  },
  "exames-rotina": {
    nome: "Exames de Rotina",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Prescrição Médica Original",
        descricao: "Documento original emitido pelo médico assistente",
      },
    ],
  },
  "exames-especializados": {
    nome: "Exames Especializados",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular do atendimento",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Prescrição Médica Original",
        descricao: "Documento original emitido pelo médico assistente",
      },
      {
        titulo: "Guia de Solicitação de Exame",
        descricao: "Documento de solicitação original quando aplicável",
      },
    ],
  },
  "primeira-consulta-pre-natal": {
    nome: "Primeira Consulta de Pré-Natal",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH da gestante",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF da gestante",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Comprovante de Gravidez",
        descricao: "Exame de gravidez positivo ou ultrassom confirmatório",
      },
    ],
  },
  "puericultura-acompanhamento-infantil": {
    nome: "Puericultura - Acompanhamento Infantil",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto do Responsável",
        descricao: "RG ou CNH do responsável legal",
      },
      {
        titulo: "Documento de Identificação da Criança",
        descricao: "Certidão de Nascimento ou RG da criança",
      },
      {
        titulo: "CPF do Responsável",
        descricao: "Documento físico original ou número do CPF",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS) da Criança",
        descricao: "Cartão do SUS da criança atualizado",
      },
      {
        titulo: "Cartão de Vacinação",
        descricao: "Cartão de vacinação atualizado",
      },
      {
        titulo: "Cartão da Criança",
        descricao: "Cartão de acompanhamento do crescimento e desenvolvimento",
      },
    ],
  },
  "vacinacao": {
    nome: "Vacinação",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG ou CNH do titular (ou do responsável, quando menor de idade)",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS atualizado",
      },
      {
        titulo: "Cartão de Vacinação",
        descricao: "Cartão de vacinação para registro das doses aplicadas",
      },
      {
        titulo: "Documento da Criança (quando aplicável)",
        descricao: "Certidão de Nascimento ou RG da criança",
      },
    ],
  },
  "atualizacao-cadastro": {
    nome: "Atualização de Cadastro",
    documentos: [
      {
        titulo: "Documento de Identificação com Foto",
        descricao: "RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação) do titular",
      },
      {
        titulo: "CPF - Cadastro de Pessoa Física",
        descricao: "Documento físico original ou número do CPF do titular",
      },
      {
        titulo: "Comprovante de Residência",
        descricao: "Atualizado há no máximo 90 dias (conta de água, luz, telefone ou correspondência bancária)",
      },
      {
        titulo: "Cartão Nacional de Saúde (CNS)",
        descricao: "Cartão do SUS (quando já possuir)",
      },
    ],
  },
};

export default function DocumentacaoPorServico() {
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const servicoAtual = servicoSelecionado
    ? servicosDocumentacao[servicoSelecionado]
    : null;

  const listaServicos = Object.entries(servicosDocumentacao).map(
    ([key, servico]) => ({
      key,
      nome: servico.nome,
    })
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
          Documentação Necessária por Serviço
        </h2>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="w-full flex items-center justify-between bg-white border-2 border-neutral-300 rounded-lg px-4 py-3 text-left font-medium text-sm text-neutral-700 hover:border-info focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent transition-colors"
          >
            <span className="flex items-center gap-2">
              <Menu size={20} className="text-neutral-500" />
              <span className="truncate">{servicoSelecionadoNome}</span>
            </span>
            {menuAberto ? (
              <X size={18} className="text-neutral-500 flex-shrink-0" />
            ) : (
              <ChevronDown size={18} className="text-neutral-500 flex-shrink-0" />
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

          <div className="space-y-3 mb-4">
            {servicoAtual.documentos.map((documento, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-4 rounded border border-neutral-200"
              >
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm block">
                    {documento.titulo}
                  </strong>
                  <p className="text-xs text-neutral-600 mt-1">
                    {documento.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Alert type="warning">
            <strong>Normativa:</strong> Documento de identificação com foto e
            CPF do titular são obrigatórios para qualquer atendimento na
            unidade, independentemente do serviço solicitado.
          </Alert>
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

