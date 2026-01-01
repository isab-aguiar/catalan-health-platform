import { Link } from "react-router-dom";
import { PageContainer } from "../../components/layout";
import { Card, BackButton } from "../../components/common";
import {
  Brain,
  Users,
  Activity,
  Stethoscope,
  Baby,
  HeartPulse,
  Smile,
} from "lucide-react";

export default function Consultas() {
  const consultaTypes = [
    {
      id: "medicos",
      title: "Consultório Médico",
      description:
        "Atendimento médico de família e comunidade para todas as idades",
      icon: Stethoscope,
      path: "/equipe/medicos",
      colorScheme: "primary",
    },
    {
      id: "pediatra",
      title: "Pediatria",
      description:
        "Atendimento especializado para crianças e acompanhamento de puericultura",
      icon: Baby,
      path: "/equipe/pediatra",
      colorScheme: "accent",
    },
    {
      id: "ginecologista",
      title: "Ginecologia",
      description:
        "Saúde da mulher, pré-natal e atendimento ginecológico",
      icon: HeartPulse,
      path: "/equipe/ginecologista",
      colorScheme: "secondary",
    },
    {
      id: "psicologa",
      title: "Atendimento Psicológico",
      description:
        "Apoio emocional, acolhimento e tratamento para saúde mental",
      icon: Brain,
      path: "/equipe/psicologa",
      colorScheme: "primary",
    },
    {
      id: "fisioterapeuta",
      title: "Consultório de Fisioterapia",
      description:
        "Tratamento e reabilitação física para recuperação funcional",
      icon: Activity,
      path: "/equipe/fisioterapeuta",
      colorScheme: "green",
    },
    {
      id: "dentistas",
      title: "Consultório Odontológico",
      description:
        "Atendimento odontológico para toda a família e saúde bucal",
      icon: Smile,
      path: "/equipe/dentistas",
      colorScheme: "accent",
    },
    {
      id: "assistente-social",
      title: "Serviço Social",
      description:
        "Orientação social, acesso a direitos e apoio em situações de vulnerabilidade",
      icon: Users,
      path: "/equipe/assistente-social",
      colorScheme: "secondary",
    },
  ];

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <BackButton />

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Consultas e Atendimentos
          </h1>
          <p className="text-primary-100 text-sm sm:text-base">
            Conheça todos os tipos de consultas e atendimentos especializados
            disponíveis na unidade. Agende sua consulta e cuide da sua saúde!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {consultaTypes.map((consulta) => (
            <Card
              key={consulta.id}
              title={consulta.title}
              description={consulta.description}
              icon={consulta.icon}
              href={consulta.path}
              colorScheme={consulta.colorScheme}
            />
          ))}
        </div>

        {/* Como Agendar */}
        <div className="bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Como Agendar sua Consulta
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</div>
                <p className="text-neutral-700">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-700 hover:text-blue-900 font-semibold underline"
                  >
                    Sala de Agendamento (Sala 4)
                  </Link>{" "}
                  com sua documentação
                </p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</div>
                <p className="text-neutral-700">
                  Informe o tipo de consulta que você precisa e sua preferência
                  de horário
                </p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</div>
                <p className="text-neutral-700">
                  Aguarde a confirmação do agendamento e anote a data e horário
                </p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">4</div>
                <p className="text-neutral-700">
                  Compareça no dia e horário marcados com toda a documentação
                  necessária
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
