"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import { getPreviousPostedJobs } from "@/lib/api/recruiter/queries";
import debounce from "lodash.debounce";

const rowsPerPage = 5;

const PrefillJobsForm = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all jobs once
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getPreviousPostedJobs({
          start: 0,
          count: 1000, // fetch all jobs
          vacancyID: "",
        });
        const jobs = res?.getPreviousPostedJobs || [];
        setAllJobs(jobs);
        setFilteredJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Debounced filtering
  const debouncedFilter = useMemo(
    () =>
      debounce((query) => {
        const filtered = query
          ? allJobs.filter((job) =>
              job?.jobRole?.toLowerCase().includes(query.toLowerCase())
            )
          : allJobs;

        setFilteredJobs(filtered);
        setPage(1);
      }, 300),
    [allJobs]
  );

  useEffect(() => {
    debouncedFilter(searchQuery.trim());
    return () => debouncedFilter.cancel();
  }, [searchQuery, debouncedFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // ✅ Paginate filtered jobs
  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredJobs.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredJobs, page]);

  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);

  return (
    <Grid container sx={{ width: "100%" }}>
      <Box
        sx={{
          boxShadow: "0px 4px 10px rgba(70, 65, 65, 0.1)",
          borderRadius: "8px",
          width: 500,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
            px: 2,
          }}
        >
          <Typography variant="h5">Prefill from previous jobs</Typography>
          <Button>
            <CloseIcon />
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ px: 2 }}>
          <TextField
            fullWidth
            size="small"
            type="search"
            placeholder="Input search text"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Job Cards */}
        <Box sx={{ px: 2 }}>
          {loading ? (
            <Typography sx={{ mt: 2 }}>Loading jobs...</Typography>
          ) : paginatedJobs.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No jobs matched your search.</Typography>
          ) : (
            paginatedJobs.map((job, index) => (
              <Card key={job.id || index} sx={{ my: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <Avatar
                      sx={{
                        bgcolor: "rgb(242, 153, 74)",
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
                        gap: 2,
                        mt: 2,
                        my: 2,
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
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" my={2}>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default PrefillJobsForm;
