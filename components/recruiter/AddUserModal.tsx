"use client";

import { adduserSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, InputLabel, Modal, TextField, Typography, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";


const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: "90%", // Responsive width
  maxWidth: 540,
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

const AddUserModal = ({isOpen,close,open}) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adduserSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      permissions: [],
    },
  });

  // const { isOpen, close, open } = UseModalManager();

  const onSubmit = (data: any) => {
    close("adduser");
  };

  const handleOpen = () => open("adduser");

  const togglePermission = (permission: string) => {
    const currentPermissions = getValues("permissions");
    if (currentPermissions.includes(permission)) {
      setValue("permissions", currentPermissions.filter((p) => p !== permission));
    } else {
      setValue("permissions", [...currentPermissions, permission]);
    }
  };

  return (
    <div>
     
<Grid container width={"100%"}>
      <Modal
        open={isOpen("adduser")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add User
            </Typography>
            <Box>
              <InputLabel>Email Address</InputLabel>
              <TextField
                {...register("email")}
                sx={{ my: 1 }}
                size="small"
                fullWidth
                placeholder="Please Enter Valid Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <InputLabel>Full Name</InputLabel>
              <TextField
                {...register("fullName")}
                sx={{ my: 1 }}
                size="small"
                fullWidth
                placeholder="Please Enter Name"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />

              <InputLabel sx={{ marginBottom: 1 }}>
                Mobile Number<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Grid container>
                <Grid item xs={2} md={2}>
                  <TextField
                    variant="outlined"
                    defaultValue="+91"
                    disabled
                    fullWidth
                    size="small"
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: "4px 0px 0px 4px !important",
                      },
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": {
                          padding: "10.5px 14px",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        sx={{
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
                            ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key) ||
                            ((e.ctrlKey || e.metaKey) && ["v", "c", "a", "x"].includes(e.key.toLowerCase()));
                          if (!isValidKey) e.preventDefault();
                        }}
                        onPaste={(e) => {
                          const paste = e.clipboardData.getData("text");
                          if (!/^\d+$/.test(paste)) e.preventDefault();
                        }}
                        error={!!errors?.phone}
                        helperText={errors?.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Typography>Please select the Permission</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 3, my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => togglePermission("jobPosting")}
                      checked={getValues("permissions").includes("jobPosting")}
                    />
                  }
                  label={<Typography sx={{ color: "#395987" }}>Access to Job Posting</Typography>}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 3, my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => togglePermission("jra")}
                      checked={getValues("permissions").includes("jra")}
                    />
                  }
                  label={<Typography sx={{ color: "#395987" }}>Access to JRA</Typography>}
                />
              </Box>

              {errors.permissions && (
                <FormHelperText error>{errors.permissions?.message}</FormHelperText>
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={() => close("adduser")}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      </Grid>
    </div>
  );
};

export default AddUserModal;
