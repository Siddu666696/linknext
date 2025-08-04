"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getActiveSubscriptions,
  getHospitalDetails,
  getRecruiterProfileStrength,
} from "@/lib/api/recruiter/queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import locationiconwithbg from "../../public/assets/icons/locationiconwithbg.svg"

const RecruiterDashboardContent = () => {
  const profileFields = [
    { key: "propicUploaded", label: "Upload Company Logo" },
    { key: "about", label: "Add About Info" },
    { key: "pan", label: "Enter PAN Number" },
    { key: "address", label: "Add Address" },
    { key: "gallery", label: "Add Company Video" },
    { key: "emailVerified", label: "Verify Phone Number" },
    { key: "website", label: "Include Website URL" },
    { key: "gst", label: "Enter GStIn" },
  ];

  const [incompleteFields, setIncompleteFields] = useState([]);
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [strength, setStrength] = useState(0);
  const [creditsLeft, setCreditsLeft] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const router = useRouter();
  const [activate, setActivate] = useState("");
  const [valid, setValid] = useState("");
  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await getHospitalDetails();
        const data = response?.getHospitalDetails || {};
        setHospitalName(data?.name || "Hospital");
        setCity(data?.city || "");
        setState(data?.state || "");
      } catch (error) {
        console.error("Failed to fetch hospital details:", error);
      }
    };

    const fetchProfileStrength = async () => {
      try {
        const res = await getRecruiterProfileStrength();
        const completedKeys =
          res?.getRecruiterProfileStrength?.completed?.split(",") || [];
        const totalKeys = profileFields.map((item) => item.key);
        const isComplete = totalKeys.every((key) =>
          completedKeys.includes(key)
        );

        setStrength(
          isComplete ? 100 : res?.getRecruiterProfileStrength?.strength || 0
        );

        const remaining = profileFields.filter(
          (item) => !completedKeys.includes(item.key)
        );
        setIncompleteFields(remaining);
      } catch (err) {
        console.error("Profile strength fetch error:", err);
      }
    };
    const fetchSubscriptionDetails = async () => {
      try {
        const res = await getActiveSubscriptions();
        const data = res?.getActiveSubscriptions?.[0];
        setCreditsLeft(data?.creditsLeft || 0);
        setTotalCredits(data?.credits || 100);
        setActivate(data?.createdOn);
        setValid(data?.validUpto);
      } catch (err) {
        console.error("Error fetching subscription:", err);
      }
    };

    fetchHospitalDetails();
    fetchProfileStrength();
    fetchSubscriptionDetails();
  }, []);
  const cardIcons = [
    "/assets/images/hospitalDashboard/searchCandidate.png",
    "/assets/images/hospitalDashboard/staffingSoution.png",
    "/assets/images/hospitalDashboard/brandingSolutin.png",
  ];
const reminderNotificationIcons = [
  "/assets/images/hospitalDashboard/noReminder.png",
  "/assets/images/hospitalDashboard/noNotification.png",
];
  return (
    <Grid container justifyContent="center" width="100%" p={1}>
      <Box sx={{ bgcolor: "#395987", p: 3, width: "100%" }}>
        <Box
          sx={{
            bgcolor: "white",
            width: "100%",
            mx: "auto",
            my: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            p: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 70,
              height: 70,
              fontSize: 35,
            }}
            variant="rounded"
          >
           {hospitalName?.charAt(0)?.toUpperCase() || "H"}
          </Avatar>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6">{hospitalName}</Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Image src={locationiconwithbg} alt={location} width={25} height={25} />
              {city}, {state}
            </Typography>
          </Box>
        </Box>

        <Accordion sx={{ width: "100%", mx: "auto", mt: 2, bgcolor: "white" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ width: "100%", position: "relative", my: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          strength === 100 ? "#4CAF50" : "green",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      width: "100%",
                      top: 0,
                      left: 0,
                      textAlign: "center",
                      color: strength < 70 ? "#000" : "#fff",
                      fontWeight: 600,
                      lineHeight: "12px",
                    }}
                  >
                    {strength}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography>Profile Strength</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" sx={{ width: "100%" }} onClick={() => router.push("/recruiter/companyprofile")}>
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            {incompleteFields.length > 0 ? (
              <Grid container spacing={2}>
                {incompleteFields.map((field) => (
                  <Grid item xs={6} key={field.key}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => router.push("/recruiter/companyprofile")}
                    >
                      {field.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                🎉 All Profile Fields Completed!
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Cards */}
      <Grid container spacing={2} mx={1} my={2} width="100%">
        <Grid item xs={12} md={6}>
          <Card>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
            >
              <Box sx={{ mx: 2, my: 2 }}>
                <Typography sx={{ fontSize: 20, my: 2 }}>Post a Job</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
                  <Typography>Activated On : </Typography>
                  <Typography> {activate}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
                  <Typography>Valid Till : </Typography>
                  <Typography> {valid}</Typography>
                </Box>
                <Button  onClick={() => router.push("/recruiter/post-job")} variant="contained">Post</Button>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  width: { xs: 100, md: 200 },
                  height: { xs: 100, md: 200 },
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={200}
                  thickness={8}
                  sx={{
                    position: "absolute",
                    opacity: 0.6,
                    color: "#395987",
                    width: { xs: 100, md: 200 },
                    height: { xs: 100, md: 200 },
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={(creditsLeft / totalCredits) * 100}
                  size={200}
                  thickness={8}
                  sx={{
                    position: "absolute",
                    opacity: 0.6,
                    color: "#395987",
                    width: { xs: 100, md: 200 },
                    height: { xs: 100, md: 200 },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} color="#395987">
                    Credits left {creditsLeft} of {totalCredits}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        {[
          {
            title:
              "Unlock Challenges in Hiring with MedLink Jobs Search Candidates",
            subtitle: "Access Jobseekers Directly Through MedLink Jobs",
          },
          {
            title:
              "Streamline your healthcare staffing with MedLink Jobs Board’s Staffing Solutions",
            subtitle:
              "Efficient and Effective Staffing Solutions for Healthcare",
          },
          {
            title:
              "Enhance Your Hospital’s Brand with MedLink Jobs Branding Solutions",
            subtitle: "Elevate Your Hospital’s Image with Effective Branding",
          },
        ].map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 5 }}
              >
                <Box sx={{ mx: 2, my: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
                    <Typography>{card.title}</Typography>
                    <Typography>{card.subtitle}</Typography>
                  </Box>
                  <Button variant="outlined">Explore More</Button>
                </Box>
                <Box sx={{ mx: 2, my: 2 }}>
                  <Image
                    src={cardIcons[index]}
                    alt="icon"
                    width={300}
                    height={300}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <Divider sx={{ color:"gray"}}/> */}
      {["Reminder", "Notifications"].map((title, idx) => (
  <Grid item xs={12} md={6} key={idx} sx={{border:"1 1 1 1 px solid", p:3,}}>
    <Box>{title}</Box>
    <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
      <Image
        src={reminderNotificationIcons[idx]}
        alt={`${title} Icon`}
        width={250}
        height={250}
      />
    </Box>
    <Box sx={{display:'flex',alignItems:"center",flexDirection:"column"}}>
    <Typography sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
      {title === "Reminder" ? "No Reminders" : "No Notifications"}
    </Typography>
    <Typography sx={{ fontSize: { xs: 12, md: 14 } }}>
      {title === "Reminder"
        ? "Add reminder to show it here"
        : "We will let you know once you have new notifications"}
    </Typography>
    </Box>
  </Grid>
))}
    </Grid>
  );
};

export default RecruiterDashboardContent;
