"use client";

import { Box, Button, Divider, Grid, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  background: "white",
  width: "90%",
  maxHeight: "80vh",
  maxWidth: 540,
  overflowY: "auto",
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

interface JobDetailsModalProps {
  isOpen: (key: string) => boolean;
  close: (key: string) => void;
  selectedJob: any;
}

const JobDetailsModal = ({ isOpen, close,selectedJob }: JobDetailsModalProps) => {
  if (!selectedJob) return null;
  
  return (
    <Grid container>
      <Modal
        open={isOpen("job")}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
         <>
          <Grid container justifyContent="space-between">
            <Grid item xs={10}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="h5">JobDetails</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h1" my={0.5}>
                    {selectedJob?.vacancyID}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item>
                  <CropOriginalIcon sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">
                   {selectedJob?.jobRole}
                  </Typography>
                  <Typography variant="subtitle2">
                    {selectedJob?.location}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={4} mt={2}>
                <Grid item>
                  <Typography variant="body2">Employment Type</Typography>
                  <Typography variant="body1">{selectedJob?.employmentType}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">Qualification</Typography>
                  <Typography variant="body1">{selectedJob?.qualification || "Not Mentioned"}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button onClick={() => close("job")}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="subtitle2">Job Description</Typography>
            </Grid>
            <Grid item>
              <Typography>{selectedJob?.description}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ my: 2 }}>
            <Grid container mt={2}>
              <Grid item xs={12} md={5.5}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: 14, color: "#6F7482", pt: 1.5 }}
                >
                  Experience
                </Typography>

                <Box sx={{ display: "flex", mt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={5.3}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482" }}
                      >
                        {selectedJob?.expMin}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, pt: 1.25 }}
                      >
                        1 year
                      </Typography>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: 1, borderColor: "#E4EEF5" }}
                    />
                    <Grid item xs={5.3}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482" }}
                      >
                       {selectedJob?.expMax}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, pt: 1.25 }}
                      >
                        2 years
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                    Skills
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                  >
                    Administrative policies, Schedule management, Data
                    management.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                   JObRole
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                  >
                    {selectedJob?.jobRole}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                    Course
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                  >
                    Not Mentioned
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                    Number Of Vacancies
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                  >
                   {selectedJob?.numberOfVacancies}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                md={1}
                sx={{
                  borderLeft: "1px solid #E4EEF5",
                }}
              />
              <Grid item xs={12} md={5.5}>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Grid container spacing={1} my={3}>
                    <Grid item xs={5.3}>
                        <Typography variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482" }}>Salary</Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482" }}
                      >
                        Minimum
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, pt: 1.25 }}
                      >
                        {selectedJob?.minimumSalary}
                      </Typography>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: 1, borderColor: "#E4EEF5" }}
                    />
                    <Grid item xs={5.3}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482" }}
                      >
                        Maximum
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, pt: 1.25 }}
                      >{selectedJob?.maximumSalary}
                        
                      </Typography>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        my: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 600, }}
                      >
                        Specialization
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, color: "#6F7482",  }}
                      >
                        Specialization details
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        my: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 600 }}
                      >
                        Department
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                      >
                        Accident and Emergency (A&E)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        my: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 600 }}
                      >
                        Last Date to Apply
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 600, color: "#6F7482" }}
                      >
                        Not Mentioned
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            
          </Box>
          </>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
              pt: 2,
              borderTop: "1px solid #E4EEF5",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => console.log("Edit clicked")}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => console.log("Close Job clicked")}
            >
              Close Job
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => close("job")}
            >
              Close
            </Button>
          </Box>
            
        </Box>
      </Modal>
    </Grid>
  );
};

export default JobDetailsModal;
