"use client";
import dynamic from "next/dynamic";
import React from "react";
const RecruiterRegistrationClient = dynamic(
  () => import("../../../../components/recruiter/RecruiterRegistration"),
  {
    loading: () => <div className="text-4xl">Laoding...</div>,
    ssr: false,
  }
);
const page = () => {
  return (
    <>
      <RecruiterRegistrationClient />
    </>
  );
};

export default page;
