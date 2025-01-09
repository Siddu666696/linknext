"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Autocomplete,
  IconButton,
  Box,
  InputAdornment
} from '@mui/material';
import { 
  Work as WorkIcon, 
  LocationOn as LocationIcon, 
  Person as PersonIcon 
} from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { 
    // ... other imports
    Chip 
  } from '@mui/material';
import { createProfileSchema } from '@/schema/jobseekerSchema';

// Predefined Data
const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];



// Validation Schema


// Types
interface LocationData {
  city: string;
  state: string;
}

interface JobseekerProfileFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  workStatus: string;
  location: LocationData | null;
  password: string;
  isFromOutSideIndia: boolean;
  outComerCountry?: string;
  outComerAddress?: string;
  isCurrentlyStudying?: boolean;
  experienceYears?: string;
  experienceMonths?: string;
  salary?: string;
}

export default function CreateYourProfile() {
  const [locations] = useState<LocationData[]>([
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Delhi', state: 'Delhi' },
    { city: 'Bangalore', state: 'Karnataka' }
  ]);

  const { 
    control, 
    handleSubmit, 
    register,
    formState: { errors, isSubmitting }, 
    watch 
  } = useForm<JobseekerProfileFormData>({
    resolver: yupResolver(createProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      workStatus: '',
      location: null,
      password: '',
      isFromOutSideIndia: false
    }
  });

  const isFromOutSideIndia = watch('isFromOutSideIndia');

  const onSubmit = async (data: JobseekerProfileFormData) => {
    try {
      // Implement your API submission logic here
      // Example: await submitProfileAPI(data);
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <Grid container >
        
        <Grid item xs={6} md={6}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} p={3}>
      <Grid item xs={12} md={12}>
  <Box display="flex" alignItems="center">
    <IconButton
      onClick={() => {
        // Add your back navigation logic here
      }}
    >
      <ArrowBackIosIcon fontSize="small" sx={{ color: "var(--clr-btn-primary)" }} />
    </IconButton>
    <Typography variant="h6" gutterBottom>
      Create Your Profile
    </Typography>
  </Box>
</Grid>

        {/* Personal Information */}
        {/* <Grid item xs={12} md={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name"
                // variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: <PersonIcon color="action" />
                }}
              />
            )}
          />
        </Grid> */}

    <Grid item xs={12} md={12}>
  <InputLabel>
    Full Name<span style={{ color: "red" }}>*</span>
  </InputLabel>
  <Controller
    name="name"
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextField
        size="small"
        sx={{ my: 1 }}
        fullWidth
        autoComplete="off"
        inputMode="text"
        value={value}
        onChange={(e) => {
          const input = e.target.value;
          // Prevent leading spaces
          if (input.length === 0 && e.nativeEvent.inputType === "insertText" && e.nativeEvent.data === " ") {
            return;
          }
          // Prevent consecutive spaces
          if (input.slice(-1) === " " && e.nativeEvent.data === " ") {
            return;
          }
          onChange(e); // Update the field value
        }}
        onBlur={onBlur}
        placeholder="Full Name"
        error={!!errors.name}
        helperText={errors?.name?.message}
      />
    )}
  />
</Grid>


<Grid item xs={12} md={12}>
  {/* InputLabel for Email */}
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
        // label="Email"
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
        {/* <Grid item xs={12} md={12} >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                type="tel"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid> */}
<Grid item xs={12} md={12}>
  <InputLabel sx={{ marginBottom: 1 }}>
    Mobile Number<span style={{ color: "red" }}>*</span>
  </InputLabel>
  <Grid container>
    {/* Prefix Field */}
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

    {/* Mobile Number Input Field */}
    <Grid item xs={10} md={10}>
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
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
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
          />
        )}
      />
    </Grid>
  </Grid>
</Grid>



        {/* <Grid item xs={12} md={12}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.gender} variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                  {...field}
                  label="Gender"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid> */}
<Grid item xs={12} md={6}>
<InputLabel>Select Gender <span style={{color:'red'}}>*</span></InputLabel>
  <Controller
    name="gender"
    control={control}
    render={({ field: { value, onChange } }) => (
      <FormControl fullWidth error={!!errors.gender} variant="outlined">
        {/* <Typography variant="subtitle1" gutterBottom>
          Select Gender
        </Typography> */}
        
        <Grid container spacing={1} p={1}>
  {GENDER_OPTIONS.map((option) => (
    <Grid item key={option.value}>
      <Chip
        label={option.label}
        color={value === option.value ? 'primary' : 'default'}
        variant={value === option.value ? 'filled' : 'outlined'}
        onClick={() => onChange(option.value)}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: value === option.value ? 'primary.main' : 'transparent',
          borderColor: value === option.value ? 'primary.main' : 'rgba(0,0,0,0.2)',
          color: value === option.value ? 'white' : 'primary.main',
          '&:hover': {
            backgroundColor: value === option.value 
              ? 'primary.dark' 
              : 'rgba(0,0,0,0.05)',
          },
        }}
      />
    </Grid>
  ))}
</Grid>

        {errors.gender && (
          <FormHelperText error>{errors.gender.message}</FormHelperText>
        )}
      </FormControl>
    )}
  />
</Grid>
       
<Grid item xs={12} md={12}>
  <InputLabel sx={{marginBottom:1}}>
    Location <span style={{ color: "red" }}>*</span>
  </InputLabel>
  <Controller
    name="location"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => `${option.city}, ${option.state}`}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter Location"
            variant="outlined"
            size='small'
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

        <Grid item xs={12}>
          <Controller
            name="isFromOutSideIndia"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label="I am from outside India"
              />
            )}
          />
        </Grid>

        {isFromOutSideIndia && (
          <>
            <Grid item xs={12} md={12}>
  <InputLabel>
    Country <span style={{ color: "red" }}>*</span>
  </InputLabel>
  <Controller
    name="outComerCountry"
    control={control}
    render={({ field }) => (
      <TextField
      sx={{my:1}}
        {...field}
        fullWidth
        placeholder="Enter Country"
        size="small"
        variant="outlined"
        error={!!errors.outComerCountry}
        helperText={errors.outComerCountry?.message}
      />
    )}
  />
</Grid>
<Grid item xs={12} md={12}>
  <InputLabel>
    Address <span style={{ color: "red" }}>*</span>
  </InputLabel>
  <Controller
    name="outComerAddress"
    control={control}
    render={({ field }) => (
      <TextField
      sx={{my:1}}
        {...field}
        fullWidth
        placeholder="Enter Address"
        size="small"
        variant="outlined"
        error={!!errors.outComerAddress}
        helperText={errors.outComerAddress?.message}
      />
    )}
  />
</Grid>

          </>
        )}

        <Grid item xs={12} md={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Create Profile'}
          </Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
    <Grid item md={6}></Grid>
    </Grid>
  );
}