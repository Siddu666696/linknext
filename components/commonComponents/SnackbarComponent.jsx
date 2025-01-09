import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import { closeSnackbar } from "@/redux/features/snackbarSlice";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarComponent = () => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.snackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar({}));
  };
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert
        onClose={() => handleClose}
        severity={snackbar.severity ? "error" : "success"}
        variant="filled"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
