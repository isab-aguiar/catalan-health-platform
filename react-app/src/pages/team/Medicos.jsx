import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, InfoBox } from "../../components/common";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import medicoImg from "../../assets/medico/medico.png";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Medicos() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório Médico
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O atendimento médico na ESF Catalão é realizado pelos médicos de
            família e comunidade, profissionais capacitados para cuidar de toda
            a família, em todas as fases da vida. Eles realizam consultas de
            rotina, atendimentos de urgência, diagnóstico e tratamento de
            doenças comuns, acompanhamento de doenças crônicas e encaminhamentos
            quando necessário.
          </p>

          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
        </div>
        {}
        {/* Card Atendimento Médico de Família */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Atendimento Médico de Família
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Cuidado integral para toda a família em todas as fases da vida
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={medicoImg}
                alt="Atendimento Médico de Família - Consulta"
                className="max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
                centered={true}
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
              O médico de família é o profissional preparado para cuidar de você e de toda a sua família, independentemente da idade ou condição de saúde. Este profissional acompanha o paciente ao longo do tempo, conhecendo sua história clínica, seus hábitos e seu contexto familiar e social. Essa relação de confiança permite um atendimento mais humanizado e resolutivo, promovendo saúde, prevenindo doenças e tratando problemas de saúde de forma integral e coordenada.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Ministério da Saúde */}
              <a
                href="https://www.gov.br/saude/pt-br/assuntos/atencao-primaria-a-saude"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-50 rounded-lg p-4 sm:p-5 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-2 text-base">
                      Saiba Mais
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Consulte informações completas sobre a Atenção Primária à Saúde no site oficial do Ministério da Saúde.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                      <ExternalLink size={16} />
                      <span>Acessar Site do Ministério da Saúde</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {}
        <EscalaFirestore
          escalaKey="sala-atendimento-medico"
          titulo="Profissionais Escalados no Consultório Médico"
        />
        {}
        <InfoBox title="Modalidades de Atendimento">
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h4 className="text-blue-900 font-bold mb-2 text-sm">
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
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <h4 className="text-green-900 font-bold mb-2 text-sm">
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
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h4 className="text-blue-900 font-bold mb-2 text-sm">
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

            <div className="relative pl-12 pb-8 border-l-2 border-green-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
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
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                4
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
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
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-2 text-base">Importante sobre Atendimento por Demanda Espontânea</h3>
                <p className="text-neutral-800 text-sm leading-relaxed mb-2">
                  O atendimento por demanda espontânea não garante consulta médica imediata. Todos os casos de demanda espontânea passam por uma avaliação inicial na triagem de enfermagem, que determina a necessidade e prioridade do atendimento.
                </p>
                <p className="text-neutral-800 text-sm leading-relaxed">
                  Conforme a avaliação realizada na triagem, o usuário poderá ser encaminhado para consulta médica ou para consulta de enfermagem, dependendo da necessidade clínica identificada. A triagem é essencial para garantir o melhor encaminhamento e otimizar o atendimento na unidade.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
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
