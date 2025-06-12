"use client";

import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import React from "react";
import ManageJobs from "./ManageJobs";
import ManageJobsList from "./ManageJobsList";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";

const ManageJobsnResponses = () => {
  const router = useRouter();

  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(path);
    };

  return (
    <>
      <Box sx={{ my: 8, mx: 20 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            color="inherit"
            href="/recruiter/recruiterdashboard"
            onClick={handleClick("/recruiter/recruiterdashboard")}
          >
            Dashboard
          </Link>
          <Typography color="primary">Account Settings</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2} sx={{ p: { xs: 2, md: 3 }, my: 5 }}>
        <Grid item xs={6} md={4}>
          <ManageJobsList />
        </Grid>

        <Grid item xs={12} md={8}>
          <ManageJobs />
        </Grid>
      </Grid>
    </>
  );
};

export default ManageJobsnResponses;
