"use client";

import { Grid } from "@mui/material";
import RecruiterDrawer from "./RecruiterDrawer";
import RecruiterDashboardContent from "./RecruiterDashboardContent";

const RecruiterDashboard = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        // flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Grid item xs={12} sm={4} md={2}>
        <RecruiterDrawer />
      </Grid>
      <Grid item xs={12} sm={8} md={10}>
        <RecruiterDashboardContent />
      </Grid>
    </Grid>
  );
};

export default RecruiterDashboard;
