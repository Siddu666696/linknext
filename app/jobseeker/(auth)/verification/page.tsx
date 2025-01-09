"use client";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateIcon from "@mui/icons-material/Create";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MuiOtpInput } from "mui-one-time-password-input";
import { autoSignIn, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import UseLoading from "@/hooks/UseLoading";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { signupOtpSchema } from "@/schema/jobseekerSchema";

const SignupOtp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(signupOtpSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const dispatch = useAppDispatch();
  const { loading, startLoading, stopLoading } = UseLoading();

  const [isOtpTouched, setIsOtpTouched] = React.useState(false);
  const [otpDestination, setOtpDestination] = React.useState("");
  const [timer, setTimer] = React.useState(0);
  const [isResendDisabled, setIsResendDisabled] = React.useState(false);
  const handlePaste = (event, field) => {
    event.preventDefault();
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    const numericValue = paste.replace(/[^\d]/g, "");
    if (numericValue.length <= 6) {
      field.onChange(numericValue);
      setValue(field.name, numericValue, { shouldValidate: true });
    } else {
      field.onChange(numericValue.substring(0, 6));
      setValue(field.name, numericValue.substring(0, 6), {
        shouldValidate: true,
      });
    }
    setTimeout(() => {
      document.querySelector("input").focus();
    }, 0);
  };

  const handleSubmitForm = async ({ otp }) => {
    try {
      startLoading();
      await confirmSignUp({
        username: username,
        confirmationCode: otp,
      });
      await autoSignIn();
      router.push("/jobseeker/registration");
      dispatch(openSnackbar({ message: "Signup Successful", severity: false }));
      stopLoading();
    } catch (error) {
      console.error(error);
      dispatch(openSnackbar({ message: error.message, severity: true }));
      stopLoading();
    }
  };

  const handleResendCode = async () => {
    if (isResendDisabled) return;
    try {
      startLoading();
      const { destination } = await resendSignUpCode({
        username: username,
      });
      setOtpDestination(destination);
      dispatch(
        openSnackbar({ message: `OTP sent to ${destination}`, severity: false })
      );
      setIsResendDisabled(true);
      let countdown = 30;
      setTimer(countdown);
      const intervalId = setInterval(() => {
        countdown -= 1;
        setTimer(countdown);
        if (countdown <= 0) {
          clearInterval(intervalId);
          setIsResendDisabled(false);
        }
      }, 1000);
    } catch (error) {
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
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "22px",
            mr: 10,
          }}
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <span style={{ textAlign: "center", width: "100%" }}>
            Verification
          </span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "GrayText",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "15px",
          }}
        >
          A 6 Digit OTP has been sent to
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "var(--clr-blue-footer)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "15px",
            ml: 5,
          }}
        >
          {otpDestination || email}{" "}
          <IconButton
            color="var(--clr-blue-footer)"
            onClick={() => router.push(`/jobseeker/signup?email=${email}`)}
          >
            <CreateIcon fontSize="small" />
          </IconButton>
        </Typography>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Controller
              control={control}
              rules={{
                validate: (value) => /^\d+$/.test(value) && value.length === 6,
              }}
              render={({ field }) => (
                <Box>
                  <MuiOtpInput
                    sx={{
                      gap: 1,
                      "& input": {
                        width: "2rem",
                        height: "1rem",
                        fontSize: "1rem",
                        inputMode: "numeric",
                      },
                    }}
                    {...field}
                    length={6}
                    onChange={(value) => {
                      const numericValue = value.replace(/[^\d]/, "");
                      if (numericValue.length <= 6) {
                        field.onChange(numericValue);
                      } else {
                        field.onChange(numericValue.substring(6));
                      }
                    }}
                    onPaste={(event) => handlePaste(event, field)}
                    onBlur={() => {
                      setIsOtpTouched(true);
                      setValue(field.name, field.value, {
                        shouldValidate: true,
                      });
                    }}
                    value={field.value || ""}
                  />
                </Box>
              )}
              name="otp"
            />
          </Box>

          {errors.otp && (
            <Typography
              variant="caption"
              sx={{ color: "#db3421", ml: 1 }}
              error
            >
              {errors.otp.message}
            </Typography>
          )}
          <Typography
            variant="caption"
            sx={{
              p: 2,
              color: "GrayText",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontSize: "15px",
              textAlign: "center",
            }}
            onClick={!isResendDisabled ? handleResendCode : undefined}
          >
            {isResendDisabled
              ? `Resend in ${timer}s`
              : "Didn't receive the code? "}
            {!isResendDisabled && (
              <span style={{ color: "#005fb4", cursor: "pointer" }}>
                Resend
              </span>
            )}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
            }}
            type="submit"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            Continue
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupOtp;
