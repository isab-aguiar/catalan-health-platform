import { Link } from "react-router-dom";
import { AlertCircle, Users, FileText, Calendar, Phone, Heart, Stethoscope, Baby, UserCheck } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import PageContainer from "../../components/layout/PageContainer";
import { Alert } from "../../components/common/Alert";
import InfoBox from "../../components/common/InfoBox";
import logoBolsaFamilia from "../../assets/bolsa-familia/Logo_Bolsa_Familia.png";

export default function BolsaFamilia() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-neutral-900"
              >
                Bolsa Família e Serviço Social
              </h1>
              <p
                className="text-neutral-500 text-xs mt-1"
              >
                Estratégia Saúde da Família Bela Vista - Catalão - São José
              </p>
            </div>
          </div>
        </div>

        <InfoBox title="Sobre o Serviço" icon={<Users size={24} />}>
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Serviço Social da ESF Catalão oferece orientação, suporte e
            acompanhamento para famílias em situação de vulnerabilidade social.
            Trabalhamos com o Programa Bolsa Família, acesso a benefícios
            sociais, encaminhamentos para a rede de proteção social e apoio em
            questões relacionadas a direitos sociais e cidadania.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm block mb-1">
                  Bolsa Família
                </strong>
                <p className="text-neutral-600 text-sm">
                  Orientações sobre inscrição, atualização cadastral,
                  condicionalidades e benefícios do programa
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm block mb-1">
                  CadÚnico
                </strong>
                <p className="text-neutral-600 text-sm">
                  Cadastro Único para Programas Sociais do Governo Federal -
                  inscrição e atualização
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm block mb-1">
                  Benefícios Sociais
                </strong>
                <p className="text-neutral-600 text-sm">
                  Orientação sobre BPC (Benefício de Prestação Continuada),
                  Tarifa Social de Energia Elétrica e outros benefícios
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm block mb-1">
                  Acompanhamento Social
                </strong>
                <p className="text-neutral-600 text-sm">
                  Visitas domiciliares, orientação familiar e encaminhamento
                  para a rede de proteção social
                </p>
              </div>
            </div>
          </div>
        </InfoBox>

        {/* Seção Acompanhamento de Saúde - Bolsa Família */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Header com Logo */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white rounded-lg p-4 shadow-md flex-shrink-0">
                <img
                  src={logoBolsaFamilia}
                  alt="Logo Bolsa Família"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3 justify-center md:justify-start">
                  <Heart className="w-8 h-8" />
                  Acompanhamento de Saúde
                </h2>
                <p className="text-green-50 text-lg">
                  Programa Bolsa Família
                </p>
                <p className="text-green-100 text-sm mt-2 max-w-2xl">
                  Cuidar da saúde da sua família é garantir o futuro. Estamos aqui para apoiar você nessa jornada.
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Introdução */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <p className="text-neutral-700 leading-relaxed">
                O acompanhamento de saúde é uma <strong className="text-green-700">etapa obrigatória</strong> para as famílias beneficiárias do Programa Bolsa Família.
                Mais do que garantir a continuidade do benefício financeiro, este procedimento visa assegurar o <strong>desenvolvimento saudável das crianças</strong>,
                o <strong>cuidado integral com a saúde da mulher</strong> e o <strong>acompanhamento adequado das gestantes</strong>.
              </p>
            </div>

            {/* Público-Alvo */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Quem deve comparecer à Unidade de Saúde?
              </h3>
              <p className="text-neutral-600 mb-4">
                O público-alvo para o acompanhamento das condicionalidades de saúde inclui:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600 rounded-full p-2">
                      <Baby className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900">Crianças</h4>
                  </div>
                  <p className="text-sm text-blue-800">
                    De <strong>0 a 7 anos</strong> de idade
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border-2 border-pink-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-pink-600 rounded-full p-2">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-pink-900">Mulheres</h4>
                  </div>
                  <p className="text-sm text-pink-800">
                    De <strong>14 a 44 anos</strong> de idade
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-600 rounded-full p-2">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-purple-900">Gestantes</h4>
                  </div>
                  <p className="text-sm text-purple-800">
                    Em qualquer <strong>idade e fase</strong> da gestação
                  </p>
                </div>
              </div>
            </div>

            {/* Serviços Realizados */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-6 h-6" />
                Quais serviços são realizados?
              </h3>
              <p className="text-neutral-600 mb-4">
                Durante o comparecimento à ESF Catalão, realizamos:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Verificação do Calendário Vacinal</h4>
                    <p className="text-sm text-neutral-700">
                      Conferência e atualização de doses atrasadas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Acompanhamento Nutricional</h4>
                    <p className="text-sm text-neutral-700">
                      Medição de peso e altura para monitoramento do crescimento e desenvolvimento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Pré-natal</h4>
                    <p className="text-sm text-neutral-700">
                      Acompanhamento obrigatório e contínuo para gestantes beneficiárias
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos Necessários */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Documentos Necessários
              </h3>
              <p className="text-neutral-600 mb-4">
                Para realizar o acompanhamento, compareça à <Link to="/servicos/recepcao" className="text-green-600 hover:text-green-700 font-semibold underline">recepção</Link> munido de:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded border border-neutral-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Cartão do Bolsa Família</strong> (com NIS)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded border border-neutral-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Caderneta de Vacinação</strong> das crianças
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded border border-neutral-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Cartão da Gestante</strong> (se aplicável)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded border border-neutral-200">
                  <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Documento de identidade</strong> (RG ou CPF)
                  </span>
                </div>
              </div>
            </div>

            {/* Alerta sobre Prazos */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-l-4 border-amber-500 rounded-lg p-6 shadow-md">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2 text-lg">Fique Atento aos Prazos</h3>
                  <p className="text-amber-800 leading-relaxed">
                    As datas de vigência e os cronogramas atualizados para o comparecimento serão publicados
                    periodicamente aqui em nosso site oficial. <strong>Mantenha seus dados atualizados</strong> e
                    acompanhe as informações para não perder os prazos!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InfoBox title="Como Acessar" icon={<Calendar size={24} />}>
          <div className="space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Atendimento Presencial
              </h3>
              <p className="text-sm text-neutral-700 mb-3">
                O atendimento é realizado pela{" "}
                <Link
                  to="/equipe/assistente-social"
                  className="text-primary-600 hover:text-primary-700 font-semibold underline"
                >
                  Assistente Social
                </Link>{" "}
                da unidade.
              </p>
              <p className="text-sm text-neutral-600">
                <strong>Agendamento:</strong> Dirija-se à{" "}
                <Link
                  to="/servicos/sala-4"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Sala de Agendamentos
                </Link>{" "}
                para marcar seu atendimento ou compareça diretamente à unidade
                nos horários de funcionamento.
              </p>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm flex items-center gap-2">
                <Phone size={18} className="text-primary-600" />
                Informações por Telefone
              </h3>
              <p className="text-sm text-neutral-700">
                Para informações gerais sobre os programas sociais, você também
                pode entrar em contato com a unidade através dos telefones
                disponíveis na{" "}
                <Link
                  to="/servicos/recepcao"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Recepção
                </Link>
                .
              </p>
            </div>
          </div>
        </InfoBox>

        <InfoBox
          title="Documentação Necessária"
          icon={<FileText size={24} />}
          highlight={true}
        >
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento oficial de identificação com foto (RG ou CNH)
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">CPF</strong>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Comprovante de residência atualizado
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documentos de todos os membros da família (quando aplicável)
                </strong>
                <p className="text-xs text-neutral-600 mt-1">
                  RG, CPF, Certidão de Nascimento ou Casamento
                </p>
              </div>
            </div>
          </div>

          <Alert type="info">
            <strong>Observação:</strong> A documentação pode variar conforme o
            tipo de atendimento ou benefício solicitado. Em caso de dúvidas,
            consulte a Assistente Social da unidade.
          </Alert>
        </InfoBox>

        <Alert type="warning">
          <strong>Importante:</strong> O acompanhamento das condicionalidades
          do Bolsa Família (saúde e educação) é fundamental para manutenção do
          benefício. Mantenha as consultas de saúde e a frequência escolar das
          crianças em dia.
        </Alert>
      </div>
    </PageContainer>
  );
}
