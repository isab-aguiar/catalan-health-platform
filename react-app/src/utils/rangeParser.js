/**
 * Parser de ranges de números de endereços
 * Lida com formatos complexos do sistema de microáreas
 *
 * Formatos suportados:
 * - "01 até 130" → range simples
 * - "20 até 168 (somente lado par)" → range com filtro par
 * - "135, 137, 169, 227..." → lista específica de números
 * - "ímpar 11 até 225 / par 40 até 170" → ranges separados para par/ímpar
 * - "2 até 210 somente par (+ 129, 139)" → range com exceções
 * - "200 até 540 (somente PAR)" → variações de escrita
 * - "apenas) / par 40 até 170"  → split ranges
 * - "1550 (apenas)" → número único
 * - "830 e 860" → dois números específicos
 * - "exceto: 2220, 2190..." → range com exclusões
 */

export function parseNumberRange(rangeStr) {
  if (!rangeStr) {
    return { type: 'any', raw: rangeStr };
  }

  const result = {
    raw: rangeStr,
    type: null,
    min: null,
    max: null,
    filter: null,      // 'even', 'odd', or null
    numbers: null,     // Array para listas específicas
    exceptions: null,  // Array de números excluídos
    additional: null,  // Array de números adicionais (quando tem "+")
    odd: null,         // Range para ímpares (em split ranges)
    even: null         // Range para pares (em split ranges)
  };

  const normalized = rangeStr.toLowerCase();

  // Detectar filtro par/ímpar (antes de processar ranges)
  if (normalized.includes('somente par') ||
      normalized.includes('somente lado par') ||
      normalized.includes('somente pares')) {
    result.filter = 'even';
  }

  if (normalized.includes('somente ímpar') ||
      normalized.includes('somente lado ímpar') ||
      normalized.includes('somente ímpares')) {
    result.filter = 'odd';
  }

  // Handle split ranges (ímpar X até Y / par A até B)
  if (normalized.includes('ímpar') && normalized.includes('par') && normalized.includes('/')) {
    result.type = 'split';

    const parts = normalized.split('/');

    // Parse odd range
    const oddPart = parts.find(p => p.includes('ímpar'));
    if (oddPart) {
      const oddMatch = oddPart.match(/(\d+)\s*até\s*(\d+)/);
      if (oddMatch) {
        result.odd = {
          min: parseInt(oddMatch[1]),
          max: parseInt(oddMatch[2])
        };
      }
    }

    // Parse even range
    const evenPart = parts.find(p => p.includes('par'));
    if (evenPart) {
      const evenMatch = evenPart.match(/(\d+)\s*até\s*(\d+)/);
      if (evenMatch) {
        result.even = {
          min: parseInt(evenMatch[1]),
          max: parseInt(evenMatch[2])
        };
      }
    }

    return result;
  }

  // Handle "apenas" (only specific number)
  if (normalized.includes('apenas')) {
    const numberMatch = normalized.match(/(\d+)/);
    if (numberMatch) {
      result.type = 'list';
      result.numbers = [parseInt(numberMatch[1])];
      return result;
    }
  }

  // Handle "e" for two numbers (e.g., "830 e 860")
  if (normalized.match(/\d+\s+e\s+\d+/)) {
    const numbers = normalized.match(/\d+/g);
    if (numbers) {
      result.type = 'list';
      result.numbers = numbers.map(n => parseInt(n));
      return result;
    }
  }

  // Handle exceptions (exceto: X, Y, Z)
  if (normalized.includes('exceto')) {
    const exceptPart = normalized.split('exceto')[1];
    if (exceptPart) {
      const exceptNumbers = exceptPart.match(/\d+/g);
      if (exceptNumbers) {
        result.exceptions = exceptNumbers.map(n => parseInt(n));
      }
    }
  }

  // Handle additional numbers with "+"
  if (normalized.includes('+')) {
    const parts = normalized.split('+');

    // Parse additional numbers from second part
    const additionalPart = parts[parts.length - 1];
    const additionalNumbers = additionalPart.match(/\d+/g);
    if (additionalNumbers) {
      result.additional = additionalNumbers.map(n => parseInt(n));
    }

    // Continue processing first part for main range
    const mainPart = parts[0];
    const mainRangeMatch = mainPart.match(/(\d+)\s*até\s*(\d+)/);
    if (mainRangeMatch) {
      result.type = 'range';
      result.min = parseInt(mainRangeMatch[1]);
      result.max = parseInt(mainRangeMatch[2]);
      return result;
    }
  }

  // Handle "X até Y" ranges
  const rangeMatch = normalized.match(/(\d+)\s*até\s*(\d+)/);
  if (rangeMatch) {
    result.type = 'range';
    result.min = parseInt(rangeMatch[1]);
    result.max = parseInt(rangeMatch[2]);
    return result;
  }

  // Handle specific number lists (comma-separated)
  const numbers = normalized.match(/\d+[a-z]?/g); // Include letters like "337F"

  if (numbers && numbers.length >= 2 && normalized.includes(',')) {
    result.type = 'list';
    // Convert to integers, handling cases like "337F"
    result.numbers = numbers.map(n => {
      const numOnly = n.match(/\d+/);
      return numOnly ? parseInt(numOnly[0]) : null;
    }).filter(n => n !== null);
    return result;
  }

  // Handle single number
  if (numbers && numbers.length === 1) {
    result.type = 'list';
    result.numbers = [parseInt(numbers[0])];
    return result;
  }

  // Handle text-only descriptions (e.g., "entre Graça Aranha e Av. Amazonas")
  if (normalized.includes('entre') || !numbers) {
    result.type = 'any'; // Accept any number for descriptive ranges
    return result;
  }

  // Fallback: treat as "any" if we can't parse it
  result.type = 'any';
  return result;
}
