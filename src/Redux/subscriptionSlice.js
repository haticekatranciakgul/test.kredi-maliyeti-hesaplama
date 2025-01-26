import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk for form submission
export const subscribeEmail = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        'https://credit-irr.vercel.app/api/v1/credits/create/subscribe',
        formData
      );
      if (response.data) {
        // Dispatch snackbar notifications on success
        dispatch(setSnackbarMessage('Form başarıyla gönderildi.'));
        dispatch(setSnackbarSeverity('success'));
        dispatch(setSnackbarOpen(true));

        return response.data;
      } else {
        // Handle unexpected API responses
        dispatch(setSnackbarMessage('API Yanıt Hatası: Beklenmedik bir durum oluştu.'));
        dispatch(setSnackbarSeverity('warning'));
        dispatch(setSnackbarOpen(true));
        console.error(response.data.error);

        return rejectWithValue({ message: 'Unexpected response status', data: response.data });
      }
    } catch (error) {
      // Handle errors and dispatch snackbar notifications
      dispatch(setSnackbarMessage('API Yanıt Hatası'));
      dispatch(setSnackbarSeverity('error'));
      dispatch(setSnackbarOpen(true));

      return rejectWithValue(error.response?.data?.error || 'API Yanıt Hatası');
    }
  }
);

// Slice definition for form management
const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    snackbarMessage: '',
    snackbarSeverity: 'info', // 'info', 'success', 'warning', 'error'
    snackbarOpen: false,
  },
  reducers: {
    // Reducers for snackbar state management
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

// Exporting actions and reducer
export const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = formSlice.actions;

export default formSlice.reducer;
