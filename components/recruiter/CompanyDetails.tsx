"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CompanyDetailsData from "./CompanyDetailsData";
import { getHospital } from "@/lib/api/recruiter/queries";

const CompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState(false);

  const empty = ` ---- `;
  const details = [
    { name: "Company Name:", value: companyDetails?.name || empty},
    { name: "Company Type:", value: companyDetails?.type || empty},
    { name: "Industry:", value: companyDetails?.industry || empty},
    { name: "Contact Person:", value: companyDetails?.contactName || empty},
    { name: "Designation:", value: companyDetails?.designation || empty},
    { name: "Website:", value: companyDetails?.website || empty},
    { name: "Contact Number:", value: companyDetails?.contactPhone || empty},
    { name: "Alternate Contact Number:", value: companyDetails?.number || empty},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHospital();
        setCompanyDetails(data?.getHospital);
      } catch (error) {
        console.error("Failed to fecth hospital details:", error);
      }
    };
    fetchData();
  }, []);

  const [showKycDetails, setShowKycDetails] = useState(false);
  const handleShowKycDetails = () => {
    setShowKycDetails(true);
  };
  if (showKycDetails) {
    return <CompanyDetailsData />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", mx: 10 }}>
          <Typography sx={{ color: "#395987", my: 2 }}>
            Company Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 1,
            }}
          >
            {details.map((detail, index) => (
              <Grid
                container
                spacing={1}
                columnSpacing={4}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid
                  item
                  md={8}
                  justifyContent={"end"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {detail?.name}
                  </Typography>
                </Grid>
                <Grid item md={4} display={"flex"} alignItems={"center"}>
                  <Typography>{detail?.value}</Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
        <Box>
          <EditIcon sx={{ cursor: "pointer" }} onClick={handleShowKycDetails} />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
