import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ className = '' }) {
  const navigate = useNavigate();

  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-500 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        aria-label="Voltar para a página anterior"
      >
        <div className="w-5 h-5 flex items-center justify-center rounded-md bg-slate-100 group-hover:bg-slate-200 transition-colors duration-200">
          <ArrowLeft size={16} className="text-slate-600 group-hover:text-slate-700 transition-colors duration-200" />
        </div>
        <span className="group-hover:text-slate-900 transition-colors duration-200">
          Voltar
        </span>
      </button>
    </div>
  );
}
