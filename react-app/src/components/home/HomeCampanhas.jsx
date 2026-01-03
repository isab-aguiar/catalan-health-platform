import CampanhaCarousel from "../campanha/CampanhaCarousel";
import CampanhaInfoCard from "../campaign/CampanhaInfoCard";

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
