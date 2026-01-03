import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
export default function DoresCronicas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Grupo de Dores Crônicas
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Grupo
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
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
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Atividades Desenvolvidas
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Educação sobre estratégias não farmacológicas para o
                    controle da dor, incluindo técnicas de respiração,
                    relaxamento e distração.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Exercícios Terapêuticos e Alongamentos
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Educação sobre hábitos de vida saudáveis, sono, alimentação
                    e atividades de lazer que contribuem para o manejo da dor
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Espaço de acolhimento, compartilhamento de vivências e apoio
                    mútuo entre os participantes, fortalecendo a rede de suporte
                    social.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Dias e Horários
          </h2>

          <div className="hidden md:block overflow-x-auto">
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

          <div className="md:hidden space-y-3">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Dia da Semana
                  </span>
                  <p className="text-sm font-semibold text-neutral-900">
                    Quintas-feiras (quinzenal)
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Horário
                  </span>
                  <p className="text-sm text-neutral-900">08h00</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Local
                  </span>
                  <p className="text-sm text-neutral-900">
                    Sala de Grupos - ESF Catalão
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3">
            * Confirme os dias e horários na recepção, pois podem sofrer
            alterações conforme a programação da unidade. Os encontros são
            realizados quinzenalmente.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Como Participar
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
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
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Procure sua equipe de saúde (médico, enfermeiro,
                    fisioterapeuta ou agente comunitário de saúde) para obter
                    mais informações e orientações sobre o grupo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Recomendações para os Encontros
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Traga roupas confortáveis para a prática de exercícios e
                    alongamentos durante os encontros do grupo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-4 sm:p-5 shadow-md mb-6">
          <p className="font-semibold mb-2 text-base">Orientação Importante</p>
          <p className="text-sm text-white/90 leading-relaxed">
            A participação no grupo não substitui o acompanhamento médico e
            tratamento individualizado. É fundamental manter as consultas
            agendadas e seguir as orientações da equipe de saúde. Os exercícios
            são adaptados conforme a capacidade individual de cada participante.
          </p>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="dores-cronicas" />
      </div>
    </PageContainer>
  );
}
