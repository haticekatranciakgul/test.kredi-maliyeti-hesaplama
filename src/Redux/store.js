import { configureStore } from '@reduxjs/toolkit';
import creditReducer from './creditSlice';
import formReducer from './formSlice';
import dataReducer from './dataSlice';
import modalReducer from './modalSlice';
import expensesReducer from './expensesSlice';
import creditTypeReducer from './creditTypeSlice';

const store = configureStore({
  reducer: {
    credit: creditReducer,
    form: formReducer,
    data: dataReducer,
    modal: modalReducer,
    expenses: expensesReducer,
    creditType: creditTypeReducer,


  },
});

export default store;
