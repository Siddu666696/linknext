import { createSlice } from "@reduxjs/toolkit";

const recruiterProfileSlice = createSlice({
  name: "recruiterProfile",
  initialState: { profileDetails:null },
  reducers: {
    storeRecruiterProfile: (state, action) => {
     state.profileDetails=action.payload
    },
    resetRecruiterProfile:(state)=>{
      state.profileDetails=null
    }
   
  },
});

export const { storeRecruiterProfile,resetRecruiterProfile } = recruiterProfileSlice.actions;

export default recruiterProfileSlice.reducer