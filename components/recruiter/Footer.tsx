// import { Box, Grid, Typography, IconButton } from "@mui/material";
// import React from "react";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import Image from "next/image";
// import HeaderNew from "../../public/assets/images/HeaderNew.svg";
// import Link from "next/link";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import { Instagram } from "@mui/icons-material";
// const Footer = () => {
//   const footerLinks = [
//     {
//       title: "Section 1",
//       links: [
//         { label: "Home", href: "/" },
//         { label: "Jobseekers", href: "/jobseekers" },
//         { label: "Recruiters", href: "/recruiters" },
//         { label: "Browse Jobs", href: "/jobs" },
//         { label: "Privacy Policy", href: "/recruiter/privacy-policy" },
//       ],
//     },
//     {
//       title: "Section 2",
//       links: [
//         { label: "About Us", href: "/about" },
//         { label: "Contact Us", href: "/contact" },
//         { label: "FAQ", href: "/faq" },
//         { label: "Payments", href: "/payments" },
//         { label: "Press and Media", href: "/press-media" },
//       ],
//     },
//     {
//       title: "Section 3",
//       links: [
//         { label: "Blog", href: "/blog" },
//         { label: "Team", href: "/team" },
//         { label: "Resources", href: "/resources" },
//         { label: "Site Map", href: "/sitemap" },
//         { label: "Terms & Services", href: "/terms" },
//       ],
//     },
//   ];
//   return (
//     <Box
//       sx={{
//         p:{xs:1, sm:3},
//         display: "flex",
//         backgroundColor: "#e3f2fd",
//         width: "100%",
//         zIndex: 1000,
//         position: "static",
//         left: 0,
//         right: 0,
//       }}
//     >
//       <Grid container alignItems="start" flexWrap="wrap" p={2} spacing={2}>
//         <Grid item xs={12} sm={6}  display={"flex"} flexDirection={{xs:"column",md:"row"}} justifyContent={"space-around"}>
//           <Image
//             width={"120"}
//             height={"40"}
//             alt="medlink"
//             style={{ justifySelf: "start",alignSelf:"start" }}
//             src={HeaderNew}
//           />
//           <Box>
//           <Typography variant="h5" px={1}>Follow Us:</Typography>
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton
//               color="primary"
//               href="https://facebook.com"
//               target="_blank"
//             >
//               <FacebookIcon />
//             </IconButton>
//             <IconButton
//               color="primary"
//               href="https://twitter.com"
//               target="_blank"
//             >
//               <TwitterIcon />
//             </IconButton>
//             <IconButton
//               color="primary"
//               href="https://linkedin.com"
//               target="_blank"
//             >
//               <LinkedInIcon />
//             </IconButton>
//             <IconButton
//               color="primary"
//               href="https://youtube.com"
//               target="_blank"
//             >
//               <YouTubeIcon />
//             </IconButton>
//             <IconButton
//               color="primary"
//               href="https://instagram.com"
//               target="_blank"
//             >
//               <Instagram />
//             </IconButton>
//           </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6}  display={"flex"} flexDirection={{xs:"column",lg:"row"}} justifyContent={"space-around"} >
//           <Box >
//           <Typography variant="h5"  >
//             Get our mobile app
//           </Typography>
//           <Typography variant="body1" sx={{  fontSize: 12 }}>
//             Apply to jobs on the go from our mobile app
//           </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               gap: 1,
//               justifyContent:{xs:"center", md:"end"},
//               flexWrap: "wrap",
//             }}
//           >
//             <Box
//               component="a"
//               href="https://play.google.com/store"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Image
//                 src="/assets/images/google-play-badge (1) 1.svg"
//                 alt="Get it on Google Play"
//                 // style={{ height: 40 }}
//                 objectFit="contain"
//                 width={140}
//                 height={40}
//               />
//             </Box>
//             <Box
//               component="a"
//               href="https://www.apple.com/app-store/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Image
//                 src="/assets/images/google-play-badge (1) 2.svg"
//                 alt="Download on the App Store"
//                 objectFit="contain"
//                 width={140}
//                 height={40}
//               />
//             </Box>
//           </Box>
//         </Grid>
//         {footerLinks.map((section, index) => (
//           <Grid item xs={12} sm={6} md={4}  order={index + 3} key={index}>
//             <Box>
//               {section.links.map(({ label, href }) => (
//                 <Link href={href} key={label} passHref>
//                   <Typography
//                     variant="body2"
//                     my={2}
//                     textAlign={{xs: "center", sm: "center"}}
//                     color="#395987"
//                     sx={{ cursor: "pointer" }}
//                   >
//                     {label}
//                   </Typography>
//                 </Link>
//               ))}
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Footer;
"use client";
import { Box, Grid, Typography, IconButton, Stack } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Instagram } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import HeaderNew from "../../public/assets/images/HeaderNew.svg";

