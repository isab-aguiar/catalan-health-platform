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

export default function Dentistas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Odontologia</h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            O serviço de Odontologia da UBS São José oferece atendimento
            odontológico completo para toda a família. Nossa equipe de dentistas
            realiza desde procedimentos preventivos até tratamentos curativos,
            sempre com foco na saúde bucal da comunidade.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Prevenção</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Limpeza, aplicação de flúor, orientações de higiene bucal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Tratamento de cáries
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Restaurações dentárias
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">Extrações</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Remoção de dentes quando necessário
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Tratamento de canal
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Endodontia (casos selecionados)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Odontopediatria
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Atendimento especializado para crianças
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Pré-natal odontológico
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Cuidados bucais para gestantes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Urgências odontológicas
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Dor de dente, infecções, traumas
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Quem são as profissionais */}
        <InfoBox title="Quem são as profissionais?">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Dentista
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Especialidade
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dra. Mayra</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Cirurgiã-Dentista
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Dra. Helena</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    Cirurgiã-Dentista
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Para quem é indicado */}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Todas as idades: crianças, adolescentes, adultos e idosos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Gestantes para pré-natal odontológico
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Pessoas com dor de dente ou urgências odontológicas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Usuários que precisam de prevenção e limpeza dental
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-slate-700 text-sm">
                Pacientes com cáries, gengivite ou outros problemas bucais
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Como ter acesso */}
        <InfoBox title="Como ter acesso?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Agende na Sala 12 (2º andar)
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Agendamento específico para odontologia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Para urgências
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Procure a recepção e informe a situação
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Traga seus documentos
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento de identificação com foto
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm">
                  Compareça no horário
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Chegue 10 minutos antes da consulta
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" variant="highlight">
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
                  Comprovante de Residência
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Atualizado (máximo 3 meses)
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Horário de Atendimento */}
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
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    13h00 às 16h00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>

        {/* Orientação Importante */}
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed mb-3">
              <strong>Agendamento na Sala 12 - 2º Andar:</strong> O agendamento
              para consultas odontológicas é feito na Sala 12, localizada no
              segundo andar da unidade. Procure diretamente esse setor para
              marcar sua consulta!
            </p>
            <p className="text-sm text-blue-50 leading-relaxed mb-3">
              <strong>Dica Importante:</strong> Mantenha uma boa higiene bucal!
              Escove os dentes pelo menos 3 vezes ao dia, use fio dental
              diariamente e faça visitas regulares ao dentista para prevenção.
              Prevenir é sempre melhor que remediar!
            </p>
            <p className="text-sm text-blue-50 leading-relaxed">
              <strong>Gestantes e Crianças:</strong> Temos atendimento
              especializado para gestantes (pré-natal odontológico) e crianças
              (odontopediatria). A saúde bucal começa desde cedo - agende
              consultas regulares!
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
