import { Link } from "react-router-dom";
import { AlertCircle, Heart, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import ginecologiaImg from "../../assets/ginecologista/ilustracao-de-consulta-de-ginecologia.avif";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Ginecologista() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Ginecologia e Obstetrícia
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
            O atendimento de ginecologia e obstetrícia oferece cuidado integral à
            saúde feminina em todas as fases da vida. Realizamos consultas
            ginecológicas, acompanhamento pré-natal intercalado com enfermagem,
            inserção e retirada de DIU de cobre, e planejamento familiar.
          </p>
          <div className="bg-blue-100/50 border border-blue-300 rounded-lg p-4 mb-5">
            <p className="text-neutral-700 text-sm leading-relaxed">
              Para informações sobre a documentação necessária para acesso aos serviços oferecidos, favor consultar a{" "}
              <Link
                to="/servicos/sala-4#documentacao-necessaria"
                className="text-blue-700 hover:text-blue-900 underline font-semibold"
              >
                Sala de Agendamentos
              </Link>
              .
            </p>
          </div>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas Ginecológicas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação e acompanhamento da saúde íntima feminina
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Inserção e Retirada de DIU de Cobre
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procedimento de planejamento familiar. Consulte a documentação
                  necessária na{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-700 hover:text-blue-900 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Pré-natal Intercalado
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento da gestante em consultas intercaladas entre
                  ginecologista e enfermagem, conforme cronograma estabelecido
                  pelo Ministério da Saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Planejamento Familiar
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientação sobre métodos contraceptivos e saúde reprodutiva
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        {/* Card Cuidado Integral à Saúde Feminina */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Cuidado Integral à Saúde Feminina
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Atendimento especializado para mulheres em todas as fases da vida
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={ginecologiaImg}
                alt="Cuidado Integral à Saúde Feminina - Ginecologia e Obstetrícia"
                credit="Ministério da Saúde"
                creditPosition="below"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm mx-auto"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              O cuidado integral à saúde feminina é fundamental para garantir o bem-estar e a qualidade de vida da mulher em todas as etapas da vida. Através do atendimento ginecológico e obstétrico, oferecemos acompanhamento desde a adolescência até a menopausa, incluindo consultas de rotina, prevenção de doenças, acompanhamento pré-natal, planejamento familiar e orientações sobre saúde reprodutiva. Este cuidado permite identificar precocemente possíveis alterações, promover hábitos saudáveis e intervir de forma adequada, contribuindo para uma vida saudável e com melhor qualidade de vida.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Ministério da Saúde */}
              <a
                href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher"
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
                      Consulte informações completas sobre saúde da mulher no site oficial do Ministério da Saúde.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                      <ExternalLink size={16} />
                      <span>Acessar Site do Ministério da Saúde</span>
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
                Mulheres que iniciaram vida sexual (consultas anuais de rotina)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Gestantes para acompanhamento pré-natal
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres de 25 a 64 anos (preventivo de câncer de colo uterino)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres em climatério ou menopausa
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres que necessitam de planejamento familiar
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <EscalaFirestore
          escalaKey="sala-atendimento-ginecologico"
          titulo="Profissionais Escalados no Consultório Ginecológico/Obstétrico"
        />
        {}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-4">
            <div className="relative pl-12 pb-8 border-l-2 border-blue-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                1
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Inserção e Retirada de DIU de Cobre
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  O acesso ocorre mediante avaliação clínica e encaminhamento pela enfermeira ou pelo médico da unidade. Após o encaminhamento, dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>{" "}
                  para realizar a marcação do procedimento.
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Consulta com Ginecologista (com encaminhamento)
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  O encaminhamento é realizado pela enfermeira ou pelo médico da unidade, conforme avaliação clínica. Após o encaminhamento, dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>{" "}
                  para realizar a marcação da consulta.
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                3
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Agendamento de Retorno em Ginecologia (sem novo encaminhamento)
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Para usuárias em acompanhamento ginecológico em retorno na unidade. Dirija-se diretamente à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>{" "}
                  para realizar a marcação da consulta, sem necessidade de novo encaminhamento.
                </p>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                4
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Pré-natal
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  O acompanhamento é realizado de forma intercalada entre enfermeira e médico. A primeira consulta é obrigatoriamente realizada pela enfermeira, que fará a avaliação inicial e os encaminhamentos necessários para a continuidade do cuidado.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Cronograma de Pré-natal">
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            O acompanhamento pré-natal segue protocolo estabelecido pelo
            Ministério da Saúde, com consultas intercaladas entre ginecologista
            e enfermagem para garantir o cuidado integral da gestante.
          </p>

          <div className="mb-5">
            <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
              Distribuição das Consultas
            </h3>
            <div className="space-y-2">
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">1ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">2ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">3ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">4ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">5ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">6ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">7ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">8ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-neutral-50 border-l-4 border-neutral-400 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-neutral-900">Demais consultas:</strong> Continuam intercaladas entre
                  Ginecologista e Enfermagem conforme demanda e necessidade clínica
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-neutral-800 mb-2 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600" />
              Avaliação de Risco Gestacional
            </h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>
                <strong className="text-amber-900">Gestação de Risco Habitual (baixo risco):</strong>{" "}
                Acompanhamento realizado integralmente na ESF (Estratégia Saúde da Família),
                com consultas intercaladas entre ginecologista e enfermagem.
              </p>
              <p>
                <strong className="text-amber-900">Gestação de Alto Risco:</strong>{" "}
                Gestante é encaminhada para acompanhamento especializado no PNAR
                (Pré-Natal de Alto Risco), mas <strong>continua sendo acompanhada
                também na ESF</strong> para cuidado integral e coordenado.
              </p>
            </div>
          </div>

          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <p className="text-sm text-neutral-700">
              <strong className="text-blue-900">Importante:</strong> O padrão de intercalação é:
              1ª consulta com Enfermagem, 2ª com Ginecologista, e assim sucessivamente,
              garantindo o acompanhamento completo e contínuo durante toda a gestação.
            </p>
          </div>
        </InfoBox>
        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
                Antes de se dirigir à sala de consulta do ginecologista
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
        <RecommendedReadingCarousel pageId="ginecologista" />
      </div>
    </PageContainer>
  );
}
