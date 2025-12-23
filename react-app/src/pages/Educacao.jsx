import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import InfoBox from "../components/common/InfoBox";
import Alert from "../components/common/Alert";
import BackButton from "../components/common/BackButton";
import {
  BookOpen,
  Heart,
  AlertTriangle,
  Activity,
  Droplet,
  Wind,
  Flame,
  Zap,
  Skull,
  Stethoscope,
  ArrowRight,
  Hospital,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Educacao() {
  const temasEmergencia = [
    {
      id: "parada-cardiorespiratoria",
      titulo: "Parada Cardiorrespiratória",
      descricao: "Como identificar e proceder em caso de parada cardíaca",
      icone: Heart,
      cor: "red",
    },
    {
      id: "acidente-vascular-cerebral",
      titulo: "Acidente Vascular Cerebral (AVC)",
      descricao: "Sinais de alerta e primeiros socorros para AVC",
      icone: AlertTriangle,
      cor: "orange",
    },
    {
      id: "infarto-agudo-miocardio",
      titulo: "Infarto Agudo do Miocárdio",
      descricao: "Reconhecimento dos sintomas de infarto",
      icone: Activity,
      cor: "red",
    },
    {
      id: "hemorragia",
      titulo: "Hemorragia",
      descricao: "Como controlar sangramentos e hemorragias",
      icone: Droplet,
      cor: "red",
    },
    {
      id: "asfixia-engasgo",
      titulo: "Asfixia e Engasgo",
      descricao: "Manobra de Heimlich e primeiros socorros",
      icone: Wind,
      cor: "blue",
    },
    {
      id: "queimaduras",
      titulo: "Queimaduras",
      descricao: "Cuidados imediatos com queimaduras",
      icone: Flame,
      cor: "orange",
    },
    {
      id: "choque-eletrico",
      titulo: "Choque Elétrico",
      descricao: "Primeiros socorros em caso de choque elétrico",
      icone: Zap,
      cor: "yellow",
    },
    {
      id: "intoxicacao",
      titulo: "Intoxicação",
      descricao: "O que fazer em casos de intoxicação",
      icone: Skull,
      cor: "purple",
    },
  ];

  const coresClasses = {
    red: {
      border: "border-red-200",
      bg: "bg-red-100",
      text: "text-red-600",
      hoverBg: "bg-red-500",
      hoverText: "text-red-700",
    },
    orange: {
      border: "border-orange-200",
      bg: "bg-orange-100",
      text: "text-orange-600",
      hoverBg: "bg-orange-500",
      hoverText: "text-orange-700",
    },
    blue: {
      border: "border-blue-200",
      bg: "bg-blue-100",
      text: "text-blue-600",
      hoverBg: "bg-blue-500",
      hoverText: "text-blue-700",
    },
    yellow: {
      border: "border-yellow-200",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      hoverBg: "bg-yellow-500",
      hoverText: "text-yellow-700",
    },
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-100",
      text: "text-purple-600",
      hoverBg: "bg-purple-500",
      hoverText: "text-purple-700",
    },
  };

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Educação em Saúde
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Atenção Primária à Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre a Educação em Saúde */}
        <InfoBox title="Sobre a Educação em Saúde">
          <p className="text-slate-700 leading-relaxed mb-5">
            A educação em saúde é fundamental para promover o autocuidado,
            prevenir doenças e agravos, e capacitar a população a reconhecer
            situações de emergência. Nesta seção, você encontrará informações
            importantes sobre como identificar e proceder em situações de
            emergência clínica.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <strong>Importante:</strong> Em caso de emergência, ligue
            imediatamente para o <strong>SAMU - 192</strong>. As informações
            aqui apresentadas são educativas e não substituem o atendimento
            médico de emergência.
          </p>
        </InfoBox>

        {/* Quando procurar a UBS vs Emergência */}
        <InfoBox title="Quando procurar a UBS e quando é emergência?">
          <p className="text-slate-700 leading-relaxed mb-5">
            É muito importante saber a diferença entre casos que podem ser
            atendidos na UBS e situações de emergência que requerem atendimento
            imediato no pronto-socorro ou SAMU. Isso ajuda a otimizar o
            atendimento e garantir que você receba o cuidado adequado no lugar
            certo.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            {/* Casos para UBS */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-green-600" />
                <h3 className="text-lg font-bold text-green-800">
                  Procure a UBS São José
                </h3>
              </div>
              <p className="text-slate-700 text-sm mb-3">
                Para casos que não são emergências, mas precisam de atenção
                médica:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Consultas de rotina e acompanhamento de doenças crônicas
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Sintomas leves a moderados (febre baixa, dor de cabeça,
                    resfriado)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Renovação de receitas e exames de rotina
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Vacinação e prevenção
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Atendimento que pode ser agendado
                  </p>
                </div>
              </div>
            </div>

            {/* Casos de Emergência */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <XCircle size={24} className="text-red-600" />
                <h3 className="text-lg font-bold text-red-800">
                  É Emergência - Ligue 192 (SAMU)
                </h3>
              </div>
              <p className="text-slate-700 text-sm mb-3">
                Situações que requerem atendimento imediato no pronto-socorro:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Dor no peito intensa, falta de ar grave ou desmaio
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Acidentes graves, quedas com perda de consciência
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Sangramentos intensos que não param
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Convulsões, alteração súbita de consciência
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 text-sm">
                    Intoxicação, queimaduras graves, choque elétrico
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Alert type="info">
              <strong>Dúvida?</strong> Em caso de dúvida sobre a gravidade da
              situação, sempre procure o pronto-socorro ou ligue para o SAMU
              (192). É melhor prevenir do que remediar!
            </Alert>
          </div>
        </InfoBox>

        {/* Temas de Emergência */}
        <InfoBox title="Temas de Emergência Clínica">
          <p className="text-slate-700 mb-6">
            Selecione um tema para aprender como identificar e proceder em
            situações de emergência:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {temasEmergencia.map((tema) => {
              const Icon = tema.icone;
              const cores = coresClasses[tema.cor];

              return (
                <Link
                  key={tema.id}
                  to={`/educacao/${tema.id}`}
                  className={`relative overflow-hidden rounded-xl p-6 bg-white border-2 ${cores.border} group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg`}
                >
                  <div
                    className={`mb-4 w-14 h-14 rounded-xl ${cores.bg} flex items-center justify-center ${cores.text} transition-colors ${
                      tema.cor === "red"
                        ? "group-hover:bg-red-500"
                        : tema.cor === "orange"
                          ? "group-hover:bg-orange-500"
                          : tema.cor === "blue"
                            ? "group-hover:bg-blue-500"
                            : tema.cor === "yellow"
                              ? "group-hover:bg-yellow-500"
                              : "group-hover:bg-purple-500"
                    } group-hover:text-white`}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">
                    {tema.titulo}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {tema.descricao}
                  </p>
                  <div
                    className={`flex items-center gap-2 text-sm font-semibold ${cores.text} ${
                      tema.cor === "red"
                        ? "group-hover:text-red-700"
                        : tema.cor === "orange"
                          ? "group-hover:text-orange-700"
                          : tema.cor === "blue"
                            ? "group-hover:text-blue-700"
                            : tema.cor === "yellow"
                              ? "group-hover:text-yellow-700"
                              : "group-hover:text-purple-700"
                    }`}
                  >
                    <span>Saiba mais</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </InfoBox>

        {/* Alerta Importante */}
        <div className="mb-6">
          <Alert type="warning">
            <div>
              <strong>Emergência? Ligue 192 (SAMU)</strong>
              <br />
              Para casos graves, ligue imediatamente para o SAMU. Não hesite em
              buscar ajuda profissional em situações de emergência.
            </div>
          </Alert>
        </div>
      </div>
    </PageContainer>
  );
}
