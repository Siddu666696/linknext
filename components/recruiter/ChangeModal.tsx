"use client";

import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { adduserSchema } from "@/schema/recruiterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { renameFolder } from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { useEffect } from "react";

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

interface ChangeModalProps {
  isOpen: (key: string) => boolean;
  close: (key: string) => void;
  refetchFolders: () => void;
  folderID: string;
  initialName: string;
}

const ChangeModal = ({
  isOpen,
  close,
  refetchFolders,
  folderID,
  initialName,
}: ChangeModalProps) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(adduserSchema),
    defaultValues: {
      fullName: "",
    },
  });

  useEffect(() => {
    if (initialName) {
      setValue("fullName", initialName);
    }
  }, [initialName, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = await renameFolder({
        name: data.fullName,
        folderID,
      });

      if (response?.renameFolder) {
        dispatch(
          openSnackbar({
            message: "Folder renamed successfully",
            severity: false,
          })
        );

        reset();
        refetchFolders(); // ✅ Refresh the folder list
        close("rename"); // ✅ Close the modal
      } else {
        dispatch(
          openSnackbar({
            message: "Folder rename failed",
            severity: true,
          })
        );
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
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
        open={isOpen("rename")}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Rename Folder
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Update the folder name to keep things organized
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
              sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
            >
              <Button variant="outlined" onClick={() => close("rename")}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ChangeModal;
