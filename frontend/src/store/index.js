import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';   
import spotsReducer from './spots';      
import reviewsReducer from './reviews';   
import { restoreCSRF } from './csrf';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
  },
});
store.dispatch(restoreCSRF());
export default store;
