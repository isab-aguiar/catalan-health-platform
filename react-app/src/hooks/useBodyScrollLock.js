import { useEffect } from 'react';

/**
 * Hook para bloquear/desbloquear scroll do body
 * Útil para modais, sidebars e menus mobile
 *
 * @param {boolean} isLocked - Se true, bloqueia o scroll; se false, desbloqueia
 *
 * @example
 * ```jsx
 * function Modal({ isOpen }) {
 *   useBodyScrollLock(isOpen);
 *
 *   if (!isOpen) return null;
 *   return <div>Modal content</div>;
 * }
 * ```
 */
export function useBodyScrollLock(isLocked = false) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    // Salva a posição atual do scroll
    const scrollY = window.scrollY;

    // Bloqueia o scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // Cleanup: restaura o scroll quando o componente desmontar ou isLocked mudar
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restaura a posição do scroll
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
