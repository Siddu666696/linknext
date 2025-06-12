"use client";
import React from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const JobCard = ({
  jobList,
  handleMenuClick,
  handleMenuClose,
  menuAnchorEls,
  handleViewJob,
  handleCloseJob,
 
}) => {
  return (
    <>
      {jobList?.length > 0 ? (
        jobList.map((job) => (
          <Grid item xs={12} key={job.vacancyID} my={1}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" my={1}>
                    {job?.jobRole}
                  </Typography>
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
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor:
                        job?.status === "Open"
                          ? "green"
                          : job?.status === "Closed"
                          ? "orange"
                          : "gray",
                      color: "#fff",
                      mb: 1,
                    }}
                  >
                    {job?.status}
                  </Button>
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
