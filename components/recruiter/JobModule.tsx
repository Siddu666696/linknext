import React from "react";
import PostaJob from "./PostaJob";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import PrefillJobsForm from "./PrefillJobsForm";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";

const JobModule = () => {
  const router = useRouter();
  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(path);
    };
    
  return (
    <div>
      <Box sx={{ my: 10, mx: 12 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="/recruiter/recruiterdashboard"
            onClick={handleClick("/recruiter/recruiterdashboard")}
          >
            Dashboard
          </Link>
          <Typography color="primary">Post A Job</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container>
        <Grid item xs={8}>
          <PostaJob />
        </Grid>
        <Grid item xs={4}>
          <PrefillJobsForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default JobModule;
