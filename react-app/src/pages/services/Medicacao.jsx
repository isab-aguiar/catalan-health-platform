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
export default function Medicacao() {
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
                Sala de Medicação
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
        <CampanhasPaginaWrapper pagina="medicacao" />
        {}
        <AvisosPaginaWrapper pagina="medicacao" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            A Sala de Medicação da Unidade Básica de Saúde São José realiza
            aplicação de medicamentos injetáveis prescritos por médicos, além de
            outros procedimentos de enfermagem que requerem administração de
            medicações conforme protocolos estabelecidos.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Aplicação de Injeções
              </h3>
              <p className="text-sm text-neutral-600">
                Administração de medicamentos por via intramuscular, subcutânea
                e endovenosa, conforme prescrição médica.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Administração de Medicamentos
              </h3>
              <p className="text-sm text-neutral-600">
                Aplicação de medicações conforme prescrição médica e protocolos
                de segurança estabelecidos.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Nebulização
              </h3>
              <p className="text-sm text-neutral-600">
                Tratamento de problemas respiratórios mediante administração de
                medicamentos por via inalatória.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Aferição de Sinais Vitais
              </h3>
              <p className="text-sm text-neutral-600">
                Verificação de sinais vitais realizada de forma sistemática para
                controle ou conforme demanda e necessidade clínica do paciente.
              </p>
            </div>
          </div>
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
                    Profissional Responsável
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Thaciene Araújo - Técnica de Enfermagem
                    <br />
                    <br />
                    Isabela Aguiar - Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    José Ferreira - Técnico de Enfermagem
                  </td>
                </tr>
              </tbody>
            </table>
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
                    <strong className="text-neutral-800">Horário Regular</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h00 às 17h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento livre
                  </td>
                </tr>
                <tr className="bg-info/10">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Saúde na Hora</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    17h00 às 22h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento estendido
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento na sala de medicação, é obrigatória a apresentação
            da seguinte documentação:
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
                  Prescrição Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória para aplicação de medicamentos
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
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Traga sempre a prescrição médica original e o medicamento
              prescrito. Não esqueça de passar pela recepção primeiro para
              realizar sua ficha de atendimento.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
