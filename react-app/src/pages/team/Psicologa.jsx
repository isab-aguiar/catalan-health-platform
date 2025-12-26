import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
function PageContainer({ children }) {
  return <div className="min-h-screen bg-neutral-50 py-8 px-4">{children}</div>;
}
function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-neutral-200",
    highlight: "bg-info/10 border-info",
  };
  return (
    <div
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${variant === "highlight" ? "border-neutral-300" : "border-neutral-200"}`}>
        {icon && <div className="text-primary-700">{icon}</div>}
        <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-info/10",
      border: "border-info",
      text: "text-info",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-warning-dark",
      icon: "text-warning-dark",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success",
      text: "text-success-dark",
      icon: "text-success",
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
export default function Psicologa() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-3xl font-bold text-neutral-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Psicologia
              </h1>
              <p
                className="text-neutral-500 text-xs mt-1"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Estratégia Saúde da Família Bela Vista - Catalão - São José
              </p>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            O atendimento psicológico na ESF Catalão oferece apoio emocional,
            acolhimento e tratamento para questões de saúde mental. Trabalhamos
            com escuta qualificada, psicoterapia breve e orientações para
            melhorar sua qualidade de vida e bem-estar emocional. Cuidar da
            saúde mental é tão importante quanto cuidar da saúde física!
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Psicoterapia individual
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento personalizado e sigiloso
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Grupos terapêuticos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Apoio em grupo para questões específicas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Avaliação psicológica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Para diagnóstico e encaminhamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acolhimento em crise
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Apoio em momentos difíceis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Orientações</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Sobre saúde mental e bem-estar emocional
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Quem é a profissional?">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissional
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Especialidade
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Sandra</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Psicóloga Clínica
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 italic">
            * Agendamento através da Sala 13
          </p>
        </InfoBox>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com ansiedade, depressão ou outros transtornos mentais
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários em situação de crise emocional
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas que enfrentam luto, perdas ou mudanças significativas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com dificuldades de relacionamento (família, trabalho,
                social)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Vítimas de violência ou abuso
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Qualquer pessoa que queira melhorar seu bem-estar emocional
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Agendamento na Central de Agendamentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-info hover:text-primary-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  . Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-info hover:text-primary-700 underline font-semibold"
                  >
                    documentação necessária para agendar
                  </Link>
                  . Procure a psicóloga ou a recepção.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Encaminhamento Médico
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Seu médico de família pode encaminhar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Comparecimento às Sessões
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  O tratamento funciona com continuidade. Compareça às sessões
                  conforme agendado
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="mb-6">
          <Alert type="info">
            <div>
              <p className="mb-2">
                <strong>Cuidar da saúde mental não é sinal de fraqueza!</strong>{" "}
                Procurar ajuda psicológica é um ato de coragem e autocuidado.
                Todos nós podemos precisar de apoio emocional em algum momento
                da vida.
              </p>
              <p className="mb-2">
                <strong>Sigilo profissional garantido:</strong> Tudo o que você
                compartilhar nas sessões de psicologia é estritamente
                confidencial. Sua privacidade é protegida pelo Código de Ética
                Profissional da Psicologia.
              </p>
              <p>
                <strong>Em caso de emergência psiquiátrica:</strong> Se você
                estiver em crise ou com pensamentos de autolesão, procure
                imediatamente o pronto-socorro ou ligue para o Centro de
                Valorização da Vida: <strong>188</strong> 24 horas, gratuito.
              </p>
            </div>
          </Alert>
        </div>
        {}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Encaminhamento médico
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">Se houver</p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Horário de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h00 às 11h00
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    13h00 às 16h00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-blue-50">
                Antes de se dirigir à sala de consulta da psicóloga responsável,
                é necessário passar pela recepção da unidade para realização da
                ficha de atendimento. Esta medida é essencial para agilizar o
                processo de atendimento e garantir a organização adequada do
                fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
