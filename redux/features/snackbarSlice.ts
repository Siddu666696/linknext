import { createSlice } from '@reduxjs/toolkit';


const initialState= {
  open: false,
  message: '',
  severity: false,
  autoHide: 6000
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
        return {
            open:true,
            message:action.payload.message,
            severity:action.payload.severity,
            autoHide:action.payload.autoHide?null:6000 
        }
    },
    closeSnackbar: (state) => {
      return initialState
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
