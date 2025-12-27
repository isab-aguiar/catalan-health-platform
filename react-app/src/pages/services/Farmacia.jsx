import { AlertCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
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
export default function Farmacia() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Farmácia
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
        <CampanhasPaginaWrapper pagina="farmacia" />
        {}
        <AvisosPaginaWrapper pagina="farmacia" />
        {}
        <InfoBox title="Sobre o Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Dispensação de Medicamentos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Medicamentos prescritos pelos profissionais da unidade,
                  conforme disponibilidade no estoque e protocolos
                  estabelecidos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre Uso Correto
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Fornecimento de informações sobre administração adequada de
                  medicamentos, posologia e cuidados necessários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Informações sobre Interações Medicamentosas
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Orientações sobre possíveis interações entre medicamentos e
                  efeitos colaterais, conforme protocolos farmacêuticos.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:shadow-md transition-shadow mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                Contato da Farmácia
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-1">
                    Telefone
                  </p>
                  <a
                    href="tel:+553732296081"
                    className="text-lg sm:text-xl font-semibold text-neutral-900 hover:text-purple-600 transition-colors"
                  >
                    (37) 3229-6081
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
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
                    07h30 às 11h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="mb-2">
                      <strong>Farmacêutica:</strong> Marcella Oliveira
                    </div>
                    <div>
                      <strong>Atendente:</strong> Marinete Maria
                    </div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    13h00 às 16h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    <div className="mb-2">
                      <strong>Farmacêutica:</strong> Mariana
                    </div>
                    <div>
                      <strong>Atendente:</strong> Zulmira
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Manhã
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">07h30 às 11h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <div className="text-sm text-neutral-700 space-y-1">
                    <p><strong>Farmacêutica:</strong> Marcella Oliveira</p>
                    <p><strong>Atendente:</strong> Marinete Maria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Tarde
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">13h00 às 16h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <div className="text-sm text-neutral-700 space-y-1">
                    <p><strong>Farmacêutica:</strong> Mariana</p>
                    <p><strong>Atendente:</strong> Zulmira</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Alert type="warning">
              <strong>Atenção ao Horário Especial:</strong> A Farmácia funciona das{" "}
              <strong>07h30 às 16h00</strong>, de segunda a sexta-feira. Este
              horário é diferente do restante da unidade.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-neutral-700 mb-4 text-sm">
            Para retirada de medicamentos, é obrigatória a apresentação da
            seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Receita Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória para retirada de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação
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
              Traga sempre a receita médica original e válida.{" "}
              <Link
                to="/servicos/renovacao#prazo-validade"
                className="underline hover:text-white transition-colors font-semibold"
              >
                Consulte os prazos de validade das receitas
              </Link>{" "}
              para garantir a dispensação adequada dos seus medicamentos.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
