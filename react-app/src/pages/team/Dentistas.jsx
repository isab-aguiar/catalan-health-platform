import { AlertCircle, Phone, Clock, Youtube, Baby, Smile, ExternalLink } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
import ImageWithCredit from "../../components/common/ImageWithCredit";
import preNatalImg from "../../assets/saude-bocal/pre-natal.png";
import ordontoPediatraImg from "../../assets/saude-bocal/ordonto-pediatra.png";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import { contactInfo } from "../../config";
import EscalaFirestore from "../../components/services/EscalaFirestore";

export default function Dentistas() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Consultório Odontológico
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
            O Consultório Odontológico da ESF Catalão oferece atendimento odontológico completo e humanizado para toda a família. Nossa equipe de cirurgiãs-dentistas realiza desde procedimentos preventivos até tratamentos curativos especializados, sempre com foco na promoção da saúde bucal e no bem-estar da comunidade.
          </p>

          <h3 className="font-bold text-blue-900 mb-4 text-base">Serviços Oferecidos</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Prevenção</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Limpeza profissional, aplicação de flúor e orientações sobre higiene bucal adequada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Restaurações
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Tratamento de cáries e recuperação da estrutura dentária
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">Extrações</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Remoção de elementos dentários quando necessário
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Endodontia
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Tratamento de canal em casos selecionados
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Odontopediatria
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento odontológico especializado para o público infantil
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Pré-natal Odontológico
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Acompanhamento e cuidados odontológicos durante a gestação
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border border-blue-100">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Urgências
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento imediato para alívio da dor, infecções e traumas dentários
                </p>
              </div>
            </div>
          </div>
        </div>
        {}
        <InfoBox title="Para quem é indicado?">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Todas as idades: crianças, adolescentes, adultos e idosos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Gestantes para pré-natal odontológico
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pessoas com dor de dente ou urgências odontológicas
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários que precisam de prevenção e limpeza dental
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Pacientes com cáries, gengivite ou outros problemas bucais
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        {/* Card Pré-natal Odontológico */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Baby size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Pré-natal Odontológico
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Cuidados odontológicos especializados durante a gestação
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={preNatalImg}
                alt="Pré-natal Odontológico - Cuidados odontológicos durante a gestação"
                credit="Pré-natal Odontológico"
                creditPosition="below"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm mx-auto"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              O pré-natal odontológico é um cuidado essencial para a saúde da gestante e do bebê. Durante a gravidez, a mulher passa por diversas mudanças hormonais que podem afetar a saúde bucal, aumentando a predisposição a problemas como gengivite, cáries e outras doenças. O acompanhamento odontológico durante este período garante tratamento adequado, orientações preventivas e contribui para um desenvolvimento saudável do bebê.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para YouTube */}
              <a
                href="https://www.youtube.com/watch?v=QMwc-fvZSUU"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Youtube size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-3 text-lg sm:text-xl">
                      Saiba Mais
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Assista ao vídeo informativo sobre pré-natal odontológico e seus benefícios para a saúde da gestante e do bebê.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
                      <Youtube size={16} />
                      <span>Assistir no YouTube</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {}
        {/* Card Saúde Bucal da Criança e do Adolescente */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-neutral-50">
            <div className="flex items-center gap-3">
              <Smile size={28} className="text-primary-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  Saúde Bucal da Criança e do Adolescente
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Odontopediatria: cuidados odontológicos especializados para crianças e adolescentes
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Imagem */}
            <div className="mb-6 flex justify-center">
              <ImageWithCredit
                src={ordontoPediatraImg}
                alt="Saúde Bucal da Criança e do Adolescente - Odontopediatria"
                credit="Saúde Bucal da Criança e do Adolescente"
                creditPosition="below"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-sm mx-auto"
              />
            </div>

            {/* Descrição */}
            <p className="text-neutral-700 leading-relaxed mb-5">
              A saúde bucal da criança e do adolescente é fundamental para um desenvolvimento saudável e para estabelecer hábitos que acompanharão toda a vida. A odontopediatria oferece cuidados especializados desde o nascimento dos primeiros dentes até a adolescência, incluindo prevenção de cáries, orientações sobre higiene bucal adequada, tratamento de problemas dentários específicos da infância e acompanhamento do desenvolvimento da dentição. Cuidar da saúde bucal desde cedo previne problemas futuros e contribui para a saúde geral e bem-estar das crianças e adolescentes.
            </p>

            {/* Grid de Links */}
            <div className="grid md:grid-cols-1 gap-4">
              {/* Link para Ministério da Saúde */}
              <a
                href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/primeira-infancia/saude-bucal"
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
                      Consulte informações completas sobre saúde bucal da criança e do adolescente no site oficial do Ministério da Saúde.
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
        <InfoBox title="Como ter acesso?">
          <p className="text-neutral-700 leading-relaxed mb-5">
            Para ter acesso ao atendimento odontológico, o agendamento é realizado exclusivamente de forma presencial. Confira abaixo as informações sobre agendamento e localização:
          </p>

          {/* Formas de Agendamento */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-5 mb-5">
            <h3 className="font-semibold text-blue-900 text-base mb-4">Agendamento e Informações</h3>

            <div className="space-y-4">
              {/* Agendamento Presencial */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">18</span>
                  </div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm block mb-2">Agendamento Presencial</strong>
                    <p className="text-xs text-neutral-600 mb-2">
                      O agendamento é realizado <strong>exclusivamente de forma presencial</strong> nos Consultórios Odontológicos 18 e 19, localizados no <strong>2º andar</strong> da unidade de saúde.
                    </p>
                    <p className="text-xs text-neutral-700 font-semibold">
                      Horário de atendimento para agendamentos e informações: <strong>10h às 16h</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações por Telefone */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <strong className="text-neutral-800 text-sm block mb-2">Informações por Telefone</strong>
                    <p className="text-xs text-neutral-600 mb-2">
                      Para esclarecimento de dúvidas, você pode entrar em contato por telefone. <strong>Importante:</strong> o agendamento é realizado apenas presencialmente.
                    </p>
                    <a
                      href={`tel:${contactInfo.phones.reception.tel}`}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-sm"
                    >
                      <Phone size={16} />
                      {contactInfo.phones.reception.display}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atendimento de Urgência */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 mb-5">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 text-sm mb-2">Atendimento de Urgência</h3>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  <strong>Demandas de urgência odontológica</strong> (dor intensa, trauma, infecção) são atendidas <strong>diariamente às 07h00</strong>. Compareça no horário para avaliação prioritária.
                </p>
              </div>
            </div>
          </div>

          {/* Documentação */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <h3 className="font-semibold text-neutral-800 text-sm mb-3">Documentação Necessária</h3>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-neutral-700">
                <strong>Documento de identificação com foto do titular</strong> (RG, CNH ou Carteira de Trabalho)
              </p>
            </div>
          </div>
        </InfoBox>
        {}
        <EscalaFirestore
          escalaKey="sala-atendimento-odontologico"
          titulo="Profissionais e Horários de Atendimento"
        />
        {/* Orientação Importante */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-6 shadow-md mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold mb-2 text-lg">Orientações Importantes</p>
              <p className="text-sm text-white/95 leading-relaxed">
                <strong>Saúde Bucal Preventiva:</strong> Mantenha uma rotina de higiene bucal adequada! Escove os dentes pelo menos três vezes ao dia, utilize fio dental diariamente e realize visitas regulares ao dentista. A prevenção é a melhor estratégia para manter sua saúde bucal em dia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura Recomendada - Aparece após scroll */}
      <div className="pb-4">
        <RecommendedReadingCarousel pageId="dentistas" />
      </div>
    </PageContainer>
  );
}
