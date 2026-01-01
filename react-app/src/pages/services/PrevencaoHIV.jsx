import React from "react";
import { Clock, MapPin, Phone, AlertCircle, Info } from "lucide-react";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import BackButton from "../../components/common/BackButton";
import PageContainer from "../../components/layout/PageContainer";
import { contactInfo } from "../../config";

const PrevencaoHIV = () => {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Prevenção Combinada ao HIV
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            PrEP e PEP: Estratégias eficazes de prevenção disponíveis no SUS
          </p>
        </div>

        {/* Introdução */}
        <div className="bg-white border-l-4 border-primary-600 shadow-sm rounded-r-lg p-4 sm:p-6 mb-6">
          <p className="text-neutral-700 leading-relaxed text-sm">
            O Sistema Único de Saúde disponibiliza <strong>estratégias medicamentosas eficazes e gratuitas</strong> para prevenir a infecção pelo HIV.
            Compreender as diferenças entre PEP e PrEP é essencial para buscar o atendimento adequado no momento certo e garantir a máxima proteção.
          </p>
        </div>

        {/* PEP */}
        <div className="mb-6">
          <div className="bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-neutral-200 px-4 sm:px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                PEP – Profilaxia Pós-Exposição
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">Atendimento de urgência após exposição de risco</p>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-neutral-800 text-lg mb-4">O que é?</h3>
                <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
                  Uso de medicamentos por <strong>28 dias</strong> para evitar a infecção após uma situação de risco, como:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="text-neutral-700 list-disc text-sm">Relação sexual sem preservativo</li>
                  <li className="text-neutral-700 list-disc text-sm">Falha ou rompimento do preservativo</li>
                  <li className="text-neutral-700 list-disc text-sm">Violência sexual</li>
                  <li className="text-neutral-700 list-disc text-sm">Acidente com material biológico</li>
                </ul>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 mb-2 text-base">Prazo Crítico</h3>
                      <p className="text-neutral-800 text-sm leading-relaxed">
                        A PEP deve ser iniciada <strong>o mais rápido possível</strong>, preferencialmente nas <strong>primeiras 2 horas</strong> e, no máximo, até <strong>72 horas (3 dias)</strong> após a exposição.
                        Quanto mais rápido iniciar o tratamento, maior a eficácia na prevenção.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PrEP */}
        <div className="mb-6">
          <div className="bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-neutral-200 px-4 sm:px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                PrEP – Profilaxia Pré-Exposição
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">Prevenção programada e contínua</p>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-neutral-800 text-lg mb-4">O que é?</h3>
                <p className="text-neutral-700 leading-relaxed text-sm">
                  Uso <strong>programado e contínuo</strong> de medicamentos preventivos por pessoas que não vivem com HIV, mas estão em contextos de maior vulnerabilidade ou risco frequente de exposição.
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold text-neutral-800 text-lg mb-4">Como funciona?</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-neutral-700 list-disc text-sm">Requer cadastro e acompanhamento médico regular</li>
                  <li className="text-neutral-700 list-disc text-sm">Testagens periódicas de HIV e outras ISTs</li>
                  <li className="text-neutral-700 list-disc text-sm">Acompanhamento de saúde integral e preventivo</li>
                  <li className="text-neutral-700 list-disc text-sm">Uso diário da medicação conforme orientação médica</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Onde Buscar Atendimento */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
            Onde Buscar Atendimento em Divinópolis
          </h2>

          <div className="bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden mb-6">
            <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                    SAE/CTA – Serviço de Assistência Especializada
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base mt-1">
                    Local de referência para acolhimento, testagem, dispensação de medicação e acompanhamento
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Rua+do+Contorno,+1500,+Centro,+Divinópolis,+MG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      Rua do Contorno, 1500 – Centro
                    </a>
                    <p className="text-neutral-600 text-xs">(Junto à Casa de Assistência Irmã Scheilla)</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="tel:+553732213735"
                      className="text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      (37) 3221-3735
                    </a>
                    <span className="text-neutral-400">/</span>
                    <a
                      href={`tel:${contactInfo.phones.referenceUnits.prevencaoHIV.tel}`}
                      className="text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      {contactInfo.phones.referenceUnits.prevencaoHIV.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">Segunda a Sexta-feira: 07:00 às 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Atendimento de Urgência */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-5 shadow-sm border border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 mb-2 text-base">Atendimento de Urgência Fora do Horário Comercial</h3>
                <p className="text-neutral-800 text-sm leading-relaxed mb-3">
                  A PEP é considerada uma <strong>urgência médica</strong>. Se a exposição de risco ocorrer durante período noturno (após 17h), finais de semana ou feriados:
                </p>
                <div className="bg-white border border-amber-300 rounded-lg p-3">
                  <p className="text-neutral-900 font-medium text-sm">
                    Dirija-se imediatamente à <strong>UPA (Unidade de Pronto Atendimento)</strong> mais próxima. O atendimento deve ocorrer nas primeiras 72 horas após a exposição.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acolhimento e Sigilo */}
        <div className="mb-6">
          <div className="bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Compromisso com o Acolhimento e Sigilo
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-neutral-700 leading-relaxed text-sm mb-5">
                Sabemos que buscar atendimento de saúde, seja após um acidente ou para prevenção, pode gerar dúvidas e ansiedade. Por isso, queremos que você se sinta <strong>seguro e acolhido</strong> em nossas unidades.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-5">
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Atendimento Humanizado
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Nossos profissionais são treinados para oferecer um atendimento técnico, ético e humanizado. Você será recebido com respeito e dignidade.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Sigilo Médico
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Todas as informações compartilhadas durante as consultas, testes e tratamentos são protegidas por rigoroso sigilo médico.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Equipe Especializada
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Profissionais preparados para esclarecer suas dúvidas e oferecer o melhor encaminhamento clínico.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 shadow-sm border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-900 font-medium text-sm">
                      Não deixe a dúvida ou o receio impedirem o seu cuidado. Estamos aqui para ajudar você.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="prevencao-hiv" />
      </div>
    </PageContainer>
  );
};

export default PrevencaoHIV;
