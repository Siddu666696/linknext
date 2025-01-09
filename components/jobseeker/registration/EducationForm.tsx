"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";
import { educationValidationSchema } from "@/schema/jobseekerSchema";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Predefined Data
const QUALIFICATION_OPTIONS = [
  { label: "10th", value: "10th" },
  { label: "12th", value: "12th" },
  { label: "Diploma", value: "diploma" },
  { label: "Bachelor", value: "bachelor" },
  { label: "Master", value: "master" },
  { label: "PhD", value: "phd" },
];

const COURSE_OPTIONS = [
  "Engineering",
  "Medical",
  "Management",
  "Arts",
  "Commerce",
  "Other",
];
const SPECIALIZATION_OPTIONS = [
  "Oncology",
  "Botany",
  "Biotechnology",
  "Nanotechnology",
  "Health Promotion",
];
const INSTITUTE_OPTIONS = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "University of Oxford",
  "Other",
];
const SKILL_OPTIONS = [
  "EMT",
  "Treat Patient",
  "Addiction disorders",
  "X-ray",
  "CT Scan",
  "Physical exams",
];
// Types
interface EducationFormData {
  qualifications: string[];
  course: string;
  otherCourse?: string;
  specialization: string;
  otherSpecialization?: string;
  institute: string;
  otherInstitute?: string;
  passingYear: Date;
  skills: string[];
}

export default function JobseekerEducation() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<EducationFormData>({
    resolver: yupResolver(educationValidationSchema),
    defaultValues: {
      qualifications: [],
      course: "",
      specialization: "",
      institute: "",
      passingYear: undefined,
      skills: [],
    },
  });

  const qualification = watch("qualifications");
  const course = watch("course");

  const onSubmit = async (data: EducationFormData) => {
    try {
      // Implement your API submission logic here
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const [qualifications, setQualifications] = useState<string[]>([]);

  const handleQualificationSelect = (qualification: string) => {
    const updatedQualifications = qualifications.includes(qualification)
      ? qualifications.filter((q) => q !== qualification)
      : [...qualifications, qualification];

    setQualifications(updatedQualifications);
    setValue("qualifications", updatedQualifications, { shouldValidate: true });
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} p={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Education Details
              </Typography>
            </Grid>

            {/* Qualification Chips */}
            <Grid container spacing={1} my={1}>
              {QUALIFICATION_OPTIONS.map((qual) => (
                <Grid item key={qual.value}>
                  <Chip
                    
                    label={qual.label}
                    // color={
                    //   qualifications.includes(qual.value)
                    //     ? "primary"
                    //     : "default"
                    // }
                    // variant={
                    //   qualifications.includes(qual.value)
                    //     ? "filled"
                    //     : "outlined"
                    // }
                    onClick={() => handleQualificationSelect(qual.value)}
                  />
                </Grid>
              ))}
            </Grid>
            {errors.qualifications && (
              <Typography color="error" variant="caption">
                {errors.qualifications.message}
              </Typography>
            )}

            {/* Remaining Fields (conditionally rendered) */}
            {qualification.length > 0 && (
              <>
                {/* Course Field */}
                <Grid item xs={12}>
                  <InputLabel>
                    Course <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="course"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={COURSE_OPTIONS}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            variant="outlined"
                            placeholder="Select Course"
                            error={!!errors.course}
                            helperText={errors.course?.message}
                          />
                        )}
                        onChange={(event, value) => {
                          setValue("course", value || "", {
                            shouldValidate: true,
                          });
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Other Course Field */}
                {course === "Other" && (
                  <Grid item xs={12}>
                    <Controller
                      name="otherCourse"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          placeholder="Specify Course"
                          // label="Specify Course"
                          // variant="outlined"
                          error={!!errors.otherCourse}
                          helperText={errors.otherCourse?.message}
                        />
                      )}
                    />
                  </Grid>
                )}

                {/* Specialization */}
                <Grid item xs={12}>
                  <InputLabel>
                    Specialization <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="specialization"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        freeSolo
                        options={SPECIALIZATION_OPTIONS}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Select Specialization"
                            error={!!errors.specialization}
                            helperText={errors.specialization?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                {/* Institute */}
                <Grid item xs={12}>
                  <InputLabel>
                    College/University <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="institute"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={INSTITUTE_OPTIONS}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            variant="outlined"
                            placeholder="Select College/University Name"
                            error={!!errors.institute}
                            helperText={errors.institute?.message}
                          />
                        )}
                        onChange={(event, value) => {
                          setValue("institute", value || "", {
                            shouldValidate: true,
                          });
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
              <InputLabel>
                Passing Year<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name={`passingYear`}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        views={[ "year"]}
                        format="YYYY"
                        sx={{ width: "100%" }}
                        size="small"
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select From Date",
                            // error=!!errors.passingYear,
                            // helperText=errors.passingYear?.message
                          },
                        }}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Grid>

                {/* Skills */}
                <Grid item xs={12}>
                  <InputLabel>
                    Select Skills <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Controller
                    name="skills"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        size="small"
                        options={SKILL_OPTIONS} // Dummy data
                        value={value || []}
                        onChange={(event, newValue) => onChange(newValue)} // Update field value
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            placeholder="Select Skills"
                            error={!!errors.skills}
                            helperText={errors.skills?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Submit Buttons */}
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
                <Button type="button" variant="outlined">
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
