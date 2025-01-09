import { Amplify, Hub } from "aws-amplify";
import { Button, Typography } from "@mui/material";
// import googleIcon from "../../../assets/icons/googleIcon.svg";
import React, { useEffect } from "react";
import { signInWithRedirect } from "aws-amplify/auth"
// import { useNavigate } from "react-router-dom";
// import { gqlquery, QUERY_LISTPROFILES } from "../../../api";
// import useApplicationState from "../../../hooks/useApplicationState";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID}`,
      userPoolClientId: `${process.env.REACT_APP_GOOGLE_LOGIN_USER_POOL_WEB_CLIENT_ID}`,
      // region: 'ap-south-1',
      loginWith: {
        oauth: {
          domain: `${process.env.REACT_APP_COGNITO_CUSTOM_DOMAIN}`,
          scopes: [
            "profile",
            "email",
            "openid",
            "phone",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: [
            `${process.env.REACT_APP_GOOGLE_REDIRECT_SIGNIN_PATH}`,
          ],
          redirectSignOut: [
            `${process.env.REACT_APP_GOOGLE_REDIRECT_SIGNOUT_PATH}`,
          ],
          responseType: "code",
          providers: ["Google"],
          //   options: {
          //     Google: {
          //       clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
          //       responseType: "code",
          //       scope: [
          //         "profile",
          //         "email",
          //         "openid",
          //         "phone",
          //         "aws.cognito.signin.user.admin",
          //       ],
          //     },
          //   },
        },
      },
    },
  },
});

function GoogleLogin() {
  //   const navigate = useNavigate();
  //   const { setVerificationUpdated } = useApplicationState();

  //   useEffect(() => {
  //     const unsubscribe = Hub.listen("auth", ({ payload }) => {
  //       const { event } = payload;
  //       if (event === "cognitoHostedUI") {
  //         Auth.currentSession().then(async (data) => {
  //           const accessToken = data.accessToken.jwtToken;
  //           const refreshToken = data.refreshToken.token;
  //           const idToken = data.idToken.jwtToken;
  //           localStorage.setItem("accessToken", accessToken);
  //           localStorage.setItem("refreshToken", refreshToken);
  //           localStorage.setItem("idToken", idToken);
  //           localStorage.setItem("flow", "jobSeeker");
  //           unsubscribe();
  //           gqlquery(QUERY_LISTPROFILES, null)
  //             .then((res) => res.json())
  //             .then((datas) => {
  //               if (datas?.data?.getProfile?.name) navigate("/profile-home");
  //               else navigate("/create-profile");
  //             });
  //           setVerificationUpdated((pre) => !pre);
  //         });
  //       }
  //     });
  //   }, []);

  return (
    <>
      <Button
        onClick={() => {
          signInWithRedirect({ provider: "Google" });
        }}
        variant="outlined"
        sx={{
          width: { md: "80%" },
          py: 1.2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2.5,
          borderRadius: "6px",
          border: "1px solid white !important",
          boxShadow:
            "0px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* <img src={googleIcon} height="18px" width="18px" alt="google icon" /> */}
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
            fontWeight: "600 !important",
            letterSpacing: 1.3,
            lineHeight: 2,
          }}
        >
          Login
        </Typography>
      </Button>
    </>
  );
}

export default GoogleLogin;
