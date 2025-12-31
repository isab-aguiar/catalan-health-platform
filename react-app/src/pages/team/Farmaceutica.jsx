import { Link } from "react-router-dom";
import { AlertCircle, Heart, ExternalLink } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import farmaceuticaImg from "../../assets/farmaceutica/farmaceutica.jpg";
import { PageContainer } from "../../components/layout";

export default function Farmaceutica() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório Farmacêutico
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
            O Consultório Farmacêutico é um serviço especializado onde o
            farmacêutico realiza atendimento individual para orientação sobre o
            uso correto de medicamentos, manejo de tratamentos e acompanhamento
            farmacoterapêutico. É um espaço para esclarecer dúvidas e garantir
            que você está utilizando seus medicamentos da melhor forma possível.
          </p>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientação sobre medicamentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Como tomar, horários, interações
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Acompanhamento farmacoterapêutico
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação da eficácia do tratamento
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Revisão de medicamentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Análise de todos os remédios em uso
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Identificação de problemas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Efeitos adversos, interações medicamentosas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Educação em saúde
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Informações sobre sua condição e tratamento
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        {/* Card Consultório Farmacêutico */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Cuidado Farmacêutico Clínico
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Acompanhamento especializado para uso seguro e eficaz de medicamentos
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={farmaceuticaImg}
                alt="Cuidado Farmacêutico Clínico - Consultório Farmacêutico"
                className="max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm"
                centered={true}
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              O consultório farmacêutico é um espaço dedicado ao cuidado clínico centrado no paciente, onde o farmacêutico atua de forma colaborativa com a equipe de saúde para garantir o uso racional de medicamentos. Por meio de consultas individualizadas, são identificados e resolvidos problemas relacionados aos medicamentos, orientando sobre o uso correto, interações medicamentosas, efeitos adversos e promovendo a adesão ao tratamento. Esse acompanhamento contribui para melhores resultados terapêuticos, redução de custos e qualidade de vida.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Governo de Minas Gerais */}
              <a
                href="https://www.saude.mg.gov.br/servicosfarmaceuticos/"
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
                      Consulte informações completas sobre os serviços farmacêuticos no site oficial da Secretaria de Estado de Saúde de Minas Gerais.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                      <ExternalLink size={16} />
                      <span>Acessar Site da SES-MG</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Profissionais e Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <div className="overflow-hidden rounded-lg shadow-sm border border-primary-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Período
                    </th>
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Horário
                    </th>
                    <th className="border-b border-primary-300 px-4 py-3 text-left font-semibold text-white text-sm">
                      Profissionais Responsáveis
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm bg-white">
                  <tr className="hover:bg-primary-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <strong className="text-primary-900">Tarde</strong>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      13h00 às 16h00
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      Marcella Oliveira<br/>
                      <span className="text-neutral-600 text-xs">Função: Farmacêutica Clínica</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-white/70 border border-primary-200 rounded-lg p-4 shadow-sm">
              <div className="mb-3">
                <span className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold px-3 py-1 rounded">
                  Tarde
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-primary-200">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-primary-900">13h00 às 16h00</p>
                </div>
                <div className="pb-2 border-b border-primary-200">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Marcella Oliveira</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Farmacêutica Clínica</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes que usam múltiplos medicamentos (polifarmácia)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com dúvidas sobre como tomar seus medicamentos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com dificuldades de aderir ao tratamento
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários que apresentam reações adversas ou efeitos colaterais
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com doenças crônicas em tratamento contínuo
              </div>
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
                  Identificação da Profissional
                </strong>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  A consulta será agendada com a farmacêutica responsável
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
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                  Apresentar-se no horário agendado com documentação completa e:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-neutral-700">Todos os medicamentos em uso (incluindo receitas e embalagens)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-neutral-700">Lista de problemas de saúde, se souber</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-sm border border-blue-200 mb-6">
          <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
            <AlertCircle size={20} className="text-blue-600" />
            Dicas Importantes
          </h3>

          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">O que trazer na consulta:</h4>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Traga <strong className="text-blue-800">TODOS os medicamentos</strong> que você usa, incluindo vitaminas, suplementos e medicamentos de uso ocasional.
                Isso ajuda o farmacêutico a fazer uma avaliação completa e identificar possíveis interações medicamentosas.
              </p>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3 text-sm">Benefícios do Consultório Farmacêutico:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-700">Melhora do uso dos medicamentos</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-700">Redução de efeitos adversos</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-700">Economia evitando desperdícios</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-700">Melhor controle das condições de saúde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
                Antes de se dirigir à sala de consulta da farmacêutica
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
        <RecommendedReadingCarousel pageId="farmaceutica" />
      </div>
    </PageContainer>
  );
}
