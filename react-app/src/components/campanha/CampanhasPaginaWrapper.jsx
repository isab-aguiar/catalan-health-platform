// =========================================
// CAMPANHAS PÁGINA WRAPPER
// =========================================
// Wrapper para exibir campanhas em páginas específicas

import CampanhaCarousel from './CampanhaCarousel';
import CampanhaInfoCard from './CampanhaInfoCard';
import { useCampanhasPagina } from '../../hooks/useCampanhasPagina';

/**
 * Wrapper que busca e exibe campanhas de uma página específica
 * - Campanhas com imagem: exibe em carrossel
 * - Campanhas sem imagem: exibe em cards informativos
 * 
 * @param {string} pagina - Nome da página (vacinas, servicos, educacao, etc)
 */
export default function CampanhasPaginaWrapper({ pagina }) {
  const { campanhas, loading } = useCampanhasPagina(pagina);
  
  // Se está carregando ou não tem campanhas, não exibe nada
  if (loading || !campanhas || campanhas.length === 0) {
    return null;
  }
  
  // Separar campanhas com e sem imagem
  const comImagem = campanhas.filter(c => {
    if (!c.imagemURL) return false;
    // Ignorar PDFs - não são imagens
    if (c.imagemURL.endsWith('.pdf')) return false;
    return true;
  });
  
  const semImagem = campanhas.filter(c => {
    if (!c.imagemURL) return true;
    if (c.imagemURL.endsWith('.pdf')) return true;
    return false;
  });
  
  return (
    <div className="mb-8">
      {/* Carrossel para campanhas com imagem */}
      {comImagem.length > 0 && (
        <div className="mb-6">
          <CampanhaCarousel campanhas={comImagem} />
        </div>
      )}
      
      {/* Cards informativos para campanhas sem imagem */}
      {semImagem.map(campanha => (
        <CampanhaInfoCard key={campanha.id} campanha={campanha} />
      ))}
    </div>
  );
}

