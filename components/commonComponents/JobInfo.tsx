// "use client";
// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import Image from "next/image";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import DomainIcon from "@mui/icons-material/Domain";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// // import genderIcon from "../../assets/icons/genderIcon.png";
// import { JobDetails } from "./JobDetailsPage";

// const labelBoxStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   mb: { xs: "0.88rem", md: "0.31rem" },
// };

// const labelTextStyle = {
//   color: "black",
//   fontSize: "0.75rem",
//   fontWeight: 600,
// };

// const valueTextStyle = {
//   color: "#474D6A",
//   fontSize: "0.875rem",
//   fontWeight: 600,
// };

// const formatExperience = (min?: number, max?: number) => {
//   if (min == null && max == null) return "";
//   let result = `${min ?? 0} ${min === 1 ? "Year" : "Years"}`;
//   if (max && max !== 0) {
//     result += ` - ${max} ${max === 1 ? "Year" : "Years"}`;
//   }
//   return result;
// };

// function JobInfo({
//   jobDetails,

// }: {
//   jobDetails: JobDetails;

// }) {
//   return (
//     <Grid container spacing={3} mb={3}>
//       {jobDetails?.employmentType && (
//         <Grid item xs={12} md={6}>
//           <Box sx={labelBoxStyle}>
//             <WorkOutlineOutlinedIcon sx={{ color: "black", fontSize: "1rem" }} />
//             <Typography sx={labelTextStyle}>Experience</Typography>
//           </Box>
//           <Typography sx={valueTextStyle}>
//             {formatExperience(jobDetails.expMin, jobDetails.expMax)}
//           </Typography>
//         </Grid>
//       )}

//       {jobDetails?.qualification && (
//         <Grid item xs={12} md={6}>
//           <Box sx={labelBoxStyle}>
//             <SchoolOutlinedIcon sx={{ color: "black", fontSize: "1rem" }} />
//             <Typography sx={labelTextStyle}>Education</Typography>
//           </Box>
//           <Typography sx={valueTextStyle}>
//             {jobDetails.qualification}
//           </Typography>
//         </Grid>
//       )}

//       {jobDetails?.department && (
//         <Grid item xs={12} md={6}>
//           <Box sx={labelBoxStyle}>
//             <DomainIcon sx={{ color: "black", fontSize: "1rem" }} />
//             <Typography sx={labelTextStyle}>Department</Typography>
//           </Box>
//           <Typography sx={valueTextStyle}>
//             {jobDetails.department}
//           </Typography>
//         </Grid>
//       )}

//       {jobDetails?.gender && (
//         <Grid item xs={12} md={6}>
//           <Box sx={labelBoxStyle}>
//             <Box sx={{ width: "1rem", height: "1rem", position: "relative" }}>
//               {/* <Image src={genderIcon} alt="gender" fill style={{ objectFit: "contain" }} /> */}
//             </Box>
//             <Typography sx={labelTextStyle}>Gender</Typography>
//           </Box>
//           <Typography sx={valueTextStyle}>
//             {jobDetails.gender
//               .split(",")
//               .map((g: string) => g.charAt(0).toUpperCase() + g.slice(1))
//               .join(" / ")}
//           </Typography>
//         </Grid>
//       )}

//       {jobDetails?.shift && (
//         <Grid item xs={12} md={6}>
//           <Box sx={labelBoxStyle}>
//             <AccessTimeOutlinedIcon sx={{ color: "black", fontSize: "1rem" }} />
//             <Typography sx={labelTextStyle}>Job Shift</Typography>
//           </Box>
//           <Typography sx={valueTextStyle}>
//             {jobDetails.shift}
//           </Typography>
//         </Grid>
//       )}

//       {jobDetails?.skill && (
//         <Grid item xs={12}>
//           <Box sx={labelBoxStyle}>
//             <PsychologyOutlinedIcon sx={{ color: "black", fontSize: "1rem" }} />
//             <Typography sx={labelTextStyle}>Skills</Typography>
//           </Box>
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1,  }}>
//             {jobDetails.skill
//               .split(",")
//               .map((skill: string, index: number) => (
//                 <Typography key={`${skill}-${index}`} sx={{ }}>
//                   {skill.trim()}
//                 </Typography>
//               ))}
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// export default JobInfo;


import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { JobDetails } from './JobDetailsPage';

const labelStyle = {
  fontSize: "12px",
  color: "#828282",
  fontWeight: 600,
};

const valueStyle = {
  fontSize: "12px",
  color: "#4F4F4F",
  fontWeight: 600,
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", { day: "2-digit" })}-${date.toLocaleString("default", {
    month: "short",
  })}-${date.toLocaleString("default", { year: "numeric" })}`;
}

function renderRow(label: string, value: string | number | React.ReactNode, key?: string | number) {
  if (!value && value !== 0) return null;
  return (
    <Grid item xs={12} md={6} key={key || label}>
      <Grid container sx={{ mb: "10px" }}>
        <Grid item xs={5} sm={3.5} md={5}>
          <Typography  sx={labelStyle}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={7} sm={8.5} md={7}>
          <Typography  sx={valueStyle}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

function JobInfo({jobDetails}: { jobDetails: JobDetails }) {
  const {
    employmentType,
    qualification,
    jobRole,
    department,
    course,
    lastDateToApply,
    gender,
    shift,
    numberOfVacancies,
    skills = [],
    getJobPostPrimarySpecialization = [],
    getJobPostSecondarySpecialization = [],
  } = jobDetails || {};

  return (
    <>
    <Grid container>
      <Grid container item xs={12} spacing={2} sx={{ mb: "25px" }}>
        {renderRow("Employment Type", employmentType)}
        {renderRow("Qualification", qualification)}
        {renderRow("Job Role", jobRole)}
        {renderRow("Department", department)}
        {renderRow("Course", course)}
        {lastDateToApply &&
          renderRow("Last Date to Apply", formatDate(lastDateToApply))}
        {gender &&
          renderRow(
            "Gender",
            gender
              .split(",")
              .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
              .join(" / ")
          )}
        {renderRow("Shift/Timings", shift)}
        {renderRow("Number Of Vacancies", numberOfVacancies)}

        {skills?.length > 0 && (
          <Grid item xs={12}>
            <Grid container sx={{ my: "10px" }}>
              <Grid item xs={5} sm={3.5} md={2.5}>
                <Typography variant="subtitle2" sx={labelStyle}>
                  Skills
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8.5} md={9.5}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px"}}>
                  {skills.map((skill) => (
                    <Typography key={skill} sx={{  }}>
                      {skill}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}

        {(getJobPostPrimarySpecialization?.length > 0 ||
          getJobPostSecondarySpecialization?.length > 0) && (
         <> <Grid item xs={12}>
            <Grid container sx={{ my: "10px" }}>
              <Grid item xs={5} sm={3.5} md={2.5}>
                <Typography variant="subtitle2" sx={labelStyle}>
                  Specialization
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8.5} md={9.5}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px"}}>
                  {getJobPostPrimarySpecialization?.map((ps) => (
                    <Typography key={ps?.specialization} >
                      {ps?.specialization}
                    </Typography>
                  ))}
                  {getJobPostSecondarySpecialization?.map((ps) => (
                    <Typography key={ps?.specialization} >
                      {ps?.specialization}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid></>
        )}
      </Grid>
    </Grid>
    </>
  );
}

export default JobInfo;
