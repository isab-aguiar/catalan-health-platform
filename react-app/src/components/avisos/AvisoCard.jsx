// =========================================
// COMPONENTE AVISO CARD
// =========================================
// Card para exibir avisos públicos na homepage
// Cores variam conforme a categoria

import { Calendar } from 'lucide-react';

/**
 * Mapeia categoria para configuração de cores
 */
const categoriaConfig = {
  vacina: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    label: 'Vacina'
  },
  material: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    label: 'Material'
  },
  campanha: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    label: 'Campanha'
  }
};

/**
 * Formata data do Timestamp do Firestore para exibição
 */
function formatarData(timestamp) {
  if (!timestamp) return '';
  
  // Se for Timestamp do Firestore, converter para Date
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  // Formatar para DD/MM/YYYY
  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const ano = date.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

export default function AvisoCard({ aviso }) {
  if (!aviso) return null;

  const categoria = aviso.categoria || 'campanha';
  const config = categoriaConfig[categoria] || categoriaConfig.campanha;

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border-2 rounded-xl p-5 shadow-sm
        hover:shadow-md transition-shadow
      `}
    >
      {/* Cabeçalho com categoria e data */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`
            ${config.iconBg} ${config.iconColor}
            px-3 py-1 rounded-full text-xs font-semibold uppercase
          `}
        >
          {config.label}
        </span>
        {aviso.data && (
          <div className="flex items-center gap-1.5 text-xs opacity-80">
            <Calendar size={14} />
            <span>{formatarData(aviso.data)}</span>
          </div>
        )}
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold mb-2 line-clamp-2">
        {aviso.titulo}
      </h3>

      {/* Descrição */}
      <p className="text-sm leading-relaxed line-clamp-3 opacity-90">
        {aviso.descricao}
      </p>
    </div>
  );
}

