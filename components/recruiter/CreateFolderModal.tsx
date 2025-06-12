"use client";

import { addHRFolder } from "@/lib/api/recruiter/mutations";
import { addfolderSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { openSnackbar } from "@/redux/features/snackbarSlice";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  background: "white",
  width: "90%",
  maxWidth: 540,
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

const CreateFolderModal = ({
  isOpen,
  close,
  refetchFolders,
  onSuccessNavigate,
}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(addfolderSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await addHRFolder(data.fullName);      
      if (response?.addHRFolder) {
        dispatch(
          openSnackbar({
            message: "Folder created successfully",
            severity: false,
          })
        );

        reset();
        if (refetchFolders) {
          refetchFolders();
        }
        if (onSuccessNavigate) {
          router.push(onSuccessNavigate);
        }
        if (close) {
          close("create");
        }
      } else {
        dispatch(
          openSnackbar({
            message: "Folder creation failed",
            severity: true,
          })
        );
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      dispatch(
        openSnackbar({
          message: "Something went wrong",
          severity: true,
        })
      );
    }
  };

  return (
    <Grid container width="100%">
      <Modal
        open={isOpen("create")}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create Folder
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Create folder & organize jobseeker profiles easily
            </Typography>

            <InputLabel>Folder Name</InputLabel>
            <TextField
              sx={{ my: 1 }}
              size="small"
              fullWidth
              placeholder="Please Enter Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register("fullName")}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={() => close && close()}>
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
  );
};

export default CreateFolderModal;
