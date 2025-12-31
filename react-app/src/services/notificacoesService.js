/**
 * Serviço de Notificações para Eventos do Calendário
 * Gerencia notificações do navegador para lembretes de eventos
 */

import { atualizarEvento } from './calendarioService';

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

// Funções stubs para compatibilidade com NotificationBell e Notificacoes (não implementadas ainda)
export const TIPOS_NOTIFICACAO = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  LEMBRETE: 'lembrete',
  REUNIAO: 'reuniao',
  ALERTA: 'alerta',
};

export async function buscarNotificacoesRecentes(uid, limite = 10) {
  // TODO: Implementar busca de notificações do sistema
  return [];
}

export async function buscarNotificacoesUsuario(uid) {
  // TODO: Implementar busca de notificações do usuário
  return [];
}

export async function contarNaoLidas(uid) {
  // TODO: Implementar contagem de notificações não lidas
  return 0;
}

export async function marcarComoLida(notificacaoId, uid) {
  // TODO: Implementar marcação de notificação como lida
  return { success: true };
}

export async function marcarTodasComoLidas(uid) {
  // TODO: Implementar marcação de todas as notificações como lidas
  return { success: true };
}

export async function deletarNotificacao(notificacaoId, uid) {
  // TODO: Implementar deleção de notificação
  return { success: true };
}

export async function limparLidas(uid) {
  // TODO: Implementar limpeza de notificações lidas
  return { success: true };
}