import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import EscalaProfissionais from "../../components/services/EscalaProfissionais";
export default function Triagem() {
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
                Triagem de Enfermagem
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
        <CampanhasPaginaWrapper pagina="triagem" />
        {}
        <AvisosPaginaWrapper pagina="triagem" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5 text-sm" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
            Na Unidade básica de saúde do bairro São José<span className="text-base">,</span> o acolhimento e a triagem de enfermagem são etapas fundamentais do cuidado em saúde. Embora complementares<span className="text-base">,</span> cada uma possui um papel específico no atendimento ao usuário<span className="text-base">,</span> sempre com foco no respeito<span className="text-base">,</span> na escuta e na segurança clínica.
          </p>
          <p className="text-neutral-700 leading-relaxed mb-5 text-sm" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
            O objetivo é garantir que todas as pessoas sejam recebidas com atenção<span className="text-base">,</span> orientadas corretamente e avaliadas conforme suas necessidades<span className="text-base">,</span> assegurando prioridade aos casos que exigem maior urgência.
          </p>
          <div className="space-y-4 mb-5">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 pb-2 border-b border-neutral-200 text-sm">
                Acolhimento
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed mb-2" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                O acolhimento é o primeiro contato do usuário com a unidade. Neste momento<span className="text-base">,</span> a equipe realiza uma escuta qualificada<span className="text-base">,</span> compreendendo a queixa apresentada e orientando sobre o fluxo de atendimento disponível.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                Mais do que um procedimento<span className="text-base">,</span> o acolhimento é uma prática humanizada<span className="text-base">,</span> que valoriza o diálogo<span className="text-base">,</span> o respeito e o vínculo entre profissional e usuário.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 pb-2 border-b border-neutral-200 text-sm">
                Triagem de Enfermagem
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                A triagem de enfermagem é uma avaliação clínica inicial realizada por profissional de enfermagem capacitado. Seu objetivo é identificar sinais e sintomas<span className="text-base">,</span> avaliar a gravidade do quadro e definir a prioridade de atendimento conforme protocolos estabelecidos.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mt-2" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                A triagem não garante consulta médica imediata<span className="text-base">,</span> mas assegura que cada caso seja direcionado ao serviço mais adequado<span className="text-base">,</span> com segurança e responsabilidade.
              </p>
            </div>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
            <h3 className="font-semibold text-neutral-800 mb-3 pb-2 border-b border-neutral-200 text-sm">
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
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                      Verificação de pressão arterial<span className="text-base">,</span> temperatura corporal<span className="text-base">,</span> frequência cardíaca e respiratória<span className="text-base">,</span> conforme protocolos de enfermagem.
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
                <p className="text-sm text-neutral-700 leading-relaxed" style={{ letterSpacing: '0.02em', wordSpacing: '0.05em' }}>
                  Verificação de pressão arterial<span className="text-base">,</span> temperatura corporal<span className="text-base">,</span> frequência cardíaca e respiratória<span className="text-base">,</span> conforme protocolos de enfermagem.
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
        </InfoBox>
        {}
        <InfoBox title="Equipe Responsável e Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissional
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h00 às 08h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Darley Camargos - Técnico de Enfermagem
                  </td>
                </tr>
                <tr className="bg-info/10">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Noite (Saúde na Hora)
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    18h00 às 19h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Alessandra - Técnica de Enfermagem
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Manhã
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">07h00 às 08h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Darley Camargos</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnico de Enfermagem</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded">
                  Noite (Saúde na Hora)
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">18h00 às 19h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Alessandra</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnica de Enfermagem</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Escalas de Profissionais - Carregado do Firestore */}
        <EscalaProfissionais
          titulo="Profissionais Escalados na Triagem"
          department="tecnicoEnfermagem"
          workStation="Triagem"
        />

        {}
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
        {}
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
        {}
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
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF são obrigatórios para qualquer atendimento na unidade.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 pb-2 border-b border-neutral-200 text-sm">
                Consultas de Rotina
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                As consultas de rotina devem ser agendadas com antecedência,
                conforme disponibilidade de horários e necessidade clínica do
                usuário. O agendamento garante melhor organização do fluxo de
                atendimento e otimização do tempo de espera.
              </p>
            </div>
            <div className="bg-info/10 border border-info rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 pb-2 border-b border-neutral-200 text-sm">
                Atendimento Sob Demanda
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm mb-3">
                O atendimento sob demanda está disponível mediante triagem
                clínica inicial realizada:<br/>
                <strong>Período matutino </strong> de  07h00 às 08h00. <br/>
                <strong>Período noturno </strong>de 18h00 às 19h00.
              </p>
              <div className="bg-white border-l-4 border-info p-3 rounded-r">
                <p className="text-sm text-neutral-800 leading-relaxed">
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
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
              Antes de se dirigir à sala de triagem, é necessário passar pela
              recepção da unidade para realização da ficha de atendimento. Esta
              medida é essencial para agilizar o processo de atendimento e
              garantir a organização adequada do fluxo de pacientes na unidade.
            </p>
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
