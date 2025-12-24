import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";

function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {children}
    </div>
  );
}

function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-blue-50 border-blue-300"
  };
  
  return (
    <div className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}>
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
      icon: "text-blue-600"
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-900",
      icon: "text-amber-600"
    }
  };
  
  const style = types[type];
  
  return (
    <div className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}>
      <div className="flex gap-3">
        <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${style.icon}`} />
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
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Farmácia</h1>
              <p className="text-slate-600 text-sm mt-1">UBS São José - Unidade Básica de Saúde</p>
            </div>
          </div>
        </div>

        {/* Campanhas */}
        <CampanhasPaginaWrapper pagina="farmacia" />

        {/* Avisos */}
        <AvisosPaginaWrapper pagina="farmacia" />

        <Alert type="warning">
          <strong>Atenção ao Horário Especial:</strong> A Farmácia funciona das <strong>07h30 às 16h00</strong>, 
          de segunda a sexta-feira. Este horário é diferente do restante da unidade.
        </Alert>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Dispensação de Medicamentos</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Medicamentos prescritos pelos profissionais da unidade, conforme disponibilidade 
                  no estoque e protocolos estabelecidos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Orientações sobre Uso Correto</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Fornecimento de informações sobre administração adequada de medicamentos, 
                  posologia e cuidados necessários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Informações sobre Interações Medicamentosas</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Orientações sobre possíveis interações entre medicamentos e efeitos colaterais, 
                  conforme protocolos farmacêuticos.
                </p>
              </div>
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
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">07h30 às 11h00</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">Dispensação de medicamentos</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">13h00 às 16h00</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">Dispensação de medicamentos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-slate-700 mb-4 text-sm">
            Para retirada de medicamentos, é obrigatória a apresentação da seguinte documentação:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">Receita Médica</strong>
                <p className="text-xs text-slate-600 mt-0.5">Obrigatória para retirada de medicamentos</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">Documento de Identificação</strong>
                <p className="text-xs text-slate-600 mt-0.5">RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)</p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Informação importante final */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Traga sempre a receita médica original e válida. Medicamentos controlados têm regras 
              específicas de dispensação conforme legislação vigente.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
