import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { BackButton, RecommendedReadingCarousel, Alert, InfoBox } from "../../components/common";
import { PageContainer } from "../../components/layout";

export default function Ginecologista() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 break-words"
              >
                Ginecologia e Obstetrícia
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
            O atendimento de ginecologia e obstetrícia oferece cuidado integral à
            saúde feminina em todas as fases da vida. Realizamos consultas
            ginecológicas, acompanhamento pré-natal intercalado com enfermagem,
            preventivo de câncer de colo uterino (Papanicolau), inserção e
            retirada de DIU de cobre, e planejamento familiar.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas Ginecológicas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação e acompanhamento da saúde íntima feminina
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Inserção e Retirada de DIU de Cobre
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procedimento de planejamento familiar. Consulte a documentação
                  necessária na{" "}
                  <Link
                    to="/servicos/sala-4"
                    className="text-info hover:text-primary-700 underline font-semibold"
                  >
                    Sala de Agendamentos
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Pré-natal Intercalado
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento da gestante em consultas intercaladas entre
                  ginecologista e enfermagem, conforme cronograma estabelecido
                  pelo Ministério da Saúde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Preventivo (Papanicolau)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Prevenção do câncer de colo de útero, realizado pela equipe de
                  enfermagem
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Planejamento Familiar
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientação sobre métodos contraceptivos e saúde reprodutiva
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        <InfoBox title="Cronograma de Pré-natal">
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            O acompanhamento pré-natal segue protocolo estabelecido pelo
            Ministério da Saúde, com consultas intercaladas entre ginecologista
            e enfermagem para garantir o cuidado integral da gestante.
          </p>

          <div className="mb-5">
            <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
              Distribuição das Consultas
            </h3>
            <div className="space-y-2">
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">1ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">2ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">3ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">4ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">5ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">6ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-green-900">7ª Consulta:</strong> Realizada com Enfermagem
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-blue-900">8ª Consulta:</strong> Realizada com Ginecologista
                </p>
              </div>
              <div className="bg-neutral-50 border-l-4 border-neutral-400 rounded-r p-3">
                <p className="text-sm text-neutral-700">
                  <strong className="text-neutral-900">Demais consultas:</strong> Continuam intercaladas entre
                  Ginecologista e Enfermagem conforme demanda e necessidade clínica
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-neutral-800 mb-2 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600" />
              Avaliação de Risco Gestacional
            </h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>
                <strong className="text-amber-900">Gestação de Risco Habitual (baixo risco):</strong>{" "}
                Acompanhamento realizado integralmente na ESF (Estratégia Saúde da Família),
                com consultas intercaladas entre ginecologista e enfermagem.
              </p>
              <p>
                <strong className="text-amber-900">Gestação de Alto Risco:</strong>{" "}
                Gestante é encaminhada para acompanhamento especializado no PNAR
                (Pré-Natal de Alto Risco), mas <strong>continua sendo acompanhada
                também na ESF</strong> para cuidado integral e coordenado.
              </p>
            </div>
          </div>

          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <p className="text-sm text-neutral-700">
              <strong className="text-blue-900">Importante:</strong> O padrão de intercalação é:
              1ª consulta com Enfermagem, 2ª com Ginecologista, e assim sucessivamente,
              garantindo o acompanhamento completo e contínuo durante toda a gestação.
            </p>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Atendimento">
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            O atendimento de ginecologia e obstetrícia é realizado pela
            médica ginecologista/obstetra da equipe, com possibilidade de
            encaminhamento para especialista quando necessário.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Tipo de Atendimento
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Como Acessar
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Consulta Ginecológica
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Agendamento na{" "}
                    <Link
                      to="/servicos/sala-4"
                      className="text-info hover:text-primary-700 underline font-semibold"
                    >
                      Sala de Agendamentos
                    </Link>{" "}
                    com solicitação de retorno escrito por médica ou por
                    encaminhamento
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">
                      Inserção/Retirada de DIU de Cobre
                    </strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Agendamento na{" "}
                    <Link
                      to="/servicos/sala-4"
                      className="text-info hover:text-primary-700 underline font-semibold"
                    >
                      Sala de Agendamentos
                    </Link>
                    . Verifique a documentação necessária para este serviço
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Pré-natal</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Primeiro é agendado com enfermeira, que faz o encaminhamento
                    necessário. Consultas intercaladas conforme cronograma
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Preventivo (Papanicolau)</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Com enfermeira (sem necessidade de encaminhamento)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Profissionais e Horários de Atendimento">
          {/* Versão Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Período
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissionais Responsáveis
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Manhã</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    07h00 às 11h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Dra. Luana Nogueira Godoi<br/>
                    <span className="text-neutral-600 text-xs">Função: Médica Ginecologista/Obstetra</span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    13h00 às 16h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Dra. Luana Nogueira Godoi<br/>
                    <span className="text-neutral-600 text-xs">Função: Médica Ginecologista/Obstetra</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Manhã
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">07h00 às 11h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Dra. Luana Nogueira Godoi</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Médica Ginecologista/Obstetra</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Tarde
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">13h00 às 16h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Dra. Luana Nogueira Godoi</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Médica Ginecologista/Obstetra</p>
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
                Mulheres que iniciaram vida sexual (consultas anuais de rotina)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Gestantes para acompanhamento pré-natal
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres de 25 a 64 anos (preventivo de câncer de colo uterino)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres em climatério ou menopausa
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres que necessitam de planejamento familiar
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Acesso ao Serviço">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Agendamento na Central de Marcação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Dirija-se à{" "}
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
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Agendamento Direto com Ginecologista
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Disponível somente para pacientes com solicitação de retorno
                  escrito por médica ou por encaminhamento médico
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Para Preventivo (Papanicolau)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Procure a enfermeira da sua equipe (sem necessidade de
                  encaminhamento)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Para Pré-natal
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Primeiro é agendado com enfermeira, que faz o encaminhamento
                  necessário para o ginecologista
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
                <strong>Preventivo (Papanicolau):</strong> Deve ser feito
                anualmente por mulheres de 25 a 64 anos que já iniciaram vida
                sexual. É rápido, indolor e pode salvar sua vida! Agende com a
                enfermeira.
              </p>
              <p>
                <strong>Descobriu que está grávida?</strong> Parabéns! Inicie o
                pré-natal o mais cedo possível. Procure a{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-info hover:text-primary-700 underline font-semibold"
                >
                  Sala de Agendamentos
                </Link>{" "}
                para agendar sua primeira consulta. O pré-natal é essencial para
                uma gravidez saudável!
              </p>
            </div>
          </Alert>
        </div>
        {}
        <InfoBox title="Documentação Necessária" highlight={true}>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Encaminhamento médico
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Para consultas ginecológicas especializadas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Exames anteriores
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">Se houver</p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Orientação Importante</p>
              <p className="text-sm text-white/90">
                Antes de se dirigir à sala de consulta do ginecologista
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
        <RecommendedReadingCarousel pageId="ginecologista" />
      </div>
    </PageContainer>
  );
}
