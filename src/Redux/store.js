import { configureStore } from '@reduxjs/toolkit';
import creditReducer from './slices/creditSlice';
import formReducer from './slices/formSlice';
import dataReducer from './slices/dataSlice';
import modalReducer from './slices/modalSlice';
import expensesReducer from './slices/expensesSlice';
import creditTypeReducer from './slices/creditTypeSlice';
import blockReducer from './slices/blockSlice';
import taxesReducer from './slices/taxesSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import irrReducer from './slices/irrSlice';
import costReducer from './slices/costSlice';


const store = configureStore({
  reducer: {
    credit: creditReducer,
    form: formReducer,
    data: dataReducer,
    modal: modalReducer,
    expenses: expensesReducer,
    creditType: creditTypeReducer,
    block: blockReducer, 
    taxes: taxesReducer, 
    subscription: subscriptionReducer,
    irr: irrReducer,
    costs: costReducer,



  },
});

export default store;
