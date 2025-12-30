import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "escalas";

/**
 * Busca todas as escalas do Firestore
 */
export async function getAllEscalas() {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(escalasRef);

    const escalas = [];
    querySnapshot.forEach((doc) => {
      escalas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: escalas };
  } catch (error) {
    console.error("Erro ao buscar escalas:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca uma escala específica pelo ID
 */
export async function getEscalaById(escalaId) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const escalaDoc = await getDoc(escalaRef);

    if (!escalaDoc.exists()) {
      return {
        success: false,
        error: "Escala não encontrada",
        notFound: true,
      };
    }

    return {
      success: true,
      data: {
        id: escalaDoc.id,
        ...escalaDoc.data(),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar escala:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca escalas públicas (exibirNoPublico = true)
 */
export async function getEscalasPublicas() {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);
    const q = query(escalasRef, where("exibirNoPublico", "==", true));
    const querySnapshot = await getDocs(q);

    const escalas = [];
    querySnapshot.forEach((doc) => {
      escalas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: escalas };
  } catch (error) {
    console.error("Erro ao buscar escalas públicas:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca escalas por departamento
 */
export async function getEscalasByDepartment(department) {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);
    const q = query(escalasRef, where("department", "==", department));
    const querySnapshot = await getDocs(q);

    const escalas = [];
    querySnapshot.forEach((doc) => {
      escalas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: escalas };
  } catch (error) {
    console.error("Erro ao buscar escalas por departamento:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca escalas por categoria
 */
export async function getEscalasByCategoria(categoria) {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);
    const q = query(escalasRef, where("categoria", "==", categoria));
    const querySnapshot = await getDocs(q);

    const escalas = [];
    querySnapshot.forEach((doc) => {
      escalas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: escalas };
  } catch (error) {
    console.error("Erro ao buscar escalas por categoria:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Cria ou atualiza uma escala
 */
export async function saveEscala(escalaId, escalaData) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const now = Timestamp.now();

    // Verifica se já existe
    const existingDoc = await getDoc(escalaRef);

    const dataToSave = {
      ...escalaData,
      updatedAt: now,
      ...(existingDoc.exists() ? {} : { createdAt: now })
    };

    await setDoc(escalaRef, dataToSave);

    return {
      success: true,
      message: existingDoc.exists() ? "Escala atualizada com sucesso" : "Escala criada com sucesso",
      data: { id: escalaId, ...dataToSave }
    };
  } catch (error) {
    console.error("Erro ao salvar escala:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Atualiza uma escala existente
 */
export async function updateEscala(escalaId, updates) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const existingDoc = await getDoc(escalaRef);

    if (!existingDoc.exists()) {
      return { success: false, error: "Escala não encontrada" };
    }

    const now = Timestamp.now();
    const updateData = {
      ...updates,
      updatedAt: now
    };

    await updateDoc(escalaRef, updateData);

    return {
      success: true,
      message: "Escala atualizada com sucesso"
    };
  } catch (error) {
    console.error("Erro ao atualizar escala:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Deleta uma escala
 */
export async function deleteEscala(escalaId) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    await deleteDoc(escalaRef);

    return {
      success: true,
      message: "Escala deletada com sucesso"
    };
  } catch (error) {
    console.error("Erro ao deletar escala:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Importa múltiplas escalas de uma vez (usado para migração)
 */
export async function bulkImportEscalas(escalasData) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    for (const [id, escala] of Object.entries(escalasData)) {
      const result = await saveEscala(id, escala);

      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({
          id,
          error: result.error
        });
      }
    }

    return {
      success: true,
      message: `Importação concluída: ${results.success} sucesso, ${results.failed} falhas`,
      results
    };
  } catch (error) {
    console.error("Erro na importação em lote:", error);
    return { success: false, error: error.message };
  }
}
