import { createSlice } from "@reduxjs/toolkit";

const jobseekerProfileSlice = createSlice({
  name: "jobseekerProfile",
  initialState: { profileDetails:null },
  reducers: {
    storeJobseekerProfile: (state, action) => {
     state.profileDetails=action.payload
    },
    resetJobseekerProfile:(state)=>{
      state.profileDetails=null
    }
   
  },
});

export const { storeJobseekerProfile,resetJobseekerProfile } = jobseekerProfileSlice.actions;

export default jobseekerProfileSlice.reducer