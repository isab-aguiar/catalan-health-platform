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

export default function Fisioterapeuta() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Fisioterapia
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
            A Fisioterapia na UBS São José oferece tratamento e reabilitação
            física para pacientes com dificuldades de movimento, dores
            musculares e articulares, sequelas de acidentes ou doenças, e
            necessidades de recuperação funcional. Trabalhamos para melhorar sua
            qualidade de vida e independência nas atividades do dia a dia.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Reabilitação física
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Recuperação de movimentos e força muscular
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Tratamento de dores
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dores na coluna, articulações e músculos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Exercícios terapêuticos
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Fortalecimento e alongamento
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Orientações posturais
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Prevenção de lesões e melhor ergonomia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Fisioterapia geriátrica
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Cuidado especial para idosos
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Quem é a profissional */}
        <InfoBox title="Quem é a profissional?">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Profissional
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Especialidade
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Luana</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Fisioterapeuta
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
                Pessoas com dores crônicas (coluna, joelhos, ombros)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Pacientes em recuperação pós-cirúrgica ou pós-trauma
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Idosos com dificuldades de mobilidade
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Pessoas com sequelas de AVC ou outras condições neurológicas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Pacientes com problemas respiratórios que necessitam de
                fisioterapia respiratória
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
                  Consulta Médica e Encaminhamento
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Solicite avaliação e encaminhamento para fisioterapia ao seu
                  médico
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
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
                  </Link>{" "}
                  com o encaminhamento médico. Veja a{" "}
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
                3
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Avaliação Inicial
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  A fisioterapeuta realizará a primeira avaliação e definirá o
                  plano de tratamento
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Comparecimento às Sessões
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Compareça às sessões conforme agendado, seguindo o plano de
                  tratamento estabelecido
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
                <strong>Dica Importante:</strong> Use roupas confortáveis e
                leves nas sessões de fisioterapia. Isso facilita a realização
                dos exercícios e procedimentos.
              </p>
              <p>
                <strong>Compromisso é fundamental!</strong> A fisioterapia
                funciona melhor quando você comparece regularmente às sessões e
                segue as orientações da fisioterapeuta em casa. Não desista do
                seu tratamento!
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
                  Obrigatório para iniciar fisioterapia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">Exames</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Se houver (raio-x, ressonância, entre outros)
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Horário de Atendimento */}
        <InfoBox title="Horário de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    07h00 às 11h00
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    13h00 às 16h00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Informação importante final */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-blue-50">
                Antes de se dirigir à sala de consulta da fisioterapeuta
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
