"use client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import Link from "next/link";
import { PreLoginUpdate } from "../../../../lib/api/open/mutations/index";
import { signUp } from "aws-amplify/auth";
import { Amplify, type ResourcesConfig } from "aws-amplify";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLogin from "@/components/jobseeker/authenication/GoogleLogin";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import UseLoading from "@/hooks/UseLoading";
import { signupSchema } from "@/schema/jobseekerSchema";
import { configureJobseeker } from "@/lib/utils/commonFunctions";

const Signup = () => {
  const { loading, startLoading, stopLoading } = UseLoading();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const SignUpForm = useForm({
    defaultValues: {
      email: searchParams.get("email") || undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(signupSchema),
  });
  const { register, handleSubmit, formState } = SignUpForm;
  const router = useRouter();
  const { errors } = formState;
  const [showPassword, setShowPassword] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const rexPhone = /^[6-9]\d{9}$/;

  function createDistinctUsername() {
    const timestamp = Date.now();
    return `MR_${timestamp}`;
  }

  const signUpNewUser = async (data) => {
    configureJobseeker();
    const attributes = rexPhone.test(data.email)
      ? { phone_number: `+91${data.email}` }
      : { email: data.email };

    const response = await signUp({
      username: data.username,
      password: data.password,
      options: {
        userAttributes: {
          ...attributes,
        },
        autoSignIn: true,
      },
    });
    router.push(
      `/jobseeker/verification?username=${data.username}&email=${data.email}`
    );
  };
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    startLoading();
    const username = createDistinctUsername();
    try {
      try {
        const prelogin = await PreLoginUpdate(email);

        if (prelogin?.response?.code === "UserNotFoundException") {
          await signUpNewUser({ email, password, username });
          dispatch(
            openSnackbar({
              message: "An OTP has been sent to you.",
              severity: false,
            })
          );
        } else if (prelogin?.response === "google") {
          router.push(`/jobseeker/verification?type=google&email=${email}`);
          dispatch(
            openSnackbar({
              message: "An OTP has been sent to your email.",
              severity: false,
            })
          );
        } else if (
          prelogin?.response === "phone" ||
          prelogin?.response === "email"
        ) {
          dispatch(
            openSnackbar({ message: "User Already Exists", severity: true })
          );
          router.push(`/jobseeker/signin?email=${email}`);
        }
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error(error);

      dispatch(openSnackbar({ message: error.message, severity: true }));
    } finally {
      stopLoading();
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
          Jobseeker
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
                disabled={loading || !acceptTerms ? true : false}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                Continue
              </Button>
            </Box>
          </form>
          <Typography textAlign={"center"} p={1}>
            Already have an account?{" "}
            <Link href="/jobseeker/signin" style={{ color: "#0070B3" }}>
              Sign in
            </Link>
          </Typography>
          <GoogleLogin />
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
