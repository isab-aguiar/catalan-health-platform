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
                className="text-3xl font-bold text-slate-900"
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
                    Thaciane Souza
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
                    Tatiane Aparecida
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
                    Alessandra Silva
                  </td>
                </tr>
              </tbody>
            </table>
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
