import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";

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
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-900",
      icon: "text-green-600"
    }
  };
  
  const style = types[type] || types.info;
  
  return (
    <div className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}>
      <div className="flex gap-3">
        <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${style.icon}`} />
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
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sala de Vacinas</h1>
              <p className="text-slate-600 text-sm mt-1">UBS São José - Unidade Básica de Saúde</p>
            </div>
          </div>
        </div>

        <Alert type="info">
          <strong>Vacinas salvam vidas!</strong> Mantenha sua carteira de vacinação sempre em dia. 
          A imunização protege você, sua família e toda a comunidade.
        </Alert>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Aplicação de Vacinas</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Aplicação de vacinas do calendário nacional de vacinação
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Vacinação Universal</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Vacinação de crianças, adolescentes, adultos e idosos conforme protocolos estabelecidos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Vacinas para Gestantes</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Vacinação de gestantes conforme protocolo do Ministério da Saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Atualização de Carteiras de Vacinação</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Atualização de carteiras de vacinação e fornecimento de orientações
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Campanhas de Vacinação</strong>
                <p className="text-sm text-slate-600 mt-0.5">
                  Participação em campanhas de vacinação (gripe, sarampo, COVID-19, entre outras)
                </p>
              </div>
            </div>
          </div>
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
                    Profissional Responsável
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Manhã</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">Renata Kelly</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">Silvana</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Documentos Necessários */}
        <InfoBox title="Documentos Necessários" variant="highlight">
          <p className="text-slate-700 mb-4 text-sm">
            Para vacinação, é obrigatória a apresentação da seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">Documento de Identificação com Foto</strong>
                <p className="text-xs text-slate-600 mt-0.5">RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação) do titular</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">CPF - Cadastro de Pessoa Física</strong>
                <p className="text-xs text-slate-600 mt-0.5">Documento físico original ou número do CPF do titular</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">Carteira de Vacinação</strong>
                <p className="text-xs text-slate-600 mt-0.5">Indispensável para registro das doses aplicadas</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e CPF são obrigatórios 
              para qualquer atendimento na unidade.
            </Alert>
          </div>
        </InfoBox>

        {/* Horários de Atendimento */}
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
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">07h00 às 11h00</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">Atendimento livre, por ordem de chegada</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">13h00 às 17h00</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">Atendimento livre, por ordem de chegada</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Saúde na Hora</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">17h00 às 22h00</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">Atendimento estendido</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Informação importante */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm mb-6">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Antes de se dirigir à sala de vacinas, é necessário passar pela recepção da unidade para 
              realização da ficha de atendimento. Esta medida é essencial para agilizar o processo de 
              atendimento e garantir a organização adequada do fluxo de pacientes na unidade.
            </p>
          </div>
        </div>

        {/* Calendário de Vacinação */}
        <InfoBox title="Calendário de Vacinação (Resumo)">
          <p className="text-slate-700 mb-6 text-sm">
            Principais vacinas disponíveis conforme o Calendário Nacional de Vacinação:
          </p>

          <div className="space-y-4">
            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h4 className="text-blue-800 font-bold mb-2 text-sm">
                Crianças (0 a 10 anos)
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                BCG, Hepatite B, Pentavalente, Poliomielite, Rotavírus, Pneumocócica 10-valente,
                Meningocócica C, Febre Amarela, Tríplice Viral (Sarampo, Caxumba, Rubéola),
                Hepatite A, Varicela (Catapora), DTP, entre outras.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-l-4 border-slate-500 rounded-lg">
              <h4 className="text-slate-800 font-bold mb-2 text-sm">
                Adolescentes (11 a 19 anos)
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                HPV, dT (Difteria e Tétano), Tríplice Viral, Hepatite B, Febre Amarela, Meningocócica ACWY.
              </p>
            </div>

            <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <h4 className="text-amber-800 font-bold mb-2 text-sm">
                Adultos (20 a 59 anos)
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                dT (Difteria e Tétano), Tríplice Viral, Hepatite B, Febre Amarela, e vacinas específicas
                para gestantes (dTpa e Influenza).
              </p>
            </div>

            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h4 className="text-blue-800 font-bold mb-2 text-sm">
                Idosos (60 anos ou mais)
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                Influenza (gripe), Pneumocócica 23-valente, dT (Difteria e Tétano), Febre Amarela.
              </p>
            </div>
          </div>
        </InfoBox>

        <Alert type="warning">
          <strong>Importante:</strong> Em caso de campanhas de vacinação, os horários podem ser estendidos.
          Fique atento aos comunicados da unidade e da Secretaria Municipal de Saúde.
        </Alert>

        <Alert type="success">
          <strong>Orientação:</strong> Sempre traga sua carteira de vacinação, mesmo que você ache que está em dia.
          A equipe pode identificar vacinas que precisam de reforço ou atualização.
        </Alert>

        <Alert type="warning">
          <strong>Vacina BCG (Recém-Nascidos):</strong> A vacina BCG requer agendamento prévio. Procure a Sala 4 
          (Central de Agendamento) para marcar a aplicação da BCG para seu bebê.
        </Alert>
      </div>
    </PageContainer>
  );
}
