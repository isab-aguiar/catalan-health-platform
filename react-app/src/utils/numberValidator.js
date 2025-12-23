/**
 * Valida se um número de endereço está dentro de um range parseado
 * Trabalha em conjunto com rangeParser.js
 *
 * @param {number} number - Número do endereço para validar
 * @param {object} rangeData - Objeto retornado por parseNumberRange()
 * @returns {boolean} true se o número está no range, false caso contrário
 *
 * @example
 * isNumberInRange(55, { type: 'range', min: 50, max: 100 }) // true
 * isNumberInRange(101, { type: 'range', min: 50, max: 100 }) // false
 * isNumberInRange(20, { type: 'range', min: 20, max: 168, filter: 'even' }) // true (20 é par)
 * isNumberInRange(21, { type: 'range', min: 20, max: 168, filter: 'even' }) // false (21 é ímpar)
 */
export function isNumberInRange(number, rangeData) {
  // Se não há número ou range data, considera válido
  if (!number || !rangeData) return true;

  // Tipo 'any' aceita qualquer número
  if (rangeData.type === 'any') return true;

  const isEven = number % 2 === 0;
  const isOdd = number % 2 !== 0;

  switch (rangeData.type) {
    case 'range': {
      // Check if number is within min/max bounds
      if (number < rangeData.min || number > rangeData.max) {
        // Check if number is in additional numbers list
        if (rangeData.additional && rangeData.additional.includes(number)) {
          return true;
        }
        return false;
      }

      // Check if number is in exceptions list
      if (rangeData.exceptions && rangeData.exceptions.includes(number)) {
        return false;
      }

      // Check even/odd filter
      if (rangeData.filter === 'even' && isOdd) return false;
      if (rangeData.filter === 'odd' && isEven) return false;

      return true;
    }

    case 'list': {
      // Direct number match in list
      return rangeData.numbers && rangeData.numbers.includes(number);
    }

    case 'split': {
      // Separate ranges for even and odd numbers
      if (isEven && rangeData.even) {
        return number >= rangeData.even.min && number <= rangeData.even.max;
      }

      if (isOdd && rangeData.odd) {
        return number >= rangeData.odd.min && number <= rangeData.odd.max;
      }

      return false;
    }

    default:
      // Unknown type, default to true (permissive)
      return true;
  }
}

/**
 * Extrai o número de um endereço (ex: "Rua Castro Alves 55" -> 55)
 * @param {string} input - String de entrada
 * @returns {number|null} Número extraído ou null
 */
export function extractNumber(input) {
  if (!input) return null;

  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}
