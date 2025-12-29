import { useState, useEffect, useCallback } from 'react';
import {
  buscarEventosPorMes,
  criarEvento,
  atualizarEvento,
  deletarEvento,
  marcarComoConcluido,
  desativarEvento,
} from '../services/calendarioService';

/**
 * Hook para gerenciar eventos do calendário
 * @param {number} mes - Mês (1-12)
 * @param {number} ano - Ano (ex: 2025)
 * @returns {Object} - Estado e funções para gerenciar eventos
 */
export function useEventos(mes, ano) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carrega eventos do mês especificado
   */
  const carregarEventos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const eventosData = await buscarEventosPorMes(ano, mes);

      setEventos(eventosData);
    } catch (err) {
      console.error('❌ [useEventos] Erro ao carregar eventos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [mes, ano]);

  /**
   * Cria um novo evento
   */
  const criar = useCallback(async (eventoData, userId) => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await criarEvento(eventoData, userId);

      await carregarEventos();
      return resultado;
    } catch (err) {
      console.error('❌ [useEventos] Erro ao criar evento:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [carregarEventos]);

  /**
   * Atualiza um evento existente
   */
  const atualizar = useCallback(async (eventoId, dadosAtualizados) => {
    try {
      setLoading(true);
      setError(null);
      await atualizarEvento(eventoId, dadosAtualizados);

      await carregarEventos();
    } catch (err) {
      console.error('❌ [useEventos] Erro ao atualizar evento:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [carregarEventos]);

  /**
   * Deleta um evento
   */
  const deletar = useCallback(async (eventoId) => {
    try {
      setLoading(true);
      setError(null);
      await deletarEvento(eventoId);

      await carregarEventos();
    } catch (err) {
      console.error('❌ [useEventos] Erro ao deletar evento:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [carregarEventos]);

  /**
   * Marca evento como concluído
   */
  const marcarConcluido = useCallback(async (eventoId) => {
    try {
      setLoading(true);
      setError(null);
      await marcarComoConcluido(eventoId);

      await carregarEventos();
    } catch (err) {
      console.error('❌ [useEventos] Erro ao marcar como concluído:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [carregarEventos]);

  /**
   * Desativa um evento (soft delete)
   */
  const desativar = useCallback(async (eventoId) => {
    try {
      setLoading(true);
      setError(null);
      await desativarEvento(eventoId);

      await carregarEventos();
    } catch (err) {
      console.error('❌ [useEventos] Erro ao desativar evento:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [carregarEventos]);

  /**
   * Recarrega eventos (alias para facilitar)
   */
  const recarregar = carregarEventos;

  // Carrega eventos automaticamente quando mes ou ano mudam
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
