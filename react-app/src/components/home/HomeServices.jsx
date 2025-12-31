import { Link } from "react-router-dom";
import {
  ArrowRight,
  Hospital,
  Users,
  BriefcaseMedical,
  Syringe,
  GraduationCap,
  Calendar,
  PillBottle,
  MessageSquareHeart,
  HandHeart,
  HeartHandshake,
  Shield,
} from "lucide-react";

/**
 * HomeServices - Cards de serviços disponíveis
 * Exibe links para os principais serviços da unidade
 */
export default function HomeServices() {
  const services = [
    {
      to: "/servicos",
      icon: Hospital,
      title: "Serviços",
      description: "Todos os serviços e atendimentos disponíveis",
    },
    {
      to: "/grupos",
      icon: Users,
      title: "Atividades Coletivas",
      description: "Grupos de atividades coletivas e promoção de saúde",
    },
    {
      to: "/equipe",
      icon: BriefcaseMedical,
      title: "E-multi",
      description: "Equipe Multiprofissional de Saúde",
    },
    {
      to: "/servicos/vacinas",
      icon: Syringe,
      title: "Sala de Vacinação",
      description: "Calendário Nacional de Vacinação e horários de atendimento",
    },
    {
      to: "/remsa",
      icon: GraduationCap,
      title: "REMSA",
      description: "Programa de Residência Multiprofissional em Saúde do Adolescente",
    },
    {
      to: "/servicos/sala-4",
      icon: Calendar,
      title: "Sala de Agendamento",
      description: "Agende consultas, exames e procedimentos",
    },
    {
      to: "/servicos/consultas",
      icon: Users,
      title: "Consultas e Atendimentos",
      description: "Consultas médicas, de enfermagem, psicológicas e especializadas.",
    },
    {
      to: "/servicos/farmacia",
      icon: PillBottle,
      title: "Farmácia",
      description: "Retirada de medicamentos e renovação de receitas",
    },
    {
      to: "/servicos/prevencao-hiv",
      icon: Shield,
      title: "Prevenção Combinada ao HIV",
      description: "PrEP e PEP - Estratégias de prevenção disponíveis no SUS",
    },
    {
      to: "/acs",
      icon: HeartHandshake,
      title: "Agente Comunitário de Saúde",
      description: "Encontre o ACS responsável pela sua área",
    },
    {
      to: "/servicos/bolsa-familia",
      icon: HandHeart,
      title: "Bolsa Família e Serviços Sociais",
      description: "Orientações, acompanhamento de benefícios sociais, CadÚnico e assistência.",
    },
    {
      to: "/ouvidoria",
      icon: MessageSquareHeart,
      title: "Ouvidoria",
      description: "Envie elogios, sugestões ou reclamações. Sua opinião é importante!",
      linkText: "Enviar Feedback",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 text-center">
          Explore Nossos Serviços
        </h2>
        <p className="text-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Navegue pelos diferentes serviços e profissionais disponíveis na
          unidade
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.to}
                to={service.to}
                className="relative overflow-hidden rounded-2xl p-4 md:p-8 bg-white border-2 border-primary-200 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl shadow-lg"
              >
                <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6 md:w-12 md:h-12" strokeWidth={2} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-neutral-900 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  <span>{service.linkText || "Consultar"}</span>
                  <ArrowRight
                    size={16}
                    className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

