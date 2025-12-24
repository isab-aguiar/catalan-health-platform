// =========================================
// HOOK useCampanhasPagina
// =========================================
// Hook para gerenciar campanhas de páginas específicas

import { useState, useEffect } from 'react';
import { campanhasLocais } from '../data/campanhasLocais';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Hook para buscar campanhas de uma página específica em tempo real
 * @param {string} paginaNome - Nome da página (vacinas, servicos, educacao, etc)
 * @returns {Object} Estado das campanhas
 */
export function useCampanhasPagina(paginaNome) {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listener em tempo real para campanhas de página específica
    const q = query(
      collection(db, 'campanhas'),
      where('ativo', '==', true),
      where('paginaDestino', '==', paginaNome)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const campanhasFirebase = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          dataInicio: doc.data().dataInicio?.toDate(),
          dataFim: doc.data().dataFim?.toDate()
        }));
        
        console.log(`📊 Campanhas Firebase (${paginaNome}):`, campanhasFirebase.length);
        
        // Filtrar campanhas locais pela página (NÃO incluir home)
        const locaisFiltradas = campanhasLocais.filter(
          c => c.paginaDestino === paginaNome && c.ativo && !c.exibirNaHomepage
        );
        
        const todasCampanhas = [...campanhasFirebase, ...locaisFiltradas];
        
        console.log(`✅ Total Campanhas (${paginaNome}):`, todasCampanhas.length);
        
        setCampanhas(todasCampanhas);
        setLoading(false);
      },
      (err) => {
        console.error(`Erro ao buscar campanhas da página ${paginaNome}:`, err);
        setError(err.message);
        // Em caso de erro, mostrar apenas locais
        const locaisFiltradas = campanhasLocais.filter(
          c => c.paginaDestino === paginaNome && c.ativo && !c.exibirNaHomepage
        );
        setCampanhas(locaisFiltradas);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [paginaNome]);

  return { campanhas, loading, error };
}

export default useCampanhasPagina;

