import { createSlice } from '@reduxjs/toolkit';

const creditTypeSlice = createSlice({
  name: 'creditType',
  initialState: {
    consumerCreditType: 1,
    creditType: 1,
  },
  reducers: {
    setConsumerCreditType: (state, action) => {
      state.consumerCreditType = action.payload;
    },
    setCreditType: (state, action) => {
      state.creditType = action.payload;
    },
  },
});

export const { setConsumerCreditType, setCreditType } = creditTypeSlice.actions;
export default creditTypeSlice.reducer;
