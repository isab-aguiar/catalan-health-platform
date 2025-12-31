import React from "react";
import { Shield, Clock, Calendar, MapPin, Phone, AlertCircle, Heart, CheckCircle, AlertTriangle } from "lucide-react";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import BackButton from "../../components/common/BackButton";
import { contactInfo } from "../../config";

const PrevencaoHIV = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 mb-6 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Shield size={32} className="flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-white">Prevenção Combinada ao HIV</h1>
            <p className="text-primary-100 text-sm mt-1">
              PrEP e PEP: Estratégias eficazes de prevenção disponíveis no SUS
            </p>
          </div>
        </div>
      </div>

      {/* Introdução */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-blue-900 mb-3">Estratégias de Prevenção ao HIV no SUS</h2>
        <p className="text-neutral-700 leading-relaxed text-sm">
          O Sistema Único de Saúde disponibiliza <strong className="text-blue-700">estratégias medicamentosas eficazes e gratuitas</strong> para prevenir a infecção pelo HIV.
          Compreender as diferenças entre PEP e PrEP é essencial para buscar o atendimento adequado no momento certo e garantir a máxima proteção.
        </p>
      </div>

      {/* PEP - Urgência */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-red-900">
              PEP<br/>
              <span className="text-sm font-normal text-red-700">Profilaxia Pós-Exposição (Urgência)</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-red-600" />
                O que é?
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed mb-3">
                Uso de medicamentos por <strong>28 dias</strong> para evitar a infecção após uma situação de risco, como:
              </p>
              <ul className="space-y-2 ml-2">
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Relação sexual sem preservativo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Falha ou rompimento do preservativo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Violência sexual</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Acidente com material biológico</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <Clock size={20} className="text-red-700 mt-0.5 flex-shrink-0" />
                <h3 className="font-semibold text-red-900">Prazo Crítico</h3>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed mb-3">
                A PEP deve ser iniciada <strong className="text-red-700">o mais rápido possível</strong>,
                preferencialmente nas <strong>primeiras 2 horas</strong> e, no máximo,
                até <strong>72 horas (3 dias)</strong> após a exposição.
              </p>
              <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-red-900 font-bold text-sm mb-1">Atenção: Urgência Médica</p>
                    <p className="text-red-700 text-sm">Quanto mais rápido iniciar o tratamento, maior a eficácia na prevenção!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PrEP - Rotina */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-purple-900">
              PrEP<br/>
              <span className="text-sm font-normal text-purple-700">Profilaxia Pré-Exposição (Rotina)</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-purple-600" />
                O que é?
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Uso <strong>programado e contínuo</strong> de medicamentos preventivos por pessoas que não vivem com HIV,
                mas estão em contextos de maior vulnerabilidade ou risco frequente de exposição.
              </p>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-purple-600" />
                Como funciona?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700 text-sm">Requer cadastro e acompanhamento médico regular</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700 text-sm">Testagens periódicas de HIV e outras ISTs</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700 text-sm">Acompanhamento de saúde integral e preventivo</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700 text-sm">Uso diário da medicação conforme orientação médica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onde Buscar Atendimento */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">
          Onde Buscar Atendimento em Divinópolis
        </h2>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-5 mb-4">
          <div className="mb-4">
            <h3 className="font-bold text-primary-900 text-lg mb-2">
              SAE/CTA – Serviço de Assistência Especializada
            </h3>
            <p className="text-neutral-700 text-sm mb-3">
              Local de referência para acolhimento, testagem, dispensação de medicação e acompanhamento
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-neutral-700">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rua+do+Contorno,+1500,+Centro,+Divinópolis,+MG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 transition-colors font-medium"
                  >
                    Rua do Contorno, 1500 – Centro
                  </a>
                </p>
                <p className="text-neutral-600 text-sm">(Junto à Casa de Assistência Irmã Scheilla)</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:+553732213735"
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  (37) 3221-3735
                </a>
                <span className="text-neutral-400">/</span>
                <a
                  href={`tel:${contactInfo.phones.referenceUnits.prevencaoHIV.tel}`}
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  {contactInfo.phones.referenceUnits.prevencaoHIV.display}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
              <p className="text-neutral-700">
                <strong>Segunda a Sexta-feira:</strong> 07:00 às 17:00
              </p>
            </div>
          </div>
        </div>

        {/* Plantão de Urgência */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-base mb-2">Atendimento de Urgência Fora do Horário Comercial</h3>
              <p className="text-neutral-700 leading-relaxed text-sm mb-3">
                A PEP é considerada uma <strong className="text-amber-800">urgência médica</strong>. Se a exposição de risco ocorrer durante:
              </p>
              <div className="bg-white/60 rounded-md p-3 mb-3">
                <ul className="space-y-1.5 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Período noturno (após as 17h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Finais de semana (sábados e domingos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Feriados</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-100 rounded-md p-3">
                <p className="text-amber-900 text-sm font-semibold flex items-start gap-2">
                  <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                  <span>Dirija-se imediatamente à <strong>UPA (Unidade de Pronto Atendimento)</strong> mais próxima.
                  O atendimento deve ocorrer nas primeiras 72 horas após a exposição.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acolhimento e Sigilo */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-green-900">
              Seu Bem-estar é Nossa Prioridade
            </h2>
          </div>

          <p className="text-neutral-700 leading-relaxed mb-4">
            Sabemos que buscar atendimento de saúde, seja após um acidente ou para prevenção,
            pode gerar dúvidas e ansiedade. Por isso, queremos que você se sinta <strong>seguro e acolhido</strong> em nossas unidades.
          </p>

          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Atendimento Sem Julgamentos
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Nossos profissionais são treinados para oferecer um atendimento <strong>técnico, ético e humanizado</strong>.
                Independente da situação, você será recebido com respeito e dignidade. O foco da nossa equipe é exclusivamente a sua saúde.
              </p>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Sigilo e Privacidade
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Entendemos a importância da discrição. Todas as informações compartilhadas durante as consultas,
                testes e tratamentos são protegidas por <strong>rigoroso sigilo médico</strong>.
              </p>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Equipe Especializada
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Você será atendido por profissionais preparados para esclarecer suas dúvidas,
                aliviar seus medos e oferecer o melhor encaminhamento clínico.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-green-200">
            <p className="text-center text-green-800 font-semibold">
              Não deixe a dúvida ou o receio impedirem o seu cuidado. Estamos aqui para ajudar você.
            </p>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="prevencao-hiv" />
      </div>
    </div>
  );
};

export default PrevencaoHIV;
