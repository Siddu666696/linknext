import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawerState: (state) => {
      return {
        open: !state?.open,
      };
    },
  },
});

export const { toggleDrawerState } = drawerSlice.actions;

export default drawerSlice.reducer;
