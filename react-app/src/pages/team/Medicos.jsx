import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
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
export default function Medicos() {
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
                Atendimento Médico
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
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
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
                <strong className="text-slate-800 text-sm">
                  Consultas de rotina
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Acompanhamento de saúde geral
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Atendimentos de urgência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Para casos agudos (ver semáforo da saúde)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Tratamento de doenças
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Diagnóstico e prescrição de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Acompanhamento de crônicos
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Hipertensão, diabetes, entre outras condições
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Solicitação de exames
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Quando necessário para diagnóstico
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Encaminhamentos para especialistas
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Quando o caso exige atendimento especializado
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Quem são os médicos?">
          <p className="text-slate-700 mb-4 text-sm">
            A ESF Catalão conta com médicos de família em cada equipe. Cada
            médico é responsável por uma área específica (ESF - Estratégia Saúde
            da Família):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Médico
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Equipe (ESF)
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dr. João</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    ESF São José
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dr. Frederico</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    ESF Catalão
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dr. Gustavo</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    ESF Bela Vista
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic">
            * Cada médico atende sua área de abrangência. Use a{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 underline font-semibold"
            >
              busca territorial na página inicial
            </Link>{" "}
            para descobrir qual é o seu médico.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded">
              <h4 className="text-blue-700 font-bold mb-2 text-sm">
                Atendimento Agendado
              </h4>
              <p className="text-slate-700 leading-relaxed mb-2 text-sm">
                Consultas marcadas com antecedência para acompanhamento de
                rotina, renovação de receitas, solicitação de exames, entre
                outros.
              </p>
              <p className="text-slate-900 text-sm">
                <strong>Como acessar:</strong> Dirija-se à{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-blue-600 hover:text-blue-700 underline font-semibold"
                >
                  Sala de Agendamentos
                </Link>
                . Veja a{" "}
                <Link
                  to="/servicos/sala-4#documentacao-necessaria"
                  className="text-blue-600 hover:text-blue-700 underline font-semibold"
                >
                  documentação necessária para agendar
                </Link>
                .
              </p>
            </div>
            <div className="bg-slate-50 border-l-4 border-amber-600 p-4 rounded">
              <h4 className="text-amber-700 font-bold mb-2 text-sm">
                Atendimento Espontâneo (Triagem)
              </h4>
              <p className="text-slate-700 leading-relaxed mb-2 text-sm">
                Para casos agudos que necessitam de atendimento no dia (febre,
                dor, mal-estar). Atendimento por ordem de chegada com prioridade
                para casos mais graves.
              </p>
              <p className="text-slate-900 text-sm">
                <strong>Horário:</strong> 07h00 às 08h00 (Triagem)
              </p>
            </div>
            <div className="bg-slate-50 border-l-4 border-slate-600 p-4 rounded">
              <h4 className="text-slate-700 font-bold mb-2 text-sm">
                Saúde na Hora (Plantão Noturno)
              </h4>
              <p className="text-slate-700 leading-relaxed mb-2 text-sm">
                Atendimento médico estendido no período noturno para casos que
                não podem esperar até o dia seguinte, mas não são emergências
                que exigem SAMU/hospital.
              </p>
              <p className="text-slate-900 text-sm">
                <strong>Horário:</strong> 17h00 às 22h00 (Segunda a Sexta)
              </p>
              <p className="text-slate-600 text-xs mt-2 italic">
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
                <strong className="text-slate-800 text-sm">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  . Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
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
                <strong className="text-slate-800 text-sm">
                  Identificação da Equipe de Referência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
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
                <strong className="text-slate-800 text-sm">
                  Atendimento mediante Triagem
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Disponível mediante triagem clínica inicial em dois períodos:
                  manhã (07h00 às 08h00) e noite - Saúde na Hora (17h30 às
                  18h30). O atendimento será realizado conforme disponibilidade
                  de agenda e necessidade clínica identificada na triagem.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Comparecimento à Consulta
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
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
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Comprovante de Residência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Atualizado (máximo 3 meses)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Exames e receitas anteriores
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">Se houver</p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-blue-50">
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
    </PageContainer>
  );
}
