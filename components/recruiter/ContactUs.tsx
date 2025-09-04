"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const ContactUs = () => {
  const [userType, setUserType] = useState<"jobseeker" | "recruiter">("jobseeker");
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as "jobseeker" | "recruiter");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EFF3F6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: 960,
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 3, color: "#395987" }}
        >
          Contact Us
        </Typography>

        <RadioGroup
          row
          value={userType}
          onChange={handleChange}
          sx={{ justifyContent: "center", mb: 3 }}
        >
          <FormControlLabel value="jobseeker" control={<Radio />} label="Jobseeker" />
          <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
        </RadioGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" variant="outlined" required />
          </Grid>

          {userType === "recruiter" && (
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Designation" variant="outlined" required />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Number" variant="outlined" required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email Address" variant="outlined" required />
          </Grid>

          {userType === "recruiter" && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Company Name" variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" variant="outlined" required />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              required
              multiline
              rows={4}
              inputProps={{ maxLength: 500 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "right" }}
            >
              {description.length}/500
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: isMobile ? "center" : "right" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#395987",
                "&:hover": { backgroundColor: "#2f4c75" },
                px: 4,
                py: 1.5,
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: 960,
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          mt: 4,
        }}
      >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 3,
        }}
      >
                <Box flex={1}>
          <Box display="flex" alignItems="flex-start">
            <LocationOnIcon sx={{ color: "#395987", mr: 1 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                MedLink Jobs
              </Typography>
              <Typography variant="body2">
                MedLink Health Care Private Limited, <br />
                1st Floor, SBR Akhila Exotica West, <br />
                Hydernagar, Kukatpally, <br />
                Hyderabad - 500072, Telangana, India.
              </Typography>
            </Box>
          </Box>

          <Box mt={3} display="flex" alignItems="center">
            <EmailIcon sx={{ color: "#395987", mr: 1 }} />
            <Typography variant="body2">
              <strong>Sales Enquiries:</strong> sales@medlinkjobs.com
            </Typography>
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", md: "block" },
            mx: 2,
            borderColor: "#395987",
            borderWidth: "1px",
          }}
        />
        <Box flex={1}>
          <Box mb={3} display="flex" alignItems="center">
            <EmailIcon sx={{ color: "#395987", mr: 1 }} />
            <Typography variant="body2">
              <strong>General Queries:</strong> info@medlinkjobs.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ color: "#395987", mr: 1 }} />
            <Typography variant="body2">
              <strong>Customer Support:</strong> support@medlinkjobs.com
            </Typography>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default ContactUs;
