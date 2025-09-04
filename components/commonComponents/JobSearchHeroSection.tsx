"use client"
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import DoctorsGroup from "../../public/assets/images/DoctorsGroup.jpg";
import JobSearchBar from "./JobSearchBar";

const JobSearchHeroSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(90deg, #E3F2FD 0%, #FFFFFF 100%)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          
        //   style={{ flex: 1 }}
        >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#0D47A1" }}
        >
          Find Your Perfect Healthcare Job
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={3}>
          Connecting doctors, nurses, and healthcare professionals to top
          hospitals and clinics.
        </Typography>

        {/* Search Box */}
        {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Job Role (e.g. Nurse, Radiologist)"
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Location (e.g. Hyderabad)"
          />
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, backgroundColor: "#0D47A1" }}
          >
            Search
          </Button>
        </Stack> */}
        <JobSearchBar />

        {/* Call to Action */}
        {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="large">
            Post a Job
          </Button>
          <Button variant="text" size="large">
            Learn More
          </Button>
        </Stack> */}
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, textAlign: "center" }}
        >

          <Image
            src={DoctorsGroup} // Replace with your asset
            alt="Healthcare jobs"
            priority
            width={500}
            height={400}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default JobSearchHeroSection;
