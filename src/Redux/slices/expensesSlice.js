import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [
        { id: 0, title: 'Komisyon, ücret ve masraflar ', amount: '', rawAmount: '' },  
        { id: 1, title: 'Sigortalar', amount: '', rawAmount: '' },  
        { id: 2, title: 'Diğer', amount: '', rawAmount: '' },  
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
        updateExpenseAmount: (state, action) => {
            const { index, amount, rawAmount } = action.payload;
            if (state.expenses[index]) {
                state.expenses[index].amount = amount;
                state.expenses[index].rawAmount = rawAmount;
            }
        }
    },
});

export const { addExpense, setExpenses, updateExpenseAmount } = expensesSlice.actions;
export default expensesSlice.reducer;
