import React from "react";
import { Shield, Clock, Calendar, MapPin, Phone, AlertCircle, Heart, CheckCircle } from "lucide-react";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";

const PrevencaoHIV = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 mb-6 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Shield size={32} className="flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold">Prevenção Combinada ao HIV</h1>
            <p className="text-primary-100 text-sm mt-1">
              PrEP e PEP: Estratégias eficazes de prevenção disponíveis no SUS
            </p>
          </div>
        </div>
      </div>

      {/* Introdução */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-5 mb-6">
        <p className="text-neutral-700 leading-relaxed">
          O SUS oferece <strong>estratégias medicamentosas eficazes</strong> para evitar a infecção pelo HIV.
          É fundamental entender a diferença entre elas para buscar o atendimento correto no momento adequado.
        </p>
      </div>

      {/* PEP - Urgência */}
      <div className="mb-8">
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-red-900">
              PEP – Profilaxia Pós-Exposição (Urgência)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-900 mb-2">O que é?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Uso de medicamentos por <strong>28 dias</strong> para evitar a infecção após uma situação de risco, como:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-700 ml-4">
                <li>Relação sexual sem preservativo</li>
                <li>Falha ou rompimento do preservativo</li>
                <li>Violência sexual</li>
                <li>Acidente com material biológico</li>
              </ul>
            </div>

            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Clock size={20} className="text-red-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Prazo Crítico</h3>
                  <p className="text-neutral-800 leading-relaxed">
                    A PEP deve ser iniciada <strong className="text-red-700">o mais rápido possível</strong>,
                    preferencialmente nas <strong>primeiras 2 horas</strong> e, no máximo,
                    até <strong>72 horas (3 dias)</strong> após a exposição.
                  </p>
                  <p className="text-red-700 font-semibold mt-2 text-sm">
                    ⚠️ Quanto mais rápido iniciar, maior a eficácia!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PrEP - Rotina */}
      <div className="mb-8">
        <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-lg p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={24} className="text-purple-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-purple-900">
              PrEP – Profilaxia Pré-Exposição (Rotina)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">O que é?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Uso <strong>programado e contínuo</strong> de medicamentos preventivos por pessoas que não vivem com HIV,
                mas estão em contextos de maior vulnerabilidade ou risco frequente de exposição.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-purple-900 mb-2">Como funciona?</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">Requer cadastro e acompanhamento médico regular</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">Testagens periódicas de HIV e outras ISTs</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">Acompanhamento de saúde integral e preventivo</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">Uso diário da medicação conforme orientação médica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onde Buscar Atendimento */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-primary-600" />
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
                  href="tel:+553732296890"
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  (37) 3229-6890
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
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Plantão de Urgência (PEP)</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Se a exposição de risco ocorrer <strong>à noite, finais de semana ou feriados</strong>,
                procure <strong className="text-amber-700">imediatamente a UPA</strong> (Unidade de Pronto Atendimento)
                mais próxima para iniciar a profilaxia dentro das 72 horas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acolhimento e Sigilo */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={28} className="text-green-600 flex-shrink-0" />
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
      <RecommendedReadingCarousel pageId="prevencao-hiv" />
    </div>
  );
};

export default PrevencaoHIV;
