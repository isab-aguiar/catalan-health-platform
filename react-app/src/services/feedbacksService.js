import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "feedbacks";

export async function createFeedback(feedbackData) {
  try {
    if (!feedbackData.tipo || !feedbackData.mensagem) {
      return {
        success: false,
        error: "Tipo e mensagem são obrigatórios",
      };
    }

    if (!feedbackData.anonimo && !feedbackData.nome) {
      return {
        success: false,
        error: "Nome é obrigatório quando não é anônimo",
      };
    }

    const novoFeedback = {
      tipo: feedbackData.tipo,
      nome: feedbackData.anonimo ? "" : (feedbackData.nome || "").trim(),
      email: (feedbackData.email || "").trim(),
      telefone: (feedbackData.telefone || "").trim(),
      mensagem: feedbackData.mensagem.trim(),
      categoria: feedbackData.categoria || null,
      anonimo: feedbackData.anonimo || false,
      status: "pendente",
      resposta: null,
      respondidoPor: null,
      respondidoEm: null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), novoFeedback);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getFeedbacks(filters = {}) {
  try {
    const feedbacksRef = collection(db, COLLECTION_NAME);
    let q = query(feedbacksRef);

    if (filters.tipo && filters.tipo !== "todos") {
      q = query(q, where("tipo", "==", filters.tipo));
    }

    if (filters.status && filters.status !== "todos") {
      q = query(q, where("status", "==", filters.status));
    }

    q = query(q, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const feedbacks = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let feedback = {
        id: doc.id,
        ...data,
      };

      if (filters.busca) {
        const buscaLower = filters.busca.toLowerCase();
        const nomeMatch = feedback.nome?.toLowerCase().includes(buscaLower);
        const emailMatch = feedback.email?.toLowerCase().includes(buscaLower);
        if (!nomeMatch && !emailMatch) {
          return;
        }
      }

      feedbacks.push(feedback);
    });

    return { success: true, data: feedbacks };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getFeedbackById(id) {
  try {
    if (!id) {
      return { success: false, error: "ID do feedback é obrigatório" };
    }

    const feedbackRef = doc(db, COLLECTION_NAME, id);
    const feedbackDoc = await getDoc(feedbackRef);

    if (!feedbackDoc.exists()) {
      return { success: false, error: "Feedback não encontrado" };
    }

    return {
      success: true,
      data: {
        id: feedbackDoc.id,
        ...feedbackDoc.data(),
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateFeedback(id, updates, updatedByUid = null) {
  try {
    if (!id) {
      return { success: false, error: "ID do feedback é obrigatório" };
    }

    const feedbackRef = doc(db, COLLECTION_NAME, id);
    const dadosAtualizacao = {
      updatedAt: Timestamp.now(),
    };

    if (updates.status !== undefined) {
      dadosAtualizacao.status = updates.status;
    }

    if (updates.resposta !== undefined) {
      dadosAtualizacao.resposta = updates.resposta.trim();
      dadosAtualizacao.respondidoPor = updatedByUid || null;
      dadosAtualizacao.respondidoEm = Timestamp.now();
    }

    if (updates.respondidoPor !== undefined) {
      dadosAtualizacao.respondidoPor = updates.respondidoPor;
    }

    if (updates.respondidoEm !== undefined) {
      dadosAtualizacao.respondidoEm = updates.respondidoEm;
    }

    await updateDoc(feedbackRef, dadosAtualizacao);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteFeedback(id) {
  try {
    if (!id) {
      return { success: false, error: "ID do feedback é obrigatório" };
    }

    const feedbackRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(feedbackRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

