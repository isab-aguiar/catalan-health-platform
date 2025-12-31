/**
 * Serviço de Notificações para Eventos do Calendário
 * Gerencia notificações do navegador para lembretes de eventos
 */

import { atualizarEvento } from './calendarioService';
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
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

let permissaoConcedida = null;
let intervalId = null;

/**
 * Solicita permissão para exibir notificações
 */
export async function solicitarPermissaoNotificacoes() {
  if (!("Notification" in window)) {
    console.warn("Este navegador não suporta notificações");
    return false;
  }

  if (Notification.permission === "granted") {
    permissaoConcedida = true;
    return true;
  }

  if (Notification.permission === "denied") {
    permissaoConcedida = false;
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    permissaoConcedida = permission === "granted";
    return permissaoConcedida;
  } catch (error) {
    console.error("Erro ao solicitar permissão de notificações:", error);
    permissaoConcedida = false;
    return false;
  }
}

/**
 * Exibe uma notificação
 */
export function exibirNotificacao(titulo, opcoes = {}) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return null;
  }

  const notificacao = new Notification(titulo, {
    icon: "/logo-favicon.png",
    badge: "/logo-favicon.png",
    tag: opcoes.tag || "calendario-evento",
    requireInteraction: opcoes.requireInteraction || false,
    ...opcoes,
  });

  notificacao.onclick = () => {
    window.focus();
    notificacao.close();
    if (opcoes.onClick) {
      opcoes.onClick();
    }
  };

  return notificacao;
}

/**
 * Marca uma notificação como enviada no banco de dados
 */
async function marcarNotificacaoEnviada(eventoId) {
  try {
    await atualizarEvento(eventoId, {
      lembreteEnviado: true,
      lembreteEnviadoEm: new Date()
    });
    console.log(`✅ Notificação marcada como enviada para evento ${eventoId}`);
    return true;
  } catch (error) {
    console.error('Erro ao marcar notificação como enviada:', error);
    return false;
  }
}

/**
 * Calcula quando uma notificação deve ser enviada baseado no evento
 */
function calcularHorarioNotificacao(evento) {
  if (!evento.dataInicio || !evento.lembrete || !evento.lembreteMinutos) {
    return null;
  }

  const dataEvento = evento.dataInicio instanceof Date
    ? evento.dataInicio
    : new Date(evento.dataInicio);

  // Se o evento tem horário, usar o horário; senão, usar início do dia
  let horaEvento = dataEvento;
  if (evento.horaInicio) {
    const [hora, minuto] = evento.horaInicio.split(":").map(Number);
    horaEvento = new Date(dataEvento);
    horaEvento.setHours(hora, minuto, 0, 0);
  }

  // Subtrair os minutos de antecedência
  const horarioNotificacao = new Date(
    horaEvento.getTime() - evento.lembreteMinutos * 60 * 1000
  );

  return horarioNotificacao;
}

/**
 * Agenda uma notificação para um evento
 */
export function agendarNotificacaoEvento(evento) {
  if (!evento.lembrete || !evento.lembreteMinutos) {
    return null;
  }

  const horarioNotificacao = calcularHorarioNotificacao(evento);
  if (!horarioNotificacao) {
    return null;
  }

  const agora = new Date();
  const tempoRestante = horarioNotificacao.getTime() - agora.getTime();

  // Se já passou o horário, não agendar
  if (tempoRestante <= 0) {
    return null;
  }

  // Se for muito no futuro (> 1 dia), agendar com setTimeout (limitado a ~24 dias)
  if (tempoRestante <= 24 * 60 * 60 * 1000) {
    return setTimeout(async () => {
      const tipoLabel = {
        reuniao: "Reunião",
        lembrete: "Lembrete",
        agendamento: "Agendamento",
      }[evento.tipo] || "Evento";

      let mensagem = `${tipoLabel}: ${evento.titulo}`;
      if (evento.local) {
        mensagem += `\nLocal: ${evento.local}`;
      }
      if (evento.horaInicio) {
        mensagem += `\nHorário: ${evento.horaInicio}`;
      }

      exibirNotificacao(evento.titulo, {
        body: mensagem,
        tag: `evento-${evento.id}`,
        requireInteraction: true,
      });

      // Marcar como enviado no banco de dados
      await marcarNotificacaoEnviada(evento.id);
    }, tempoRestante);
  }

  return null;
}

/**
 * Verifica eventos que precisam de notificação e agenda
 */
export async function verificarEAgendarNotificacoes(eventos) {
  if (Notification.permission !== "granted") {
    return;
  }

  // Limpar notificações anteriores
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Agendar notificações para eventos futuros
  eventos.forEach((evento) => {
    if (evento.lembrete && !evento.lembreteEnviado && evento.ativo && !evento.concluido) {
      agendarNotificacaoEvento(evento);
    }
  });

  // Verificar a cada minuto se há eventos que precisam de notificação
  intervalId = setInterval(() => {
    eventos.forEach(async (evento) => {
      if (evento.lembrete && !evento.lembreteEnviado && evento.ativo && !evento.concluido) {
        const horarioNotificacao = calcularHorarioNotificacao(evento);
        if (horarioNotificacao) {
          const agora = new Date();
          const tempoRestante = horarioNotificacao.getTime() - agora.getTime();

          // Se está no momento certo (dentro de 1 minuto antes)
          if (tempoRestante > 0 && tempoRestante <= 60 * 1000) {
            const tipoLabel = {
              reuniao: "Reunião",
              lembrete: "Lembrete",
              agendamento: "Agendamento",
            }[evento.tipo] || "Evento";

            let mensagem = `${tipoLabel}: ${evento.titulo}`;
            if (evento.local) {
              mensagem += `\nLocal: ${evento.local}`;
            }
            if (evento.horaInicio) {
              mensagem += `\nHorário: ${evento.horaInicio}`;
            }

            exibirNotificacao(evento.titulo, {
              body: mensagem,
              tag: `evento-${evento.id}`,
              requireInteraction: true,
            });

            // Marcar como enviado no banco de dados
            await marcarNotificacaoEnviada(evento.id);
          }
        }
      }
    });
  }, 60 * 1000); // Verificar a cada minuto
}

