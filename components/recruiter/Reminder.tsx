"use client";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import noReminder from "../../public/assets/images/hospitalDashboard/noReminder.png";
import Image from "next/image";

const Reminder = () => {
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
    width={380}
    height={310}
    alt="No notifications"
    src={noReminder}
  />
</Box>
<Box sx={{
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh", gap:2,
    mt: -5, 
  }}>
    <Typography sx={{fontSize:22,color:"#395987",fontWeight:500}}>No Reminders</Typography>
     <Typography sx={{fontSize:18,color:"black"}}>Add reminder to show it here</Typography>
      <Button variant="contained" onClick={() => router.push("/recruiter/recruiterdashboard")}>
    Go to Dashboard
  </Button>
</Box>
    </div>
  );
};

export default Reminder;
