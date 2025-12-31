import {
  Bandage,
  Clock,
  FileText,
  Package,
  Calendar,
  AlertCircle,
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
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900 whitespace-normal md:whitespace-nowrap"
              >
                Serviço de Curativos
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
        <CampanhasPaginaWrapper pagina="curativos" />
        {}
        <AvisosPaginaWrapper pagina="curativos" />
        {}
        <InfoBox title="Sobre o Serviço">
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
          <h3 className="font-semibold text-neutral-800 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Curativos simples e complexos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Úlceras, feridas operatórias, queimaduras, lesões por pressão e demais condições que requerem acompanhamento clínico específico
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Retirada de pontos (suturas)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procedimento realizado conforme prescrição médica e protocolos estabelecidos, aplicado em casos pós-cirúrgicos e pós-procedimentais
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Tratamento de pé diabético
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Cuidados especializados para prevenção e tratamento de lesões nos pés de pacientes diabéticos, incluindo avaliação clínica e orientações preventivas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Cuidados com sondas em geral
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Troca, manutenção e cuidados com sondas vesicais, nasogástricas e outras, conforme prescrição e protocolos estabelecidos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientações sobre cuidados com feridas, prevenção de complicações e técnicas de curativo domiciliar quando apropriado
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Dispensação de Insumos para Curativo e Equipos de Sonda Enteral">
          <p className="text-neutral-700 leading-relaxed mb-4">
            A unidade disponibiliza materiais para realização de curativos
            domiciliares e equipos de sonda enteral, mediante apresentação de prescrição médica válida. O
            estoque disponível compreende gazes estéreis, fitas adesivas
            micropore, esparadrapo, luvas descartáveis, solução fisiológica,
            ataduras, equipos de sonda enteral e demais insumos necessários para o tratamento.
          </p>
          <div className="space-y-3">
            <Alert type="warning">
              <strong>Normativa de Dispensação:</strong> A entrega de materiais
              é realizada exclusivamente conforme a quantidade prescrita pelo
              médico assistente ou em quantidade inferior à prescrita. É vedada
              a dispensação de materiais em quantidade superior à estabelecida
              na prescrição médica.
            </Alert>
            <Alert type="info">
              <strong>Orientação:</strong> Solicitamos que o usuário traga seu
              próprio recipiente ou saco plástico para transporte dos materiais
              dispensados. Os sacos plásticos da unidade são de uso exclusivo
              interno e não podem ser disponibilizados para transporte externo
              de materiais.
            </Alert>
          </div>
        </InfoBox>
        {}
        <InfoBox
          title="Documentação Necessária"
          icon={<FileText size={24} />}
          highlight={true}
        >
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento na sala de curativos e dispensação de materiais, é
            obrigatória a apresentação da seguinte documentação:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Documento de identidade com foto e/ou Carteira de Habilitação do titular do atendimento
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
                  Documento físico original ou número do CPF do titular do
                  atendimento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Prescrição Médica
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória exclusivamente para dispensação de materiais
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Como Agendar" icon={<Calendar size={24} />}>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Atendimento Agendado
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Para agendamento, o usuário deve comparecer à sala de curativos
                e solicitar o agendamento do horário de atendimento. Os horários
                disponíveis para agendamento encontram-se especificados na seção
                "Horários de Atendimento" desta página.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Atendimento por Demanda Espontânea
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Para atendimento por demanda espontânea, o usuário deve
                comparecer à recepção da unidade para realização da ficha de
                atendimento e, em seguida, dirigir-se à sala de espera. O
                paciente será chamado para avaliação de enfermagem, que
                determinará a necessidade de realização do curativo conforme
                avaliação clínica.
              </p>
            </div>
            <p className="text-neutral-700 leading-relaxed text-sm">
              O atendimento é realizado mediante horários agendados e casos de
              urgência, conforme disponibilidade da equipe e protocolos
              estabelecidos pela unidade.
            </p>
          </div>
        </InfoBox>

        <EscalaFirestore
          escalaKey="sala-curativos"
          titulo="Profissionais Escalados na Sala de Curativos"
        />

        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
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
