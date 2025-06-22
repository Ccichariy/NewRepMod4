import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import './ManageSpotDeleteModal.css';

import { useModal } from '../../context/ModalContext';

export default function ManageSpotDeleteModal({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleConfirm = async () => {
    await dispatch(deleteSpot(spotId));
    closeModal();
    // Optionally: navigate('/spots/current'); or re-fetch user spots if needed
  };

  return (
    <div className="delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-modal-buttons">
        <button className="delete-button" onClick={handleConfirm}>Yes (Delete Spot)</button>
        <button className="cancel-button" onClick={closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
}


// code source and modified from ChatGPT.
