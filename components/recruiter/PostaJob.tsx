"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Chip,
  Autocomplete,
  MenuItem,
  ListItemText,
} from "@mui/material";
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  DateRange as DateIcon,
} from "@mui/icons-material";
import { vacancyValidationSchema } from "@/schema/recruiterSchema";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  getCourse,
  searchDepartment,
  searchJobRole,
  searchSkill,
} from "@/lib/api/recruiter/queries";
import { searchCity } from "@/lib/api/open/queries";
import debounce from "lodash/debounce";

const QUALIFICATIONS = ["Any Graduate", "Diploma", "Bachelor", "Master", "PhD"];
const skillsData = ["Dancing", "Drawing", "singing"];
const COURSES = {
  Diploma: ["Engineering", "Design", "Management"],
  Bachelor: ["B.Sc", "B.Com", "B.Tech"],
  Master: ["M.Sc", "MBA", "M.Tech"],
  PhD: ["Physics", "Chemistry", "Mathematics"],
};
interface VacancyFormData {
  jobTitle: string;
  otherJobRole?: string;
  location: string;
  qualification: string;
  course: string;
  jobType: string;
  jobShift: string;
  department: string;
  gender: string;
  skills: string;
  personName: string;
  phoneNumber: number;
  googleMap: string;
  address: string;
  experienceMin: number;
  experienceMax: number;
  fromDate: Date;
  toDate: Date;
  fromTime: Date;
  toTime: Date;
  lastDateToApply: Date;
  description: string;
  salaryRangeMin: number;
  salaryRangeMax: number;
  NotWillingToDisclose: boolean;
}
export default function PostaJob() {
  // const [selectedQualification, setSelectedQualification] = useState("");
  // const [selectedCourses, setSelectedCourses] = useState([]);

  // const handleQualificationChange = (event, value) => {
  //   setSelectedQualification(value);
  //   setSelectedCourses([]); // Reset courses when qualification changes
  //   setValue("qualification", value || "", {
  //     shouldValidate: true,
  //   });
  // };

  // const handleCourseChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedCourses(typeof value === "string" ? value.split(",") : value);
  // };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    register,
    setValue,
    clearErrors,
    setError,
  } = useForm<VacancyFormData>({
    resolver: yupResolver(vacancyValidationSchema),
    defaultValues: {
      jobTitle: undefined,
      location: undefined,
      qualification: undefined,
      course: undefined,
      jobType: "Full Time",
      department: undefined,
      phoneNumber: "",
      personName: "",
      numberOfPosition: "",
      googleMap: "",
      address: "",
      experienceMin: 0,
      experienceMax: 1,
      lastDateToApply: new Date(),
      description: "",
      salaryRangeMin: 0,
      salaryRangeMax: 0,
      NotWillingToDisclose: false,
    },
  });
  const qualifications = watch("qualification");
  const course = watch("course");

  const notWillingToDisclose = watch("NotWillingToDisclose");
  const [today, setToday] = useState();
  const [jobRoleData, setJobRoleData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [dptData, setDptData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [skillData, setSkillData] = useState([]);
  const [skilledData, setSkilledData] = useState([]);
  // const [selectedQualification, setSelectedQualification] = useState<string | null>(null);

  useEffect(() => {
    handleJobRoleSearch("");
    handleDepartmentSearch("");
    handleLocationSearch("");
    handleSkillSearch("");
    setToday(dayjs());
  }, []);
  const onSubmit = (data) => {};

  const jobTitleValue = watch("jobTitle") || "";

  const handleInputChange = (debouncedSearch) => (event) => {
    const value = event.target.value;
    debouncedSearch(value);
  };

  const handleJobRoleSearch = useCallback(async (query) => {
    try {
      const data = await searchJobRole(query);
      setJobRoleData(data?.searchJobRole);

      if (query === "") {
        setRoleData(data?.searchJobRole);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  const handleDepartmentSearch = useCallback(async (query) => {
    try {
      const data = await searchDepartment(query);
      setDepartmentData(data?.searchDepartment);

      if (query === "") {
        setDptData(data?.searchDepartment);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  const handleLocationSearch = useCallback(async (query) => {
    try {
      const data = await searchCity(query);
      setLocationData(data?.searchCity);

      if (query === "") {
        setCityData(data?.searchCity);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  const handleSkillSearch = useCallback(async (query) => {
    try {
      const data = await searchSkill(query);
      setSkillData(data?.searchSkill);

      if (query === "") {
        setSkilledData(data?.searchSkill);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  const debouncedSkillSearch = useMemo(
    () => debounce(handleSkillSearch, 500),
    [handleSkillSearch]
  );
  const debouncedLocationSearch = useMemo(
    () => debounce(handleLocationSearch, 500),
    [handleLocationSearch]
  );
  const debouncedDepartmentSearch = useMemo(
    () => debounce(handleDepartmentSearch, 500),
    [handleDepartmentSearch]
  );

  const debouncedJobRoleSearch = useMemo(
    () => debounce(handleJobRoleSearch, 500),
    [handleJobRoleSearch]
  );
  useEffect(() => {
    return () => {
      debouncedJobRoleSearch.cancel();
      debouncedDepartmentSearch.cancel();
      debouncedLocationSearch.cancel();
      debouncedSkillSearch.cancel();
    };
  }, [
    debouncedJobRoleSearch,
    debouncedDepartmentSearch,
    debouncedLocationSearch,
    debouncedSkillSearch,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCourse();
        if (res?.getCourse) {
          setQualificationData(res.getCourse);
        } else {
          setQualificationData([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setQualificationData([]);
      }
    };
    fetchData();
  }, []);
  const [selectedQualification, setSelectedQualification] = useState("");
  const [qualificationData, setQualificationData] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const handleQualificationChange = (event, value) => {
    setSelectedQualification(value);
    setSelectedCourses([]); // Reset selected courses
    setValue("qualification", value || "", {
      shouldValidate: true,
    });
  };

  const handleCourseChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourse(qualifications?.[0]);
        if (res && res?.getCourse) {
          setCourses(res?.getCourse);
        } else {
          console.error("Invalid response from getCourse:", res);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    if (qualifications?.[0]) {
      fetchCourses();
    }
  }, [qualifications]);

  return (
    <Grid container spacing={2} p={1}>
      <Grid item md={6} xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Create Job Vacancy
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>
                Job Title<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    fullWidth
                    size="small"
                    options={jobRoleData}
                    getOptionLabel={(option) => option?.name}
                    filterOptions={(x) => x}
                    value={watch("jobTitle")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option?.dmID}>
                          {option?.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          onKeyDown: (e) => {
                            const input = e.target.value;
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                            if (e.key === " ") {
                              if (input.length === 0) {
                                e.preventDefault();
                              }
                              if (input.slice(-1) === " ") {
                                e.preventDefault();
                              }
                            }
                          },
                        }}
                        placeholder="Enter Job Title"
                        error={!watch("jobTitle") && !!errors.jobTitle}
                        helperText={
                          !watch("jobTitle") && errors.jobTitle?.message
                        }
                        {...register("otherJobRole")}
                        onChange={handleInputChange(debouncedJobRoleSearch)}
                      />
                    )}
                    onChange={(event, value) => {
                      onChange(value);
                      setJobRoleData(roleData);
                    }}
                  />
                )}
              />
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
                    options={departmentData}
                    getOptionLabel={(option) => option?.name}
                    filterOptions={(x) => x}
                    value={watch("department")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option?.departmentID}>
                          {option?.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select or Enter Department"
                        error={!!errors.department}
                        helperText={errors.department?.message}
                        onChange={handleInputChange(debouncedDepartmentSearch)}
                      />
                    )}
                    onChange={(event, value) => {
                      onChange(value);
                      setDepartmentData(dptData);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <InputLabel sx={{ paddingBottom: 1 }}>
                  Number of Positions <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="number"
                  placeholder={"Enter Number of Positions"}
                  fullWidth
                  size="small"
                  // sx={{ width: 600 }}
                  autoComplete="off"
                  inputMode="numeric"
                  {...register("numberOfPosition")}
                  error={!!errors.numberOfPosition}
                  helperText={errors?.numberOfPosition?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Job Type<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.jobType}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Full-time", "Part-time", "Locum"].map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          clickable
                          color={field.value === type ? "primary" : "default"}
                          onClick={() => field.onChange(type)}
                        />
                      ))}
                    </div>
                    {errors.jobType && (
                      <FormHelperText>{errors.jobType.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Job Shift<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="jobShift"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.jobShift}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Day", "Night", "Rotational"].map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          clickable
                          color={field.value === type ? "primary" : "default"}
                          onClick={() => field.onChange(type)}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </div>
                    {errors.jobShift && (
                      <FormHelperText>
                        {errors?.jobShift?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Locations <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="location"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={locationData}
                    getOptionLabel={(option) => option?.cityWithState}
                    filterOptions={(x) => x}
                    value={watch("location")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option?.lmID}>
                          {option?.cityWithState}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter Location"
                        size="small"
                        fullWidth
                        // sx={{ width: 600 }}
                        variant="outlined"
                        onChange={handleInputChange(debouncedLocationSearch)}
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
                    onChange={(event, value) => {
                      onChange(value);
                      setLocationData(cityData);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Gender <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Male", "Female", "Any"].map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          clickable
                          color={field.value === type ? "primary" : "default"}
                          onClick={() => field.onChange(type)}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </div>
                    {errors.gender && (
                      <FormHelperText>{errors.gender.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Qualification Dropdown */}
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Qualifications <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="qualification"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={QUALIFICATIONS}
                    freeSolo
                    value={watch("qualification")}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        placeholder="Select or Enter Qualification"
                        error={!!errors.qualification}
                        helperText={errors.qualification?.message || ""}
                      />
                    )}
                    onChange={handleQualificationChange}
                  />
                )}
              />
            </Grid>

            {/* Course Dropdown (Dependent on Qualification) */}
            {selectedQualification && COURSES[selectedQualification] && (
              <Grid item xs={12}>
                <InputLabel sx={{ my: 1 }}>
                  Courses <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    multiple
                    value={selectedCourses}
                    onChange={handleCourseChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {COURSES[selectedQualification].map((course) => (
                      <MenuItem key={course} value={course}>
                        <Checkbox checked={selectedCourses.includes(course)} />
                        <ListItemText primary={course} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* {selectedQualification && qualificationData[selectedQualification] && (
        <Grid item xs={12}>
          <InputLabel sx={{ my: 1 }}>
            Courses <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormControl sx={{ width: 300 }}>
            <Select
              multiple
              value={qualificationData}
              onChange={handleCourseChange}
              // input={<OutlinedInput label="Courses" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {qualificationData[selectedQualification].map((course) => (
                <MenuItem key={course} value={course}>
                  <Checkbox checked={selectedCourses.includes(course)} />
                  <ListItemText primary={course} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )} */}

            <Grid item xs={12} md={6} sx={{}}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "#595959",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "22px",
                    paddingBottom: 1,
                  }}
                >
                  Experience
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <InputLabel>
                    Min Experience<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    type="text"
                    placeholder={"Enter Min Experience"}
                    size="small"
                    fullWidth
                    autoComplete="off"
                    inputMode="decimal"
                    inputProps={{ maxLength: 4 }}
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
                    {...register("experienceMin")}
                    error={!!errors.experienceMin}
                    helperText={errors?.experienceMin?.message}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>
                    Max Experience<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    type="text"
                    placeholder={"Enter Max Experience"}
                    size="small"
                    fullWidth
                    autoComplete="off"
                    inputMode="decimal"
                    inputProps={{ maxLength: 4 }}
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
                    {...register("experienceMax")}
                    error={!!errors.experienceMax}
                    helperText={errors?.experienceMax?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="NotWillingToDisclose"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    }
                    label="Not Willing to Disclose Salary"
                  />
                )}
              />
            </Grid>
            {!notWillingToDisclose && (
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    color: "#595959",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "22px",
                    paddingBottom: 1,
                  }}
                >
                  Salary
                </Typography>
                <Grid container spacing={1}>
                  <Grid item md={6}>
                    <InputLabel>
                      Min Salary <span style={{ color: "red" }}>*</span>
                    </InputLabel>

                    <TextField
                      type="text"
                      placeholder="Enter Min Salary"
                      size="small"
                      autoComplete="off"
                      inputMode="numeric"
                      inputProps={{
                        maxLength: 10,
                      }}
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
                      {...register("salaryRangeMin")}
                      error={!!errors?.salaryRangeMin}
                      helperText={errors?.salaryRangeMin?.message}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <InputLabel>
                      Max Salary <span style={{ color: "red" }}>*</span>
                    </InputLabel>

                    <TextField
                      type="text"
                      placeholder="Enter Max Salary"
                      size="small"
                      autoComplete="off"
                      inputMode="numeric"
                      inputProps={{
                        maxLength: 10,
                      }}
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
                      {...register("salaryRangeMax")}
                      error={!!errors.salaryRangeMax}
                      helperText={errors?.salaryRangeMax?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box>
                <InputLabel sx={{ paddingBottom: 1 }}>
                  Required Skills <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      id="free-solo-demo"
                      size="small"
                      value={watch("skills")}
                      onChange={(event, newValue) => onChange(newValue)}
                      options={skillData}
                      getOptionLabel={(option) => option?.name}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option?.skillID}>
                            {option?.name}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          // sx={{ width: 600 }}
                          placeholder="Select Skills"
                          error={!!errors.skills}
                          helperText={errors?.skills?.message}
                          onChange={handleInputChange(debouncedSkillSearch)}
                        />
                      )}
                      onChange={(event, values) => {
                        if (values.length <= 10) {
                          onChange(values);
                          clearErrors("skills");
                        } else {
                          setError("skills", {
                            message: "You can select up to 10 skills",
                          });
                        }
                        setSkillData(skilledData);
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }}>
                Description <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    // sx={{ width: 600 }}
                    multiline
                    rows={4}
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox {...register("showWalkInDetails")} />}
                label="Show Walk-in Interview Details"
              />
            </Grid>
            {watch("showWalkInDetails") && (
              <Box>
                {today && (
                  <Grid container spacing={2} p={1}>
                    <Grid item xs={12}>
                      <InputLabel>
                        From Date<span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="fromDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  placeholder: "Select From Date",
                                  error: !!errors.fromDate,
                                  helperText: errors?.fromDate?.message,
                                },
                              }}
                              minDate={today}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>
                        To Date<span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="toDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  placeholder: "Select To Date",
                                  error: !!errors.toDate,
                                  helperText: errors?.toDate?.message,
                                },
                              }}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>
                        Contact Person Name
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Controller
                        name="personName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter Person Name"
                            size="small"
                            fullWidth
                            {...register("personName")}
                            error={!!errors.personName}
                            helperText={errors.personName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>
                        Contact Person PhoneNumber
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter Phone Number"
                            size="small"
                            fullWidth
                            {...register("phoneNumber")}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>
                        Google Map URL<span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Controller
                        name="googleMap"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter Google Map URL"
                            size="small"
                            fullWidth
                            {...register("googleMap")}
                            error={!!errors.googleMap}
                            helperText={errors.googleMap?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>
                        Walk-In Address<span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter Address"
                            fullWidth
                            multiline
                            rows={4}
                            size="small"
                            {...register("address")}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : <WorkIcon />
                }
              >
                {isSubmitting ? "Submitting..." : "Create Job Vacancy"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  );
}
