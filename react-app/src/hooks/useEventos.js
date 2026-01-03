import { useState, useEffect, useCallback } from "react";
import {
  buscarEventosPorMes,
  criarEvento,
  atualizarEvento,
  deletarEvento,
  marcarComoConcluido,
  desativarEvento,
} from "../services/calendarioService";

export function useEventos(mes, ano) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarEventos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📅 [useEventos] Carregando eventos de ${mes}/${ano}...`);

      const eventosData = await buscarEventosPorMes(ano, mes);

      console.log(
        `✅ [useEventos] ${eventosData.length} eventos carregados:`,
        eventosData
      );
      setEventos(eventosData);
    } catch (err) {
      console.error("❌ [useEventos] Erro ao carregar eventos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [mes, ano]);

  const criar = useCallback(
    async (eventoData, userId) => {
      try {
        setLoading(true);
        setError(null);
        const resultado = await criarEvento(eventoData, userId);

        await carregarEventos();
        return resultado;
      } catch (err) {
        console.error("❌ [useEventos] Erro ao criar evento:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [carregarEventos]
  );

  const atualizar = useCallback(
    async (eventoId, dadosAtualizados) => {
      try {
        setLoading(true);
        setError(null);
        await atualizarEvento(eventoId, dadosAtualizados);

        await carregarEventos();
      } catch (err) {
        console.error("❌ [useEventos] Erro ao atualizar evento:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [carregarEventos]
  );

  const deletar = useCallback(
    async (eventoId) => {
      try {
        setLoading(true);
        setError(null);
        await deletarEvento(eventoId);

        await carregarEventos();
      } catch (err) {
        console.error("❌ [useEventos] Erro ao deletar evento:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [carregarEventos]
  );

  const marcarConcluido = useCallback(
    async (eventoId) => {
      try {
        setLoading(true);
        setError(null);
        await marcarComoConcluido(eventoId);

        await carregarEventos();
      } catch (err) {
        console.error("❌ [useEventos] Erro ao marcar como concluído:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [carregarEventos]
  );

  const desativar = useCallback(
    async (eventoId) => {
      try {
        setLoading(true);
        setError(null);
        await desativarEvento(eventoId);

        await carregarEventos();
      } catch (err) {
        console.error("❌ [useEventos] Erro ao desativar evento:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [carregarEventos]
  );

  const recarregar = carregarEventos;

  useEffect(() => {
    if (mes && ano) {
      carregarEventos();
    }
  }, [mes, ano, carregarEventos]);

  return {
    eventos,
    loading,
    error,
    criar,
    atualizar,
    deletar,
    marcarConcluido,
    desativar,
    recarregar,
    carregarEventos,
  };
}
