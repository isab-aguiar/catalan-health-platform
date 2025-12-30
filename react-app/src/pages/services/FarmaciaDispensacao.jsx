import { AlertCircle, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import { contactInfo } from "../../config";
import EscalaPorSala from "../../components/services/EscalaPorSala";

export default function FarmaciaDispensacao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900"
              >
                Farmácia - Retirada de Medicamentos
              </h1>
              <p
                className="text-neutral-500 text-xs mt-1"
              >
                Estratégia Saúde da Família Bela Vista - Catalão - São José
              </p>
            </div>
          </div>
        </div>

        <CampanhasPaginaWrapper pagina="farmacia" />

        <AvisosPaginaWrapper pagina="farmacia" />

        <InfoBox title="Sobre o Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
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
            <div className="flex items-start gap-3">
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
            <div className="flex items-start gap-3">
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
        </InfoBox>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ExternalLink size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                Consulte o Estoque de Medicamentos
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Para verificar a disponibilidade de medicamentos nas farmácias municipais de Divinópolis,
                acesse o portal oficial da Prefeitura. O sistema apresenta informações atualizadas sobre
                o estoque disponível em todas as unidades de saúde do município.
              </p>
              <a
                href="https://www.divinopolis.mg.gov.br/portal/servicos/1074/estoque-de-medicamentos-das-farmacias-municipais/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-md hover:bg-neutral-50 transition-colors shadow-sm"
              >
                <ExternalLink size={18} />
                Acessar Portal de Consulta
              </a>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/90 text-sm mb-2">Em caso de dúvidas, entre em contato:</p>
                <a
                  href={`tel:${contactInfo.phones.pharmacy.tel}`}
                  className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors no-underline"
                >
                  <Phone size={18} />
                  <span className="font-semibold">{contactInfo.phones.pharmacy.display}</span>
                </a>
              </div>
            </div>
          </div>
        </div>


        <EscalaPorSala
          titulo="Profissionais Escalados na Farmácia"
          escalaKey="farmacia"
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

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
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

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="farmacia" />
      </div>
    </PageContainer>
  );
}
