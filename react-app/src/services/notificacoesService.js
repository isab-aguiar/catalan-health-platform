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
  limit,
  Timestamp,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "notificacoes";

// Tipos de notificações
export const TIPOS_NOTIFICACAO = {
  LEMBRETE: "lembrete",
  REUNIAO: "reuniao",
  SISTEMA: "sistema",
  ALERTA: "alerta",
};

// Criar notificação
export const criarNotificacao = async (notificacaoData) => {
  try {
    const notificacao = {
      tipo: notificacaoData.tipo || TIPOS_NOTIFICACAO.SISTEMA,
      titulo: notificacaoData.titulo,
      mensagem: notificacaoData.mensagem || "",
      link: notificacaoData.link || null,
      eventoId: notificacaoData.eventoId || null,

      // Destinatários
      userId: notificacaoData.userId || null, // null = para todos
      lida: false,

      // Timestamps
      criadoEm: serverTimestamp(),
      lidaEm: null,
    };

    const notificacoesRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(notificacoesRef, notificacao);

    return {
      success: true,
      id: docRef.id,
      data: { id: docRef.id, ...notificacao },
    };
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    throw new Error(`Falha ao criar notificação: ${error.message}`);
  }
};

// Buscar notificações do usuário
export const buscarNotificacoesUsuario = async (userId, filtros = {}) => {
  try {
    const notificacoesRef = collection(db, COLLECTION_NAME);

    // Buscar notificações específicas do usuário OU globais (userId === null)
    let q = query(
      notificacoesRef,
      orderBy("criadoEm", "desc")
    );

    // Filtrar apenas não lidas se solicitado
    if (filtros.apenasNaoLidas) {
      q = query(q, where("lida", "==", false));
    }

    // Limitar quantidade
    if (filtros.limite) {
      q = query(q, limit(filtros.limite));
    }

    const snapshot = await getDocs(q);
    const notificacoes = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          criadoEm: data.criadoEm?.toDate
            ? data.criadoEm.toDate()
            : data.criadoEm
              ? new Date(data.criadoEm)
              : null,
          lidaEm: data.lidaEm?.toDate
            ? data.lidaEm.toDate()
            : data.lidaEm
              ? new Date(data.lidaEm)
              : null,
        };
      })
      // Filtrar: mostrar se é para o usuário específico OU se é global
      .filter(n => n.userId === userId || n.userId === null);

    return notificacoes;
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    throw new Error(`Falha ao buscar notificações: ${error.message}`);
  }
};

// Buscar notificações recentes (últimas 10)
export const buscarNotificacoesRecentes = async (userId) => {
  return buscarNotificacoesUsuario(userId, { limite: 10 });
};

// Contar notificações não lidas
export const contarNaoLidas = async (userId) => {
  try {
    const notificacoes = await buscarNotificacoesUsuario(userId, { apenasNaoLidas: true });
    return notificacoes.length;
  } catch (error) {
    console.error("Erro ao contar não lidas:", error);
    return 0;
  }
};

// Marcar como lida
export const marcarComoLida = async (notificacaoId) => {
  try {
    const notificacaoRef = doc(db, COLLECTION_NAME, notificacaoId);
    await updateDoc(notificacaoRef, {
      lida: true,
      lidaEm: serverTimestamp(),
    });

    return {
      success: true,
      message: "Notificação marcada como lida",
    };
  } catch (error) {
    console.error("Erro ao marcar como lida:", error);
    throw new Error(`Falha ao marcar como lida: ${error.message}`);
  }
};

// Marcar todas como lidas
export const marcarTodasComoLidas = async (userId) => {
  try {
    const notificacoes = await buscarNotificacoesUsuario(userId, { apenasNaoLidas: true });

    const batch = writeBatch(db);
    notificacoes.forEach((notif) => {
      const notifRef = doc(db, COLLECTION_NAME, notif.id);
      batch.update(notifRef, {
        lida: true,
        lidaEm: serverTimestamp(),
      });
    });

    await batch.commit();

    return {
      success: true,
      message: `${notificacoes.length} notificações marcadas como lidas`,
    };
  } catch (error) {
    console.error("Erro ao marcar todas como lidas:", error);
    throw new Error(`Falha ao marcar todas como lidas: ${error.message}`);
  }
};

// Deletar notificação
export const deletarNotificacao = async (notificacaoId) => {
  try {
    const notificacaoRef = doc(db, COLLECTION_NAME, notificacaoId);
    await deleteDoc(notificacaoRef);

    return {
      success: true,
      message: "Notificação deletada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao deletar notificação:", error);
    throw new Error(`Falha ao deletar notificação: ${error.message}`);
  }
};

// Limpar todas as notificações lidas
export const limparLidas = async (userId) => {
  try {
    const notificacoes = await buscarNotificacoesUsuario(userId);
    const lidas = notificacoes.filter(n => n.lida);

    const batch = writeBatch(db);
    lidas.forEach((notif) => {
      const notifRef = doc(db, COLLECTION_NAME, notif.id);
      batch.delete(notifRef);
    });

    await batch.commit();

    return {
      success: true,
      message: `${lidas.length} notificações limpas`,
    };
  } catch (error) {
    console.error("Erro ao limpar lidas:", error);
    throw new Error(`Falha ao limpar lidas: ${error.message}`);
  }
};

// Criar notificação de lembrete de evento
export const criarNotificacaoLembrete = async (evento, userId = null) => {
  const dataEvento = new Date(evento.dataInicio);
  const dataFormatada = dataEvento.toLocaleDateString('pt-BR');
  const horaFormatada = evento.horaInicio || "não definido";

  return criarNotificacao({
    tipo: TIPOS_NOTIFICACAO.LEMBRETE,
    titulo: `Lembrete: ${evento.titulo}`,
    mensagem: `${evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)} agendado(a) para ${dataFormatada} às ${horaFormatada}`,
    link: `/admin/calendario`,
    eventoId: evento.id,
    userId,
  });
};

export default {
  criarNotificacao,
  buscarNotificacoesUsuario,
  buscarNotificacoesRecentes,
  contarNaoLidas,
  marcarComoLida,
  marcarTodasComoLidas,
  deletarNotificacao,
  limparLidas,
  criarNotificacaoLembrete,
  TIPOS_NOTIFICACAO,
};
