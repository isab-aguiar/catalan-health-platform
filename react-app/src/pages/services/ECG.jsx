import { AlertCircle } from "lucide-react";
import BackButton from "../../components/common/BackButton";

function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {children}
    </div>
  );
}

function InfoBox({ title, icon, children, variant = "default" }) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-blue-50 border-blue-300"
  };
  
  return (
    <div className={`border rounded-md shadow-sm p-6 mb-6 ${variants[variant]}`}>
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
        {icon && <div className="text-blue-700">{icon}</div>}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Alert({ type = "info", children }) {
  const types = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-900",
      icon: "text-blue-600"
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-900",
      icon: "text-amber-600"
    }
  };
  
  const style = types[type];
  
  return (
    <div className={`${style.bg} ${style.border} border-l-4 p-4 rounded-r ${style.text}`}>
      <div className="flex gap-3">
        <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${style.icon}`} />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ECG() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Cabeçalho */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Eletrocardiograma{" "}
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                UBS São José - Unidade Básica de Saúde
              </p>
            </div>
          </div>
        </div>

        {/* Sobre o Serviço */}
        <InfoBox title="Sobre o Serviço">
          <p className="text-slate-700 leading-relaxed mb-5">
            O Eletrocardiograma é um exame que registra a atividade elétrica do
            coração. É um procedimento simples, rápido e indolor que auxilia na
            identificação de problemas cardíacos como arritmias, infarto,
            insuficiência cardíaca e outras alterações do sistema
            cardiovascular.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Avaliação Cardíaca
              </h3>
              <p className="text-sm text-slate-600">
                Identifica alterações no ritmo e função do coração, auxiliando
                no diagnóstico e acompanhamento de condições cardíacas.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                Exame Rápido e Indolor
              </h3>
              <p className="text-sm text-slate-600">
                Procedimento não invasivo com duração aproximada de 10 a 15
                minutos.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm">
              Preparo para o Exame
            </h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">
                    Não utilizar creme ou óleo corporal no dia do exame
                  </strong>
                  <p className="text-slate-600 mt-1 text-xs">
                    Cremes e óleos corporais interferem na aderência adequada
                    dos eletrodos à pele, podendo comprometer a qualidade do
                    registro e a precisão dos resultados.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">
                    Evitar o uso excessivo de bijuterias e acessórios de metal
                  </strong>
                  <p className="text-slate-600 mt-1 text-xs">
                  Objetos metálicos (pulseiras, colares, relógios, anéis, entre outros) podem interferir na captação do sinal elétrico do coração, provocando distorções no traçado eletrocardiográfico e prejudicando a qualidade e a interpretação do exame.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">
                    Mulheres: Se possível, evitar sutiã com aro metálico
                  </strong>
                  <p className="text-slate-600 mt-1 text-xs">
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

        {/* Horários de Atendimento */}
        <InfoBox title="Horários de Atendimento">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Período
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Horário
                  </th>
                  <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-700 text-sm">
                    Observações
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-3">
                    <strong className="text-slate-800">Tarde</strong>
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">
                    12h00 às 16h00
                  </td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-600">
                    Com agendamento prévio
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            * O exame requer agendamento prévio. Dirija-se à Sala 4 -
            Agendamentos em posse do pedido médico original e documentos do
            titular.
          </p>
        </InfoBox>

        {/* Documentação Necessária */}
        <InfoBox title="Documentação Necessária" variant="highlight">
          <p className="text-slate-700 mb-4 text-sm">
            Para realização do exame, é obrigatória a apresentação da seguinte
            documentação:
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Documento de Identificação com Foto
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  RG (Registro Geral) ou CNH (Carteira Nacional de Habilitação)
                  do titular
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  CPF - Cadastro de Pessoa Física
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Documento físico original ou número do CPF do titular
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <strong className="text-slate-800 text-sm">
                  Protocolo de Agendamento
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
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

        {/* Informação importante final */}
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
