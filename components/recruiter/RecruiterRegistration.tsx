"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { validationSchema } from "@/schema/recruiterSchema";
import { getHCIIndustry, getHospitalTypes } from "@/lib/api/recruiter/queries";
import debounce from "lodash/debounce";
import { searchCity } from "@/lib/api/open/queries";
import { useAppSelector } from "@/lib/utils/reduxHooks";
import { addHospital } from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const RegisterHospital = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      industry: undefined,
      location: undefined,
      areaName: undefined,
      pinCode: undefined,
      fullName: undefined,
      mobile: undefined,
      gstNumber: undefined,
      email: user?.signInDetails?.loginId,
      hospitalName: undefined,
      hospitalDisplayName: undefined,
      hospitalType: undefined,
      termsConditionAndPrivacy: false,
    },
  });
  const handleInputChange = (debouncedSearch) => (event) => {
    const value = event.target.value;
    debouncedSearch(value);
  };
  const [industryData, setIndustryData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [hospitalType, setHospitalType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLocationSearch("");

        const [industryResponse, hospitalTypeResponse] = await Promise.all([
          getHCIIndustry(),
          getHospitalTypes(),
        ]);
        setIndustryData(industryResponse?.getHCIIndustry || []);
        setHospitalType(hospitalTypeResponse?.getHospitalTypes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
    }
  }, [user]);

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
  const debouncedLocationSearch = useMemo(
    () => debounce(handleLocationSearch, 500),
    [handleLocationSearch]
  );
  useEffect(() => {
    return () => {
      debouncedLocationSearch.cancel();
    };
  }, [debouncedLocationSearch]);

  const onSubmit = async (data) => {
    try {
      const response = await addHospital(data);
      if (response) {
        dispatch(
          openSnackbar({
            message: "Hospital added successfully!",
            severity: false,
          })
        );
        router.push("/recruiter/recruiterdashboard");
      }
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({
          message: "Failed to add hospital.",
          severity: true,
        })
      );
    }
  };

  return (
    <Grid container p={2} spacing={2} my={15}>
      <Grid item xs={12} md={6}></Grid>
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
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    options={industryData}
                    value={watch("industry")}
                    getOptionLabel={(option) => option?.industry}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Industry"
                        fullWidth
                        size="small"
                        error={!!errors.industry}
                        helperText={errors.industry?.message || ""}
                      />
                    )}
                    onChange={(event, value) => {
                      const selected = value || {};
                      onChange(value);
                      setSelectedIndustry(selected);
                    }}
                  />
                )}
              />
            </Grid>

            {selectedIndustry?.industry && (
              <>
                <Grid item xs={12}>
                  <InputLabel>
                    {selectedIndustry?.industry} Name{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {selectedIndustry?.industry} Display Name{" "}
                    <span style={{ color: "red" }}>*</span>
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

                {selectedIndustry?.industry === "Hospital" && (
                  <Grid item xs={12}>
                    <InputLabel>
                      Hospital Type <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Controller
                      name="hospitalType"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Autocomplete
                          options={hospitalType}
                          getOptionLabel={(option) => option?.type || ""}
                          value={
                            hospitalType.find(
                              (option) => option?.type === watch("hospitalType")
                            ) || null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Hospital Type"
                              fullWidth
                              size="small"
                              error={!!errors.hospitalType}
                              helperText={errors.hospitalType?.message || ""}
                            />
                          )}
                          onChange={(event, value) => {
                            onChange(value?.type || "");
                          }}
                        />
                      )}
                    />
                  </Grid>
                )}
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
                        variant="outlined"
                        size="small"
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
                    value={user?.email}
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
                control={<Checkbox {...register("termsConditionAndPrivacy")} />}
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
