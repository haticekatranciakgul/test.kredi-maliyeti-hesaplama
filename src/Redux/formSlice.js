import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('https://credit-irr.vercel.app/api/v1/credits/create/contactus', formData);
      if (response.data ) {
        // Başarı durumunda snackbar'ı ayarla
        dispatch(setSnackbarMessage('Form başarıyla gönderildi.'));
        dispatch(setSnackbarSeverity('success'));
        dispatch(setSnackbarOpen(true));

        return response.data;
      } else {
        // API yanıtı başarılı değilse hata mesajı gönder
        dispatch(setSnackbarMessage('API Yanıt Hatası' + response.data.error));
        dispatch(setSnackbarSeverity('warning'));
        dispatch(setSnackbarOpen(true));
      }

     
    } catch (error) {
      // Hata durumunda snackbar'ı ayarla
      dispatch(setSnackbarMessage('API Yanıt Hatası'));
      //      dispatch(setSnackbarMessage('API Yanıt Hatası' + error.response.data.error));

      dispatch(setSnackbarSeverity('error'));
      dispatch(setSnackbarOpen(true));

    }
  }
);


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
    // Reducers for managing snackbar state
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

export const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = formSlice.actions;


export default formSlice.reducer;
