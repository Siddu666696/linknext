"use client";
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Link, Typography, Pagination } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import theme from "@/theme";
// import SingleJobCard from './SingleJobCard'; // Assuming you have this component
// import SingleJobCardSkeleton from './SingleJobCardSkeleton'; // Assuming you have this component
// import jsSearchJobSaved from '../public/jsSearchJobSaved.svg'; // Update with your actual path
import JobCard from "../commonComponents/JobCard";
import { getSavedJobs } from "@/lib/api/jobseeker/queries";
import UseLoading from "@/hooks/UseLoading";
import { JobCardSkeleton } from "../skeletons/JobCardSkeleton";
const SavedJobsComponent = ({
  newSavl,
  matches,
  handleShowJob,
  handleSingleJob,
  resume,
  handleApplyForJob,
  handleModalForNoResumeAlert,
  handleSaveThisJob,
  handleDeleteThisSavedJobs,
  loaderBtn,
  clickedJob,
}) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { loading, startLoading, stopLoading } = UseLoading();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };
  useEffect(() => {
    try {
      startLoading();
      getSavedJobs().then((res) => {
        setSavedJobs(res.getSavedJobs);
        stopLoading();

      });
    } catch (err) {
      console.error(err);
    } 
  }, []);
  return (
    <Box>
      <Box maxWidth="md" sx={{ mx: "auto", px: "16px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mb: 3,
          }}
        >
          {loading ? (
            <JobCardSkeleton  />
          ) : savedJobs.length > 0 ? (
            savedJobs
              ?.slice(
                (page > 0 ? page - 1 : page) * rowsPerPage,
                (page > 0 ? page - 1 : page) * rowsPerPage + rowsPerPage
              )
              ?.map((savedJob) => {
                return (
                  <JobCard
                    key={savedJob.vacancyID} 
                    jobData={savedJob}
                  />
                );
              })
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                {/* <img
                    src={jsSearchJobSaved.src} 
                    alt="savedJob-illu"
                    style={{ width: '400px', height: '400px' }}
                  /> */}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    Width: "329px",
                    height: "54px",
                    color: theme.palette.primary.main,
                    fontWeight: "700",
                    fontSize: 40,
                    lineHeight: "54.47px",
                  }}
                >
                  No Saved Job Found
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ mb: 10, display: "flex", justifyContent: "flex-end" }}>
          {savedJobs?.length > 10 && (
            <Pagination
              count={Math.ceil(savedJobs?.length / rowsPerPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SavedJobsComponent;
