"use client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import Link from "next/link";
import theme from "@/theme";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { login } from "@/redux/features/authSlice";
import { getProfile } from "@/lib/api/jobseeker/queries";
import { storeJobseekerProfile } from "@/redux/features/jobseekerProfileSlice";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import UseLoading from "../../../../hooks/UseLoading";
import { signinSchema } from "@/schema/jobseekerSchema";
import { configureJobseeker } from "@/lib/utils/commonFunctions";

const SignIn = () => {
  const EmailForm = useForm({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: yupResolver(signinSchema),
  });
  const {
    register: emailForm,
    handleSubmit: handleSubmitForm1,
    formState: EmailState,
  } = EmailForm;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, startLoading, stopLoading } = UseLoading();
  const { errors: errors1 } = EmailState;
  const [showPassword, setShowPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);

  async function signInWithPassword(username, password) {
    try {
      startLoading();
      configureJobseeker();
      await signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      const user = await getCurrentUser();

      dispatch(login(user));
      const userData = await getProfile();

      if (userData) {
        dispatch(storeJobseekerProfile(userData?.getProfile));
      } 
      dispatch(openSnackbar({ message: "Login Successful", severity: "success" }));

      if (user && !userData) {
        router.push("/registration");
      } else {
        const redirect = localStorage.getItem("postAuthRedirect") || "/jobseeker/home";
        router.push(redirect);
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error.message || "Error logging in",
          severity: "error",
        })
      );
    } finally {
      stopLoading();
    }
  }

  const onSubmit = async ({ email, password }) => {
    signInWithPassword(email, password);
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
          Sign In
        </Typography>
        <Divider sx={{ m: 0 }} />
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmitForm1(onSubmit)}>
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
                {...emailForm("email")}
                error={!!errors1.email}
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
                {...emailForm("password")}
                error={!!errors1.password}
              />
              <Link
                href={"/forgot-password"}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  mt={1}
                  variant="caption"
                >
                  <LockIcon sx={{ fontSize: "16px" }} />
                  Forgot Password?
                </Typography>
              </Link>
              <Button
                variant="contained"
                sx={{
                  py: 1.5,
                  width: "100%",
                  mt: 1,
                  mx: "auto",
                  borderWidth: "2px !important",
                }}
                type="submit"
                size="small"
                disabled={loading ? true : false}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                Submit
              </Button>
              {(errors1.password || errors1.email) && (
                <Typography
                  color={theme?.palette?.error?.main}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <ErrorOutlineIcon />
                  {errors1.password &&
                    errors1.email &&
                    "Please enter Email and Password."}
                  {errors1.password &&
                    !errors1.email &&
                    "Please enter valid Password."}
                  {!errors1.password &&
                    errors1.email &&
                    "Please enter valid Email."}
                </Typography>
              )}
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
export default SignIn;
