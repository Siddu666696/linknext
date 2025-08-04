"use client";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import Link from "next/link";
import RecruiterNotifications from "../../RecruiterNotifications";
import UseModalManager from "@/hooks/UseModalManager";
import { deepOrange } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getHospitalDetails } from "@/lib/api/recruiter/queries";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Image from "next/image";
import HeaderNew from "../../../../public/assets/images/HeaderNew.svg";
import { removeRecruiterDeviceToken } from "@/lib/api/recruiter/mutations";
import { openSnackbar } from "@/redux/features/snackbarSlice";

const RecruiterNavbar = React.memo(function RecruiterNavbar({
  searchInputRef,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const router = useRouter();
  // const dispatch = useAppDispatch();
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
    const fetchHospitalDetails = async () => {
      try {
        const response = await getHospitalDetails();
        const data = response?.getHospitalDetails || {};
        setHospitalName(data?.name || "Hospital");
      } catch (error) {
        console.error("Failed to fetch hospital details:", error);
      }
    };
    fetchHospitalDetails();
  }, []);

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
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const deviceToken = localStorage.getItem("deviceToken"); // or get from wherever you store it
      // if (!deviceToken) {
      //   dispatch(openSnackbar("Device token missing", "error"));
      //   return;
      // }

      const res = await removeRecruiterDeviceToken({deviceToken}); // ✅ Pass the token here
      console.log(res, "logout response");

      if (res?.removeRecruiterDeviceToken === "deleted") {
        dispatch(openSnackbar("Logout successful", "success"));
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/recruiter/signin";
      } else {
        dispatch(openSnackbar("Logout failed", "error"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(openSnackbar("Something went wrong during logout", "error"));
    }
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
              {/* <Link href="/recruiter/home" style={{ textDecoration: "none" }}> */}
              <Image width={200} height={60} alt="medlink" src={HeaderNew} />
              {/* </Link> */}

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
                  onMouseEnter={(event) => {
                    setAnchorJobMenu(event.currentTarget);
                  }}
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
                      onMouseEnter: () => setAnchorJobMenu(anchorJobMenu),
                      // onMouseLeave: handleJobMenuClose,
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1, // Adds a slight top margin to separate from the menu item
                      },
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
                  onMouseEnter={(event) => {
                    setAnchorMoreMenu(event.currentTarget);
                  }}
                >
                  <Link href="">More</Link>
                </ListItem>
                <Menu
                  anchorEl={anchorMoreMenu}
                  open={Boolean(anchorMoreMenu)}
                  onClose={handleMoreMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  MenuListProps={{
                    onMouseEnter: () => setAnchorMoreMenu(anchorMoreMenu),
                    // onMouseLeave: handleJobMenuClose,
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1, // Adds a slight top margin to separate from the menu item
                    },
                  }}
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
            <Box sx={{ display: "flex", flexDirection: "row", my: 2, gap: 2 }}>
              {/* <Tooltip title="Open settings"> */}
              {/* <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleSettingsMenuOpen}
                color="#000000D9"
              > */}
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <IconButton onClick={() => router.push("/recruiter/reminder")}>
                  <AccessAlarmIcon sx={{ color: "black", fontSize: "24px" }} />
                </IconButton>

                <IconButton
                  onClick={() => router.push("/recruiter/notifications")}
                >
                  <Badge color="error" badgeContent={10 > 9 ? "9+" : 10}>
                    <NotificationsIcon
                      sx={{ color: "black", fontSize: "24px" }}
                    />
                  </Badge>
                </IconButton>
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],

                    fontSize: 15,
                    width: 30,
                    height: 30,
                    my: 0.5,
                  }}
                >
                  {hospitalName?.charAt(0)?.toUpperCase() || "H"}
                </Avatar>

                <Typography fontSize={15} my={1}>
                  {hospitalName}
                </Typography>
              </Box>
              {/* </Button> */}
              <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onMouseEnter={(event) => {
                  setAnchorSettingsMenu(event.currentTarget);
                }}
              >
                <ArrowDropDownIcon />
              </Button>
              <Menu
                sx={{ mt: "45px", width: "20rem" }}
                anchorEl={anchorSettingsMenu}
                open={Boolean(anchorSettingsMenu)}
                onClose={handleSettingsMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                MenuListProps={{
                  onMouseEnter: () => setAnchorSettingsMenu(anchorSettingsMenu),
                  // onMouseLeave: handleJobMenuClose,
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                  },
                }}
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
                <MenuItem onClick={handleLogout}>
                  {/* <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> */}
                  Logout
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
