"use client";

import { useCallback, useState } from "react";
import React from "react";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { toggleDrawerState } from "@/redux/features/drawerSlice";
import RecruiterNavbar from "./RecruiterNavbar";
import UseRecruiterProfile from "@/hooks/UseRecruiterProfile";

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, error } = UseRecruiterProfile();
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggle = useCallback(() => {
    setOpenDrawer((prev) => !prev);
    dispatch(toggleDrawerState());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <RecruiterNavbar toggle={handleToggle} />
      <Box component="main" mt={7} minHeight="80vh">
        {children}
      </Box>
    </>
  );
};

export default RecruiterLayout;
