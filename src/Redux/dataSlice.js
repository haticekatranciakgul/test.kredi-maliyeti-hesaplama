import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../api";

// const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// export const fetchData = createAsyncThunk('data/fetchData', async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// });


export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Veri çekilemedi!');
    }
  });
  

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;
