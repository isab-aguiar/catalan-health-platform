import CampanhaCarousel from "./CampanhaCarousel";
import CampanhaInfoCard from "./CampanhaInfoCard";
import { useCampanhasPagina } from "../../hooks/useCampanhasPagina";
export default function CampanhasPaginaWrapper({ pagina }) {
  const { campanhas, loading } = useCampanhasPagina(pagina);
  if (loading || !campanhas || campanhas.length === 0) {
    return null;
  }
  const comImagem = campanhas.filter((c) => {
    if (!c.imagemURL) return false;
    if (c.imagemURL.endsWith(".pdf")) return false;
    return true;
  });
  const semImagem = campanhas.filter((c) => {
    if (!c.imagemURL) return true;
    if (c.imagemURL.endsWith(".pdf")) return true;
    return false;
  });
  return (
    <div className="mb-8">
      {}
      {comImagem.length > 0 && (
        <div className="mb-6">
          <CampanhaCarousel campanhas={comImagem} />
        </div>
      )}
      {}
      {semImagem.map((campanha) => (
        <CampanhaInfoCard key={campanha.id} campanha={campanha} />
      ))}
    </div>
  );
}
