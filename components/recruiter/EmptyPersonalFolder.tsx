"use client";
import React from "react";
import { Box, Button, Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreateFolderModal from "./CreateFolderModal";
import UseModalManager from "@/hooks/UseModalManager";
import { useRouter } from "next/navigation";

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

      {/* Create Folder Button */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 10, my: 5 }}>
        <Button variant="contained" onClick={() => open("create")}>
          Create Folder
        </Button>
      </Box>

      {/* Modal */}
      <CreateFolderModal
        isOpen={isOpen}
        close={() => close("create")}
        onSuccessNavigate="/recruiter/personalfoldertable"
      />
    </div>
  );
};

export default EmptyPersonalFolder;
