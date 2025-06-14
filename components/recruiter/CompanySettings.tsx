"use client";
import React from "react";
import RecruiterProfile from "./RecruiterProfile";
import CompanyProfile from "./CompanyProfile";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CompanySettings = () => {
  const router = useRouter();

  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(path);
    };
  return (
    <div>
      <Box sx={{ my: 8, mx: 30 }}>
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
          <Typography color="primary">Company Settings</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ overflowY: "auto", width: "100%" }}>
        <RecruiterProfile />
        <CompanyProfile />
      </Box>
    </div>
  );
};

export default CompanySettings;
