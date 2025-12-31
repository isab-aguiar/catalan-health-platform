import { AlertCircle, FileText } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import InfoBox from "../../components/common/InfoBox";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Triagem() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Triagem de Enfermagem
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="triagem" />

        <AvisosPaginaWrapper pagina="triagem" />

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
            Na Unidade básica de saúde do bairro São José, o acolhimento e a triagem de enfermagem são etapas fundamentais do cuidado em saúde. Embora complementares, cada uma possui um papel específico no atendimento ao usuário, sempre com foco no respeito, na escuta e na segurança clínica.
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
            O objetivo é garantir que todas as pessoas sejam recebidas com atenção, orientadas corretamente e avaliadas conforme suas necessidades, assegurando prioridade aos casos que exigem maior urgência.
          </p>
          <div className="space-y-4 mb-5">
            <div className="bg-white/70 border border-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Acolhimento
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed mb-2">
                O acolhimento é o primeiro contato do usuário com a unidade. Neste momento, a equipe realiza uma escuta qualificada, compreendendo a queixa apresentada e orientando sobre o fluxo de atendimento disponível.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Mais do que um procedimento, o acolhimento é uma prática humanizada, que valoriza o diálogo, o respeito e o vínculo entre profissional e usuário.
              </p>
            </div>
            <div className="bg-white/70 border border-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Triagem de Enfermagem
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                A triagem de enfermagem é uma avaliação clínica inicial realizada por profissional de enfermagem capacitado. Seu objetivo é identificar sinais e sintomas, avaliar a gravidade do quadro e definir a prioridade de atendimento conforme protocolos estabelecidos.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mt-2">
                A triagem não garante consulta médica imediata, mas assegura que cada caso seja direcionado ao serviço mais adequado, com segurança e responsabilidade.
              </p>
            </div>
          </div>
          <div className="bg-white/70 border border-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
              Procedimentos Realizados na Triagem
            </h3>

            {/* Versão Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border border-neutral-300">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm w-1/3 whitespace-nowrap">
                      Procedimento
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white">
                    <td className="border border-neutral-300 px-4 py-3 whitespace-nowrap">
                      <strong className="text-neutral-800">Avaliação de Sinais Vitais</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                      Verificação de pressão arterial, temperatura corporal, frequência cardíaca e respiratória, conforme protocolos de enfermagem.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-neutral-300 px-4 py-3 whitespace-nowrap">
                      <strong className="text-neutral-800">Aferição de Peso e Altura</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                      Medição para atualização do prontuário e cálculo de indicadores quando necessário.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-neutral-300 px-4 py-3 whitespace-nowrap">
                      <strong className="text-neutral-800">Avaliação Clínica Inicial</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                      Análise dos sintomas apresentados para definição da prioridade e do encaminhamento adequado.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Versão Mobile */}
            <div className="md:hidden space-y-4">
              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-neutral-800 text-sm">Avaliação de Sinais Vitais</h4>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Verificação de pressão arterial, temperatura corporal, frequência cardíaca e respiratória, conforme protocolos de enfermagem.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-neutral-800 text-sm">Aferição de Peso e Altura</h4>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Medição para atualização do prontuário e cálculo de indicadores quando necessário.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-neutral-800 text-sm">Avaliação Clínica Inicial</h4>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Análise dos sintomas apresentados para definição da prioridade e do encaminhamento adequado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="triagem"
          titulo="Profissionais Escalados no Acolhimento e Triagem"
        />

        {/* Para quem é indicado */}
        <InfoBox title="Para quem é indicado">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-neutral-700 text-sm">
                  Pacientes sem agendamento prévio
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-neutral-700 text-sm">
                  Casos que necessitam de avaliação imediata
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-neutral-700 text-sm">
                  Pacientes com sintomas agudos como febre, dor ou mal-estar
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Como ter acesso */}
        <InfoBox title="Como ter acesso">
          <div className="space-y-4">
            <div>
              <p className="text-neutral-700 text-sm mb-2">
                <strong>Compareça à unidade no horário da triagem</strong>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Dirija-se à recepção para realização da ficha de atendimento
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Aguarde ser chamado conforme ordem de chegada
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Explique sua queixa de forma clara ao profissional de enfermagem
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-neutral-700 text-sm">
                Após a avaliação, receba o encaminhamento conforme a necessidade identificada
              </p>
            </div>
          </div>
        </InfoBox>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento na triagem, é obrigatória a apresentação da
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
        </InfoBox>

        {/* Modalidades de Atendimento */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Modalidades de Atendimento
          </h2>
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Consultas de Rotina
              </h3>
              <p className="text-neutral-900 leading-relaxed text-sm">
                As consultas de rotina devem ser agendadas com antecedência,
                conforme disponibilidade de horários e necessidade clínica do
                usuário. O agendamento garante melhor organização do fluxo de
                atendimento e otimização do tempo de espera.
              </p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm">
                Atendimento Sob Demanda
              </h3>
              <p className="text-neutral-900 leading-relaxed text-sm mb-3">
                O atendimento sob demanda está disponível mediante triagem
                clínica inicial realizada:
              </p>
              <ul className="list-disc list-inside text-sm text-neutral-900 mb-3 space-y-1">
                <li><strong>Período matutino</strong> de 07h00 às 08h00</li>
                <li><strong>Período noturno</strong> de 18h00 às 19h00</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r">
                <p className="text-sm text-neutral-900 leading-relaxed">
                  <strong>Como funciona a Triagem:</strong> A triagem é uma
                  avaliação clínica inicial realizada por profissional de
                  enfermagem qualificado. Este procedimento não garante consulta
                  médica imediata, mas avalia a necessidade e prioridade do
                  atendimento. Conforme a necessidade identificada na triagem, o
                  usuário será encaminhado para a enfermeira responsável ou para
                  o médico da área correspondente, conforme protocolos
                  estabelecidos pela unidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
                Antes de se dirigir à sala de triagem, é necessário passar pela
                recepção da unidade para realização da ficha de atendimento. Esta
                medida é essencial para agilizar o processo de atendimento e
                garantir a organização adequada do fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="triagem" />
      </div>
    </PageContainer>
  );
}
