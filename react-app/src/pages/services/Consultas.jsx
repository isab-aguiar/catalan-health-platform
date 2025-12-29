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
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Consultas e Atendimentos
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Conheça todos os tipos de consultas e atendimentos especializados
            disponíveis na unidade. Agende sua consulta e cuide da sua saúde!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6 mt-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            Como Agendar sua Consulta
          </h2>
          <div className="space-y-2 text-sm text-neutral-700">
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">1.</span>
              <span>
                Dirija-se à{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-primary-600 hover:text-primary-700 font-semibold underline"
                >
                  Sala de Agendamento (Sala 4)
                </Link>{" "}
                com sua documentação
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">2.</span>
              <span>
                Informe o tipo de consulta que você precisa e sua preferência
                de horário
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">3.</span>
              <span>
                Aguarde a confirmação do agendamento e anote a data e horário
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">4.</span>
              <span>
                Compareça no dia e horário marcados com toda a documentação
                necessária
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
