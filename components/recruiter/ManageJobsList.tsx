"use client";

import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ManageJobsList = ({ selectedStatuses, setSelectedStatuses,showJobStatusFilter }) => {
  const [jobStatusOpen, setJobStatusOpen] = React.useState(false);
  const [postedByOpen, setPostedByOpen] = React.useState(false);
  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Typography variant="h6">ManageJobs And Responses</Typography>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: 360 },
          bgcolor: "#ffff",
          minHeight: "100vh",
          p: 2,
          mx: 2,
          // border: "1px solid #ddd",
          boxShadow: "0px 4px 10px rgba(70, 65, 65, 0.1)", 
              borderRadius: "8px"
        }}
      >
        <List>
          {/* Filter Header */}
          <ListItem sx={{ flexDirection: "row", alignItems: "center" }}>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary="All Filters" />
          </ListItem>
          <Divider />

          {/* Search Field */}
          <ListItem>
            <TextField
              fullWidth
              id="SearchBar"
              size="small"
              type="search"
              placeholder="Search Job or Id"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>

          <Divider />

          {/* Job Status Filter */}
           {showJobStatusFilter && (
            <>
              <ListItemButton onClick={() => setJobStatusOpen(!jobStatusOpen)}>
                <ListItemText primary="Job Status" />
                {jobStatusOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={jobStatusOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleStatusChange("Open")}
                  >
                    <ListItemIcon>
                      <Checkbox
                        {...label}
                        checked={selectedStatuses.includes("Open")}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Open" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleStatusChange("Closed")}
                  >
                    <ListItemIcon>
                      <Checkbox
                        {...label}
                        checked={selectedStatuses.includes("Closed")}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Closed" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Divider />
            </>
          )}

          <Divider />

          {/* Job Posted By Filter */}
          <ListItemButton onClick={() => setPostedByOpen(!postedByOpen)}>
            <ListItemText primary="Job Posted By" />
            {postedByOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={postedByOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox {...label} />
                </ListItemIcon>
                <ListItemText primary="Recruiter Name" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </>
  );
};
export default ManageJobsList;