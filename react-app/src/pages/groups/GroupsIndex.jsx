import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import InfoBox from "../../components/common/InfoBox";
import Alert from "../../components/common/Alert";
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
import BackButton from "../../components/common/BackButton";
export default function GroupsIndex() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-6 flex items-center gap-3">
          <Users size={32} className="sm:w-10 sm:h-10" />
          Grupos de Atividade Coletiva e Atividades Coletivas
        </h1>
        <Alert type="info">
          <div className="flex items-start gap-3">
            <Heart size={20} className="text-info flex-shrink-0 mt-0.5" />
            <div>
              <strong>Bem-vindo aos nossos grupos!</strong>
              <br />
              Os Grupos de Atividade Coletiva são espaços de acolhimento, troca
              de experiências e aprendizado coletivo. Aqui você encontra pessoas
              que compartilham situações semelhantes e profissionais de saúde
              comprometidos com seu bem-estar.
            </div>
          </div>
        </Alert>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mt-8 mb-4">
          Nossos Grupos
        </h2>
        {}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
              <Pill size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">
              Grupo de Diabetes e Hipertensão (Hiperdia)
            </h3>
          </div>
          <InfoBox title="Como funciona" icon={<ClipboardList size={24} />}>
            <p className="text-neutral-700 leading-relaxed mb-4">
              O Hiperdia é um grupo voltado para pessoas que convivem com
              diabetes e/ou hipertensão arterial. Nossos encontros incluem:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Verificação de pressão arterial e glicemia
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Orientações sobre alimentação saudável
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Prática de atividades físicas leves
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Educação em saúde sobre o manejo das doenças
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Troca de experiências entre os participantes
                </div>
              </li>
            </ul>
          </InfoBox>
          <InfoBox
            title="Dias e Horários"
            icon={<Calendar size={24} />}
            highlight={true}
          >
            {/* Versão Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Dia
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Horário
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Local
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3">
                      <strong>Quartas-feiras</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3">
                      07:30
                    </td>
                    <td className="border border-neutral-300 px-4 py-3">
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
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Dia</span>
                    <p className="text-sm font-semibold text-neutral-900">Quartas-feiras</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Horário</span>
                    <p className="text-sm text-neutral-900">07:30</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Local</span>
                    <p className="text-sm text-neutral-900">Sala de Grupos - ESF Catalão</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-neutral-600 italic text-sm">
              * Confirme os dias e horários na recepção, pois podem sofrer
              alterações.
            </p>
          </InfoBox>
          <Alert type="success">
            <div className="flex items-start gap-3">
              <Users
                size={20}
                className="text-success flex-shrink-0 mt-0.5"
              />
              <div>
                <strong>Como participar:</strong> Procure sua equipe de saúde ou
                passe na recepção para se inscrever. A participação é gratuita e
                aberta a todos os usuários da unidade.
              </div>
            </div>
          </Alert>
          <div className="mt-4">
            <Link
              to="/grupos/hiperdia"
              className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Saiba mais sobre o Grupo Hiperdia
            </Link>
          </div>
        </div>
        {}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
              <Dumbbell size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">
              Grupo de Fibromialgia
            </h3>
          </div>
          <InfoBox title="Como funciona" icon={<ClipboardList size={24} />}>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Espaço de acolhimento para pessoas que convivem com fibromialgia.
              Nossos encontros incluem:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Técnicas de manejo da dor crônica
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Exercícios terapêuticos e alongamentos
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Relaxamento e mindfulness
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Orientações sobre qualidade de vida
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-success font-bold text-xl">✓</span>
                <div className="text-neutral-700">
                  Apoio emocional e troca de experiências
                </div>
              </li>
            </ul>
          </InfoBox>
          <InfoBox
            title="Dias e Horários"
            icon={<Calendar size={24} />}
            highlight={true}
          >
            {/* Versão Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Dia
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Horário
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">
                      Local
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3">
                      <strong>Quintas-feiras (quinzenal)</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3">
                      08:00
                    </td>
                    <td className="border border-neutral-300 px-4 py-3">
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
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Dia</span>
                    <p className="text-sm font-semibold text-neutral-900">Quintas-feiras (quinzenal)</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Horário</span>
                    <p className="text-sm text-neutral-900">08:00</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase">Local</span>
                    <p className="text-sm text-neutral-900">Sala de Grupos - ESF Catalão</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-neutral-600 italic text-sm">
              * Confirme os dias e horários na recepção, pois podem sofrer
              alterações.
            </p>
          </InfoBox>
          <Alert type="success">
            <div className="flex items-start gap-3">
              <Users
                size={20}
                className="text-success flex-shrink-0 mt-0.5"
              />
              <div>
                <strong>Como participar:</strong> Procure sua equipe de saúde ou
                passe na recepção para se inscrever. Traga roupas confortáveis
                para os exercícios.
              </div>
            </div>
          </Alert>
          <div className="mt-4">
            <Link
              to="/grupos/dores-cronicas"
              className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Saiba mais sobre o Grupo de Dores Crônicas
            </Link>
          </div>
        </div>
        {}
        <InfoBox
          title="Outros Grupos em Planejamento"
          icon={<Rocket size={24} />}
          highlight={true}
        >
          <p className="text-neutral-700 mb-6">
            Estamos trabalhando para ampliar nossas atividades coletivas. Em
            breve, teremos:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2">
                <Baby size={18} /> Grupo de Gestantes
              </h4>
              <p className="text-neutral-600 text-sm mb-2">
                Preparação para o parto, aleitamento materno e cuidados com o
                bebê.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2">
                <Brain size={18} /> Grupo de Saúde Mental
              </h4>
              <p className="text-neutral-600 text-sm mb-2">
                Acolhimento e apoio para pessoas com ansiedade, depressão e
                outros transtornos.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2">
                <UserPlus size={18} /> Grupo de Idosos
              </h4>
              <p className="text-neutral-600 text-sm mb-2">
                Atividades físicas, sociais e de promoção do envelhecimento
                saudável.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2">
                <Scale size={18} /> Grupo de Obesidade
              </h4>
              <p className="text-neutral-600 text-sm mb-2">
                Educação nutricional, atividade física e apoio para perda de
                peso saudável.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-secondary-600">
              <h4 className="text-primary-600 font-bold mb-2 flex items-center gap-2">
                <Palette size={18} /> Grupo de Artesanato
              </h4>
              <p className="text-neutral-600 text-sm mb-2">
                Atividades manuais para promover socialização e bem-estar.
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Em breve
              </span>
            </div>
          </div>
        </InfoBox>
        <Alert type="info">
          <div className="flex items-start gap-3">
            <Lightbulb
              size={20}
              className="text-info flex-shrink-0 mt-0.5"
            />
            <div>
              <strong>Tem interesse em algum grupo específico?</strong>
              <br />
              Fale com sua equipe de saúde ou deixe sua sugestão na recepção. A
              participação da comunidade é essencial para planejarmos as
              atividades!
            </div>
          </div>
        </Alert>
        {}
        <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mt-8 mb-4 flex items-center gap-2">
          <Sparkles size={32} />
          Benefícios de Participar
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={32} className="text-primary-600" />
            </div>
            <h4 className="text-primary-600 font-bold mb-2">Apoio Social</h4>
            <p className="text-neutral-600 text-sm">
              Conhecer pessoas que vivem situações semelhantes
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardList size={32} className="text-primary-600" />
            </div>
            <h4 className="text-primary-600 font-bold mb-2">Aprendizado</h4>
            <p className="text-neutral-600 text-sm">
              Informações sobre sua condição de saúde
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity size={32} className="text-primary-600" />
            </div>
            <h4 className="text-primary-600 font-bold mb-2">Motivação</h4>
            <p className="text-neutral-600 text-sm">
              Incentivo para seguir o tratamento
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart size={32} className="text-primary-600" />
            </div>
            <h4 className="text-primary-600 font-bold mb-2">Bem-estar</h4>
            <p className="text-neutral-600 text-sm">
              Melhora da qualidade de vida
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
