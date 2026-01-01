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
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Farmácia
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Serviços farmacêuticos para a comunidade
          </p>
        </div>

        {/* Seção de Serviços */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Serviços Disponíveis
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              Escolha o serviço farmacêutico que você precisa
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid sm:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Consulte o Estoque */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Consulte o Estoque de Medicamentos
                </h2>
                <p className="text-neutral-600 text-sm mt-1">
                  Verificação em tempo real
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Desktop: Card horizontal */}
            <div className="hidden md:block bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <a
                href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors">
                    Portal da Prefeitura - Estoque de Medicamentos
                  </h3>
                  <p className="text-neutral-700 text-sm">
                    Verifique em tempo real a disponibilidade de medicamentos nas farmácias municipais
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile: Card vertical */}
            <a
              href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden block bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
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
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  <span>Consultar Estoque</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Informações Gerais */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Informações Gerais
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">Horário da Farmácia:</strong>
                <p className="text-sm text-neutral-700 leading-relaxed mt-0.5">
                  Segunda a sexta-feira, das 07h30 às 16h00
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">Documentação:</strong>
                <p className="text-sm text-neutral-700 leading-relaxed mt-0.5">
                  Sempre traga receita médica válida e documento com foto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
