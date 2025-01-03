import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Form verilerini gönderme işlemi için async thunk
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default formSlice.reducer;
