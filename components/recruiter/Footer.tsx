import { Box,Typography, IconButton} from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import HeaderNew from "../../public/assets/images/HeaderNew.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {

  const location = usePathname()
  console.log(location,"location footer")

  const hideFooterRoutes = ["/recruiter/registration"]
  const hideFooter = hideFooterRoutes.includes(location)

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

  if(hideFooter) return null;
  return (
    <Box
      sx={{
        p:{xs:2,md:2,lg:5},
        height: "100%",
        backgroundColor: "#e3f2fd",
        width: "100%",
      }}
    >
      <Grid container spacing={2} alignItems="flex-start" flexWrap="wrap">
        <Grid size={{xs:12,md:3}}>
          <Box sx={{display:{xs:"none",md:"block"}}}>
          <Image width={200} height={60} alt="medlink" src={HeaderNew} />
          </Box>
          <Typography variant="body2" sx={{ my: 2,textAlign:{xs:"center",md:"start"},color:"#395987",fontWeight:550,pl:1 }}>
            Follow Us:
          </Typography>
          <Box sx={{ display: "flex",justifyContent:{xs:"space-evenly",md:"start",lg:"start"}}}>
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
  <Grid size={{xs:4,md:2}} key={index}>
    <Box sx={{pl:1}}>
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
        <Grid size={{xs:12,md:3}} gap={1}>
          <Box sx={{display:"flex",flexDirection:{xs:"column"},alignItems:"center"}}>
          <Typography variant="subtitle1" fontWeight={500} mt={2} color="#395987" fontSize="16px" textAlign="left">
            Get our mobile app
          </Typography>
          <Typography sx={{ mt: 1,mb:2, fontSize: 12,color:"#395987" }}>
            Apply to jobs on the go from our mobile app
          </Typography>
          </Box>
          <Box
            sx={{
              display: "flex", 
              flexDirection: "row",
              gap: 1,
              flexWrap: "wrap",
              justifyContent:"center"
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
