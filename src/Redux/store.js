import { configureStore } from '@reduxjs/toolkit';
import creditReducer from './creditSlice';
import formReducer from './formSlice';
import dataReducer from './dataSlice';
import modalReducer from './modalSlice'

const store = configureStore({
  reducer: {
    credit: creditReducer,
    form: formReducer,
    data: dataReducer,
    modal: modalReducer,
  },
});

export default store;
