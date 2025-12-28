import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
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
export default function Fisioterapeuta() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-3xl font-bold text-neutral-900 whitespace-nowrap"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Consultório de Fisioterapia
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
            A Fisioterapia na ESF Catalão oferece tratamento e reabilitação
            física para pacientes com dificuldades de movimento, dores
            musculares e articulares, sequelas de acidentes ou doenças, e
            necessidades de recuperação funcional. Trabalhamos para melhorar sua
            qualidade de vida e independência nas atividades do dia a dia.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Reabilitação física
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Recuperação de movimentos e força muscular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Tratamento de dores
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Dores na coluna, articulações e músculos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Exercícios terapêuticos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Fortalecimento e alongamento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações posturais
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prevenção de lesões e melhor ergonomia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Fisioterapia geriátrica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Cuidado especial para idosos
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
                    <strong className="text-neutral-800">Luana</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Fisioterapeuta
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com dores crônicas (coluna, joelhos, ombros)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes em recuperação pós-cirúrgica ou pós-trauma
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Idosos com dificuldades de mobilidade
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com sequelas de AVC ou outras condições neurológicas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com problemas respiratórios que necessitam de
                fisioterapia respiratória
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
                  Consulta Médica e Encaminhamento
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
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
                <strong className="text-neutral-800 text-sm">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-info hover:text-primary-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>{" "}
                  com o encaminhamento médico. Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-info hover:text-primary-700 underline font-semibold"
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
                <strong className="text-neutral-800 text-sm">
                  Avaliação Inicial
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
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
                <strong className="text-neutral-800 text-sm">
                  Comparecimento às Sessões
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Compareça às sessões conforme agendado, seguindo o plano de
                  tratamento estabelecido
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
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatório para iniciar fisioterapia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">Exames</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Se houver (raio-x, ressonância, entre outros)
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Profissionais e Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissionais Responsáveis
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
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Luana<br/>
                    <span className="text-neutral-600 text-xs">Função: Fisioterapeuta</span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    13h00 às 16h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Luana<br/>
                    <span className="text-neutral-600 text-xs">Função: Fisioterapeuta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Manhã
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">07h00 às 11h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Luana</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Fisioterapeuta</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Tarde
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">13h00 às 16h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Luana</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Fisioterapeuta</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
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

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="fisioterapeuta" />
      </div>
    </PageContainer>
  );
}
