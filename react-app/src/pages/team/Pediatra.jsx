import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";

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
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-900",
      icon: "text-green-600",
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

export default function Pediatra() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Pediatria</h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            O atendimento pediátrico na UBS São José oferece cuidado
            especializado para crianças desde o nascimento até a adolescência.
            Realizamos consultas de puericultura (acompanhamento do
            desenvolvimento infantil), atendimentos de urgências pediátricas e
            orientações aos pais sobre saúde e desenvolvimento dos filhos.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Puericultura</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Acompanhamento do crescimento e desenvolvimento
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Atualização vacinal
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Verificação e orientação sobre vacinas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Consultas de rotina e urgências
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Avaliação de doenças comuns da infância
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Avaliação nutricional
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Orientação sobre alimentação saudável
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Orientação aos pais
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Suporte no cuidado e desenvolvimento infantil
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Quem é o profissional */}
        <InfoBox title="Quem é o profissional?">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Profissional
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Especialidade
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dr. Antônio</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Médico Pediatra
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic">
            * Atendimento conforme escala. Agendamento através da{" "}
            <Link
              to="/servicos/sala-4"
              className="text-blue-600 hover:text-blue-700 underline font-semibold"
            >
              Sala de Agendamentos
            </Link>
            .
          </p>
        </InfoBox>

        {/* Para quem é indicado */}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Crianças de 0 a 12 anos (puericultura e consultas de rotina)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Adolescentes até 18 anos (conforme necessidade)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Crianças com doenças agudas (febre, diarreia, vômitos, gripes)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Crianças com doenças crônicas em acompanhamento
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Recém-nascidos para primeira consulta após alta da maternidade
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Acesso ao Serviço */}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  . Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    documentação necessária para agendar
                  </Link>
                  . Consultas programadas conforme escala do pediatra.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Comparecimento à Consulta
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Apresentar-se no horário agendado com 15 minutos de
                  antecedência, documentação completa e carteira de vacinação
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Alerta Informativo */}
        <div className="mb-6">
          <Alert type="info">
            <div>
              <p className="mb-2">
                <strong>Puericultura - Calendário de Consultas:</strong>{" "}
                Recém-nascido (1ª semana), 1 mês, 2 meses, 4 meses, 6 meses, 9
                meses, 12 meses, 18 meses, 24 meses e depois consultas anuais.
                Mantenha o acompanhamento em dia!
              </p>
              <p>
                <strong>Importante:</strong> SEMPRE traga a carteira de
                vacinação da criança. É através dela que acompanhamos o
                desenvolvimento e verificamos se as vacinas estão em dia.
              </p>
            </div>
          </Alert>
        </div>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Certidão de Nascimento ou RG da criança
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Original e cópia
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
                  Indispensável em todas as consultas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto do Responsável
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">RG ou CNH</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Comprovante de Residência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">Atualizado</p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Informação importante final */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-blue-50">
                Antes de se dirigir à sala de consulta do pediatra responsável,
                é necessário passar pela recepção da unidade para realização da
                ficha de atendimento. Esta medida é essencial para agilizar o
                processo de atendimento e garantir a organização adequada do
                fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
