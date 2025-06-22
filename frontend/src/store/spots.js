import { csrfFetch } from './csrf';

// Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';


// Action Creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const loadSingleSpot = (spot) => ({
  type: LOAD_SINGLE_SPOT,
  spot
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

export const loadUserSpots = (spots) => ({
  type: LOAD_USER_SPOTS,
  userSpots: spots
});

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

export const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  spotId
});

// Thunk to fetch all spots
export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots)); 
    return data.Spots;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

// Thunk to fetch a single spot by ID
export const fetchSpotDetails = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotData = await res.json();
    dispatch(loadSingleSpot(spotData));
    return spotData;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

export const fetchUserSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current');
  if (res.ok) {
    // const userSpots = Array.isArray(data?.Spots) ? data.Spots : [];
    const data = await res.json();
    dispatch(loadUserSpots(data.spots)); 
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
    const { spot } = await res.json(); 
    dispatch(addSpot(spot));           
    return spot;                       
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

// Thunk to update an existing spot
export const updateSpot = (spotData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData)
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(updateSpotAction(updatedSpot));
    return updatedSpot;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(deleteSpotAction(spotId));
    return;
  } else {
    const errorData = await res.json();
    return Promise.reject(errorData);
  }
};


// export const fetchUserSpots = () => async dispatch => {
//   const res = await fetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };


// Initial State
const initialState = {
  allSpots: {},
  singleSpot: {},
  userSpots: {}
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state, allSpots: {} };
      action.spots.forEach(spot => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case LOAD_SINGLE_SPOT:
      return {
        ...state,
        singleSpot: action.spot
      };
    case ADD_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot
        }
      };
    case LOAD_USER_SPOTS: {
      const newState = { ...state, userSpots: {} };
      if (Array.isArray(action.userSpots)) {
        action.userSpots.forEach(spot => {
          newState.userSpots[spot.id] = spot;
        });
      }
      return newState;
    }
    case UPDATE_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot
        },
        singleSpot: action.spot,
        userSpots: {
          ...state.userSpots,
          [action.spot.id]: action.spot
        }
      };
    case DELETE_SPOT: {
      const newState = {
        ...state,
        allSpots: { ...state.allSpots },
        userSpots: { ...state.userSpots }
      };
      delete newState.allSpots[action.spotId];
      delete newState.userSpots[action.spotId];
      return newState;
      }
  
    default:
      return state;
  }
};

export default spotsReducer;

// code source and modified from ChatGPT.
