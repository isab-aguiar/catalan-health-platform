import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import BackButton from "../../components/common/BackButton";
import { PillBottle, FileText } from "lucide-react";

export default function Farmacia() {
  const farmaciaOptions = [
    {
      id: "farmacia-dispensacao",
      title: "Farmácia - Retirada de Medicamentos",
      description:
        "Dispensação de medicamentos prescritos e orientação farmacêutica sobre uso correto",
      icon: PillBottle,
      path: "/servicos/farmacia-dispensacao",
      colorScheme: "accent",
    },
    {
      id: "renovacao",
      title: "Renovação de Receitas",
      description: "Renovação de receitas de uso contínuo para medicamentos controlados",
      icon: FileText,
      path: "/servicos/renovacao",
      colorScheme: "primary",
    },
  ];

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Farmácia
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Escolha o serviço farmacêutico que você precisa
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {farmaciaOptions.map((option) => (
            <Card
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              href={option.path}
              colorScheme={option.colorScheme}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6 mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            Informações Gerais
          </h2>
          <div className="space-y-2 text-sm text-neutral-700">
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Horário da Farmácia:</strong> Segunda a sexta-feira, das 07h30 às 16h00
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Documentação:</strong> Sempre traga receita médica válida e documento com foto
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>
                <strong>Estoque:</strong> Consulte a disponibilidade de medicamentos no{" "}
                <a
                  href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline font-semibold"
                >
                  Portal da Prefeitura
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
