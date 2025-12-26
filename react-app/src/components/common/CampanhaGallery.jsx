import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
} from 'lucide-react';

export function CampanhaGallery({
  campanha,
  onPublish,
  onRefine,
  onCancel,
  isPreview = false,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagens = Array.isArray(campanha.imagens)
    ? campanha.imagens
    : campanha.imagemURL
      ? [{ url: campanha.imagemURL }]
      : [];

  const hasMultipleImages = imagens.length > 1;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imagens.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagens.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-md shadow-sm overflow-hidden border border-slate-200">
        {imagens.length > 0 && (
          <div className="relative h-96 bg-slate-100">
            <img
              src={imagens[currentImageIndex]?.url}
              alt={campanha.titulo}
              className="w-full h-full object-cover"
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft
                    className="w-6 h-6 text-slate-800"
                    strokeWidth={2.5}
                  />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight
                    className="w-6 h-6 text-slate-800"
                    strokeWidth={2.5}
                  />
                </button>
              </>
            )}

            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {imagens.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      idx === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Ir para imagem ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {campanha.urgente && (
              <div className="absolute top-4 right-4 bg-error text-white px-4 py-2 rounded-md font-bold shadow-md flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>URGENTE</span>
              </div>
            )}

            {campanha.paginaDestino && (
              <div className="absolute top-4 left-4 bg-slate-700 text-white px-3 py-1.5 rounded-md font-medium shadow-md text-sm">
                {campanha.paginaDestino === 'home'
                  ? 'Homepage'
                  : campanha.paginaDestino}
              </div>
            )}
          </div>
        )}

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            {campanha.titulo}
          </h2>

          {campanha.subtitulo && (
            <p className="text-xl text-slate-700 font-medium">
              {campanha.subtitulo}
            </p>
          )}

          {(campanha.dataInicio ||
            campanha.dataFim ||
            campanha.horario ||
            campanha.publicoAlvo) && (
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 py-3 border-t border-b border-slate-200">
              {campanha.dataInicio && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(campanha.dataInicio)}
                    {campanha.dataFim && ` até ${formatDate(campanha.dataFim)}`}
                  </span>
                </div>
              )}
              {campanha.horario && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{campanha.horario}</span>
                </div>
              )}
              {campanha.publicoAlvo && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{campanha.publicoAlvo}</span>
                </div>
              )}
              {campanha.local && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{campanha.local}</span>
                </div>
              )}
            </div>
          )}

          <div className="text-slate-700 leading-relaxed text-base">
            {campanha.descricao}
          </div>

          {campanha.informacoesExtras && (
            <div className="mt-4 p-4 bg-slate-50 rounded-md border-l-4 border-slate-500">
              <p className="text-slate-900 leading-relaxed">
                {campanha.informacoesExtras}
              </p>
            </div>
          )}

          {campanha.topicos && campanha.topicos.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {campanha.topicos.map((topico, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                >
                  {topico}
                </span>
              ))}
            </div>
          )}

          {campanha.contato && (
            <div className="pt-3 text-sm text-slate-600 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{campanha.contato}</span>
            </div>
          )}

          {isPreview && (onPublish || onRefine || onCancel) && (
            <div className="flex gap-3 pt-6 border-t border-slate-200">
              {onPublish && (
                <button
                  onClick={onPublish}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Publicar Campanha</span>
                </button>
              )}
              {onRefine && (
                <button
                  onClick={onRefine}
                  className="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Refinar
                </button>
              )}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="bg-error hover:opacity-90 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Cancelar</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampanhaGallery;
