// redux/expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [
        { id: 0, title: 'Komisyon, ücret ve masraflar ', amount: '' },  
        { id: 1, title: 'Sigortalar', amount: '' },  
        { id: 2, title: 'Diğer', amount: '' },  
    ],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload); 
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload; 
        },
    },
});

export const { addExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
