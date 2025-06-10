import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';   
import spotsReducer from './spots';      
import reviewsReducer from './reviews';   

const store = configureStore({
  reducer: {
    session: sessionReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
  },
});

export default store;
