"use client";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import noJobFound from "../../public/assets/images/noJobFound.png"

const EmptyManageJobs = () => {
  const router = useRouter();

  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      router.push(path);
    };
  return (
    <div>
      {/* <Box sx={{ my: 12, mx: 30 }}>
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
      </Box> */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh", 
    // mt: , 
  }}
>
  <Image
    width={400}
    height={410}
    alt="No notifications"
    src={noJobFound}
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
    <Typography sx={{fontSize:22,color:"#395987",fontWeight:500}}>No Job Posted</Typography>
      <Button variant="contained" onClick={() => router.push("/recruiter/post-job")}>
   Post Job
  </Button>
</Box>
    </div>
  );
};

export default EmptyManageJobs;
