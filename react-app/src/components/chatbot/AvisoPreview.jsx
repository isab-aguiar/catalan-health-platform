// =========================================
// PREVIEW DO AVISO GERADO PELA IA
// =========================================
// Mostra o aviso gerado com opções de criar ou editar

import { Calendar, Tag, Eye, EyeOff, Check, Edit3 } from 'lucide-react';

export default function AvisoPreview({ aviso, onCreateAviso, onEditAviso }) {
  // Obter cor da categoria
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: 'bg-blue-100 text-blue-700 border-blue-200',
      material: 'bg-green-100 text-green-700 border-green-200',
      campanha: 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors[categoria] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
  };

  // Obter label da categoria
  const getCategoriaLabel = (categoria) => {
    const labels = {
      vacina: 'Vacina',
      material: 'Material',
      campanha: 'Campanha'
    };
    return labels[categoria] || categoria;
  };

  return (
    <div className="bg-white border-2 border-teal-200 rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="font-bold text-neutral-900 text-lg flex-1">
          {aviso.titulo}
        </h4>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}>
          <Tag className="w-3 h-3 inline mr-1" />
          {getCategoriaLabel(aviso.categoria)}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-neutral-700 mb-4 whitespace-pre-wrap">
        {aviso.descricao}
      </p>

      {/* Metadados */}
      <div className="flex items-center gap-4 mb-4 text-xs text-neutral-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Data: Hoje</span>
        </div>
        <div className="flex items-center gap-1">
          {aviso.exibirNaHomepage ? (
            <>
              <Eye className="w-3 h-3" />
              <span className="text-green-600 font-medium">Público</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              <span className="text-neutral-500">Rascunho</span>
            </>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2 pt-3 border-t border-neutral-200">
        <button
          onClick={() => onCreateAviso(aviso)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium"
        >
          <Check className="w-4 h-4" />
          Criar Aviso
        </button>
        <button
          onClick={() => onEditAviso(aviso)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 rounded-lg transition-colors font-medium"
        >
          <Edit3 className="w-4 h-4" />
          <span className="hidden sm:inline">Editar</span>
        </button>
      </div>
    </div>
  );
}

