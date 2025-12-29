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

const COLLECTION_NAME = "escalas";

export const TURNOS = {
  MANHA: "manha",
  ALMOCO: "almoco",
  TARDE: "tarde",
  INTEGRAL: "integral",
};

export const DIAS_SEMANA = {
  SEGUNDA: "segunda",
  TERCA: "terca",
  QUARTA: "quarta",
  QUINTA: "quinta",
  SEXTA: "sexta",
  SABADO: "sabado",
};

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

export const criarEscala = async (escalaData, userId) => {
  try {

    if (!escalaData.mes || !escalaData.ano) {
      throw new Error("Mês e ano são obrigatórios");
    }

    const escala = {
      mes: escalaData.mes, // 1-12
      ano: escalaData.ano,
      titulo: escalaData.titulo || `Escala ${getMesNome(escalaData.mes)}/${escalaData.ano}`,
      profissionais: escalaData.profissionais || {},
      turnosPorDia: escalaData.turnosPorDia || [TURNOS.MANHA, TURNOS.ALMOCO, TURNOS.TARDE],
      diasFuncionamento: escalaData.diasFuncionamento || [
        DIAS_SEMANA.SEGUNDA,
        DIAS_SEMANA.TERCA,
        DIAS_SEMANA.QUARTA,
        DIAS_SEMANA.QUINTA,
        DIAS_SEMANA.SEXTA,
      ],
      observacoes: escalaData.observacoes || null,
      status: escalaData.status || "rascunho",
      publicada: escalaData.publicada || false,
      dataPublicacao: escalaData.dataPublicacao
        ? Timestamp.fromDate(new Date(escalaData.dataPublicacao))
        : null,
      criadoPor: userId,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    };

    const escalaSanitizada = sanitizeUndefined(escala);

    const escalasRef = collection(db, COLLECTION_NAME);

    const docRef = await addDoc(escalasRef, escalaSanitizada);

    return {
      success: true,
      id: docRef.id,
      data: { id: docRef.id, ...escala },
    };
  } catch (error) {
    console.error("❌ [escalasService] Erro ao criar escala:", error);
    console.error("❌ [escalasService] Stack:", error.stack);
    throw new Error(`Falha ao criar escala: ${error.message}`);
  }
};

// Buscar escalas
export const buscarEscalas = async (filtros = {}) => {
  try {
    const escalasRef = collection(db, COLLECTION_NAME);

    // Query simplificada - ordena apenas por criadoEm para evitar necessidade de índice composto
    let q = query(escalasRef, orderBy("criadoEm", "desc"));

    if (filtros.status) {
      q = query(escalasRef, where("status", "==", filtros.status), orderBy("criadoEm", "desc"));
    }

    if (filtros.publicada !== undefined) {
      q = query(escalasRef, where("publicada", "==", filtros.publicada), orderBy("criadoEm", "desc"));
    }

    if (filtros.mes && filtros.ano) {
      q = query(
        escalasRef,
        where("mes", "==", filtros.mes),
        where("ano", "==", filtros.ano),
        orderBy("criadoEm", "desc")
      );
    }

    const snapshot = await getDocs(q);

    let escalas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dataPublicacao: data.dataPublicacao?.toDate
          ? data.dataPublicacao.toDate()
          : data.dataPublicacao || null,
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

    escalas.sort((a, b) => {
      if (a.ano !== b.ano) return b.ano - a.ano;
      return b.mes - a.mes;
    });

    return escalas;
  } catch (error) {
    console.error("Erro ao buscar escalas:", error);
    throw new Error(`Falha ao buscar escalas: ${error.message}`);
  }
};

export const buscarEscalaMesAtual = async () => {
  const hoje = new Date();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();

  try {
    const escalas = await buscarEscalas({ mes, ano, publicada: true });
    return escalas.length > 0 ? escalas[0] : null;
  } catch (error) {
    console.error("Erro ao buscar escala do mês atual:", error);
    return null;
  }
};

export const buscarEscalaPorId = async (escalaId) => {
  try {
    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const escalaSnap = await getDoc(escalaRef);

    if (!escalaSnap.exists()) {
      throw new Error("Escala não encontrada");
    }

    const data = escalaSnap.data();
    return {
      id: escalaSnap.id,
      ...data,
      dataPublicacao: data.dataPublicacao?.toDate
        ? data.dataPublicacao.toDate()
        : data.dataPublicacao || null,
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
    console.error("Erro ao buscar escala:", error);
    throw new Error(`Falha ao buscar escala: ${error.message}`);
  }
};

export const atualizarEscala = async (escalaId, dadosAtualizados) => {
  try {
    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    const updates = {
      ...dadosAtualizados,
      atualizadoEm: serverTimestamp(),
    };

    if (dadosAtualizados.dataPublicacao) {
      updates.dataPublicacao = Timestamp.fromDate(
        new Date(dadosAtualizados.dataPublicacao)
      );
    }

    await updateDoc(escalaRef, updates);

    return {
      success: true,
      message: "Escala atualizada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar escala:", error);
    throw new Error(`Falha ao atualizar escala: ${error.message}`);
  }
};

export const publicarEscala = async (escalaId) => {
  return atualizarEscala(escalaId, {
    status: "publicada",
    publicada: true,
    dataPublicacao: new Date(),
  });
};

export const despublicarEscala = async (escalaId) => {
  return atualizarEscala(escalaId, {
    status: "rascunho",
    publicada: false,
    dataPublicacao: null,
  });
};

export const arquivarEscala = async (escalaId) => {
  return atualizarEscala(escalaId, {
    status: "arquivada",
  });
};

export const deletarEscala = async (escalaId) => {
  try {
    if (!db) {
      throw new Error("Firebase não inicializado");
    }

    const escalaRef = doc(db, COLLECTION_NAME, escalaId);
    await deleteDoc(escalaRef);

    return {
      success: true,
      message: "Escala deletada com sucesso",
    };
  } catch (error) {
    console.error("❌ Erro ao deletar escala:", {
      id: escalaId,
      error: error.message,
      code: error.code,
    });
    throw new Error(`Falha ao deletar escala: ${error.message}`);
  }
};

export const atualizarProfissionaisDia = async (
  escalaId,
  data,
  profissionaisDia
) => {
  try {
    const escala = await buscarEscalaPorId(escalaId);
    const profissionais = { ...escala.profissionais };
    profissionais[data] = profissionaisDia;

    return atualizarEscala(escalaId, { profissionais });
  } catch (error) {
    console.error("Erro ao atualizar profissionais do dia:", error);
    throw new Error(`Falha ao atualizar profissionais: ${error.message}`);
  }
};

function getMesNome(mes) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return meses[mes - 1] || mes;
}

export default {
  criarEscala,
  buscarEscalas,
  buscarEscalaMesAtual,
  buscarEscalaPorId,
  atualizarEscala,
  publicarEscala,
  despublicarEscala,
  arquivarEscala,
  deletarEscala,
  atualizarProfissionaisDia,
  TURNOS,
  DIAS_SEMANA,
};
