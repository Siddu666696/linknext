"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import KYCDetailsModal from "./KYCDetailsModal";

const KYCDetails = ({ data }) => {
  const empty = ` --- `;
  const details = [
    { name: "PAN Number:", value: data?.getHospitalDetails?.pan || empty },
    {
      name: "KYC Status:",
      value: data?.getHospitalDetails?.KYCstatus || empty,
    },
    { name: "Address:", value: data?.getHospitalDetails?.address || empty },
    { name: "Country:", value: data?.getHospitalDetails?.country || empty },
    { name: "State:", value: data?.getHospitalDetails?.state || empty },
    { name: "City/Town:", value: data?.getHospitalDetails?.city || empty },
    { name: "Area Name:", value: data?.getHospitalDetails?.areaName || empty },
    { name: "PIN Code:", value: data?.getHospitalDetails?.pincode || empty },
    { name: "GSTIN:", value: data?.getHospitalDetails?.gstin || empty },
  ];

  const [showKycDetails, setShowKycDetails] = useState(false);
  const handleShowKycDetails = ({ data }) => {
    setShowKycDetails(true);
  };
  if (showKycDetails) {
    return <KYCDetailsModal data={data} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", mx: 10 }}>
          <Typography sx={{ color: "#395987", my: 2 }}>
            KYC Compliance Details
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
                  md={6}
                  justifyContent={"end"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {detail?.name}
                  </Typography>
                </Grid>
                <Grid item md={6} display={"flex"} alignItems={"center"}>
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

export default KYCDetails;
