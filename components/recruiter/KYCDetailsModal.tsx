import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { kycDetailsSchema } from "@/schema/recruiterSchema";
import { getCityByState, getStateMaster } from "@/lib/api/recruiter/queries";

const KYCDetailsModal = ({ handleClose, data }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(kycDetailsSchema),
    defaultValues: {
      address: undefined,
      country: "India",
      state: undefined,
      city: undefined,
      areaName: undefined,
      pinCode: undefined,
      panNumber: undefined,
      gstin: undefined,
    },
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStateMaster();

        setStates(response?.getStateMaster);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (stateName) => {
    setValue("state", stateName);
    setValue("city", undefined);

    if (!stateName) return;

    try {
      const response = await getCityByState(stateName);
      setCities(response?.cities || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const prefillData = (data) => {
      setValue("address", data?.getHospitalDetails?.address);
      setValue("state", data?.getHospitalDetails?.state);
      setValue("city", data?.getHospitalDetails?.city);
      setValue("areaName", data?.getHospitalDetails?.areaName);
      setValue("pinCode", data?.getHospitalDetails?.pinCode);
      setValue("panNumber", data?.getHospitalDetails?.pan);
      setValue("gstin", data?.getHospitalDetails?.gstin);

      if (data?.getHospitalDetails?.state) {
        handleStateChange(data.getHospitalDetails.state);
      }
    };

    prefillData(data);
  }, [data]);

  const onSubmit = (data) => {
    handleClose();
  };

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "white",
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ display: "flex", flexDirection: "column", mx: 3, gap: 1.2 }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit KYC Compliance Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  Address <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="text"
                  value={watch("address")}
                  fullWidth
                  placeholder="Enter Address"
                  size="small"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors?.address?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>
                  Country <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  value={watch("country")}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>
                  State <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={states.map((state) => state?.state)}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => handleStateChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select State"
                          error={!!errors.state}
                          helperText={errors.state?.message}
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>
                  City <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={cities.map((city) => city.city)}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => field.onChange(value)}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option?.lmID}>
                            {option?.city}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select City"
                          error={!!errors.city}
                          helperText={errors.city?.message}
                          size="small"
                        />
                      )}
                      disabled={!watch("state")}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Area Name</InputLabel>
                <TextField
                  type="text"
                  value={watch("areaName")}
                  fullWidth
                  placeholder="Enter Area Name"
                  size="small"
                  {...register("areaName")}
                  error={!!errors.areaName}
                  helperText={errors.areaName?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>Pin Code</InputLabel>
                <TextField
                  type="text"
                  value={watch("pinCode")}
                  fullWidth
                  placeholder="Enter Pin Code"
                  size="small"
                  {...register("pinCode")}
                  error={!!errors.pinCode}
                  helperText={errors.pinCode?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>PAN Number</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  value={watch("panNumber")}
                  placeholder="Enter Your PAN Number"
                  size="small"
                  {...register("panNumber")}
                  error={!!errors.panNumber}
                  helperText={errors.panNumber?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel>GSTIN</InputLabel>
                <TextField
                  type="text"
                  value={watch("gstin")}
                  fullWidth
                  placeholder="Enter GSTIN"
                  size="small"
                  {...register("gstin")}
                  error={!!errors.gstin}
                  helperText={errors.gstin?.message}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: 100 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 100 }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default KYCDetailsModal;
