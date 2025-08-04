"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Divider,
  Menu,
  Tooltip,
  Button,
  ListItem,
  List,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils/reduxHooks";
import Link from "next/link";
import { AccountCircle, Settings } from "@mui/icons-material";
import { configureJobseeker } from "@/lib/utils/commonFunctions";
import { signOut } from "aws-amplify/auth";
import { logout } from "@/redux/features/authSlice";
import { resetJobseekerProfile } from "@/redux/features/jobseekerProfileSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
const navItems = [
  { label: "Home", href: "/jobseeker/home" },
  { label: "My Jobs", href: "/jobseeker/my-jobs" },
];
export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const location = usePathname();
  const profileDetails = useSelector(
    (state) => state.jobseekerProfile.profileDetails
  );
  const searchPaths = [
    "/",
    "/candidates",
    "/Interviews",
    "/employees",
    "/vendors",
    "/offer-letters",
  ];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/jobs?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
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

  return (

    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand */}
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          MedLinkJobs
        </Typography>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {profileDetails?.name &&
            navItems.map(({ label, href }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                sx={{ color: "white", textTransform: "none" }}
              >
                {label}
              </Button>
            ))}
          {!profileDetails?.name ? (
            <>
              <Button
                component={Link}
                href="/jobseeker/signin"
                sx={{ color: "white" }}
              >
                Sign in
              </Button>
              <Button
                component={Link}
                href="/jobseeker/signup"
                sx={{ color: "white" }}
              >
                Sign up
              </Button>
            </>
          ) : null}
        </Box>
        <Box
          display={{ xs: "none", md: profileDetails?.name ? "flex" : "none" }}
          alignItems="center"
        >
          {profileDetails?.name && (
            <Box>
              <Tooltip title="Profile">
                <Button
                  size="large"
                  // edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle sx={{ color: "white" }} />
                  <Typography
                    sx={{
                      mx: 1,
                      display: { xs: "none", md: "block" },
                      color: "white",
                    }}
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

                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        {/* Auth or Mobile Toggle */}
        <Box
          sx={{
            display: { md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={toggleMobileNav}
            sx={{ display: { md: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Collapse in={mobileNavOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            backgroundColor: "#0070B3",
            px: 2,
            py: 1,
            gap: 1,
          }}
        >
          {/* Search Field */}
          {profileDetails?.name ? (
            <>
              <TextField
                size="small"
                placeholder="Search jobs..."
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  sx: { backgroundColor: "white", borderRadius: 1 },
                }}
              />

              {navItems.map(({ label, href }) => (
                <Button
                  key={href}
                  component={Link}
                  href={href}
                  onClick={() => setMobileNavOpen(false)}
                  sx={{
                    justifyContent: "center",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  {label}
                </Button>
              ))}

              <Divider sx={{ borderColor: "white", my: 1 }} />

              {/* Profile + Settings */}
              {/* // {profileDetails?.name && ( */}
              <>
                <Button
                  component={Link}
                  href="/jobseeker/profile"
                  onClick={() => setMobileNavOpen(false)}
                  startIcon={<AccountCircle />}
                  sx={{
                    justifyContent: "center",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Profile
                </Button>
                <Button
                  component={Link}
                  href="/jobseeker/settings"
                  onClick={() => setMobileNavOpen(false)}
                  startIcon={<SettingsIcon />}
                  sx={{
                    justifyContent: "center",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Settings
                </Button>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileNavOpen(false);
                  }}
                  startIcon={<LogoutIcon />}
                  sx={{
                    justifyContent: "center",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Logout
                </Button>
              </>
            </>
          ) : (
            <>
              <Button
                component={Link}
                href="/jobseeker/signin"
                sx={{ color: "white" }}
              >
                Sign in
              </Button>
              <Button
                component={Link}
                href="/jobseeker/signup"
                sx={{ color: "white" }}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Collapse>
    </AppBar>
  );
}