const Footer = () => {
  const footerLinks = [
    {
      title: "Section 1",
      links: [
        { label: "Home", href: "/" },
        { label: "Jobseekers", href: "/jobseekers" },
        { label: "Recruiters", href: "/recruiters" },
        { label: "Browse Jobs", href: "/jobs" },
        { label: "Privacy Policy", href: "/recruiter/privacy-policy" },
      ],
    },
    {
      title: "Section 2",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Payments", href: "/payments" },
        { label: "Press and Media", href: "/press-media" },
      ],
    },
    {
      title: "Section 3",
      links: [
        { label: "Blogs", href: "/blogs" },
        { label: "Team", href: "/team" },
        { label: "Resources", href: "/resources" },
        { label: "Site Map", href: "/sitemap" },
        { label: "Terms & Services", href: "/terms" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#e3f2fd",
        py: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 4, md: 6 },
        mt: 4,
      }}
    >
      <Grid container spacing={4}>
        {/* Logo + Socials */}
        <Grid item xs={12} md={6}>
          <Stack
            direction={{ xs: "column", lg: "row" }} // ✅ vertical until lg, then horizontal
            spacing={3}
            alignItems={{ xs: "center", lg: "flex-start" }}
            justifyContent={{ xs: "center", lg: "space-between" }}
          >
            {/* Logo */}
            <Box
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 40, sm: 50, md: 60 },
                position: "relative",
              }}
            >
              <Image
                src={HeaderNew}
                alt="medlink"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 600px) 120px, (max-width: 900px) 150px, 180px"
              />
            </Box>

            {/* Social Icons */}
            <Box textAlign={{ xs: "center", lg: "left" }}>
              <Typography variant="h6" mb={1}>
                Follow Us
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={{ xs: "center", lg: "flex-start" }}
              >
                <IconButton
                  href="https://www.facebook.com/profile.php?id=100085360226241"
                  target="_blank"
                  color="primary"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://twitter.com/Medlinkjobsind"
                  target="_blank"
                  color="primary"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/company/medlink-jobs/about"
                  target="_blank"
                  color="primary"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  href="https://www.youtube.com/channel/UCTjqm_kIHBARGqHmat4KyDA"
                  target="_blank"
                  color="primary"
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  href="https://www.instagram.com/medlink_jobs"
                  target="_blank"
                  color="primary"
                >
                  <Instagram />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Get App Section */}
        <Grid item xs={12} md={6}>
          <Stack
            direction={{ xs: "column", lg: "row" }} // ✅ vertical until lg, then horizontal
            spacing={3}
            alignItems={{ xs: "center", lg: "flex-start" }}
            justifyContent={{ xs: "center", lg: "space-between" }}
          >
            {/* Text */}
            <Box textAlign={{ xs: "center", lg: "left" }}>
              <Typography variant="h6">Get our mobile app</Typography>
              <Typography variant="body2">
                Apply to jobs on the go from our mobile app
              </Typography>
            </Box>

            {/* App Badges */}
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              justifyContent="center"
            >
              <Box
                component="a"
                href="https://play.google.com/store/apps/details?id=com.medlinkjobseekerapp"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: { xs: 120, sm: 140 },
                  height: { xs: 40, sm: 50 },
                  position: "relative",
                }}
              >
                <Image
                  src="/assets/images/google-play-badge (1) 1.svg"
                  alt="Get it on Google Play"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width:600px) 120px, 140px"
                />
              </Box>
              <Box
                component="a"
                href="https://apps.apple.com/in/app/medlink-jobseeker/id1660018123"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: { xs: 120, sm: 140 },
                  height: { xs: 40, sm: 50 },
                  position: "relative",
                }}
              >
                <Image
                  src="/assets/images/google-play-badge (1) 2.svg"
                  alt="Download on the App Store"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width:600px) 120px, 140px"
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>

        {/* Footer Links */}
        {footerLinks.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }}>
              {/* <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {section.title}
              </Typography> */}
              {section.links.map(({ label, href }) => (
                <Link href={href} key={label} passHref>
                  <Typography
                    variant="body2"
                    color="#395987"
                    sx={{ cursor: "pointer" }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Text */}
      <Box textAlign="center" mt={4}>
        <Typography variant="caption" color="text.secondary">
          All rights reserved © 2025 MedLink Health Care Pvt. Ltd.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
