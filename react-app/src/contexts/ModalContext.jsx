import { createContext, useContext, useState, useCallback } from 'react';
import Modal from '../components/common/Modal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: null,
    onCancel: null,
  });

  const showModal = useCallback(({
    type = 'info',
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm = null,
    onCancel = null,
  }) => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => {
          if (onConfirm) onConfirm();
          resolve(true);
          closeModal();
        },
        onCancel: () => {
          if (onCancel) onCancel();
          resolve(false);
          closeModal();
        },
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modalState.isOpen && (
        <Modal
          type={modalState.type}
          title={modalState.title}
          message={modalState.message}
          confirmText={modalState.confirmText}
          cancelText={modalState.cancelText}
          onConfirm={modalState.onConfirm}
          onCancel={modalState.onCancel}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
