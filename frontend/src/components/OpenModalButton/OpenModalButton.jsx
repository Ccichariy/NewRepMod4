// frontend/src/components/OpenModalButton/OpenModalButton.jsx

// import { useModal } from '../../context/Modal';
// import { Modal } from './Modal';
import { useModal } from '../../context/ModalContext';


function OpenModalButton({
  modalComponent, 
  buttonText, 
  onButtonClick, 
  onModalClose 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;

// code source and modified from ChatGPT.
