import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * BackButton Component
 * Botão profissional de navegação para voltar à página anterior
 * Posicionado no fluxo da página, abaixo do header fixo
 */
export default function BackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={() => navigate(-1)}
        className="
          group inline-flex items-center gap-2.5
          px-5 py-2.5
          text-sm font-semibold text-slate-700
          bg-white hover:bg-slate-50
          border border-slate-300 hover:border-primary-500
          rounded-xl shadow-sm hover:shadow-md
          transition-all duration-300 ease-out
          transform hover:scale-[1.02] active:scale-[0.98]
        "
        aria-label="Voltar para a página anterior"
      >
        <div className="w-5 h-5 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-primary-100 transition-colors duration-300">
          <ArrowLeft size={16} className="text-slate-600 group-hover:text-primary-600 transition-colors duration-300" />
        </div>
        <span className="group-hover:text-primary-700 transition-colors duration-300">Voltar</span>
      </button>
    </div>
  );
}
