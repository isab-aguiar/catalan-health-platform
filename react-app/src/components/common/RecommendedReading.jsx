import { Link } from "react-router-dom";
import {
  Calendar,
  PillBottle,
  Stethoscope,
  Users,
  UserCircle,
  Activity,
  Bandage,
  FileText,
  Syringe,
  Pill,
  Hospital,
  GraduationCap,
  Heart,
  TestTube2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { getRecommendations } from "../../data/recommendedReading";

const iconMap = {
  Calendar,
  PillBottle,
  Stethoscope,
  Users,
  UserCircle,
  Activity,
  Bandage,
  FileText,
  Syringe,
  Pill,
  Hospital,
  GraduationCap,
  Heart,
  TestTube2
};

const colorSchemes = {
  primary: {
    bg: "from-primary-500 to-primary-700",
    cardBg: "bg-primary-50",
    cardBorder: "border-primary-200",
    cardHoverBorder: "hover:border-primary-400",
    iconBg: "bg-primary-600",
    textColor: "text-primary-700",
    badgeBg: "bg-primary-100",
    badgeText: "text-primary-700"
  },
  secondary: {
    bg: "from-secondary-500 to-secondary-700",
    cardBg: "bg-secondary-50",
    cardBorder: "border-secondary-200",
    cardHoverBorder: "hover:border-secondary-400",
    iconBg: "bg-secondary-600",
    textColor: "text-secondary-700",
    badgeBg: "bg-secondary-100",
    badgeText: "text-secondary-700"
  },
  accent: {
    bg: "from-accent-500 to-accent-700",
    cardBg: "bg-accent-50",
    cardBorder: "border-accent-200",
    cardHoverBorder: "hover:border-accent-400",
    iconBg: "bg-accent-600",
    textColor: "text-accent-700",
    badgeBg: "bg-accent-100",
    badgeText: "text-accent-700"
  },
  green: {
    bg: "from-emerald-500 to-emerald-700",
    cardBg: "bg-emerald-50",
    cardBorder: "border-emerald-200",
    cardHoverBorder: "hover:border-emerald-400",
    iconBg: "bg-emerald-600",
    textColor: "text-emerald-700",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700"
  }
};

export default function RecommendedReading({ pageId }) {
  const data = getRecommendations(pageId);

  if (!data) return null;

  return (
    <section className="mt-12 pt-8 border-t-2 border-neutral-200">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              {data.title}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-1">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {data.recommendations.map((rec, index) => {
          const Icon = iconMap[rec.icon] || FileText;
          const colors = colorSchemes[rec.color] || colorSchemes.primary;

          return (
            <Link
              key={rec.id}
              to={rec.path}
              className={`block ${colors.cardBg} border-2 ${colors.cardBorder} ${colors.cardHoverBorder} rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
            >
              {/* Badge de Categoria */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${colors.badgeBg} ${colors.badgeText} rounded-full text-xs font-semibold`}>
                  {rec.category}
                </span>
              </div>

              {/* Ícone e Título */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* Razão */}
              <div className="bg-white/60 border-l-4 border-neutral-300 rounded-r px-3 py-2 mb-4">
                <p className="text-xs text-neutral-700 italic">
                  {rec.reason}
                </p>
              </div>

              {/* Link de Ação */}
              <div className={`flex items-center gap-2 ${colors.textColor} font-semibold text-sm group-hover:gap-3 transition-all`}>
                <span>Acessar</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mensagem Final */}
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600">
          Explore mais conteúdos para entender melhor nossos serviços e cuidar da sua saúde
        </p>
      </div>
    </section>
  );
}
