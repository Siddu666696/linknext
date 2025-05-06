"use client";

import React from "react";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: 540,
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

const LoginSessionExpiredModal = ({ isOpen, close }) => {
  const router = useRouter();

  const handleGoToLogin = () => {
    close("sessionExpired");
    router.push("login"); // Change path if your login route differs
  };

  return (
    <Modal
      open={isOpen("sessionExpired")}
      onClose={() => close("sessionExpired")}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            height: "40vh",
          }}
        >
          <InputLabel sx={{ fontSize: "20px" }}>Login Session Expired</InputLabel>
          <Typography>Your login session has expired after changing the password.</Typography>
          <Typography>Please log in again to continue.</Typography>
          <Button variant="contained" onClick={handleGoToLogin}>
            Go To Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginSessionExpiredModal;
