"use client"
import { IconButton, Popover } from "@mui/material";
import React, { useCallback, useState } from "react";
import ShareOptions from "../commonComponents/ShareOptions";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import ShareIcon from "@mui/icons-material/Share";
const BlogShareContainer = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const getCurrentPath = () => {
    return `https://www.medlinkjobs.com${pathname || "/"}`; // Use pathname from usePathname hook
  };
  const UrlWithPath = getCurrentPath();
    const handleCopyLink = useCallback(() => {
      navigator.clipboard.writeText(UrlWithPath);
      dispatch(
        openSnackbar({
          message: "Job link copied to clipboard!",
          severity: "success",
        })
      );
      setAnchorEl(null);
    }, [UrlWithPath]);
      const handleShare = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // onShareJob();
      }, []);
  return (
    <>
      <IconButton onClick={handleShare}>
          <ShareIcon
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              color: "#0070b3",
            }}
          />
        </IconButton>
      {/* Share Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <ShareOptions
          shareUrl={UrlWithPath}
          tagline="Check out this blog post on Medlink Jobs!"
          handleCopyToClipboard={handleCopyLink}
        />
      </Popover>
    </>
  );
};

export default BlogShareContainer;
