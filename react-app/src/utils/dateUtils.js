/**
 * Utilitários para manipulação de datas no timezone local
 *
 * Este arquivo resolve problemas de timezone ao trabalhar com datas do Firestore.
 * Todas as funções garantem que datas sejam tratadas no timezone local do usuário,
 * não em UTC, evitando problemas de comparação e exibição.
 */

/**
 * Converte qualquer input de data para Date em midnight local
 *
 * @param {Date|Timestamp|string} input - Data a converter
 * @returns {Date|null} Data normalizada em midnight local (00:00:00.000), ou null se inválida
 *
 * @example
 * // Firestore Timestamp
 * normalizarDataParaMidnight(firestoreTimestamp) // => Date em midnight local
 *
 * // String ISO
 * normalizarDataParaMidnight("2025-01-02") // => Date(2025, 0, 2, 0, 0, 0, 0) em timezone local
 *
 * // Date object
 * normalizarDataParaMidnight(new Date()) // => Date de hoje em midnight local
 */
export function normalizarDataParaMidnight(input) {
  let date;

  // Se é Timestamp do Firestore
  if (input?.toDate) {
    date = input.toDate();
  }
  // Se é string ISO (YYYY-MM-DD)
  else if (typeof input === 'string') {
    // Parse string ISO manualmente para evitar interpretação UTC
    const [ano, mes, dia] = input.split('-').map(Number);

    // Validar componentes
    if (!ano || !mes || !dia || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      console.warn('[dateUtils] String de data inválida:', input);
      return null;
    }

    // Criar Date em timezone local (mês é 0-indexed em JavaScript)
    date = new Date(ano, mes - 1, dia);
  }
  // Se já é Date
  else if (input instanceof Date) {
    date = new Date(input);
  }
  else {
    console.warn('[dateUtils] Input de data não reconhecido:', input);
    return null;
  }

  // Validar se Date é válido
  if (isNaN(date.getTime())) {
    console.warn('[dateUtils] Date inválido gerado de:', input);
    return null;
  }

  // Setar para midnight local (00:00:00.000)
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Formata Date para string YYYY-MM-DD (local, não UTC)
 *
 * @param {Date} date - Data a formatar
 * @returns {string} String no formato YYYY-MM-DD
 *
 * @example
 * const date = new Date(2025, 0, 2); // 2 de janeiro de 2025
 * formatarDataParaISO(date) // => "2025-01-02"
 */
export function formatarDataParaISO(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn('[dateUtils] Date inválido para formatação:', date);
    return '';
  }

  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/**
 * Compara se duas datas são do mesmo dia (ignora hora)
 *
 * @param {Date} data1 - Primeira data
 * @param {Date} data2 - Segunda data
 * @returns {boolean} true se são do mesmo dia, false caso contrário
 *
 * @example
 * const hoje = new Date(2025, 0, 2, 10, 30);
 * const tambemHoje = new Date(2025, 0, 2, 15, 45);
 * isMesmoDia(hoje, tambemHoje) // => true
 */
export function isMesmoDia(data1, data2) {
  if (!(data1 instanceof Date) || !(data2 instanceof Date)) {
    return false;
  }

  if (isNaN(data1.getTime()) || isNaN(data2.getTime())) {
    return false;
  }

  return (
    data1.getDate() === data2.getDate() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getFullYear() === data2.getFullYear()
  );
}
