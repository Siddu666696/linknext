import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import {
  completeRegistration,
  login,
  logout,
} from "../redux/features/authSlice";

import { storeRecruiterProfile } from "../redux/features/recruiterProfileSlice";
import { useRouter } from "next/navigation";
import { getRecruiterProfile } from "@/lib/api/recruiter/queries";
import { useAppSelector } from "@/lib/utils/reduxHooks";
const UseRecruiterProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const profile = useAppSelector(
    (state) => state.recruiterProfile?.profileDetails
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
  const getProfile = useCallback(async () => {
    try {
      const data = await getRecruiterProfile();
      dispatch(storeRecruiterProfile(data?.getMyProfile));
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

          const profileDetails = !profile && (await getProfile());

          dispatch(completeRegistration(true));
          if (profileDetails || profile) {
            // await fetchAndStoreRecruiters(profileDetails.company_id);
          } else {
            router.push("/recruiter/registration");
          }
        } else {
          await signOut();
          dispatch(logout());
          router.push("/recruiter/signin");
        }
      } catch (err) {
        setError(err);
        console.error("Error in fetchUserData:", err);
      } finally {
        setLoading(false);
      }
    };
    if (window.location.pathname !== "/recruiter/registration") {
      fetchUserData();
    } else {
      getUser();
      setLoading(false);
      setAuthenticated(true);
    }
  }, []);
  return { loading, error, authenticated };
};
export default UseRecruiterProfile;
