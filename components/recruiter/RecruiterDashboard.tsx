"use client";

import Grid from '@mui/material/Grid2';
import RecruiterDrawer from "./RecruiterDrawer";
import RecruiterDashboardContent from "./RecruiterDashboardContent";

const RecruiterDashboard = () => {
  return (
    <Grid
      container spacing={2} sx={{ px: { xs: 2, md: 0,lg:2 },py:{xs:2,md:2},my:5 }}
    >
      <Grid size={{xs:12,md:2}} sx={{mx:{md:0}}}>
        <RecruiterDrawer />
      </Grid>
      <Grid size={{xs:12,md:10}} sx={{mx:{md:0,}}}>
        <RecruiterDashboardContent />
      </Grid>
    </Grid>
  );
};

export default RecruiterDashboard;
