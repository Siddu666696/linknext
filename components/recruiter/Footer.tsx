import {
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";



const Footer = () => {
  return (
    <Box
      sx={{
        p: 5,
        height:"40vh",
        backgroundColor: "#e3f2fd", width:"100%"
      }}
    >
      <Grid container spacing={2} alignItems="flex-start" flexWrap="wrap">
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Email Subscribe Section
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Follow Us:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              color="primary"
              href="https://facebook.com"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="primary"
              href="https://twitter.com"
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="primary"
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="primary"
              href="https://youtube.com"
              target="_blank"
            >
              <YouTubeIcon />
            </IconButton>
            <IconButton
              color="primary"
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box>
            {[
              "Home",
              "Jobseekers",
              "Recruiters",
              "Browse Jobs",
              "Privacy Policy",
            ].map((item) => (
              <Typography key={item} variant="body2" my={2} color="#395987">
                {item}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
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
        </Grid>
        <Grid item xs={12} md={2}>
          <Box>
            {["Blog", "Team", "Resources", "Site Map", "Terms & Services"].map(
              (item) => (
                <Typography key={item} variant="body2" my={2} color="#395987">
                  {item}
                </Typography>
              )
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={3} gap={3}>
          <Typography variant="subtitle1" fontWeight={600} mt={2}>
            Get our mobile app
          </Typography>
          <Typography  sx={{ mb: 1,fontSize:12 }}>
            Apply to jobs on the go from our mobile app
          </Typography>
          <Box sx={{ display: "flex",flexDirection:"row", gap: 1, flexWrap: "wrap" }}>
            <Box
              component="a"
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                style={{ height: 40 }}
              />
            </Box>
            <Box
              component="a"
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                style={{ height: 40 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
