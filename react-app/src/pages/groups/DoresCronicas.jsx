import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
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
export default function DoresCronicas() {
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
                Grupo de Dores Crônicas
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
        <InfoBox title="Sobre o Grupo">
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Grupo de Dores Crônicas é um espaço de acolhimento e tratamento
            voltado para pessoas que convivem com condições como fibromialgia,
            dores crônicas musculoesqueléticas e outras síndromes dolorosas
            crônicas. O grupo oferece suporte multiprofissional, utilizando
            abordagens integrativas e complementares para o manejo da dor,
            promovendo a melhoria da qualidade de vida e o fortalecimento das
            estratégias de enfrentamento.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Objetivos do Grupo
              </h3>
              <p className="text-sm text-neutral-600">
                Promover educação em saúde sobre o manejo da dor crônica,
                desenvolver estratégias de enfrentamento, melhorar a
                funcionalidade e qualidade de vida dos participantes.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Metodologia
              </h3>
              <p className="text-sm text-neutral-600">
                Encontros quinzenais com atividades educativas, exercícios
                terapêuticos, técnicas de relaxamento e troca de experiências
                entre os participantes.
              </p>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Atividades Desenvolvidas">
          <p className="text-neutral-700 mb-4 text-sm">
            Durante os encontros do grupo, são desenvolvidas as seguintes
            atividades:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Técnicas de Manejo da Dor Crônica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Educação sobre estratégias não farmacológicas para o controle
                  da dor, incluindo técnicas de respiração, relaxamento e
                  distração.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Exercícios Terapêuticos e Alongamentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prática de exercícios físicos adaptados, alongamentos e
                  movimentos terapêuticos orientados para melhoria da
                  funcionalidade e redução da dor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Relaxamento e Mindfulness
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Técnicas de relaxamento muscular progressivo, meditação e
                  mindfulness para redução do estresse e melhoria do bem-estar
                  emocional.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre Qualidade de Vida
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Educação sobre hábitos de vida saudáveis, sono, alimentação e
                  atividades de lazer que contribuem para o manejo da dor
                  crônica.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Apoio Emocional e Troca de Experiências
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Espaço de acolhimento, compartilhamento de vivências e apoio
                  mútuo entre os participantes, fortalecendo a rede de suporte
                  social.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Dias e Horários" variant="highlight">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Dia da Semana
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Local
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Quintas-feiras (quinzenal)
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    08h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Sala de Grupos - ESF Catalão
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            * Confirme os dias e horários na recepção, pois podem sofrer
            alterações conforme a programação da unidade. Os encontros são
            realizados quinzenalmente.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Como Participar">
          <p className="text-neutral-700 mb-4 text-sm">
            A participação no Grupo de Dores Crônicas é gratuita e aberta a
            todos os usuários da unidade que convivem com dores crônicas,
            fibromialgia ou outras condições dolorosas persistentes.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Inscrição na Recepção
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procure a recepção da unidade para realizar sua inscrição no
                  grupo.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Contato com a Equipe de Saúde
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procure sua equipe de saúde (médico, enfermeiro,
                  fisioterapeuta ou agente comunitário de saúde) para obter mais
                  informações e orientações sobre o grupo.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Recomendações para os Encontros
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Traga roupas confortáveis para a prática de exercícios e
                  alongamentos durante os encontros do grupo.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
              A participação no grupo não substitui o acompanhamento médico e
              tratamento individualizado. É fundamental manter as consultas
              agendadas e seguir as orientações da equipe de saúde. Os
              exercícios são adaptados conforme a capacidade individual de cada
              participante.
            </p>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <RecommendedReadingCarousel pageId="dores-cronicas" />
    </PageContainer>
  );
}
