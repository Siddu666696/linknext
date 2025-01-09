"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Autocomplete,
  Checkbox,
  Chip,
} from "@mui/material";
import { experienceValidationSchema } from "@/schema/jobseekerSchema";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface ExperienceFormData {
  experience: string;
  currentJobRole: string;
  employmentType: string;
  joiningDate: Date;
  skills: string[];
  institution: string;
  industry: string;
  otherIndustry?: string;
  department: string;
  salary: number;
}
// const [selectedDate, setSelectedDate] = useState(null);
// const [error, setError] = useState({});

export default function ExperienceForm() {
  const [experience, setExperience] = useState<string[]>([
    "6 Months",
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "6 Years",
    "7 Years",
    "8 Years",
    "9 Years",
    "10-15 Years",
    "15-20 Years",
    "20+ Years",
  ]);

  const [jobRoles, setJobRoles] = useState<string[]>([
    "Doctor",
    "Nurse",
    "Gynacologist",
    "Accountant",
    "Ortho",
  ]);

  const [skills, setSkills] = useState<string[]>([
    "ICU Nurse",
    "EMT",
    "Accountant",
    "Nurse",
    "Gynacologist",
  ]);

  const [institutions, setInstitutions] = useState<string[]>([
    "City Hospital",
    "Metro Health",
    "Global Medical Center",
    "Green Valley Hospital",
    "Sunrise Health Clinic",
  ]);
  const [selected, setSelected] = useState(null);
  const [noticePeriod, setNoticePeriod] = useState(null); // To track the notice period selection
  const [otherIndustryVisible, setOtherIndustryVisible] = useState(false);
  // const [department, setDepartments] = useState(null);
  const noticePeriods = [
    "Currently serving notice period",
    "15 days",
    "1 month",
    "2 months",
    "3 months",
    "3+ months",
  ];

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
  const departments = [
    "Anatomy",
    "Anesthesiology",
    "Biostatic",
    "Cardiology",
    "Dentistry",
    "FrontOffice",
    "Insurance",
  ];
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormData>({
    resolver: yupResolver(experienceValidationSchema),

    defaultValues: {
      experience: "",
      currentJobRole: "",
      joiningDate: undefined,
      skills: [],
      institution: "",
      industry: "",
      otherIndustry: "",
      department: "",
      salary: "",
    },
  });

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      // Implement your API submission logic here
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} p={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Work Experience
              </Typography>
            </Grid>

            {/* Total Experience */}
            <Grid item xs={12}>
              <InputLabel>
                Total Experience<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="experience"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={experience}
                    value={value || null}
                    defaultValue=""
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ my: 1 }}
                        size="small"
                        fullWidth
                        placeholder="Select Total Experience"
                        error={!!errors.experience}
                        helperText={errors.experience?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Current Job Role */}
            <Grid item xs={12}>
              <InputLabel>
                Current Job Role<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="currentJobRole"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={jobRoles}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select or Enter Current Job Role"
                        error={!!errors.currentJobRole}
                        helperText={errors.currentJobRole?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <InputLabel>
                Skills<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="skills"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    multiple
                    options={skills}
                    value={value || []}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ my: 1 }}
                        size="small"
                        fullWidth
                        placeholder="Select Skills"
                        error={!!errors.skills}
                        helperText={errors.skills?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>
                Institution<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="institution"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={institutions}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select or Enter Institution"
                        error={!!errors.institution}
                        helperText={errors.institution?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item direction={"column"} xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Checkbox
                  size="small"
                  sx={{
                    mr: 0.5,
                    height: "14px",
                    width: "14px",
                    color: "#6F7482",
                    "&.Mui-checked": {
                      color: "var(--clr-btn-primary)",
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: "#000000" }}>
                  Currently Work here
                </Typography>
              </Box>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ color: "#000000", mb: 1, px: 1 }}>
                  Are you currently serving notice period?
                  <span style={{ color: "red" }}> *</span>
                </Typography>
                {selected === null ? (
                  // Render "Yes" and "No" options initially
                  <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                    <Chip
                      label="Yes"
                      color="default"
                      onClick={() => setSelected("Yes")}
                    />
                    <Chip
                      label="No"
                      color="default"
                      onClick={() => setSelected("No")}
                    />
                  </Box>
                ) : selected === "Yes" ? (
                  // Render notice period options when "Yes" is selected
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {noticePeriod ? (
                      // Show only the selected chip
                      <Chip
                        label={noticePeriod}
                        color="primary"
                        onClick={() => setNoticePeriod(null)} // Reset selection
                      />
                    ) : (
                      // Render all chips before selection
                      noticePeriods.map((period, index) => (
                        <Chip
                          key={index}
                          label={period}
                          color="default"
                          onClick={() => setNoticePeriod(period)}
                        />
                      ))
                    )}
                  </Box>
                ) : (
                  // Render "No" chip when "No" is selected
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip
                      label="Yes"
                      color="default"
                      onClick={() => setSelected("Yes")}
                    />
                    <Chip label="No" color="primary" />
                  </Box>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>
                Industry<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="industry"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={industry}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                      if (newValue === "Other") {
                        setOtherIndustryVisible(true);
                      } else {
                        setOtherIndustryVisible(false);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select Industry"
                        error={!!errors.industry}
                        helperText={errors.industry?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {otherIndustryVisible && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Industry"
                  error={!!errors.otherIndustry}
                  helperText={errors.otherIndustry?.message}
                  {...register("otherIndustry")}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <InputLabel>
                Joining Date<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name={`joiningDate`}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        views={[ "month","year"]}
                        format="MM/YYYY"
                        sx={{ width: "100%" }}
                        size="small"
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select From Date",
                            // error=!!errors.joiningDate,
                            // helperText=errors.joiningDate?.message
                          },
                        }}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>
                Department<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={departments}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select or Enter Department"
                        error={!!errors.department}
                        helperText={errors.department?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item direction={"column"} xs={12} md={12}>
              <Box sx={{ mb: 2 }}>
                <InputLabel sx={{ py: 0.5 }}>
                  Monthly Salary
                  <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Grid container direction="row" columnSpacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {/* Prefix Field for Rupee Symbol */}
                      <TextField
                        variant="outlined"
                        value="₹"
                        size="small"
                        disabled
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              padding: "10.5px 14px",
                              textAlign: "center",
                              width: "50px !important",
                            },
                          },
                        }}
                        sx={{ borderRadius: 1 }}
                      />

                      {/* Main Salary Input Field */}
                      <TextField
                        type="text"
                        placeholder={"Enter Expected Salary"}
                        fullWidth
                        size="small"
                        sx={{ my: 1 }}
                        autoComplete="off"
                        inputMode="numeric"
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
                              ["v", "c", "a", "x"].includes(
                                e.key.toLowerCase()
                              ));
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
                        {...register("salary")}
                        error={!!errors.salary}
                        helperText={errors?.salary?.message}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
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
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </form>
      </Grid>

      <Grid item xs={6}></Grid>
    </Grid>
  );
}
