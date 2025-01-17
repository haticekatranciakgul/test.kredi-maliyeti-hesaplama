import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  block: 0,
  block_amount: 0,
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setBlockData: (state, action) => {
      state.block = action.payload.block;
      state.block_amount = action.payload.block_amount;
    },
  },
});

export const { setBlockData } = blockSlice.actions;

export const selectBlockData = (state) => state.block;

export default blockSlice.reducer;
