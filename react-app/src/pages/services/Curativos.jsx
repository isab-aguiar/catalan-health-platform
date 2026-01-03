import { Clock, Package, AlertCircle, CheckCircle } from "lucide-react";
import { PageContainer } from "../../components/layout";
import {
  BackButton,
  RecommendedReadingCarousel,
} from "../../components/common";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import EscalaFirestore from "../../components/services/EscalaFirestore";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";

export default function Curativos() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Serviço de Curativos
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="curativos" />

        <AvisosPaginaWrapper pagina="curativos" />

        {/* Sobre o Serviço */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Serviço
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 leading-relaxed mb-6 text-sm">
              O Serviço de Curativos da Unidade Básica de Saúde São José é
              responsável pela execução, avaliação clínica e acompanhamento
              sistemático de feridas, lesões tegumentares e cuidados
              pós-operatórios. O atendimento é prestado por profissionais de
              enfermagem devidamente qualificados, que realizam avaliação
              individualizada de cada caso e aplicam técnicas adequadas de
              curativo, priorizando a segurança do paciente e a otimização do
              processo de cicatrização tecidual.
            </p>

            <h3 className="font-semibold text-neutral-800 text-lg mb-4">
              Serviços Oferecidos:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-neutral-800 text-sm block mb-1">
                      Curativos simples e complexos
                    </strong>
                    <p className="text-xs text-neutral-600">
                      Úlceras, feridas operatórias, queimaduras, lesões por
                      pressão e demais condições que requerem acompanhamento
                      clínico específico
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-neutral-800 text-sm block mb-1">
                      Retirada de pontos (suturas)
                    </strong>
                    <p className="text-xs text-neutral-600">
                      Procedimento realizado conforme prescrição médica e
                      protocolos estabelecidos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-neutral-800 text-sm block mb-1">
                      Tratamento de pé diabético
                    </strong>
                    <p className="text-xs text-neutral-600">
                      Cuidados especializados para prevenção e tratamento de
                      lesões nos pés de pacientes diabéticos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <strong className="text-neutral-800 text-sm block mb-1">
                      Cuidados com sondas em geral
                    </strong>
                    <p className="text-xs text-neutral-600">
                      Troca, manutenção e cuidados com sondas vesicais,
                      nasogástricas e outras
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispensação de Materiais */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Dispensação de Insumos para Curativo e Equipos de Sonda
                  Enteral
                </h2>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
              A unidade disponibiliza materiais para realização de curativos
              domiciliares e equipos de sonda enteral, mediante apresentação de
              prescrição médica válida. O estoque disponível compreende gazes
              estéreis, fitas adesivas micropore, esparadrapo, luvas
              descartáveis, solução fisiológica, ataduras, equipos de sonda
              enteral e demais insumos necessários para o tratamento.
            </p>

            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={20}
                    className="text-amber-700 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-neutral-700">
                      <strong className="text-amber-900">
                        Normativa de Dispensação:
                      </strong>{" "}
                      A entrega de materiais é realizada exclusivamente conforme
                      a quantidade prescrita pelo médico assistente ou em
                      quantidade inferior à prescrita. É vedada a dispensação de
                      materiais em quantidade superior à estabelecida na
                      prescrição médica.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={20}
                    className="text-blue-700 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-neutral-700">
                      <strong className="text-blue-900">Orientação:</strong>{" "}
                      Solicitamos que o usuário traga seu próprio recipiente ou
                      saco plástico para transporte dos materiais dispensados.
                      Os sacos plásticos da unidade são de uso exclusivo interno
                      e não podem ser disponibilizados para transporte externo
                      de materiais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentação Necessária */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            Documentação Necessária
          </h2>
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento na sala de curativos e dispensação de materiais, é
            obrigatória a apresentação da seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG ou CNH do titular
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">CPF</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento ou número
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Prescrição Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Somente para materiais
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Como Agendar */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Como Agendar
                </h2>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="bg-green-50 border-l-4 border-green-600 rounded-r-lg p-5">
              <h3 className="font-semibold text-green-900 mb-3 text-lg">
                Atendimento Agendado
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm mb-3">
                Para agendamento, o usuário deve comparecer à sala de curativos
                e solicitar o agendamento do horário de atendimento. Os horários
                disponíveis para agendamento encontram-se especificados na seção
                "Horários de Atendimento" desta página.
              </p>
              <p className="text-neutral-700 leading-relaxed text-sm">
                O atendimento é realizado mediante horários agendados, conforme
                disponibilidade da equipe e protocolos estabelecidos pela
                unidade.
              </p>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="sala-curativos"
          titulo="Profissionais Escalados na Sala de Curativos"
        />

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200 mt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-2 text-base">
                Orientação Importante
              </h3>
              <p className="text-neutral-800 text-sm leading-relaxed">
                Antes de se dirigir à sala de curativos, é necessário passar
                pela recepção da unidade para realização da ficha de
                atendimento. Esta medida é essencial para agilizar o processo de
                atendimento e garantir a organização adequada do fluxo de
                pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="curativos" />
      </div>
    </PageContainer>
  );
}
