// ============================================
// ARQUIVO: useAgendas.js
// Hook customizado para gerenciar agendas semanais
// ============================================

import { useState, useEffect, useCallback } from 'react';
import {
  buscarTodasAgendas,
  buscarAgendasPorCategoria,
  criarAgenda,
  atualizarAgenda,
  deletarAgenda,
  agruparAgendasPorCategoria
} from '../services/agendasService';

export function useAgendas(categoria = null) {
  const [agendas, setAgendas] = useState([]);
  const [agendasAgrupadas, setAgendasAgrupadas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Carregar agendas
   */
  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📋 [useAgendas] Carregando agendas...');

      let resultado;
      if (categoria) {
        console.log(`📋 [useAgendas] Filtrando por categoria: ${categoria}`);
        resultado = await buscarAgendasPorCategoria(categoria);
      } else {
        resultado = await buscarTodasAgendas();
      }

      console.log(`✅ [useAgendas] ${resultado.length} agendas carregadas:`, resultado);
      setAgendas(resultado);

      // Agrupar por categoria
      const agrupadas = agruparAgendasPorCategoria(resultado);
      console.log('📊 [useAgendas] Agendas agrupadas:', agrupadas);
      setAgendasAgrupadas(agrupadas);
    } catch (err) {
      console.error('❌ [useAgendas] Erro ao carregar agendas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoria]);

  /**
   * Criar nova agenda
   */
  const criar = useCallback(async (dadosAgenda) => {
    try {
      const novaAgenda = await criarAgenda(dadosAgenda);
      await carregar(); // Recarregar lista
      return novaAgenda;
    } catch (err) {
      console.error('Erro ao criar agenda:', err);
      throw err;
    }
  }, [carregar]);

  /**
   * Atualizar agenda existente
   */
  const atualizar = useCallback(async (id, dadosAtualizados) => {
    try {
      const agendaAtualizada = await atualizarAgenda(id, dadosAtualizados);
      await carregar(); // Recarregar lista
      return agendaAtualizada;
    } catch (err) {
      console.error('Erro ao atualizar agenda:', err);
      throw err;
    }
  }, [carregar]);

  /**
   * Deletar agenda
   */
  const deletar = useCallback(async (id) => {
    try {
      await deletarAgenda(id);
      await carregar(); // Recarregar lista
      return true;
    } catch (err) {
      console.error('Erro ao deletar agenda:', err);
      throw err;
    }
  }, [carregar]);

  /**
   * Recarregar agendas
   */
  const recarregar = useCallback(() => {
    return carregar();
  }, [carregar]);

  // Carregar agendas ao montar o componente
  useEffect(() => {
    carregar();
  }, [carregar]);

  return {
    agendas,
    agendasAgrupadas,
    loading,
    error,
    criar,
    atualizar,
    deletar,
    recarregar
  };
}
