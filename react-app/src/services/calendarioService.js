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

const COLLECTION_NAME = "calendario_eventos";

// Tipos de eventos
export const TIPOS_EVENTO = {
  REUNIAO: "reuniao",
  LEMBRETE: "lembrete",
  AGENDAMENTO: "agendamento",
};

// Sanitizar undefined para null
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

// Criar evento
export const criarEvento = async (eventoData, userId) => {
  try {
    if (!eventoData.titulo || !eventoData.tipo || !eventoData.dataInicio) {
      throw new Error("Título, tipo e data de início são obrigatórios");
    }

    const evento = {
      titulo: eventoData.titulo.trim(),
      descricao: eventoData.descricao?.trim() || null,
      tipo: eventoData.tipo,
      dataInicio: eventoData.dataInicio
        ? Timestamp.fromDate(new Date(eventoData.dataInicio))
        : null,
      dataFim: eventoData.dataFim
        ? Timestamp.fromDate(new Date(eventoData.dataFim))
        : null,
      horaInicio: eventoData.horaInicio || null,
      horaFim: eventoData.horaFim || null,

      // Campos específicos por tipo
      participantes: Array.isArray(eventoData.participantes)
        ? eventoData.participantes
        : [],
      local: eventoData.local || null,
      ata: eventoData.ata || null,
      ataPDF: eventoData.ataPDF || null,
      ataPDFNome: eventoData.ataPDFNome || null,
      ataPDFCaminho: eventoData.ataPDFCaminho || null,

      // Lembretes
      lembrete: eventoData.lembrete || false,
      lembreteMinutos: eventoData.lembreteMinutos || null,
      lembreteEnviado: false,

      // Controle
      cor: eventoData.cor || getCor(eventoData.tipo),
      ativo: true,
      concluido: false,

      // Auditoria
      criadoPor: userId,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    };

    const eventoSanitizado = sanitizeUndefined(evento);
    const eventosRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(eventosRef, eventoSanitizado);

    return {
      success: true,
      id: docRef.id,
      data: { id: docRef.id, ...evento },
    };
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    throw new Error(`Falha ao criar evento: ${error.message}`);
  }
};

// Buscar eventos
export const buscarEventos = async (filtros = {}) => {
  try {
    const eventosRef = collection(db, COLLECTION_NAME);
    let q = query(eventosRef, orderBy("dataInicio", "desc"));

    if (filtros.ativo !== undefined) {
      q = query(q, where("ativo", "==", filtros.ativo));
    }

    if (filtros.tipo) {
      q = query(q, where("tipo", "==", filtros.tipo));
    }

    if (filtros.dataInicio && filtros.dataFim) {
      q = query(
        q,
        where("dataInicio", ">=", Timestamp.fromDate(new Date(filtros.dataInicio))),
        where("dataInicio", "<=", Timestamp.fromDate(new Date(filtros.dataFim)))
      );
    }

    const snapshot = await getDocs(q);
    const eventos = snapshot.docs.map((doc) => {
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

    return eventos;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw new Error(`Falha ao buscar eventos: ${error.message}`);
  }
};

// Buscar eventos por mês
export const buscarEventosPorMes = async (ano, mes) => {
  try {
    const primeiroDia = new Date(ano, mes - 1, 1);
    const ultimoDia = new Date(ano, mes, 0, 23, 59, 59);

    return await buscarEventos({
      ativo: true,
      dataInicio: primeiroDia,
      dataFim: ultimoDia,
    });
  } catch (error) {
    console.error("Erro ao buscar eventos do mês:", error);
    return [];
  }
};

// Buscar evento por ID
export const buscarEventoPorId = async (eventoId) => {
  try {
    const eventoRef = doc(db, COLLECTION_NAME, eventoId);
    const eventoSnap = await getDoc(eventoRef);

    if (!eventoSnap.exists()) {
      throw new Error("Evento não encontrado");
    }

    const data = eventoSnap.data();
    return {
      id: eventoSnap.id,
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
    console.error("Erro ao buscar evento:", error);
    throw new Error(`Falha ao buscar evento: ${error.message}`);
  }
};

// Atualizar evento
export const atualizarEvento = async (eventoId, dadosAtualizados) => {
  try {
    const eventoRef = doc(db, COLLECTION_NAME, eventoId);
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

    await updateDoc(eventoRef, updates);

    return {
      success: true,
      message: "Evento atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    throw new Error(`Falha ao atualizar evento: ${error.message}`);
  }
};

// Deletar evento
export const deletarEvento = async (eventoId) => {
  try {
    if (!db) {
      throw new Error("Firebase não inicializado");
    }

    const eventoRef = doc(db, COLLECTION_NAME, eventoId);
    await deleteDoc(eventoRef);

    console.log("✅ Evento deletado com sucesso:", eventoId);
    return {
      success: true,
      message: "Evento deletado com sucesso",
    };
  } catch (error) {
    console.error("❌ Erro ao deletar evento:", {
      id: eventoId,
      error: error.message,
      code: error.code,
    });
    throw new Error(`Falha ao deletar evento: ${error.message}`);
  }
};

// Marcar como concluído
export const marcarComoConcluido = async (eventoId, concluido = true) => {
  return atualizarEvento(eventoId, { concluido });
};

// Desativar evento
export const desativarEvento = async (eventoId) => {
  return atualizarEvento(eventoId, { ativo: false });
};

// Ativar evento
export const ativarEvento = async (eventoId) => {
  return atualizarEvento(eventoId, { ativo: true });
};

// Obter cor por tipo
function getCor(tipo) {
  const cores = {
    [TIPOS_EVENTO.REUNIAO]: "#3b82f6", // blue
    [TIPOS_EVENTO.LEMBRETE]: "#8b5cf6", // purple
    [TIPOS_EVENTO.AGENDAMENTO]: "#10b981", // green
  };
  return cores[tipo] || "#6b7280"; // gray default
}

export default {
  criarEvento,
  buscarEventos,
  buscarEventosPorMes,
  buscarEventoPorId,
  atualizarEvento,
  deletarEvento,
  marcarComoConcluido,
  desativarEvento,
  ativarEvento,
  TIPOS_EVENTO,
};
