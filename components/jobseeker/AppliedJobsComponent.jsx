"use client"
import React, { useEffect, useState } from "react";
import { getAppliedJobs } from "@/lib/api/jobseeker/queries";
import UseLoading from "@/hooks/UseLoading";
import { Box, Pagination, Typography } from "@mui/material";
import { JobCardSkeleton } from "../skeletons/JobCardSkeleton";
import JobCard from "../commonComponents/JobCard";
import theme from "@/theme";
const AppliedJobsComponent = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
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
          getAppliedJobs().then((res) => {
            setAppliedJobs(res.getAppliedJobs);
            stopLoading();
          });
        } catch (err) {
          console.error(err);
          stopLoading();
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
            <JobCardSkeleton />
          ) : !loading&&appliedJobs.length > 0 ? (
            appliedJobs
              ?.slice(
                (page > 0 ? page - 1 : page) * rowsPerPage,
                (page > 0 ? page - 1 : page) * rowsPerPage + rowsPerPage
              )
              ?.map((appliedJob) => {
                return (
                  <JobCard
                    key={appliedJob.vacancyID} // Assuming each job has a unique ID, use it here
                    jobData={appliedJob}
                    // handleShowJob={handleShowJob}
                    // handleSingleJob={handleSingleJob}
                    // resume={resume}
                    // handleApplyForJob={handleApplyForJob}
                    // handleModalForNoResumeAlert={handleModalForNoResumeAlert}
                    // handleSaveJob={handleSaveThisJob}
                    // handleDeleteSavedJobs={handleDeleteThisSavedJobs}
                    // loaderBtn={loaderBtn}
                    // clickedJob={clickedJob}
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
                alt="appliedJob-illu"
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
          {appliedJobs?.length > 10 && (
            <Pagination
              count={Math.ceil(appliedJobs?.length / rowsPerPage)}
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

export default AppliedJobsComponent;
