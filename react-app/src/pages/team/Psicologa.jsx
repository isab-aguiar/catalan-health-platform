import { Link } from "react-router-dom";
import { AlertCircle, Brain, Heart } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import psicologiaImg from "../../assets/bolsa-familia/psicologia.jpg";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Psicologa() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 break-words"
              >
                Atendimento Psicológico
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
        <InfoBox title="Sobre o Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acolhimento e Escuta Qualificada
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento individual breve para compreensão da queixa, suporte emocional imediato e orientação.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Grupos Terapêuticos e Educativos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Rodas de conversa e atividades coletivas focadas em ansiedade, convivência comunitária e promoção de saúde.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Apoio à Família
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientações para familiares e cuidadores sobre como lidar com questões de saúde mental no domicílio.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Triagem e Encaminhamento
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação da necessidade de tratamento especializado e, quando necessário, direcionamento para a rede de apoio (CAPS, Ambulatório de Saúde Mental, Assistência Social).
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        {/* Card Assistência Psicológica */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Brain size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Psicologia na Atenção Primária à Saúde
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Cuidado integral, acolhimento humanizado e promoção de saúde mental
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <img
                src={psicologiaImg}
                alt="Atendimento psicológico - Psicóloga em sessão com paciente"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              A Psicologia na Atenção Primária à Saúde desempenha um papel
              fundamental na promoção, prevenção e tratamento de questões
              relacionadas à saúde mental e ao bem-estar emocional da população.
              Integrada às Equipes de Saúde da Família, a psicóloga atua de forma
              interdisciplinar, oferecendo atendimento clínico individual e em
              grupo, intervenções em crise, avaliações psicológicas, orientações,
              apoio às famílias e articulação com a rede de saúde mental. O
              atendimento psicológico é pautado em evidências científicas, ética
              profissional, sigilo absoluto e respeito à singularidade de cada
              pessoa. Reconhecemos que a saúde mental é tão importante quanto a
              saúde física, e que cuidar das emoções é um direito de todos,
              garantido pelo Sistema Único de Saúde (SUS).
            </p>
          </div>
        </div>
        {}
        <EscalaFirestore
          escalaKey="consultorio-psicologico"
          titulo="Profissionais Escalados no Consultório Psicológico"
        />
        {}
        <InfoBox title="Público-alvo">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com ansiedade, depressão, transtorno de pânico,
                fobias, transtorno obsessivo-compulsivo (TOC) e outros
                transtornos mentais
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários em situação de crise emocional, ideação suicida ou
                tentativa de suicídio
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas que enfrentam luto, perdas significativas, divórcio,
                desemprego ou mudanças traumáticas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com dificuldades de relacionamento (familiar,
                conjugal, social, profissional)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Vítimas de violência doméstica, sexual, psicológica,
                negligência ou abuso
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários com problemas relacionados ao uso de álcool, drogas
                ou outras dependências
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças e adolescentes com dificuldades emocionais,
                comportamentais, escolares ou de desenvolvimento
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com doenças crônicas, condições incapacitantes ou
                em tratamentos prolongados que necessitam de apoio emocional
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Famílias e cuidadores de pessoas com transtornos mentais,
                deficiências ou doenças graves
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Qualquer pessoa que deseje melhorar seu bem-estar emocional,
                autoconhecimento, autoestima e qualidade de vida
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
                  Agendamento na Sala de Agendamentos
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  {" "}para agendamento de consulta psicológica. Não esqueça de
                  consultar os{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    documentos necessários
                  </Link>
                  {" "}antes de comparecer.
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-purple-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Encaminhamento por Outros Profissionais
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Médicos, enfermeiros, assistente social e outros
                  profissionais da equipe podem encaminhar pacientes para
                  atendimento psicológico quando identificarem necessidade.
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                3
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Demanda Espontânea e Acolhimento
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Em situações de crise ou urgência emocional, procure
                  diretamente a unidade de saúde para acolhimento imediato.
                </p>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                4
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Comparecimento às Sessões
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Apresentar-se no horário agendado com documentação completa
                  e, quando houver, encaminhamento médico. A continuidade do
                  tratamento é fundamental para o sucesso terapêutico.
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">
                  Em Caso de Emergência Psiquiátrica
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-700 mb-6 text-sm leading-relaxed">
                Se você estiver em crise emocional grave, com pensamentos de
                autolesão, ideação suicida ou surto psicótico, procure
                imediatamente:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Pronto-Socorro */}
                <div className="bg-white border-2 border-red-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Pronto-Socorro
                      </h4>
                      <p className="text-xs text-neutral-600">
                        Atendimento de urgência e emergência 24 horas
                      </p>
                    </div>
                  </div>
                </div>

                {/* SAMU */}
                <div className="bg-white border-2 border-amber-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">
                        SAMU
                      </h4>
                      <p className="text-xs text-neutral-600 mb-2">
                        Atendimento móvel de urgência
                      </p>
                      <a
                        href="tel:192"
                        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Ligue 192
                      </a>
                    </div>
                  </div>
                </div>

                {/* CVV */}
                <div className="bg-white border-2 border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">
                        Centro de Valorização da Vida (CVV)
                      </h4>
                      <p className="text-xs text-neutral-600 mb-2">
                        24 horas, gratuito - Apoio emocional e prevenção ao suicídio
                      </p>
                      <a
                        href="tel:188"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Ligue 188
                      </a>
                    </div>
                  </div>
                </div>

                {/* CAPS */}
                <div className="bg-white border-2 border-blue-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1">
                        CAPS
                      </h4>
                      <p className="text-xs text-neutral-600">
                        Centro de Atenção Psicossocial - Atendimento especializado em saúde mental
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-red-600 rounded-r-lg p-4">
                <p className="text-neutral-800 font-semibold text-sm">
                  <Heart className="w-4 h-4 inline-block mr-2 text-red-600" />
                  Sua vida é importante! Não hesite em buscar ajuda imediata em situações de risco.
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
                Antes de se dirigir à sala de consulta da psicóloga
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
        <RecommendedReadingCarousel pageId="psicologa" />
      </div>
    </PageContainer>
  );
}
