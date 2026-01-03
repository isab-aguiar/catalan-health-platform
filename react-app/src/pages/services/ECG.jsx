import {
  AlertCircle,
  Activity,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  BackButton,
  RecommendedReadingCarousel,
  InfoBox,
} from "../../components/common";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function ECG() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

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

        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Sobre o Exame
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 text-sm leading-relaxed mb-5">
              O Eletrocardiograma é um exame que registra a atividade elétrica
              do coração. É um procedimento simples, rápido e indolor que
              auxilia na identificação de problemas cardíacos como arritmias,
              infarto, insuficiência cardíaca e outras alterações do sistema
              cardiovascular.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">
                      Avaliação Cardíaca
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Identifica alterações no ritmo e função do coração,
                      auxiliando no diagnóstico e acompanhamento de condições
                      cardíacas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">
                      Exame Rápido e Indolor
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      Procedimento não invasivo com duração aproximada de 10 a
                      15 minutos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Preparo para o Exame
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 block mb-1 text-sm">
                    Não utilizar creme ou óleo corporal no dia do exame
                  </strong>
                  <p className="text-neutral-700 text-xs leading-relaxed">
                    Cremes e óleos corporais interferem na aderência adequada
                    dos eletrodos à pele, podendo comprometer a qualidade do
                    registro e a precisão dos resultados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 block mb-1 text-sm">
                    Evitar o uso excessivo de bijuterias e acessórios de metal
                  </strong>
                  <p className="text-neutral-700 text-xs leading-relaxed">
                    Objetos metálicos (pulseiras, colares, relógios, anéis,
                    entre outros) podem interferir na captação do sinal elétrico
                    do coração, provocando distorções no traçado
                    eletrocardiográfico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800 block mb-1 text-sm">
                    Mulheres: Se possível, evitar sutiã com aro metálico
                  </strong>
                  <p className="text-neutral-700 text-xs leading-relaxed">
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

        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Documentação Necessária
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              Para realização do exame, é obrigatória a apresentação da seguinte
              documentação:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Documento de Identificação com Foto
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    RG ou CNH do titular
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    CPF - Cadastro de Pessoa Física
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Documento físico original ou número do CPF
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Protocolo de Agendamento
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Obrigatório para o exame
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
                    <h3 className="font-bold text-blue-900 mb-2 text-base">
                      Normativa
                    </h3>
                    <p className="text-neutral-800 text-sm leading-relaxed">
                      Documento de identificação com foto e CPF são obrigatórios
                      para qualquer atendimento na unidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="ecg" />
      </div>
    </PageContainer>
  );
}