/**
 * Para todas as notificações agendadas
 */
export function pararVerificacaoNotificacoes() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

/**
 * Inicializa o sistema de notificações
 */
export async function inicializarNotificacoes(eventos = []) {
  const permissao = await solicitarPermissaoNotificacoes();
  if (permissao) {
    await verificarEAgendarNotificacoes(eventos);
  }
  return permissao;
}

// Funções do sistema de notificações persistentes
const NOTIFICACOES_COLLECTION = 'notificacoes';

export const TIPOS_NOTIFICACAO = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  LEMBRETE: 'lembrete',
  REUNIAO: 'reuniao',
  ALERTA: 'alerta',
  SISTEMA: 'sistema'
};

/**
 * Criar notificação no banco de dados
 */
export async function criarNotificacao(dadosNotificacao) {
  try {
    const notificacao = {
      userId: dadosNotificacao.userId,
      tipo: dadosNotificacao.tipo || TIPOS_NOTIFICACAO.INFO,
      titulo: dadosNotificacao.titulo,
      mensagem: dadosNotificacao.mensagem || '',
      link: dadosNotificacao.link || null,
      lida: false,
      eventoId: dadosNotificacao.eventoId || null,
      criadoEm: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, NOTIFICACOES_COLLECTION), notificacao);
    
    console.log('✅ Notificação criada:', docRef.id);
    
    return {
      id: docRef.id,
      ...notificacao
    };
  } catch (error) {
    console.error('❌ Erro ao criar notificação:', error);
    throw error;
  }
}

/**
 * Buscar notificações recentes de um usuário
 */
export async function buscarNotificacoesRecentes(uid, limite = 10) {
  try {
    const q = query(
      collection(db, NOTIFICACOES_COLLECTION),
      where('userId', '==', uid),
      orderBy('criadoEm', 'desc'),
      limit(limite)
    );
    
    const snapshot = await getDocs(q);
    const notificacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      criadoEm: doc.data().criadoEm?.toDate() || null
    }));
    
    return notificacoes;
  } catch (error) {
    console.error('❌ Erro ao buscar notificações recentes:', error);
    return [];
  }
}

/**
 * Buscar todas as notificações de um usuário
 */
export async function buscarNotificacoesUsuario(uid) {
  try {
    const q = query(
      collection(db, NOTIFICACOES_COLLECTION),
      where('userId', '==', uid),
      orderBy('criadoEm', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const notificacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      criadoEm: doc.data().criadoEm?.toDate() || null
    }));
    
    return notificacoes;
  } catch (error) {
    console.error('❌ Erro ao buscar notificações do usuário:', error);
    return [];
  }
}

/**
 * Contar notificações não lidas
 */
export async function contarNaoLidas(uid) {
  try {
    const q = query(
      collection(db, NOTIFICACOES_COLLECTION),
      where('userId', '==', uid),
      where('lida', '==', false)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('❌ Erro ao contar notificações não lidas:', error);
    return 0;
  }
}

/**
 * Marcar notificação como lida
 */
export async function marcarComoLida(notificacaoId, uid) {
  try {
    const notifRef = doc(db, NOTIFICACOES_COLLECTION, notificacaoId);
    await updateDoc(notifRef, {
      lida: true,
      lidaEm: serverTimestamp()
    });
    
    console.log('✅ Notificação marcada como lida:', notificacaoId);
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao marcar notificação como lida:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Marcar todas as notificações como lidas
 */
export async function marcarTodasComoLidas(uid) {
  try {
    const q = query(
      collection(db, NOTIFICACOES_COLLECTION),
      where('userId', '==', uid),
      where('lida', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const promises = snapshot.docs.map(documento => 
      updateDoc(doc(db, NOTIFICACOES_COLLECTION, documento.id), {
        lida: true,
        lidaEm: serverTimestamp()
      })
    );
    
    await Promise.all(promises);
    
    console.log(`✅ ${promises.length} notificações marcadas como lidas`);
    return { success: true, count: promises.length };
  } catch (error) {
    console.error('❌ Erro ao marcar todas como lidas:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Deletar notificação
 */
export async function deletarNotificacao(notificacaoId, uid) {
  try {
    await deleteDoc(doc(db, NOTIFICACOES_COLLECTION, notificacaoId));
    
    console.log('✅ Notificação deletada:', notificacaoId);
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao deletar notificação:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Limpar notificações lidas
 */
export async function limparLidas(uid) {
  try {
    const q = query(
      collection(db, NOTIFICACOES_COLLECTION),
      where('userId', '==', uid),
      where('lida', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const promises = snapshot.docs.map(documento => 
      deleteDoc(doc(db, NOTIFICACOES_COLLECTION, documento.id))
    );
    
    await Promise.all(promises);
    
    console.log(`✅ ${promises.length} notificações lidas removidas`);
    return { success: true, count: promises.length };
  } catch (error) {
    console.error('❌ Erro ao limpar notificações lidas:', error);
    return { success: false, error: error.message };
  }
}