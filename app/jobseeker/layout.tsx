"use client";
import { ConfigureJobseekerAmplify } from "@/lib/api/jobseeker/queries";
import React, { useEffect } from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
 useEffect(() => {
   ConfigureJobseekerAmplify();
 }, [])
 

  return <>{children}</>;
};

export default Layout;
