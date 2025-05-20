// frontend/src/store/spots.js

// Action type
const ADD_SPOT = 'spots/ADD_SPOT';

// Action creator
export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

// Thunk to create a new spot
export const createSpot = (spotData) => async (dispatch) => {
  const res = await fetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData)
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
