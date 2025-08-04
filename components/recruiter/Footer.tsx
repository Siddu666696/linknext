import { Box, Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import HeaderNew from "../../public/assets/images/HeaderNew.svg";
import Link from "next/link";

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
        { label: "Blog", href: "/blog" },
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
        p: 5,
        height: "40vh",
        backgroundColor: "#e3f2fd",
        width: "100%",
      }}
    >
      <Grid container spacing={2} alignItems="flex-start" flexWrap="wrap">
        <Grid item xs={12} md={3}>
          <Image width={200} height={60} alt="medlink" src={HeaderNew} />
          <Typography variant="body2" sx={{ mb: 2 }}>
            Follow Us:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              color="primary"
              href="https://facebook.com"
              target="_blank"
            >
              <Image
                src="/assets/images/facebook.png" 
                alt="Facebook"
                width={18}
                height={18}
              />
            </IconButton>
            <IconButton
              color="primary"
              href="https://twitter.com"
              target="_blank"
            >
              <TwitterIcon sx={{color:"#395987"}}/>
            </IconButton>
            <IconButton
              color="primary"
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedInIcon sx={{color:"#395987"}}/>
            </IconButton>
            <IconButton
              color="primary"
              href="https://youtube.com"
              target="_blank"
            >
              <YouTubeIcon sx={{color:"#395987"}}/>
            </IconButton>
            <IconButton
              color="primary"
              href="https://instagram.com"
              target="_blank"
            >
              <Image
                src="/assets/images/instragram.png" 
                alt="Instagram"
                width={18}
                height={18}
              />
            </IconButton>
          </Box>
        </Grid>
        {footerLinks.map((section, index) => (
  <Grid item xs={12} md={2} key={index}>
    <Box>
      {section.links.map(({ label, href }) => (
        <Link href={href} key={label} passHref>
          <Typography
            variant="body2"
            my={2}
            color="#395987"
            sx={{ cursor: "pointer" }}
          >
            {label}
          </Typography>
        </Link>
      ))}
    </Box>
  </Grid>
))}
        {/* <Grid item xs={12} md={2}>
          <Box>
            {[
              "About Us",
              "Contact Us",
              "FAQ",
              "Payments",
              "Press and Media",
            ].map((item) => (
              <Typography key={item} variant="body2" my={2} color="#395987">
                {item}
              </Typography>
            ))}
          </Box>
        </Grid> */}
        {/* <Grid item xs={12} md={2}>
          <Box>
            {["Blog", "Team", "Resources", "Site Map", "Terms & Services"].map(
              (item) => (
                <Typography key={item} variant="body2" my={2} color="#395987">
                  {item}
                </Typography>
              )
            )}
          </Box>
        </Grid> */}
        <Grid item xs={12} md={3} gap={3}>
          <Typography variant="subtitle1" fontWeight={600} mt={2}>
            Get our mobile app
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 12 }}>
            Apply to jobs on the go from our mobile app
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              component="a"
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/images/google-play-badge (1) 1.svg"
                alt="Get it on Google Play"
                // style={{ height: 40 }}
                width={140}
                height={40}
              />
            </Box>
            <Box
              component="a"
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/images/google-play-badge (1) 2.svg"
                alt="Download on the App Store"
                width={140}
                height={40}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
