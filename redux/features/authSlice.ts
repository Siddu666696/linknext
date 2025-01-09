import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, user: null, completedRegistration:false },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state, ) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    completeRegistration : (state,action) =>{
      state.completedRegistration = action.payload
    }
  },
});

export const { login, logout,completeRegistration } = authSlice.actions;

export default authSlice.reducer