// Form components
"use client";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Card,
  Typography,
  Container,
  Skeleton,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  Visibility,
  VisibilityOff,
  DeleteForever,
} from "@mui/icons-material";
import { useState } from "react";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { updateDb } from "@/lib/api/jobseeker/mutations";
import { updatePassword } from "aws-amplify/auth";

// Custom form components
const FormInput = ({
  control,
  name,
  label,
  type = "text",
  rules = {},
  defaultValue = "",
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            type={type}
            label={label}
            error={!!error}
            helperText={error?.message}
            fullWidth
            margin="normal"
            {...props}
          />
        </>
      )}
    />
  );
};

const FormPassword = ({ form,control, name, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log(form?.formState,"errors");
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: `${name} is required`,
        pattern: {
          value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
          message: "Invalid phone number",
        },
      }}
    
      render={({ field }) => (
        <>
          <TextField
            {...field}
            type={showPassword ? "text" : "password"}
            label={label}
            error={!!form?.formState?.errors?.[name]}
            helperText={form?.formState?.errors?.[name]?.message}
            fullWidth
            margin="normal"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            {...props}
          />
        </>
      )}
    />
  );
};

// Main component
const JobseekerAccountSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const profile = useAppSelector(
    (state) => state.jobseekerProfile?.profileDetails
  );
  console.log("profile", profile);
  const form = useForm({
    defaultValues: {
      email: profile?.email || "",
      phone: profile?.phone || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const handleUpdateProfile = async (data) => {
    setIsLoading(true);
    const res = await updateDb(data);
  };
  // Form handlers
  const onSubmit = async (data) => {
    try {
      // Handle form submission
      if (edit === "email" || edit === "phone") {
        const res = await handleUpdateProfile(data);
        console.log("Profile updated:", res);
      } else if (edit === "password") {
        const res = updatePassword({
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword,
        });
        console.log("Password updated:", res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Account Settings
        </Typography>

        {/* Email Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Primary Email
          </Typography>

          {isLoading ? (
            <Skeleton width={200} height={24} />
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{profile?.email}</Typography>
              {edit !== "email" && (
                <IconButton onClick={() => setEdit("email")} size="small">
                  <Edit sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>
          )}

          {edit === "email" && (
            <Box
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  display: "flex",
                  justifySelf: "end",
                  alignSelf: "center",
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>

        {/* Phone Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Contact Number
          </Typography>

          {isLoading ? (
            <Skeleton width={200} height={24} />
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{profile?.phone}</Typography>
              {edit !== "phone" && (
                <IconButton onClick={() => setEdit("phone")}>
                  <Edit sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>
          )}

          {edit === "phone" && (
            <Box
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              <FormInput
                control={form.control}
                name="phone"
                label="Phone Number"
                type="tel"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
                    message: "Invalid phone number",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  display: "flex",
                  justifySelf: "end",
                  alignSelf: "center",
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>

        {/* Password Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Password
          </Typography>

          {!isLoading && (
            <>
              {edit !== "password" && (
                <Button
                  onClick={() => setEdit("password")}
                  startIcon={<Visibility />}
                >
                  Change Password
                </Button>
              )}

              {edit === "password" && (
                <Box
                  component="form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  sx={{ mt: 2 }}
                >
                  <FormPassword
                  form={form}
                    control={form.control}
                    name="current-Password"
                    label="Current Password"
                  />
                  <FormPassword
                    form={form}
                    control={form.control}
                    name="new-password"
                    label="New Password"
                  />
                  <FormPassword
                    form={form}
                    control={form.control}
                    name="confirm-new-password"
                    label="Confirm New Password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      display: "flex",
                      justifySelf: "end",
                      alignSelf: "center",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Delete Account */}
        {!isLoading && (
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<DeleteForever />}
              color="error"
              onClick={() => handleOpenDeleteAccountModal()}
            >
              Request delete account
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default JobseekerAccountSettings;
