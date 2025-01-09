import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";
import profileDetailsReducer from "./features/jobseekerProfileSlice";
import drawerReducer from "./features/drawerSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      snackbar: snackbarReducer,
      profileDetails: profileDetailsReducer,
      drawer: drawerReducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
