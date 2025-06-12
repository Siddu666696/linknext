"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";

const PostaJobClient = dynamic(
  () => import("../../../../components/recruiter/JobModule"),
  {
    loading: () => <div className="text-4xl">Laoding...</div>,
    ssr: false,
  }
);

const Page = () => {
  return (
    <Box>
      <PostaJobClient />
      {/* post job */}
    </Box>
  );
};
export default Page;
