import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className={`mb-4 sm:mb-6 ${className}`}>
      <button
        onClick={handleBack}
        className="group inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-500 rounded-md shadow-sm hover:shadow-md transition-all duration-200 max-w-full"
        aria-label="Voltar para a página anterior"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-md bg-neutral-100 group-hover:bg-neutral-200 transition-colors duration-200 flex-shrink-0">
          <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-neutral-600 group-hover:text-neutral-700 transition-colors duration-200" />
        </div>
        <span className="group-hover:text-neutral-900 transition-colors duration-200 truncate">
          Voltar
        </span>
      </button>
    </div>
  );
}
