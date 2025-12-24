// =========================================
// HOOK useUserData
// =========================================
// Hook para buscar dados do usuário logado do Firestore com real-time updates

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'users';

/**
 * Hook para buscar e monitorar dados do usuário logado
 * @param {string} uid - UID do usuário do Firebase Auth
 * @returns {Object} { userData, loading, error }
 */
export function useUserData(uid) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se não houver UID, resetar estado
    if (!uid) {
      setUserData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const userRef = doc(db, COLLECTION_NAME, uid);

    // Real-time listener para o documento do usuário
    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = {
            uid: docSnapshot.id,
            ...docSnapshot.data()
          };
          setUserData(data);
          setError(null);
        } else {
          // Documento não existe
          setUserData(null);
          setError('Dados do usuário não encontrados');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao escutar dados do usuário:', err);
        setError(err.message);
        setUserData(null);
        setLoading(false);
      }
    );

    // Cleanup: cancelar subscription quando componente desmontar ou uid mudar
    return () => unsubscribe();
  }, [uid]);

  return {
    userData,
    loading,
    error
  };
}

