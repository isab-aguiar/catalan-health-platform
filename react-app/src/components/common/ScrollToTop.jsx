import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Preserva comportamento de anchor links (#contato)
    if (location.hash) return;

    // Scroll suave para o topo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, location.hash, location.key]);

  return null;
}
