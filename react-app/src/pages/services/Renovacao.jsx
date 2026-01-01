import { AlertCircle, FileText } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import PageContainer from "../../components/layout/PageContainer";
import InfoBox from "../../components/common/InfoBox";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Renovacao() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Renovação de Receitas
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        <CampanhasPaginaWrapper pagina="renovacao" />

        <AvisosPaginaWrapper pagina="renovacao" />

        {/* Sobre o Serviço */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Sobre o Serviço
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 text-sm leading-relaxed">
              A Renovação de Receitas é um serviço oferecido para pacientes que
              fazem uso contínuo de medicamentos e precisam renovar suas
              prescrições médicas. Este serviço é ideal para quem possui condições
              crônicas controladas, como hipertensão, diabetes e outras doenças
              que exigem tratamento prolongado e acompanhamento regular.
            </p>
          </div>
        </div>

        {/* Para quem é indicado? */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Para quem é indicado?
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Pacientes com doenças crônicas controladas (hipertensão,
                    diabetes, entre outras)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Pessoas que fazem uso contínuo de medicamentos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Pacientes que já possuem acompanhamento médico regular na
                    unidade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prazo de Validade */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6" id="prazo-validade">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Você sabe qual o prazo de validade de sua receita?
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              É importante conhecer o prazo de validade da sua receita para evitar
              que ela expire antes da renovação. Os prazos variam conforme o tipo
              de medicamento prescrito:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Receitas Controladas
                </h3>
                <p className="text-sm text-neutral-700 mb-2 leading-relaxed">
                  <strong>Prazo de validade:</strong>
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  60 dias (2 meses) contados a partir da data de emissão da
                  receita.
                </p>
                <p className="text-xs text-neutral-600 mt-2 italic">
                  Aplicável a medicamentos sujeitos a controle especial conforme
                  legislação vigente.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Medicamentos de Uso Contínuo
                </h3>
                <p className="text-sm text-neutral-700 mb-2 leading-relaxed">
                  <strong>Prazo de validade:</strong>
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  6 meses (180 dias) contados a partir da data de emissão da
                  receita.
                </p>
                <p className="text-xs text-neutral-600 mt-2 italic">
                  Aplicável a medicamentos para tratamento de condições crônicas
                  controladas.
                </p>
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
                    Verifique sempre a data de emissão da sua receita e planeje a renovação antes do vencimento para garantir a continuidade do tratamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentos Necessários */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Documentos Necessários
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
              Para solicitar a renovação de receitas, é obrigatória a apresentação
              da seguinte documentação:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Documento de Identificação com Foto
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Documento de identidade com foto e/ou Carteira de Habilitação do titular
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    CPF - Cadastro de Pessoa Física
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Documento físico original ou número do CPF do titular
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <strong className="text-neutral-800 text-sm">
                    Receita Antiga
                  </strong>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    A receita que precisa ser renovada
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 shadow-sm border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 mb-2 text-base">Normativa</h3>
                    <p className="text-neutral-800 text-sm leading-relaxed">
                      Documento de identificação com foto e CPF são obrigatórios para qualquer atendimento na unidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EscalaFirestore
          escalaKey="renovacao-receitas"
          titulo="Profissionais Escalados na Renovação de Receitas"
        />

        {/* Como Funciona */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Como Funciona</p>
              <p className="text-sm text-white/95 leading-relaxed">
                A receita será analisada e renovada pelo médico responsável e
                estará disponível para retirada na recepção na sexta-feira mais
                próxima. Para a retirada, é obrigatória a apresentação de
                documento de identidade oficial com foto e CPF do titular, podendo
                ser apresentado o documento físico ou o número do CPF.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="renovacao" />
      </div>
    </PageContainer>
  );
}
