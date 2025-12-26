import { Calendar, Tag, Eye, EyeOff, Check, Edit3 } from "lucide-react";

export default function AvisoPreview({ aviso, onCreateAviso, onEditAviso }) {
  const getCategoriaColor = (categoria) => {
    const colors = {
      vacina: "bg-primary-100 text-primary-700 border-primary-200",
      material: "bg-success/10 text-green-700 border-green-200",
      campanha: "bg-neutral-200 text-neutral-700 border-neutral-300",
    };
    return (
      colors[categoria] || "bg-neutral-100 text-neutral-700 border-neutral-200"
    );
  };

  const getCategoriaLabel = (categoria) => {
    const labels = {
      vacina: "Vacina",
      material: "Material",
      campanha: "Campanha",
    };
    return labels[categoria] || categoria;
  };

  return (
    <div className="bg-white border border-neutral-300 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="font-bold text-neutral-900 text-lg flex-1">
          {aviso.titulo}
        </h4>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoriaColor(aviso.categoria)}`}
        >
          <Tag className="w-3 h-3 inline mr-1" />
          {getCategoriaLabel(aviso.categoria)}
        </span>
      </div>

      <p className="text-sm text-neutral-700 mb-4 whitespace-pre-wrap">
        {aviso.descricao}
      </p>

      <div className="flex items-center gap-4 mb-4 text-xs text-neutral-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Data: Hoje</span>
        </div>
        <div className="flex items-center gap-1">
          {aviso.exibirNaHomepage ? (
            <>
              <Eye className="w-3 h-3" />
              <span className="text-success font-medium">Público</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              <span className="text-neutral-500">Rascunho</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-neutral-200">
        <button
          onClick={() => onCreateAviso(aviso)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
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
