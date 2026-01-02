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
import { normalizarDataParaMidnight } from "../utils/dateUtils";

const COLLECTION_NAME = "calendario_eventos";

export const TIPOS_EVENTO = {
  REUNIAO: "reuniao",
  LEMBRETE: "lembrete",
  AGENDAMENTO: "agendamento",
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
        ? Timestamp.fromDate(normalizarDataParaMidnight(eventoData.dataInicio))
        : null,
      dataFim: eventoData.dataFim
        ? Timestamp.fromDate(normalizarDataParaMidnight(eventoData.dataFim))
        : null,
      horaInicio: eventoData.horaInicio || null,
      horaFim: eventoData.horaFim || null,

      participantes: Array.isArray(eventoData.participantes)
        ? eventoData.participantes
        : [],
      local: eventoData.local || null,
      ata: eventoData.ata || null,
      ataPDF: eventoData.ataPDF || null,
      ataPDFNome: eventoData.ataPDFNome || null,
      ataPDFCaminho: eventoData.ataPDFCaminho || null,

      lembrete: eventoData.lembrete || false,
      lembreteMinutos: eventoData.lembreteMinutos || null,
      lembreteEnviado: false,
      lembreteEnviadoEm: null,

      cor: eventoData.cor || getCor(eventoData.tipo),
      ativo: true,
      concluido: false,

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

export const buscarEventos = async (filtros = {}) => {
  try {
    console.log('📅 [buscarEventos] Iniciando busca com filtros:', filtros);

    const eventosRef = collection(db, COLLECTION_NAME);

    // Construir query base - aplicar filtros simples no Firestore
    const constraints = [];

    if (filtros.ativo !== undefined) {
      console.log(`📅 [buscarEventos] Filtrando por ativo: ${filtros.ativo}`);
      constraints.push(where("ativo", "==", filtros.ativo));
    }

    if (filtros.tipo) {
      console.log(`📅 [buscarEventos] Filtrando por tipo: ${filtros.tipo}`);
      constraints.push(where("tipo", "==", filtros.tipo));
    }

    // Adicionar orderBy no final
    constraints.push(orderBy("dataInicio", "desc"));

    const q = query(eventosRef, ...constraints);

    console.log('📅 [buscarEventos] Executando query no Firestore...');
    const snapshot = await getDocs(q);
    console.log(`📅 [buscarEventos] Query executada. ${snapshot.size} documentos retornados.`);

    let eventos = snapshot.docs.map((doc) => {
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

    // Aplicar filtro de data no cliente (evita necessidade de índice composto)
    if (filtros.dataInicio && filtros.dataFim) {
      const inicio = normalizarDataParaMidnight(filtros.dataInicio);
      const fim = normalizarDataParaMidnight(filtros.dataFim);
      console.log(`📅 [buscarEventos] Filtrando por data no cliente: ${inicio.toLocaleDateString()} até ${fim.toLocaleDateString()}`);

      eventos = eventos.filter(evento => {
        if (!evento.dataInicio) return false;
        const dataEvento = normalizarDataParaMidnight(evento.dataInicio);
        if (!dataEvento) return false;
        return dataEvento >= inicio && dataEvento <= fim;
      });
      console.log(`📅 [buscarEventos] ${eventos.length} eventos após filtro de data`);
    }

    console.log(`✅ [buscarEventos] ${eventos.length} eventos processados e retornados`);
    return eventos;
  } catch (error) {
    console.error("❌ [buscarEventos] Erro ao buscar eventos:", error);
    console.error("❌ [buscarEventos] Detalhes do erro:", {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw new Error(`Falha ao buscar eventos: ${error.message}`);
  }
};

export const buscarEventosPorMes = async (ano, mes) => {
  try {
    const primeiroDia = new Date(ano, mes - 1, 1);
    const ultimoDia = new Date(ano, mes, 0, 23, 59, 59);

    console.log(`📅 [calendarioService] Buscando eventos de ${mes}/${ano}`);
    console.log(`📅 [calendarioService] Período: ${primeiroDia.toLocaleDateString()} até ${ultimoDia.toLocaleDateString()}`);

    const eventos = await buscarEventos({
      ativo: true,
      dataInicio: primeiroDia,
      dataFim: ultimoDia,
    });

    console.log(`✅ [calendarioService] ${eventos.length} eventos encontrados no período`);
    return eventos;
  } catch (error) {
    console.error("❌ [calendarioService] Erro ao buscar eventos do mês:", error);
    return [];
  }
};

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

export const atualizarEvento = async (eventoId, dadosAtualizados) => {
  try {
    const eventoRef = doc(db, COLLECTION_NAME, eventoId);
    const updates = {
      atualizadoEm: serverTimestamp(),
    };

    // Atualizar apenas campos que foram fornecidos
    if (dadosAtualizados.titulo !== undefined) {
      updates.titulo = dadosAtualizados.titulo?.trim() || null;
    }
    if (dadosAtualizados.descricao !== undefined) {
      updates.descricao = dadosAtualizados.descricao?.trim() || null;
    }
    if (dadosAtualizados.tipo !== undefined) {
      updates.tipo = dadosAtualizados.tipo;
    }
    if (dadosAtualizados.dataInicio) {
      updates.dataInicio = Timestamp.fromDate(
        new Date(dadosAtualizados.dataInicio)
      );
    }
    if (dadosAtualizados.dataFim !== undefined) {
      if (dadosAtualizados.dataFim) {
        updates.dataFim = Timestamp.fromDate(new Date(dadosAtualizados.dataFim));
      } else {
        updates.dataFim = null;
      }
    }
    if (dadosAtualizados.horaInicio !== undefined) {
      updates.horaInicio = dadosAtualizados.horaInicio || null;
    }
    if (dadosAtualizados.horaFim !== undefined) {
      updates.horaFim = dadosAtualizados.horaFim || null;
    }
    if (dadosAtualizados.participantes !== undefined) {
      updates.participantes = Array.isArray(dadosAtualizados.participantes)
        ? dadosAtualizados.participantes
        : [];
    }
    if (dadosAtualizados.local !== undefined) {
      updates.local = dadosAtualizados.local || null;
    }
    if (dadosAtualizados.ata !== undefined) {
      updates.ata = dadosAtualizados.ata?.trim() || null;
    }
    if (dadosAtualizados.lembrete !== undefined) {
      updates.lembrete = dadosAtualizados.lembrete || false;
    }
    if (dadosAtualizados.lembreteMinutos !== undefined) {
      updates.lembreteMinutos = dadosAtualizados.lembreteMinutos || null;
    }
    if (dadosAtualizados.ativo !== undefined) {
      updates.ativo = dadosAtualizados.ativo;
    }
    if (dadosAtualizados.concluido !== undefined) {
      updates.concluido = dadosAtualizados.concluido;
    }

    const updatesSanitizado = sanitizeUndefined(updates);
    await updateDoc(eventoRef, updatesSanitizado);

    return {
      success: true,
      message: "Evento atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    throw new Error(`Falha ao atualizar evento: ${error.message}`);
  }
};

export const deletarEvento = async (eventoId) => {
  try {
    if (!db) {
      throw new Error("Firebase não inicializado");
    }

    const eventoRef = doc(db, COLLECTION_NAME, eventoId);
    await deleteDoc(eventoRef);

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

export const marcarComoConcluido = async (eventoId, concluido = true) => {
  return atualizarEvento(eventoId, { concluido });
};

export const desativarEvento = async (eventoId) => {
  return atualizarEvento(eventoId, { ativo: false });
};

export const ativarEvento = async (eventoId) => {
  return atualizarEvento(eventoId, { ativo: true });
};

function getCor(tipo) {
  const cores = {
    [TIPOS_EVENTO.REUNIAO]: "rgb(59 130 246 / 1)", // blue-500
    [TIPOS_EVENTO.LEMBRETE]: "rgb(139 92 246 / 1)", // purple-500
    [TIPOS_EVENTO.AGENDAMENTO]: "rgb(16 185 129 / 1)", // green-500
  };
  return cores[tipo] || "rgb(107 114 128 / 1)"; // gray-500 default
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
