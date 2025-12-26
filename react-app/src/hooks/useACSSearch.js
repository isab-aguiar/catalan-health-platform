import { useMemo, useState } from 'react';
import { streetsIndex } from '../data/microareas.js';
import { normalize, removeStreetPrefix } from '../utils/normalize.js';
import { extractNumber, isNumberInRange } from '../utils/numberValidator.js';
import { useDebounce } from './useDebounce.js';

export function useACSSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const results = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const normalized = normalize(debouncedQuery);
    const number = extractNumber(debouncedQuery);
    const searchTerm = removeStreetPrefix(
      normalized.replace(/\d+/g, '').trim()
    );
    const matches = streetsIndex.filter((entry) => {
      if (!entry.streetNormalized.includes(searchTerm)) return false;
      if (number && !isNumberInRange(number, entry.rangeData)) {
        return false;
      }
      return true;
    });
    matches.sort((a, b) => {
      const aStarts = a.streetNormalized.startsWith(searchTerm);
      const bStarts = b.streetNormalized.startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.street.localeCompare(b.street);
    });
    return matches.slice(0, 8);
  }, [debouncedQuery]);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const normalized = normalize(query);
    const number = extractNumber(query);
    const searchTerm = removeStreetPrefix(
      normalized.replace(/\d+/g, '').trim()
    );
    const matches = streetsIndex.filter((entry) => {
      if (!entry.streetNormalized.includes(searchTerm)) return false;
      if (number && !isNumberInRange(number, entry.rangeData)) {
        return false;
      }
      return true;
    });
    const seen = new Set();
    const unique = matches.filter((item) => {
      const key = `${item.street}|${item.esf}|${item.microarea}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    unique.sort((a, b) => {
      const aStarts = a.streetNormalized.startsWith(searchTerm);
      const bStarts = b.streetNormalized.startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.street.localeCompare(b.street);
    });
    return unique.slice(0, 8);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    isSearching: query !== debouncedQuery,
    hasResults: results.length > 0,
    hasSuggestions: suggestions.length > 0,
  };
}

export function useACSByESF(esfFilter = null) {
  return useMemo(() => {
    const acsMap = new Map();
    streetsIndex.forEach((entry) => {
      if (esfFilter && entry.esf !== esfFilter) return;
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
          streets: [],
        });
      }
      const acsData = acsMap.get(entry.acs);
      acsData.streets.push({
        name: entry.street,
        numberRange: entry.numberRange,
      });
    });
    return Array.from(acsMap.values());
  }, [esfFilter]);
}

export function useESFList() {
  return useMemo(() => {
    const esfs = new Set();
    streetsIndex.forEach((entry) => esfs.add(entry.esf));
    return Array.from(esfs).sort();
  }, []);
}
