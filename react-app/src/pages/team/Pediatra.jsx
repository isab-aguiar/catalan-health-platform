import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import pediatriaImg from "../../assets/pediatria/pediatria.png";
import { PageContainer } from "../../components/layout";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Pediatra() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório Pediátrico
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
            O atendimento pediátrico na ESF Catalão oferece cuidado
            especializado para crianças desde o nascimento até a adolescência.
            Realizamos consultas de puericultura (acompanhamento do
            desenvolvimento infantil), atendimentos de urgências pediátricas e
            orientações aos pais sobre saúde e desenvolvimento dos filhos.
          </p>
          <div className="bg-blue-100/50 border border-blue-300 rounded-lg p-4 mb-5">
            <p className="text-neutral-700 text-sm leading-relaxed">
              Para informações sobre a documentação necessária para acesso aos serviços oferecidos, favor consultar a{" "}
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
                <strong className="text-neutral-800 text-sm">Puericultura</strong>
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
        {}
        {/* Card Acompanhamento da Saúde Infantil */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Acompanhamento da Saúde Infantil
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-1">
                Cuidado integral para o crescimento e desenvolvimento saudável da criança
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center px-4 md:px-8 lg:px-12">
              <img
                src={pediatriaImg}
                alt="Acompanhamento da Saúde Infantil - Pediatria"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              O acompanhamento da saúde infantil é fundamental para garantir o crescimento e desenvolvimento saudável da criança. Através da puericultura, realizamos avaliações regulares do desenvolvimento físico, motor, cognitivo e emocional, além de orientações sobre alimentação, vacinação, prevenção de acidentes e promoção de hábitos saudáveis. Este acompanhamento permite identificar precocemente possíveis alterações e intervir de forma adequada, contribuindo para uma infância saudável e um futuro com melhor qualidade de vida.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Ministério da Saúde */}
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
                      Consulte informações completas sobre acompanhamento da saúde infantil no site oficial do Ministério da Saúde.
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
        {}
        <EscalaFirestore
          escalaKey="consultorio-pediatrico"
          titulo="Profissionais Escalados no Consultório Pediátrico"
        />
        {}
        <InfoBox title="Acesso ao Serviço">
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

            <div className="relative pl-12">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-r-lg">
                <strong className="text-neutral-900 text-base block mb-2">
                  Comparecimento à Consulta
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Apresentar-se no horário agendado com 15 minutos de
                  antecedência, documentação completa e carteira de vacinação
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Calendário de Consultas de Puericultura">
          <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
            O acompanhamento regular da criança através da puericultura é fundamental para garantir seu desenvolvimento físico, motor, cognitivo e emocional saudável. Manter o calendário de consultas em dia permite a identificação precoce de possíveis alterações e a intervenção adequada, contribuindo para uma infância saudável e um futuro com melhor qualidade de vida.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4 mb-4">
            <p className="text-neutral-700 text-sm leading-relaxed">
              A seguir, apresentamos a tabela de acompanhamento da puericultura conforme as diretrizes do Ministério da Saúde. As consultas são realizadas por diferentes profissionais conforme a faixa etária: <strong>linhas com fundo branco</strong> indicam atendimento com médico pediatra, enquanto <strong>linhas com fundo azul</strong> indicam atendimento realizado por enfermeira da equipe.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 mb-4 text-sm">
            <p className="font-semibold text-neutral-800 mb-2">Legenda:</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-neutral-300 rounded"></div>
                <span className="text-neutral-700">Consulta com Médico Pediatra</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-50 border border-pink-200 rounded"></div>
                <span className="text-neutral-700">Consulta com Enfermeira</span>
              </div>
            </div>
          </div>

          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Idade da Criança
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período de Consulta
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Recém-nascido</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    1ª semana
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">1 mês</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    1 mês de vida
                  </td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="border border-pink-200 px-4 py-3">
                    <strong className="text-neutral-800">2 meses</strong>
                  </td>
                  <td className="border border-pink-200 px-4 py-3 text-neutral-700">
                    2 meses de vida
                  </td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="border border-pink-200 px-4 py-3">
                    <strong className="text-neutral-800">4 meses</strong>
                  </td>
                  <td className="border border-pink-200 px-4 py-3 text-neutral-700">
                    4 meses de vida
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">6 meses</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    6 meses de vida
                  </td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="border border-pink-200 px-4 py-3">
                    <strong className="text-neutral-800">9 meses</strong>
                  </td>
                  <td className="border border-pink-200 px-4 py-3 text-neutral-700">
                    9 meses de vida
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">12 meses</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    12 meses de vida
                  </td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="border border-pink-200 px-4 py-3">
                    <strong className="text-neutral-800">18 meses</strong>
                  </td>
                  <td className="border border-pink-200 px-4 py-3 text-neutral-700">
                    18 meses de vida
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">24 meses</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    24 meses (2 anos) de vida
                  </td>
                </tr>
                <tr className="bg-info/10">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Após 24 meses</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Consultas anuais
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-3 mb-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">Recém-nascido</p>
              <p className="text-xs text-neutral-600">1ª semana</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">1 mês</p>
              <p className="text-xs text-neutral-600">1 mês de vida</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">2 meses</p>
              <p className="text-xs text-neutral-600">2 meses de vida</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">4 meses</p>
              <p className="text-xs text-neutral-600">4 meses de vida</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">6 meses</p>
              <p className="text-xs text-neutral-600">6 meses de vida</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">9 meses</p>
              <p className="text-xs text-neutral-600">9 meses de vida</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">12 meses</p>
              <p className="text-xs text-neutral-600">12 meses de vida</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">18 meses</p>
              <p className="text-xs text-neutral-600">18 meses de vida</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">24 meses</p>
              <p className="text-xs text-neutral-600">24 meses (2 anos) de vida</p>
            </div>
            <div className="bg-info/10 border border-info rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-800 mb-2">Após 24 meses</p>
              <p className="text-xs text-neutral-600">Consultas anuais</p>
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
        </InfoBox>
        {}
        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientação Importante</p>
              <p className="text-sm text-white/95 leading-relaxed">
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

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="pediatra" />
      </div>
    </PageContainer>
  );
}
