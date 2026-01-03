import { Link } from "react-router-dom";
import {
  AlertCircle,
  Users,
  FileText,
  Calendar,
  Phone,
  Heart,
  Stethoscope,
  Baby,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import BackButton from "../../components/common/BackButton";
import PageContainer from "../../components/layout/PageContainer";
import logoBolsaFamilia from "../../assets/bolsa-familia/Logo_Bolsa_Familia.png";

export default function BolsaFamilia() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Bolsa Família e Serviço Social
          </h1>
          <p className="text-primary-100 text-sm mt-1">
            Estratégia Saúde da Família Bela Vista - Catalão - São José
          </p>
        </div>

        {/* Sobre o Serviço */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-4 text-sm">
            O Serviço Social da ESF Catalão oferece orientação, suporte e
            acompanhamento para famílias em situação de vulnerabilidade social.
            Trabalhamos com o Programa Bolsa Família, acesso a benefícios
            sociais, encaminhamentos para a rede de proteção social e apoio em
            questões relacionadas a direitos sociais e cidadania.
          </p>

          <h3 className="font-bold text-blue-900 mb-4 text-base">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
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

            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
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

            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
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

            <div className="flex items-start gap-3 bg-white/70 rounded-lg p-3 border border-blue-100">
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
        </div>

        {/* Seção Acompanhamento de Saúde - Bolsa Família */}
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 mb-6">
          {/* Header com Logo */}
          <div className="border-b border-neutral-200 px-4 sm:px-6 py-4 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white rounded-lg p-4 shadow-md flex-shrink-0">
                <img
                  src={logoBolsaFamilia}
                  alt="Logo Bolsa Família"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
                  Acompanhamento de Saúde
                </h2>
                <p className="text-green-700 font-semibold text-sm sm:text-base">
                  Programa Bolsa Família
                </p>
                <p className="text-neutral-600 text-sm mt-2 max-w-2xl">
                  Cuidar da saúde da sua família é garantir o futuro. Estamos
                  aqui para apoiar você nessa jornada.
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Introdução */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-5 shadow-sm border border-blue-200">
              <p className="text-neutral-700 leading-relaxed text-sm">
                O acompanhamento de saúde é uma{" "}
                <strong className="text-green-700">etapa obrigatória</strong>{" "}
                para as famílias beneficiárias do Programa Bolsa Família. Mais
                do que garantir a continuidade do benefício financeiro, este
                procedimento visa assegurar o{" "}
                <strong>desenvolvimento saudável das crianças</strong>, o{" "}
                <strong>cuidado integral com a saúde da mulher</strong> e o{" "}
                <strong>acompanhamento adequado das gestantes</strong>.
              </p>
            </div>

            {/* Público-Alvo */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-5 shadow-sm border border-blue-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>Quem deve comparecer à Unidade de Saúde?</span>
              </h3>
              <p className="text-neutral-700 mb-4 text-sm">
                O público-alvo para o acompanhamento das condicionalidades de
                saúde inclui:
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
            <div className="bg-blue-50 rounded-lg p-4 sm:p-5 shadow-sm border border-blue-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
                Quais serviços são realizados?
              </h3>
              <p className="text-neutral-700 mb-4 text-sm">
                Durante o comparecimento à ESF Catalão, realizamos:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-blue-200">
                  <div className="bg-blue-600 rounded-lg p-2 flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-sm">
                      Verificação do Calendário Vacinal
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Conferência e atualização de doses atrasadas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-blue-200">
                  <div className="bg-blue-600 rounded-lg p-2 flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-sm">
                      Acompanhamento Nutricional
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Medição de peso e altura para monitoramento do crescimento
                      e desenvolvimento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-blue-200">
                  <div className="bg-blue-600 rounded-lg p-2 flex-shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-sm">
                      Pré-natal
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Acompanhamento obrigatório e contínuo para gestantes
                      beneficiárias
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerta sobre Prazos */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 sm:p-5 shadow-sm border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900 mb-3 text-base">
                    Acompanhamento de Vigências e Prazos
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-sm mb-3">
                    Para garantir a continuidade do seu benefício no Programa
                    Bolsa Família, é fundamental acompanhar os períodos de
                    vigência estabelecidos pelo Ministério do Desenvolvimento
                    Social.
                  </p>
                  <div className="bg-white/60 rounded-md p-3 mb-3">
                    <h4 className="font-semibold text-amber-900 mb-2 text-sm">
                      Como se manter informado:
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold mt-0.5">
                          •
                        </span>
                        <span>
                          Consulte regularmente o site oficial da unidade
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold mt-0.5">
                          •
                        </span>
                        <span>
                          Mantenha seus dados de contato atualizados no CadÚnico
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold mt-0.5">
                          •
                        </span>
                        <span>
                          Fique atento às comunicações enviadas pelo seu{" "}
                          <Link
                            to="/acs"
                            className="text-amber-800 hover:text-amber-900 font-semibold underline"
                          >
                            agente comunitário de saúde
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-100 rounded-md p-3">
                    <p className="text-amber-900 text-sm font-semibold">
                      O não comparecimento dentro do prazo estabelecido pode
                      resultar no bloqueio ou suspensão do benefício.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Como Acessar o Serviço
          </h2>

          <div className="space-y-3">
            {/* Acompanhamento de Saúde - Bolsa Família */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-white" />
                </div>
                <span>Acompanhamento de Condicionalidades de Saúde</span>
              </h3>
              <p className="text-sm text-neutral-700 mb-3 leading-relaxed">
                Para o acompanhamento de saúde do Programa Bolsa Família
                (vacinação, pré-natal, nutrição), dirija-se diretamente à{" "}
                <Link
                  to="/servicos/recepcao"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Recepção
                </Link>{" "}
                da unidade com a documentação necessária.
              </p>
              <div className="bg-blue-50 rounded-md p-3">
                <p className="text-sm text-blue-900">
                  <strong>Responsáveis:</strong> O acompanhamento é realizado
                  pelos{" "}
                  <span className="font-semibold">
                    Agentes Comunitários de Saúde (ACS)
                  </span>{" "}
                  em parceria com a equipe de enfermagem da unidade.
                </p>
              </div>
            </div>

            {/* Telefone da Recepção */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <span>Telefone da Recepção</span>
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Para dúvidas ou informações adicionais sobre os programas
                sociais, entre em contato através do{" "}
                <Link
                  to="/#contato"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  telefone da recepção
                </Link>{" "}
                disponível na página inicial.
              </p>
            </div>

            {/* Documentos Necessários */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-white" />
                </div>
                <span>Documentos Necessários</span>
              </h3>
              <p className="text-sm text-neutral-700 mb-3 leading-relaxed">
                Para realizar o acompanhamento, compareça à{" "}
                <Link
                  to="/servicos/recepcao"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  recepção
                </Link>{" "}
                munido de:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded border border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Caderneta de Vacinação</strong> das crianças
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded border border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Cartão da Gestante</strong> (se aplicável)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded border border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-neutral-700">
                    <strong>Documento de identidade</strong> (RG ou CPF)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 shadow-sm border border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-3 text-base">
                Manutenção do Benefício
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm mb-3">
                O acompanhamento das condicionalidades do Programa Bolsa Família
                é essencial para garantir a continuidade do benefício da sua
                família. Existem duas áreas principais de acompanhamento:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/60 rounded-md p-3">
                  <h4 className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                    <Heart size={16} className="text-green-600" />
                    Saúde
                  </h4>
                  <p className="text-sm text-neutral-700">
                    Mantenha em dia as consultas de saúde, vacinação e
                    acompanhamento nutricional das crianças e gestantes.
                  </p>
                </div>
                <div className="bg-white/60 rounded-md p-3">
                  <h4 className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                    <Users size={16} className="text-green-600" />
                    Educação
                  </h4>
                  <p className="text-sm text-neutral-700">
                    Garanta a frequência escolar mínima de 85% para crianças e
                    adolescentes de 6 a 15 anos.
                  </p>
                </div>
              </div>
              <div className="mt-3 bg-green-100 rounded-md p-3">
                <p className="text-green-900 text-sm font-semibold">
                  O descumprimento das condicionalidades pode resultar em
                  advertência, bloqueio ou suspensão do benefício.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
