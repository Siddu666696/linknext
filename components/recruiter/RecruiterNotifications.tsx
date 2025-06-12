"use client";
import { Box, Button, Modal, Typography, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: 540,
  p: 4,
};

const RecruiterNotifications = ( { isOpen, close, open }) => {

  const [notifications, setNotifications] = useState({
    "General Communications": { push: false, email: false },
    "New Job Application": { push: false, email: false },
    "Notify Reminder": { push: false, email: false },
  });

  const handleCheckboxChange =
    (section: string, type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNotifications((prev) => ({
        ...prev,
        [section]: { ...prev[section], [type]: event.target.checked },
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close("notification");
  };

  // const handleOpen = () => {
  //   open("notification");
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={isOpen("notification")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notification Settings
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex",flexDirection:"row",mx:20, gap:8  }}>
              <Typography variant="subtitle1"></Typography>
              <Typography variant="subtitle1">Push Notifications</Typography>
              <Typography variant="subtitle1">Email Notifications</Typography>
            </Box>

            {Object.keys(notifications).map((section) => (
              <Box key={section} sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", mb: 1,}}>
                <Typography>{section}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifications[section].push}
                      onChange={handleCheckboxChange(section, "push")}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifications[section].email}
                      onChange={handleCheckboxChange(section, "email")}
                    />
                  }
                  label=""
                />
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={() => close("notification")}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RecruiterNotifications;
