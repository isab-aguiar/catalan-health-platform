// =========================================
// HOOK useCampanhas
// =========================================
// Hook para gerenciar estado de campanhas visuais

import { useState, useEffect } from 'react';
import { buscarCampanhasHome } from '../services/campanhasService';
import { campanhasLocais } from '../data/campanhasLocais';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Hook para buscar e gerenciar campanhas em tempo real
 * @returns {Object} Estado das campanhas
 */
export function useCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listener em tempo real para campanhas da home
    const q = query(
      collection(db, 'campanhas'),
      where('ativo', '==', true),
      where('exibirNaHomepage', '==', true)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const campanhasFirebase = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          dataInicio: doc.data().dataInicio?.toDate(),
          dataFim: doc.data().dataFim?.toDate()
        }));
        
        console.log('📊 Campanhas Firebase (home):', campanhasFirebase.length);
        
        // Combinar Firebase + locais (apenas os da home)
        const locaisFiltradas = campanhasLocais.filter(c => c.exibirNaHomepage && c.ativo);
        const todasCampanhas = [...campanhasFirebase, ...locaisFiltradas];
        
        console.log('✅ Total Campanhas (home):', todasCampanhas.length);
        
        setCampanhas(todasCampanhas);
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao buscar campanhas:', err);
        setError(err.message);
        // Se erro, mostrar apenas locais
        const locaisFiltradas = campanhasLocais.filter(c => c.exibirNaHomepage && c.ativo);
        setCampanhas(locaisFiltradas);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const carregarCampanhas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await buscarCampanhasHome();
      
      // Combinar Firebase + locais (apenas os da home)
      const locaisFiltradas = campanhasLocais.filter(c => c.exibirNaHomepage && c.ativo);
      const todasCampanhas = [...result, ...locaisFiltradas];
      
      setCampanhas(todasCampanhas);
      
    } catch (err) {
      console.error('Erro ao carregar campanhas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    campanhas,
    loading,
    error,
    refetch: carregarCampanhas
  };
}

export default useCampanhas;

