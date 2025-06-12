"use client"
import React from "react";
import { Box, Button } from "@mui/material";
import UseModalManager from "@/hooks/UseModalManager";
import AddUserModal from "./AddUserModal";

const SubUser = () => {
  const { isOpen, open, close } = UseModalManager();

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 10 }}>
        <Button variant="contained" onClick={() => open("adduser")}>
          Create User
        </Button>
      </Box>

      <AddUserModal
        isOpen={isOpen}
        close={() => close("adduser")}
        // onSuccessNavigate="/recruiter/personalfoldertable" // 👉 navigate after creation
      />
    </div>
  );
};

export default SubUser;
