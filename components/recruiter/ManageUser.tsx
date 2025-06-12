"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { getHospitalUsers } from "@/lib/api/recruiter/queries";
import { deleteHospitalUser } from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import UseModalManager from "@/hooks/UseModalManager";
import AddUserModal from "./AddUserModal";
import SubUser from "./SubUser";

interface UserRow {
  id: string;
  huID: string;
  subuser: string;
  name: string;
  phone: string;
  signedIn: number;
  postajob: boolean;
  searchcandidate: boolean;
}

export default function ManageUser() {
  const { isOpen, open, close } = UseModalManager();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const [rows, setRows] = useState<UserRow[]>([]);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getHospitalUsers();
        const users = data.getHospitalUsers;
        setRows(users.map(mapUser));
      } catch (err) {
        console.error("Failed fetching users:", err);
      }
    })();
  }, []);

  const mapUser = (u: any): UserRow => ({
    id: u.huID,
    huID: u.huID,
    subuser: u.email,
    name: u.name,
    phone: u.phoneNumber,
    signedIn: u.signInCount || 0,
    postajob: u.accessJobPosting,
    searchcandidate: u.accessResumeDB,
  });

  const handleUserAddedOrUpdated = (user: any) => {
    setRows((prev) => {
      const existingIndex = prev.findIndex((u) => u.huID === user.huID);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = mapUser(user);
        return updated;
      }
      return [...prev, mapUser(user)];
    });
    setEditingUser(null);
  };

  const handleDeleteUser = async (huID: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await deleteHospitalUser({ huID });
      setRows((prev) => prev.filter((row) => row.id !== huID));
      dispatch(
        openSnackbar({ message: "User deleted successfully", severity: false })
      );
    } catch (err) {
      console.error("Delete failed:", err);
      dispatch(
        openSnackbar({ message: "Failed to delete user", severity: true })
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "subuser", headerName: "Sub Users", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      cellClassName: "center-cell",
    },
    {
      field: "signedIn",
      headerName: "Signed In",
      width: 150,
      cellClassName: "center-cell",
    },
    {
      field: "postajob",
      headerName: "Post A Job",
      width: 180,
      renderCell: (params) =>
        params.value ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon color="success" />
          </Box>
        ) : null,
    },
    {
      field: "searchcandidate",
      headerName: "Search Candidates",
      width: 180,
      renderCell: (params) =>
        params.value ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon color="success" />
          </Box>
        ) : null,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 185,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            onClick={() => {
              setEditingUser(params.row);
              open("adduser");
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            <Typography fontSize={15}>Delete</Typography>
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      {rows.length === 0 ? (
        <SubUser />
      ) : (
        <>
          <Box sx={{ my: 10, mx: 25 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="inherit"
                href="/recruiter/recruiterdashboard"
              >
                Dashboard
              </Link>
              <Typography color="text.primary">Manage Users</Typography>
            </Breadcrumbs>
          </Box>
          <Box display="flex" flexDirection="column" alignItems={"center"}>
            <Box width={isMobile ? "90%" : "70%"} maxWidth="900px" mb={2}>
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
                <Grid item xs={12} sm="auto" display="flex" gap={2}>
                  <TextField
                    placeholder="Search…"
                    size="small"
                    fullWidth={isMobile}
                    InputProps={{ startAdornment: <SearchIcon /> }}
                  />
                  <Button
                    variant="contained"
                    disabled={rows.length >= 3}
                    onClick={() => {
                      setEditingUser(null);
                      open("adduser");
                    }}
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box width={isMobile ? "90%" : "70%"}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                  "& .center-cell": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
                getRowId={(rows) => rows.huID || rows.subuser}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                autoHeight
              />
            </Box>
          </Box>
        </>
      )}

      <AddUserModal
        isOpen={isOpen}
        open={open}
        close={() => {
          setEditingUser(null);
          close("adduser");
        }}
        onUserAddedOrUpdated={handleUserAddedOrUpdated}
        editingUser={editingUser}
      />
    </>
  );
}
