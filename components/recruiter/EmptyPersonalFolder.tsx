"use client";
import React from "react";
import { Box, Button, Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreateFolderModal from "./CreateFolderModal";
import UseModalManager from "@/hooks/UseModalManager";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmptyPersonalFolder = () => {
  const { isOpen, open, close } = UseModalManager();
  const router = useRouter();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(path);
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <Box sx={{ p: 2,my:8,mx:30}}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/recruiter/recruiterdashboard" onClick={handleClick("/recruiter/recruiterdashboard")}>
            Dashboard
          </Link>
          <Typography color="primary">Personal Folder</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column",p:1  }}>
        <Image src={"/assets/images/RecruiterFeatureImages/File searching-pana1.svg"} alt={"folder"} width={300} height={300}/>
         <Typography color="#395987" fontSize={25} fontWeight={800}>No Folder Found</Typography>
        <Button variant="contained" onClick={() => open("create")}>
          Create Folder
        </Button>
       
      </Box>
      <CreateFolderModal
        isOpen={isOpen}
        close={() => close("create")}
        onSuccessNavigate="/recruiter/personalfoldertable"
      />
    </div>
  );
};

export default EmptyPersonalFolder;
