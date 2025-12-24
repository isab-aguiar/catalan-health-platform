// =========================================
// HOOK useAllCampanhas
// =========================================
// Hook para buscar TODAS as campanhas (para estatísticas)

import { useState, useEffect } from 'react';
import { campanhasLocais } from '../data/campanhasLocais';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Hook para buscar TODAS as campanhas em tempo real
 * (Usado para estatísticas no painel)
 * @returns {Object} Estado das campanhas
 */
export function useAllCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listener em tempo real para TODAS as campanhas
    const q = query(collection(db, 'campanhas'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const campanhasFirebase = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          dataInicio: doc.data().dataInicio?.toDate(),
          dataFim: doc.data().dataFim?.toDate()
        }));
        
        console.log('📊 Total Campanhas Firebase:', campanhasFirebase.length);
        
        // Combinar Firebase + locais
        const todasCampanhas = [...campanhasFirebase, ...campanhasLocais];
        
        console.log('✅ Total Campanhas (Firebase + Locais):', todasCampanhas.length);
        
        setCampanhas(todasCampanhas);
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao buscar todas as campanhas:', err);
        setError(err.message);
        // Se erro, mostrar apenas locais
        setCampanhas(campanhasLocais);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    campanhas,
    loading,
    error
  };
}

export default useAllCampanhas;

