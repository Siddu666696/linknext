"use client";
import React from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import Link from "next/link";

interface Job {
  vacancyID: number;
  jobRole: string;
  status: string;
  postedBy?: string;
  postedOn?: string;
  responses?: number;
}

interface JobCardProps {
  jobList: Job[];
  handleMenuClick: (event: React.MouseEvent<HTMLElement>, vacancyID: number) => void;
  handleMenuClose: (vacancyID: number) => void;
  menuAnchorEls: Record<number, HTMLElement | null>;
  handleViewJob: (job: Job) => void;
  handleCloseJob: (vacancyID: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  jobList,
  handleMenuClick,
  handleMenuClose,
  menuAnchorEls,
  handleViewJob,
  handleCloseJob,
}) => {
  const router = useRouter();

  // const handleNavigate = (job: Job) => {
  //   const formattedRole = job.jobRole.replace(/\s+/g, "-"); // Converts spaces to dashes
  //   router.push(`/${formattedRole}/${job.vacancyID}`);
  // };
//   const handleNavigate = (job: Job) => {
//   router.push(`/${job.jobRole}/${job.vacancyID}`);
// };

  return (
    <>
      {jobList?.length > 0 ? (
        jobList.map((job) => (
          <Grid item xs={12} key={job.vacancyID} my={1}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                
                <Grid item xs={12} sm={9}>
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
                    <Link
                          href={`${job?.jobRole}/${job?.vacancyID}`}
                          style={{ textDecoration: "none", width: "100%", display: "flex" }}
                        >
                    <Typography
                      variant="h6"
                      my={1}
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        textDecoration: "underline",
                      }}
                      // onClick={() => handleNavigate(job)}
                    >
                      {job?.jobRole}
                    </Typography>
                    </Link>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor:
                          job?.status === "Open"
                            ? "green"
                            : job?.status === "Closed"
                            ? "rgb(242, 153, 74)"
                            : "gray",
                        color: "#fff",
                        height: 25,
                        my: 1,
                        mb: 1,
                      }}
                    >
                      {job?.status}
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      <Typography>
                        Posted By: {job?.postedBy || "Unknown"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Typography>Date Posted: {job?.postedOn}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography>
                        Total Applications: {job?.responses}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={3}
                  container
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <Button onClick={(e) => handleMenuClick(e, job.vacancyID)}>
                    <MoreVertIcon />
                  </Button>
                  <Menu
                    anchorEl={menuAnchorEls[job.vacancyID]}
                    open={Boolean(menuAnchorEls[job.vacancyID])}
                    onClose={() => handleMenuClose(job.vacancyID)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleViewJob(job);
                        handleMenuClose(job.vacancyID);
                      }}
                    >
                      View Job
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose(job.vacancyID)}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseJob(job.vacancyID);
                        handleMenuClose(job.vacancyID);
                      }}
                    >
                      Close Job
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose(job.vacancyID)}>
                      Renew Job
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose(job.vacancyID)}>
                      Delete Job
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClose(job.vacancyID)}>
                      Copy & Create New
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No jobs available</Typography>
        </Grid>
      )}
    </>
  );
};

export default JobCard;
