"use client";
import {
  Box,
  Button,
  Checkbox,
  // CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//   import { Link, useLocation, useNavigate } from "react-router-dom";
//   import { useDispatch } from "react-redux";
//   import { signUp } from "aws-amplify/auth";
//   import { openSnackbar } from "../../redux/features/snackbarSlice";
//   import useLoading from "../../hooks/UseLoading";
//   import { checkEmailExists } from "../../api/Open/queries";
//   import ConfigureAmplify from "../../ConfigureAmplify";
import * as yup from "yup";
import Link from "next/link";
import { PreLoginUpdate } from "../../lib/api/open/mutations/index";
import { log } from "console";
const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email/Phone is required")
    .test(
      "emailOrPhone",
      "Please enter a valid email or phone number",
      (value) => {
        // 1. Trim whitespace:
        const trimmedValue = value.trim();

        // 2. Check for email format:
        if (
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(trimmedValue)
        ) {
          return true;
        }

        // 3. Check for phone number format (Indian 10-digit starting with 6, 7, 8, or 9):
        if (/^[6-9]\d{9}$/.test(trimmedValue)) {
          return true;
        }

        // 4. Neither email nor phone format is valid:
        return false;
      }
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
const Signup = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const { loading, startLoading, stopLoading } = useLoading();

  const SignUpForm = useForm({
    defaultValues: {
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(signupSchema),
  });
  const { register, handleSubmit, formState } = SignUpForm;

  const { errors } = formState;
  const [showPassword, setShowPassword] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const rexPhone = /^[6-9]\d{9}$/;
  const rexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function createDistinctUsername() {
    const timestamp = Date.now();
    return `MR_${timestamp}`;
  }
  const signUpNewUser = (data) => {
    const attributes = rexPhone.test(attribute)
      ? { phone_number: `+91${attribute}` }
      : { email: attribute };
    return new Promise(async (resolve, reject) => {
      const response = await Auth.signUp({
        username: randomUsername,
        password: "Mlf093jna763tvsva9792adok3ndwoi3",
        attributes,
        autoSignIn: {
          enabled: true,
        },
      });
      resolve();
    });
  };
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    //   startLoading();
    const username = createDistinctUsername();
    try {
      console.log(email, password, username);
      try{
      const prelogin = await PreLoginUpdate(username);
      console.log(prelogin);
      }catch(err){}

      // const emailCheckResponse = await checkEmailExists(email);
      // if (!emailCheckResponse?.checkEmailExists) {
      //  ConfigureAmplify();
      //   await signUp({
      //     username,
      //     password,
      //     options: {
      //       userAttributes: {
      //         email,
      //       },
      //       autoSignIn: true,
      //     },
      //   });
      //   dispatch(
      //     openSnackbar({
      //       message: "An OTP has been sent to your email.",
      //       severity: false,
      //     })
      //   );
      //   navigate("/confirm-signup", {
      //     state: { username: username, email: email },
      //   });
      // } else {
      //   dispatch(
      //     openSnackbar({
      //       message: "User Already Exists",
      //       severity: true,
      //     })
      //   );
      // }
    } catch (error) {
      console.error(error);

      // dispatch(openSnackbar({ message: error.message, severity: true }));
    } finally {
      // stopLoading();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box display={"flex"} gap={1}>
        {" "}
        <Typography
          sx={{
            display: "flex",
            color: "#063E79",
            fontFamily: "Roboto",
            fontSize: "44px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          MedLink
        </Typography>
        <Typography
          sx={{
            display: "flex",
            color: "#6BAEDE",
            fontFamily: "Roboto",
            fontSize: "44px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          Hire
        </Typography>
      </Box>
      <Paper elevation={3}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
          }}
        >
          Sign up
        </Typography>
        <Divider sx={{ m: 0 }} />
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "auto",
                gap: 1.2,
                minWidth: 384,
                width: { xs: "100%", md: "100%" },
                my: 1,
              }}
            >
              <InputLabel>{"Email ID"}</InputLabel>
              <TextField
                variant="outlined"
                placeholder="Enter Email Id"
                fullWidth
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "auto",
                gap: 1.2,
                width: { xs: "100%", md: "100%" },
              }}
            >
              <InputLabel>{"Password"}</InputLabel>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                fullWidth
                size="small"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment sx={{ mr: 0.5 }} position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("password")}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
              <InputLabel>
                {"Confirm Password"} <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                fullWidth
                sx={{
                  color: "var(--clr-blue-footer)",
                  borderRadius: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment sx={{ mr: 0.5 }} position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="small"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
              <Typography
                fontSize={12}
                display={"flex"}
                alignItems={"center"}
                gap={0.5}
              >
                <Checkbox
                  onClick={() => setAcceptTerms((prev) => !prev)}
                  sx={{
                    width: 20,
                    height: 20,
                    "& .MuiSvgIcon-root": { width: 18 },
                  }}
                />
                I agree to the{" "}
                <Link
                  href={"https://www.medlinkhire.com/privacy-policy"}
                  style={{ color: "#0070b3" }}
                  target="_blank"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href={"https://www.medlinkhire.com/terms-of-service"}
                  target="_blank"
                  style={{ color: "#0070b3" }}
                >
                  Terms and Conditions
                </Link>
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                }}
                type="submit"
                disabled={!acceptTerms ? true : false}
                //   startIcon={
                //     loading && <CircularProgress size={20} color="inherit" />
                //   }
              >
                Continue
              </Button>
            </Box>
          </form>
          <Typography textAlign={"center"} p={1}>
            Already have an account?{" "}
            <Link href="/" style={{ color: "#0070B3" }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
