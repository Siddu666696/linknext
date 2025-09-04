"use client";

import React, { useEffect, useState } from "react";
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
import {
  getCourseId,
  getCourseMaster,
  getEducationList,
  getQualifications,
  getSkillMaster,
  getSpecialization,
  getUniversityId,
} from "@/lib/api/jobseeker/queries";

// Predefined Data
const QUALIFICATION_OPTIONS = [
  { label: "10/12th", value: "10/12th" },
  { label: "Doctorate/PhD", value: "Doctorate/PhD" },
  { label: "Masters/Post-Graduation", value: "Masters/Post-Graduation" },
  { label: "Fellowship/Certificate", value: "Fellowship/Certificate" },
  { label: "Graduation/Diploma", value: "Graduation/Diploma" },
  { label: "Other", value: "Other" },
];

// const SPECIALIZATION_OPTIONS = [
//   "Oncology",
//   "Botany",
//   "Biotechnology",
//   "Nanotechnology",
//   "Health Promotion",
// ];

// Types
interface EducationFormData {
  qualifications: string;
  course: object;
  otherCourse?: string;
  specialization: object;
  otherSpecialization?: object;
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
      qualifications: "",
      course: { course: "" },
      specialization: { specialization: "" },
      institute: " ",
      passingYear: undefined,
      skills: [],
    },
  });

  const qualification = watch("qualifications");
  const course = watch("course");
  console.log(qualification);
  console.log(course);

  const onSubmit = async (data: EducationFormData) => {
    try {
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const [qualifications, setQualifications] = useState<string[]>([]);
  // console.log(qualifications)

  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [specializationOptions, setSpecializationOptions] = useState<string[]>([]);
  const [universityId, setUniversityId] = useState<string[]>([]);
  const [skillMaster, setSkillMaster] = useState<string[]>([]);

  const handleQualificationSelect = (qualification: string) => {
    setQualifications([qualification]);
    setValue("qualifications", [qualification], { shouldValidate: true });
  };

  useEffect(() => {
    try {
      const fetchCourse = () => {
        getCourseMaster({
          industry: "other",
          qualification: qualification[0],
        }).then((res) => {
          console.log(res);
          setCourseOptions(res.getCourse);
        });
      };
      if (qualification.length) {
        fetchCourse();
      }
    } catch (err) {
      console.error(err);
    }
  }, [qualification]);

  useEffect(() => {
    try {
      const fetchSpecialization = () => {
        getSpecialization({
          course: course.course,
          industry : "other",
          qualification : qualification[0],
          specialization : ""
        }).then((res) => {
          console.log(res, "getSpecialization API Response")
          setSpecializationOptions(res.getSpecialization)
        })
      }
      if (course?.course) {
      fetchSpecialization();
      }
    } catch (err) {
      console.error(err);
    }
  }, [course])

  const fetchUniversityId = () => {
    getUniversityId().then((res) => {
      // console.log(res, "fetchUniversityId API Response");
      setUniversityId(
        res.getUniversityMaster.map((id) => {
          // console.log(id);
          return id.name;
        })
      );
    });
  };
  const fetchSkillMaster = () => {
    getSkillMaster().then((res) => {
      // console.log(res, "fetchSkillMaster API Response");
      setSkillMaster(res.getSkillMaster);
      console.log(res.getSkillMaster);
    });
  };

  useEffect(() => {
    try {
      fetchUniversityId();
      fetchSkillMaster();
    } catch (err) {
      console.error(err);
    }
  }, []);

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
                        onChange = {(event, value) => field.onChange(value) }
                        options={courseOptions}
                        getOptionLabel={(option) => option?.course}
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
                        // onChange={(event, value) => {
                        //   setValue("course", value, {
                        //     shouldValidate: true,
                        //   });
                        // }}
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
                        options={specializationOptions}
                        getOptionLabel={(option)=> option.specialization}
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
                        options={universityId}
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
                            views={["year"]}
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
                        options={skillMaster}
                        getOptionLabel={(option) => option.name}
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
