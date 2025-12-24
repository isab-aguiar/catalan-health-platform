import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const normalizedImages = images.map((img) => {
    if (typeof img === 'string') {
      return { src: img, caption: '' };
    }
    return img;
  });
  
  const currentImage = normalizedImages[currentIndex] || { src: '', caption: '' };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!normalizedImages || normalizedImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-white/5 backdrop-blur-sm border border-white/20">
        <div className="relative w-full h-full group">
          <img
            src={currentImage.src}
            alt={currentImage.caption || `Galeria ${currentIndex + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 pointer-events-none" />

          {currentImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium drop-shadow-lg leading-tight sm:leading-normal line-clamp-2 sm:line-clamp-3">
                {currentImage.caption}
              </p>
            </div>
          )}
        </div>

        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {normalizedImages.length > 1 && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-neutral-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10">
            {currentIndex + 1} / {normalizedImages.length}
          </div>
        )}
      </div>

      {normalizedImages.length > 1 && (
        <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 px-2 sm:px-0 -mx-2 sm:mx-0">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? "border-primary-600 shadow-lg ring-2 ring-primary-200"
                  : "border-white/30 hover:border-white/60 shadow-md"
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            >
              <img
                src={image.src || image}
                alt={image.caption || `Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                  index === currentIndex
                    ? "scale-100"
                    : "hover:scale-105 opacity-80 hover:opacity-100"
                }`}
                loading="lazy"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-primary-600/20 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

