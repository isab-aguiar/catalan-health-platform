import { AlertCircle, Activity, FileText, Clock, CheckCircle } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, InfoBox } from "../../components/common";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function ECG() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Eletrocardiograma
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="ecg" />

        <AvisosPaginaWrapper pagina="ecg" />

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Activity size={24} className="text-blue-600" />
            Sobre o Exame
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Eletrocardiograma é um exame que registra a atividade elétrica do
            coração. É um procedimento simples, rápido e indolor que auxilia na
            identificação de problemas cardíacos como arritmias, infarto,
            insuficiência cardíaca e outras alterações do sistema
            cardiovascular.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-lg p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2 text-sm">
                    Avaliação Cardíaca
                  </h3>
                  <p className="text-sm text-neutral-700">
                    Identifica alterações no ritmo e função do coração, auxiliando
                    no diagnóstico e acompanhamento de condições cardíacas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2 text-sm">
                    Exame Rápido e Indolor
                  </h3>
                  <p className="text-sm text-neutral-700">
                    Procedimento não invasivo com duração aproximada de 10 a 15
                    minutos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preparo para o Exame */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-sm border border-green-200 mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-green-600" />
            Preparo para o Exame
          </h2>

          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-5 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-green-900 block mb-1 text-sm">
                    Não utilizar creme ou óleo corporal no dia do exame
                  </strong>
                  <p className="text-neutral-700 text-xs">
                    Cremes e óleos corporais interferem na aderência adequada
                    dos eletrodos à pele, podendo comprometer a qualidade do
                    registro e a precisão dos resultados.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-5 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-green-900 block mb-1 text-sm">
                    Evitar o uso excessivo de bijuterias e acessórios de metal
                  </strong>
                  <p className="text-neutral-700 text-xs">
                    Objetos metálicos (pulseiras, colares, relógios, anéis,
                    entre outros) podem interferir na captação do sinal elétrico
                    do coração, provocando distorções no traçado
                    eletrocardiográfico.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-5 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-green-900 block mb-1 text-sm">
                    Mulheres: Se possível, evitar sutiã com aro metálico
                  </strong>
                  <p className="text-neutral-700 text-xs">
                    O aro metálico do sutiã pode interferir na captação do sinal
                    elétrico na região torácica, onde são posicionados os
                    eletrodos do exame, gerando distorções no traçado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="ecg"
          titulo="Profissionais Escalados na Sala de ECG"
        />

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" icon={<FileText size={24} />} highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para realização do exame, é obrigatória a apresentação da seguinte
            documentação:
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
              <div className="flex items-start gap-3">
                <FileText size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Documento com Foto
                  </strong>
                  <p className="text-xs text-neutral-600">
                    RG ou CNH do titular
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
              <div className="flex items-start gap-3">
                <FileText size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    CPF
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Documento ou número
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-primary-200 shadow-sm">
              <div className="flex items-start gap-3">
                <FileText size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Protocolo de Agendamento
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Obrigatório para o exame
                  </p>
                </div>
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

        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
                Antes de se dirigir à sala de eletrocardiograma, é necessário
                passar pela recepção da unidade para realização da ficha de
                atendimento. Esta medida é essencial para agilizar o processo de
                atendimento e garantir a organização adequada do fluxo de
                pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="ecg" />
      </div>
    </PageContainer>
  );
}
