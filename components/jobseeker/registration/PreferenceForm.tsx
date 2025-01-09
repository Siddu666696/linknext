"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { preferenceSchema } from "@/schema/jobseekerSchema";

interface PreferenceFormData {
  desiredIndustry: {
    industryID: string;
    industry: string;
  } | null;
  desiredIndustryOther: string;
  desiredRoleCategory: {
    roleCategoryID: string;
    category: string;
  } | null;
  desiredRoleCategoryOther: string;
  desiredJobType: string;
  desiredShift: string;
  desiredEmploymentType: string;
  preferredWorkLocation: Array<{
    cityID: string;
    cityName: string;
  }>;
  availabilityDay: string;
  availabilityFromTime: string;
  availabilityToTime: string;
  expectedSalary: [number, number];
  communicationPreferences: {
    email: boolean;
    phone: boolean;
    whatsApp: boolean;
    sms: boolean;
  };
  isAnywhereInIndia: boolean;
}

const JobseekerPreference: React.FC = () => {
  const router = useRouter();
  const industry = [
    "Hospital",
    "College/Institute",
    "Pharmaceutical",
    "Clinical Research",
    "Biotechnology",
    "Health Informatics",
    "Imaging & Diagnostics",
    "Medical Devices & Equipments",
    "Other",
  ];
  const JobType = ["Permanent", "Contractual"];
  const EmployeementType = ["Full Time", "Part Time", "Locum"];
  const locations = ["Hyderabad", "Bangalore", "Pune", "Mumbai", "Kerala"];
  const Days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const Time = [
    "12 AM",
    "01 AM",
    "02 AM",
    "03 AM",
    "04 AM",
    "05 AM",
    "06 AM",
    "07 AM",
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
    "09 PM",
    "10 PM",
    "11 PM",
  ];
  const [checked, setChecked] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PreferenceFormData>({
    resolver: yupResolver(preferenceSchema),
    defaultValues: {
      desiredIndustry: null,
      desiredIndustryOther: "",
      desiredRoleCategory: null,
      desiredRoleCategoryOther: "",
      desiredJobType: "",
      desiredShift: "",
      desiredEmploymentType: "",
      preferredWorkLocation: [],
      availabilityDay: "",
      availabilityFromTime: "",
      availabilityToTime: "",
      expectedSalary: [1, 99],
      communicationPreferences: {
        email: true,
        phone: false,
        whatsApp: false,
        sms: false,
      },
      isAnywhereInIndia: false,
    },
  });

  const onSubmit = async (data: PreferenceFormData) => {
    try {
    } catch (error) {
      console.error("Failed to save preferences", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
          <Typography variant="h6">Job Preferences</Typography>

          <Grid container spacing={3}>
            {/* Desired Industry */}
            <Grid item xs={12}>
              <InputLabel>Desired Industry (optional)</InputLabel>
              <Controller
                name="desiredIndustry"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={industry}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                      // if (newValue === "Other") {
                      //   setOtherIndustryVisible(true);
                      // } else {
                      //   setOtherIndustryVisible(false);
                      // }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select Industry"
                        error={!!errors.desiredIndustry}
                        helperText={errors.desiredIndustry?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Desired Job Type (Optional)</InputLabel>
              <Controller
                name="desiredJobType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={JobType}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select Desired Job Type"
                        error={!!errors.desiredJobType}
                        helperText={errors.desiredJobType?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Desired Employment Type (Optional)</InputLabel>
              <Controller
                name="desiredEmploymentType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={EmployeementType}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select Desired Employment Type"
                        error={!!errors.desiredEmploymentType}
                        helperText={errors.desiredEmploymentType?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Desired Employment Type (Optional)</InputLabel>
              <Controller
                name="preferredWorkLocation"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={locations}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select Desired Location"
                        error={!!errors.preferredWorkLocation}
                        helperText={errors.preferredWorkLocation?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Communication Preferences (Optional)</InputLabel>
              <Controller
                name="communicationPreferences"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value?.email || false}
                          onChange={(e) =>
                            onChange({
                              ...value,
                              email: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Email"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value?.phone || false}
                          onChange={(e) =>
                            onChange({
                              ...value,
                              phone: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Phone"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value?.whatsApp || false}
                          onChange={(e) =>
                            onChange({
                              ...value,
                              whatsApp: e.target.checked,
                            })
                          }
                        />
                      }
                      label="WhatsApp"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value?.sms || false}
                          onChange={(e) =>
                            onChange({
                              ...value,
                              sms: e.target.checked,
                            })
                          }
                        />
                      }
                      label="SMS"
                    />
                  </FormGroup>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Available Timings (Optional)</InputLabel>
              <Controller
                name="availabilityDay"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={Days}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Day"
                        error={!!errors.availabilityDay}
                        helperText={errors.availabilityDay?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="availabilityFromTime"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={Time}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="From Time"
                        error={!!errors.availabilityFromTime}
                        helperText={errors.availabilityFromTime?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="availabilityToTime"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={Time}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="To Time"
                        error={!!errors.availabilityToTime}
                        helperText={errors.availabilityToTime?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Divider
              sx={{ backgroundColor: "#E4EEF5", my: 4, width: "96%",mx:3 }}
            ></Divider>

            <Grid item direction={"column"} xs={12}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000000",
                    mt: 1,
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  Actively searching for a job
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >
                  <Checkbox
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                  />
                  Subscribe to MedLink newsletter
                </Typography>
              </Box>
            </Grid>
            {/* <Grid item direction={"column"} xs={12} >
                     
                    </Grid> */}
            {/* <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    // Handle back action
                  }}
                >
                  Skip
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  );
};

export default JobseekerPreference;
