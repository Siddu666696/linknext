import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";
import jobseekerProfileReducer from "./features/jobseekerProfileSlice";
import recruiterProfileReducer from "./features/recruiterProfileSlice";
import drawerReducer from "./features/drawerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      snackbar: snackbarReducer,
      jobseekerProfile: jobseekerProfileReducer,
      recruiterProfile: recruiterProfileReducer, // fixed typo here
      drawer: drawerReducer,
    },
    devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools
  });
};

// Create the actual store instance
export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
