import {
  Clock,
  FileText,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { PageContainer } from "../../components/layout";
import { Alert, InfoBox, BackButton, RecommendedReadingCarousel } from "../../components/common";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import EscalaFirestore from "../../components/services/EscalaFirestore";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";

export default function Curativos() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Serviço de Curativos
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>
        {}
        <CampanhasPaginaWrapper pagina="curativos" />
        {}
        <AvisosPaginaWrapper pagina="curativos" />

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Serviço de Curativos da Unidade Básica de Saúde São José é
            responsável pela execução, avaliação clínica e acompanhamento
            sistemático de feridas, lesões tegumentares e cuidados
            pós-operatórios. O atendimento é prestado por profissionais de
            enfermagem devidamente qualificados, que realizam avaliação
            individualizada de cada caso e aplicam técnicas adequadas de
            curativo, priorizando a segurança do paciente e a otimização do
            processo de cicatrização tecidual.
          </p>

          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Curativos simples e complexos
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Úlceras, feridas operatórias, queimaduras, lesões por pressão e demais condições que requerem acompanhamento clínico específico
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Retirada de pontos (suturas)
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Procedimento realizado conforme prescrição médica e protocolos estabelecidos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Tratamento de pé diabético
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Cuidados especializados para prevenção e tratamento de lesões nos pés de pacientes diabéticos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-800 text-sm block mb-1">
                    Cuidados com sondas em geral
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Troca, manutenção e cuidados com sondas vesicais, nasogástricas e outras
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispensação de Materiais */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 shadow-sm border border-amber-200 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Package size={24} className="text-amber-600" />
            Dispensação de Insumos para Curativo e Equipos de Sonda Enteral
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            A unidade disponibiliza materiais para realização de curativos
            domiciliares e equipos de sonda enteral, mediante apresentação de prescrição médica válida. O
            estoque disponível compreende gazes estéreis, fitas adesivas
            micropore, esparadrapo, luvas descartáveis, solução fisiológica,
            ataduras, equipos de sonda enteral e demais insumos necessários para o tratamento.
          </p>

          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-4 border border-amber-300">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-700">
                    <strong className="text-amber-900">Normativa de Dispensação:</strong> A entrega de materiais
                    é realizada exclusivamente conforme a quantidade prescrita pelo
                    médico assistente ou em quantidade inferior à prescrita. É vedada
                    a dispensação de materiais em quantidade superior à estabelecida
                    na prescrição médica.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-700">
                    <strong className="text-blue-900">Orientação:</strong> Solicitamos que o usuário traga seu
                    próprio recipiente ou saco plástico para transporte dos materiais
                    dispensados. Os sacos plásticos da unidade são de uso exclusivo
                    interno e não podem ser disponibilizados para transporte externo
                    de materiais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" icon={<FileText size={24} />} highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento na sala de curativos e dispensação de materiais, é
            obrigatória a apresentação da seguinte documentação:
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
                    Prescrição Médica
                  </strong>
                  <p className="text-xs text-neutral-600">
                    Somente para materiais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Como Agendar */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 shadow-sm border border-green-200 mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            Como Agendar
          </h2>

          <div className="bg-white/70 rounded-lg p-5 border border-green-100">
            <h3 className="font-bold text-green-900 mb-3 text-base flex items-center gap-2">
              <Clock size={18} className="text-green-600" />
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
              disponibilidade da equipe e protocolos estabelecidos pela unidade.
            </p>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="sala-curativos"
          titulo="Profissionais Escalados na Sala de Curativos"
        />


        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
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

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="curativos" />
      </div>
    </PageContainer>
  );
}
