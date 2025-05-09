import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";
import jobseekerProfileReducer from "./features/jobseekerProfileSlice";
import recruiterProfileReducer from "./features/jobseekerProfileSlice";

import drawerReducer from "./features/drawerSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      snackbar: snackbarReducer,
      jobseekerProfile: jobseekerProfileReducer,
      drawer: drawerReducer,
      recruiterProfile:recruiterProfileReducer
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
