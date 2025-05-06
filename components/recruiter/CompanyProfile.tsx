"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Paper, Grid, useMediaQuery } from "@mui/material";
import KYCDeatils from "./KYCDeatils";
import CompanyDetails from "./CompanyDetails";
import CompanyGallery from "./CompanyGallery";
import { getHospitalDetails } from "@/lib/api/recruiter/queries";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CompanyProfile = ({ data }) => {
  const [value, setValue] = useState(0);
  const [kycDetails, setKycDetails] = useState();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHospitalDetails();
        setKycDetails(data);
      } catch (error) {
        console.error("Failed to fetch hospital details:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container justifyContent="center" sx={{ px: { xs: 2, md: 6 } }}>
      <Paper elevation={3} sx={{ width: "100%",mx:14 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="company profile tabs"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              sx={{ display: "flex", justifyContent: isMobile ? "flex-start" : "center"}}
            >
              <Tab label="KYC Compliance Details" {...a11yProps(0)} sx={{ mx: 6 }} />
              <Tab label="Company Details" {...a11yProps(1)} sx={{ mx: 6 }}/>
              <Tab label="Gallery" {...a11yProps(2)} sx={{ mx: 6 }}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <KYCDeatils data={kycDetails} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CompanyDetails />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CompanyGallery />
          </CustomTabPanel>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CompanyProfile;
