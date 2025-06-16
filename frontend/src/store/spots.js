// // Action type
// const ADD_SPOT = 'spots/ADD_SPOT';

// // Action creator
// export const addSpot = (spot) => ({
//   type: ADD_SPOT,
//   spot
// });

// // Thunk to create a new spot
// export const createSpot = (spotData) => async (dispatch) => {
//   const res = await fetch('/api/spots', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(spotData)
//   });

//   if (res.ok) {
//     const newSpot = await res.json();
//     dispatch(addSpot(newSpot));
//     return newSpot;
//   } else {
//     const errorData = await res.json();
//     return Promise.reject(errorData);
//   }
// };

// // Reducer
// const spotsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADD_SPOT:
//       return { ...state, [action.spot.id]: action.spot };
//     default:
//       return state;
//   }
// };

// export default spotsReducer;


import { csrfFetch } from './csrf';


// Action types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ADD_SPOT = 'spots/ADD_SPOT';

// Action creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

// Thunk to fetch all spots
export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots)); // assuming response is { Spots: [...] }
    return data.Spots;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

// Thunk to create a new spot
export const createSpot = (spotData) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData)
  });

  if (res.ok) {
    const { spot } = await res.json(); // ✅ destructure spot
    dispatch(addSpot(spot));           // ✅ pass the spot directly
    return spot;                       // ✅ returned value now has .id
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = {};
      action.spots.forEach(spot => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case ADD_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
