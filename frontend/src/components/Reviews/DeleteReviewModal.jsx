// DeleteReviewModal.jsx
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
// import './DeleteReviewModal.css'; 

const DeleteReviewModal = ({ reviewId, spotId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId, spotId));
    if (closeModal) closeModal(); 
  };

  return (
    <div className="delete-review-modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this review?</p>
      <button className="confirm" onClick={handleDelete}>
        Yes (Delete Review)
      </button>
      <button className="cancel" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;
