import { Link } from "react-router-dom";
import { AlertCircle, Users, FileText, Calendar, Phone } from "lucide-react";
import BackButton from "../../components/common/BackButton";

function PageContainer({ children }) {
  return <div className="min-h-screen bg-neutral-50 py-8 px-4">{children}</div>;
}

function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-neutral-200",
    highlight: "bg-info/10 border-info",
  };

  return (
    <div
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div
        className={`flex items-center gap-3 mb-5 pb-3 border-b ${
          variant === "highlight" ? "border-neutral-300" : "border-neutral-200"
        }`}
      >
        {icon && <div className="text-primary-700">{icon}</div>}
        <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-info/10",
      border: "border-info",
      text: "text-info",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-warning-dark",
      icon: "text-warning-dark",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success",
      text: "text-success-dark",
      icon: "text-success",
    },
  };

  const style = types[type];

  return (
    <div
      className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}
    >
      <div className="flex gap-3">
        <AlertCircle
          size={20}
          className={`flex-shrink-0 mt-0.5 ${style.icon}`}
        />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

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
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Bolsa Família e Serviço Social
              </h1>
              <p
                className="text-neutral-500 text-xs mt-1"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
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
                  Sala de Agendamento (Sala 4)
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
          variant="highlight"
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
