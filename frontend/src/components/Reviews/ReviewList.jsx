import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from './ReviewFormModal';
import ReviewDetails from './ReviewDetails';
import './ReviewList.css';

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews?.[spotId] || []);
  const spot = useSelector((state) => state.spots?.singleSpot || {});
  const spotOwnerId = spot.ownerId;

  const hasReviewed = user
    ? reviews.some((r) => r.userId === user.id)
    : false;

  useEffect(() => {
    if (spotId) dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);

  // const handleDelete = (reviewId) => {
  //   if (window.confirm('Are you sure you want to delete this review?')) {
  //     dispatch(deleteReview(reviewId, spotId));
  //   }
  // };

  return (
    <div className="reviews">
      <h2 className="reviews__heading">
        {reviews.length > 0 ? (
          <>
            <i className="fa fa-star"></i>{' '}
            
            {(
              reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
            ).toFixed(1)}{' '}
            · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </>
        ) : ('New')
        }
      </h2>

      {user && user.id !== spotOwnerId && !hasReviewed && (
        <div className="reviews__post-button">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal spotId={spotId}/>}
          />
        </div>
      )}

      {reviews.length > 0 ? (
        reviews.map((r) => (
          <ReviewDetails
            key={r.id}
            review={r}
            currUser={user}
            spotId={spotId}
          />
        ))
      ) : (
        user &&
        user.id !== spotOwnerId && (
          <p className="reviews__no-reviews">Be the first to post a review!</p>
        )
      )}
    </div>
  );
}


// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchSpotReviews, deleteReview } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton';
// import ReviewFormModal from './ReviewFormModal';
// import './ReviewList.css';
// import ReviewDetails from './ReviewDetails';


// export default function ReviewList() {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();

//   const user = useSelector((state) => state.session.user);
//   const reviews = useSelector((state) => state.reviews?.[spotId] || []);
//   const spot = useSelector((state) => state.spots?.singleSpot || {});
//   const spotOwnerId = spot.ownerId;

//   const hasReviewed = user
//     ? reviews.some((r) => r.userId === user.id)
//     : false;

//   useEffect(() => {
//     if (spotId) dispatch(fetchSpotReviews(spotId));
//   }, [dispatch, spotId]);

//   const handleDelete = (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       dispatch(deleteReview(reviewId, spotId));
//     }
//   };

// console.log("Spot ID:", spotId);
// console.log("Reviews:", reviews);
// console.log("User:", user);
// console.log("Spot:", spot);

//   return (
//     <div className="reviews">
//       <h2 className="reviews__heading">
//         {reviews.length > 0 ? (
//           <>
//             <i className="fa fa-star"></i>{' '}
//             {(
//               reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
//             ).toFixed(1)}{' '}
//             · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
//           </>
//         ) : (
//           'New'
//         )}
//       </h2>

//       {user && user.id !== spotOwnerId && !hasReviewed && (
//         <div className="reviews__post-button">
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={<ReviewFormModal />}
//           />
//         </div>
//       )}

//       {reviews.length > 0 ? (
//         reviews.map((r) => (
//           <div key={r.id} className="review-item">
//             <div className="review-item__header">
//               <strong>{r.User?.firstName || 'Anonymous'}</strong>
//               <span>
//                 {new Date(r.createdAt).toLocaleString('default', {
//                   month: 'long',
//                   year: 'numeric',
//                 })}
//               </span>
//             </div>
//             <p className="review-item__text">{r.review}</p>
//             {user && user.id === r.userId && (
//               <button
//                 className="review-item__delete-btn"
//                 onClick={() => handleDelete(r.id)}
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         ))
//       ) : (
//         user &&
//         user.id !== spotOwnerId && (
//           <p className="reviews__no-reviews">Be the first to post a review!</p>
//         )
//       )}
//     </div>
//   );
// }
