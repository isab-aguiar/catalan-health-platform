// =========================================
// HOOK useAvisos
// =========================================
// Hook React para gerenciar estado dos avisos com real-time updates

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import * as avisosService from '../services/avisosService';

const COLLECTION_NAME = 'avisos';

/**
 * Hook para gerenciar todos os avisos (uso administrativo)
 */
export function useAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(avisosRef, orderBy('data', 'desc'));
    
    // Real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const avisosData = [];
        snapshot.forEach((doc) => {
          avisosData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setAvisos(avisosData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Erro ao escutar avisos:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup: cancelar subscription quando componente desmontar
    return () => unsubscribe();
  }, []);

  const createAviso = async (aviso) => {
    setError(null);
    const result = await avisosService.createAviso(aviso);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const updateAviso = async (id, aviso) => {
    setError(null);
    const result = await avisosService.updateAviso(id, aviso);
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
 */
export function useAvisosPublicos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(
      avisosRef,
      where('exibirNaHomepage', '==', true),
      orderBy('data', 'desc')
    );
    
    // Real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const avisosData = [];
        snapshot.forEach((doc) => {
          avisosData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setAvisos(avisosData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Erro ao escutar avisos públicos:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup: cancelar subscription quando componente desmontar
    return () => unsubscribe();
  }, []);

  return {
    avisos,
    loading,
    error
  };
}

