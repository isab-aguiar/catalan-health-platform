import { ImageGallery, LoadingSpinner } from "../common";

/**
 * HomeGallery - Galeria de imagens da unidade
 * @param {Array} images - Array de objetos com src, caption e credit
 * @param {boolean} loading - Estado de carregamento
 */
export default function HomeGallery({ images, loading }) {
  return (
    <section className="pt-8 pb-16 px-4 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Nossa Unidade
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Conheça nossa equipe, estrutura e instalações
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <ImageGallery images={images} />
        )}
      </div>
    </section>
  );
}

