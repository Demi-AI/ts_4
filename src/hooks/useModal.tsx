import React, { useState } from 'react';

// 定義 useModal 自定義 Hook
interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

// ModalComponent 組件
const ModalComponent: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal(); // 使用 useModal

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>This is a modal</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;

