import { Box, Grid, Skeleton} from "@mui/material";

export const JobCardSkeleton = () => {
    return (
      <Grid
        container
        sx={{
          bgcolor: "white",
          borderRadius: "6px",
          border: "1px solid var(--clr-blue-light)",
          mb: 2.5,
          height: "max-content"
        }}
      >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%"
            }}
          >
            <Box sx={{ p: 2, boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)", }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    color: "#395987",
                    cursor: "pointer",
                    mb: 2,
                    height: "50px",
                    display: "flex",
                    gap: 1,
                    flexGrow: 1
                  }}
                >
                  <Skeleton sx={{ width: "50px", transform: "scale(1, 1)", height: "100% !important" }} />
                  <Skeleton sx={{ width: "60%", transform: "scale(1, 1)", height: "25px" }} />
                </Box>
                <Skeleton sx={{ display: { xs: "block", md: "none" }, width: "20px", transform: "scale(1, 1)", height: "100% !important" }} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: "100%" }} >
                <Box sx={{ display: "flex", gap: 1, width: "100%" }} >
                  <Skeleton sx={{ width: "50%", transform: "scale(1, 1)", height: "20px" }} />
                  <Skeleton sx={{ width: "50%", transform: "scale(1, 1)", height: "20px" }} />
                </Box>
                <Box sx={{ display: "flex", gap: 1, width: "100%" }} >
                  <Skeleton sx={{ width: "50%", transform: "scale(1, 1)", height: "20px" }} />
                  <Skeleton sx={{ width: "50%", transform: "scale(1, 1)", height: "20px" }} />
                </Box>
              </Box>
            </Box>
          </Box>
   
      </Grid>
    )
  }