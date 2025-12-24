// =========================================
// HOOK useCampanhas
// =========================================
// Hook para gerenciar estado de campanhas visuais
// OTIMIZADO: Usa cache e busca manual ao invés de onSnapshot em tempo real

import { useState, useEffect, useRef } from 'react';
import { buscarCampanhasHome } from '../services/campanhasService';
import { campanhasLocais } from '../data/campanhasLocais';

// Cache global de campanhas (evita recarregamentos desnecessários)
let campanhasCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Hook para buscar e gerenciar campanhas com cache
 * @returns {Object} Estado das campanhas
 */
export function useCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    carregarCampanhas();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const carregarCampanhas = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar cache
      const agora = Date.now();
      const cacheValido = campanhasCache && cacheTimestamp && (agora - cacheTimestamp < CACHE_DURATION);

      let campanhasFirebase;
      
      if (cacheValido) {
        // Usar cache
        campanhasFirebase = campanhasCache;
        console.log('📦 Usando cache de campanhas');
      } else {
        // Buscar do Firebase
        campanhasFirebase = await buscarCampanhasHome();
        // Atualizar cache
        campanhasCache = campanhasFirebase;
        cacheTimestamp = agora;
        console.log('🔄 Campanhas carregadas do Firebase');
      }

      // Combinar Firebase + locais (apenas os da home)
      const locaisFiltradas = campanhasLocais.filter(c => c.exibirNaHomepage && c.ativo);
      const todasCampanhas = [...campanhasFirebase, ...locaisFiltradas];

      if (isMounted.current) {
        setCampanhas(todasCampanhas);
        setLoading(false);
      }
    } catch (err) {
      console.error('Erro ao carregar campanhas:', err);
      
      if (isMounted.current) {
        setError(err.message);
        // Se erro, mostrar apenas locais
        const locaisFiltradas = campanhasLocais.filter(c => c.exibirNaHomepage && c.ativo);
        setCampanhas(locaisFiltradas);
        setLoading(false);
      }
    }
  };

  // Função para forçar recarga (útil após criar/editar campanha)
  const refetch = () => {
    // Invalidar cache
    campanhasCache = null;
    cacheTimestamp = null;
    carregarCampanhas();
  };

  return {
    campanhas,
    loading,
    error,
    refetch
  };
}

export default useCampanhas;

