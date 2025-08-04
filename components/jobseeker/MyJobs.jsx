"use client";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import SavedJobsComponent from "./SavedJobsComponent";
import AppliedJobsComponent from "./AppliedJobsComponent";
import { useSelector } from "react-redux";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyJobs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const profileDetails = useSelector((state) => state);
  return (
    <>
      <Grid container justifyContent={"center"} p={{md:3}}>
        <Grid md={8} xs={12}>
          <Box
            sx={{
              bgcolor:"white"
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
              sx={{ "& .MuiTab-root":{fontSize: {md:"16px",xs:"10px"}} }}
            >
              <Tab label="Saved Jobs" {...a11yProps(0)} />
              <Tab label="Applied Jobs" {...a11yProps(1)} />
              <Tab label="Manage Alerts" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SavedJobsComponent
            newSavedJobs={[]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AppliedJobsComponent />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default MyJobs;
