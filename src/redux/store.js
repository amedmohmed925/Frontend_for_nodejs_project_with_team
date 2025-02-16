import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    movie: movieReducer,
    auth: authReducer,

  },
});

export default store;
