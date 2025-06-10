import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotReviews, deleteReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from './ReviewFormModal';
import './ReviewList.css';

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  // Pull the current logged-in user from session
  const user = useSelector((state) => state.session.user);

  // Grab the array of reviews for this spot from Redux
  // If there’s no entry yet, default to an empty array
  const reviews = useSelector((state) => state.reviews?.[spotId] || []);

  // Pull the spot’s ownerId so we know who can’t post reviews (owner cannot)
  const spot = useSelector((state) => state.spots[spotId] || {});
  const spotOwnerId = spot.ownerId;

  // Fetch reviews when `spotId` changes
  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpotReviews(spotId));
    }
  }, [dispatch, spotId]);

  // Check if the logged-in user has already left a review
  const hasReviewed = user
    ? reviews.some((r) => r.userId === user.id)
    : false;

  // Handler for “Delete” button
  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(reviewId, spotId));
    }
  };

  return (
    <div className="reviews">
      <h2 className="reviews__heading">
        {/* 
          Display average star and count. We assume the backend/spot-slice
          added an avgRating or you can compute from Redux if you stored it.
          For simplicity, we show "New" if no reviews.
        */}
        {reviews.length > 0 ? (
          <>
            <i className="fa fa-star"></i>{' '}
            {Number(
              reviews
                .reduce((sum, r) => sum + r.stars, 0) / reviews.length
            ).toFixed(1)}{' '}
            · {reviews.length}{' '}
            {reviews.length === 1 ? 'Review' : 'Reviews'}
          </>
        ) : (
          'New'
        )}
      </h2>

      {/* “Post Your Review” button only if:
           - a user is logged in
           - user is not the spot owner
           - user has not already reviewed */}
      {user && user.id !== spotOwnerId && !hasReviewed && (
        <div className="reviews__post-button">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal />}
          />
        </div>
      )}

      {/* If there are reviews, list them. Otherwise, show prompt if user can post */}
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r.id} className="review-item">
            <div className="review-item__header">
              <strong>{r.User.firstName}</strong>
              <span>
                {new Date(r.createdAt).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="review-item__text">{r.review}</p>
            {user && user.id === r.userId && (
              <button
                className="review-item__delete-btn"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        // If no reviews exist and logged-in user can post
        user &&
        user.id !== spotOwnerId && (
          <p className="reviews__no-reviews">
            Be the first to post a review!
          </p>
        )
      )}
    </div>
  );
}
