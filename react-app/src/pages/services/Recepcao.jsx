import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import EscalaSemanal from "../../components/services/EscalaSemanal";

export default function Recepcao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Recepção
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="recepcao" />

        <AvisosPaginaWrapper pagina="recepcao" />

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed text-sm">
            A recepção é o setor responsável pelo primeiro atendimento ao usuário
            na unidade, realizando o direcionamento adequado aos serviços de saúde
            disponíveis e fornecendo informações sobre o funcionamento da unidade,
            conforme protocolos e normativas estabelecidas.
          </p>
        </div>

        <EscalaSemanal
          titulo="Profissionais Escalados na Recepção"
          escalaKey="recepcao"
        />

        {/* Preciso passar na recepção antes? */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 shadow-sm border border-green-200 mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            Preciso passar na recepção antes?
          </h2>
          <p className="text-neutral-700 mb-4 text-sm">
            Sim. A recepção realiza o direcionamento para os seguintes serviços:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas Agendadas
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Confirmação de presença e conferência de documentos antes de
                  se dirigir ao consultório.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Vacinação e Medicação
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  É necessário passar pela recepção para realizar a ficha de
                  atendimento antes de se dirigir à sala de procedimentos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Exame de Eletrocardiograma
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Realização do cadastro inicial antes do exame.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Curativos</strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  É necessário passar pela recepção para realizar a ficha de
                  atendimento antes de se dirigir à sala de curativos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* O que você pode retirar aqui? */}
        <InfoBox title="O que você pode retirar aqui?">
          <p className="text-neutral-700 mb-4 text-sm">
            Para agilizar o atendimento, alguns documentos ficam disponíveis
            diretamente na recepção, sem necessidade de aguardar na Sala de Agendamentos ou
            na Sala de atendimento administrativo.
          </p>
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm w-1/2">
                    Documento
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Receitas Renovadas
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Receitas de uso contínuo que foram deixadas para renovação e
                    já estão prontas para retirada.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Guias de Encaminhamento
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Encaminhamentos ou guias que não necessitam de assinatura do
                    usuário.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Resultados de Exames
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Retirada de resultados de exames e informações sobre a
                    disponibilidade dos resultados.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <strong className="text-neutral-800 text-sm">
                  Receitas Renovadas
                </strong>
              </div>
              <div className="pt-1">
                <p className="text-sm text-neutral-700">
                  Receitas de uso contínuo que foram deixadas para renovação e
                  já estão prontas para retirada.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <strong className="text-neutral-800 text-sm">
                  Guias de Encaminhamento
                </strong>
              </div>
              <div className="pt-1">
                <p className="text-sm text-neutral-700">
                  Encaminhamentos ou guias que não necessitam de assinatura do
                  usuário.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <strong className="text-neutral-800 text-sm">
                  Resultados de Exames
                </strong>
              </div>
              <div className="pt-1">
                <p className="text-sm text-neutral-700">
                  Retirada de resultados de exames e informações sobre a
                  disponibilidade dos resultados.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Documentos Necessários */}
        <InfoBox
          title="Documentos Necessários para Retirar Receitas Renovadas e Exames"
          highlight={true}
        >
          <p className="text-neutral-700 mb-4 text-sm">
            Para retirar receitas renovadas e exames na recepção, é obrigatório
            apresentar:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Protocolo de Entrega
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatório para retirada de resultados de exames
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação Original do Titular com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação original do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento físico original ou número do CPF do titular
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="info">
              <strong>Importante:</strong> Sem a apresentação desses documentos,
              não será possível retirar receitas renovadas ou exames na
              recepção.
            </Alert>
          </div>
        </InfoBox>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="recepcao" />
      </div>
    </PageContainer>
  );
}
