"use client";

import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageJobs from "./ManageJobs";
import ManageJobsList from "./ManageJobsList";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import {
  getDraftJobsByBatch,
  getDraftJobCount,
  getVacanciesByBatch,
} from "@/lib/api/recruiter/queries";
import EmptyManageJobs from "./EmptyManageJobs";

const ManageJobsnResponses = () => {
  const router = useRouter();

  const [alignment, setAlignment] = useState("published");
  const [publishedJobs, setPublishedJobs] = useState([]);
  const [draftJobs, setDraftJobs] = useState([]);
  const [draftCount, setDraftCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [age, setAge] = useState(10);
  const [showJobStatusFilter, setShowJobStatusFilter] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      localStorage.setItem("jobTab", newAlignment);
    }
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const publishedRes = await getVacanciesByBatch({
          start: 0,
          count: rowsPerPage,
          jobRole: "",
          vacancyID: "",
          sortBy: "",
          postedByUserID: "",
          status: "",
        });

        const draftRes = await getDraftJobsByBatch({
          start: 0,
          count: rowsPerPage,
          jobRole: "",
          vacancyID: "",
          sortBy: "",
          postedByUserID: "",
        });

        const draftCountRes = await getDraftJobCount();

        setPublishedJobs(publishedRes?.getVacanciesByBatch || []);
        setDraftJobs(draftRes?.getDraftJobsByBatch || []);
        setDraftCount(draftCountRes?.getDraftJobCount || 0);
      } catch (error) {
        console.error("Error loading job data:", error);
      }
    };

    fetchJobs();
  }, [rowsPerPage]);

  const isEmpty = publishedJobs.length === 0 && draftCount === 0;

  return (
    <>
      <Box sx={{ my: 12, mx: 20 }}>
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
          <Typography color="primary">Manage Jobs</Typography>
        </Breadcrumbs>
      </Box>

      {/* Toggle and Filter Header */}
      {/* <Grid container spacing={2} > */}
      {/* <Grid item xs={12} md={6}> */}
      {/* <Grid container > */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Job Filter"
          sx={{
            "& .MuiToggleButton-root": {
              color: "#395987",
              borderColor: "#395987",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              px: 2,
            },
            "& .Mui-selected": {
              backgroundColor: "#395987",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2e476f",
              },
            },
          }}
        >
          <ToggleButton value="published">
            Publish Jobs | {publishedJobs?.length}
          </ToggleButton>
          <ToggleButton value="draft">Draft Jobs | {draftCount}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {/* </Grid> */}
      {/* </Grid> */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Grid item>
              {isEmpty && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => router.push("/recruiter/post-job")}
                >
                  Create
                </Button>
              )}
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
      {/* </Grid> */}

      {/* Main Content */}
      {isEmpty ? (
        <EmptyManageJobs />
      ) : (
        <Grid container spacing={2} sx={{ p: { xs: 2, md: 3 }, my: 5 }}>
          <Grid item xs={12} md={4}>
            <ManageJobsList
              alignment={alignment}
              setAlignment={setAlignment}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              showJobStatusFilter={showJobStatusFilter}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <ManageJobs
              alignment={alignment}
              setAlignment={setAlignment}
              jobList={alignment === "published" ? publishedJobs : draftJobs}
              draftCount={draftCount}
              setJobList={setPublishedJobs}
              setDraftCount={setDraftCount}
              selectedStatuses={selectedStatuses}
              setShowJobStatusFilter={setShowJobStatusFilter}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ManageJobsnResponses;
