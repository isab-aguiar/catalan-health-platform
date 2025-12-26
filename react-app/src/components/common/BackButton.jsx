import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ className = '' }) {
  const navigate = useNavigate();

  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-500 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        aria-label="Voltar para a página anterior"
      >
        <div className="w-5 h-5 flex items-center justify-center rounded-md bg-neutral-100 group-hover:bg-neutral-200 transition-colors duration-200">
          <ArrowLeft size={16} className="text-neutral-600 group-hover:text-neutral-700 transition-colors duration-200" />
        </div>
        <span className="group-hover:text-neutral-900 transition-colors duration-200">
          Voltar
        </span>
      </button>
    </div>
  );
}
