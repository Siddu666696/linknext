"use client";
import React from "react";
import UseRecruiterProfile from "@/hooks/UseRecruiterProfile";
import { configureRecruiter } from "@/lib/utils/commonFunctions";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  configureRecruiter();
  const { loading, error, authenticated } = UseRecruiterProfile();
  if (loading) {
    return <div>Loading...</div>; // Optional: Add a better loading spinner or message
  }

  if (error) {
    return <div>{error}</div>; // Optional: Display a friendly error message
  }
  return <>{authenticated&&children}</>;
};

export default layout;
