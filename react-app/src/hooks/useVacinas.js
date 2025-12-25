// =========================================
// HOOK useVacinas
// =========================================
// Hook para gerenciar vacinas do Firestore com real-time updates

import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'vacinas';

/**
 * Hook para gerenciar vacinas
 * Retorna lista de vacinas e função de atualização
 */
export function useVacinas() {
  const [vacinas, setVacinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
      setError('Firebase não configurado');
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const vacinasRef = collection(db, COLLECTION_NAME);
    
    // Real-time listener
    const unsubscribe = onSnapshot(
      vacinasRef,
      (snapshot) => {
        const vacinasData = [];
        snapshot.forEach((doc) => {
          vacinasData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        // Ordenar por nome
        vacinasData.sort((a, b) => {
          const nomeA = a.nome || '';
          const nomeB = b.nome || '';
          return nomeA.localeCompare(nomeB, 'pt-BR');
        });
        
        setVacinas(vacinasData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Erro ao escutar vacinas:', err);
        setError('Erro ao carregar vacinas. Verifique sua conexão.');
        setLoading(false);
      }
    );

    // Cleanup
    return () => unsubscribe();
  }, []);

  /**
   * Atualiza um campo específico de uma vacina
   */
  const updateVacina = async (id, campo, valor) => {
    if (!db) {
      setError('Firebase não configurado');
      return { success: false, error: 'Firebase não configurado' };
    }

    try {
      const vacinaRef = doc(db, COLLECTION_NAME, id);
      
      // Converter Date para Timestamp se necessário
      let valorFinal = valor;
      if (valor instanceof Date) {
        valorFinal = Timestamp.fromDate(valor);
      } else if (valor === null || valor === '') {
        valorFinal = null;
      }
      
      await updateDoc(vacinaRef, { 
        [campo]: valorFinal,
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (err) {
      console.error('Erro ao atualizar vacina:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Cria uma nova vacina
   */
  const createVacina = async (vacinaData) => {
    if (!db) {
      setError('Firebase não configurado');
      return { success: false, error: 'Firebase não configurado' };
    }

    try {
      // Gerar ID único baseado no nome (normalizado)
      const id = vacinaData.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-') // Substitui espaços e caracteres especiais por hífen
        .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim

      const vacinaRef = doc(db, COLLECTION_NAME, id);

      // Preparar dados
      const dadosVacina = {
        id: id,
        nome: vacinaData.nome,
        finalidade: vacinaData.finalidade || '',
        publicoAlvo: vacinaData.publicoAlvo || '',
        quantidade: vacinaData.quantidade || 0,
        periodoInicio: vacinaData.periodoInicio ? Timestamp.fromDate(new Date(vacinaData.periodoInicio)) : null,
        periodoFim: vacinaData.periodoFim ? Timestamp.fromDate(new Date(vacinaData.periodoFim)) : null,
        publicado: vacinaData.publicado ?? false,
        ativo: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(vacinaRef, dadosVacina);
      return { success: true, id };
    } catch (err) {
      console.error('Erro ao criar vacina:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    vacinas,
    loading,
    error,
    updateVacina,
    createVacina
  };
}

