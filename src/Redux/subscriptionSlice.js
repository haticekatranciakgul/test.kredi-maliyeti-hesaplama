import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const subscribeEmail = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        'https://credit-irr.vercel.app/api/v1/credits/create/subscribe',
        formData
      );
      if (response.data) {
        dispatch(setSnackbarMessage('Form başarıyla gönderildi.'));
        dispatch(setSnackbarSeverity('success'));
        dispatch(setSnackbarOpen(true));

        return response.data;
      } else {
        dispatch(setSnackbarMessage('API Yanıt Hatası'));
        dispatch(setSnackbarSeverity('warning'));
        dispatch(setSnackbarOpen(true));

        return rejectWithValue({ message: 'Unexpected response status', data: response.data });
      }
    } catch (error) {
      dispatch(setSnackbarMessage('API Yanıt Hatası'));
      dispatch(setSnackbarSeverity('error'));
      dispatch(setSnackbarOpen(true));

      return rejectWithValue(error.response?.data?.error || 'API Yanıt Hatası');
    }
  }
);


const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle', 
    error: null,
    snackbarMessage: '',
    snackbarSeverity: 'info', 
    snackbarOpen: false,
  },
  reducers: {
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setSnackbarSeverity: (state, action) => {
      state.snackbarSeverity = action.payload;
    },
    setSnackbarOpen: (state, action) => {
      state.snackbarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribeEmail.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(subscribeEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = formSlice.actions;

export default formSlice.reducer;
