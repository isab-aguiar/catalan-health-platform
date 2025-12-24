// =========================================
// HOOK useAvisos
// =========================================
// Hook React para gerenciar estado dos avisos (OTIMIZADO)

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import * as avisosService from '../services/avisosService';

const COLLECTION_NAME = 'avisos';

/**
 * Hook para gerenciar todos os avisos (uso administrativo)
 * OTIMIZADO: Sem orderBy complexo, ordena no cliente
 */
export function useAvisos() {
  const { currentUser } = useAuth();
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      const avisosRef = collection(db, COLLECTION_NAME);
      
      // Real-time listener SEM orderBy (mais rápido, sem índice necessário)
      const unsubscribe = onSnapshot(
        avisosRef,
        (snapshot) => {
          const avisosData = [];
          snapshot.forEach((doc) => {
            avisosData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          
          // Ordenar no cliente (mais rápido que Firestore orderBy)
          avisosData.sort((a, b) => {
            const dateA = a.data?.toDate?.() || new Date(a.data || 0);
            const dateB = b.data?.toDate?.() || new Date(b.data || 0);
            return dateB - dateA; // Mais recentes primeiro
          });
          
          setAvisos(avisosData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Erro ao escutar avisos:', err);
          setError('Erro ao carregar avisos. Verifique sua conexão.');
          setLoading(false);
        }
      );

      // Cleanup
      return () => unsubscribe();
    } catch (err) {
      console.error('Erro ao configurar listener:', err);
      setError('Erro ao inicializar. Recarregue a página.');
      setLoading(false);
    }
  }, []);

  const createAviso = async (aviso) => {
    setError(null);
    const result = await avisosService.createAviso(aviso, currentUser?.uid);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const updateAviso = async (id, aviso) => {
    setError(null);
    const result = await avisosService.updateAviso(id, aviso, currentUser?.uid);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const deleteAviso = async (id) => {
    setError(null);
    const result = await avisosService.deleteAviso(id);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  return {
    avisos,
    loading,
    error,
    createAviso,
    updateAviso,
    deleteAviso
  };
}

/**
 * Hook para gerenciar apenas avisos públicos (uso na homepage)
 * OTIMIZADO: Filtra e ordena no cliente
 */
export function useAvisosPublicos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      const avisosRef = collection(db, COLLECTION_NAME);
      
      // Real-time listener SEM where e orderBy
      const unsubscribe = onSnapshot(
        avisosRef,
        (snapshot) => {
          const avisosData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Filtrar públicos no cliente
            if (data.exibirNaHomepage === true) {
              avisosData.push({
                id: doc.id,
                ...data
              });
            }
          });
          
          // Ordenar no cliente
          avisosData.sort((a, b) => {
            const dateA = a.data?.toDate?.() || new Date(a.data || 0);
            const dateB = b.data?.toDate?.() || new Date(b.data || 0);
            return dateB - dateA;
          });
          
          setAvisos(avisosData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Erro ao escutar avisos públicos:', err);
          setError('Erro ao carregar avisos');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Erro ao configurar listener:', err);
      setError('Erro ao inicializar');
      setLoading(false);
    }
  }, []);

  return {
    avisos,
    loading,
    error
  };
}
