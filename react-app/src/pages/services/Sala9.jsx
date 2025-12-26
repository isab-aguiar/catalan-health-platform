import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
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
  const style = types[type] || types.info;
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
export default function Sala9() {
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
                Sala de atendimento administrativo
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
        <CampanhasPaginaWrapper pagina="sala-9" />
        {}
        <AvisosPaginaWrapper pagina="sala-9" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 mb-4 text-sm">
            Este setor é responsável por:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consulta de Posição na Fila do SUS
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Verificação da posição na fila para consultas especializadas e
                  exames
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Retirada de Encaminhamentos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Retirada de encaminhamentos para médicos especialistas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Retirada de Guias
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Retirada de guias para exames especializados (ultrassom,
                  tomografia, entre outros)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Informações sobre Prazos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Fornecimento de informações sobre prazos e andamento de
                  solicitações
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre o Processo de Regulação
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Esclarecimentos sobre o processo de regulação do SUS
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Documentos Necessários" variant="highlight">
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento neste setor, é obrigatória a apresentação da
            seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento físico original ou número do CPF do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Número do Protocolo
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Se você tiver recebido ao solicitar o encaminhamento
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF são obrigatórios para qualquer atendimento na unidade.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Horário de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Observações
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    08h00 às 11h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento presencial
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    13h00 às 16h30
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento presencial
                  </td>
                </tr>
                <tr className="bg-warning/10">
                  <td
                    colSpan="3"
                    className="border border-neutral-300 px-4 py-3 text-center"
                  >
                    <strong className="text-warning-dark">Atenção:</strong>{" "}
                    Atendimento apenas às{" "}
                    <strong>Segundas, Quartas e Sextas-feiras</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Como funciona a Fila do SUS?">
          <ol className="space-y-3 list-decimal list-inside ml-4 text-neutral-700 text-sm">
            <li className="mb-2">
              <strong>Solicitação:</strong> O médico da unidade identifica a
              necessidade de uma consulta especializada ou exame e faz a
              solicitação no sistema.
            </li>
            <li className="mb-2">
              <strong>Regulação:</strong> Sua solicitação entra na fila de
              regulação municipal, onde é analisada e classificada por
              prioridade.
            </li>
            <li className="mb-2">
              <strong>Classificação de Risco:</strong> As solicitações são
              priorizadas conforme a gravidade e urgência do caso.
            </li>
            <li className="mb-2">
              <strong>Agendamento:</strong> Quando chegar sua vez, você será
              notificado e deverá retirar o encaminhamento neste setor.
            </li>
            <li>
              <strong>Consulta/Exame:</strong> Com o encaminhamento em mãos,
              compareça no local, data e horário indicados.
            </li>
          </ol>
        </InfoBox>
        <Alert type="info">
          <strong>Orientação Importante:</strong> Compareça regularmente para
          consultar sua posição na fila. Quando o encaminhamento estiver
          disponível, haverá um prazo para a retirada. Não perca esse prazo!
          Mantenha seu telefone celular atualizado e fique atento, pois a equipe
          entrará em contato por WhatsApp e/ou ligação para informar sobre a
          disponibilidade do encaminhamento.
        </Alert>
        {}
        <InfoBox title="Classificação de Prioridade">
          <div className="space-y-4">
            <div className="p-4 bg-error/10 border-l-4 border-red-500 rounded-lg">
              <strong className="text-red-800">Urgente:</strong> Casos graves
              que necessitam atendimento rápido (até 7 dias)
            </div>
            <div className="p-4 bg-warning/10 border-l-4 border-warning rounded-lg">
              <strong className="text-amber-800">Prioritário:</strong> Casos que
              exigem atenção em curto prazo (até 30 dias)
            </div>
            <div className="p-4 bg-info/10 border-l-4 border-blue-500 rounded-lg">
              <strong className="text-blue-800">Eletivo:</strong> Casos que
              podem aguardar sem prejuízo à saúde (conforme disponibilidade)
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Entenda o Encaminhamento (SUS Fácil)">
          <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
            Muitos pacientes nos perguntam por que alguns exames ou cirurgias
            demoram. É importante saber que{" "}
            <strong>
              a Unidade de Saúde (ESF) não marca a data desses procedimentos
            </strong>
            . Nós fazemos a solicitação, mas quem decide "onde" e "quando" é o
            sistema estadual.
          </p>
          <h4 className="text-neutral-800 font-bold mb-3 text-sm">
            O que é o SUS Fácil?
          </h4>
          <p className="text-neutral-700 mb-4 text-sm">
            É o sistema computadorizado de regulação do Estado de Minas Gerais.
            Funciona como uma grande "central de vagas".
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">1. O Pedido:</strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  O médico da unidade identifica a necessidade e nossa equipe
                  insere seu pedido no sistema SUS Fácil.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  2. A Análise (Regulação):
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Médicos reguladores em outras cidades analisam a gravidade do
                  seu caso (classificação de risco), e não apenas a ordem de
                  chegada.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  3. O Agendamento:
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Assim que uma vaga surge em hospitais ou clínicas
                  especializadas, o sistema libera a autorização. Só então o
                  profissional da sala de atendimento administrativo consegue
                  imprimir seu encaminhamento.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="warning">
              <strong>Lembre-se:</strong> A equipe deste setor monitora o
              sistema diariamente. Assim que sua vaga for liberada pelo Estado,
              entraremos em contato via WhatsApp ou ligação telefônica. Mantenha
              seu telefone celular atualizado e fique atento às chamadas e
              mensagens!
            </Alert>
          </div>
        </InfoBox>
      </div>
    </PageContainer>
  );
}
