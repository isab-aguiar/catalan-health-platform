import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";
import CampanhasPaginaWrapper from "../../components/campanha/CampanhasPaginaWrapper";
import AvisosPaginaWrapper from "../../components/avisos/AvisosPaginaWrapper";
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
      text: "text-neutral-900",
      icon: "text-info",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning",
      text: "text-neutral-900",
      icon: "text-warning-dark",
    },
  };
  const childrenText = typeof children === 'string' ? children : children?.props?.children || '';
  const hasImportante = String(childrenText).toLowerCase().includes('importante:');
  const textColor = hasImportante ? 'text-info' : (type === 'warning' ? 'text-warning-dark' : 'text-info');
  const strongColor = hasImportante ? '[&_strong]:text-info' : (type === 'warning' ? '[&_strong]:text-warning-dark' : type === 'info' ? '[&_strong]:text-info' : '');
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
        <div className={`text-sm leading-relaxed ${textColor} [&_strong]:font-bold ${strongColor}`}>{children}</div>
      </div>
    </div>
  );
}
export default function ECG() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {}
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1
                className="text-xl md:text-3xl font-bold text-neutral-900"
                style={{
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                }}
              >
                Eletrocardiograma{" "}
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
        <CampanhasPaginaWrapper pagina="ecg" />
        {}
        <AvisosPaginaWrapper pagina="ecg" />
        {}
        <InfoBox title="Sobre o Serviço">
          <p className="text-neutral-700 leading-relaxed mb-5">
            O Eletrocardiograma é um exame que registra a atividade elétrica do
            coração. É um procedimento simples, rápido e indolor que auxilia na
            identificação de problemas cardíacos como arritmias, infarto,
            insuficiência cardíaca e outras alterações do sistema
            cardiovascular.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Avaliação Cardíaca
              </h3>
              <p className="text-sm text-neutral-600">
                Identifica alterações no ritmo e função do coração, auxiliando
                no diagnóstico e acompanhamento de condições cardíacas.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">
                Exame Rápido e Indolor
              </h3>
              <p className="text-sm text-neutral-600">
                Procedimento não invasivo com duração aproximada de 10 a 15
                minutos.
              </p>
            </div>
          </div>
          <div className="bg-info/10 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-neutral-800 mb-3 text-sm">
              Preparo para o Exame
            </h3>
            <div className="space-y-3 text-sm text-neutral-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Não utilizar creme ou óleo corporal no dia do exame
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    Cremes e óleos corporais interferem na aderência adequada
                    dos eletrodos à pele, podendo comprometer a qualidade do
                    registro e a precisão dos resultados.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Evitar o uso excessivo de bijuterias e acessórios de metal
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    Objetos metálicos (pulseiras, colares, relógios, anéis,
                    entre outros) podem interferir na captação do sinal elétrico
                    do coração, provocando distorções no traçado
                    eletrocardiográfico e prejudicando a qualidade e a
                    interpretação do exame.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-neutral-800">
                    Mulheres: Se possível, evitar sutiã com aro metálico
                  </strong>
                  <p className="text-neutral-600 mt-1 text-xs">
                    O aro metálico do sutiã pode interferir na captação do sinal
                    elétrico na região torácica, onde são posicionados os
                    eletrodos do exame. Essa interferência pode gerar distorções
                    no traçado e comprometer a qualidade do registro
                    eletrocardiográfico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InfoBox>
        {}
        <InfoBox title="Horários de Atendimento">
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
                    Profissional Responsável
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-neutral-300 px-4 py-3">
                    <strong className="text-neutral-800">Tarde</strong>
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    12h00 às 17h00
                  </td>
                  <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                    Isabela Aguiar<br/>
                    Função: Técnica de Enfermagem
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Versão Mobile */}
          <div className="md:hidden">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded">
                  Tarde
                </span>
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2">Horário</p>
                  <p className="text-sm font-semibold text-neutral-800">12h00 às 17h00</p>
                </div>
                <div className="pb-2 border-b border-neutral-300">
                  <p className="text-xs text-neutral-500 mb-2"><strong>Profissional Responsável</strong></p>
                  <p className="text-sm text-neutral-700">Isabela Aguiar</p>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-neutral-700"><strong>Função:</strong> Técnica de Enfermagem</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3">
            * O exame requer agendamento prévio. Dirija-se à Sala de Agendamentos
            em posse do pedido médico original e documentos do
            titular.
          </p>
        </InfoBox>
        {}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-neutral-700 mb-4 text-sm">
            Para realização do exame, é obrigatória a apresentação da seguinte
            documentação:
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
                  Protocolo de Agendamento
                </strong>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Obrigatória para realização do exame
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
        <div className="bg-blue-700 text-white rounded-md p-5 shadow-sm">
          <div>
            <p className="font-semibold mb-2">Orientação Importante</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Antes de se dirigir à sala de eletrocardiograma, é necessário
              passar pela recepção da unidade para realização da ficha de
              atendimento. Esta medida é essencial para agilizar o processo de
              atendimento e garantir a organização adequada do fluxo de
              pacientes na unidade.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
