import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import BackButton from "../../components/common/BackButton";
import { Smile, Lightbulb, AlertCircle, ArrowRight } from "lucide-react";

export default function OuvidoriaIndex() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-6">
          Ouvidoria
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Sua opinião é muito importante para nós! Utilize os canais abaixo para
          enviar elogios, sugestões ou reclamações. Estamos sempre buscando
          melhorar nossos serviços e atendimento.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/ouvidoria/elogios"
            className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-green-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
          >
            <div className="mb-4 w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <Smile size={48} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900">
              Elogios
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Compartilhe experiências positivas e reconheça o trabalho da nossa
              equipe
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600 group-hover:text-green-700">
              <span>Enviar Elogio</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
          <Link
            to="/ouvidoria/sugestoes"
            className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-yellow-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
          >
            <div className="mb-4 w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <Lightbulb size={48} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900">
              Sugestões
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Compartilhe ideias para melhorias em grupos, serviços ou processos
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600 group-hover:text-yellow-700">
              <span>Enviar Sugestão</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
          <Link
            to="/ouvidoria/reclamacoes"
            className="relative overflow-hidden rounded-2xl p-8 bg-white border-2 border-red-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
          >
            <div className="mb-4 w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <AlertCircle size={48} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900">
              Reclamações
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Reporte problemas ou situações que precisam de atenção e análise
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:text-red-700">
              <span>Enviar Reclamação</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        </div>
        <div className="mt-8 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-neutral-700 text-sm leading-relaxed">
            <strong>Importante:</strong> Todos os feedbacks são analisados pela
            equipe administrativa. Em caso de reclamações, entraremos em contato
            quando necessário. Para sugestões, agradecemos sua contribuição e
            consideraremos todas as ideias para melhorias.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

