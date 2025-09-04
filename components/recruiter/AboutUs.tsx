import {
  Box,
  Breadcrumbs,
  Typography,
  Grid,
  Button
} from '@mui/material';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';


const aboutUsImage = '/assets/images/NewAboutUsPageImage.svg'; 

const AboutUs = () => {
  const router = useRouter();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(path);
  };

  return (
    <Box sx={{ mx: 4, my: 5, boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", borderRadius: "6px", backgroundColor: "#FFFFFF", p: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link href="/recruiter/recruiterdashboard" onClick={handleClick("/recruiter/recruiterdashboard")} passHref>
          <Typography sx={{ cursor: 'pointer' }} color="inherit">Home</Typography>
        </Link>
        <Typography color="primary">Policy</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
         <Typography fontSize="18px" color="#395987" fontWeight={600} mt={4}>
            India's 1st and only recruitment platform for healthcare professionals
          </Typography>
          <Typography fontSize="18px" color="#4F4F4F" fontWeight={400} pt={2}>
            MedLink connects healthcare job seekers (doctors / nurses / paramedics / allied professionals) with healthcare recruiters (hospitals / clinics / labs / pharma, biotech, genome sequencing companies / medical colleges) to ensure hassle-free and efficient recruitment processes.
          </Typography>
          <Typography fontSize="18px" color="#4F4F4F" fontWeight={400} pt={2}>
            MedLink aims to bridge the glaring gap between the two by doing away with the conventional / traditional modes of recruitment (professional networking, referrals and local staffing agencies) and democratizing hiring, leading to quick, transparent and cost-effective solutions. In essence, we provide technology-enabled recruitment solutions and services to the healthcare industry across India.
          </Typography>
          <Typography fontSize="18px" color="#395987" fontWeight={600} mt={4}>
            Our Vision & Mission:
          </Typography>
          <Typography fontSize="18px" color="#4F4F4F" fontWeight={400} pt={2}>
            Our vision is to revolutionize the job search process by creating the most efficient, user-friendly, and reliable platform connecting job seekers and employers globally. We aim to empower every individual to find the work they love and every company to discover the talent they need, contributing to a world where career fulfillment is accessible to all.
          </Typography>
        </Grid>

        <Grid item xs={12} md={5}>
          
           <img
            style={{
              width: "100%",
              height: "auto",
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingTop: "4px",
            }}
            src={aboutUsImage}
            alt="About Us"
          />
        </Grid>

       
      </Grid>

      <Box mt={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography fontSize="18px" color="#395987" fontWeight={600}>
              Corporate Office:
            </Typography>
            <Typography fontSize="14px" color="#4F4F4F" fontWeight={400} pt={1}>
              MedLink Health Care Pvt Ltd,
            </Typography>
            <Typography fontSize="14px" color="#4F4F4F" fontWeight={400} pt={1}>
              1st Floor, SBR Akhila Exotica West, Hydernagar, Kukatpally,
            </Typography>
            <Typography fontSize="14px" color="#4F4F4F" fontWeight={400} pt={1}>
              Hyderabad - 500072
            </Typography>
            <Typography fontSize="14px" color="#4F4F4F" fontWeight={400} pt={1}>
              info@medlinkjobs.com
            </Typography>
            <Typography fontSize="14px" color="#4F4F4F" fontWeight={400} pt={1}>
              +91 86397 42323
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={4}>
          <Button
            component={Link}
            href="/recruiter/team-medlink"
            variant="contained"
            sx={{
              px: { xs: 2, sm: 7 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 7,
            }}
          >
            Team MedLink
          </Button>
          <Button
            component={Link}
            href="/recruiter/press-and-media"
            variant="outlined"
            sx={{
              px: { xs: 2, sm: 7 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 7,
            }}
          >
            Press and Media
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
