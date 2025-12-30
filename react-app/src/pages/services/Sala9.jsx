import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import EscalaPorSala from "../../components/services/EscalaPorSala";
export default function Sala9() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-4 md:p-6 mb-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-full min-w-0">
              <h1
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-neutral-900 leading-tight"
              >
                Sala de Atendimento Administrativo
              </h1>
              <p
                className="text-neutral-500 text-xs mt-1"
              >
                Estratégia Saúde da Família Bela Vista - Catalão - São José
              </p>
            </div>
          </div>
        </div>
        {}
        <CampanhasPaginaWrapper pagina="sala-9" />
        {}
        <AvisosPaginaWrapper pagina="sala-9" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 mb-4 text-sm">
            Este setor é responsável por:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consulta de Posição na Fila do SUS
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Verificação da posição na fila para consultas especializadas e
                  exames
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Retirada de Encaminhamentos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Retirada de encaminhamentos para médicos especialistas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Retirada de Guias
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Retirada de guias para exames especializados (ultrassom,
                  tomografia, entre outros)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Informações sobre Prazos
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Fornecimento de informações sobre prazos e andamento de
                  solicitações
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre o Processo de Regulação
                </strong>
                <p className="text-sm text-neutral-600 mt-0.5">
                  Esclarecimentos sobre o processo de regulação do SUS
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Horários de Atendimento ao Público */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-md mb-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Horários de Atendimento ao Público
          </h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <p className="text-sm text-white/90 mb-3">
              O atendimento ao público é realizado nos seguintes dias e horários:
            </p>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="font-semibold mb-2">Dias de Atendimento:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Segunda-feira</span>
                  <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Quarta-feira</span>
                  <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Sexta-feira</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-xs text-white/80 mb-1">Turno da Manhã</div>
                  <div className="text-xl font-bold">07:00 às 12:00</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-xs text-white/80 mb-1">Turno da Tarde</div>
                  <div className="text-xl font-bold">13:00 às 16:30</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-white/80 italic">
            * Horários sujeitos a alterações. Em caso de dúvidas, entre em contato com a unidade.
          </div>
        </div>

        {}
        <InfoBox title="Documentos Necessários" highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento neste setor, é obrigatória a apresentação da
            seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
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
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
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
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF são obrigatórios para qualquer atendimento na unidade.
            </Alert>
          </div>
        </InfoBox>

        <EscalaPorSala
          titulo="Profissionais Escalados na Sala de Atendimento Administrativo"
          escalaKey="administrativo"
        />

        {}
          <div className="mt-4">
            <Alert type="warning">
              <strong>Lembre-se:</strong> A equipe deste setor monitora o
              sistema diariamente. Assim que sua vaga for liberada pelo Estado,
              entraremos em contato via WhatsApp ou ligação telefônica. Mantenha
              seu telefone celular atualizado e fique atento às chamadas e
              mensagens!
            </Alert>
          </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="sala-9" />
      </div>
    </PageContainer>
  );
}
