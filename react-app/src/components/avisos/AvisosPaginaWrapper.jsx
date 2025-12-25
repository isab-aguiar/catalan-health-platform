// =========================================
// COMPONENTE AvisosPaginaWrapper
// =========================================
// Wrapper para exibir avisos de uma página específica

import { useAvisosPagina } from '../../hooks/useAvisosPagina';
import AvisoCard from './AvisoCard';

export default function AvisosPaginaWrapper({ pagina }) {
  const { avisos, loading, error } = useAvisosPagina(pagina);
  
  // Não exibe nada se estiver carregando, com erro ou sem avisos
  if (loading || error || avisos.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Avisos Importantes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {avisos.map(aviso => (
          <AvisoCard key={aviso.id} aviso={aviso} />
        ))}
      </div>
    </section>
  );
}


