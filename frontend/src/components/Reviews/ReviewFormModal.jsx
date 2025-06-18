import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import { useModal } from '../../context/ModalContext';

import './ReviewFormModal.css';

export default function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const isDisabled = !(review.trim().length >= 10 && stars > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError(null);

    const payload = {
      review: review.trim(),
      stars,
    };

    try {
      await dispatch(createReview(spotId, payload));
      closeModal();
    } catch (res) {
      if (res.status === 400) {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        if (data?.message) setError(data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Reset form when modal unmounts
  useEffect(() => {
    return () => {
      setReview('');
      setStars(0);
      setErrors({});
      setError(null);
    };
  }, []);

  return (
    <div className="review-modal__container">
      <h2 className="review-modal__title">How was your stay?</h2>

      {/* General server error message */}
      {error && <p className="review-modal__error">{error}</p>}

      <form onSubmit={handleSubmit} className="review-modal__form">
        {/* Field-specific validation errors */}
        {errors.review && <p className="review-modal__error">{errors.review}</p>}
        {errors.stars && <p className="review-modal__error">{errors.stars}</p>}



        <textarea
          className="review-modal__textarea"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <div className="review-modal__stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <label 
              key={num} 
              className="review-modal__star-label"
              onMouseEnter={() => setHoveredStar(num)}
              onMouseLeave={() => setHoveredStar(0)}
            >
              <input
                type="radio"
                name="stars"
                value={num}
                onChange={() => setStars(num)}
                className="review-modal__star-input"
              />
              <span className={num <= (hoveredStar || stars) ? 'filled' : 'empty'}>★</span>
            </label>
          ))}
        </div>

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
