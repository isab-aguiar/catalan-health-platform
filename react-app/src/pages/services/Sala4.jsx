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
import EscalaPorSala from "../../components/services/EscalaPorSala";
export default function Sala4() {
  useScrollToHash();

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900 whitespace-nowrap"
              >
                Sala de Agendamentos
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
        <CampanhasPaginaWrapper pagina="sala-4" />
        {}
        <AvisosPaginaWrapper pagina="sala-4" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            Este setor da Unidade Básica de Saúde São José é responsável pelo
            gerenciamento e organização dos agendamentos de consultas médicas,
            consultas de enfermagem, exames laboratoriais, exames de imagem e
            procedimentos diversos. O serviço atua como central de agendamento,
            garantindo o acesso organizado aos serviços de saúde disponíveis na
            unidade e na rede de atenção à saúde.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div id="puericultura" className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Consultas
              </h3>
              <p className="text-sm text-neutral-600">
                Agendamento de consultas médicas e de enfermagem conforme
                disponibilidade de horários e necessidade clínica do usuário.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Exames
              </h3>
              <p className="text-sm text-neutral-600">
                Agendamento de exames laboratoriais e de imagem mediante
                apresentação de prescrição médica válida ou pedido de exame
                original emitido pelo médico assistente.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Procedimentos
              </h3>
              <p className="text-sm text-neutral-600">
                Confirmação e remarcação de procedimentos diversos conforme
                protocolos estabelecidos pela unidade.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Orientações
              </h3>
              <p className="text-sm text-neutral-600">
                Fornecimento de orientações sobre preparo para exames e
                procedimentos, conforme protocolos estabelecidos.
              </p>
            </div>
          </div>
          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
              SUS Fácil
            </h3>
            <p className="text-sm text-neutral-600 mb-2">
              Este setor realiza a entrada de usuários na fila do SUS Fácil para
              agendamento de exames, consultas especializadas e cirurgias. É
              necessário apresentar documentação completa para protocolização.
            </p>
            <p className="text-xs text-neutral-500 italic">
              Nota: O acompanhamento da posição na fila é realizado na  Sala de atendimento Administrativo.
            </p>
          </div>
        </InfoBox>
        {}
        <DocumentacaoPorServico />
        {}
        <InfoBox title="Como agendar?">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Atendimento Presencial
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                O agendamento é realizado exclusivamente de forma presencial,
                durante os horários de funcionamento estabelecidos. O usuário
                deve comparecer à unidade com a documentação necessária conforme
                o tipo de serviço solicitado.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Orientações para Agendamento
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Compareça com antecedência aos horários de atendimento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Apresente toda a documentação necessária conforme o serviço
                    solicitado
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Para exames, traga sempre o pedido médico original e válido.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </InfoBox>

        <EscalaPorSala
          titulo="Profissionais Escalados na Sala de Agendamentos"
          escalaKey="sala-agendamentos"
        />

        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
              Para otimizar o atendimento e garantir a organização adequada do
              fluxo de pacientes, é fundamental que o usuário compareça com toda
              a documentação necessária conforme o tipo de serviço solicitado. A
              falta de documentação pode resultar na impossibilidade de
              realização do agendamento.
            </p>
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
