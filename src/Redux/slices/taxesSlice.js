import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taxes: [
        { id: 0, title: 'BSMV', amount: '5'},  
        { id: 1, title: 'KKDF', amount: '0' },  
    ],
};

const taxesSlice = createSlice({
    name: 'taxes',
    initialState,
    reducers: {
        addTaxes: (state, action) => {
            state.taxes.push(action.payload); 
        },
        setTaxes: (state, action) => {
            state.taxes = action.payload; 
        },
    },
});

export const { addTaxes, setTaxes } = taxesSlice.actions;

export default taxesSlice.reducer;
