import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
// import { useModal } from '../../context/Modal.jsx';
// import { Modal } from './Modal';
import { useModal } from '../../context/ModalContext';

import './ReviewFormModal.css';

export default function ReviewFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { spotId } = useParams();
  // const user = useSelector((state) => state.session.user);

  // Local state for form inputs
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  // Determine if the submit button should be disabled:
  // - review text length ≥ 10 (after trimming)
  // - stars > 0
  const isDisabled = !(review.trim().length >= 10 && stars > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      review: review.trim(),
      stars,
    };

    try {
      await dispatch(createReview(spotId, payload));
      closeModal();
    } catch (res) {
      // If validation errors come back (status 400), set them in local state
      if (res.status === 400) {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    }
  };

  return (
    <div className="review-modal__container">
      <h2 className="review-modal__title">How was your stay?</h2>
      <form onSubmit={handleSubmit} className="review-modal__form">
        {/* Display server-side validation errors, if any */}
        {errors.review && <p className="review-modal__error">{errors.review}</p>}
        {errors.stars && <p className="review-modal__error">{errors.stars}</p>}

        {/* Textarea for the review text */}
        <textarea
          className="review-modal__textarea"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required
        />

        {/* Star‐rating inputs */}
        <div className="review-modal__stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="review-modal__star-label">
              <input
                type="radio"
                name="stars"
                value={num}
                onChange={() => setStars(num)}
                className="review-modal__star-input"
              />
              {/* Filled star if num ≤ stars, otherwise empty */}
              <span className={num <= stars ? 'filled' : 'empty'}>★</span>
            </label>
          ))}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="review-modal__submit"
          disabled={isDisabled}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
