"use client";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar, Button, List, ListItem, Menu, MenuItem } from "@mui/material";
import { signOut } from "aws-amplify/auth";
import { logout } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { AccountCircle, Settings } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import Link from "next/link";
import { configureJobseeker } from "@/lib/utils/commonFunctions";
import RecruiterNotifications from "../../RecruiterNotifications";
import UseModalManager from "@/hooks/UseModalManager";

const RecruiterNavbar = React.memo(function RecruiterNavbar({
  searchInputRef,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const location = usePathname();
  const profileDetails = useSelector(
    (state) => state?.profileDetails?.profileDetails
  );
  const { isOpen, open, close } = UseModalManager();
  // const searchPaths = [
  //   "/jobs",
  //   "/candidates",
  //   "/Interviews",
  //   "/employees",
  //   "/vendors",
  //   "/offer-letters",
  // ];
  // const handleLogout = useCallback(async () => {
  //   try {
  //     configureJobseeker();
  //     await signOut();
  //     // dispatch(logout());
  //     // dispatch(resetJobseekerProfile());
  //     handleMenuClose();
  //     router.push("/jobseeker/signin");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleSearchChange = (event) => {
  //   setDebouncedSearchTerm(searchInputRef.current.value);
  // };
  const handleClearSearch = () => {
    if (searchInputRef?.current) {
      searchInputRef.current.value = "";
    }
    // setDebouncedSearchTerm && setDebouncedSearchTerm("");
    // document.activeElement?.blur();
  };
  useEffect(() => {
    handleClearSearch();
  }, [location.pathname]);
  const [anchorJobMenu, setAnchorJobMenu] = useState(null);
  const [anchorMoreMenu, setAnchorMoreMenu] = useState(null);

  const handleJobMenuOpen = (event) => {
    setAnchorJobMenu(event.currentTarget);
  };

  const handleJobMenuClose = () => {
    setAnchorJobMenu(null);
  };
  const handleMoreMenuOpen = (event) => {
    setAnchorMoreMenu(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setAnchorMoreMenu(null);
  };
  const [anchorSettingsMenu, setAnchorSettingsMenu] = useState(null);

  const handleSettingsMenuOpen = (event) => {
    setAnchorSettingsMenu(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setAnchorSettingsMenu(null);
  };
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
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left Section: Logo + Nav Links */}
            <Box display="flex" alignItems="center">
              <Link href="/recruiter/home" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    color: "#0070B3",
                    mr: 4,
                  }}
                >
                  MedLink <span style={{ color: "#6BAEDE" }}>Jobs</span>
                </Typography>
              </Link>

              <List
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "#000000D9",
                  padding: 0,
                }}
              >
                <ListItem sx={{ width: "120px", padding: 0 }}>
                  <Link href="/recruiter/recruiterdashboard">Dashboard</Link>
                </ListItem>
                <ListItem
                  sx={{ width: "180px", padding: 0 }}
                  onMouseEnter={handleJobMenuOpen}
                  // onMouseLeave={handleJobMenuClose}
                >
                  <Typography>Post Hot Job Listing</Typography>
                  <Menu
                    anchorEl={anchorJobMenu}
                    open={Boolean(anchorJobMenu)}
                    onClose={handleJobMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    MenuListProps={{
                      onMouseEnter: handleJobMenuOpen,
                      // onMouseLeave: handleJobMenuClose,
                    }}
                  >
                    <MenuItem onClick={handleJobMenuClose}>
                      <Link href="/recruiter/post-job">Post A Job</Link>
                    </MenuItem>
                    <MenuItem onClick={handleJobMenuClose}>
                      <Link href="/recruiter/mangejobs">
                        Manage Jobs & Responses
                      </Link>
                    </MenuItem>
                  </Menu>
                </ListItem>

                <ListItem sx={{ width: "180px", padding: 0 }}>
                  <Link href="/my-jobs">Search Candidates</Link>
                </ListItem>
                <ListItem sx={{ width: "120px", padding: 0 }}>
                  <Link href="/my-jobs">Pricing</Link>
                </ListItem>
                <ListItem
                  sx={{ width: "120px", padding: 0 }}
                  onClick={handleMoreMenuOpen}
                >
                  <Link href="">More</Link>
                </ListItem>
                <Menu
                  anchorEl={anchorMoreMenu}
                  open={Boolean(anchorMoreMenu)}
                  onClose={handleMoreMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <MenuItem onClick={handleMoreMenuClose}>
                    <Link href="/recruiter/personalfolder">
                      Personal Folder
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMoreMenuClose}>
                    <Link href="/recruiter/manageuser">Manage Sub-Users</Link>
                  </MenuItem>
                </Menu>
              </List>
            </Box>

            {/* Right Section: Profile */}
            <Box>
              {/* <Tooltip title="Open settings"> */}
              <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleSettingsMenuOpen}
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
              <Menu
                sx={{ mt: "45px", width: "20rem" }}
                anchorEl={anchorSettingsMenu}
                open={Boolean(anchorSettingsMenu)}
                onClose={handleSettingsMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Link href="/recruiter/companyprofile">Company Settings</Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSettingsMenuClose();
                    open("notification");
                  }}
                >
                  {/* <Link href="/recruiter/manageuser"> */}
                  Notification Settings
                  {/* </Link/> */}
                </MenuItem>
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Link href="/recruiter/manageuser">Subscription History</Link>
                </MenuItem>
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Link href="/recruiter/home/settings">Account Settings</Link>
                </MenuItem>
                <MenuItem onClick={handleSettingsMenuClose}>
                  <Link href="/recruiter/manageuser">Logout</Link>
                </MenuItem>
              </Menu>
              {/* </Tooltip> */}
            </Box>
          </Box>
          {isOpen && (
            <RecruiterNotifications
              isOpen={isOpen}
              close={() => close("notification")}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default RecruiterNavbar;
