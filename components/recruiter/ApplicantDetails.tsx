
"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Stack } from "@mui/material";
import {
  getApplicantsListByJob,
  getAVacancy,
} from "@/lib/api/recruiter/queries";

interface ApplicantDetailsProps {
  vacancyId: string; // ✅ passed from page.tsx
   jobRole: string;
}

interface Applicant {
  id: number;
  applicantName: string;
  designation: string;
  companyName: string;
  exp: string;
  edu: string;
  noticePeriod: string;
  location: string;
  appliedDate: string;
}

const columns: GridColDef[] = [
  { field: "applicantName", headerName: "Applicant Name", flex: 1, minWidth: 150 },
  { field: "designation", headerName: "Designation", flex: 1, minWidth: 150 },
  { field: "companyName", headerName: "Company Name", flex: 1, minWidth: 150 },
  { field: "exp", headerName: "Exp", flex: 0.5, minWidth: 80 },
  { field: "edu", headerName: "Edu", flex: 0.8, minWidth: 120 },
  { field: "noticePeriod", headerName: "Notice Period", flex: 0.8, minWidth: 120 },
  { field: "location", headerName: "Location", flex: 1, minWidth: 150 },
  { field: "appliedDate", headerName: "Applied Date", flex: 1, minWidth: 150 },
];

const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({ vacancyId, jobRole }) => {
  const [rows, setRows] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!vacancyId) return;

      try {
        const vacancyRes = await getAVacancy({ vacancyID: Number(vacancyId) });
        const job = vacancyRes?.data?.getAVacancy;
        setJobDetails(job);

        // Get applicants
        const applicantsRes = await getApplicantsListByJob({ vacancyID: Number(vacancyId) });
        const applicants = applicantsRes?.data?.getApplicantsListByJob || [];

        const formatted = applicants.map((a: any, index: number) => ({
          id: a.jaID || index,
          applicantName: a.name,
          designation: a.designation,
          companyName: a.companyName,
          exp: a.exp,
          edu: a.edu,
          noticePeriod: a.noticePeriod,
          location: a.location,
          appliedDate: a.appliedAt
            ? new Date(a.appliedAt).toLocaleDateString()
            : "-",
        }));

        setRows(formatted);
      } catch (err) {
        console.error("⚠️ Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vacancyId]);

  return (
    <Box sx={{ height: 500, width: "100%", my: 25 }}>
      {jobDetails && (
        <Stack direction="row" spacing={3} mb={2}>
          <Typography variant="h5">{jobDetails.jobRole|| jobRole}</Typography>
          <Typography>JobID: {jobDetails.vacancyID}</Typography>
          <Typography>JobType: {jobDetails.employmentType}</Typography>
          <Typography>
            JobExpire:{" "}
            {jobDetails.lastDateToApply
              ? new Date(jobDetails.lastDateToApply).toLocaleDateString()
              : "-"}
          </Typography>
        </Stack>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20, 100]}
        checkboxSelection
        initialState={{
    pagination: { paginationModel: { pageSize: 10, page: 0 } },
  }}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: () => (
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              No applicants have applied yet.
            </Typography>
          ),
        }}
      />
    </Box>
  );
};

export default ApplicantDetails;
