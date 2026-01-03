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

export async function saveEscala(escalaId, escalaData) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const now = Timestamp.now();

    const existingDoc = await getDoc(escalaRef);

    const dataToSave = {
      ...escalaData,
      updatedAt: now,
      ...(existingDoc.exists() ? {} : { createdAt: now }),
    };

    await setDoc(escalaRef, dataToSave);

    return {
      success: true,
      message: existingDoc.exists()
        ? "Escala atualizada com sucesso"
        : "Escala criada com sucesso",
      data: { id: escalaId, ...dataToSave },
    };
  } catch (error) {
    console.error("Erro ao salvar escala:", error);
    return { success: false, error: error.message };
  }
}

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
      updatedAt: now,
    };

    await updateDoc(escalaRef, updateData);

    return {
      success: true,
      message: "Escala atualizada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar escala:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEscala(escalaId) {
  try {
    if (!escalaId) {
      return { success: false, error: "ID da escala é obrigatório" };
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    await deleteDoc(escalaRef);

    return {
      success: true,
      message: "Escala deletada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao deletar escala:", error);
    return { success: false, error: error.message };
  }
}

export async function getEscalaByKey(escalaKey) {
  return await getEscalaById(escalaKey);
}

export async function deleteAllEscalas() {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(escalasRef);

    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);

    return {
      success: true,
      message: `${querySnapshot.size} escalas deletadas com sucesso`,
      count: querySnapshot.size,
    };
  } catch (error) {
    console.error("Erro ao deletar todas as escalas:", error);
    return { success: false, error: error.message };
  }
}

export async function bulkImportEscalas(escalasData) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (const [id, escala] of Object.entries(escalasData)) {
      const result = await saveEscala(id, escala);

      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({
          id,
          error: result.error,
        });
      }
    }

    return {
      success: true,
      message: `Importação concluída: ${results.success} sucesso, ${results.failed} falhas`,
      results,
    };
  } catch (error) {
    console.error("Erro na importação em lote:", error);
    return { success: false, error: error.message };
  }
}

const ESCALAS_MENSAIS_COLLECTION = "escalas_mensais";

function gerarIdEscalaMensal(escalaKey, ano, mes) {
  const mesFormatado = String(mes).padStart(2, "0");
  return `${escalaKey}_${ano}-${mesFormatado}`;
}

function obterMesAnoAtual() {
  const agora = new Date();
  return {
    ano: agora.getFullYear(),
    mes: agora.getMonth() + 1,
  };
}

export async function saveEscalaMensal(escalaKey, ano, mes, escalaData) {
  try {
    if (!escalaKey || !ano || !mes) {
      return { success: false, error: "Chave, ano e mês são obrigatórios" };
    }

    const id = gerarIdEscalaMensal(escalaKey, ano, mes);
    const escalaRef = doc(db, ESCALAS_MENSAIS_COLLECTION, id);
    const now = Timestamp.now();

    const existingDoc = await getDoc(escalaRef);

    const dataToSave = {
      ...escalaData,
      escalaKey,
      ano,
      mes,
      mesReferencia: `${ano}-${String(mes).padStart(2, "0")}`,
      updatedAt: now,
      ...(existingDoc.exists() ? {} : { createdAt: now }),
    };

    await setDoc(escalaRef, dataToSave);

    return {
      success: true,
      message: existingDoc.exists()
        ? "Escala mensal atualizada com sucesso"
        : "Escala mensal criada com sucesso",
      data: { id, ...dataToSave },
    };
  } catch (error) {
    console.error("Erro ao salvar escala mensal:", error);
    return { success: false, error: error.message };
  }
}

export async function getEscalaMensal(escalaKey, ano, mes) {
  try {
    const id = gerarIdEscalaMensal(escalaKey, ano, mes);
    const escalaRef = doc(db, ESCALAS_MENSAIS_COLLECTION, id);
    const escalaDoc = await getDoc(escalaRef);

    if (!escalaDoc.exists()) {
      return {
        success: false,
        error: "Escala mensal não encontrada",
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
    console.error("Erro ao buscar escala mensal:", error);
    return { success: false, error: error.message };
  }
}

export async function getEscalaAtiva(escalaKey) {
  try {
    const { ano, mes } = obterMesAnoAtual();

    const escalaMensal = await getEscalaMensal(escalaKey, ano, mes);

    if (escalaMensal.success) {
      return {
        success: true,
        data: escalaMensal.data,
        tipo: "mensal",
      };
    }

    const escalaPadrao = await getEscalaById(escalaKey);

    if (escalaPadrao.success) {
      return {
        success: true,
        data: escalaPadrao.data,
        tipo: "padrao",
      };
    }

    return {
      success: false,
      error: "Nenhuma escala encontrada (mensal ou padrão)",
    };
  } catch (error) {
    console.error("Erro ao buscar escala ativa:", error);
    return { success: false, error: error.message };
  }
}

export async function getEscalasMensaisPorPeriodo(ano, mes) {
  try {
    const escalasRef = collection(db, ESCALAS_MENSAIS_COLLECTION);
    const mesReferencia = `${ano}-${String(mes).padStart(2, "0")}`;
    const q = query(escalasRef, where("mesReferencia", "==", mesReferencia));
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
    console.error("Erro ao buscar escalas mensais por período:", error);
    return { success: false, error: error.message };
  }
}

export async function getHistoricoEscalasMensais(escalaKey) {
  try {
    const escalasRef = collection(db, ESCALAS_MENSAIS_COLLECTION);
    const q = query(escalasRef, where("escalaKey", "==", escalaKey));
    const querySnapshot = await getDocs(q);

    const escalas = [];
    querySnapshot.forEach((doc) => {
      escalas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    escalas.sort((a, b) => {
      const dataA = new Date(a.ano, a.mes - 1);
      const dataB = new Date(b.ano, b.mes - 1);
      return dataB - dataA;
    });

    return { success: true, data: escalas };
  } catch (error) {
    console.error("Erro ao buscar histórico de escalas mensais:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEscalaMensal(escalaKey, ano, mes) {
  try {
    const id = gerarIdEscalaMensal(escalaKey, ano, mes);
    const escalaRef = doc(db, ESCALAS_MENSAIS_COLLECTION, id);
    await deleteDoc(escalaRef);

    return {
      success: true,
      message: "Escala mensal deletada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao deletar escala mensal:", error);
    return { success: false, error: error.message };
  }
}

export async function bulkImportEscalasMensais(escalasData, ano, mes) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (const [escalaKey, escalaData] of Object.entries(escalasData)) {
      const result = await saveEscalaMensal(escalaKey, ano, mes, escalaData);

      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({
          escalaKey,
          error: result.error,
        });
      }
    }

    return {
      success: true,
      message: `Importação mensal concluída: ${results.success} sucesso, ${results.failed} falhas`,
      results,
    };
  } catch (error) {
    console.error("Erro na importação em lote de escalas mensais:", error);
    return { success: false, error: error.message };
  }
}
