import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debouncing de valores
 * Atrasa a atualização de um valor até que o usuário pare de digitar
 *
 * @param {any} value - Valor para aplicar debounce
 * @param {number} delay - Delay em milissegundos (padrão: 300ms)
 * @returns {any} Valor com debounce aplicado
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * // debouncedSearchTerm só atualiza 300ms após usuário parar de digitar
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: cancela timer anterior se value mudar
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
