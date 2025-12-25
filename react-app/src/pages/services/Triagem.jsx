import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
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
export default function Triagem() {
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
                Triagem
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
        <CampanhasPaginaWrapper pagina="triagem" />
        {}
        <AvisosPaginaWrapper pagina="triagem" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            A Triagem é uma avaliação clínica inicial realizada pela manhã e à
            noite, onde avaliamos a necessidade de cada paciente e definimos a
            prioridade do atendimento. É um momento essencial para garantir que
            casos mais urgentes sejam atendidos rapidamente e que todos recebam
            o encaminhamento adequado conforme protocolos estabelecidos.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Avaliação de Sinais Vitais
              </h3>
              <p className="text-sm text-slate-600">
                Verificação de pressão arterial, temperatura, frequência
                cardíaca e respiratória, conforme protocolos de enfermagem.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Aferição de Peso e Altura
              </h3>
              <p className="text-sm text-slate-600">
                Medição de peso e altura para atualização do prontuário e
                cálculo de índices antropométricos quando necessário.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 md:col-span-2">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Acolhimento
              </h3>
              <p className="text-sm text-slate-600">
                Realização de acolhimento humanizado, escuta qualificada da
                queixa do paciente e orientação sobre o fluxo de atendimento na
                unidade.
              </p>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Equipe Responsável">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Profissional
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Tatiane - Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Responsável Técnica
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Alessandra - Técnica de Enfermagem
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Pacientes que chegam sem agendamento prévio (demanda
                  espontânea)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Casos que necessitam de avaliação imediata
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-slate-700 text-sm">
                  Pacientes com sintomas agudos (febre, dor, mal-estar)
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Como ter acesso?">
          <ol className="space-y-3 list-decimal list-inside ml-4 text-slate-700 text-sm">
            <li className="mb-2">
              <strong>Compareça à unidade no horário da triagem</strong> - Das
              07h00 às 08h00 (manhã) ou das 17h30 às 18h30 (noite - Saúde na
              Hora). Dirija-se à recepção para realização da ficha de
              atendimento antes de se dirigir à sala de triagem.
            </li>
            <li className="mb-2">
              <strong>Aguarde ser chamado</strong> - A ordem de atendimento é
              por ordem de chegada.
            </li>
            <li className="mb-2">
              <strong>Converse com o profissional</strong> - Explique sua queixa
              e sintomas de forma clara e objetiva para facilitar a avaliação
              clínica.
            </li>
            <li>
              <strong>Receba o encaminhamento</strong> - Após a avaliação, a
              triagem direcionará você para o serviço adequado conforme a
              necessidade identificada.
            </li>
          </ol>
        </InfoBox>
        {}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-slate-700 mb-4 text-sm">
            Para atendimento na triagem, é obrigatória a apresentação da
            seguinte documentação:
          </p>
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
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento físico original ou número do CPF do titular
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
                    07h00 às 08h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Atendimento por ordem de chegada
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Noite (Saúde na Hora)
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    17h30 às 18h30
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Triagem e atendimento estendido
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
              Antes de se dirigir à sala de triagem, é necessário passar pela
              recepção da unidade para realização da ficha de atendimento. Esta
              medida é essencial para agilizar o processo de atendimento e
              garantir a organização adequada do fluxo de pacientes na unidade.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
