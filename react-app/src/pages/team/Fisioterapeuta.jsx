import { Link } from "react-router-dom";
import { AlertCircle, Heart, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import fisioterapiaImg from "../../assets/fisioterapia/fisioterapia.png";
import { PageContainer } from "../../components/layout";

export default function Fisioterapeuta() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório de Fisioterapia
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            A Fisioterapia na ESF Catalão oferece tratamento e reabilitação
            física para pacientes com dificuldades de movimento, dores
            musculares e articulares, sequelas de acidentes ou doenças, e
            necessidades de recuperação funcional. Trabalhamos para melhorar sua
            qualidade de vida e independência nas atividades do dia a dia.
          </p>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Reabilitação física
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Recuperação de movimentos e força muscular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Tratamento de dores
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Dores na coluna, articulações e músculos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Exercícios terapêuticos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Fortalecimento e alongamento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações posturais
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prevenção de lesões e melhor ergonomia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Fisioterapia geriátrica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Cuidado especial para idosos
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        {/* Card Fisioterapia */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Fisioterapia na Atenção Primária
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Reabilitação e cuidado integral para recuperação funcional
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={fisioterapiaImg}
                alt="Fisioterapia na Atenção Primária - Atendimento"
                className="max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
                centered={true}
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              A fisioterapia na Atenção Primária à Saúde desempenha um papel fundamental na promoção da saúde, prevenção de agravos e reabilitação funcional dos usuários. Através de técnicas especializadas e acompanhamento individualizado, o fisioterapeuta trabalha para restaurar, desenvolver e conservar a capacidade física e funcional do paciente, contribuindo para maior autonomia, qualidade de vida e inclusão social. O atendimento contempla todas as faixas etárias, com foco em tratamentos não medicamentosos para dor, recuperação de movimentos e fortalecimento muscular.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Governo de Minas Gerais */}
              <a
                href="https://www.mg.gov.br/servico/solicitar-atendimento-ambulatorial-para-reabilitacao-fisica"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      Saiba Mais
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Consulte informações completas sobre atendimento ambulatorial para reabilitação física no portal do Governo de Minas Gerais.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                      <ExternalLink size={16} />
                      <span>Acessar Portal do Governo de MG</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com dores crônicas (coluna, joelhos, ombros)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes em recuperação pós-cirúrgica ou pós-trauma
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Idosos com dificuldades de mobilidade
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com sequelas de AVC ou outras condições neurológicas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com problemas respiratórios que necessitam de
                fisioterapia respiratória
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-4">
            <div className="relative pl-12 pb-8 border-l-2 border-blue-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                1
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Consulta Médica e Encaminhamento
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Solicite avaliação e encaminhamento para fisioterapia ao seu
                  médico
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>{" "}
                  com o encaminhamento médico. Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    documentação necessária para agendar
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                3
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Avaliação Inicial
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  A fisioterapeuta realizará a primeira avaliação e definirá o
                  plano de tratamento
                </p>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                4
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Comparecimento às Sessões
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Compareça às sessões conforme agendado, seguindo o plano de
                  tratamento estabelecido
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="mb-6">
          <Alert type="info">
            <div>
              <p className="mb-2">
                <strong>Dica Importante:</strong> Use roupas confortáveis e
                leves nas sessões de fisioterapia. Isso facilita a realização
                dos exercícios e procedimentos.
              </p>
              <p>
                <strong>Compromisso é fundamental!</strong> A fisioterapia
                funciona melhor quando você comparece regularmente às sessões e
                segue as orientações da fisioterapeuta em casa. Não desista do
                seu tratamento!
              </p>
            </div>
          </Alert>
        </div>
        {}
        <InfoBox title="Profissionais e Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <div className="overflow-hidden rounded-lg shadow-sm border border-primary-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Período
                    </th>
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Horário
                    </th>
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Profissionais Responsáveis
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm bg-white">
                  <tr className="hover:bg-primary-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <strong className="text-primary-900">Terça e Quinta-feira</strong>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      07h00 às 11h00
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      Luana<br/>
                      <span className="text-neutral-600 text-xs">Função: Fisioterapeuta</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-white/70 border border-primary-200 rounded-lg p-4 shadow-sm">
              <div className="mb-3">
                <span className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold px-3 py-1 rounded">
                  Terça e Quinta-feira
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-primary-200">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-primary-900">07h00 às 11h00</p>
                </div>
                <div className="pb-2 border-b border-primary-200">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Luana</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Fisioterapeuta</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
                Antes de se dirigir à sala de consulta da fisioterapeuta
                responsável, é necessário passar pela recepção da unidade para
                realização da ficha de atendimento. Esta medida é essencial para
                agilizar o processo de atendimento e garantir a organização
                adequada do fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="fisioterapeuta" />
      </div>
    </PageContainer>
  );
}
