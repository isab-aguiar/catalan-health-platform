import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import DocumentacaoPorServico from "../../components/services/DocumentacaoPorServico";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import useScrollToHash from "../../hooks/useScrollToHash";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Sala4() {
  useScrollToHash();

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Sala de Agendamentos
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="sala-4" />

        <AvisosPaginaWrapper pagina="sala-4" />

        {/* Sobre o Serviço */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Serviço
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 text-sm leading-relaxed mb-5">
              Este setor da Unidade Básica de Saúde São José é responsável pelo
              gerenciamento e organização dos agendamentos de consultas médicas,
              consultas de enfermagem, exames laboratoriais, exames de imagem e
              procedimentos diversos. O serviço atua como central de agendamento,
              garantindo o acesso organizado aos serviços de saúde disponíveis na
              unidade e na rede de atenção à saúde.
            </p>

            <h3 className="font-bold text-blue-900 mb-4 text-base">
              Serviços Oferecidos:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div id="puericultura" className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Consultas
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Agendamento de consultas médicas e de enfermagem conforme
                  disponibilidade de horários e necessidade clínica do usuário.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Exames
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Agendamento de exames laboratoriais e de imagem mediante
                  apresentação de prescrição médica válida ou pedido de exame
                  original emitido pelo médico assistente.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Procedimentos
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Confirmação e remarcação de procedimentos diversos conforme
                  protocolos estabelecidos pela unidade.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Orientações
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Fornecimento de orientações sobre preparo para exames e
                  procedimentos, conforme protocolos estabelecidos.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-2 text-base">
                    SUS Fácil
                  </h3>
                  <p className="text-neutral-800 text-sm leading-relaxed mb-2">
                    Este setor realiza a entrada de usuários na fila do SUS Fácil para
                    agendamento de exames, consultas especializadas e cirurgias. É
                    necessário apresentar documentação completa para protocolização.
                  </p>
                  <p className="text-xs text-neutral-700 italic">
                    Nota: O acompanhamento da posição na fila é realizado na Sala de atendimento Administrativo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DocumentacaoPorServico />

        {/* Como Agendar */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Como Agendar
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-2 text-base">
                    Atendimento Presencial
                  </h3>
                  <p className="text-neutral-800 text-sm leading-relaxed">
                    O agendamento é realizado exclusivamente de forma presencial,
                    durante os horários de funcionamento estabelecidos. O usuário
                    deve comparecer à unidade com a documentação necessária conforme
                    o tipo de serviço solicitado.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-blue-900 mb-3 text-base">
              Orientações para Agendamento
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-neutral-700 text-sm leading-relaxed">
                  Compareça com antecedência aos horários de atendimento
                </span>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-neutral-700 text-sm leading-relaxed">
                  Apresente toda a documentação necessária conforme o serviço
                  solicitado
                </span>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-neutral-700 text-sm leading-relaxed">
                  Para exames, traga sempre o pedido médico original e válido.
                </span>
              </div>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="sala-agendamentos"
          titulo="Profissionais Escalados na Sala de Agendamentos"
        />

        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
                Para otimizar o atendimento e garantir a organização adequada do
                fluxo de pacientes, é fundamental que o usuário compareça com toda
                a documentação necessária conforme o tipo de serviço solicitado. A
                falta de documentação pode resultar na impossibilidade de
                realização do agendamento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="sala-4" />
      </div>
    </PageContainer>
  );
}
