import React from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyDetailsSchema } from "@/schema/recruiterSchema";

const CompanyDetailsData = ({ handleClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyDetailsSchema),
    defaultValues: {
      industry: undefined,
      companyName: undefined,
      companyDisplayName: undefined,
      hospitalType: undefined,
      designation: undefined,
      website: undefined,
      mobile: undefined,
      alternatemobile: undefined,
    },
  });

  const onSubmit = (data) => {
    handleClose();
  };

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "white",
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 3,
              gap: 1.2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit KYC Compliance Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  Company Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Company Name"
                  size="small"
                  {...register("companyName", {
                    required: "Address is required",
                  })}
                  error={!!errors.companyName}
                  helperText={errors?.companyName?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>
                  Company Type<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Comapny Type"
                  size="small"
                  {...register("companyType", {
                    required: "Address is required",
                  })}
                  error={!!errors.companyType}
                  helperText={errors?.companyType?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>
                  Industry<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Industry"
                  size="small"
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  error={!!errors.industry}
                  helperText={errors?.industry?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  Contact Person <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Contact Person"
                  size="small"
                  {...register("contactPerson", {
                    required: "Contact Person is required",
                  })}
                  error={!!errors.contactPerson}
                  helperText={errors?.contactPerson?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Designation</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Designation"
                  size="small"
                  {...register("designation")}
                  error={!!errors.designation}
                  helperText={errors?.designation?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Website</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Website"
                  size="small"
                  {...register("website")}
                  error={!!errors.website}
                  helperText={errors?.website?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Contact Number</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Your Contact Number"
                  size="small"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  helperText={errors?.mobile?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Alternate Contact Number</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Enter Contact Number"
                  size="small"
                  {...register("alternatemobile")}
                  error={!!errors.alternatemobile}
                  helperText={errors?.alternatemobile?.message}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: 100 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 100 }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default CompanyDetailsData;
