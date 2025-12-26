import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
function PageContainer({ children }) {
  return <div className="min-h-screen bg-neutral-50 py-8 px-4">{children}</div>;
}
function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-neutral-50 border-neutral-200",
    highlight: "bg-info/10 border-info",
  };
  return (
    <div
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div className={`flex items-center gap-3 mb-5 pb-2 border-b ${variant === "highlight" ? "border-neutral-300" : "border-neutral-200"}`}>
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
        <div className={`text-sm leading-relaxed ${textColor} [&_strong]:font-bold ${strongColor}`}>{children}</div>
      </div>
    </div>
  );
}
export default function Recepcao() {
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
                Recepção
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
        <CampanhasPaginaWrapper pagina="recepcao" />
        {}
        <AvisosPaginaWrapper pagina="recepcao" />
        <p className="text-center text-neutral-700 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
          A recepção é o setor responsável pelo primeiro atendimento ao usuário
          na unidade, realizando o direcionamento adequado aos serviços de saúde
          disponíveis e fornecendo informações sobre o funcionamento da unidade,
          conforme protocolos e normativas estabelecidas.
        </p>
        {}
        <InfoBox title="Equipe Responsável">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Dia da Semana
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissionais
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3" rowSpan="2">
                    <strong className="text-neutral-800">Segunda-feira</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>07h00 às 17h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 1</div>
                    <div>Nome do Profissional 2</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>17h00 às 22h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 3</div>
                    <div>Nome do Profissional 4</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3" rowSpan="2">
                    <strong className="text-neutral-800">Terça-feira</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>07h00 às 17h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 5</div>
                    <div>Nome do Profissional 6</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>17h00 às 22h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 7</div>
                    <div>Nome do Profissional 8</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3" rowSpan="2">
                    <strong className="text-neutral-800">Quarta-feira</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>07h00 às 17h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 9</div>
                    <div>Nome do Profissional 10</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>17h00 às 22h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 11</div>
                    <div>Nome do Profissional 12</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3" rowSpan="2">
                    <strong className="text-neutral-800">Quinta-feira</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>07h00 às 17h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 13</div>
                    <div>Nome do Profissional 14</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>17h00 às 22h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 15</div>
                    <div>Nome do Profissional 16</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3" rowSpan="2">
                    <strong className="text-neutral-800">Sexta-feira</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>07h00 às 17h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 17</div>
                    <div>Nome do Profissional 18</div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <strong>17h00 às 22h00</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="pb-2">Nome do Profissional 19</div>
                    <div>Nome do Profissional 20</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Preciso passar na recepção antes?" variant="highlight">
          <p className="text-neutral-700 mb-4 text-sm">
            Sim. A recepção realiza o direcionamento para os seguintes serviços:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas Agendadas
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Confirmação de presença e conferência de documentos antes de
                  se dirigir ao consultório.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Vacinação e Medicação
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  É necessário passar pela recepção para realizar a ficha de
                  atendimento antes de se dirigir à sala de procedimentos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Exame de Eletrocardiograma
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Realização do cadastro inicial antes do exame.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Curativos</strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  É necessário passar pela recepção para realizar a ficha de
                  atendimento antes de se dirigir à sala de curativos.
                </p>
              </div>
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
                    <strong className="text-neutral-800">Horário Regular</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h00 às 17h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-600">
                    Atendimento geral
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
        <InfoBox title="O que você pode retirar aqui?">
          <p className="text-neutral-700 mb-4 text-sm">
            Para agilizar o atendimento, alguns documentos ficam disponíveis
            diretamente na recepção, sem necessidade de aguardar na Sala de Agendamentos ou
            na Sala de atendimento administrativo.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm w-1/2">
                    Documento
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Receitas Renovadas
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Receitas de uso contínuo que foram deixadas para renovação e
                    já estão prontas para retirada.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Guias de Encaminhamento
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Encaminhamentos ou guias que não necessitam de assinatura do
                    usuário.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Resultados de Exames
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Retirada de resultados de exames e informações sobre a
                    disponibilidade dos resultados.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Alert type="warning">
              <strong>Atenção:</strong> Se o seu documento precisa de sua
              assinatura, ele estará na Sala de atendimento administrativo, não na recepção.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox
          title="Documentos Necessários para Retirar Receitas Renovadas e Exames"
          variant="highlight"
        >
          <p className="text-neutral-700 mb-4 text-sm">
            Para retirar receitas renovadas e exames na recepção, é obrigatório
            apresentar:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Protocolo de Entrega
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatório para retirada de resultados de exames
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação Original do Titular com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  original do titular
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
          </div>
          <div className="mt-4">
            <Alert type="info">
              <strong>Importante:</strong> Sem a apresentação desses documentos,
              não será possível retirar receitas renovadas ou exames na
              recepção.
            </Alert>
          </div>
        </InfoBox>
      </div>
    </PageContainer>
  );1
}
