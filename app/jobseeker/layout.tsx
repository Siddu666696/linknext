"use client";
import { ConfigureJobseekerAmplify } from "@/lib/api/jobseeker/queries";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
 ConfigureJobseekerAmplify()
  return <>{children}</>;
};

export default layout;
