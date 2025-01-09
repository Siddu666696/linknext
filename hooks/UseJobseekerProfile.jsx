import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import {
  completeRegistration,
  login,
  logout,
} from "../redux/features/authSlice";

import { storeJobseekerProfile} from "../redux/features/jobseekerProfileSlice";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api/jobseeker/queries";
import { useAppSelector } from "@/lib/utils/reduxHooks";
const UseJobseekerProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const profile = useAppSelector(
    (state) => state.jobseekerProfile?.profileDetails
  );
  
  const getUser = useCallback(async () => {
    try {
      const user = await fetchUserAttributes();
      dispatch(login(user));
      return user;
    } catch (error) {
      console.error("Error fetching user attributes:", error);
      return null;
    }
  }, []);
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
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        if (user) {
          setAuthenticated(true);
        
          const profileDetails = !profile?.userID&& await getJobseekerProfile();
          
          dispatch(completeRegistration(true));
          if (profileDetails?.cityWithState ||profile?.cityWithState) {
          }
          else{
            router.push("/jobseeker/registration")
          }
        } else {
          await signOut();
          dispatch(logout());
          router.push("/jobseeker/signin");
        }
      } catch (err) {
        setError(err);
        console.error("Error in fetchUserData:", err);
      } finally {
        setLoading(false);
      }
    };
    if (window.location.pathname !== "/jobseeker/registration") {
      fetchUserData();
    }
    else{
        getUser()
        setLoading(false)
        setAuthenticated(true)
    }
  }, []);
  return { loading, error, authenticated };
};
export default UseJobseekerProfile;