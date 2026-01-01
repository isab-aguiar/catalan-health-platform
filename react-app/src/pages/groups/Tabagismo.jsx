import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import { PageContainer } from "../../components/layout";
export default function Tabagismo() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Grupo de Tabagismo
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>
        {/* Sobre o Grupo */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Grupo
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
              O Grupo de Tabagismo é um programa de apoio e tratamento para
              pessoas que desejam parar de fumar. O grupo oferece acompanhamento
              multiprofissional, utilizando estratégias baseadas em evidências
              científicas para auxiliar os participantes no processo de cessação
              do tabagismo. O programa visa promover a saúde, prevenir doenças
              relacionadas ao tabaco e melhorar a qualidade de vida dos
              participantes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Objetivos do Programa
                </h3>
                <p className="text-sm text-neutral-600">
                  Auxiliar na cessação do tabagismo, prevenir recaídas, promover
                  educação em saúde sobre os malefícios do tabaco e fortalecer
                  estratégias de enfrentamento.
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Metodologia
                </h3>
                <p className="text-sm text-neutral-600">
                  Encontros em grupo com abordagem cognitivo-comportamental,
                  suporte farmacológico quando indicado, e acompanhamento
                  individualizado conforme necessidade.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Atividades Desenvolvidas */}
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
                    Avaliação e Classificação do Grau de Dependência
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Identificação do nível de dependência nicotínica e elaboração
                    de plano de tratamento individualizado.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Educação em Saúde sobre os Malefícios do Tabaco
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Informações sobre doenças relacionadas ao tabagismo,
                    benefícios da cessação e estratégias de enfrentamento.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Técnicas Cognitivo-Comportamentais
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Desenvolvimento de habilidades para lidar com situações de
                    risco, gerenciamento de ansiedade e prevenção de recaídas.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Suporte Farmacológico
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Quando indicado, prescrição e acompanhamento do uso de
                    medicamentos para auxiliar na cessação do tabagismo, conforme
                    protocolos estabelecidos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Acompanhamento e Apoio Contínuo
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Monitoramento do processo de cessação, identificação de
                    dificuldades e fortalecimento de estratégias de enfrentamento.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Troca de Experiências
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Espaço de acolhimento e compartilhamento de vivências entre os
                    participantes, promovendo apoio mútuo e motivação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dias e Horários */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Dias e Horários
          </h2>

          {/* Versão Desktop */}
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
                    <strong className="text-neutral-800">A definir</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    A definir
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Sala de Grupos - ESF Catalão
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-3">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Dia da Semana</span>
                  <p className="text-sm font-semibold text-neutral-900">A definir</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Horário</span>
                  <p className="text-sm text-neutral-900">A definir</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Local</span>
                  <p className="text-sm text-neutral-900">Sala de Grupos - ESF Catalão</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3">
            * Confirme os dias e horários na recepção ou com sua equipe de
            saúde, pois podem sofrer alterações conforme a programação da
            unidade.
          </p>
        </div>
        {/* Como Participar */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Como Participar
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              A participação no Grupo de Tabagismo é gratuita e aberta a todos os
              usuários da unidade que desejam parar de fumar, independentemente do
              tempo de tabagismo ou quantidade de cigarros consumidos.
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
                    grupo e obter informações sobre os próximos encontros.
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
                    comunitário de saúde) para obter mais informações sobre o
                    programa e orientações iniciais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefícios da Cessação do Tabagismo */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Benefícios da Cessação do Tabagismo
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              Parar de fumar traz benefícios imediatos e a longo prazo para a
              saúde:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Benefícios Imediatos
                </h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Melhora da circulação sanguínea</li>
                  <li>• Redução da frequência cardíaca e pressão arterial</li>
                  <li>• Melhora do olfato e paladar</li>
                  <li>• Redução da tosse e falta de ar</li>
                </ul>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                  Benefícios a Longo Prazo
                </h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Redução do risco de doenças cardiovasculares</li>
                  <li>• Redução do risco de câncer de pulmão e outros tipos</li>
                  <li>• Melhora da função pulmonar</li>
                  <li>• Aumento da expectativa de vida</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-4 sm:p-5 shadow-md mb-6">
          <p className="font-semibold mb-2 text-base">Orientação Importante</p>
          <p className="text-sm text-white/90 leading-relaxed">
            O processo de cessação do tabagismo pode apresentar desafios e
            sintomas de abstinência. É fundamental manter a participação nos
            encontros do grupo e seguir as orientações da equipe de saúde. Em
            caso de recaída, não desista - procure novamente a equipe para
            retomar o tratamento.
          </p>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="tabagismo" />
      </div>
    </PageContainer>
  );
}
