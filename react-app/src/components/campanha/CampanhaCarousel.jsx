import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

/**
 * CampanhaCarousel - Professional image carousel for campaigns
 * Shows campaign images with professional captions below
 *
 * @param {Array} campanhas - Array of campaign objects with imagemURL
 * @param {Function} onCampanhaClick - Optional click handler
 */
export default function CampanhaCarousel({ campanhas = [], onCampanhaClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filtrar apenas campanhas que têm imagem (não PDF)
  const campanhasComImagem = campanhas.filter(c => {
    const hasImage = c.imagemURL && !c.imagemURL.endsWith('.pdf');
    return hasImage;
  });

  // Reset to first slide if campanhas change
  useEffect(() => {
    setCurrentIndex(0);
  }, [campanhasComImagem.length]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (isAnimating || campanhasComImagem.length <= 1) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % campanhasComImagem.length);

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, campanhasComImagem.length]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (isAnimating || campanhasComImagem.length <= 1) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + campanhasComImagem.length) % campanhasComImagem.length);

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, campanhasComImagem.length]);

  // Go to specific slide
  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (!campanhasComImagem || campanhasComImagem.length === 0) {
    return null;
  }

  const currentCampanha = campanhasComImagem[currentIndex];

  return (
    <div className="relative w-full">
      {/* Image Gallery Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-neutral-100 border border-neutral-200">
        <div className="relative w-full group">
          {/* Campaign Image */}
          <img
            src={currentCampanha.imagemURL}
            alt={currentCampanha.titulo}
            className="w-full h-auto object-contain transition-all duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Navigation Arrows */}
        {campanhasComImagem.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Campanha anterior"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Próxima campanha"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Position Indicator */}
        {campanhasComImagem.length > 1 && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-neutral-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10">
            {currentIndex + 1} / {campanhasComImagem.length}
          </div>
        )}
      </div>

      {/* Professional Caption Below */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
          {currentCampanha.titulo}
        </h3>
        
        {currentCampanha.subtitulo && (
          <p className="text-sm text-slate-600 italic">
            {currentCampanha.subtitulo}
          </p>
        )}
        
        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
          {currentCampanha.descricao}
        </p>
      </div>

      {/* Thumbnail Navigation */}
      {campanhasComImagem.length > 1 && (
        <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 px-2 sm:px-0 -mx-2 sm:mx-0">
          {campanhasComImagem.map((campanha, index) => (
            <button
              key={campanha.id || index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? "border-blue-600 shadow-lg ring-2 ring-blue-200"
                  : "border-white/30 hover:border-white/60 shadow-md"
              }`}
              aria-label={`Ir para ${campanha.titulo}`}
            >
              <img
                src={campanha.imagemURL}
                alt={campanha.titulo}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  index === currentIndex
                    ? "scale-100"
                    : "hover:scale-105 opacity-80 hover:opacity-100"
                }`}
                loading="lazy"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-blue-600/20 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
