// DeleteReviewModal.jsx
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useModal } from '../../context/ModalContext';

import './DeleteReviewModal.css';
// import { fetchSpotDetails } from '../../store/spots';

const DeleteReviewModal = ({ reviewId, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId, spotId));
    // await dispatch(fetchSpotDetails(spotId));
    closeModal();
  };


  return (
    <div className="delete-modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-modal-buttons">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Review)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;

// code source and modified from ChatGPT.
