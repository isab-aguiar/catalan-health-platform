import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import RecommendedReadingCarousel from "../../components/common/RecommendedReadingCarousel";
function PageContainer({ children }) {
  return <div className="min-h-screen bg-neutral-50 py-8 px-4">{children}</div>;
}
function InfoBox({ title, icon, children, variant = "default", id }) {
  const variants = {
    default: "bg-white border-neutral-200",
    highlight: "bg-info/10 border-info",
  };
  return (
    <div
      id={id}
      className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}
    >
      <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${variant === "highlight" ? "border-neutral-300" : "border-neutral-200"}`}>
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
export default function Enfermeiras() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-3xl font-bold text-neutral-900 whitespace-nowrap"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Consultório de Enfermagem
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
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            A consulta de enfermagem é uma atividade privativa do enfermeiro,
            fundamentada na Sistematização da Assistência de Enfermagem (SAE).
            Na ESF Catalão, as enfermeiras realizam avaliação clínica,
            solicitação de exames conforme protocolos estabelecidos, prescrição
            de cuidados de enfermagem e medicamentos quando indicado, além de
            orientações para promoção da saúde e prevenção de agravos.
          </p>
          <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
            Serviços Oferecidos:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Pré-natal de Enfermagem
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Consultas intercaladas com o médico, avaliação obstétrica,
                  solicitação de exames e orientações sobre gestação, parto e
                  puerpério
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consulta de Puericultura
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação do crescimento e desenvolvimento infantil,
                  orientações sobre alimentação, vacinação e cuidados com a
                  criança
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consulta para Hipertensos e Diabéticos
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação clínica, estratificação de risco cardiovascular,
                  ajustes terapêuticos e orientações sobre autocuidado
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Coleta de Exame Citopatológico (Papanicolau)
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Rastreamento do câncer de colo uterino em mulheres de 25 a 64
                  anos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Avaliação e Prescrição de Cuidados com Feridas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Avaliação de lesões, prescrição de coberturas e orientação à
                  equipe técnica de enfermagem para execução dos curativos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Consultas de Enfermagem Diversas
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Atendimento a condições agudas e crônicas, orientações em
                  saúde e prescrição de cuidados conforme necessidade individual
                </p>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Profissionais Responsáveis">
          <p className="text-neutral-700 mb-4 text-sm">
            As enfermeiras atuam integradas às Equipes de Saúde da Família
            (ESF), sendo responsáveis pela assistência de enfermagem à população
            de suas respectivas áreas de abrangência. Conheça as profissionais
            da ESF Catalão:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Enfermeira
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Equipe (ESF)
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Fabíola</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF São José
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Aline Macedo</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF Catalão
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Naiara</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    ESF Bela Vista
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 italic">
            * Cada enfermeira atende sua área de abrangência. Descubra qual é a
            sua equipe usando a{" "}
            <Link
              to="/"
              className="text-info hover:text-primary-700 underline font-semibold"
            >
              busca territorial na página inicial
            </Link>
            .
          </p>
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
                    Fabíola (ESF São José)<br/>
                    Aline Macedo (ESF Catalão)<br/>
                    Naiara (ESF Bela Vista)<br/>
                    <span className="text-neutral-600 text-xs block mt-2">Função: Enfermeiras</span>
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
                    Fabíola (ESF São José)<br/>
                    Aline Macedo (ESF Catalão)<br/>
                    Naiara (ESF Bela Vista)<br/>
                    <span className="text-neutral-600 text-xs block mt-2">Função: Enfermeiras</span>
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
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <p className="text-sm text-neutral-700 pb-1">Fabíola (ESF São José)</p>
                  <p className="text-sm text-neutral-700 pb-1">Aline Macedo (ESF Catalão)</p>
                  <p className="text-sm text-neutral-700">Naiara (ESF Bela Vista)</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Enfermeiras</p>
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
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissionais Responsáveis</strong></p>
                  <p className="text-sm text-neutral-700 pb-1">Fabíola (ESF São José)</p>
                  <p className="text-sm text-neutral-700 pb-1">Aline Macedo (ESF Catalão)</p>
                  <p className="text-sm text-neutral-700">Naiara (ESF Bela Vista)</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Enfermeiras</p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Público-alvo">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Gestantes em acompanhamento pré-natal de baixo risco
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Crianças para avaliação do crescimento e desenvolvimento
                infantil
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários com hipertensão arterial sistêmica e diabetes mellitus
                em acompanhamento regular
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Mulheres de 25 a 64 anos para rastreamento do câncer de colo
                uterino
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                Usuários com feridas que necessitam de avaliação e prescrição de
                plano terapêutico
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-neutral-700 text-sm">
                População adscrita que necessita de orientações em saúde e
                avaliação clínica de enfermagem
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
                  Dirija-se à Sala 4 para agendamento de consulta de enfermagem.
                  Não esqueça de consultar os{" "}
                  <Link
                    to="/servicos/sala-4#documentacao-necessaria"
                    className="text-info hover:text-primary-700 underline font-semibold"
                  >
                    documentos necessários
                  </Link>{" "}
                  antes de comparecer.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Identificação da Equipe de Referência
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  A consulta será agendada com o enfermeiro responsável pela sua
                  área de abrangência
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <strong className="text-neutral-800 text-sm">
                  Comparecimento à Consulta
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Apresentar-se no horário agendado com documentação e exames
                  complementares, quando disponíveis
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
                <strong>Competência Técnica e Legal das Enfermeiras</strong>
              </p>
              <p className="mb-3">
                As enfermeiras são profissionais de nível superior,
                regulamentadas pela Lei nº 7.498/86 e pelo Decreto nº 94.406/87,
                que dispõem sobre o exercício profissional da enfermagem no
                Brasil. Possuem formação acadêmica completa e competência
                técnico-científica para realizar consultas de enfermagem,
                avaliações clínicas, solicitação de exames complementares e
                prescrição de medicamentos e cuidados, conforme protocolos
                estabelecidos.
              </p>
              <p>
                A Consulta de Enfermagem é respaldada pela Resolução COFEN nº
                358/2009, que estabelece a Sistematização da Assistência de
                Enfermagem (SAE) e implementação do Processo de Enfermagem. Este
                atendimento é parte integral da Atenção Primária à Saúde e
                possui a mesma relevância que os demais atendimentos da equipe
                multiprofissional.
              </p>
            </div>
          </Alert>
        </div>
        {}
        <InfoBox
          id="documentacao-necessaria"
          title="Documentação Necessária"
          variant="highlight"
        >
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">
                  Carteira de Vacinação
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Para gestantes e crianças
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-neutral-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-neutral-800 text-sm">Exames</strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Se tiver exames recentes, leve-os
                </p>
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
                Antes de se dirigir à sala de consulta da enfermeira
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
        <RecommendedReadingCarousel pageId="enfermeiras" />
      </div>
    </PageContainer>
  );
}
