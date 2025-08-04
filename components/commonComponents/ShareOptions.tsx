"use client";

import React from "react";
import { Typography, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

type ShareOptionsProps = {
  shareUrl: string;
  handleCopyToClipboard: () => void;
};

const ShareOptions: React.FC<ShareOptionsProps> = ({
  shareUrl,
  handleCopyToClipboard,
}) => {
  const shareText = encodeURIComponent("Check out this job opportunity!");
  const hashtag = encodeURIComponent("#new_job");

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Typography
      component="div"
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Tooltip title="Share on Facebook">
        <IconButton
          color="primary"
          onClick={() =>
            openShareWindow(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}&quote=${shareText}&hashtag=${hashtag}`
            )
          }
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on Twitter">
        <IconButton
          color="primary"
          onClick={() =>
            openShareWindow(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${shareText}&hashtags=new_job`
            )
          }
        >
          <TwitterIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on LinkedIn">
        <IconButton
          color="primary"
          onClick={() =>
            openShareWindow(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`
            )
          }
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on WhatsApp">
        <IconButton
          color="primary"
          onClick={() =>
            openShareWindow(
              `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(
                shareUrl
              )}`
            )
          }
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share via Email">
        <IconButton
          color="primary"
          onClick={() =>
            (window.location.href = `mailto:?subject=Job Opportunity&body=${shareText}%0A${encodeURIComponent(
              shareUrl
            )}`)
          }
        >
          <EmailIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Copy link">
        <IconButton color="primary" onClick={handleCopyToClipboard}>
          <ContentCopyIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

export default ShareOptions;
