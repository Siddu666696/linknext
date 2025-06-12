"use client";

import {
  AddHospitalUser,
  updateHospitalUser,
} from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { adduserSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute" as const,
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: "90%",
  maxWidth: 540,
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

interface AddUserModalProps {
  isOpen: (key: string) => boolean;
  open: (key: string) => void;
  close: (key: string) => void;
  onUserAddedOrUpdated: (newUser: any) => void;
  editingUser: any;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  close,
  onUserAddedOrUpdated,
  editingUser,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adduserSchema),
    defaultValues: { email: "", fullName: "", phone: "", permissions: [] },
  });

  const permissions: string[] = watch("permissions", []);

  const togglePermission = (permission: string) => {
    const current = permissions;
    setValue(
      "permissions",
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission]
    );
  };
  const isModalOpen = isOpen("adduser");
  useEffect(() => {
    if (isModalOpen) {
      if (editingUser) {
        const perms = [];
        if (editingUser.postajob) perms.push("jobPosting");
        if (editingUser.searchcandidate) perms.push("jra");
  
        reset({
          email: editingUser.subuser || "",
          fullName: editingUser.name || "",
          phone: editingUser.phone || "",
          permissions: perms,
        });
      } else {
        reset({
          email: "",
          fullName: "",
          phone: "",
          permissions: [],
        });
      }
    }
  }, [isModalOpen, editingUser, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      accessJobPosting: data.permissions.includes("jobPosting"),
      accessResumeDB: data.permissions.includes("jra"),
      huID: editingUser?.huID, 
    };

    try {
      if (editingUser) {
        await updateHospitalUser(payload);
        dispatch(
          openSnackbar({
            message: "User updated successfully",
            severity: false,
          })
        );
        
      } else {
        const result = await AddHospitalUser(payload);
        dispatch(
          openSnackbar({ message: "User added successfully", severity: false })
        );
      }

      onUserAddedOrUpdated(payload);
      close("adduser");
      reset();
    } catch (error) {
      console.error("User save error:", error);
      dispatch(
        openSnackbar({ message: "Failed to save user", severity: true })
      );
    }
  };

  return (
    <Modal open={isOpen("adduser")} onClose={() => close("adduser")}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" mb={2}>
            Add User
          </Typography>

          <InputLabel>Email Address</InputLabel>
          <TextField
            {...register("email")}
            fullWidth
            size="small"
            placeholder="Please enter a valid email"
            disabled={!!editingUser}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />

          <InputLabel>Full Name</InputLabel>
          <TextField
            {...register("fullName")}
            fullWidth
            size="small"
            placeholder="Please enter name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            sx={{ mb: 2 }}
          />

          <InputLabel>Mobile Number</InputLabel>
          <TextField
            type="text"
            placeholder="Enter Mobile Number"
            fullWidth
            size="small"
            sx={{ my: 1 }}
            autoComplete="off"
            inputMode="text"
            inputProps={{
              maxLength: 10,
            }}
            disabled={!!editingUser}
            {...register("phone")}
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
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <Typography>Select Permissions</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.includes("jobPosting")}
                onChange={() => togglePermission("jobPosting")}
              />
            }
            label="Access to Job Posting"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.includes("jra")}
                onChange={() => togglePermission("jra")}
              />
            }
            label="Access to JRA"
          />
          {errors.permissions && (
            <FormHelperText error>{errors.permissions.message}</FormHelperText>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => close("adduser")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
