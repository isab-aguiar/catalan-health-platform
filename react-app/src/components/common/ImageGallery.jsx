import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizedImages = images.map((img) => {
    if (typeof img === 'string') {
      return { src: img, caption: '', credit: '' };
    }
    return {
      src: img.src,
      caption: img.caption || '',
      credit: img.credit || ''
    };
  });

  const currentImage = normalizedImages[currentIndex] || {
    src: '',
    caption: '',
    credit: '',
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!normalizedImages || normalizedImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gov-border bg-gray-100">
        <div className="relative w-full h-full group">
          <img
            src={currentImage.src}
            alt={currentImage.caption || `Galeria ${currentIndex + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 pointer-events-none" />
          
          {currentImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1 sm:p-6 text-white">
              <p className="text-[9px] sm:text-base font-medium drop-shadow-md leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-2">
                {currentImage.caption}
              </p>
            </div>
          )}

        </div>

        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gov-dark rounded-full p-2 shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gov-blue"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gov-dark rounded-full p-2 shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gov-blue"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {normalizedImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm z-10">
            {currentIndex + 1} / {normalizedImages.length}
          </div>
        )}
      </div>

      {currentImage.credit && (
        <div className="mt-3 mb-4 flex justify-end">
          <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-black/20 backdrop-blur-sm rounded-sm">
            <p className="text-[9px] sm:text-xs text-black italic">
              {currentImage.credit}
            </p>
          </div>
        </div>
      )}

      {normalizedImages.length > 1 && (
        <div className="mt-4 flex gap-3 justify-start sm:justify-center overflow-x-auto pb-2 px-1 scrollbar-hide">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2
                ${index === currentIndex 
                  ? 'border-gov-blue shadow-md ring-2 ring-blue-100' 
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'}
              `}
              aria-label={`Ir para imagem ${index + 1}`}
            >
              <img
                src={image.src || image}
                alt={image.caption || `Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                  index === currentIndex ? 'scale-100' : 'hover:scale-110'
                }`}
                loading="lazy"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gov-blue/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}