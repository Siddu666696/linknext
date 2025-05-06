"use client";
import { sendOTPToPhone, verifyOTP } from "@/lib/api/recruiter/mutations";
import { getHospital } from "@/lib/api/recruiter/queries";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { signupOtpSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: 540,
};

const VerifyPasswordModal = ({ isOpen, handleClose, close, sendOtp }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(signupOtpSchema),
    defaultValues: {
      otp: undefined,
    },
  });

  const [otpInput, setOtpInput] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [contactNumber, setContactNumber] = useState("");

  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(30);
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const res = await getHospital();
        const hospital = res?.getHospital;

        if (hospital) {
          setContactNumber(hospital.contactPhone || "");
        }
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };

    fetchHospitalData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        OTP: data.otp,
        additionalPhone: sendOtp,
      };

      const response = await verifyOTP(payload);
      if (response?.verifyOTP === "Phone Verified Successfully") {
        dispatch(
          openSnackbar({
            message: "OTP Verified successfully!",
            severity: false,
          })
        );
        close("verify");
        handleClose(true);
        router.back();
      } else {
        dispatch(
          openSnackbar({
            message: "OTP Verification failed. Please try again.",
            severity: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Something went wrong. Please try again.",
          severity: true,
        })
      );
    }
  };
  // const sendOtp = async () => {
  //     try {
  //       if (!contactNumber) {
  //         console.error("Contact number is not available.");
  //         return;
  //       }
  //       const data = await sendOTPToPhone(contactNumber);

  //       if (data?.sendOTPToPhone) {
  //         open("verify");
  //       } else {
  //         console.error("OTP sending failed");
  //       }
  //     } catch (error) {
  //       console.error("Error sending OTP:", error);
  //     }
  //   };

  return (
    <Modal
      open={isOpen("verify")}
      onClose={() => close("verify")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            height: "40vh",
            bgcolor: "white",
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "auto",
                gap: 1.2,
                width: 400,
              }}
            >
              <InputLabel sx={{ m: 0, fontSize: "20px" }}>
                Verify Phone Number
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Typography>
                Please enter the one-time code sent to {contactNumber}
              </Typography>
              <TextField
                type="text"
                fullWidth
                placeholder="Enter OTP"
                size="small"
                sx={{ my: 1 }}
                inputMode="numeric"
                value={otpInput}
                {...register("otp")}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtpInput(value);
                  setValue("otp", value);
                }}
                inputProps={{
                  maxLength: 6,
                }}
                error={!!errors.otp}
                helperText={errors?.otp?.message}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Box mt={2}>
                  {timer > 0 ? (
                    <Typography sx={{ color: "gray" }}>
                      Resend in {timer}s
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() => {
                        sendOtp();
                        startTimer();
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        fontWeight: 500,
                      }}
                    >
                      Resend Code
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="outlined" onClick={() => close("verify")}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyPasswordModal;
