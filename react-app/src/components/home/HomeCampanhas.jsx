import CampanhaCarousel from "../campanha/CampanhaCarousel";
import CampanhaInfoCard from "../campaign/CampanhaInfoCard";

/**
 * HomeCampanhas - Exibe campanhas em destaque na página inicial
 * @param {Array} campanhas - Lista de campanhas ativas
 * @param {boolean} loading - Estado de carregamento
 */
export default function HomeCampanhas({ campanhas, loading }) {
  if (loading || !campanhas || campanhas.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <p className="text-neutral-600">
          Confira as campanhas e eventos em destaque
        </p>
      </div>
      <CampanhaCarousel campanhas={campanhas} />

      {campanhas.length > 0 && campanhas[0] && (
        <div className="mt-6">
          <CampanhaInfoCard campanha={campanhas[0]} />
        </div>
      )}
    </div>
  );
}

