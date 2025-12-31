import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import BackButton from "../../components/common/BackButton";
import { PillBottle, FileText, Package, ExternalLink } from "lucide-react";

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
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
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

        {/* Consulte o Estoque */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">
            Consulte o Estoque de Medicamentos
          </h2>

          {/* Desktop: Card horizontal */}
          <div className="hidden md:block bg-gradient-to-r from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <a
              href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-accent-700 transition-colors">
                  Portal da Prefeitura - Estoque de Medicamentos
                </h3>
                <p className="text-neutral-700">
                  Verifique em tempo real a disponibilidade de medicamentos nas farmácias municipais
                </p>
              </div>
              <ExternalLink className="w-6 h-6 text-accent-600 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile: Card vertical */}
          <a
            href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden block bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Portal da Prefeitura
                </h3>
                <p className="text-sm text-neutral-700 mb-3">
                  Estoque de Medicamentos
                </p>
                <p className="text-xs text-neutral-600">
                  Verifique em tempo real a disponibilidade de medicamentos nas farmácias municipais
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm">
                <span>Consultar Estoque</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        {/* Informações Gerais */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6 mt-8 max-w-4xl mx-auto">
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
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
