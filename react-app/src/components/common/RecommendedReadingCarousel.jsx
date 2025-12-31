import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getRecommendations } from "../../data/recommendedReading";

export default function RecommendedReadingCarousel({ pageId }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = getRecommendations(pageId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setIsVisible(scrollPercentage >= 60);
    };

    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!data || !isVisible) return null;

  const { recommendations } = data;
  const currentRecommendation = recommendations[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === recommendations.length - 1 ? 0 : prev + 1
    );
  };

  const handleLinkClick = (e, path) => {
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      if (window.location.pathname === pathname) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-t-2 border-neutral-200 mt-5 pt-5 pb-8 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={20} className="text-amber-500" />
            <h3 className="text-lg font-bold text-neutral-800">
              Leitura Recomendada
            </h3>
          </div>
          <p className="text-sm text-neutral-500 font-medium">
            Você talvez goste de ler sobre...
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative flex items-center gap-4">
          {/* Botão Anterior */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex w-12 h-12 bg-white border-2 border-neutral-300 rounded-full items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 hover:scale-110 hover:-translate-x-1 shadow-md group flex-shrink-0"
            aria-label="Leitura anterior"
          >
            <ChevronLeft
              size={24}
              className="text-neutral-600 group-hover:text-primary-600 transition-colors group-hover:-translate-x-0.5 transition-transform"
            />
          </button>

          {/* Card Principal */}
          <Link
            to={currentRecommendation.path}
            onClick={(e) => handleLinkClick(e, currentRecommendation.path)}
            className="flex-1 bg-white border-2 border-neutral-200 rounded-lg p-6 hover:border-primary-400 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center gap-6">
              {/* Categoria Badge */}
              <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentIndex + 1}/{recommendations.length}
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                  {currentRecommendation.category}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {currentRecommendation.title}
                </h4>
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {currentRecommendation.description}
                </p>
                <div className="flex items-start gap-2 text-xs text-neutral-500 italic bg-neutral-50 border-l-4 border-primary-300 px-3 py-2 rounded-r">
                  <span className="flex-shrink-0 mt-0.5">💡</span>
                  <span>{currentRecommendation.reason}</span>
                </div>
              </div>

              {/* Indicador de clique - apenas desktop */}
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0 text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Acessar
                </span>
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </Link>

          {/* Botão Próximo */}
          <button
            onClick={goToNext}
            className="hidden md:flex w-12 h-12 bg-white border-2 border-neutral-300 rounded-full items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 hover:scale-110 hover:translate-x-1 shadow-md group flex-shrink-0"
            aria-label="Próxima leitura"
          >
            <ChevronRight
              size={24}
              className="text-neutral-600 group-hover:text-primary-600 transition-colors group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Navegação Mobile - Botões abaixo */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 bg-white border-2 border-neutral-300 rounded-full flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-neutral-600" />
          </button>

          <div className="flex gap-2">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary-600 w-6"
                    : "bg-neutral-300"
                }`}
                aria-label={`Ir para leitura ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 bg-white border-2 border-neutral-300 rounded-full flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all active:scale-95"
            aria-label="Próxima"
          >
            <ChevronRight size={20} className="text-neutral-600" />
          </button>
        </div>

        {/* Indicadores Desktop - Pontos */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-6">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all ${
                index === currentIndex
                  ? "w-8 h-2 bg-primary-600 rounded-full"
                  : "w-2 h-2 bg-neutral-300 rounded-full hover:bg-neutral-400"
              }`}
              aria-label={`Ir para leitura ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
