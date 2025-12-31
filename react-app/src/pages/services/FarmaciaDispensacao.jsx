import { AlertCircle, Phone, ExternalLink, Package } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import { contactInfo } from "../../config";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function FarmaciaDispensacao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Farmácia - Retirada de Medicamentos
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="farmacia" />

        <AvisosPaginaWrapper pagina="farmacia" />

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Dispensação de Medicamentos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Medicamentos prescritos pelos profissionais da unidade,
                  conforme disponibilidade no estoque e protocolos
                  estabelecidos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre Uso Correto
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Fornecimento de informações sobre administração adequada de
                  medicamentos, posologia e cuidados necessários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Informações sobre Interações Medicamentosas
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Orientações sobre possíveis interações entre medicamentos e
                  efeitos colaterais, conforme protocolos farmacêuticos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consulte o Estoque */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Consulte o Estoque de Medicamentos
          </h2>

          {/* Desktop: Card horizontal */}
          <div className="hidden md:block bg-gradient-to-r from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-6 hover:shadow-lg transition-shadow mb-6">
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
            className="md:hidden block bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-6 hover:shadow-lg transition-shadow mb-6"
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

          {/* Contato da Farmácia */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="text-neutral-700 text-sm mb-2">Em caso de dúvidas, entre em contato:</p>
            <a
              href={`tel:${contactInfo.phones.pharmacy.tel}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors no-underline font-semibold"
            >
              <Phone size={18} />
              <span>{contactInfo.phones.pharmacy.display}</span>
            </a>
          </div>
        </div>


        <EscalaFirestore
          escalaKey="farmacia"
          titulo="Profissionais Escalados na Farmácia"
        />

        <InfoBox title="Documentação Necessária" highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para retirada de medicamentos, é obrigatória a apresentação da
            seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Receita Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória para retirada de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
                Traga sempre a receita médica original e válida.{" "}
                <Link
                  to="/servicos/renovacao#prazo-validade"
                  className="underline hover:text-white transition-colors font-semibold"
                >
                  Consulte os prazos de validade das receitas
                </Link>{" "}
                para garantir a dispensação adequada dos seus medicamentos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="farmacia" />
      </div>
    </PageContainer>
  );
}
