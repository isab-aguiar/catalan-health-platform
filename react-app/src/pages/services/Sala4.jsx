import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";

function PageContainer({ children }) {
  return <div className="min-h-screen bg-slate-50 py-8 px-4">{children}</div>;
}

function InfoBox({ title, icon, children, variant = "default", id }) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-blue-50 border-blue-300",
  };

  return (
    <div
      id={id}
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

export default function Sala4() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Sala de Agendamento
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            Este setor da Unidade Básica de Saúde São José é responsável pelo
            gerenciamento e organização dos agendamentos de consultas médicas,
            consultas de enfermagem, exames laboratoriais, exames de imagem e
            procedimentos diversos. O serviço atua como central de agendamento,
            garantindo o acesso organizado aos serviços de saúde disponíveis na
            unidade e na rede de atenção à saúde.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Consultas
              </h3>
              <p className="text-sm text-slate-600">
                Agendamento de consultas médicas e de enfermagem conforme
                disponibilidade de horários e necessidade clínica do usuário.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Exames
              </h3>
              <p className="text-sm text-slate-600">
                Agendamento de exames laboratoriais e de imagem mediante
                apresentação de prescrição médica válida ou pedido de exame
                original emitido pelo médico assistente.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Procedimentos
              </h3>
              <p className="text-sm text-slate-600">
                Confirmação e remarcação de procedimentos diversos conforme
                protocolos estabelecidos pela unidade.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Orientações
              </h3>
              <p className="text-sm text-slate-600">
                Fornecimento de orientações sobre preparo para exames e
                procedimentos, conforme protocolos estabelecidos.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-slate-800 mb-2 text-sm">
              SUS Fácil
            </h3>
            <p className="text-sm text-slate-600 mb-2">
              Este setor realiza a entrada de usuários na fila do SUS Fácil para
              agendamento de exames, consultas especializadas e cirurgias. É
              necessário apresentar documentação completa para protocolização.
            </p>
            <p className="text-xs text-slate-500 italic">
              Nota: O acompanhamento da posição na fila é realizado na Sala 9-
              Administração.
            </p>
          </div>
        </InfoBox>

        {/* Documentação Necessária */}
        <InfoBox
          id="documentacao-necessaria"
          title="Documentação Necessária"
          variant="highlight"
        >
          <p className="text-slate-700 mb-4 text-sm">
            Para atendimento neste setor, é obrigatória a apresentação da
            seguinte documentação, conforme o tipo de serviço solicitado:
          </p>

          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                Atualização de Cadastro
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Documento de Identificação com Foto
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      RG (Registro Geral) ou CNH (Carteira Nacional de
                      Habilitação)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      CPF - Cadastro de Pessoa Física
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Documento físico original ou número do CPF
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Comprovante de Residência
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Atualizado há no máximo 30 dias
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                Agendamento de Consultas e Exames
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Documento de Identificação com Foto
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      RG ou CNH do titular do atendimento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Prescrição Médica
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Obrigatória para agendamento de exames
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">
                Protocolo / SUS Fácil (Cirurgias e Alto Custo)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Documento de Identificação com Foto do Titular
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      RG ou CNH do titular do atendimento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      CPF do Titular
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Documento físico original ou número do CPF
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <strong className="text-slate-800 text-sm">
                      Guia de Encaminhamento Médico Original
                    </strong>
                    <p className="text-xs text-slate-600 mt-0.5">
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

        {/* Como Agendar */}
        <InfoBox title="Como Agendar">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Atendimento Presencial
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                O agendamento é realizado exclusivamente de forma presencial,
                durante os horários de funcionamento estabelecidos. O usuário
                deve comparecer à unidade com a documentação necessária conforme
                o tipo de serviço solicitado.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Orientações para Agendamento
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
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

        {/* Horários de Atendimento */}
        <InfoBox title="Horários de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Observações
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    07h00 às 11h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Atendimento presencial
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    13h00 às 16h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Atendimento presencial
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            * Os horários podem sofrer alterações conforme necessidade
            operacional da unidade.
          </p>
        </InfoBox>

        {/* Equipe */}
        <InfoBox title="Equipe Responsável">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Profissionais Responsáveis
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Isabela Aguiar - Técnica de Enfermagem
                    <br />
                   
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Thaciane Souza - Técnica de Enfermagem<br />
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Funcionamento */}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Consultas de Rotina
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                As consultas de rotina devem ser agendadas com antecedência,
                conforme disponibilidade de horários e necessidade clínica do
                usuário. O agendamento garante melhor organização do fluxo de
                atendimento e otimização do tempo de espera.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Atendimento Sob Demanda (Sem Agendamento)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm mb-3">
                O atendimento sob demanda está disponível mediante triagem
                clínica inicial realizada no período das 07h00 às 08h00.
              </p>

              <div className="bg-white border-l-4 border-amber-500 p-3 rounded-r">
                <p className="text-sm text-slate-800 leading-relaxed">
                  <strong>Como funciona a Triagem:</strong> A triagem é uma
                  avaliação clínica inicial realizada por profissional de
                  enfermagem qualificado. Este procedimento não garante consulta
                  médica imediata, mas avalia a necessidade e prioridade do
                  atendimento. Conforme a necessidade identificada na triagem, o
                  usuário será encaminhado para a enfermeira responsável ou para
                  o médico da área correspondente, conforme protocolos
                  estabelecidos pela unidade.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Informação importante final */}
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
