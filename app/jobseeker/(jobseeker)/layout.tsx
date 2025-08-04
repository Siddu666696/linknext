"use client";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Box } from "@mui/material";
import JobseekerNavbar from "../../../components/jobseeker/JobseekerNavbar";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { toggleDrawerState } from "@/redux/features/drawerSlice";
import Sidebar from "../../../components/jobseeker/Sidebar";
import UseJobseekerProfile from "@/hooks/UseJobseekerProfile";
import { ConfigureJobseekerAmplify } from "@/lib/api/jobseeker/queries";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, authenticated } = UseJobseekerProfile();
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleToggle = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);
  useEffect(() => {
    ConfigureJobseekerAmplify();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Optional: Add a better loading spinner or message
  }

  if (error) {
    return <div>{error}</div>; // Optional: Display a friendly error message
  }

  return (
    <>
      <JobseekerNavbar
        toggle={() => {
          handleToggle();
          dispatch(toggleDrawerState());
        }}
      />
      <Box mt={7}>{children}</Box>
      {openDrawer && <Sidebar open={openDrawer} />}
    </>
  );
};

export default Layout;
