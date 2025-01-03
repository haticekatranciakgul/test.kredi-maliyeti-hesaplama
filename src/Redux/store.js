import { configureStore } from '@reduxjs/toolkit';
import creditReducer from './creditSlice';
import formReducer from './formSlice';


const store = configureStore({
  reducer: {
    credit: creditReducer,
    form: formReducer,
  },
});

export default store;
