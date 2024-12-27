import { configureStore } from '@reduxjs/toolkit';
import creditReducer from './creditSlice';

const store = configureStore({
  reducer: {
    credit: creditReducer,
  },
});

export default store;
