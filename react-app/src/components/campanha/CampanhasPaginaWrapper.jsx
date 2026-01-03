import CampanhaCarousel from "./CampanhaCarousel";
import CampanhaInfoCard from "../campaign/CampanhaInfoCard";
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

  return (
    <div className="mb-8 px-4 sm:px-6 lg:px-8">
      {comImagem.length > 0 && (
        <div className="mb-6">
          <CampanhaCarousel campanhas={comImagem} />
        </div>
      )}

      {comImagem.length > 0 && comImagem[0] && (
        <div className="mt-6">
          <CampanhaInfoCard campanha={comImagem[0]} />
        </div>
      )}
    </div>
  );
}
