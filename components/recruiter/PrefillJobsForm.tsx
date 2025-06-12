import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import {
  getPreviousPostedJobs,
  getPreviousPostedJobsCount,
} from "@/lib/api/recruiter/queries";

const PrefillJobsForm = () => {
  const [jobList, setJobList] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(newPage);
  };
  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 5));
  //     setPage(1); // Reset to the first page when rows per page changes
  //   };
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const start = (page - 1) * rowsPerPage;

      const jobRes = await getPreviousPostedJobs({
        start,
        count: rowsPerPage,
        jobRole: "",
        vacancyID: "",
      });

      const jobs = jobRes?.getPreviousPostedJobs || [];
      setJobList(jobs);

      const countRes = await getPreviousPostedJobsCount(jobs);
      setTotalJobs(countRes || 0);
    } catch (error) {
      console.error("Error loading jobs or count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, rowsPerPage]);

  return (
    <Grid container sx={{ width: "100%", }}>
      <Box >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            // mx: 4,
            my: 2,
          }}
        >
          <Typography variant="h5" mx={5}>
            Prefill from previous jobs
          </Typography>
          <Button>
            <CloseIcon />
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ px: 2, }}>
          <TextField
            fullWidth
            id="SearchBar"
            size="small"
            type="search"
            placeholder="Input search text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Job Cards */}
        {loading ? (
          <Typography sx={{ mx: 2, mt: 2 }}>Loading jobs...</Typography>
        ) : jobList.length === 0 ? (
          <Typography sx={{ mx: 2, mt: 2 }}>No previous jobs found.</Typography>
        ) : (
          jobList.map((job, index) => (
            <Card key={job.id || index} sx={{ mx: 2, my: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: 60,
                      height: 60,
                      fontSize: 35,
                      mx: "auto",
                    }}
                    variant="rounded"
                  >
                    {job?.RecruiterName?.charAt(0)?.toUpperCase() || "M"}
                  </Avatar>
                </Grid>

                <Grid item xs={12} sm={10}>
                  <Typography variant="h6">
                    {job?.jobRole || "Job Role"} ({job?.expMin ?? "1"} -{" "}
                    {job?.expMax ?? "2"} Y Exp)
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    {job?.RecruiterName || "Unknown"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <PlaceIcon fontSize="small" />
                    {job?.location || "Hyderabad, Telangana"}
                    <WorkIcon fontSize="small" sx={{ ml: 2 }} />
                    {job?.expMin ?? "1"} Year
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <PaymentsRoundedIcon fontSize="small" />
                    {job?.minimumSalary} - {job?.maximumSalary ?? "2"} Lakhs
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          ))
        )}

        {/* Pagination */}
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          my={3}
          gap={2}
        >
          {jobList?.length > 0 && (
            <Pagination
              count={Math.ceil(jobList?.length / rowsPerPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default PrefillJobsForm;
