import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  irrValue: null,
};

const irrSlice = createSlice({
  name: 'irr',
  initialState,
  reducers: {
    setIrrValue: (state, action) => {
      state.irrValue = action.payload;
    },
  },
});

export const { setIrrValue } = irrSlice.actions;
export default irrSlice.reducer;
