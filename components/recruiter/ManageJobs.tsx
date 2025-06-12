"use client";

import * as React from "react";
import {
  Grid,
  Button,
  MenuItem,
  Typography,
  FormControl,
  Select,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import {
  getJobStatus,
  getVacanciesByBatch,
  getJobPostedBy,
  getDraftJobsByBatch,
  getDraftJobCount,
} from "@/lib/api/recruiter/queries";
import UseLoading from "@/hooks/UseLoading";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { closeJob } from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import UseModalManager from "@/hooks/UseModalManager";
import JobDetailsModal from "./JobDetailsModal";
import JobCard from "./JobCard";
import DraftJob from "./DraftJob";

const ManageJobs = () => {
  const [alignment, setAlignment] = React.useState("published");
  const [age, setAge] = React.useState(10);
  const [jobList, setJobList] = React.useState([]);
  const [jobPostedByMap, setJobPostedByMap] = React.useState({});
  const { startLoading, stopLoading } = UseLoading();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [menuAnchorEls, setMenuAnchorEls] = React.useState({});
  const dispatch = useDispatch();
  const { isOpen, close, open } = UseModalManager();
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeAge = (event) => setAge(event.target.value);
  const handleChange = (e, newAlignment) =>
    newAlignment && setAlignment(newAlignment);
  const [draftJobs, setDraftJobs] = React.useState([]);
  const [draftCount, setDraftCount] = React.useState(0);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    open("job");
  };

  const handleMenuClick = (event, jobId) => {
    setMenuAnchorEls((prev) => ({ ...prev, [jobId]: event.currentTarget }));
  };

  const handleMenuClose = (jobId) => {
    setMenuAnchorEls((prev) => ({ ...prev, [jobId]: null }));
  };

  const handleCloseJob = async (vacancyID) => {
    if (!window.confirm("Are you sure you want to close this job?")) return;
    try {
      await closeJob({ vacancyID });
      setJobList((prev) =>
        prev.map((job) =>
          job.vacancyID === vacancyID ? { ...job, status: "Closed" } : job
        )
      );
      openSnackbar("Job closed successfully", "success");
    } catch {
      openSnackbar("Failed to close job", "error");
    }
  };

  const getUser = React.useCallback(async () => {
    try {
      const user = await fetchUserAttributes();
      dispatch(login(user));
      return user;
    } catch {
      return null;
    }
  }, [dispatch]);

  React.useEffect(() => {
    const fetchJobs = async () => {
      startLoading();
      try {
        const user = await getUser();
        if (!user) return;

        const postedByResponse = await getJobPostedBy();
        const postedByMap = (postedByResponse?.getJobPostedBy || []).reduce(
          (acc, item) => {
            acc[item.userID] = item.name || "Unknown";
            return acc;
          },
          {}
        );
        setJobPostedByMap(postedByMap);

        const startIndex = (page - 1) * rowsPerPage;

        if (alignment === "published") {
          await getJobStatus();
          const res = await getVacanciesByBatch({
            start: startIndex,
            count: rowsPerPage,
            jobRole: "",
            vacancyID: "",
            sortBy: "",
            postedByUserID: "",
            status: "",
          });
          setJobList(res?.getVacanciesByBatch || []);
        } else {
          const draftRes = await getDraftJobsByBatch({
            start: startIndex,
            count: rowsPerPage,
            jobRole: "",
            vacancyID: "",
            sortBy: "",
            postedByUserID: "",
            // status: "",
          });
          const countRes = await getDraftJobCount();
          setDraftJobs(draftRes?.getDraftJobsByBatch || []);
          setDraftCount(countRes?.getDraftJobCount || 0);
        }
      } finally {
        stopLoading();
      }
    };
    fetchJobs();
  }, [page, rowsPerPage, alignment]);

  return (
    <Grid container spacing={2} sx={{ px: 2, py: 3 }}>
      {/* Header with toggle buttons and create button */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Job Filter"
            >
              <ToggleButton value="published">
                Publish Jobs | {jobList?.length}
              </ToggleButton>
              <ToggleButton value="draft">
                Draft Jobs | {draftCount}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid item>
                <Button variant="contained" size="small">
                  Create
                </Button>
              </Grid>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                <Grid item>
                  <Typography sx={{ my: 1 }}>Show</Typography>
                </Grid>
                <Grid item>
                  <FormControl size="small" sx={{ minWidth: 20 }}>
                    <Select value={age} onChange={handleChangeAge}>
                      <MenuItem value={10}>20</MenuItem>
                      <MenuItem value={20}>40</MenuItem>
                      <MenuItem value={30}>60</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Job List */}
      {/* {jobList.length > 0 ? (
        jobList.map((job) => (
          <Grid item xs={12} key={job.vacancyID} my={1}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" my={1}>
                    {job?.jobRole}
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
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
      )} */}
      {alignment === "published" ? (
        <JobCard
          jobList={jobList}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          menuAnchorEls={menuAnchorEls}
          handleViewJob={handleViewJob}
          handleCloseJob={handleCloseJob}
        />
      ) : (
        <DraftJob
          jobList={draftJobs}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          menuAnchorEls={menuAnchorEls}
          handleViewJob={handleViewJob}
          handleCloseJob={handleCloseJob}
        />
      )}

      {/* Pagination */}
      {(alignment === "published" ? jobList.length : draftCount) > 0 && (
        <Grid item xs={12} container justifyContent="center">
          <Pagination
            count={Math.ceil(
              (alignment === "published" ? jobList.length : draftCount) /
                rowsPerPage
            )}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      )}
      {/* Filter Toggle */}
      {/* <Grid item xs={12}> */}
      {/* <Button onClick={toggleFilter}>
      {isFilterOpen ? "Hide Filters" : "Show Filters"}
    </Button>
    {isFilterOpen && <Typography>Filter content goes here...</Typography>}
  </Grid> */}

      {/* Job Details Modal */}
      {isOpen("job") && selectedJob && (
        <JobDetailsModal
          isOpen={isOpen}
          close={() => close("job")}
          selectedJob={selectedJob}
        />
      )}
    </Grid>
  );
};

export default ManageJobs;
