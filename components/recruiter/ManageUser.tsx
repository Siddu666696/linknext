"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UseModalManager from "@/hooks/UseModalManager";
import AddUserModal from "./AddUserModal";

const columns: GridColDef[] = [
  {
    field: "subuser",
    headerName: "Sub Users",
    width: 150,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "signedIn",
    headerName: "Signed In",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "postajob",
    headerName: "Post A Job",
    width: 160,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {params.value ? <CheckCircleIcon sx={{ color: "palegreen" }} /> : null}
      </Box>
    ),
  },
  {
    field: "searchcandidate",
    headerName: "Search Candidates",
    width: 160,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {params.value ? <CheckCircleIcon sx={{ color: "palegreen" }} /> : null}
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 160,
    renderCell: (params) => (
      <Box>
        <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
        >
          <Typography sx={{ fontSize: 15 }}>Delete</Typography>
        </IconButton>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    subuser: "jon@yopmail.com",
    name: "Jon",
    signedIn: 14,
    postajob: true,
    searchcandidate: true,
  },
  {
    id: 2,
    subuser: "cersei@yopmail.com",
    name: "Cersei",
    signedIn: 31,
    postajob: false,
    searchcandidate: true,
  },
  {
    id: 3,
    subuser: "jaime@yopmai.com",
    name: "Jaime",
    signedIn: 31,
    postajob: true,
    searchcandidate: false,
  },
  {
    id: 4,
    subuser: "arya@yopmail.com",
    name: "Arya",
    signedIn: 11,
    postajob: false,
    searchcandidate: false,
  },
];

const handleEdit = (id: number) => {
  console.log(`Edit row with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete row with id: ${id}`);
};

export default function ManageUser() {
  const { isOpen, close, open } = UseModalManager();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
      }}
    >
      <Box sx={{ width: isMobile ? "90%" : "70%", maxWidth: "900px", mb: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item>
            <Typography variant={isMobile ? "h6" : "h5"}>
              Manage User
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto" sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              fullWidth={isMobile}
              InputProps={{ startAdornment: <SearchIcon /> }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => open("adduser")}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ width: "100%", maxWidth: isMobile ? "90%" : "70%", mx: "auto" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>

      {/* Modal Component */}
      <AddUserModal handleClose={close} isOpen={isOpen} />
    </Box>
  );
}
