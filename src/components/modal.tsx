import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen ? 'fixed inset-0 bg-black bg-opacity-40 opacity-100 z-50' : 'hidden';
  const modalClasses = isOpen ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50' : 'hidden';

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
