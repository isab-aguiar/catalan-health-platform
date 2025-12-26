import { Calendar, Clock, AlertCircle, Users } from "lucide-react";
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
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-neutral-200">
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
export default function Hiperdia() {
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
                Grupo de Diabetes e Hipertensão
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
            O Grupo Hiperdia é um espaço de acolhimento, educação em saúde e
            acompanhamento voltado para pessoas que convivem com diabetes
            mellitus e/ou hipertensão arterial sistêmica. O grupo oferece
            suporte multiprofissional para o manejo adequado dessas condições
            crônicas, promovendo a adesão ao tratamento, a adoção de hábitos de
            vida saudáveis e a melhoria da qualidade de vida dos participantes.
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
                  Verificação de Pressão Arterial e Glicemia
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Aferição periódica dos parâmetros clínicos para monitoramento
                  e controle das condições de saúde.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre Alimentação Saudável
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
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
                <p className="text-xs text-neutral-600 mt-0.5">
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
                <p className="text-xs text-neutral-600 mt-0.5">
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
                <p className="text-xs text-neutral-600 mt-0.5">
                  Espaço de acolhimento e compartilhamento de vivências,
                  fortalecendo o apoio mútuo e a adesão ao tratamento.
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
          <p className="text-xs text-neutral-500 mt-3">
            * Confirme os dias e horários na recepção, pois podem sofrer
            alterações conforme a programação da unidade.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Como Participar">
          <p className="text-neutral-700 mb-4 text-sm">
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
                  Procure sua equipe de saúde (médico, enfermeiro ou agente
                  comunitário de saúde) para obter mais informações e
                  orientações sobre o grupo.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              A participação no grupo não substitui o acompanhamento médico
              regular. É fundamental manter as consultas agendadas e seguir as
              orientações da equipe de saúde.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
