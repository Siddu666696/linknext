"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const RecruiterDrawer = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 250 },
        bgcolor: "#ffff",
        minHeight: "100vh",
        p: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <List>
        {[
          { icon: <CurrencyRupeeIcon fontSize="large" />, text: "Post Hot Job Listing" },
          { icon: <PlagiarismOutlinedIcon fontSize="large" />, text: "Search Candidates" },
          { icon: <AccountTreeOutlinedIcon fontSize="large" />, text: "Manage Jobs" },
          { icon: <CorporateFareOutlinedIcon fontSize="large" />, text: "Manage Sub Users" },
          { icon: <WorkspacesOutlinedIcon fontSize="large" />, text: "Subscription Status" },
          { icon: <CalendarMonthOutlinedIcon fontSize="large" />, text: "Company Profile" },
        ].map((item, index) => (
          <div key={index}>
            <ListItem  sx={{ flexDirection: "column", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: "auto", mb: 1 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default RecruiterDrawer;
