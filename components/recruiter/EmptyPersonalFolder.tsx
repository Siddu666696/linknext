"use client"
import React from "react";
import { Box, Button } from "@mui/material";
import CreateFolderModal from "./CreateFolderModal";
import UseModalManager from "@/hooks/UseModalManager";

const EmptyPersonalFolder = () => {
  const { isOpen, open, close } = UseModalManager();

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 10 }}>
        <Button variant="contained" onClick={() => open("create")}>
          Create Folder
        </Button>
      </Box>

      <CreateFolderModal
        isOpen={isOpen}
        close={() => close("create")}
        onSuccessNavigate="/recruiter/personalfoldertable" // 👉 navigate after creation
      />
    </div>
  );
};

export default EmptyPersonalFolder;
