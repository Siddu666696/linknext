"use client";
import React, { useEffect, useState } from "react";
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";


const EMPLOYMENT_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Freelance",
  "Internship",
];
const DEPARTMENTS = [
  "Healthcare",
  "Nursing",
  "Administration",
  "IT",
  "Marketing",
  "Other",
];
const JobTitle = [
  "Doctor",
  "Nurse",
  "LabTechnician",
  "Cardiologist",
  "Dermatologist",
];
const QUALIFICATIONS = ["Any Graduate", "Diploma", "Bachelor", "Master", "PhD"];
const skillsData = ["Dancing", "Drawing", "singing"];

interface VacancyFormData {
  jobTitle: string;
  otherJobRole?: string;
  location: string;
  qualification: string;
  jobType: string;
  jobShift: string;
  department: string;
  gender: string;
  skills: string;
  personName:string;
  phoneNumber:number;
  googleMap:string;
  address:string;
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
  const [locations, setLocations] = useState<string[]>([
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    register,
    setValue,
  } = useForm<VacancyFormData>({
    resolver: yupResolver(vacancyValidationSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      qualification: "",
      jobType: "Full Time",
      department: "",
      phoneNumber:"",
      personName:"",
      googleMap:"",
      address:"",
      experienceMin: 0,
      experienceMax: 1,
      lastDateToApply: new Date(),
      description: "",
      salaryRangeMin: 0,
      salaryRangeMax: 0,
      NotWillingToDisclose: false,
    },
  });
  const notWillingToDisclose = watch("NotWillingToDisclose");
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(dayjs());
  }, []);
  const onSubmit = (data) => {
  };

  const jobTitleValue = watch("jobTitle") || "";

  return (
    <Grid container p={2}>
      <Grid md={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Create Job Vacancy
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ paddingBottom: "8px" }}>
              <Box>
                <InputLabel>
                  Job Title<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="jobTitle"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      id="free-solo-demo"
                      defaultValue={""}
                      freeSolo
                      fullWidth
                      size="small"
                      sx={{ width: 600 }}
                      // getOptionLabel={(option) => option?.job_role}
                      options={JobTitle}
                      filterOptions={(x) => x}
                      value={jobTitleValue}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option?.id}>
                            {option}
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
                          //  onChange={handleInputChange(debouncedJobSearch)}
                        />
                      )}
                      onChange={(event, value) => {
                        onChange(value);
                        //   setJobRoleData(jobsMaster);
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} sx={{ paddingBottom: "8px" }}>
              <InputLabel>
                Department<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={DEPARTMENTS}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        sx={{ width: 600 }}
                        placeholder="Select or Enter Department"
                        error={!!errors.department}
                        helperText={errors.department?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ paddingBottom: "16px" }}>
              <Box>
                <InputLabel sx={{ paddingBottom: 1 }}>
                  Number of Positions <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="number"
                  placeholder={"Enter Number of Positions"}
                  fullWidth
                  size="small"
                  sx={{ width: 600 }}
                  autoComplete="off"
                  inputMode="numeric"
                  // {...register("numberOfPosition")}
                  // error={!!errors.numberOfPosition}
                  // helperText={errors?.numberOfPosition?.message}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} sx={{ paddingBottom: "8px" }}>
              <InputLabel sx={{ my: 1 }}>Job Type<span style={{ color: "red" }}>*</span></InputLabel>
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
                      <FormHelperText>
                        {errors.jobType.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ my: 1 }}>Job Shift<span style={{ color: "red" }}>*</span></InputLabel>
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
                      <FormHelperText>{errors?.jobShift?.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ my: 1 }}>Locations <span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="location"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={locations}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter Location"
                        size="small"
                        sx={{ width: 600 }}
                        variant="outlined"
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
              <InputLabel sx={{ my: 1 }}>Gender <span style={{ color: "red" }}>*</span></InputLabel>
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
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ my: 1 }}>Qualifications <span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="qualification"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={QUALIFICATIONS}
                    freeSolo
                    value={value || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        sx={{ width: 600 }}
                        placeholder="Select or Enter Qualification"
                        error={!!errors.qualification}
                        helperText={errors.qualification?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
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
              <Grid container spacing={1} sx={{ paddingBottom: "24px" }}>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{}}>
                    Min Experience<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    type="text"
                    placeholder={"Enter Min Experience"}
                    size="small"
                    sx={{ width: 200 }}
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
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{}}>
                    Max Experience<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    type="text"
                    placeholder={"Enter Max Experience"}
                    size="small"
                    sx={{ width: 200 }}
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
              <Grid item xs={12} md={6} sx={{ paddingBottom: "24px" }}>
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
                    <InputLabel sx={{}}>Min Salary <span style={{ color: "red" }}>*</span></InputLabel>

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
                    <InputLabel sx={{}}>Max Salary <span style={{ color: "red" }}>*</span></InputLabel>

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
            <Grid item xs={12} md={12} sx={{ paddingBottom: "12px" }}>
              <Box>
                <InputLabel sx={{ paddingBottom: 1 }}>
                  Required Skills <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      // multiple
                      id="skills-select"
                      size="small"
                      value={value || null}
                      onChange={(event, newValue) => onChange(newValue)}
                      options={skillsData}
                      // getOptionLabel={(option) =>
                      //   typeof option === "string" ? option : option.skill
                      // }
                      // onClose={() => {
                      //   setSkillsData(skillsMaster);
                      // }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          sx={{ width: 600 }}
                          placeholder="Select Skills"
                          error={!!errors.skills}
                          helperText={errors?.skills?.message}
                        />
                      )}
                      // onChange={(event, values) => {
                      //   if (values.length <= 10) {
                      //     onChange(values);
                      //     //   clearErrors("skills");
                      //   } else {
                      //     //   setError("skills", {
                      //     //     message: "You can select up to 10 skills",
                      //     //   });
                      //   }
                      //   // setSkillsData(skillsMaster);
                      // }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel sx={{ my: 1 }}>Description <span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    sx={{ width: 600 }}
                    multiline
                    rows={4}
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>           
            <Grid item xs={12} md={12}>
      <FormControlLabel
        control={
          <Checkbox
            {...register("showWalkInDetails")} 
          />
        }
        label="Show Walk-in Interview Details"
      />
    </Grid>
    {watch("showWalkInDetails") && (<Box>
            {today &&  (
              <Grid container spacing={2} mx={1} my={2}>
                  
                  <Grid item xs={12} md={12}>
                  <InputLabel>
                    From Date<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Box sx={{ display: "flex", gap: 2 }}>
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
                            minDate={today && today}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel>
                    To Date<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Box sx={{ display: "flex", gap: 1, my: 1 }}>
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
                            // minDate={watch("fromDate") || today} // Ensures To Date >= From Date
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
              
            )}
            {today && (
              <Grid item xs={6} md={6} pb={3} mx={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      minWidth: 262,
                    }}
                  >
                    <InputLabel my={1}>
                      From<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="fromTime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            {...field}
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                placeholder: "Select Time",
                                error: !!errors.fromTime,
                                helperText: errors?.fromTime?.message,
                              },
                            }}
                            disablePast={
                              today && today.isAfter(dayjs(watch("fromDate")))
                            }
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      minWidth: 262,
                    }}
                  >
                    <InputLabel>
                      To<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="toTime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            {...field}
                            slotProps={{
                              textField: {
                                size: "small",
                                // fullWidth: true,
                                placeholder: "Select Time",
                                error: !!errors.toTime,
                                helperText: errors?.toTime?.message,
                              },
                            }}
                            // minTime={
                            //   watch("fromDate") === watch("toDate") &&
                            //   watch("fromTime")
                            // }
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        )}
                        rules={{ validate: (value) => true }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={12} mx={3} my={2}>
              <InputLabel>Contact PersonName<span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="personName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter PersonName"
                    fullWidth
                    size="small"
                    {...register("personName")}
                    error={!!errors.personName}
                    helperText={errors.personName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} mx={3} my={2}>
              <InputLabel>Contact Person PhoneNumber<span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter PhoneNumber"
                    fullWidth
                    size="small"
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} mx={3} my={2}>
              <InputLabel>Google Map URL<span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="googleMap"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter Google Map URL"
                    fullWidth
                    size="small"
                    {...register("googleMap")}
                    error={!!errors.googleMap}
                    helperText={errors.googleMap?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} mx={3} my={2}>
              <InputLabel>Walk-In-Address<span style={{ color: "red" }}>*</span></InputLabel>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter Address"
                    fullWidth
                    row={4}
                    size="small"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>           
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
      <Grid md={4}></Grid>
    </Grid>
  );
}
