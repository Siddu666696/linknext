"use client";
import { Box, Breadcrumbs, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import noNotification from "../../public/assets/images/hospitalDashboard/noNotification.png";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Notification = () => {
  const router = useRouter();

  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(path);
    };
  return (
    <div>
      <Box sx={{ my: 12, mx: 30 }}>
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
          <Typography color="primary">Notification</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          mt: -5,
        }}
      >
        <Image
          width={310}
          height={310}
          alt="No notifications"
          src={noNotification}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          gap: 2,
          mt: -5,
        }}
      >
        <Typography sx={{ fontSize: 22, color: "#395987", fontWeight: 500 }}>
          No Notifications Found
        </Typography>
        <Typography sx={{ fontSize: 18, color: "#395987" }}>
          Sit back and relax
        </Typography>
        <Typography sx={{ fontSize: 18, color: "#395987" }}>
          we will let you know once you have new notifications
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/recruiter/recruiterdashboard")}
        >
          Go to Dashboard
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 25 }}>
        <Typography>Notification</Typography>
        <Button variant="outlined">Mark all as read</Button>
      </Box>
      <Card sx={{ mx: 25, my: 2, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>
              No Job Application Received : jobrole 18 hours ago
            </Typography>
            <Typography>Click Here to view Applicant Detials</Typography>
          </Box>
          <FiberManualRecordIcon
            sx={{ display: "flex", alignItems: "flex-end", color: "blue" }}
          />
        </Box>
      </Card>
    </div>
  );
};

export default Notification;
