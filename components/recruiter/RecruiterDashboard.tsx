"use client";

import { Grid } from "@mui/material";
import RecruiterDrawer from "./RecruiterDrawer";
import RecruiterDashboardContent from "./RecruiterDashboardContent";

const RecruiterDashboard = () => {
  return (
    <Grid
      container spacing={2} sx={{ p: { xs: 2, md: 3 },my:2 }}
    >
      <Grid item xs={12} md={2}>
        <RecruiterDrawer />
      </Grid>
      <Grid item xs={12} md={10}>
        <RecruiterDashboardContent />
      </Grid>
    </Grid>
  );
};

export default RecruiterDashboard;
