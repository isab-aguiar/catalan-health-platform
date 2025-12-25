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
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
const COLLECTION_NAME = "avisos";
export async function getAvisos() {
  try {
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(avisosRef, orderBy("data", "desc"));
    const querySnapshot = await getDocs(q);
    const avisos = [];
    querySnapshot.forEach((doc) => {
      avisos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: avisos };
  } catch (error) {
    console.error("Erro ao buscar avisos:", error);
    return { success: false, error: error.message };
  }
}
export async function getAvisosPublicos() {
  try {
    const avisosRef = collection(db, COLLECTION_NAME);
    const q = query(
      avisosRef,
      where("exibirNaHomepage", "==", true),
      orderBy("data", "desc")
    );
    const querySnapshot = await getDocs(q);
    const avisos = [];
    querySnapshot.forEach((doc) => {
      avisos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: avisos };
  } catch (error) {
    console.error("Erro ao buscar avisos públicos:", error);
    return { success: false, error: error.message };
  }
}
export async function createAviso(aviso, createdByUid = null) {
  try {
    if (!aviso.titulo || !aviso.descricao || !aviso.categoria || !aviso.data) {
      return {
        success: false,
        error: "Todos os campos obrigatórios devem ser preenchidos",
      };
    }
    let dataTimestamp = aviso.data;
    if (typeof aviso.data === "string") {
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
      paginaDestino: aviso.paginaDestino || "home",
      createdBy: createdByUid || null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), novoAviso);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    return { success: false, error: error.message };
  }
}
export async function updateAviso(id, aviso, updatedByUid = null) {
  try {
    if (!id) {
      return { success: false, error: "ID do aviso é obrigatório" };
    }
    const avisoRef = doc(db, COLLECTION_NAME, id);
    const dadosAtualizacao = {
      updatedAt: Timestamp.now(),
      updatedBy: updatedByUid || null,
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
      if (typeof aviso.data === "string") {
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
    if (aviso.paginaDestino !== undefined) {
      dadosAtualizacao.paginaDestino = aviso.paginaDestino;
    }
    await updateDoc(avisoRef, dadosAtualizacao);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar aviso:", error);
    return { success: false, error: error.message };
  }
}
export async function deleteAviso(id) {
  fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "avisosService.js:175",
      message: "deleteAviso called",
      data: { id: id, hasDb: !!db },
      timestamp: Date.now(),
      sessionId: "debug-session",
      hypothesisId: "H3",
    }),
  }).catch(() => {});
  try {
    if (!id) {
      fetch(
        "http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "avisosService.js:177",
            message: "deleteAviso: ID missing",
            data: { id: id },
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId: "H3",
          }),
        }
      ).catch(() => {});
      return { success: false, error: "ID do aviso é obrigatório" };
    }
    const avisoRef = doc(db, COLLECTION_NAME, id);
    fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "avisosService.js:181",
        message: "deleteAviso: Before deleteDoc call",
        data: { id: id, collection: COLLECTION_NAME },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "H3",
      }),
    }).catch(() => {});
    await deleteDoc(avisoRef);
    fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "avisosService.js:182",
        message: "deleteAviso: After deleteDoc SUCCESS",
        data: { id: id },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "H3",
      }),
    }).catch(() => {});
    return { success: true };
  } catch (error) {
    fetch("http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "avisosService.js:185",
        message: "deleteAviso: CATCH ERROR",
        data: {
          id: id,
          errorCode: error.code,
          errorMessage: error.message,
          errorName: error.name,
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "H3",
      }),
    }).catch(() => {});
    console.error("Erro ao deletar aviso:", error);
    return { success: false, error: error.message };
  }
}
