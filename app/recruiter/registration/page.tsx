

"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  InputLabel,
  InputAdornment,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { validationSchema } from "@/schema/recruiterSchema";

const RegisterHospital = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      industry: "",
      location: null,
      areaName: "",
      pinCode: "",
      fullName: "",
      mobile: "",
      gstNumber: "",
      email: "",
      hospitalName:"",
      hospitalDisplayName:"",
      hospitalType:"",
      termsConditionAndPrivacy: false,
    },
  });

  const [locations] = useState([
    { city: "Mumbai", state: "Maharashtra" },
    { city: "Delhi", state: "Delhi" },
    { city: "Bangalore", state: "Karnataka" },
  ]);

  const selectedIndustry = watch("industry");

  const onSubmit = (data) => {
  };

  return (
    <Grid container p={2} spacing={2}>
      <Grid item xs={12} md={6}>
      </Grid>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>
                Industry <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    size="small"
                    displayEmpty
                    error={!!errors.industry}
                  >
                    <MenuItem value="">Select Industry</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="Industry">Industry</MenuItem>
                    <MenuItem value="Biotechnology">Biotechnology</MenuItem>
                    <MenuItem value="Institution">Institution</MenuItem>
                    <MenuItem value="Health Informatics">
                      Health Informatics
                    </MenuItem>
                  </Select>
                )}
              />
              {errors.industry && (
                <p style={{ color: "red" }}>{errors.industry.message}</p>
              )}
            </Grid>
            {selectedIndustry === "Hospital" && (
              <>
                <Grid item xs={12}>
                  <InputLabel>
                    Hospital Name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="hospitalName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Enter Hospital Name"
                        fullWidth
                        size="small"
                        error={!!errors.hospitalName}
                        helperText={errors.hospitalName?.message || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel>
                    Hospital Display Name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="hospitalDisplayName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Enter Hospital Display Name"
                        fullWidth
                        size="small"
                        error={!!errors.hospitalDisplayName}
                        helperText={errors.hospitalDisplayName?.message || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel>
                    Hospital Type <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="hospitalType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        size="small"
                        displayEmpty
                        error={!!errors.hospitalType}
                      >
                        <MenuItem value="">Select Hospital Type</MenuItem>
                        <MenuItem value="Super Speciality Hospital">
                          Super Speciality Hospital
                        </MenuItem>
                        <MenuItem value="Multi Speciality Hospital">
                          Multi Speciality Hospital
                        </MenuItem>
                        <MenuItem value="Clinic">Clinic</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.hospitalType && (
                    <p style={{ color: "red" }}>
                      {errors.hospitalType.message}
                    </p>
                  )}
                </Grid>
              </>
            )}
          <Grid item xs={12} md={12}>
                <InputLabel sx={{ marginBottom: 1 }}>
                  Location <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="location"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={locations}
                      getOptionLabel={(option) =>
                        `${option.city}, ${option.state}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Location"
                          variant="outlined"
                          size="small"
                          error={!!errors.location}
                          helperText={errors.location?.message}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <InputLabel>Area Name</InputLabel>
                <Controller
                  name="areaName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter AreaName"
                      fullWidth
                      size="small"
                      {...register("areaName")}
                      error={!!errors.areaName}
                      helperText={errors.areaName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Pincode</InputLabel>
                <Controller
                  name="pinCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter Pincode"
                      fullWidth
                      size="small"
                      {...register("pinCode")}
                      error={!!errors.pinCode}
                      helperText={errors.pinCode?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>Recruiter Name</InputLabel>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter RecruiterName"
                      fullWidth
                      size="small"
                      {...register("fullName")}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel sx={{ marginBottom: 1 }}>
                  Mobile Number<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Grid container>
                  <Grid item xs={2} md={2}>
                    <TextField
                      variant="outlined"
                      defaultValue="+91"
                      disabled
                      size="small"
                      sx={{
                        color: "var(--clr-blue-footer)",
                        [`& fieldset`]: {
                          borderRadius: "4px 0px 0px 4px !important",
                        },
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid black",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <TextField
                      sx={{
                        color: "var(--clr-blue-footer)",
                        [`& fieldset`]: {
                          borderRadius: "0px 4px 4px 0px !important",
                        },
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: "10.5px 14px",
                          },
                        },
                      }}
                      size="small"
                      fullWidth
                      type="text"
                      autoComplete="off"
                      placeholder="Enter Mobile Number"
                      inputProps={{ maxLength: 10 }}
                      onKeyDown={(e) => {
                        const isValidKey =
                          /^\d$/.test(e.key) ||
                          [
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key) ||
                          ((e.ctrlKey || e.metaKey) &&
                            ["v", "c", "a", "x"].includes(e.key.toLowerCase()));
                        if (!isValidKey) {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData("text");
                        if (!/^\d+$/.test(paste)) {
                          e.preventDefault();
                        }
                      }}
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      {...register("mobile")}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>
                  Email<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="email"
                      variant="outlined"
                      sx={{ my: 1 }}
                      placeholder="Enter your email"
                      autoComplete="off"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel>GSTN no</InputLabel>
                <TextField fullWidth size="small" {...register("gstNumber")} />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox {...register("termsConditionAndPrivacy")} />
                  }
                  label="I accept the terms and conditions"
                />
                {errors.termsConditionAndPrivacy && (
                  <p>{errors.termsConditionAndPrivacy.message}</p>
                )}
              </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Register Hospital
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterHospital;