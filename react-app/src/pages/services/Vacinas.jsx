import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CalendarioVacinal from "../../components/vacinas/CalendarioVacinal";
import VacinasDisponiveis from "../../components/vacinas/VacinasDisponiveis";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
function PageContainer({ children }) {
  return <div className="min-h-screen bg-slate-50 py-8 px-4">{children}</div>;
}
function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-blue-50 border-primary-700",
  };
  return (
    <div
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      {title && (
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
        {icon && <div className="text-blue-700">{icon}</div>}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      )}
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
export default function Vacinas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-slate-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Sala de Vacinação
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
        <CampanhasPaginaWrapper pagina="vacinas" />
        {}
        <AvisosPaginaWrapper pagina="vacinas" />
        {}
        <div className="mb-6">
          <CalendarioVacinal />
        </div>
        {}
        <InfoBox title="Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
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
                    Profissional Responsável
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
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Thaciane Souza<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    13h00 às 17h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Tatiane Aparecida<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Saúde na Hora</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    17h00 às 22h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Profissional Responsável:<br/>
                    Alessandra Silva<br/>
                    Função: Técnica de Enfermagem
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
                  <p className="text-sm font-semibold text-neutral-800">07h00 às 11h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Thaciane Souza</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnica de Enfermagem</p>
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
                  <p className="text-sm font-semibold text-neutral-800">13h00 às 17h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Tatiane Aparecida</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnica de Enfermagem</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded">
                  Saúde na Hora
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">17h00 às 22h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Alessandra Silva</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnica de Enfermagem</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="info">
              <p className="text-slate-800 text-xs md:text-sm font-normal leading-relaxed">
                <strong>Observações Importantes:</strong> O atendimento na Sala
                de Vacinas é realizado de forma livre, por ordem de chegada.
                Antes de se dirigir à sala de vacinas, é obrigatório realizar o
                cadastro na recepção da unidade para abertura da ficha de
                atendimento. <strong>Exceção:</strong> A aplicação da vacina BCG
                em recém-nascidos requer agendamento prévio, que deve ser
                realizado na{" "}
                <Link
                  to="/services/sala4"
                  className="text-blue-700 font-semibold hover:text-blue-800 underline"
                >
                  Sala de Agendamentos
                </Link>
                .
              </p>
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox variant="highlight">
          {}
          <div className="mb-6">
            <VacinasDisponiveis />
          </div>
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Documentos Necessários</h2>
          </div>
          <p className="text-slate-700 mb-4 text-sm">
            Para vacinação, é obrigatória a apresentação da seguinte
            documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação do titular
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
                  Carteira de Vacinação
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Quando disponível, para registro das doses aplicadas
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="info">
              <p className="text-slate-800 text-xs md:text-sm font-normal leading-relaxed">
                <strong>Observação sobre Carteira de Vacinação:</strong>{" "}
                Apresente sua carteira de vacinação em todas as consultas, mesmo
                que considere estar em dia. A equipe de saúde pode identificar
                vacinas que necessitam de reforço ou atualização conforme o
                calendário nacional.
              </p>
            </Alert>
          </div>
        </InfoBox>
      </div>
    </PageContainer>
  );
}
