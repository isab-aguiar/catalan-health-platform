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
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
const COLLECTION_NAME = "campanhas";
function sanitizeUndefined(obj) {
  const sanitized = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === undefined) {
        sanitized[key] = null;
      } else if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date) &&
        !(value.seconds !== undefined)
      ) {
        sanitized[key] = sanitizeUndefined(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  return sanitized;
}
export const criarCampanha = async (
  campanhaData,
  userId,
  imagemURL,
  pdfURL
) => {
  try {
    if (!campanhaData.titulo || !campanhaData.descricao) {
      throw new Error("Título e descrição são obrigatórios");
    }
    const campanha = {
      titulo: campanhaData.titulo.trim(),
      subtitulo: campanhaData.subtitulo?.trim() || null,
      descricao: campanhaData.descricao.trim(),
      template: campanhaData.template || "informativo",
      categoria: campanhaData.categoria || "campanha",
      urgente: campanhaData.urgente || false,
      destaque: campanhaData.destaque !== false,
      ativo: true,
      exibirNaHomepage: campanhaData.exibirNaHomepage !== false,
      dataInicio: campanhaData.dataInicio
        ? Timestamp.fromDate(new Date(campanhaData.dataInicio))
        : null,
      dataFim: campanhaData.dataFim
        ? Timestamp.fromDate(new Date(campanhaData.dataFim))
        : null,
      horario: campanhaData.horario || null,
      local: campanhaData.local || "ESF Catalão",
      publicoAlvo: campanhaData.publicoAlvo || null,
      topicos: Array.isArray(campanhaData.topicos) ? campanhaData.topicos : [],
      contato: campanhaData.contato || null,
      cta: campanhaData.cta || "Saiba Mais",
      paginaDestino: campanhaData.paginaDestino || "home",
      imagens:
        campanhaData.imagens ||
        (imagemURL
          ? [{ url: imagemURL, caminho: campanhaData.imagemCaminho, ordem: 0 }]
          : []),
      imagemURL: imagemURL || null,
      imagemCaminho: campanhaData.imagemCaminho || null,
      pdfURL: pdfURL || null,
      pdfNome: campanhaData.pdfNome || null,
      pdfCaminho: campanhaData.pdfCaminho || null,
      criadoPor: userId,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
      visualizacoes: 0,
      cliques: 0,
    };
    const campanhaSanitizada = sanitizeUndefined(campanha);
    const campanhasRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(campanhasRef, campanhaSanitizada);
    return {
      success: true,
      id: docRef.id,
      data: { id: docRef.id, ...campanha },
    };
  } catch (error) {
    console.error("Erro ao criar campanha:", error);
    throw new Error(`Falha ao criar campanha: ${error.message}`);
  }
};
export const buscarCampanhas = async (filtros = {}) => {
  try {
    const campanhasRef = collection(db, COLLECTION_NAME);
    let q = query(campanhasRef);
    if (filtros.ativo !== undefined) {
      q = query(q, where("ativo", "==", filtros.ativo));
    }
    if (filtros.destaque !== undefined) {
      q = query(q, where("destaque", "==", filtros.destaque));
    }
    if (filtros.categoria) {
      q = query(q, where("categoria", "==", filtros.categoria));
    }
    if (filtros.exibirNaHomepage !== undefined) {
      q = query(q, where("exibirNaHomepage", "==", filtros.exibirNaHomepage));
    }
    const snapshot = await getDocs(q);
    const campanhas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dataInicio: data.dataInicio?.toDate
          ? data.dataInicio.toDate()
          : data.dataInicio || null,
        dataFim: data.dataFim?.toDate
          ? data.dataFim.toDate()
          : data.dataFim || null,
        criadoEm: data.criadoEm?.toDate
          ? data.criadoEm.toDate()
          : data.criadoEm
            ? new Date(data.criadoEm)
            : null,
        atualizadoEm: data.atualizadoEm?.toDate
          ? data.atualizadoEm.toDate()
          : data.atualizadoEm
            ? new Date(data.atualizadoEm)
            : null,
      };
    });
    campanhas.sort((a, b) => {
      const dateA = a.criadoEm || new Date(0);
      const dateB = b.criadoEm || new Date(0);
      return dateB - dateA;
    });
    const campanhasValidas = campanhas.filter((camp) => {
      if (!camp.dataFim) return true;
      return camp.dataFim >= new Date();
    });
    return campanhasValidas;
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    throw new Error(`Falha ao buscar campanhas: ${error.message}`);
  }
};
export const buscarCampanhasHome = async () => {
  return buscarCampanhas({
    ativo: true,
    exibirNaHomepage: true,
  });
};
export const buscarCampanhasPorCriador = async (userId) => {
  try {
    if (!userId) {
      throw new Error("ID do usuário é obrigatório");
    }
    const campanhasRef = collection(db, COLLECTION_NAME);
    const q = query(campanhasRef, where("criadoPor", "==", userId));
    const snapshot = await getDocs(q);
    const campanhas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dataInicio: data.dataInicio?.toDate
          ? data.dataInicio.toDate()
          : data.dataInicio || null,
        dataFim: data.dataFim?.toDate
          ? data.dataFim.toDate()
          : data.dataFim || null,
        criadoEm: data.criadoEm?.toDate
          ? data.criadoEm.toDate()
          : data.criadoEm
            ? new Date(data.criadoEm)
            : null,
        atualizadoEm: data.atualizadoEm?.toDate
          ? data.atualizadoEm.toDate()
          : data.atualizadoEm
            ? new Date(data.atualizadoEm)
            : null,
      };
    });
    campanhas.sort((a, b) => {
      const dateA = a.criadoEm || new Date(0);
      const dateB = b.criadoEm || new Date(0);
      return dateB - dateA;
    });
    console.log(
      `✅ Carregadas ${campanhas.length} campanha(s) do usuário ${userId}`
    );
    return campanhas;
  } catch (error) {
    console.error("Erro ao buscar campanhas do criador:", error);
    throw new Error(`Falha ao buscar campanhas: ${error.message}`);
  }
};
export const buscarCampanhasPorPagina = async (paginaNome) => {
  try {
    const campanhasRef = collection(db, COLLECTION_NAME);
    let q = query(
      campanhasRef,
      where("ativo", "==", true),
      where("exibirNaHomepage", "==", false),
      where("paginaDestino", "==", paginaNome)
    );
    const snapshot = await getDocs(q);
    const campanhas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dataInicio: data.dataInicio?.toDate
          ? data.dataInicio.toDate()
          : data.dataInicio || null,
        dataFim: data.dataFim?.toDate
          ? data.dataFim.toDate()
          : data.dataFim || null,
        criadoEm: data.criadoEm?.toDate
          ? data.criadoEm.toDate()
          : data.criadoEm
            ? new Date(data.criadoEm)
            : null,
        atualizadoEm: data.atualizadoEm?.toDate
          ? data.atualizadoEm.toDate()
          : data.atualizadoEm
            ? new Date(data.atualizadoEm)
            : null,
      };
    });
    campanhas.sort((a, b) => {
      const dateA = a.criadoEm || new Date(0);
      const dateB = b.criadoEm || new Date(0);
      return dateB - dateA;
    });
    return campanhas.filter((camp) => {
      if (!camp.dataFim) return true;
      return camp.dataFim >= new Date();
    });
  } catch (error) {
    console.error("Erro ao buscar campanhas por página:", error);
    return [];
  }
};
export const buscarCampanhaPorId = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanhaSnap = await getDoc(campanhaRef);
    if (!campanhaSnap.exists()) {
      throw new Error("Campanha não encontrada");
    }
    const data = campanhaSnap.data();
    return {
      id: campanhaSnap.id,
      ...data,
      dataInicio: data.dataInicio?.toDate
        ? data.dataInicio.toDate()
        : data.dataInicio || null,
      dataFim: data.dataFim?.toDate
        ? data.dataFim.toDate()
        : data.dataFim || null,
      criadoEm: data.criadoEm?.toDate
        ? data.criadoEm.toDate()
        : data.criadoEm
          ? new Date(data.criadoEm)
          : null,
      atualizadoEm: data.atualizadoEm?.toDate
        ? data.atualizadoEm.toDate()
        : data.atualizadoEm
          ? new Date(data.atualizadoEm)
          : null,
    };
  } catch (error) {
    console.error("Erro ao buscar campanha:", error);
    throw new Error(`Falha ao buscar campanha: ${error.message}`);
  }
};
export const atualizarCampanha = async (campanhaId, dadosAtualizados) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const updates = {
      ...dadosAtualizados,
      atualizadoEm: serverTimestamp(),
    };
    if (dadosAtualizados.dataInicio) {
      updates.dataInicio = Timestamp.fromDate(
        new Date(dadosAtualizados.dataInicio)
      );
    }
    if (dadosAtualizados.dataFim) {
      updates.dataFim = Timestamp.fromDate(new Date(dadosAtualizados.dataFim));
    }
    await updateDoc(campanhaRef, updates);
    return {
      success: true,
      message: "Campanha atualizada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar campanha:", error);
    throw new Error(`Falha ao atualizar campanha: ${error.message}`);
  }
};
export const desativarCampanha = async (campanhaId) => {
  return atualizarCampanha(campanhaId, { ativo: false });
};
export const ativarCampanha = async (campanhaId) => {
  return atualizarCampanha(campanhaId, { ativo: true });
};
export const deletarCampanha = async (campanhaId) => {
  try {
    if (!db) {
      throw new Error("Firebase não inicializado");
    }
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    await deleteDoc(campanhaRef);
    console.log("✅ Campanha deletada com sucesso:", campanhaId);
    return {
      success: true,
      message: "Campanha deletada com sucesso",
    };
  } catch (error) {
    console.error("❌ Erro ao deletar campanha:", {
      id: campanhaId,
      error: error.message,
      code: error.code,
    });
    throw new Error(`Falha ao deletar campanha: ${error.message}`);
  }
};
export const incrementarVisualizacoes = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanha = await getDoc(campanhaRef);
    if (campanha.exists()) {
      const visualizacoesAtuais = campanha.data().visualizacoes || 0;
      await updateDoc(campanhaRef, {
        visualizacoes: visualizacoesAtuais + 1,
      });
    }
  } catch (error) {
    console.error("Erro ao incrementar visualizações:", error);
  }
};
export const incrementarCliques = async (campanhaId) => {
  try {
    const campanhaRef = doc(db, COLLECTION_NAME, campanhaId);
    const campanha = await getDoc(campanhaRef);
    if (campanha.exists()) {
      const cliquesAtuais = campanha.data().cliques || 0;
      await updateDoc(campanhaRef, {
        cliques: cliquesAtuais + 1,
      });
    }
  } catch (error) {
    console.error("Erro ao incrementar cliques:", error);
  }
};
export default {
  criarCampanha,
  buscarCampanhas,
  buscarCampanhasHome,
  buscarCampanhasPorCriador,
  buscarCampanhaPorId,
  atualizarCampanha,
  desativarCampanha,
  ativarCampanha,
  deletarCampanha,
  incrementarVisualizacoes,
  incrementarCliques,
};
