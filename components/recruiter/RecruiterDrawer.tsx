"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";

// Define your image icon list (placed in /public/assets/)
const navItems = [
  { icon: "/assets/icons/postPremiumJobIcon.png", text: "Post Hot Job Listing" },
  { icon: "/assets/icons/searchResumeIcon.png", text: "Search Candidates" },
  { icon:"/assets/icons/manageJobAndResponseIcon.png", text: "Manage Jobs" },
  { icon: "/assets/icons/postStandardJobIcon.png", text: "Manage Sub Users" },
  {
    icon: "/assets/icons/subscriptionStatusIcon.png",
    text: "Subscription Status",
  },
  { icon: "/assets/icons/companyProfileIcon.png", text: "Company Profile" },
];

const RecruiterDrawer = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 250 },
        bgcolor: "#fff",
        minHeight: "100vh",
        p: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <List>
        {navItems.map((item, index) => (
          <div key={index}>
            <ListItem sx={{ flexDirection: "column", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: "auto", mb: 1 }}>
                <Image src={item.icon} alt={item.text} width={25} height={25} />
              </ListItemIcon>
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
