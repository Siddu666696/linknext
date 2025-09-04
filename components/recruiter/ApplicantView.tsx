"use client";
import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const ApplicantView: React.FC = () => {
  return (
    <Box sx={{ p: 3,mx:18 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Dashboard &gt; Manage Jobs & Responses &gt; 2D Echo Technician &gt;
        Meenu saini&apos;s Details
      </Typography>
      <Grid container spacing={5} >
        <Grid item xs={8} >
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "#e0e0e0", fontSize: 40 }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, fontWeight: 500 }}
            >
              Available Time
            </Typography>
            <Typography variant="body2">Monday - 09 AM - 04 PM</Typography>
          </Grid>
          <Grid item xs={12} sm={10} my={3}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Typography variant="h6" fontWeight="bold">
                Meenu saini
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "green",
                    "&:hover": { bgcolor: "darkgreen" },
                    textTransform: "none",
                  }}
                >
                  Actively Searching Job
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">📞 +917906403312 ✅</Typography>
              <Typography variant="body2">
                ✉️ meenusaini8974@gmail.com ⚠️
              </Typography>
              <Typography variant="body2">📍 New Delhi</Typography>
              <Typography variant="body2">🕒 0 Year</Typography>
              <Typography variant="body2">💰 0.35 Lakh INR</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              <strong>Current Company:</strong> 2D Echo Technician / Adesh
              Medical College and Hospital
            </Typography>
            <Typography variant="body2">
              <strong>Education:</strong> B.Sc, Other
            </Typography>
            <Typography variant="body2">
              <strong>Preferred Location:</strong> New Delhi, Delhi
            </Typography>
            <Typography variant="body2">
              <strong>Notice Period:</strong> 1 Month
            </Typography>
            <Typography variant="body2">
              <strong>Resume Headline:</strong> No Details Found
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, fontStyle: "italic" }}
            >
              Last Active: 10-Aug-2025
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, mb: 3,my:5 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Career Profile
            </Typography>
            <Typography variant="body2">
              <strong>Desired Industry:</strong> Hospital
            </Typography>
            <Typography variant="body2">
              <strong>Desired Role Category:</strong> null
            </Typography>
            <Typography variant="body2">
              <strong>Desired Job Type:</strong> Permanent
            </Typography>
            <Typography variant="body2">
              <strong>Desired Employment Type:</strong> Full Time
            </Typography>
            <Typography variant="body2">
              <strong>Desired Shift:</strong> Both
            </Typography>
            <Typography variant="body2">
              <strong>Preferred Work Location:</strong> Mumbai, Maharashtra
            </Typography>
            <Typography variant="body2">
              <strong>Expected Salary:</strong> 1 lakh INR - 42 lakh INR
            </Typography>
            <Typography variant="body2">
              <strong>Communication Preference:</strong> Phone, Email, WhatsApp,
              SMS
            </Typography>
          </Paper>
      </Grid>
      
<Grid item xs={4} >
      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary">
          Shortlist
        </Button>
        <Button variant="contained" color="error">
          Reject
        </Button>
      </Box>
      <Paper sx={{ p: 2, mt: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Add Comments
        </Typography>
        <TextField
          placeholder="Write your comment here"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 1 }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, textTransform: "none", bgcolor: "#1a3d7c" }}
        >
          Add Comment
        </Button>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Previous Comments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 ,my:5}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Add Tags for vasuki
            </Typography>
            <Select fullWidth size="small" displayEmpty sx={{ mb: 2 }}>
              <MenuItem value="">Status</MenuItem>
            </Select>
            <Select fullWidth size="small" displayEmpty sx={{ mb: 2 }}>
              <MenuItem value="">Interest</MenuItem>
            </Select>
            <Select fullWidth size="small" displayEmpty sx={{ mb: 2 }}>
              <MenuItem value="">Call Status</MenuItem>
            </Select>
            <Select fullWidth size="small" displayEmpty>
              <MenuItem value="">Recruiter Reminder</MenuItem>
            </Select>
          </Paper>
      </Grid>
      
     </Grid>
    </Box>
   
  );
};

export default ApplicantView;
