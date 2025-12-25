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
export default function Recepcao() {
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
                Recepção
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
        <CampanhasPaginaWrapper pagina="recepcao" />
        {}
        <AvisosPaginaWrapper pagina="recepcao" />
        <p className="text-center text-slate-700 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
          A recepção é o setor responsável pelo primeiro atendimento ao usuário
          na unidade, realizando o direcionamento adequado aos serviços de saúde
          disponíveis e fornecendo informações sobre o funcionamento da unidade,
          conforme protocolos e normativas estabelecidas.
        </p>
        {}
        <InfoBox title="Equipe Responsável">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <strong className="block text-lg text-slate-800 mb-1">
                Denivia
              </strong>
              <span className="text-slate-600 text-sm">Recepcionista</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <strong className="block text-lg text-slate-800 mb-1">
                Wasley
              </strong>
              <span className="text-slate-600 text-sm">
                Agente Comunitário de Saúde
              </span>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Preciso passar na recepção antes?" variant="highlight">
          <p className="text-slate-700 mb-4 text-sm">
            Sim. A recepção realiza o direcionamento para os seguintes serviços:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Consultas Agendadas
                </strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Confirmação de presença e conferência de documentos antes de
                  se dirigir ao consultório.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Vacinação e Medicação
                </strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  É necessário passar pela recepção para realizar a ficha de
                  atendimento antes de se dirigir à sala de procedimentos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Exame de Eletrocardiograma
                </strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Realização do cadastro inicial antes do exame.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Curativos</strong>
                <p className="text-sm text-slate-600 mt-0.5">
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
                    <strong className="text-slate-800">Horário Regular</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    07h00 às 17h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Atendimento geral
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Saúde na Hora</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    17h00 às 22h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Atendimento estendido
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="O que você pode retirar aqui?">
          <p className="text-slate-700 mb-4 text-sm">
            Para agilizar o atendimento, alguns documentos ficam disponíveis
            diretamente na recepção, sem necessidade de aguardar na Sala 4 ou
            Sala 9.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm w-1/2">
                    Documento
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Receitas Renovadas
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Receitas de uso contínuo que foram deixadas para renovação e
                    já estão prontas para retirada.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Guias de Encaminhamento
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Encaminhamentos ou guias que não necessitam de assinatura do
                    usuário.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">
                      Resultados de Exames
                    </strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
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
              assinatura, ele estará na Sala 9 - Administração, não na recepção.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox
          title="Documentos Necessários para Retirar Receitas Renovadas e Exames"
          variant="highlight"
        >
          <p className="text-slate-700 mb-4 text-sm">
            Para retirar receitas renovadas e exames na recepção, é obrigatório
            apresentar:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Protocolo de Entrega
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Obrigatório para retirada de resultados de exames
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação Original do Titular com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  original do titular
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
  );
}
