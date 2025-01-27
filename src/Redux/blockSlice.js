import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  block: 0,
  block_amount: null,
  initial: null
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setBlockData: (state, action) => {
      state.block = action.payload.block;
      state.block_amount = action.payload.block_amount;
    },
    setInitial: (state, action) => {
      state.initial = action.payload; 
    },
  },
});


export const { setBlockData, setInitial } = blockSlice.actions;

export const selectBlockData = (state) => state.block;

export default blockSlice.reducer;
