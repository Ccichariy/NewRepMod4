import { csrfFetch } from './csrf'; // adjust path if needed
import { fetchSpotDetails } from './spots'; // or the correct path to your spots store

const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS';
const CREATE_REVIEW    = 'reviews/CREATE_REVIEW';
// const READ_REVIEW = 'reviews/READ_REVIEW';
const DELETE_REVIEW    = 'reviews/DELETE_REVIEW';

const loadSpotReviews = (spotId, reviews) => ({
  type: LOAD_SPOT_REVIEWS,
  payload: { spotId, reviews },
});

const createReviewAction = (spotId, review) => ({
  type: CREATE_REVIEW,
  payload: { spotId, review },
});


// const readReviewAction = (spotId, review) => ({
//   type: READ_REVIEW,
//   payload: { spotId, review },
// });

const deleteReviewAction = (spotId, reviewId) => ({
  type: DELETE_REVIEW,
  payload: { spotId, reviewId },
});

// Thunks

// Fetch all reviews for a given spot
export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json(); // { Reviews: [ {id, userId, review, stars, createdAt, User:{…} }, … ] }
    dispatch(loadSpotReviews(spotId, data.Reviews));
    return data.Reviews;
  }
};

// Create a new review for the spot
export const createReview = (spotId, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const newReview = await res.json(); 
    // The API returns the newly created review object, e.g.:
    // { id, userId, spotId, review, stars, createdAt, User: { firstName, … } }
    dispatch(createReviewAction(spotId, newReview));
    dispatch(fetchSpotDetails(spotId)); 
    return newReview;
  } else if (res.status === 400) {
    // Validation errors
    throw res;
  }
};

// Delete an existing review
export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteReviewAction(spotId, reviewId));
  }
};

// ---------- Initial State ----------
// We’ll keep reviews inside an object keyed by spotId, so we can quickly look up
// all reviews for a given spot. For example:
// state.reviews = { 
//   1: [ { id: 10, userId: 3, review: 'Great!', stars: 5, User: { firstName: 'Jane', … } }, … ],
//   2: [ … ]
// }
const initialState = {};

// ---------- Reducer ----------
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS: {
      const newState = { ...state };
      newState[action.payload.spotId] = action.payload.reviews;
      return newState;
    }
    case CREATE_REVIEW: {
      const { spotId, review } = action.payload;
      const newState = { ...state };
      // If there were no reviews before, initialize array
      if (!newState[spotId]) newState[spotId] = [];
      newState[spotId] = [review, ...newState[spotId]];
      return newState;
    }
    // case READ_REVIEW: {
    // const { spotId, review } = action.payload;
    // const newState = { ...state };
    // // If there were no reviews before, initialize array
    // if (!newState[spotId]) newState[spotId] = [];
    // newState[spotId] = [review, ...newState[spotId]];
    // return newState;
    // }

    case DELETE_REVIEW: {
      const { spotId, reviewId } = action.payload;
      const newState = { ...state };
      if (!newState[spotId]) return state;
      newState[spotId] = newState[spotId].filter((r) => r.id !== reviewId);
      return newState;
    }
    default:
      return state;
  }
}

