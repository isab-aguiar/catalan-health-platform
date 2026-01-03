import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink } from "lucide-react";
import {
  BackButton,
  RecommendedReadingCarousel,
  Alert,
  InfoBox,
} from "../../components/common";
import pediatriaImg from "../../assets/pediatria/pediatria.png";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Pediatra() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório Pediátrico
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O atendimento pediátrico na ESF Catalão oferece cuidado
            especializado para crianças desde o nascimento até a adolescência.
            Realizamos consultas de puericultura (acompanhamento do
            desenvolvimento infantil), atendimentos de urgências pediátricas e
            orientações aos pais sobre saúde e desenvolvimento dos filhos.
          </p>
          <div className="bg-blue-100/50 border border-blue-300 rounded-lg p-4 mb-5">
            <p className="text-neutral-700 text-sm leading-relaxed">
              Para informações sobre a documentação necessária para acesso aos
              serviços oferecidos, favor consultar a{" "}
              <Link
                to="/servicos/sala-4#documentacao-necessaria"
                className="text-blue-700 hover:text-blue-900 underline font-semibold"
              >
                Sala de Agendamentos
              </Link>
              .
            </p>
          </div>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Puericultura
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento do crescimento e desenvolvimento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atualização vacinal
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Verificação e orientação sobre vacinas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas de rotina e urgências
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação de doenças comuns da infância
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Avaliação nutricional
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientação sobre alimentação saudável
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientação aos pais
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Suporte no cuidado e desenvolvimento infantil
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Acompanhamento da Saúde Infantil
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Cuidado integral para o crescimento e desenvolvimento saudável
                da criança
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex justify-center px-4 md:px-8 lg:px-12">
              <img
                src={pediatriaImg}
                alt="Acompanhamento da Saúde Infantil - Pediatria"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
              />
            </div>

            <p className="text-neutral-700 leading-relaxed mb-5">
              O acompanhamento da saúde infantil é fundamental para garantir o
              crescimento e desenvolvimento saudável da criança. Através da
              puericultura, realizamos avaliações regulares do desenvolvimento
              físico, motor, cognitivo e emocional, além de orientações sobre
              alimentação, vacinação, prevenção de acidentes e promoção de
              hábitos saudáveis. Este acompanhamento permite identificar
              precocemente possíveis alterações e intervir de forma adequada,
              contribuindo para uma infância saudável e um futuro com melhor
              qualidade de vida.
            </p>

            <div className="grid md:grid-cols-1 gap-4">
              <a
                href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/primeira-infancia/acompanhamento-da-saude"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      Saiba Mais
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Consulte informações completas sobre acompanhamento da
                      saúde infantil no site oficial do Ministério da Saúde.
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

        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças de 0 a 12 anos (puericultura e consultas de rotina)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças com doenças agudas (febre, diarreia, vômitos, gripes)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças com doenças crônicas em acompanhamento
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Recém-nascidos para primeira consulta após alta da maternidade
              </div>
            </div>
          </div>
        </InfoBox>

        <EscalaFirestore
          escalaKey="consultorio-pediatrico"
          titulo="Profissionais Escalados no Consultório Pediátrico"
        />

        <InfoBox title="Acesso ao Serviço" className="mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-md flex-shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1 min-w-0 bg-gradient-to-r from-purple-50 to-transparent p-3 sm:p-4 rounded-lg border-l-4 border-purple-500">
                <strong className="text-neutral-900 text-sm sm:text-base block mb-2">
                  Agendamento na Sala de Agendamentos
                </strong>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed break-words">
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
                  . Consultas programadas conforme escala do pediatra.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-md flex-shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1 min-w-0 bg-gradient-to-r from-emerald-50 to-transparent p-3 sm:p-4 rounded-lg border-l-4 border-emerald-500">
                <strong className="text-neutral-900 text-sm sm:text-base block mb-2">
                  Comparecimento à Consulta
                </strong>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed break-words">
                  Apresentar-se no horário agendado com 15 minutos de
                  antecedência, documentação completa e carteira de vacinação
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            Calendário de Consultas de Puericultura
          </h2>

          <p className="text-neutral-700 text-sm mb-5 leading-relaxed">
            O acompanhamento regular da criança através da puericultura é
            fundamental para garantir seu desenvolvimento físico, motor,
            cognitivo e emocional saudável. Manter o calendário de consultas em
            dia permite a identificação precoce de possíveis alterações e a
            intervenção adequada, contribuindo para uma infância saudável e um
            futuro com melhor qualidade de vida.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 mb-5 shadow-sm border border-blue-200">
            <p className="text-neutral-900 text-xs sm:text-sm leading-relaxed break-words">
              A seguir, apresentamos a tabela de acompanhamento da puericultura
              conforme as diretrizes do Ministério da Saúde. As consultas são
              realizadas por diferentes profissionais conforme a faixa etária.
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 mb-5 shadow-md border-2 border-neutral-300">
            <p className="font-bold text-neutral-900 mb-3 text-sm sm:text-base">
              Legenda dos Profissionais:
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-blue-50 border-2 border-blue-400 rounded-lg p-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    M
                  </span>
                </div>
                <span className="text-neutral-900 font-semibold text-xs sm:text-sm">
                  Consulta com Médico Pediatra
                </span>
              </div>
              <div className="flex items-center gap-3 bg-pink-50 border-2 border-pink-400 rounded-lg p-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    E
                  </span>
                </div>
                <span className="text-neutral-900 font-semibold text-xs sm:text-sm">
                  Consulta com Enfermeira
                </span>
              </div>
            </div>
          </div>

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
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-500">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">
                        Recém-nascido
                      </strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      1ª semana
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            M
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Médico Pediatra
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-500">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">1 mês</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      1 mês de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            M
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Médico Pediatra
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-pink-50 hover:bg-pink-100 transition-colors border-l-4 border-pink-500">
                    <td className="border-b border-pink-200 px-4 py-3">
                      <strong className="text-neutral-900">2 meses</strong>
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3 text-neutral-900">
                      2 meses de vida
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            E
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Enfermeira
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-pink-50 hover:bg-pink-100 transition-colors border-l-4 border-pink-500">
                    <td className="border-b border-pink-200 px-4 py-3">
                      <strong className="text-neutral-900">4 meses</strong>
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3 text-neutral-900">
                      4 meses de vida
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            E
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Enfermeira
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-500">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">6 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      6 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            M
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Médico Pediatra
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-pink-50 hover:bg-pink-100 transition-colors border-l-4 border-pink-500">
                    <td className="border-b border-pink-200 px-4 py-3">
                      <strong className="text-neutral-900">9 meses</strong>
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3 text-neutral-900">
                      9 meses de vida
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            E
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Enfermeira
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-500">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">12 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      12 meses de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            M
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Médico Pediatra
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-pink-50 hover:bg-pink-100 transition-colors border-l-4 border-pink-500">
                    <td className="border-b border-pink-200 px-4 py-3">
                      <strong className="text-neutral-900">18 meses</strong>
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3 text-neutral-900">
                      18 meses de vida
                    </td>
                    <td className="border-b border-pink-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            E
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Enfermeira
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-500">
                    <td className="border-b border-blue-200 px-4 py-3">
                      <strong className="text-neutral-900">24 meses</strong>
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3 text-neutral-900">
                      24 meses (2 anos) de vida
                    </td>
                    <td className="border-b border-blue-200 px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            M
                          </span>
                        </span>
                        <span className="text-neutral-900 font-medium">
                          Médico Pediatra
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-green-100 hover:bg-green-200 transition-colors border-l-4 border-green-500">
                    <td className="px-4 py-3 border-b border-green-200">
                      <strong className="text-neutral-900">
                        Após 24 meses
                      </strong>
                    </td>
                    <td className="px-4 py-3 text-neutral-900 border-b border-green-200">
                      Consultas anuais
                    </td>
                    <td className="px-4 py-3 text-neutral-900 border-b border-green-200">
                      Conforme necessidade
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3 mb-4">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-3 shadow-md border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">M</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">
                  Recém-nascido
                </p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                1ª semana • Médico Pediatra
              </p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-3 shadow-md border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">M</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">1 mês</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                1 mês de vida • Médico Pediatra
              </p>
            </div>
            <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-3 shadow-md border-l-4 border-l-pink-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">E</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">2 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                2 meses de vida • Enfermeira
              </p>
            </div>
            <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-3 shadow-md border-l-4 border-l-pink-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">E</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">4 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                4 meses de vida • Enfermeira
              </p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-3 shadow-md border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">M</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">6 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                6 meses de vida • Médico Pediatra
              </p>
            </div>
            <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-3 shadow-md border-l-4 border-l-pink-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">E</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">9 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                9 meses de vida • Enfermeira
              </p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-3 shadow-md border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">M</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">12 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                12 meses de vida • Médico Pediatra
              </p>
            </div>
            <div className="bg-pink-50 border-2 border-pink-400 rounded-lg p-3 shadow-md border-l-4 border-l-pink-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">E</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">18 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                18 meses de vida • Enfermeira
              </p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-3 shadow-md border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">M</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">24 meses</p>
              </div>
              <p className="text-xs text-neutral-800 ml-7">
                24 meses (2 anos) • Médico Pediatra
              </p>
            </div>
            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 shadow-md border-l-4 border-l-green-500">
              <p className="text-sm font-bold text-neutral-900 mb-2">
                Após 24 meses
              </p>
              <p className="text-xs text-neutral-800">
                Consultas anuais • Conforme necessidade
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 sm:p-5 shadow-sm border border-green-200">
            <div className="flex items-start gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-white sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-green-900 mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Importante
                </h3>
                <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed break-words">
                  SEMPRE traga a carteira de vacinação da criança. É através
                  dela que acompanhamos o desenvolvimento e verificamos se as
                  vacinas estão em dia.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-4 sm:p-6 shadow-md mt-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold mb-2 text-base sm:text-lg">
                Orientação Importante
              </p>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed break-words">
                Antes de se dirigir à sala de consulta do pediatra responsável,
                é necessário passar pela recepção da unidade para realização da
                ficha de atendimento. Esta medida é essencial para agilizar o
                processo de atendimento e garantir a organização adequada do
                fluxo de pacientes na unidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <RecommendedReadingCarousel pageId="pediatra" />
      </div>
    </PageContainer>
  );
}
