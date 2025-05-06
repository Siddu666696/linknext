"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import UseModalManager from "./../../hooks/UseModalManager";
import VerifyPasswordModal from "./VerifyPasswordModal";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { PasswordChangeSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getHospital, getHospitalDetails } from "@/lib/api/recruiter/queries";
import {
  sendEmail,
  sendOTPToPhone,
  UpdateHospitalNewsletter,
} from "@/lib/api/recruiter/mutations";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import LoginSessionExpiredModal from "./LoginSessionExpiredModal";

const AccountSettings = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(PasswordChangeSchema),
    defaultValues: {
      oldpassword: undefined,
      newpassword: undefined,
      confirmpassword: undefined,
    },
  });

  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { open, isOpen, close } = UseModalManager();

  const [hospitalID, setHospitalID] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const res = await getHospital();
        const hospital = res?.getHospital;

        if (hospital) {
          setHospitalID(hospital.hospitalID);
          setContactNumber(hospital.contactPhone || "");
          setIsSubscribed(hospital.newsletter === "true");
        }
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };

    fetchHospitalData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getHospitalDetails();
        const hospitalDetails = details?.getHospitalDetails;

        if (hospitalDetails) {
          setContactPhone(hospitalDetails.contactPhone || "");
          setPhoneVerified(hospitalDetails.phoneVerified === "true");
        }
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = async (event) => {
    const isChecked = event.target.checked;

    try {
      const result = await UpdateHospitalNewsletter({
        hospitalID: hospitalID,
        newsletter: isChecked.toString(),
      });
      setIsSubscribed(isChecked);

      dispatch(
        openSnackbar({
          message: isChecked
            ? "Subscribed to newsletter successfully."
            : "Unsubscribed from newsletter successfully.",
          severity: false,
        })
      );
    } catch (error) {
      console.error("Newsletter update failed:", error);
      dispatch(
        openSnackbar({
          message: "Failed to update newsletter preference.",
          severity: true,
        })
      );
    }
  };

  const handlePasswordChange = async () => {
    if (oldPassword === newPassword) {
      dispatch(
        openSnackbar({
          message: "Old and new passwords cannot be the same.",
          severity: true,
        })
      );
      return;
    }

    try {
      await sendEmail({
        templateName: "PasswordChangeTemplate",
        to: user?.email,
      });

      setShowPasswordFields(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      open("sessionExpired");
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Password change failed.",
          severity: true,
        })
      );
      console.error("Password change error:", error);
    }
  };

  const sendOtp = async () => {
    try {
      if (!contactNumber) {
        console.error("Contact number is not available.");
        return;
      }
      const data = await sendOTPToPhone(contactNumber);

      if (data?.sendOTPToPhone) {
        open("verify");
      } else {
        console.error("OTP sending failed");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center", my: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 600, p: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Account Settings
        </Typography>

        <Box mt={2}>
          <Typography variant="subtitle1">Primary Email</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">{user?.email}</Typography>
            <Avatar sx={{ width: 20, height: 20, backgroundColor: "green" }}>
              <CheckIcon sx={{ fontSize: 16 }} />
            </Avatar>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1">Contact Number</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">{contactNumber}</Typography>
            {!phoneVerified ? (
              <Avatar sx={{ width: 20, height: 20, backgroundColor: "green" }}>
                <CheckIcon sx={{ fontSize: 16 }} />
              </Avatar>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={sendOtp}
              >
                Verify
              </Typography>
            )}
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1">Newsletter Subscription</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={isSubscribed}
              onChange={handleCheckboxChange}
              color="primary"
            />
            <Typography variant="body2">Subscribe to our Newsletter</Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1">Password</Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => setShowPasswordFields(!showPasswordFields)}
          >
            Change Password
          </Typography>
        </Box>

        {showPasswordFields && (
          <Box mt={2}>
            <TextField
              type={showPasswords.oldPassword ? "text" : "password"}
              fullWidth
              size="small"
              placeholder="Enter Old Password"
              {...register("oldpassword")}
              error={!!errors.oldpassword}
              helperText={errors.oldpassword?.message}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("oldPassword")}
                    >
                      {showPasswords.oldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showPasswords.newPassword ? "text" : "password"}
              fullWidth
              size="small"
              placeholder="Enter New Password"
              margin="normal"
              {...register("newpassword")}
              error={!!errors.newpassword}
              helperText={errors.newpassword?.message}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      {showPasswords.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type={showPasswords.confirmPassword ? "text" : "password"}
              fullWidth
              size="small"
              placeholder="Confirm New Password"
              margin="normal"
              {...register("confirmpassword")}
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword?.message}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showPasswords.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => setShowPasswordFields(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordChange}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Card>

      {isOpen("verify") && (
        <VerifyPasswordModal
          isOpen={isOpen}
          close={() => close("verify")}
          sendOtp={sendOtp}
        />
      )}
      {isOpen("sessionExpired") && (
        <LoginSessionExpiredModal
          isOpen={isOpen}
          close={() => close("sessionExpired")}
        />
      )}
    </Box>
  );
};

export default AccountSettings;
