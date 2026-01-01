import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";

export default function AssistenteSocial() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Bolsa Família e Serviço Social
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
            O Serviço Social na ESF Catalão atua na garantia dos direitos
            sociais dos usuários, oferecendo informações e orientações sobre Bolsa Família, Serviço Social e outros programas sociais. Trabalhamos com encaminhamentos e
            suporte em situações de vulnerabilidade social. Trabalhamos de forma
            integrada com a equipe de saúde para promover o bem-estar e a
            qualidade de vida da comunidade.
          </p>
          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Orientações sobre direitos sociais
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Benefícios, programas sociais
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Encaminhamentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Para serviços e programas sociais
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Acolhimento</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Escuta qualificada e humanizada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Articulação</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Com outros serviços da rede de proteção social
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Defesa de direitos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Apoio em situações de violação de direitos
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Quem é a profissional?">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissional
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Cargo
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Noelia</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Assistente Social
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas em situação de vulnerabilidade social
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Famílias que necessitam de orientação sobre benefícios sociais
                (BPC, Bolsa Família, entre outros)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários que precisam de encaminhamentos para a rede
                socioassistencial
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas em situação de violência (doméstica, violação de
                direitos)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com dificuldades sociais que impactam o tratamento de
                saúde
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Como ter acesso?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Procure a recepção
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Informe que deseja falar com a assistente social
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Encaminhamento da equipe
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Médico, enfermeiro ou ACS podem encaminhar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Atendimento direto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Nos horários disponíveis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Traga documentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG, CPF, comprovantes que julgar necessário
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Documentação Necessária">
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
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
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Original ou cópia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Comprovante de Residência
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">Atualizado</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Outros documentos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Conforme a demanda (laudos médicos, declarações, entre outros)
                </p>
              </div>
            </div>
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
                    Noelia<br/>
                    <span className="text-neutral-600 text-xs">Função: Assistente Social</span>
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
                    Noelia<br/>
                    <span className="text-neutral-600 text-xs">Função: Assistente Social</span>
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
                  <p className="text-sm text-neutral-700">Noelia</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Assistente Social</p>
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
                  <p className="text-sm text-neutral-700">Noelia</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Assistente Social</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-4 sm:p-6 shadow-md mt-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold mb-2 text-base sm:text-lg">Orientação Importante</p>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed mb-3 break-words">
                <strong>Atendimento sigiloso:</strong> Todos os atendimentos do
                Serviço Social são confidenciais. Suas informações pessoais são
                protegidas pelo sigilo profissional.
              </p>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed break-words">
                <strong>Você não está sozinho:</strong> O Serviço Social está aqui
                para ajudar você a enfrentar dificuldades e garantir seus
                direitos. Não hesite em procurar apoio quando precisar!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="assistente-social" />
      </div>
    </PageContainer>
  );
}
