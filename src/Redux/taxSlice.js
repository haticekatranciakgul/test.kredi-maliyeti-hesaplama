import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tax: [
        { id: 0, title: 'BSMV', amount: '5.00'},  
        { id: 1, title: 'KKDF', amount: '0' },  
        { id: 2, title: 'Diğer', amount: '' },  
    ],
};

const taxSlice = createSlice({
    name: 'tax',
    initialState,
    reducers: {
        addTax: (state, action) => {
            state.tax_rates.push(action.payload); 
        },
        setTax: (state, action) => {
            state.tax_rates = action.payload; 
        },
    },
});

export const { addTax, setTax } = taxSlice.actions;

export default taxSlice.reducer;
