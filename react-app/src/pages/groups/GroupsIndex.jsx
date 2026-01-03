import { Link } from "react-router-dom";
import { PageContainer } from "../../components/layout";
import { InfoBox, Alert, BackButton } from "../../components/common";
import {
  Users,
  Stethoscope,
  Pill,
  ClipboardList,
  Calendar,
  Lightbulb,
  Rocket,
  Heart,
  Activity,
  Dumbbell,
  Baby,
  Scale,
  Palette,
  Cigarette,
  Brain,
  UserPlus,
  Sparkles,
} from "lucide-react";
export default function GroupsIndex() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton />

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3">
            <Users
              size={32}
              className="sm:w-10 sm:h-10 text-white flex-shrink-0"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Grupos de Atividade Coletiva e Atividades Coletivas
            </h1>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-base">
                Bem-vindo aos nossos grupos!
              </h3>
              <p className="text-neutral-800 text-sm leading-relaxed">
                Os Grupos de Atividade Coletiva são espaços de acolhimento,
                troca de experiências e aprendizado coletivo. Aqui você encontra
                pessoas que compartilham situações semelhantes e profissionais
                de saúde comprometidos com seu bem-estar.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-8 mb-4">
          Nossos Grupos
        </h2>
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Pill size={24} className="sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Grupo de Diabetes e Hipertensão (Hiperdia)
              </h3>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={20} className="text-blue-600" />
                <h4 className="font-semibold text-neutral-900 text-base">
                  Como funciona
                </h4>
              </div>
              <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
                O Hiperdia é um grupo voltado para pessoas que convivem com
                diabetes e/ou hipertensão arterial. Nossos encontros incluem:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Verificação de pressão arterial e glicemia
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Orientações sobre alimentação saudável
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Prática de atividades físicas leves
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Educação em saúde sobre o manejo das doenças
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Troca de experiências entre os participantes
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} className="text-blue-900" />
                <h4 className="font-bold text-blue-900 text-base">
                  Dias e Horários
                </h4>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Dia
                      </th>
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Horário
                      </th>
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Local
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
                        <strong>Quartas-feiras</strong>
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
                        07:30
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
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
                        Dia
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">
                        Quartas-feiras
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-500 uppercase">
                        Horário
                      </span>
                      <p className="text-sm text-neutral-900">07:30</p>
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
              <p className="mt-3 text-neutral-600 italic text-xs">
                * Confirme os dias e horários na recepção, pois podem sofrer
                alterações.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 shadow-sm border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    <strong className="text-green-900">Como participar:</strong>{" "}
                    Procure sua equipe de saúde ou passe na recepção para se
                    inscrever. A participação é gratuita e aberta a todos os
                    usuários da unidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/grupos/hiperdia"
                className="inline-block px-4 sm:px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm"
              >
                Saiba mais sobre o Grupo Hiperdia
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Dumbbell size={24} className="sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Grupo de Fibromialgia
              </h3>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={20} className="text-blue-600" />
                <h4 className="font-semibold text-neutral-900 text-base">
                  Como funciona
                </h4>
              </div>
              <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
                Espaço de acolhimento para pessoas que convivem com
                fibromialgia. Nossos encontros incluem:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Técnicas de manejo da dor crônica
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Exercícios terapêuticos e alongamentos
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Relaxamento e mindfulness
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Orientações sobre qualidade de vida
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-neutral-700 text-sm">
                    Apoio emocional e troca de experiências
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} className="text-blue-900" />
                <h4 className="font-bold text-blue-900 text-base">
                  Dias e Horários
                </h4>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Dia
                      </th>
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Horário
                      </th>
                      <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-sm">
                        Local
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
                        <strong>Quintas-feiras (quinzenal)</strong>
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
                        08:00
                      </td>
                      <td className="border border-neutral-300 px-4 py-3 text-sm">
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
                        Dia
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">
                        Quintas-feiras (quinzenal)
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-500 uppercase">
                        Horário
                      </span>
                      <p className="text-sm text-neutral-900">08:00</p>
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

              <p className="mt-3 text-neutral-600 italic text-xs">
                * Confirme os dias e horários na recepção, pois podem sofrer
                alterações.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 shadow-sm border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    <strong className="text-green-900">Como participar:</strong>{" "}
                    Procure sua equipe de saúde ou passe na recepção para se
                    inscrever. Traga roupas confortáveis para os exercícios.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/grupos/dores-cronicas"
                className="inline-block px-4 sm:px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm"
              >
                Saiba mais sobre o Grupo de Dores Crônicas
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={24} className="text-blue-900" />
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
              Outros Grupos em Planejamento
            </h2>
          </div>
          <p className="text-neutral-700 mb-6 text-sm">
            Estamos trabalhando para ampliar nossas atividades coletivas. Em
            breve, teremos:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600 shadow-sm">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2 text-sm">
                <Baby size={18} /> Grupo de Gestantes
              </h4>
              <p className="text-neutral-600 text-sm mb-2 leading-relaxed">
                Preparação para o parto, aleitamento materno e cuidados com o
                bebê.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600 shadow-sm">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2 text-sm">
                <Brain size={18} /> Grupo de Saúde Mental
              </h4>
              <p className="text-neutral-600 text-sm mb-2 leading-relaxed">
                Acolhimento e apoio para pessoas com ansiedade, depressão e
                outros transtornos.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600 shadow-sm">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2 text-sm">
                <UserPlus size={18} /> Grupo de Idosos
              </h4>
              <p className="text-neutral-600 text-sm mb-2 leading-relaxed">
                Atividades físicas, sociais e de promoção do envelhecimento
                saudável.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600 shadow-sm">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2 text-sm">
                <Scale size={18} /> Grupo de Obesidade
              </h4>
              <p className="text-neutral-600 text-sm mb-2 leading-relaxed">
                Educação nutricional, atividade física e apoio para perda de
                peso saudável.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600 shadow-sm">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2 text-sm">
                <Palette size={18} /> Grupo de Artesanato
              </h4>
              <p className="text-neutral-600 text-sm mb-2 leading-relaxed">
                Atividades manuais para promover socialização e bem-estar.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 shadow-sm border border-green-200 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-2 text-base">
                Tem interesse em algum grupo específico?
              </h3>
              <p className="text-neutral-800 text-sm leading-relaxed">
                Fale com sua equipe de saúde ou deixe sua sugestão na recepção.
                A participação da comunidade é essencial para planejarmos as
                atividades!
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={28} className="text-primary-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Benefícios de Participar
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users size={28} className="sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <h4 className="text-primary-600 font-bold mb-2 text-sm sm:text-base">
                Apoio Social
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Conhecer pessoas que vivem situações semelhantes
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClipboardList
                  size={28}
                  className="sm:w-8 sm:h-8 text-primary-600"
                />
              </div>
              <h4 className="text-primary-600 font-bold mb-2 text-sm sm:text-base">
                Aprendizado
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Informações sobre sua condição de saúde
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity
                  size={28}
                  className="sm:w-8 sm:h-8 text-primary-600"
                />
              </div>
              <h4 className="text-primary-600 font-bold mb-2 text-sm sm:text-base">
                Motivação
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Incentivo para seguir o tratamento
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart size={28} className="sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <h4 className="text-primary-600 font-bold mb-2 text-sm sm:text-base">
                Bem-estar
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Melhora da qualidade de vida
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
