import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox, ImageWithCredit } from "../../components/common";
import enfermeiraImg from "../../assets/enfermeiras/enfermeira-examinando-um-paciente.avif";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Enfermeiras() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório de Enfermagem
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
            A consulta de enfermagem é uma atividade privativa do enfermeiro,
            fundamentada na Sistematização da Assistência de Enfermagem (SAE),
            regulamentada pela Resolução COFEN nº 358/2009. Na ESF Catalão, as
            enfermeiras realizam avaliação clínica, solicitação de exames
            complementares conforme protocolos estabelecidos, prescrição de
            cuidados de enfermagem e medicamentos quando indicado, além de
            orientações para promoção da saúde e prevenção de agravos. O
            atendimento abrange desde a atenção à saúde da criança, gestante,
            adulto e idoso, até o acompanhamento de condições crônicas e
            agudas, garantindo um cuidado integral e humanizado.
          </p>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento HiperDia (Hipertensão e Diabetes)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento regular de pacientes com hipertensão arterial
                  sistêmica e/ou diabetes mellitus, incluindo avaliação clínica,
                  estratificação de risco cardiovascular, monitoramento de
                  parâmetros glicêmicos e pressóricos, ajustes terapêuticos e
                  orientações sobre autocuidado e adesão ao tratamento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Avaliação e Acompanhamento de Pé Diabético
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação de sensibilidades dos pés, identificação de
                  alterações cutâneas, neurológicas e vasculares, prevenção de
                  úlceras e complicações, orientações sobre cuidados podológicos
                  e educação em saúde para prevenção do pé diabético.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Pré-natal de Risco Habitual/Baixo Risco
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Consultas intercaladas com o médico, avaliação obstétrica,
                  solicitação de exames laboratoriais e complementares conforme
                  protocolos, prescrição de cuidados de enfermagem e
                  orientações sobre gestação, parto e puerpério, promovendo uma
                  gestação saudável.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consulta de Puericultura
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento do crescimento e desenvolvimento infantil nos
                  meses 2, 4, 9 e 18, além de consultas complementares conforme
                  necessidade. Avaliação antropométrica, do desenvolvimento
                  neuropsicomotor, orientações sobre alimentação, vacinação e
                  cuidados com a criança.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Coleta de Exame Citopatológico (Papanicolau)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Rastreamento do câncer de colo uterino em mulheres de 25 a 64
                  anos, realização do exame preventivo, orientações sobre
                  periodicidade e importância do rastreamento oncológico.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Solicitação de Exames Complementares
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prescrição e solicitação de exames laboratoriais e de imagem
                  conforme necessidade clínica e protocolos estabelecidos,
                  garantindo a continuidade do cuidado e o diagnóstico
                  adequado.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento de Lesões e Prescrição de Cuidados de Enfermagem
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação de feridas e lesões cutâneas, prescrição de
                  coberturas e cuidados específicos, orientação à equipe técnica
                  de enfermagem para execução dos curativos e acompanhamento da
                  evolução do processo de cicatrização.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Triagem Neonatal
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento e rastreio de recém-nascidos para realização da
                  triagem neonatal (teste do pezinho, teste da orelhinha, teste
                  do olhinho), orientações sobre a importância dos exames e
                  encaminhamentos quando necessário.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas de Demanda Espontânea
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento para avaliação e encaminhamento de condições agudas
                  e crônicas, orientações em saúde, prescrição de cuidados
                  conforme necessidade individual e acolhimento das demandas de
                  saúde da população adscrita.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações em Saúde da Mulher
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientações sobre planejamento familiar, métodos
                  contraceptivos, gestação, exames ginecológicos, mamografia,
                  prevenção de doenças e promoção da saúde da mulher em todas as
                  faixas etárias.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Prescrição de Cuidados Preparatórios
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prescrição de cuidados preparatórios para exames e
                  procedimentos, orientações sobre preparo necessário, jejum,
                  medicações e demais cuidados específicos conforme protocolos
                  estabelecidos.
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        {/* Card Assistência de Enfermagem */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Assistência de Enfermagem na Atenção Primária
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Cuidado integral, humanizado e baseado em evidências científicas
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center items-center px-4 md:px-8 lg:px-12">
              <ImageWithCredit
                src={enfermeiraImg}
                alt="Enfermeira realizando atendimento ao paciente"
                className="max-w-md sm:max-w-lg md:max-w-xl"
                centered={true}
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              A assistência de enfermagem na Atenção Primária à Saúde constitui-se
              como um componente essencial do Sistema Único de Saúde (SUS),
              fundamentada na Sistematização da Assistência de Enfermagem (SAE) e
              no Processo de Enfermagem. As consultas de enfermagem promovem o
              cuidado integral ao indivíduo, família e comunidade, abrangendo
              desde a prevenção de agravos até o tratamento de condições agudas e
              crônicas. Através de uma abordagem holística e baseada em evidências
              científicas, as enfermeiras contribuem significativamente para a
              melhoria da qualidade de vida e dos indicadores de saúde da
              população, fortalecendo os princípios de universalidade, integralidade
              e equidade do SUS.
            </p>
          </div>
        </div>
        {}
        <EscalaFirestore
          escalaKey="sala-atendimento-enfermagem"
          titulo="Profissionais Escalados no Atendimento de Enfermagem"
        />
        {}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-sm mb-6 border border-green-200">
          <h2 className="text-xl font-bold text-green-900 mb-4">Calendário de Consultas de Puericultura</h2>

          <p className="text-neutral-700 text-sm mb-5 leading-relaxed">
            O acompanhamento regular da criança através da puericultura é
            fundamental para garantir seu desenvolvimento físico, motor, cognitivo
            e emocional saudável. As consultas de puericultura realizadas pelas
            enfermeiras complementam o acompanhamento pediátrico, garantindo
            atenção integral à saúde da criança conforme as diretrizes do
            Ministério da Saúde.
          </p>

          <div className="bg-white rounded-lg p-4 mb-5 shadow-sm">
            <p className="text-neutral-900 text-sm leading-relaxed">
              A seguir, apresentamos a tabela de acompanhamento da puericultura
              conforme as diretrizes do Ministério da Saúde. As consultas são
              realizadas por diferentes profissionais conforme a faixa etária:{" "}
              <strong className="text-neutral-900">linhas com fundo branco</strong> indicam atendimento com
              médico pediatra, enquanto <strong className="text-neutral-900">linhas com fundo azul</strong>{" "}
              indicam atendimento realizado por enfermeira da equipe.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-5 shadow-sm">
            <p className="font-bold text-green-900 mb-3 text-sm">Legenda:</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white border-2 border-neutral-400 rounded shadow-sm"></div>
                <span className="text-neutral-800 font-medium text-sm">Consulta com Médico Pediatra</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-100 border-2 border-blue-300 rounded shadow-sm"></div>
                <span className="text-neutral-800 font-medium text-sm">Consulta com Enfermeira</span>
              </div>
            </div>
          </div>

          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto mb-4">
            <div className="overflow-hidden rounded-lg shadow-sm border border-green-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-600 to-green-700">
                    <th className="border-b border-green-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Idade da Criança
                    </th>
                    <th className="border-b border-green-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Período de Consulta
                    </th>
                    <th className="border-b border-green-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Profissional Responsável
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm bg-white">
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="border-b border-green-100 px-4 py-3 bg-white">
                      <strong className="text-neutral-900">Recém-nascido</strong>
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      1ª semana
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      Médico Pediatra
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="border-b border-green-100 px-4 py-3 bg-white">
                      <strong className="text-neutral-900">1 mês</strong>
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      1 mês de vida
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      Médico Pediatra
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">2 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      2 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      Enfermeira
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">4 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      4 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      Enfermeira
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="border-b border-green-100 px-4 py-3 bg-white">
                      <strong className="text-neutral-900">6 meses</strong>
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      6 meses de vida
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      Médico Pediatra
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">9 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      9 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      Enfermeira
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="border-b border-green-100 px-4 py-3 bg-white">
                      <strong className="text-neutral-900">12 meses</strong>
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      12 meses de vida
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      Médico Pediatra
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">18 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      18 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      Enfermeira
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 transition-colors">
                    <td className="border-b border-green-100 px-4 py-3 bg-white">
                      <strong className="text-neutral-900">24 meses</strong>
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      24 meses (2 anos) de vida
                    </td>
                    <td className="border-b border-green-100 px-4 py-3 text-neutral-900 bg-white">
                      Médico Pediatra
                    </td>
                  </tr>
                  <tr className="bg-green-100/50 hover:bg-green-200/50 transition-colors">
                    <td className="px-4 py-3">
                      <strong className="text-neutral-900">Após 24 meses</strong>
                    </td>
                    <td className="px-4 py-3 text-neutral-900">
                      Consultas anuais
                    </td>
                    <td className="px-4 py-3 text-neutral-900">
                      Conforme necessidade
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-3 mb-4">
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">Recém-nascido</p>
              <p className="text-xs text-neutral-900">1ª semana - Médico Pediatra</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">1 mês</p>
              <p className="text-xs text-neutral-900">1 mês de vida - Médico Pediatra</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">2 meses</p>
              <p className="text-xs text-neutral-900">2 meses de vida - Enfermeira</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">4 meses</p>
              <p className="text-xs text-neutral-900">4 meses de vida - Enfermeira</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">6 meses</p>
              <p className="text-xs text-neutral-900">6 meses de vida - Médico Pediatra</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">9 meses</p>
              <p className="text-xs text-neutral-900">9 meses de vida - Enfermeira</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">12 meses</p>
              <p className="text-xs text-neutral-900">12 meses de vida - Médico Pediatra</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">18 meses</p>
              <p className="text-xs text-neutral-900">18 meses de vida - Enfermeira</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">24 meses</p>
              <p className="text-xs text-neutral-900">24 meses (2 anos) de vida - Médico Pediatra</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900 mb-2">Após 24 meses</p>
              <p className="text-xs text-neutral-900">Consultas anuais - Conforme necessidade</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm border border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-2 text-base">Importante</h3>
                <p className="text-neutral-800 text-sm leading-relaxed">
                  SEMPRE traga a carteira de vacinação da criança. É através dela que acompanhamos o desenvolvimento e verificamos se as vacinas estão em dia.
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Público-alvo">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Gestantes em acompanhamento pré-natal de risco habitual/baixo
                risco
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças para avaliação do crescimento e desenvolvimento
                infantil (puericultura)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários com hipertensão arterial sistêmica e/ou diabetes
                mellitus em acompanhamento regular (HiperDia)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com diabetes mellitus para avaliação e acompanhamento
                de pé diabético
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres de 25 a 64 anos para rastreamento do câncer de colo
                uterino (exame citopatológico)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários com feridas e lesões que necessitam de avaliação e
                prescrição de plano terapêutico
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Recém-nascidos para acompanhamento e realização da triagem
                neonatal
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                População adscrita que necessita de orientações em saúde,
                avaliação clínica e encaminhamentos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres que necessitam de orientações sobre planejamento
                familiar, gravidez, exames ginecológicos e mamografia
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Acesso ao Serviço" className="mb-8">
          <div className="space-y-4">
            <div className="relative pl-12 pb-8 border-l-2 border-blue-200">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                1
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Agendamento na Sala de Agendamentos
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Dirija-se à{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                  {" "}para agendamento de consulta de enfermagem. Não esqueça de
                  consultar os{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    documentos necessários
                  </Link>
                  {" "}antes de comparecer.
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
                  A consulta será agendada com a enfermeira responsável pela sua
                  área de abrangência, garantindo o vínculo e a continuidade do
                  cuidado.
                </p>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                3
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Comparecimento à Consulta
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Apresentar-se no horário agendado com documentação completa,
                  exames complementares quando disponíveis e carteira de
                  vacinação (quando aplicável).
                </p>
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
                Antes de se dirigir à sala de consulta da enfermeira
                responsável, é necessário passar pela recepção da unidade para
                realização da ficha de atendimento. Esta medida é essencial para
                agilizar o processo de atendimento e garantir a organização
                adequada do fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="enfermeiras" />
      </div>
    </PageContainer>
  );
}
