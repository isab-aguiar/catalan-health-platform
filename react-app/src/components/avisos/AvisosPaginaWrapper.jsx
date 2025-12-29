import { useAvisosPagina } from "../../hooks/useAvisosPagina";
import AvisoCard from "./AvisoCard";
export default function AvisosPaginaWrapper({ pagina }) {
  const { avisos, loading, error } = useAvisosPagina(pagina);
  if (loading || error || avisos.length === 0) {
    return null;
  }
  return (
    <section className="mb-6">
      <h2
        className="text-lg font-semibold text-neutral-800 mb-3"
      >
        Avisos Importantes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {avisos.map((aviso) => (
          <AvisoCard key={aviso.id} aviso={aviso} />
        ))}
      </div>
    </section>
  );
}
