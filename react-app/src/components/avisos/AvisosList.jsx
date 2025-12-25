import { useAvisosPublicos } from "../../hooks/useAvisos";
import AvisoCard from "./AvisoCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Bell } from "lucide-react";
export default function AvisosList() {
  const { avisos, loading, error } = useAvisosPublicos();
  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-8 px-4">
        <div
          className="bg-red-50 border border-red-300 text-red-900 rounded-md p-4 text-center"
          style={{
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          }}
        >
          <p className="text-sm">
            Erro ao carregar avisos. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }
  if (!avisos || avisos.length === 0) {
    return null;
  }
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto max-w-6xl">
        {}
        <div className="mb-5 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-slate-700" />
            <h2
              className="text-xl md:text-2xl font-semibold text-slate-900"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              Avisos Importantes
            </h2>
          </div>
          <p
            className="text-slate-600 text-sm"
            style={{
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            }}
          >
            Fique por dentro das informações e atualizações da unidade
          </p>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {avisos.map((aviso) => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))}
        </div>
      </div>
    </section>
  );
}
