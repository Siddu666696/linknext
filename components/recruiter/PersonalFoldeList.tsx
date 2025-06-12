"use client";

import * as React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UseModalManager from "@/hooks/UseModalManager";
import CreateFolderModal from "./CreateFolderModal";
import EmptyPersonalFolder from "./EmptyPersonalFolder"; // Import it here
import { getFolders } from "@/lib/api/recruiter/queries";
import { useState, useEffect } from "react";
import ChangeModal from "./ChangeModal";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { deleteFolder } from "@/lib/api/recruiter/mutations";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";

interface FolderRow {
  id: string;
  foldername: string;
  files: number;
  createdby: string;
}

export default function PersonalFoldeList() {
  const { isOpen, close, open } = UseModalManager();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rows, setRows] = useState<FolderRow[]>([]);
  const [selectedId, setSelectedId] = React.useState<{ id: string; name: string } | null>(null);
  const router = useRouter();

  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      const formatted =
        data?.getFolders?.map((item, index) => ({
          id: item.folderID || String(index + 1),
          foldername: item.name || "Unnamed",
          files: item.profileCount || 0,
          createdby: item.userName || "N/A",
        })) || [];

      setRows(formatted);
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    try {
      const response = await deleteFolder(id);
      if (response?.deleteFolder) {
        dispatch(openSnackbar({ message: "Folder deleted successfully", severity: false }));
        fetchFolders();
      } else {
        dispatch(openSnackbar({ message: "Failed to delete folder", severity: true }));
      }
    } catch (error) {
      console.error("Delete error:", error);
      dispatch(openSnackbar({ message: "Something went wrong while deleting folder", severity: true }));
    }
  };

  const handleEdit = (id: string, name: string) => {
    setSelectedId({ id, name });
    open("rename");
  };

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(path);
  };

  const columns: GridColDef[] = [
    { field: "foldername", headerName: "Folder Name", width: 200 },
    { field: "files", headerName: "Number of Files", width: 200 },
    { field: "createdby", headerName: "Created By", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id, params.row.foldername)}>
            <Typography sx={{ fontSize: 15 }}>Rename</Typography>
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <Typography sx={{ fontSize: 15 }}>Delete</Typography>
          </IconButton>
        </Box>
      ),
    },
  ];

  
    return (
     <>
    {rows.length === 0 ? (
      <EmptyPersonalFolder />
    ) : (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ p: 2, my: 8, mx: 30 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/recruiter/recruiterdashboard" onClick={handleClick("/recruiter/recruiterdashboard")}>
              Dashboard
            </Link>
            <Typography color="text.primary">Personal Folder</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ width: isMobile ? "100%" : "70%", maxWidth: "900px", textAlign: "center", mb: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant={isMobile ? "h6" : "h5"}>Personal Folder</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => open("create")}
              sx={{ display: isMobile ? "block" : "inline-block", mt: isMobile ? 2 : 0 }}
            >
              Create Folder
            </Button>
          </Grid>
        </Box>

        <Box sx={{ width: isMobile ? "100%" : "70%", maxWidth: "900px", mx: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
            onCellClick={(params) => {
              if (params.field === "foldername") {
                handleEdit(params.row.id, params.row.foldername);
              }
            }}
          />
        </Box>
      </Box>
    )}

    <CreateFolderModal
      isOpen={isOpen}
      close={() => close("create")}
      refetchFolders={fetchFolders}
    />
    <ChangeModal
      isOpen={isOpen}
      close={() => close("rename")}
      folderID={selectedId?.id}
      initialName={selectedId?.name}
      refetchFolders={fetchFolders}
    />
  </>
    )
}
