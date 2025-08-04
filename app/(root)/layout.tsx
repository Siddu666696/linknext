"use client";
import UseJobseekerProfile, {
  getJobseekerProfile,
  getUser,
} from "@/hooks/UseJobseekerProfile";
import { getProfile } from "@/lib/api/jobseeker/queries";
import { configureJobseeker } from "@/lib/utils/commonFunctions";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { storeJobseekerProfile } from "@/redux/features/jobseekerProfileSlice";
import React, { useCallback, useEffect } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const dispatch = useAppDispatch();
  
  const getJobseekerProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      dispatch(storeJobseekerProfile(data?.getProfile));
      return data?.getProfile;
    } catch (error) {
      console.error("Error fetching user profile details:", error);
    }
  }, []);
  useEffect(() => {
    configureJobseeker();
    getJobseekerProfile();
  }, []);
  // const { loading, error, authenticated } = UseJobseekerProfile();

  return <>{children}</>;
};

export default Layout;
