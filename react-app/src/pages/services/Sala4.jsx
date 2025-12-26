import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
function PageContainer({ children }) {
  return <div className="min-h-screen bg-neutral-50 py-8 px-4">{children}</div>;
}
function InfoBox({ title, icon, children, variant = "default", id }) {
  const variants = {
    default: "bg-white border-neutral-200",
    highlight: "bg-info/10 border-info",
  };
  return (
    <div
      id={id}
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${variant === "highlight" ? "border-neutral-300" : "border-neutral-200"}`}>
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
      text: "text-neutral-900",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-neutral-900",
      icon: "text-warning-dark",
    },
  };
  const childrenText = typeof children === 'string' ? children : children?.props?.children || '';
  const hasImportante = String(childrenText).toLowerCase().includes('importante:');
  const hasNormativa = String(childrenText).toLowerCase().includes('normativa:');
  
  let style = types[type];
  if (hasNormativa && type === 'warning') {
    style = {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-neutral-900",
      icon: "text-warning-dark",
    };
  }
  
  const textColor = hasImportante ? 'text-info' : (type === 'warning' ? 'text-warning-dark' : 'text-info');
  const strongColor = hasImportante ? '[&_strong]:text-info' : (type === 'warning' ? '[&_strong]:text-warning-dark' : type === 'info' ? '[&_strong]:text-info' : '');
  return (
    <div
      className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}
    >
      <div className="flex gap-3">
        <AlertCircle
          size={20}
          className={`flex-shrink-0 mt-0.5 ${style.icon}`}
        />
        <div className={`text-sm leading-relaxed ${textColor} [&_strong]:font-bold ${strongColor}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
export default function Sala4() {
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
                Sala de Agendamento
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
        <CampanhasPaginaWrapper pagina="sala-4" />
        {}
        <AvisosPaginaWrapper pagina="sala-4" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            Este setor da Unidade Básica de Saúde São José é responsável pelo
            gerenciamento e organização dos agendamentos de consultas médicas,
            consultas de enfermagem, exames laboratoriais, exames de imagem e
            procedimentos diversos. O serviço atua como central de agendamento,
            garantindo o acesso organizado aos serviços de saúde disponíveis na
            unidade e na rede de atenção à saúde.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Consultas
              </h3>
              <p className="text-sm text-neutral-600">
                Agendamento de consultas médicas e de enfermagem conforme
                disponibilidade de horários e necessidade clínica do usuário.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Exames
              </h3>
              <p className="text-sm text-neutral-600">
                Agendamento de exames laboratoriais e de imagem mediante
                apresentação de prescrição médica válida ou pedido de exame
                original emitido pelo médico assistente.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Procedimentos
              </h3>
              <p className="text-sm text-neutral-600">
                Confirmação e remarcação de procedimentos diversos conforme
                protocolos estabelecidos pela unidade.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Orientações
              </h3>
              <p className="text-sm text-neutral-600">
                Fornecimento de orientações sobre preparo para exames e
                procedimentos, conforme protocolos estabelecidos.
              </p>
            </div>
          </div>
          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
              SUS Fácil
            </h3>
            <p className="text-sm text-neutral-600 mb-2">
              Este setor realiza a entrada de usuários na fila do SUS Fácil para
              agendamento de exames, consultas especializadas e cirurgias. É
              necessário apresentar documentação completa para protocolização.
            </p>
            <p className="text-xs text-neutral-500 italic">
              Nota: O acompanhamento da posição na fila é realizado na  Sala de atendimento administrativo.
            </p>
          </div>
        </InfoBox>
        {}
        <InfoBox
          id="documentacao-necessaria"
          title="Documentação Necessária"
          variant="highlight"
        >
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento neste setor, é obrigatória a apresentação da
            seguinte documentação, conforme o tipo de serviço solicitado:
          </p>
          <div className="space-y-3">
            <div className="bg-white border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
                Atualização de Cadastro
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Documento de Identificação com Foto
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      RG (Registro Geral) ou CNH (Carteira Nacional de
                      Habilitação)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      CPF - Cadastro de Pessoa Física
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Documento físico original ou número do CPF
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Comprovante de Residência
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Atualizado há no máximo 90 dias
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
                Agendamento de Consultas e Exames
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Documento de Identificação com Foto
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      RG ou CNH do titular do atendimento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Prescrição Médica
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Obrigatória para agendamento de exames
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
                Protocolo / SUS Fácil (Cirurgias e Alto Custo)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Documento de Identificação com Foto do Titular
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      RG ou CNH do titular do atendimento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      CPF do Titular
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Documento físico original ou número do CPF
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm">
                      Guia de Encaminhamento Médico Original
                    </strong>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Documento original emitido pelo médico assistente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <Alert type="info">
              <strong>Atualização de Cadastro:</strong> Mantenha seus dados
              cadastrais atualizados. A atualização pode ser realizada neste
              mesmo setor, mediante apresentação da documentação necessária.
            </Alert>
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF do titular são obrigatórios para qualquer atendimento na
              unidade, independentemente do serviço solicitado.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Como Agendar">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Atendimento Presencial
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                O agendamento é realizado exclusivamente de forma presencial,
                durante os horários de funcionamento estabelecidos. O usuário
                deve comparecer à unidade com a documentação necessária conforme
                o tipo de serviço solicitado.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Orientações para Agendamento
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Compareça com antecedência aos horários de atendimento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Apresente toda a documentação necessária conforme o serviço
                    solicitado
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Para exames, traga a prescrição médica original e válida
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Consulte a disponibilidade de horários antes de comparecer
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Horários de Atendimento">
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
                    07h00 às 11h00
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
                    13h00 às 16h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento presencial
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            * Os horários podem sofrer alterações conforme necessidade
            operacional da unidade.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Equipe Responsável">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissionais Responsáveis
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Isabela Aguiar - Técnica de Enfermagem
                    <br />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Thaciane Souza - Técnica de Enfermagem
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Para otimizar o atendimento e garantir a organização adequada do
              fluxo de pacientes, é fundamental que o usuário compareça com toda
              a documentação necessária conforme o tipo de serviço solicitado. A
              falta de documentação pode resultar na impossibilidade de
              realização do agendamento.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
