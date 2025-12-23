import { useState, useMemo } from 'react';
import { streetsIndex } from '../data/microareas.js';
import { normalize, removeStreetPrefix } from '../utils/normalize.js';
import { isNumberInRange, extractNumber } from '../utils/numberValidator.js';
import { useDebounce } from './useDebounce.js';

/**
 * Hook personalizado para busca de ACS (Agentes Comunitários de Saúde)
 * Implementa a mesma lógica do smart_search.js original
 *
 * Features:
 * - Debounce de 300ms (mesmo do original)
 * - Busca por nome de rua (normalizada, sem acentos)
 * - Validação de número de endereço contra ranges complexos
 * - Retorna até 8 resultados (mesmo limite do original)
 *
 * @returns {object} { query, setQuery, results, isSearching, suggestions }
 *
 * @example
 * const { query, setQuery, results } = useACSSearch();
 *
 * <input value={query} onChange={(e) => setQuery(e.target.value)} />
 * {results.map(result => <div>{result.street}</div>)}
 */
export function useACSSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  // Compute search results
  const results = useMemo(() => {
    if (debouncedQuery.length < 2) return [];

    const normalized = normalize(debouncedQuery);
    const number = extractNumber(debouncedQuery);

    // Remove número da busca de rua e normaliza prefixos
    const searchTerm = removeStreetPrefix(
      normalized.replace(/\d+/g, '').trim()
    );

    // Filtrar ruas
    const matches = streetsIndex.filter(entry => {
      // Match street name (must contain search term)
      if (!entry.streetNormalized.includes(searchTerm)) return false;

      // Se tem número, validar contra o range
      if (number && !isNumberInRange(number, entry.rangeData)) {
        return false;
      }

      return true;
    });

    // Ordenar por relevância (ruas que começam com o termo primeiro)
    matches.sort((a, b) => {
      const aStarts = a.streetNormalized.startsWith(searchTerm);
      const bStarts = b.streetNormalized.startsWith(searchTerm);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Se ambos começam ou nenhum começa, ordenar alfabeticamente
      return a.street.localeCompare(b.street);
    });

    // Limitar a 8 resultados (mesmo limite do original)
    return matches.slice(0, 8);
  }, [debouncedQuery]);

  // Compute autocomplete suggestions (para dropdown)
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];

    const normalized = normalize(query);
    const number = extractNumber(query);
    const searchTerm = removeStreetPrefix(
      normalized.replace(/\d+/g, '').trim()
    );

    const matches = streetsIndex.filter(entry => {
      if (!entry.streetNormalized.includes(searchTerm)) return false;

      // Validar número se presente
      if (number && !isNumberInRange(number, entry.rangeData)) {
        return false;
      }

      return true;
    });

    // Remove duplicatas (mesma rua pode aparecer em múltiplas microáreas)
    const seen = new Set();
    const unique = matches.filter(item => {
      const key = `${item.street}|${item.esf}|${item.microarea}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Ordenar por relevância
    unique.sort((a, b) => {
      const aStarts = a.streetNormalized.startsWith(searchTerm);
      const bStarts = b.streetNormalized.startsWith(searchTerm);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.street.localeCompare(b.street);
    });

    return unique.slice(0, 8);
  }, [query]); // Não usa debounce para suggestions (instant feedback)

  return {
    query,
    setQuery,
    results,
    suggestions,
    isSearching: query !== debouncedQuery, // true enquanto está debouncing
    hasResults: results.length > 0,
    hasSuggestions: suggestions.length > 0,
  };
}

/**
 * Hook para filtrar ACS por ESF (Equipe de Saúde da Família)
 * @param {string|null} esfFilter - Nome da ESF para filtrar (null = todas)
 * @returns {Array} Lista de ACS únicos
 */
export function useACSByESF(esfFilter = null) {
  return useMemo(() => {
    const acsMap = new Map();

    streetsIndex.forEach(entry => {
      // Filtrar por ESF se especificado
      if (esfFilter && entry.esf !== esfFilter) return;

      // Usar ACS name como chave única
      if (!acsMap.has(entry.acs)) {
        acsMap.set(entry.acs, {
          name: entry.acs,
          esf: entry.esf,
          microarea: entry.microarea,
          medico: entry.medico,
          enfermeira: entry.enfermeira,
          dentista: entry.dentista,
          asb: entry.asb,
          observacao: entry.observacao,
          // Agregar todas as ruas deste ACS
          streets: []
        });
      }

      // Adicionar rua ao ACS
      const acsData = acsMap.get(entry.acs);
      acsData.streets.push({
        name: entry.street,
        numberRange: entry.numberRange
      });
    });

    return Array.from(acsMap.values());
  }, [esfFilter]);
}

/**
 * Hook para obter lista de ESFs únicas
 * @returns {Array<string>} Lista de nomes de ESFs
 */
export function useESFList() {
  return useMemo(() => {
    const esfs = new Set();
    streetsIndex.forEach(entry => esfs.add(entry.esf));
    return Array.from(esfs).sort();
  }, []);
}
