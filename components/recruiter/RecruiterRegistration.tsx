"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  InputAdornment,
  Autocomplete,
  Container,
  Box,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
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
import RecruiterRegistration from "../../public/assets/images/leftsideimg.svg"
import Image from "next/image";

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
      industry: null,
      location: null,
      areaName: "",
      pinCode: "",
      fullName: "",
      mobile: undefined,
      gstNumber: undefined,
      email: user?.signInDetails?.loginId,
      hospitalName: "",
      hospitalDisplayName: "",
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
  console.log(industryData,"industryData");
  console.log(selectedIndustry,"selectedIndustry");

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
    console.log(data,"data");
    
    try {
      const response = await addHospital(data);
      console.log(response,"response");
      
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

  console.log(watch("industry"),"industry");
  

  return (
    <>  
    <Box sx={{display:"flex"}}>
    <Grid>
    <Box sx={{display:{xs:"none",md:"block"},width:{md:"500px",lg:"750px"},height:{md:"1500px",lg:"1350px"}}}>
      <Image style={{width:"100%",height:"100%",flex:1}} src={RecruiterRegistration} alt="RecruiterRegistration"></Image>
    </Box>
    </Grid>
    <Container sx={{ flex: 1}}>
    <Grid spacing={2} size={{md:6} }>
      <Grid size={{lg:12}}>
        <Box sx={{color:"#395987",fontWeight:500,fontSize:"26px",textAlign:"center",fontFamily:"Open-sans !important",my:"20px"}}>
           <span>Recruiter Registration</span>
        </Box>
      </Grid>
      <Grid size={{xs:12,md:6,lg:12}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{display:"flex",justifyContent:"center"}}>
            <Grid size={{xs:12,lg:10}}>
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
                <Grid size={{xs:12,lg:10}}>
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
                        helperText={errors.hospitalName ? `${selectedIndustry?.industry} name is required`: ""}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{xs:12,lg:10}}>
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
                        helperText={errors.hospitalDisplayName ? `${selectedIndustry?.industry} Display name is required` :""}
                      />
                    )}
                  />
                </Grid>

                {selectedIndustry?.industry === "Hospital" && (
                  <Grid size={{xs:12,lg:10}}>
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

            <Grid size={{xs:12,lg:10}}>
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

            <Grid size={{xs:12,lg:10}}>
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
            <Grid size={{xs:12,lg:10}}>
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
                    slotProps={{
                      input:{
                        inputProps:{
                          maxLength:6,
                          inputMode:"numeric",
                          pattern:"[0-9]*"
                        }
                      }
                    }}
                     onChange={(e) => {
                         const onlyNums = e.target.value.replace(/\D/g, ""); // allow only numbers
                         field.onChange(onlyNums);
                    }}
                  />  
                )}
              />
            </Grid>
            <Grid size={{xs:12,lg:10}}>
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
            <Grid size={{xs:12,lg:10}}>
              <InputLabel sx={{ marginBottom: 1 }}>
                Mobile Number<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Grid container>
                <Grid size={{xs:3,lg:3}}>
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
                    slotProps={{
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
                <Grid size={{xs:9}}>
                  <TextField
                    sx={{
                      color: "var(--clr-blue-footer)",
                      [`& fieldset`]: {
                        borderRadius: "0px 4px 4px 0px !important",
                      },
                    }}
                    // InputProps={{
                    //   sx: {
                    //     ".MuiOutlinedInput-input": {
                    //       padding: "10.5px 14px",
                    //     },
                    //   },
                    // }}
                    size="small"
                    fullWidth
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Mobile Number"
                    slotProps={{
                      input:{
                        inputProps:{
                          maxLength:10
                        }
                      }
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
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    {...register("mobile")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{xs:12,lg:5}}>
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
            <Grid size={{xs:12,lg:5}}>
              <InputLabel>GSTN no</InputLabel>
              <TextField fullWidth size="small" sx={{ my: 1 }} 
              {...register("gstNumber")} 
              error={!!errors.gstNumber}
              helperText={errors.gstNumber?.message}
               />
            </Grid>
            <Grid size={{xs:12,md:12,lg:10}}>
              <FormControlLabel
                control={<Checkbox {...register("termsConditionAndPrivacy")} />}
                label="I accept the terms and conditions"
              />
              {errors.termsConditionAndPrivacy && (
                <p style={{color:"red",marginTop:"15px"}}>{errors.termsConditionAndPrivacy.message}</p>
              )}
            </Grid>
            <Grid size={{md:12,lg:10}} sx={{display:"flex",justifyContent:"center"}}>
              <Button type="submit" variant="contained" color="primary" sx={{bgcolor:"#395587",width:{xs:"250px",md:"350px"},borderRadius:"50px", fontWeight:"500",textTransform: 'capitalize',p:"8px",mb:5}}>
                Register Hospital
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
    </Container>
    </Box>
    </>
  );
};

export default RegisterHospital;
