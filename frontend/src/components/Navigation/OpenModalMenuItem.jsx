// import React from 'react';
// import { useModal } from '../../context/Modal';
import { Modal } from './Modal';
import { ModalProvider, useModal } from './ModalContext';


function OpenModalMenuItem({
  modalComponent,
  itemText, 
  onItemClick,
  onModalClose 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li onClick={onClick}>{itemText}</li>
  );
}

export default OpenModalMenuItem;