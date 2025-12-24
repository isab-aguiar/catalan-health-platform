// =========================================
// COMPONENTE LISTA DE AVISOS
// =========================================
// Lista de avisos públicos para exibir na homepage

import { useAvisosPublicos } from '../../hooks/useAvisos';
import AvisoCard from './AvisoCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { Bell } from 'lucide-react';

export default function AvisosList() {
  const { avisos, loading, error } = useAvisosPublicos();

  // Estado de carregamento
  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  }

  // Erro ao carregar
  if (error) {
    return (
      <div className="py-8 px-4">
        <div className="bg-red-50 border-2 border-red-200 text-red-800 rounded-lg p-4 text-center">
          <p className="text-sm">Erro ao carregar avisos. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  // Sem avisos
  if (!avisos || avisos.length === 0) {
    return null; // Não exibe nada se não houver avisos
  }

  // Renderizar lista de avisos
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto max-w-6xl">
        {/* Título da seção */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-primary-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Avisos Importantes
            </h2>
          </div>
          <p className="text-neutral-600 text-sm md:text-base">
            Fique por dentro das informações e atualizações da unidade
          </p>
        </div>

        {/* Grid de avisos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {avisos.map((aviso) => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))}
        </div>
      </div>
    </section>
  );
}

