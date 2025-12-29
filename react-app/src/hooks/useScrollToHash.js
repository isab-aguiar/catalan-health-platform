import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook que faz scroll automático para elementos com ID quando a URL contém um hash (#section)
 * Útil para links de navegação interna e âncoras
 */
export default function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
}
