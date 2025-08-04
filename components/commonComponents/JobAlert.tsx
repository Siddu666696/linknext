"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { createJobAlert } from "@/lib/api/open/mutations";
import { requestForToken } from "@/lib/utils/firebaseNotifications";
import { useAppSelector } from "@/lib/utils/reduxHooks";
// import { handleCreateAlertForJob } from '@/services/jobAlertsApi';

type RootState = {
  profileDetails: {
    profileDetails: {
      userID: string;
      name?: string;
      email?: string;
    };
  };
};

type FormValues = {
  email: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
});

const JobAlert: React.FC = () => {
  const router = useRouter();
  const profileDetails = useAppSelector(
    (state) => state.jobseekerProfile?.profileDetails
  );
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: profileDetails?.email || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const token = await requestForToken();
      const params = {
        emailID: data.email,
        deviceToken: token || "", // TODO: Add push token support if needed
        registered: !!profileDetails?.userID,
        userID: profileDetails?.userID || "",
        education: searchParams.get("education") || "",
        alertName: "General Job Alert",
        exp: searchParams.get("experienceRange.min") || 0,
        hospitals: searchParams.get("hospital") || "",
        jobType: searchParams.get("jobType") || "",
        keyword: searchParams.get("query") || "",
        location: searchParams.get("location") || "",
        locationTop: searchParams.get("locationTop") || "",
        maximumSalary: searchParams.get("salary.max") || "",
        minimumSalary: searchParams.get("minimumSalary") || "",
        profession: searchParams.get("profession") || "",
        skill: searchParams.getAll("skills") || "",
        specialization: searchParams.get("specialization") || "",
      };

      const response = await createJobAlert(params);

      if (response=== "Inserted") {
        setSnackbar({
          open: true,
          message: "Job Alert created successfully!",
          severity: "success",
        });
        reset();
      } else {
        throw new Error("Failed to create Job Alert");
      }
    } catch (error) {
      console.error("Error creating job alert:", error);
      if (error?.errors?.[0]?.errorType === "AlertExists") {
        setSnackbar({
          open: true,
          message: "Job Alert already exists!",
          severity: "warning",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong. Please try again.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #E4EEF5",
        backgroundColor: "#FFF",
        maxWidth: 400,
        mx: "auto",
        p: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
        Create {!profileDetails?.name && "Free"} Job Alert
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        We’ll send you job alerts when new jobs are posted.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              placeholder="Enter your Email ID"
              variant="outlined"
              fullWidth
              value={profileDetails?.email || field.value}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              disabled={!!profileDetails?.email}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Creating..." : "Create Job Alert"}
        </Button>
      </form>

      {!profileDetails?.name && (
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#1976d2",
              }}
              onClick={() => router.push("/jobseeker/signup")}
            >
              Create your profile
            </span>{" "}
            to gain full visibility for recruiters
          </Typography>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobAlert;
