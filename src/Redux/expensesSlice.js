// redux/expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload); // Yeni expense ekler
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload; // Expenses'ı set eder
        },
    },
});

export const { addExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
