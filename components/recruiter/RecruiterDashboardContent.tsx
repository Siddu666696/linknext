"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import PlaceIcon from "@mui/icons-material/Place";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TodayIcon from "@mui/icons-material/Today";


const RecruiterDashboardContent = ({ strength = 70 }) => {


  return (
    <Grid container justifyContent="center" width="100%" p={1}>
      <Box sx={{ bgcolor: "#395987", p: 3, width: "100%"}}>
        <Box
          sx={{
            bgcolor: "white",
            width: "100%",
            mx: "auto",
            my: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            p: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 70,
              height: 70,
              fontSize: 35,
            }}
            variant="rounded"
          >
            M
          </Avatar>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6">Medlink</Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <PlaceIcon fontSize="small" /> Hyderabad, Telangana
            </Typography>
          </Box>
        </Box>
        <Accordion sx={{ width: "100%", mx: "auto", mt: 2, bgcolor: "white" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ width: "100%", position: "relative", my: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: strength === 100 ? "#4CAF50" : "#FFA726",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      width: "100%",
                      top: 0,
                      left: 0,
                      textAlign: "center",
                      color: strength < 70 ? "#000" : "#fff",
                      fontWeight: 600,
                      lineHeight: "12px",
                    }}
                  >
                    {strength}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography>Profile Strength</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" sx={{ width: "100%" }}>
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Upload Company Logo
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Verify Phone Number
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Add About Info
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Add Company Video
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Include Website URL
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Enter PAN Number
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Enter GSTIN
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" sx={{ width: "100%" }}>
                    Add Address
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
        </Accordion>
      </Box>
      <Grid container spacing={2} mx={1} my={2} width={"100%"}>
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
              >
                <Box sx={{ mx: 2, my: 2 }}>
                  <Typography sx={{ fontSize: 20, my: 2 }}>
                    Post a Job
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
                    <Typography>Activated On</Typography>
                    <Typography>13-05-2025</Typography>
                  </Box>
                  <Typography my={2}>Post a Job</Typography>
                  <Button variant="contained">Post</Button>
                </Box>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={200}
                    size={200}
                    thickness={8}
                    sx={{
                      position: "absolute",
                      opacity: 0.6,
                      color: "#395987",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={strength}
                    size={200}
                    thickness={8}
                    sx={{
                      color: "#395987",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Typography variant="h6" fontWeight={600} color="#395987">
                      Credits left 75 of 100
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
              >
                <Box sx={{ mx: 2, my: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
                    <Typography>
                      Unlock Challenges in Hiring with MedLink Jobs Search
                      Candidates
                    </Typography>
                    <Typography>
                      Access Jobseekers Directly Through MedLink Jobs
                    </Typography>
                  </Box>
                  <Button variant="outlined">Explore More</Button>
                </Box>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <PendingActionsIcon
                    sx={{ width: 200, height: 200, color: "#395987" }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
              >
                <Box sx={{ mx: 2, my: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
                    <Typography>
                      Streamline your healthcare staffing with MedLink Jobs
                      Board’s Staffing Solutions
                    </Typography>
                    <Typography>
                      Efficient and Effective Staffing Solutions for Healthcare
                    </Typography>
                  </Box>
                  <Button variant="outlined">Explore More</Button>
                </Box>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <PendingActionsIcon
                    sx={{ width: 200, height: 200, color: "#395987" }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
              >
                <Box sx={{ mx: 2, my: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
                    <Typography>
                      Enhance Your Hospital’s Brand with MedLink Jobs Branding
                      Solutions
                    </Typography>
                    <Typography>
                      Elevate Your Hospital’s Image with Effective Branding
                    </Typography>
                  </Box>
                  <Button variant="outlined">Explore More</Button>
                </Box>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <PendingActionsIcon
                    sx={{ width: 200, height: 200, color: "#395987" }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} mx={1.2} width={"100%"}>
          <Grid item xs={12} md={6} sx={{ border: "1px solid" }}>
            <Box>Reminder</Box>
            <TodayIcon
              sx={{ width: 250, height: 200, color: "#395987", mx: 4, my: 3 }}
            />
            <Typography mx={10}>No Reminders</Typography>
            <Typography mx={5}>Add reminder to show it here</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ border: "1px solid" }}>
            <Box>Notifications</Box>
            <TodayIcon
              sx={{ width: 250, height: 200, color: "#395987", mx: 4, my: 3 }}
            />
            <Typography mx={10}>No Notifications</Typography>
            <Typography mx={5}>
              We will let you know once you have new notifications
            </Typography>
          </Grid>
        </Grid>
    </Grid>
  );
};

export default RecruiterDashboardContent;
