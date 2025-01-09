import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  ExperienceDisplay,
  SalaryDisplay,
} from "../../lib/utils/commonFunctions";
// import {WorkIcon, PlaceIcon, AccountBalanceWalletIcon} from "@mui/icons-material";
const JobCard = ({ jobData }) => {
  const textStyle = {
    color: "#6F7482",
    fontSize: { xs: "0.75rem !important", md: "0.875rem !important" },
    fontWeight: 500,
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 0, md: 1 }}
        sx={{
          cursor: "pointer",
          backgroundColor: "white",
          borderRadius: "12px",
          py: { xs: "1rem", md: "0.875rem" },
          px: { xs: "1rem", md: "1rem" },
          border: "1px solid #EDEDED",
          //   boxShadow: isSelected && "0px 0px 12px 6px #E4EEF5",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Link
          href={`/job/${jobData?.vacancyID}`}
          style={{ textDecoration: "none", width: "100%", display: "flex" }}
        >
          <Grid
            item
            xs={12}
            md={8.5}
            sx={{
              p: { xs: "16px 12px", md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: { xs: 1, md: 0.63 },
                alignItems: "center",
                pb: { xs: 1, md: "0.75rem" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0.75rem",
                  width: { xs: "100%", md: "auto" },
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "4rem", md: "2.875rem" },
                    height: { xs: "4rem", md: "2.875rem" },
                  }}
                >
                  <img
                    src={
                      jobData?.logo === "data:image/png;base64,"
                        ? defaultRecruiterLogo
                        : jobData?.logo
                    }
                    alt={jobData?.jobRole || jobData?.otherJobRole}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    width: { xs: "100%", md: "auto" },
                    alignItems: { xs: "flex-start" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1rem" },
                      fontWeight: 700,
                      color: "black",
                      wordBreak: "break-word",
                    }}
                  >
                    {jobData?.jobRole ||
                      jobData?.otherJobRole ||
                      jobData?.jobTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.875rem", md: "0.875rem" },
                      fontWeight: 600,
                      color: "#40434B",
                      wordBreak: "break-word",
                    }}
                  >
                    {jobData?.systemUserHospital ||
                      jobData?.hospitalName ||
                      jobData?.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* <JobLocExpSal {...jobData} /> */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection:{ xs: "column", md: "row" },
                gap: "0.75rem",
                ".MuiTypography-root": {
                  ...textStyle,
                  display: "flex",
                  alignItems: "center",
                  gap:1
                },
              }}
            >
              <Typography>
                <PlaceIcon />
                {jobData?.location}
              </Typography>

              <Typography>
                <WorkIcon />
                {ExperienceDisplay({
                  expMin: jobData?.expMin,
                  expMax: jobData?.expMax,
                })}
              </Typography>

              <Typography>
                <AccountBalanceWalletIcon />
                {SalaryDisplay({
                  minimumSalary: jobData?.salaryMin,
                  maximumSalary: jobData?.salaryMax,
                  isSalaryDisclosed: jobData?.isSalaryDisclosed,
                })}
              </Typography>
            </Box>
            {/* <Box
              sx={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
            >
              <Typography>{jobData?.employmentType}</Typography>
              <Typography>
                {ExperienceDisplay(jobData?.expMin, jobData?.expMax)}
              </Typography>
            </Box> */}
          </Grid>
        </Link>
        <Grid
          item
          xs={12}
          md={3.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            borderTop: { xs: "1px solid #E4EEF5", md: "none" },
            pt: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
              pr: { md: "0.5rem" },
              width: "100%",
            }}
          >
            {/* {jobCardLoaderBtn &&
            clickedJob?.vacancyID === jobData?.vacancyID ? (
              <Button></Button>
            ) : (
              <></>
            )} */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default JobCard;
