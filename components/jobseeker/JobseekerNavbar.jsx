"use client";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  InputAdornment,
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "aws-amplify/auth";
import { logout } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { AccountCircle, Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { resetJobseekerProfile } from "../../redux/features/jobseekerProfileSlice";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import Link from "next/link";
import { configureJobseeker } from "@/lib/utils/commonFunctions";

const JobseekerNavbar = React.memo(function JobseekerNavbar({
  toggle,
  disableDrawer,
  setDebouncedSearchTerm,
  searchInputRef,
  debouncedSearchTerm,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const location = usePathname();
  const profileDetails = useSelector(
    (state) => state?.profileDetails?.profileDetails
  );
  const searchPaths = [
    "/jobs",
    "/candidates",
    "/Interviews",
    "/employees",
    "/vendors",
    "/offer-letters",
  ];
  const handleLogout = useCallback(async () => {
    try {
      configureJobseeker();
      await signOut();
      dispatch(logout());
      dispatch(resetJobseekerProfile());
      handleMenuClose();
      router.push("/jobseeker/signin");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setDebouncedSearchTerm(searchInputRef.current.value);
  };
  const handleClearSearch = () => {
    if (searchInputRef?.current) {
      searchInputRef.current.value = "";
    }
    setDebouncedSearchTerm && setDebouncedSearchTerm("");
    document.activeElement?.blur();
  };
  useEffect(() => {
    handleClearSearch();
  }, [location.pathname]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          "&.MuiPaper-root": { boxShadow: "none" },
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              {!disableDrawer && (
                <IconButton
                  size="large"
                  edge="start"
                  color="#000000D9"
                  aria-label="open drawer"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                  }}
                  onClick={toggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Box display={"flex"} alignItems={"center"}>
                <Link href="/jobseeker/home" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="h5"
                    noWrap
                    sx={{
                      display: { xs: "block", color: "#0070B3" },
                    }}
                  >
                    MedLink <span style={{ color: "#6BAEDE" }}>Jobs</span>
                  </Typography>
                </Link>
              </Box>
              {!disableDrawer && searchPaths.includes(location.pathname) && (
                <Box display={"flex"}>
                  <Box
                    id="search-container"
                    sx={{
                      display: "flex",
                      width: debouncedSearchTerm ? 600 : 400,
                      maxWidth: "100%",
                      ":focus-within": {
                        width: 600,
                      },
                      "& .MuiInputBase-root": {
                        paddingRight: 0,
                      },
                      "& .MuiButtonBase-root": {
                        borderRadius: 1,
                        height: 39,
                        color: "rgba(0, 0, 0, 0.2)",
                        border: 1,
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      id="SearchBar"
                      size="small"
                      type="search"
                      placeholder="Input search text"
                      inputRef={searchInputRef}
                      defaultValue={null}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSearchChange();
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleSearchChange}>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {debouncedSearchTerm && (
                    <Button onClick={handleClearSearch} color="error">
                      Close
                    </Button>
                  )}
                </Box>
              )}
            </Box>
            <List
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#000000D9",
                width: 200,
              }}
            >
              <ListItem>
                <Link href="/jobseeker/home">Home</Link>
              </ListItem>
              <ListItem>
                <Link href="/jobseeker/my-jobs">My Jobs</Link>
              </ListItem>
            </List>
            <Box>
              <Box sx={{ flexGrow: 1 }} />

              <Tooltip title="Open settings">
                <Button
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="#000000D9"
                >
                  <AccountCircle color="info" />
                  <Typography
                    variant="body1"
                    sx={{ mx: 1, display: { xs: "none", md: "block" } }}
                  >
                    {profileDetails?.name}
                  </Typography>
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", width: "20rem" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <Link href={"/jobseeker/profile"}>
                  <MenuItem onClick={handleMenuClose}>
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography>{profileDetails?.name}</Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {profileDetails?.email}
                      </Box>
                    </Box>
                  </MenuItem>
                </Link>
                <Link href={"/jobseeker/settings"}>
                  <MenuItem>
                    <Settings />
                    Settings
                  </MenuItem>
                </Link>
                <Divider />

                <MenuItem onClick={()=>handleLogout}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default JobseekerNavbar;
