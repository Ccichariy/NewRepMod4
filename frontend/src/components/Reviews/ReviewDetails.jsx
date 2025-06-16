// ReviewDetails.jsx
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import "./ReviewDetails.css"; 

// const ReviewDetails = ({ review, currUser, spotId, className }) => {
const ReviewDetails = ({ review, currUser, className }) => {
  if (!review) return null;

  const timestamp = review.createdAt;
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <div className={`review-container ${className || ""}`}>
      <h4 className="review-user">{review.User?.firstName || currUser?.firstName || "Anonymous"}</h4>
      <p className="review-date">{formattedDate}</p>
      <p className="review-text">{review.review}</p>

      {currUser?.id === review.userId && (
        <span>
          <OpenModalButton
            buttonClassName="delete-review-modal-button"
            buttonText="Delete"
            modalComponent={
              // <DeleteReviewModal reviewId={review.id} spotId={spotId} />
              <DeleteReviewModal reviewId={review.id} />

            }
          />
        </span>
      )}
    </div>
  );
};

export default ReviewDetails;
