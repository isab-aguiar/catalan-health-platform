import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
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

export default function DoresCronicas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Grupo de Dores Crônicas
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Grupo */}
        <InfoBox title="Sobre o Grupo">
          <p className="text-slate-700 leading-relaxed mb-5">
            O Grupo de Dores Crônicas é um espaço de acolhimento e tratamento
            voltado para pessoas que convivem com condições como fibromialgia,
            dores crônicas musculoesqueléticas e outras síndromes dolorosas
            crônicas. O grupo oferece suporte multiprofissional, utilizando
            abordagens integrativas e complementares para o manejo da dor,
            promovendo a melhoria da qualidade de vida e o fortalecimento das
            estratégias de enfrentamento.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Objetivos do Grupo
              </h3>
              <p className="text-sm text-slate-600">
                Promover educação em saúde sobre o manejo da dor crônica,
                desenvolver estratégias de enfrentamento, melhorar a
                funcionalidade e qualidade de vida dos participantes.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Metodologia
              </h3>
              <p className="text-sm text-slate-600">
                Encontros quinzenais com atividades educativas, exercícios
                terapêuticos, técnicas de relaxamento e troca de experiências
                entre os participantes.
              </p>
            </div>
          </div>
        </InfoBox>

        {/* Atividades Desenvolvidas */}
        <InfoBox title="Atividades Desenvolvidas">
          <p className="text-slate-700 mb-4 text-sm">
            Durante os encontros do grupo, são desenvolvidas as seguintes
            atividades:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Técnicas de Manejo da Dor Crônica
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Educação sobre estratégias não farmacológicas para o controle
                  da dor, incluindo técnicas de respiração, relaxamento e
                  distração.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Exercícios Terapêuticos e Alongamentos
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Prática de exercícios físicos adaptados, alongamentos e
                  movimentos terapêuticos orientados para melhoria da
                  funcionalidade e redução da dor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Relaxamento e Mindfulness
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Técnicas de relaxamento muscular progressivo, meditação e
                  mindfulness para redução do estresse e melhoria do bem-estar
                  emocional.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Orientações sobre Qualidade de Vida
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Educação sobre hábitos de vida saudáveis, sono, alimentação e
                  atividades de lazer que contribuem para o manejo da dor
                  crônica.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Apoio Emocional e Troca de Experiências
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Espaço de acolhimento, compartilhamento de vivências e apoio
                  mútuo entre os participantes, fortalecendo a rede de suporte
                  social.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Horários */}
        <InfoBox title="Dias e Horários" variant="highlight">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Dia da Semana
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Local
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Quintas-feiras (quinzenal)
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    08h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Sala de Grupos - UBS São José
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            * Confirme os dias e horários na recepção, pois podem sofrer
            alterações conforme a programação da unidade. Os encontros são
            realizados quinzenalmente.
          </p>
        </InfoBox>

        {/* Como Participar */}
        <InfoBox title="Como Participar">
          <p className="text-slate-700 mb-4 text-sm">
            A participação no Grupo de Dores Crônicas é gratuita e aberta a
            todos os usuários da unidade que convivem com dores crônicas,
            fibromialgia ou outras condições dolorosas persistentes.
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Inscrição na Recepção
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Procure a recepção da unidade para realizar sua inscrição no
                  grupo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Contato com a Equipe de Saúde
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Procure sua equipe de saúde (médico, enfermeiro,
                  fisioterapeuta ou agente comunitário de saúde) para obter mais
                  informações e orientações sobre o grupo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Recomendações para os Encontros
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Traga roupas confortáveis para a prática de exercícios e
                  alongamentos durante os encontros do grupo.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Orientação Importante */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              A participação no grupo não substitui o acompanhamento médico e
              tratamento individualizado. É fundamental manter as consultas
              agendadas e seguir as orientações da equipe de saúde. Os
              exercícios são adaptados conforme a capacidade individual de cada
              participante.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
