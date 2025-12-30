import { AlertCircle, Droplet, Calendar, Info, Baby, ExternalLink, Clock, AlertTriangle, TestTube2, FileText, IdCard } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import testePezinhoImg from "../../assets/teste-pezinho/teste-do-pezinho.svg";
import useScrollToHash from "../../hooks/useScrollToHash";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import EscalaPorSala from "../../components/services/EscalaPorSala";
export default function Procedimentos() {
  useScrollToHash();

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900 whitespace-nowrap"
              >
                Sala de Procedimentos
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
        <CampanhasPaginaWrapper pagina="procedimentos" />
        {}
        <AvisosPaginaWrapper pagina="procedimentos" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            A Sala de Procedimentos da Unidade Básica de Saúde São José realiza diversos procedimentos de enfermagem essenciais para o cuidado integral da população. Entre os serviços oferecidos estão: aplicação de medicamentos injetáveis prescritos por médicos, administração de Noripurum (Sacarato de Hidróxido Férrico III) por via endovenosa mediante prescrição médica e agendamento prévio, realização de Testes Rápidos para detecção de HIV, Sífilis, Hepatites B e C e Gravidez (sem necessidade de pedido médico), e coleta do Teste do Pezinho (Triagem Neonatal) para recém-nascidos.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Aplicação de Injeções
              </h3>
              <p className="text-sm text-neutral-600">
                Administração de medicamentos por via intramuscular, subcutânea
                e endovenosa, conforme prescrição médica.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Administração de Noripurum
              </h3>
              <p className="text-sm text-neutral-600">
                Aplicação endovenosa de Noripurum para tratamento de anemia ferropriva,
                mediante prescrição médica e agendamento prévio.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Testes Rápidos
              </h3>
              <p className="text-sm text-neutral-600">
                Realização de testes rápidos (HIV, Sífilis, Hepatites B e C, Gravidez)
                sem necessidade de pedido médico, com resultados em minutos.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Teste do Pezinho
              </h3>
              <p className="text-sm text-neutral-600">
                Coleta de Triagem Neonatal (Teste do Pezinho) para detecção precoce
                de doenças metabólicas, genéticas e infecciosas em recém-nascidos.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Aferição de Sinais Vitais
              </h3>
              <p className="text-sm text-neutral-600">
                Verificação de sinais vitais realizada de forma sistemática para
                controle ou conforme demanda e necessidade clínica do paciente.
              </p>
            </div>
          </div>
        </InfoBox>

        {/* Card Noripurum Endovenoso */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Droplet size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                Administração de Noripurum Endovenoso
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                O Noripurum (Sacarato de Hidróxido Férrico III) é um medicamento injetável indicado para o tratamento de anemia ferropriva quando a administração oral de ferro é ineficaz ou não tolerada. A aplicação endovenosa permite reposição rápida e eficaz dos níveis de ferro no organismo.
              </p>

              {/* Seção de Agendamento */}
              <div className="bg-white/10 rounded-md p-4 mb-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Como Solicitar</h4>
                    <p className="text-sm text-white/90 mb-3">
                      Para realizar a administração de Noripurum endovenoso, é necessário agendamento prévio. Compareça presencialmente à Sala de Agendamentos com sua prescrição médica.
                    </p>
                    <Link
                      to="/servicos/sala-4"
                      className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-4 py-2 rounded-md hover:bg-neutral-50 transition-colors text-sm"
                    >
                      <Calendar size={16} />
                      Saiba Mais sobre Agendamentos
                    </Link>
                  </div>
                </div>
              </div>

              {/* Informações Importantes - VERSÃO RESUMIDA */}
              <div className="bg-white/10 rounded-md p-4 border border-white/20 mb-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Info size={18} />
                  Informações Importantes
                </h4>
                <div className="space-y-2 text-sm text-white/90">
                  <p>
                    <strong>Indicado para:</strong> Tratamento de anemia ferropriva quando o ferro oral não é tolerado ou eficaz.
                  </p>
                  <p>
                    <strong>Efeitos colaterais:</strong> Podem ocorrer reações leves no local da aplicação, náusea ou dor de cabeça. Informe qualquer reação ao profissional de saúde.
                  </p>
                  <p>
                    <strong>Importante:</strong> Este procedimento requer prescrição médica e acompanhamento profissional durante toda a aplicação.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/90 text-xs italic">
                  <strong>Atenção:</strong> Esta é uma orientação geral. Sempre siga as recomendações do seu médico e esclareça dúvidas com os profissionais de saúde da unidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Teste do Pezinho */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Baby size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Triagem Neonatal (Teste do Pezinho)
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Exame fundamental para detecção precoce de doenças
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center px-4 md:px-8 lg:px-12">
              <ImageWithCredit
                src={testePezinhoImg}
                alt="Teste do Pezinho - Triagem Neonatal"
                credit="Fonte: Ministério da Saúde"
                creditPosition="below"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              O Teste do Pezinho é um exame de triagem neonatal obrigatório e gratuito oferecido pelo Sistema Único de Saúde (SUS). Realizado através da coleta de algumas gotas de sangue do calcanhar do recém-nascido, permite identificar precocemente doenças metabólicas, genéticas e infecciosas que podem causar danos irreversíveis ao desenvolvimento da criança se não tratadas a tempo.
            </p>

            {/* Cronograma e Prazos */}
            <div className="mb-5">
              <h3 className="font-semibold text-neutral-800 text-lg mb-4">
                Cronograma e Prazos para Realização
              </h3>

              <div className="space-y-3">
                {/* Período Ideal */}
                <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-4">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">
                        Período Ideal: 3º ao 5º dia de vida
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Este é o intervalo tecnicamente recomendado pelo Ministério da Saúde e pelas sociedades de pediatria. Após as primeiras 48 horas de vida, o metabolismo do recém-nascido já se estabilizou e houve ingestão proteica suficiente (leite materno ou fórmula) para a detecção precisa de distúrbios como a Fenilcetonúria. A coleta neste período permite que o diagnóstico e o tratamento ocorram antes do surgimento de sintomas clínicos ou sequelas irreversíveis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Período Aceitável */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-4">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Período Aceitável: até o 7º dia de vida
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Embora o 5º dia seja a meta prioritária das redes de saúde para otimizar o processamento laboratorial, a coleta realizada até o 7º dia ainda é considerada eficaz para a triagem. O cumprimento rigoroso desta primeira semana é fundamental para a agilidade na entrega dos resultados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Período de Atenção */}
                <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">
                        Coletas após o 7º dia
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Caso o recém-nascido não tenha sido testado na primeira semana, o exame deve ser realizado em caráter de urgência, preferencialmente antes de completar 30 dias de vida. É importante ressaltar que o atraso na coleta pode comprometer a janela de intervenção precoce em doenças de progressão rápida, elevando o risco de danos ao desenvolvimento da criança.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observação Importante */}
                <div className="bg-red-50 border-l-4 border-red-600 rounded-r p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">
                        Importante: Não realizar antes de 48 horas
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        O teste não deve ser realizado antes das primeiras 48 horas de vida, pois a coleta precoce pode gerar resultados "falso-negativos" devido à ausência de estabilização metabólica fora do ambiente uterino.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Link para Lista de Doenças */}
              <a
                href="https://www.gov.br/saude/pt-br/composicao/saes/triagem-neonatal"
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
                      Lista de Doenças Triadas
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Consulte a lista completa de doenças identificadas pelo Teste do Pezinho no site oficial do Ministério da Saúde.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                      <ExternalLink size={16} />
                      <span>Acessar Programa Nacional</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Link para Agendamento */}
              <Link
                to="/servicos/sala-4"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      Como Solicitar
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Para realizar o Teste do Pezinho, compareça presencialmente à Sala de Agendamentos da unidade.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                      <Calendar size={16} />
                      <span>Saiba Mais sobre Agendamentos</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Card Testes Rápidos */}
        <div id="testes-rapidos" className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TestTube2 size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Testes Rápidos
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Resultados em minutos, sem necessidade de pedido médico
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              A Sala de Procedimentos realiza testes rápidos para detecção de diversas condições de saúde. Os testes são gratuitos, realizados por profissionais capacitados e fornecem resultados em poucos minutos, não sendo necessária prescrição médica para sua realização.
            </p>

            {/* Grid de Testes Disponíveis */}
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-800 text-lg mb-4 flex items-center gap-2">
                <TestTube2 size={20} className="text-emerald-600" />
                Testes Disponíveis
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* HIV */}
                <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TestTube2 size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">Teste de HIV</h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Detecção de anticorpos contra o vírus HIV. Resultado em aproximadamente 20 minutos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sífilis */}
                <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TestTube2 size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">Teste de Sífilis</h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Detecção de anticorpos para o diagnóstico de sífilis. Resultado em aproximadamente 15 minutos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hepatites */}
                <div className="bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TestTube2 size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">Teste de Hepatites B e C</h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Detecção de anticorpos para hepatites virais B e C. Resultado em aproximadamente 20 minutos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gravidez */}
                <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Baby size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-2">Teste de Gravidez</h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        Detecção do hormônio beta-HCG para confirmação de gravidez. Resultado em aproximadamente 10 minutos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentação Necessária */}
            <div className="bg-neutral-50 border-l-4 border-emerald-600 rounded-r-lg p-5 mb-5">
              <h3 className="font-semibold text-neutral-800 text-lg mb-4 flex items-center gap-2">
                <IdCard size={20} className="text-emerald-600" />
                Documentação Necessária
              </h3>
              <div className="space-y-2 text-sm text-neutral-700">
                <div className="flex items-start gap-2">
                  <FileText size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p>Documento oficial de identificação com foto (RG, CNH ou Carteira de Trabalho)</p>
                </div>
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-5">
              <h3 className="font-semibold text-blue-900 text-lg mb-3 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                Informações Importantes
              </h3>
              <div className="space-y-3 text-sm text-neutral-700">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-blue-900">Não é necessário pedido médico</strong> - Os testes rápidos podem ser realizados sem prescrição médica
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-blue-900">Atendimento por ordem de chegada</strong> - Não é necessário agendamento prévio
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-blue-900">Sigilo absoluto</strong> - Todos os resultados são confidenciais e entregues apenas ao paciente
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-blue-900">Aconselhamento disponível</strong> - Profissionais de saúde estão disponíveis para orientação antes e após o teste
                  </p>
                </div>
              </div>
            </div>

            {/* Botão Saiba Mais sobre Prevenção ao HIV */}
            <div className="mt-5 bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-300 rounded-lg p-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-primary-900 mb-1">
                    Prevenção Combinada ao HIV
                  </h3>
                  <p className="text-sm text-neutral-700">
                    Conheça as estratégias de prevenção PrEP e PEP disponíveis no SUS
                  </p>
                </div>
                <Link
                  to="/servicos/prevencao-hiv"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <Info size={18} />
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>


        <EscalaPorSala
          titulo="Profissionais Escalados na Sala de Procedimentos"
          escalaKey="sala-medicacao"
        />

        {}
        <InfoBox title="Documentação Necessária" highlight={true}>
          <p className="text-neutral-700 mb-4 text-sm">
            Para atendimento Sala de Medicações, é
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
                  Documento de identidade com foto e/ou Carteira de Habilitação do titular
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
                  Documento físico original ou número do CPF do titular
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
                  Obrigatória para aplicação de medicamentos
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Alert type="warning">
              <strong>Normativa:</strong> Documento de identificação com foto e
              CPF são obrigatórios para qualquer atendimento na unidade.
            </Alert>
          </div>
        </InfoBox>
        {}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-white/90 leading-relaxed">
              Traga sempre a prescrição médica original e o medicamento
              prescrito. Não esqueça de passar pela recepção primeiro para
              realizar sua ficha de atendimento.
            </p>
          </div>
        </div>

      </div>

      {/* Leitura Recomendada - Aparece após scroll até o final */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="procedimentos" />
      </div>
    </PageContainer>
  );
}
