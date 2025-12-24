// =========================================
// SERVIÇO DE AVISOS
// =========================================
// Funções CRUD para gerenciar avisos no Firestore

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'avisos';

/**
 * Busca todos os avisos ordenados por data (mais recentes primeiro)
 */
export async function getAvisos() {
  try {
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(avisosRef, orderBy('data', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const avisos = [];
    querySnapshot.forEach((doc) => {
      avisos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: avisos };
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca apenas avisos públicos (exibirNaHomepage = true)
 * Ordenados por data (mais recentes primeiro)
 */
export async function getAvisosPublicos() {
  try {
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(
      avisosRef,
      where('exibirNaHomepage', '==', true),
      orderBy('data', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const avisos = [];
    querySnapshot.forEach((doc) => {
      avisos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: avisos };
  } catch (error) {
    console.error('Erro ao buscar avisos públicos:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cria um novo aviso
 * @param {Object} aviso - Objeto com título, descricao, categoria, data, exibirNaHomepage
 */
export async function createAviso(aviso) {
  try {
    // Validar campos obrigatórios
    if (!aviso.titulo || !aviso.descricao || !aviso.categoria || !aviso.data) {
      return { success: false, error: 'Todos os campos obrigatórios devem ser preenchidos' };
    }

    // Converter data para Timestamp se for string
    let dataTimestamp = aviso.data;
    if (typeof aviso.data === 'string') {
      dataTimestamp = Timestamp.fromDate(new Date(aviso.data));
    } else if (aviso.data instanceof Date) {
      dataTimestamp = Timestamp.fromDate(aviso.data);
    }

    const novoAviso = {
      titulo: aviso.titulo.trim(),
      descricao: aviso.descricao.trim(),
      categoria: aviso.categoria,
      data: dataTimestamp,
      exibirNaHomepage: aviso.exibirNaHomepage || false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), novoAviso);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erro ao criar aviso:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Atualiza um aviso existente
 * @param {string} id - ID do documento no Firestore
 * @param {Object} aviso - Objeto com campos a atualizar
 */
export async function updateAviso(id, aviso) {
  try {
    if (!id) {
      return { success: false, error: 'ID do aviso é obrigatório' };
    }

    const avisoRef = doc(db, COLLECTION_NAME, id);
    
    // Preparar dados para atualização
    const dadosAtualizacao = {
      updatedAt: Timestamp.now()
    };

    if (aviso.titulo !== undefined) {
      dadosAtualizacao.titulo = aviso.titulo.trim();
    }
    if (aviso.descricao !== undefined) {
      dadosAtualizacao.descricao = aviso.descricao.trim();
    }
    if (aviso.categoria !== undefined) {
      dadosAtualizacao.categoria = aviso.categoria;
    }
    if (aviso.data !== undefined) {
      // Converter data para Timestamp se necessário
      if (typeof aviso.data === 'string') {
        dadosAtualizacao.data = Timestamp.fromDate(new Date(aviso.data));
      } else if (aviso.data instanceof Date) {
        dadosAtualizacao.data = Timestamp.fromDate(aviso.data);
      } else {
        dadosAtualizacao.data = aviso.data;
      }
    }
    if (aviso.exibirNaHomepage !== undefined) {
      dadosAtualizacao.exibirNaHomepage = aviso.exibirNaHomepage;
    }

    await updateDoc(avisoRef, dadosAtualizacao);
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar aviso:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Deleta um aviso
 * @param {string} id - ID do documento no Firestore
 */
export async function deleteAviso(id) {
  try {
    if (!id) {
      return { success: false, error: 'ID do aviso é obrigatório' };
    }

    const avisoRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(avisoRef);
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar aviso:', error);
    return { success: false, error: error.message };
  }
}

