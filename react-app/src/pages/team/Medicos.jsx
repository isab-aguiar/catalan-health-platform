import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Medicos() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-neutral-900 whitespace-normal md:whitespace-nowrap"
              >
                Consultório Médico
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
          <p className="text-neutral-700 leading-relaxed mb-5">
            O atendimento médico na ESF Catalão é realizado pelos médicos de
            família e comunidade, profissionais capacitados para cuidar de toda
            a família, em todas as fases da vida. Eles realizam consultas de
            rotina, atendimentos de urgência, diagnóstico e tratamento de
            doenças comuns, acompanhamento de doenças crônicas e encaminhamentos
            quando necessário.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas de rotina
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento de saúde geral
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Tratamento de doenças
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Diagnóstico e prescrição de medicamentos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento de crônicos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Hipertensão, diabetes, entre outras condições
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Solicitação de exames
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Quando necessário para diagnóstico
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Encaminhamentos para especialistas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Quando o caso exige atendimento especializado
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <EscalaFirestore
          escalaKey="sala-atendimento-medico"
          titulo="Profissionais Escalados no Consultório Médico"
        />
        {}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-neutral-50 border-l-4 border-info p-4 rounded">
              <h4 className="text-primary-700 font-bold mb-2 text-sm">
                Atendimento Agendado
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Consultas marcadas com antecedência para acompanhamento de
                rotina, renovação de receitas, solicitação de exames, entre
                outros.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Como acessar:</strong> Dirija-se à{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-info hover:text-primary-700 underline font-semibold"
                >
                  Sala de Agendamentos
                </Link>
                . Veja a{" "}
                <Link
                  to="/servicos/sala-4#documentacao-necessaria"
                  className="text-info hover:text-primary-700 underline font-semibold"
                >
                  documentação necessária para agendar
                </Link>
                .
              </p>
            </div>
            <div className="bg-neutral-50 border-l-4 border-amber-600 p-4 rounded">
              <h4 className="text-amber-700 font-bold mb-2 text-sm">
                Atendimento Espontâneo (Triagem)
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Para casos agudos que necessitam de atendimento no dia (febre,
                dor, mal-estar). Atendimento por ordem de chegada com prioridade
                para casos mais graves.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Horário:</strong> 07h00 às 08h00 (Triagem)
              </p>
            </div>
            <div className="bg-neutral-50 border-l-4 border-neutral-600 p-4 rounded">
              <h4 className="text-neutral-700 font-bold mb-2 text-sm">
                Saúde na Hora (Plantão Noturno)
              </h4>
              <p className="text-neutral-700 leading-relaxed mb-2 text-sm">
                Atendimento médico estendido no período noturno para casos que
                não podem esperar até o dia seguinte, mas não são emergências
                que exigem SAMU/hospital.
              </p>
              <p className="text-neutral-900 text-sm">
                <strong>Horário:</strong> 17h00 às 22h00 (Segunda a Sexta)
              </p>
              <p className="text-neutral-600 text-xs mt-2 italic">
                Ideal para quem trabalha durante o dia e não consegue vir no
                horário normal
              </p>
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
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  . Veja a{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    documentação necessária para agendar
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-purple-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Identificação da Equipe de Referência
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  A consulta será agendada com o médico responsável pela sua
                  área de abrangência (ESF - Estratégia Saúde da Família)
                </p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                3
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Atendimento mediante Triagem
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Disponível mediante triagem clínica inicial em dois períodos:
                  manhã (07h00 às 08h00) e noite - Saúde na Hora (18h00 às
                  19h00). O atendimento será realizado conforme disponibilidade
                  de agenda e necessidade clínica identificada na triagem.
                </p>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                4
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Comparecimento à Consulta
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Apresentar-se no horário agendado com documentação completa e
                  exames complementares, quando disponíveis
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="mb-6">
          <Alert type="info">
            <div>
              <p className="mb-2">
                <strong>
                  Importante sobre Atendimento por Demanda Espontânea
                </strong>
              </p>
              <p className="mb-2">
                O atendimento por demanda espontânea não garante consulta médica
                imediata. Todos os casos de demanda espontânea passam por uma
                avaliação inicial na triagem de enfermagem, que determina a
                necessidade e prioridade do atendimento.
              </p>
              <p>
                Conforme a avaliação realizada na triagem, o usuário poderá ser
                encaminhado para consulta médica ou para consulta de enfermagem,
                dependendo da necessidade clínica identificada. A triagem é
                essencial para garantir o melhor encaminhamento e otimizar o
                atendimento na unidade.
              </p>
            </div>
          </Alert>
        </div>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
                Antes de se dirigir à sala de consulta médica, é necessário
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
        <RecommendedReadingCarousel pageId="medicos" />
      </div>
    </PageContainer>
  );
}
