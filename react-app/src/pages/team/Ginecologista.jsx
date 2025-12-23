import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";

function PageContainer({ children }) {
  return <div className="min-h-screen bg-slate-50 py-8 px-4">{children}</div>;
}

function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-blue-50 border-blue-300",
  };

  return (
    <div
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
        {icon && <div className="text-blue-700">{icon}</div>}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-900",
      icon: "text-blue-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-900",
      icon: "text-amber-600",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-900",
      icon: "text-green-600",
    },
  };

  const style = types[type];

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

export default function Ginecologista() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Saúde da Mulher - Ginecologia
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            O atendimento de Saúde da Mulher na UBS São José oferece cuidado
            integral à saúde feminina em todas as fases da vida. Realizamos
            consultas ginecológicas, pré-natal, preventivo de câncer de colo
            uterino (Papanicolau), planejamento familiar e acompanhamento de
            doenças ginecológicas.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Consultas ginecológicas
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Avaliação da saúde íntima feminina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Pré-natal</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Acompanhamento de gestantes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Preventivo (Papanicolau)
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Prevenção do câncer de colo de útero
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Planejamento familiar
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Orientação sobre métodos contraceptivos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Climatério e menopausa
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Acompanhamento nessa fase da vida
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Atendimento */}
        <InfoBox title="Atendimento">
          <p className="text-slate-700 leading-relaxed mb-4 text-sm">
            O atendimento ginecológico é realizado pelos médicos da equipe
            conforme escala, com possibilidade de encaminhamento para
            especialista quando necessário.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Tipo de Atendimento
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Como Acessar
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Consulta Ginecológica
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Agendamento na{" "}
                    <Link
                      to="/servicos/sala-4"
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                    >
                      Sala de Agendamentos
                    </Link>{" "}
                    com solicitação de retorno escrito por médica ou por
                    encaminhamento
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Pré-natal</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Primeiro é agendado com enfermeira, que faz o encaminhamento
                    necessário
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Preventivo</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Com enfermeira (sem necessidade de encaminhamento)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Para quem é indicado */}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Mulheres que iniciaram vida sexual (consultas anuais de rotina)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Gestantes para acompanhamento pré-natal
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Mulheres de 25 a 64 anos (preventivo de câncer de colo uterino)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Mulheres em climatério ou menopausa
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Mulheres que necessitam de planejamento familiar
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Acesso ao Serviço */}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  . Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    documentação necessária para agendar
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Agendamento Direto com Ginecologista
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Disponível somente para pacientes com solicitação de retorno
                  escrito por médica ou por encaminhamento médico
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Para Preventivo (Papanicolau)
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Procure a enfermeira da sua equipe (sem necessidade de
                  encaminhamento)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Para Pré-natal
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Primeiro é agendado com enfermeira, que faz o encaminhamento
                  necessário para o ginecologista
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Alerta Informativo */}
        <div className="mb-6">
          <Alert type="info">
            <div>
              <p className="mb-2">
                <strong>Preventivo (Papanicolau):</strong> Deve ser feito
                anualmente por mulheres de 25 a 64 anos que já iniciaram vida
                sexual. É rápido, indolor e pode salvar sua vida! Agende com a
                enfermeira.
              </p>
              <p>
                <strong>Descobriu que está grávida?</strong> Parabéns! Inicie o
                pré-natal o mais cedo possível. Procure a{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-blue-600 hover:text-blue-700 underline font-semibold"
                >
                  Sala de Agendamentos
                </Link>{" "}
                para agendar sua primeira consulta. O pré-natal é essencial para
                uma gravidez saudável!
              </p>
            </div>
          </Alert>
        </div>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Encaminhamento médico
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Para consultas ginecológicas especializadas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Exames anteriores
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">Se houver</p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Informação importante final */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-blue-50">
                Antes de se dirigir à sala de consulta do ginecologista
                responsável, é necessário passar pela recepção da unidade para
                realização da ficha de atendimento. Esta medida é essencial para
                agilizar o processo de atendimento e garantir a organização
                adequada do fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
