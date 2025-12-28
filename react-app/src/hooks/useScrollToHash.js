import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook que faz scroll automático para elementos com ID quando a URL contém um hash (#section)
 * Útil para links de navegação interna e âncoras
 */
export default function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // Se a URL tem um hash (ex: /servicos/procedimentos#testes-rapidos)
    if (location.hash) {
      // Remove o # do início
      const elementId = location.hash.substring(1);

      // Tenta encontrar o elemento com o ID
      const element = document.getElementById(elementId);

      if (element) {
        // Pequeno delay para garantir que a página foi renderizada
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Se não há hash, volta para o topo da página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
}
