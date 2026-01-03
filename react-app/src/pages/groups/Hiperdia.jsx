import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
import {
  BackButton,
  RecommendedReadingCarousel,
  Alert,
  InfoBox,
} from "../../components/common";
import { PageContainer } from "../../components/layout";
export default function Hiperdia() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Grupo de Diabetes e Hipertensão
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
              O Grupo Hiperdia é um espaço de acolhimento, educação em saúde e
              acompanhamento voltado para pessoas que convivem com diabetes
              mellitus e/ou hipertensão arterial sistêmica. O grupo oferece
              suporte multiprofissional para o manejo adequado dessas condições
              crônicas, promovendo a adesão ao tratamento, a adoção de hábitos
              de vida saudáveis e a melhoria da qualidade de vida dos
              participantes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Objetivos do Grupo
                </h3>
                <p className="text-sm text-neutral-600">
                  Promover educação em saúde, controle glicêmico e pressórico,
                  prevenção de complicações e fortalecimento do vínculo entre
                  usuários e equipe de saúde.
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Metodologia
                </h3>
                <p className="text-sm text-neutral-600">
                  Encontros periódicos com atividades educativas, práticas de
                  exercícios físicos leves, verificação de parâmetros clínicos e
                  troca de experiências entre os participantes.
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
                    Verificação de Pressão Arterial e Glicemia
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Aferição periódica dos parâmetros clínicos para
                    monitoramento e controle das condições de saúde.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Orientações sobre Alimentação Saudável
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Educação nutricional voltada para o controle glicêmico e
                    pressórico, com orientações sobre escolhas alimentares
                    adequadas.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Prática de Atividades Físicas Leves
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Exercícios físicos adaptados e orientados para promoção da
                    saúde cardiovascular e controle metabólico.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Educação em Saúde sobre o Manejo das Doenças
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Informações sobre diabetes e hipertensão, uso correto de
                    medicamentos, reconhecimento de sinais de alerta e prevenção
                    de complicações.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Troca de Experiências entre os Participantes
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Espaço de acolhimento e compartilhamento de vivências,
                    fortalecendo o apoio mútuo e a adesão ao tratamento.
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
                    <strong className="text-neutral-800">Quartas-feiras</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h30
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
                    Quartas-feiras
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">
                    Horário
                  </span>
                  <p className="text-sm text-neutral-900">07h30</p>
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
            alterações conforme a programação da unidade.
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
              A participação no Grupo Hiperdia é gratuita e aberta a todos os
              usuários da unidade que possuem diagnóstico de diabetes mellitus
              e/ou hipertensão arterial sistêmica.
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
                    Procure sua equipe de saúde (médico, enfermeiro ou agente
                    comunitário de saúde) para obter mais informações e
                    orientações sobre o grupo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-4 sm:p-5 shadow-md mb-6">
          <p className="font-semibold mb-2 text-base">Orientação Importante</p>
          <p className="text-sm text-white/90 leading-relaxed">
            A participação no grupo não substitui o acompanhamento médico
            regular. É fundamental manter as consultas agendadas e seguir as
            orientações da equipe de saúde.
          </p>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="hiperdia" />
      </div>
    </PageContainer>
  );
}
