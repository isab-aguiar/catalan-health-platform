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
export default function Tabagismo() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-3xl font-bold text-slate-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Grupo de Tabagismo
              </h1>
              <p
                className="text-slate-500 text-xs mt-1"
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
          <p className="text-slate-700 leading-relaxed mb-5">
            O Grupo de Tabagismo é um programa de apoio e tratamento para
            pessoas que desejam parar de fumar. O grupo oferece acompanhamento
            multiprofissional, utilizando estratégias baseadas em evidências
            científicas para auxiliar os participantes no processo de cessação
            do tabagismo. O programa visa promover a saúde, prevenir doenças
            relacionadas ao tabaco e melhorar a qualidade de vida dos
            participantes.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Objetivos do Programa
              </h3>
              <p className="text-sm text-slate-600">
                Auxiliar na cessação do tabagismo, prevenir recaídas, promover
                educação em saúde sobre os malefícios do tabaco e fortalecer
                estratégias de enfrentamento.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Metodologia
              </h3>
              <p className="text-sm text-slate-600">
                Encontros em grupo com abordagem cognitivo-comportamental,
                suporte farmacológico quando indicado, e acompanhamento
                individualizado conforme necessidade.
              </p>
            </div>
          </div>
        </InfoBox>
        {}
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
                  Avaliação e Classificação do Grau de Dependência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Identificação do nível de dependência nicotínica e elaboração
                  de plano de tratamento individualizado.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Educação em Saúde sobre os Malefícios do Tabaco
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Informações sobre doenças relacionadas ao tabagismo,
                  benefícios da cessação e estratégias de enfrentamento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Técnicas Cognitivo-Comportamentais
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Desenvolvimento de habilidades para lidar com situações de
                  risco, gerenciamento de ansiedade e prevenção de recaídas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Suporte Farmacológico
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Quando indicado, prescrição e acompanhamento do uso de
                  medicamentos para auxiliar na cessação do tabagismo, conforme
                  protocolos estabelecidos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Acompanhamento e Apoio Contínuo
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Monitoramento do processo de cessação, identificação de
                  dificuldades e fortalecimento de estratégias de enfrentamento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Troca de Experiências
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Espaço de acolhimento e compartilhamento de vivências entre os
                  participantes, promovendo apoio mútuo e motivação.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
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
                    <strong className="text-slate-800">A definir</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    A definir
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Sala de Grupos - ESF Catalão
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            * Confirme os dias e horários na recepção ou com sua equipe de
            saúde, pois podem sofrer alterações conforme a programação da
            unidade.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Como Participar">
          <p className="text-slate-700 mb-4 text-sm">
            A participação no Grupo de Tabagismo é gratuita e aberta a todos os
            usuários da unidade que desejam parar de fumar, independentemente do
            tempo de tabagismo ou quantidade de cigarros consumidos.
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
                  grupo e obter informações sobre os próximos encontros.
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
                  Procure sua equipe de saúde (médico, enfermeiro ou agente
                  comunitário de saúde) para obter mais informações sobre o
                  programa e orientações iniciais.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Benefícios da Cessação do Tabagismo">
          <p className="text-slate-700 mb-4 text-sm">
            Parar de fumar traz benefícios imediatos e a longo prazo para a
            saúde:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Benefícios Imediatos
              </h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Melhora da circulação sanguínea</li>
                <li>• Redução da frequência cardíaca e pressão arterial</li>
                <li>• Melhora do olfato e paladar</li>
                <li>• Redução da tosse e falta de ar</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Benefícios a Longo Prazo
              </h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Redução do risco de doenças cardiovasculares</li>
                <li>• Redução do risco de câncer de pulmão e outros tipos</li>
                <li>• Melhora da função pulmonar</li>
                <li>• Aumento da expectativa de vida</li>
              </ul>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              O processo de cessação do tabagismo pode apresentar desafios e
              sintomas de abstinência. É fundamental manter a participação nos
              encontros do grupo e seguir as orientações da equipe de saúde. Em
              caso de recaída, não desista - procure novamente a equipe para
              retomar o tratamento.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
