import { AlertCircle } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import { PageContainer } from "../../components/layout";
import EscalaPorSala from "../../components/services/EscalaPorSala";
export default function ECG() {
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
                Eletrocardiograma{" "}
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
        <CampanhasPaginaWrapper pagina="ecg" />
        {}
        <AvisosPaginaWrapper pagina="ecg" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Eletrocardiograma é um exame que registra a atividade elétrica do
            coração. É um procedimento simples, rápido e indolor que auxilia na
            identificação de problemas cardíacos como arritmias, infarto,
            insuficiência cardíaca e outras alterações do sistema
            cardiovascular.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Avaliação Cardíaca
              </h3>
              <p className="text-sm text-neutral-600">
                Identifica alterações no ritmo e função do coração, auxiliando
                no diagnóstico e acompanhamento de condições cardíacas.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Exame Rápido e Indolor
              </h3>
              <p className="text-sm text-neutral-600">
                Procedimento não invasivo com duração aproximada de 10 a 15
                minutos.
              </p>
            </div>
          </div>
          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
              Preparo para o Exame
            </h3>
            <div className="space-y-3 text-sm text-neutral-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Não utilizar creme ou óleo corporal no dia do exame
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    Cremes e óleos corporais interferem na aderência adequada
                    dos eletrodos à pele, podendo comprometer a qualidade do
                    registro e a precisão dos resultados.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Evitar o uso excessivo de bijuterias e acessórios de metal
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    Objetos metálicos (pulseiras, colares, relógios, anéis,
                    entre outros) podem interferir na captação do sinal elétrico
                    do coração, provocando distorções no traçado
                    eletrocardiográfico e prejudicando a qualidade e a
                    interpretação do exame.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Mulheres: Se possível, evitar sutiã com aro metálico
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    O aro metálico do sutiã pode interferir na captação do sinal
                    elétrico na região torácica, onde são posicionados os
                    eletrodos do exame. Essa interferência pode gerar distorções
                    no traçado e comprometer a qualidade do registro
                    eletrocardiográfico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>

        <EscalaPorSala
          titulo="Profissionais Escalados para ECG"
          escalaKey="ecg"
        />

        {}
        <InfoBox title="Documentação Necessária" highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para realização do exame, é obrigatória a apresentação da seguinte
            documentação:
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
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Protocolo de Agendamento
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória para realização do exame
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
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
              Antes de se dirigir à sala de eletrocardiograma, é necessário
              passar pela recepção da unidade para realização da ficha de
              atendimento. Esta medida é essencial para agilizar o processo de
              atendimento e garantir a organização adequada do fluxo de
              pacientes na unidade.
            </p>
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
