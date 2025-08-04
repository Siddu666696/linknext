// ManageJobs.jsx (Updated for Filtering by Status)

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
  Box,
  Menu,
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
import { useRouter } from "next/navigation";
import EmptyManageJobs from "./EmptyManageJobs";

const ManageJobs = ({
  alignment,
  selectedStatuses,
  setAlignment,
  jobList,
  draftCount,
  setJobList,
  setDraftCount,
  setShowJobStatusFilter,
}) => {
  const [age, setAge] = React.useState(10);
  const [jobPostedByMap, setJobPostedByMap] = React.useState({});
  const { startLoading, stopLoading } = UseLoading();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [menuAnchorEls, setMenuAnchorEls] = React.useState({});
  const dispatch = useDispatch();
  const { isOpen, close, open } = UseModalManager();
  const router = useRouter();
  const [draftJobs, setDraftJobs] = React.useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeAge = (event) => setAge(event.target.value);

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

  React.useEffect(() => {
    const saved = localStorage.getItem("jobTab");
    if (saved) setAlignment(saved);
  }, []);

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
          setShowJobStatusFilter(true); // ✅ Show job status filter only for published
          await getJobStatus();
          const res = await getVacanciesByBatch({
            start: startIndex,
            count: rowsPerPage,
            jobRole: "",
            vacancyID: "",
            sortBy: "",
            postedByUserID: "",
            status: selectedStatuses.join(","),
          });
          setJobList(res?.getVacanciesByBatch || []);
        } else {
          setShowJobStatusFilter(false); // ✅ Hide filter in draft tab
          const draftRes = await getDraftJobsByBatch({
            start: startIndex,
            count: rowsPerPage,
            jobRole: "",
            vacancyID: "",
            sortBy: "",
            postedByUserID: "",
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
  }, [page, rowsPerPage, alignment, setShowJobStatusFilter, selectedStatuses,setShowJobStatusFilter]);

  const filteredJobs = selectedStatuses.length
    ? jobList.filter((job) => selectedStatuses.includes(job.status))
    : jobList;
  if (alignment === "published") {
    setShowJobStatusFilter(true); // ✅ Show for published
  } else {
    setShowJobStatusFilter(false); // ✅ Hide for draft
  }
  return (
    <Grid container spacing={2} sx={{ px: 2, py: 3 }}>
      {alignment === "published" && filteredJobs.length === 0 && (
        <Grid item xs={12}>
          <EmptyManageJobs />
        </Grid>
      )}
      {alignment === "draft" && draftCount === 0 && (
        <Grid item xs={12}>
          <EmptyManageJobs />
        </Grid>
      )}

      {alignment === "published" ? (
        <JobCard
          jobList={filteredJobs}
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

      {(alignment === "published" ? filteredJobs.length : draftCount) > 0 && (
        <Grid item xs={12} container justifyContent="center">
          <Pagination
            count={Math.ceil(
              (alignment === "published" ? filteredJobs.length : draftCount) /
                rowsPerPage
            )}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      )}

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
