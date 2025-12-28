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
export default function Medicos() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-neutral-900 whitespace-normal md:whitespace-nowrap"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Consultório Médico
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
            O atendimento médico na ESF Catalão é realizado pelos médicos de
            família e comunidade, profissionais capacitados para cuidar de toda
            a família, em todas as fases da vida. Eles realizam consultas de
            rotina, atendimentos de urgência, diagnóstico e tratamento de
            doenças comuns, acompanhamento de doenças crônicas e encaminhamentos
            quando necessário.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas de rotina
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento de saúde geral
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atendimentos de urgência
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Para casos agudos (ver semáforo da saúde)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Tratamento de doenças
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Diagnóstico e prescrição de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento de crônicos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Hipertensão, diabetes, entre outras condições
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Solicitação de exames
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Quando necessário para diagnóstico
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Encaminhamentos para especialistas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Quando o caso exige atendimento especializado
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Quem são os médicos?">
          <p className="text-neutral-700 mb-4 text-sm">
            A ESF Catalão conta com médicos de família em cada equipe. Cada
            médico é responsável por uma área específica (ESF - Estratégia Saúde
            da Família):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Médico
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Equipe (ESF)
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Dr. João</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF São José
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Dr. Frederico</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF Catalão
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Dr. Gustavo</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF Bela Vista
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 italic">
            * Cada médico atende sua área de abrangência. Use a{" "}
            <Link
              to="/"
              className="text-info hover:text-primary-700 underline font-semibold"
            >
              busca territorial na página inicial
            </Link>{" "}
            para descobrir qual é o seu médico.
          </p>
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
                    Dr. João (ESF São José)<br/>
                    Dr. Frederico (ESF Catalão)<br/>
                    Dr. Gustavo (ESF Bela Vista)<br/>
                    <span className="text-neutral-600 text-xs block mt-2">Função: Médicos de Família</span>
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
                    Dr. João (ESF São José)<br/>
                    Dr. Frederico (ESF Catalão)<br/>
                    Dr. Gustavo (ESF Bela Vista)<br/>
                    <span className="text-neutral-600 text-xs block mt-2">Função: Médicos de Família</span>
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
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <p className="text-sm text-neutral-700 pb-1">Dr. João (ESF São José)</p>
                  <p className="text-sm text-neutral-700 pb-1">Dr. Frederico (ESF Catalão)</p>
                  <p className="text-sm text-neutral-700">Dr. Gustavo (ESF Bela Vista)</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Médicos de Família</p>
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
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <p className="text-sm text-neutral-700 pb-1">Dr. João (ESF São José)</p>
                  <p className="text-sm text-neutral-700 pb-1">Dr. Frederico (ESF Catalão)</p>
                  <p className="text-sm text-neutral-700">Dr. Gustavo (ESF Bela Vista)</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Médicos de Família</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-neutral-50 border-l-4 border-info p-4 rounded">
              <h4 className="text-primary-700 font-bold mb-2 text-sm">
                Atendimento Agendado
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Consultas marcadas com antecedência para acompanhamento de
                rotina, renovação de receitas, solicitação de exames, entre
                outros.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Como acessar:</strong> Dirija-se à{" "}
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
                .
              </p>
            </div>
            <div className="bg-neutral-50 border-l-4 border-amber-600 p-4 rounded">
              <h4 className="text-amber-700 font-bold mb-2 text-sm">
                Atendimento Espontâneo (Triagem)
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Para casos agudos que necessitam de atendimento no dia (febre,
                dor, mal-estar). Atendimento por ordem de chegada com prioridade
                para casos mais graves.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Horário:</strong> 07h00 às 08h00 (Triagem)
              </p>
            </div>
            <div className="bg-neutral-50 border-l-4 border-neutral-600 p-4 rounded">
              <h4 className="text-neutral-700 font-bold mb-2 text-sm">
                Saúde na Hora (Plantão Noturno)
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Atendimento médico estendido no período noturno para casos que
                não podem esperar até o dia seguinte, mas não são emergências
                que exigem SAMU/hospital.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Horário:</strong> 17h00 às 22h00 (Segunda a Sexta)
              </p>
              <p className="text-neutral-600 text-xs mt-2 italic">
                Ideal para quem trabalha durante o dia e não consegue vir no
                horário normal
              </p>
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
                  Agendamento na Central de Marcação
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
                  .
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Identificação da Equipe de Referência
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  A consulta será agendada com o médico responsável pela sua
                  área de abrangência (ESF - Estratégia Saúde da Família)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atendimento mediante Triagem
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Disponível mediante triagem clínica inicial em dois períodos:
                  manhã (07h00 às 08h00) e noite - Saúde na Hora (18h00 às
                  19h00). O atendimento será realizado conforme disponibilidade
                  de agenda e necessidade clínica identificada na triagem.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Comparecimento à Consulta
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Apresentar-se no horário agendado com documentação completa e
                  exames complementares, quando disponíveis
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
                <strong>
                  Importante sobre Atendimento por Demanda Espontânea
                </strong>
              </p>
              <p className="mb-2">
                O atendimento por demanda espontânea não garante consulta médica
                imediata. Todos os casos de demanda espontânea passam por uma
                avaliação inicial na triagem de enfermagem, que determina a
                necessidade e prioridade do atendimento.
              </p>
              <p>
                Conforme a avaliação realizada na triagem, o usuário poderá ser
                encaminhado para consulta médica ou para consulta de enfermagem,
                dependendo da necessidade clínica identificada. A triagem é
                essencial para garantir o melhor encaminhamento e otimizar o
                atendimento na unidade.
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
                  Comprovante de Residência
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atualizado (máximo 3 meses)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Exames e receitas anteriores
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">Se houver</p>
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
                Antes de se dirigir à sala de consulta médica, é necessário
                passar pela recepção da unidade para realização da ficha de
                atendimento. Esta medida é essencial para agilizar o processo de
                atendimento e garantir a organização adequada do fluxo de
                pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="medicos" />
      </div>
    </PageContainer>
  );
}
