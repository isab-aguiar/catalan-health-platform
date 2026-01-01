import { AlertCircle, FileText } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import InfoBox from "../../components/common/InfoBox";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Sala9() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Atendimento Administrativo
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="sala-9" />

        <AvisosPaginaWrapper pagina="sala-9" />

        {/* Sobre o Serviço */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Serviço
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              Este setor é responsável por:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Consulta de Posição na Fila do SUS
                  </strong>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Verificação da posição na fila para consultas especializadas e
                    exames
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Retirada de Encaminhamentos
                  </strong>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Retirada de encaminhamentos para médicos especialistas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Retirada de Guias
                  </strong>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Retirada de guias para exames especializados (ultrassom,
                    tomografia, entre outros)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Informações sobre Prazos
                  </strong>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Fornecimento de informações sobre prazos e andamento de
                    solicitações
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 text-sm">
                    Orientações sobre o Processo de Regulação
                  </strong>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Esclarecimentos sobre o processo de regulação do SUS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentos Necessários */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Documentos Necessários
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              Para atendimento neste setor, é obrigatória a apresentação da
              seguinte documentação:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Documento de Identificação com Foto
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Documento de identidade com foto e/ou Carteira de Habilitação do titular
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
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
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Número do Protocolo
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Se você tiver recebido ao solicitar o encaminhamento
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 shadow-sm border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 mb-2 text-base">Normativa</h3>
                    <p className="text-neutral-800 text-sm leading-relaxed">
                      Documento de identificação com foto e CPF são obrigatórios para qualquer atendimento na unidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="sala-administrativa"
          titulo="Profissionais Escalados na Sala Administrativa"
        />

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-2 text-base">Lembre-se</h3>
              <p className="text-neutral-800 text-sm leading-relaxed">
                A equipe deste setor monitora o sistema diariamente. Assim que sua vaga for liberada pelo Estado, entraremos em contato via WhatsApp ou ligação telefônica. Mantenha seu telefone celular atualizado e fique atento às chamadas e mensagens!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="sala-9" />
      </div>
    </PageContainer>
  );
}
