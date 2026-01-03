import { AlertCircle, Phone, ExternalLink, Package } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { contactInfo } from "../../config";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function FarmaciaDispensacao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

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

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Dispensação de Medicamentos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                  Medicamentos prescritos pelos profissionais da unidade,
                  conforme disponibilidade no estoque e protocolos
                  estabelecidos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre Uso Correto
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                  Fornecimento de informações sobre administração adequada de
                  medicamentos, posologia e cuidados necessários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Informações sobre Interações Medicamentosas
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                  Orientações sobre possíveis interações entre medicamentos e
                  efeitos colaterais, conforme protocolos farmacêuticos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
            Consulte o Estoque de Medicamentos
          </h2>

          <div className="hidden md:block bg-gradient-to-r from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow mb-6">
            <a
              href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-accent-700 transition-colors">
                  Portal da Prefeitura - Estoque de Medicamentos
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Verifique em tempo real a disponibilidade de medicamentos nas
                  farmácias municipais
                </p>
              </div>
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <a
            href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden block bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-xl p-4 hover:shadow-lg transition-shadow mb-6"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  Portal da Prefeitura
                </h3>
                <p className="text-sm text-neutral-700 mb-2">
                  Estoque de Medicamentos
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Verifique em tempo real a disponibilidade de medicamentos nas
                  farmácias municipais
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm">
                <span>Consultar Estoque</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>

          <div className="bg-white border border-neutral-200 rounded-lg shadow-md p-4">
            <p className="text-neutral-700 text-sm mb-2 leading-relaxed">
              Em caso de dúvidas, entre em contato:
            </p>
            <a
              href={`tel:${contactInfo.phones.pharmacy.tel}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors no-underline font-semibold text-sm"
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

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Documentação Necessária
          </h2>
          <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
            Para retirada de medicamentos, é obrigatória a apresentação da
            seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Receita Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                  Obrigatória para retirada de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                  Documento de identidade com foto e/ou Carteira de Habilitação
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 shadow-sm border border-green-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-2 text-base">
                Orientação Importante
              </h3>
              <p className="text-neutral-800 text-sm leading-relaxed">
                Traga sempre a receita médica original e válida.{" "}
                <Link
                  to="/servicos/renovacao#prazo-validade"
                  className="underline hover:text-green-700 transition-colors font-semibold text-green-900"
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
