import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  creditAmount: '',
  otherExpenses: '',
  inputCount: '',
  sharedValue: '',
  generatedRows: [],
};

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    setField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addRow(state) {
      state.generatedRows.push({ value1: '', value2: '' });
    },
    updateRow(state, action) {
      const { index, field, value } = action.payload;
      state.generatedRows[index][field] = value;
    },
    deleteRow(state, action) {
      const indexToDelete = action.payload;
      state.generatedRows = state.generatedRows.filter((_, index) => index !== indexToDelete);
    },
  },
});

export const { setField, addRow, updateRow, deleteRow } = creditSlice.actions;
export default creditSlice.reducer;
