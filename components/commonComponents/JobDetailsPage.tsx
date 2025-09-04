"use client";
import React, { useState, useCallback, useMemo } from "react";
import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  CardMedia,
  Tooltip,
  CircularProgress,
  Popover,
  Snackbar,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  NavigateNext as NavigateNextIcon,
  PlaceOutlined as PlaceOutlinedIcon,
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  BookmarkAdded as BookmarkAddedIcon,
  Check as CheckIcon,
  AllInbox as AllInboxIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import ShareOptions from "./ShareOptions";
import { get } from "http";
import { getCurrentUser } from "aws-amplify/auth";
import { applyForAJob, saveJob } from "@/lib/api/jobseeker/mutations";
import {
  configureJobseeker,
  fetchCurrentUser,
} from "@/lib/utils/commonFunctions";
import {  useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getProfile } from "@/lib/api/jobseeker/queries";
import hospital from "../../public/Hospital.png";
import Image from "next/image";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { useAppDispatch } from "@/lib/utils/reduxHooks";
import JobDescription from "./JobDescription";
import JobInfo from "./JobInfo";
// Types
export interface JobDetails {
  jobRole?: string;
  otherJobRole?: string;
  location?: string;
  hospitalName?: string;
  postedOn?: string;
  numberOfVacancies?: number;
  employmentType?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  isSalaryDisclosed?: boolean;
  appliedJob?: boolean;
  savedJob?: boolean;
  expiredOn?: string;
  systemUser?: boolean;
  vacancyType?: number;
  includeWalkInInterviewDetails?: boolean;
  systemUserHospital?: string;
  description?: string;
  vacancyID?: string;
  qualification: string;
  expMin?: number;
  expMax?: number;
  department?: string;
  gender?: string;
  shift?: string;
  skill?: string;
  course?: string;
  skills?: string[];
  lastDateToApply?: string;
}

interface HospitalDetails {
  name?: string;
  about?: string;
  video?: string;
}

interface ComponentProps {
  singleJobDetails: JobDetails;
  // hospitalDetails: HospitalDetails;
  // isLoading: boolean;
  // vacancies: JobDetails[];
  // similarJobsLoading: boolean;
  // user?: { name?: string };
  // allHospitalImages?: Array<{ response: { content: string }; title: string }>;
  // hospitalContactDetails?: { hospitalName?: string; aboutHospital?: string };
  // onApplyJob: (job: JobDetails) => void;
  // onSaveJob: (job: JobDetails) => void;
  // onDeleteSavedJob: (job: JobDetails) => void;
  // onShareJob: () => void;
  // onNavigateBack: () => void;
}

// Styled Components with Breakpoints
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(4),
  },
}));

const JobCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "6px",
  border: "1px solid #E4EEF5",
  padding: theme.spacing(1.8),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    border: "none",
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(3),
  },
}));

const IconButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(0.75),
  borderRadius: "50%",
  border: "1px solid #E4EEF5",
  backgroundColor: active ? "#0070b3" : "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(1),
  },
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  paddingX: theme.spacing(1.5),
  paddingY: theme.spacing(0.75),
  borderRadius: theme.spacing(2),
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.75rem",
  minWidth: "80px",
  [theme.breakpoints.up("md")]: {
    paddingX: theme.spacing(2),
    paddingY: theme.spacing(1),
    borderRadius: theme.spacing(3),
    fontSize: "0.875rem",
    minWidth: "100px",
  },
  [theme.breakpoints.up("lg")]: {
    paddingX: theme.spacing(2.5),
    fontSize: "1rem",
    minWidth: "120px",
  },
}));

const StickyBottomBar = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 1000,
  padding: theme.spacing(1.5, 2),
  background: "white",
  borderTop: "1px solid #E4EEF5",
  width: "100vw",
  marginLeft: "-50vw",
  left: "50%",
  boxShadow: "0px -4px 8px rgba(57, 89, 135, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const MobileHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--clr-blue-light)",
  padding: theme.spacing(1, 2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DesktopBreadcrumbs = styled(Box)(({ theme }) => ({
  display: "none",
  backgroundColor: "#0070b3",
  height: theme.spacing(18),
  marginTop: 0,
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

// Custom Hooks
const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState({
    applyJob: false,
    saveJob: false,
    deleteSavedJob: false,
  });

  const setLoading = useCallback(
    (key: keyof typeof loadingStates, value: boolean) => {
      setLoadingStates((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return { loadingStates, setLoading };
};

// Utility Functions
const formatSalary = (min: number, max: number, isDisclosed: boolean) => {
  if (!isDisclosed || (min === 0 && max === 0)) {
    return "Not Disclosed";
  }

  const minSalary = min ? `${min}` : "";
  const maxSalary = max && max !== 0 ? ` - ${max}` : "";
  return `${minSalary}${maxSalary}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.toLocaleDateString("en", {
    month: "short",
  })}-${date.getFullYear()}`;
};

const getJobUrl = (jobRole: string, location: string) => {
  return `https://www.medlinkjobs.com/${jobRole}-jobs-in-${location}`;
};

// Sub-components
const JobHeader: React.FC<{
  jobDetails: JobDetails;
  hospitalDetails: HospitalDetails;
  logoSrc: string;
  onBack: () => void;
  user?: { name?: string };
}> = ({ jobDetails, hospitalDetails, logoSrc, onBack, user }) => (
  <>
    {/* <MobileHeader>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <ArrowBackIosIcon
          onClick={onBack}
          sx={{
            color: "var(--clr-blue-footer)",
            fontSize: "1.3rem",
            cursor: "pointer",
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.125rem" },
            fontWeight: 600,
            color: "var(--clr-blue-footer)",
          }}
        >
          Job Detail
        </Typography>
      </Box>
      {!user?.name && (
        <ApplyButton variant="contained" size="small">
          Jobseeker Login
        </ApplyButton>
      )}
    </MobileHeader> */}

    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, md: 2 },
        alignItems: { xs: "center", md: "flex-start" },
        flexDirection: { xs: "row", md: "row" },
      }}
    >
      {/* <CardMedia
        component="img"
        sx={{
          width: { xs: 48, md: 72, lg: 80 },
          height: { xs: 48, md: 72, lg: 80 },
          borderRadius: 1,
          flexShrink: 0,
        }}
        src={logoSrc}
        alt="Hospital logo"
      /> */}
      <Image src={hospital} alt="hospital" width={60} height={48} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "0.875rem", md: "1.125rem", lg: "1.25rem" },
            mb: { xs: 0.5, md: 1 },
            lineHeight: { xs: 1.4, md: 1.5 },
          }}
        >
          {jobDetails?.jobRole || jobDetails?.otherJobRole}
        </Typography>

        <Typography
          sx={{
            color: "#333",
            fontWeight: { xs: 400, md: 600 },
            fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
          }}
        >
          {jobDetails?.systemUser
            ? hospitalDetails?.name || jobDetails?.hospitalName
            : jobDetails?.hospitalName}
        </Typography>
      </Box>
    </Box>
  </>
);

const JobKeyInfo: React.FC<{
  jobDetails: JobDetails;
}> = ({ jobDetails }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: 1, md: 2.5, lg: 3 },
      mt: { xs: 1.5, md: 2 },
    }}
  >
    <Box
      sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, md: 1 } }}
    >
      <Tooltip title="Location">
        <PlaceOutlinedIcon
          sx={{
            color: "#6F7482",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        />
      </Tooltip>
      <Typography
        sx={{
          color: "#6F7482",
          fontSize: { xs: "0.75rem", md: "1rem", lg: "1.125rem" },
          fontWeight: { xs: 400, md: 400 },
        }}
      >
        {jobDetails?.location}
      </Typography>
    </Box>

    <Box
      sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, md: 1 } }}
    >
      <Tooltip title="Salary Range">
        <AccountBalanceWalletOutlinedIcon
          sx={{
            color: "#6F7482",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        />
      </Tooltip>
      <Typography
        sx={{
          color: "#6F7482",
          fontSize: { xs: "0.75rem", md: "1rem", lg: "1.125rem" },
          fontWeight: { xs: 400, md: 400 },
        }}
      >
        {formatSalary(
          jobDetails?.minimumSalary || 0,
          jobDetails?.maximumSalary || 0,
          jobDetails?.isSalaryDisclosed || false
        )}{" "}
      
      </Typography>
    </Box>
  </Box>
);

const JobActions: React.FC<{
  jobDetails: JobDetails;
  loadingStates: any;
  onApply: () => void;
  onSave: () => void;
  onShare: () => void;
  user?: { name?: string };
}> = ({ jobDetails, loadingStates, onApply, onSave, onShare, user }) => (
  <Box
    sx={{
      display: "flex",
      gap: { xs: 1, md: 1.5, lg: 2 },
      justifyContent: "flex-end",
      alignItems: "center",
      mt: { xs: 1.5, md: 2 },
    }}
  >
    <IconButton onClick={onShare}>
      <ShareIcon
        sx={{
          fontSize: { xs: "1.1rem", md: "1.3rem" },
          color: "#0070b3",
        }}
      />
    </IconButton>

    <IconButton active={jobDetails?.savedJob} onClick={onSave}>
      {loadingStates.saveJob || loadingStates.deleteSavedJob ? (
        <CircularProgress
          size={ 16}
          sx={{ color: jobDetails?.savedJob ? "white" : "#0070b3" }}
        />
      ) : jobDetails?.savedJob ? (
        <BookmarkIcon
          sx={{
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            color: "white",
          }}
        />
      ) : (
        <BookmarkBorderIcon
          sx={{
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            color: "#0070b3",
          }}
        />
      )}
    </IconButton>

    {loadingStates.applyJob ? (
      <ApplyButton variant="contained">
        <CircularProgress size={ 26} sx={{ color: "white" }} />
      </ApplyButton>
    ) : jobDetails?.appliedJob ? (
      <ApplyButton
        variant="contained"
        disabled
        startIcon={
          <CheckIcon sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} />
        }
      >
        Applied
      </ApplyButton>
    ) : (
      <ApplyButton variant="contained" onClick={onApply}>
        Apply
      </ApplyButton>
    )}
  </Box>
);

const JobMeta: React.FC<{ jobDetails: JobDetails }> = ({ jobDetails }) => (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: { md: "row", lg: "row" },
      gap: { md: 2, lg: 3 },
      alignItems: "center",
      mt: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <SettingsBackupRestoreIcon
        sx={{
          fontSize: { md: "1rem", lg: "1.125rem" },
          color: "#6F7482",
        }}
      />
      <Typography
        sx={{
          fontSize: { md: "0.875rem", lg: "1rem" },
          color: "#6F7482",
          fontWeight: 400,
        }}
      >
        Posted: {jobDetails?.postedOn && formatDate(jobDetails.postedOn)}
      </Typography>
    </Box>

    <Typography
      sx={{
        fontSize: { md: "0.875rem", lg: "1rem" },
        color: "#6F7482",
        fontWeight: 400,
      }}
    >
      Openings: {jobDetails?.numberOfVacancies}
    </Typography>

    <Typography
      sx={{
        fontSize: { md: "0.875rem", lg: "1rem" },
        color: "#6F7482",
        fontWeight: 400,
      }}
    >
      Job Type: {jobDetails?.employmentType}
    </Typography>
  </Box>
);

const MobileJobTags: React.FC<{ jobDetails: JobDetails }> = ({
  jobDetails,
}) => (
  <Box
    sx={{
      display: { xs: "flex", md: "none" },
      gap: 1,
      flexWrap: "wrap",
      mt: 1.5,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        px: 1,
        py: 0.5,
        bgcolor: "#f5f5f5",
        borderRadius: 1,
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    >
      {jobDetails?.employmentType}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        px: 1,
        py: 0.5,
        bgcolor: "#f5f5f5",
        borderRadius: 1,
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    >
      {jobDetails?.numberOfVacancies} Openings
    </Typography>
  </Box>
);

const JobDescriptionSection: React.FC<{ jobDetails: JobDetails }> = ({
  jobDetails,
}) => (
  <JobCard>
    <Typography
      variant="h6"
      sx={{
        color: "#0070b3",
        // mb: { xs: 1.5, md: 2 },
        fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
        fontWeight: 600,
      }}
    >
      Job Description
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, md: 4 },
        fontSize: { xs: "0.875rem", md: "1rem" },
        
      }}
    >
    <JobDescription
        description={jobDetails?.description || "No description available."}
      />
      {/* Job Requirements */}
      <JobInfo jobDetails={jobDetails}/>
      {/* <Box>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            color: "#474D6A",
            lineHeight: { xs: 1.5, md: 1.6 },
            mb: { xs: 1, md: 1.25 },
          }}
        >
          <strong>Experience Required:</strong>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            color: "#474D6A",
            lineHeight: { xs: 1.5, md: 1.6 },
          }}
        >
        
          Experience content here
        </Typography>
      </Box> */}

      {/* Qualifications */}
      {/* <Box>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            color: "#474D6A",
            lineHeight: { xs: 1.5, md: 1.6 },
            mb: { xs: 1, md: 1.25 },
          }}
        >
          <strong>Qualifications:</strong>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            color: "#474D6A",
            lineHeight: { xs: 1.5, md: 1.6 },
          }}
        >
        
          Qualification content here
        </Typography>
      </Box> */}
    </Box>
  </JobCard>
);

const HospitalInfoSection: React.FC<{
  hospitalDetails: HospitalDetails;
  jobDetails: JobDetails;
  allHospitalImages: Array<{ response: { content: string }; title: string }>;
}> = ({ hospitalDetails, jobDetails, allHospitalImages }) => {
  if (!hospitalDetails?.about && !allHospitalImages?.length) {
    return null;
  }

  return (
    <JobCard>
      <Typography
        sx={{
          color: "#0070b3",
          fontWeight: 600,
          fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
          mb: { xs: 1.5, md: 2 },
        }}
      >
        About {jobDetails?.hospitalName}
      </Typography>

      {hospitalDetails?.about && (
        <Typography
          sx={{
            color: "#474D6A",
            fontWeight: 400,
            fontSize: { xs: "0.875rem", md: "1rem" },
            lineHeight: { xs: 1.5, md: 1.6 },
            mb: { xs: 2, md: 3 },
          }}
        >
          {hospitalDetails?.about?.replace(/<br\s*\/?>/gi, "\n")}
        </Typography>
      )}

      {allHospitalImages?.length > 0 && (
        <Grid container spacing={{ xs: 1, md: 2 }}>
          {allHospitalImages.slice(0, 6).map((image, index) => (
            <Grid item xs={4} md={2} key={index}>
              <Box
                component="img"
                src={`data:image/png;base64,${image.response.content}`}
                alt={image.title}
                sx={{
                  width: "100%",
                  height: { xs: 80, md: 120 },
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </JobCard>
  );
};

const SimilarJobsSection: React.FC<{
  vacancies: JobDetails[];
  similarJobsLoading: boolean;
}> = ({ vacancies, similarJobsLoading }) => (
  <Box>
    <Typography
      sx={{
        fontSize: { xs: "1.125rem", md: "1.5rem", lg: "1.75rem" },
        fontWeight: 600,
        color: "black",
        mt: { xs: 2, md: 3 },
        mb: { xs: 1.5, md: 2 },
      }}
    >
      Similar Jobs
    </Typography>

    <Box
      id="similar-jobs-section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 2 },
        mb: { xs: 6, md: 4 },
      }}
    >
      {similarJobsLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <JobCard key={index}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box
                  sx={{
                    width: { xs: 48, md: 72 },
                    height: { xs: 48, md: 72 },
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      height: { xs: 16, md: 20 },
                      bgcolor: "#f5f5f5",
                      borderRadius: 0.5,
                      mb: 1,
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <Box
                    sx={{
                      height: { xs: 14, md: 16 },
                      bgcolor: "#f5f5f5",
                      borderRadius: 0.5,
                      width: "60%",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </Box>
              </Box>
            </JobCard>
          ))
        : vacancies?.map((job, index) => (
            <JobCard key={index}>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1.5, md: 2 },
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 48, md: 72 },
                    height: { xs: 48, md: 72 },
                    bgcolor: "#0070b3",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 600,
                      mb: 0.5,
                      color: "black",
                    }}
                  >
                    {job.jobRole}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      color: "#666",
                    }}
                  >
                    {job.hospitalName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      color: "#666",
                      mt: 0.5,
                    }}
                  >
                    {job.location}
                  </Typography>
                </Box>
                <ApplyButton variant="outlined" size="small">
                  View
                </ApplyButton>
              </Box>
            </JobCard>
          ))}
    </Box>
  </Box>
);

// Main Component
const JobDetailsPage: React.FC<ComponentProps> = ({ singleJobDetails }) => {
  const { loadingStates, setLoading } = useLoadingState();
  const router = useRouter();
  //   const vacancyID = await params
  // const singleJobDetails = await getAVacancy(vacancyID);
  // State
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isSimilarJobsInView, setIsSimilarJobsInView] = useState(false);

  // Memoized values
  const defaultLogo = "../../public/Hospital.png";
  const logoSrc = useMemo(() => defaultLogo, []);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const jobUrl = useMemo(() => {
    return getJobUrl(
      singleJobDetails?.jobRole || singleJobDetails?.otherJobRole || "",
      singleJobDetails?.location || ""
    );
  }, [singleJobDetails]);
  const getCurrentPath = () => {
    return `https://www.medlinkjobs.com${pathname || "/"}`; // Use pathname from usePathname hook
  };
  const jobUrlWithPath = getCurrentPath();
  const user = useSelector(
    (state: RootState) => state?.jobseekerProfile?.profileDetails
  );
const Snackbar=useSelector((state: RootState) => state.snackbar);
  const pageTitle = useMemo(() => {
    const role = singleJobDetails?.jobRole || singleJobDetails?.otherJobRole;
    const location = singleJobDetails?.location;
    return role && location ? `${role} job in ${location} | MedLink Jobs` : "";
  }, [singleJobDetails]);

  const metaDescription = useMemo(() => {
    const role = singleJobDetails?.jobRole || singleJobDetails?.otherJobRole;
    const location = singleJobDetails?.location;
    const hospitalName = singleJobDetails?.hospitalName;

    return role && location
      ? `${role} job in ${
          hospitalName ? `${hospitalName}, ` : ""
        }${location}. MedLink Jobs Best Medical Jobs Recruitment.`
      : "";
  }, [singleJobDetails]);

  // Event Handlers
  const handleApply = useCallback(async () => {
    if (!user?.userID) {
      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem("postAuthRedirect", currentUrl);
      router.push("/jobseeker/signin");
      return;
    }

    setLoading("applyJob", true);
    try {
      const res = await applyForAJob(Number(singleJobDetails?.vacancyID));
      if (res?.applyForAJob == "SUCCESS") {
        dispatch(
          openSnackbar({
            message: "Job application submitted successfully!",
            severity:false
          })
        );
      }
    } finally {
      setLoading("applyJob", false);
    }
  }, [singleJobDetails, router, setLoading, user]);

  const handleSave = useCallback(async () => {
    const action = singleJobDetails?.savedJob ? "deleteSavedJob" : "saveJob";
    setLoading(action, true);
    // configureJobseeker()
    // const user = await getProfile()

    if (!user?.userID) {
      router.push("/jobseeker/signin");
      return;
    }
    try {
      if (singleJobDetails?.savedJob) {
        // await onDeleteSavedJob(singleJobDetails);
      } else {
        // await onSaveJob(singleJobDetails);
        const res = await saveJob(Number(singleJobDetails?.vacancyID));
        if (res?.saveAJob == "SUCCESS") {
          dispatch(
            openSnackbar({
              message: "Job saved successfully!",
              severity: "success",
            })
          );
        } else {
          dispatch(
            openSnackbar({
              message: "Failed to save job.",
              severity: "error",
            })
          );
        } 
      }
    } finally {
      setLoading(action, false);
    }
  }, [singleJobDetails, setLoading]);

  const handleShare = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // onShareJob();
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(jobUrlWithPath);
    dispatch(
      openSnackbar({
        message: "Job link copied to clipboard!",
        severity: "success",
      })
    );
    setAnchorEl(null);
  }, [jobUrlWithPath]);

  // Intersection Observer for similar jobs section
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => setIsSimilarJobsInView(entry.isIntersecting),
  //     { threshold: 0.1 }
  //   );

  //   const element = document.getElementById('similar-jobs-section');
  //   if (element) observer.observe(element);

  //   return () => observer.disconnect();
  // }, []);

  //   if (isLoading) {
  //     return (
  //       <Container maxWidth="md">
  //         <Box sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
  //           <CircularProgress size={{ xs: 40, md: 60 }} />
  //         </Box>
  //       </Container>
  //     );
  //   }
// const open=()=>{
//   dispatch(openSnackbar({ message: "working" ,severity:"success"}));

// }
  return (
    <>
      {/* <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content={`unavailable_after:${singleJobDetails?.expiredOn}`} />
        <link rel="canonical" href={jobUrl} />
      </Head> */}

      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
        <DesktopBreadcrumbs />

        <StyledContainer maxWidth="md" sx={{ position: "relative" }}>
          {/* Breadcrumbs - Desktop Only */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              py: 1,
              mt: { md: -11, lg: -12 },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Breadcrumbs
              separator={
                <NavigateNextIcon fontSize="small" sx={{ color: "white" }} />
              }
              sx={{ color: "white" }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { md: "0.875rem", lg: "1rem" },
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Home
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: { md: "0.875rem", lg: "1rem" },
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Job List
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: { md: "0.875rem", lg: "1rem" },
                }}
              >
                {singleJobDetails?.jobRole}
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Main Job Card */}
          <JobCard sx={{ mt: { xs: 0, md: 2 } }}>
            <JobHeader
              jobDetails={singleJobDetails}
              //   hospitalDetails={hospitalDetails}
              logoSrc={logoSrc}
              //   onBack={onNavigateBack}
              //   user={user}
            />

            <JobKeyInfo jobDetails={singleJobDetails} />
            <JobMeta jobDetails={singleJobDetails} />
            <MobileJobTags jobDetails={singleJobDetails} />

            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {/* <Box sx={{ flex: 1, display: { xs: "none", lg: "flex" } }} /> */}
              <JobActions
                jobDetails={singleJobDetails}
                loadingStates={loadingStates}
                onApply={handleApply}
                onSave={handleSave}
                onShare={handleShare}
                // user={user}
              />
            </Box>
          </JobCard>

          {/* Job Description */}
          <JobDescriptionSection jobDetails={singleJobDetails} />
          
          {/* Hospital Info */}
          <HospitalInfoSection
            // hospitalDetails={hospitalDetails}
            jobDetails={singleJobDetails}
            // allHospitalImages={allHospitalImages}
          />

          {/* Similar Jobs */}
          {/* <SimilarJobsSection 
            vacancies={vacancies}
            similarJobsLoading={similarJobsLoading}
          /> */}
        </StyledContainer>

        {/* Sticky Bottom Bar - Mobile Only */}
        {/* {!isSimilarJobsInView && (
          <StickyBottomBar>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AllInboxIcon sx={{ fontSize: "1.25rem", color: "#0070b3" }} />
              <Typography
                sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#0070b3" }}
              >
                Similar Jobs
              </Typography>
            </Box>

            <JobActions
              jobDetails={singleJobDetails}
              loadingStates={loadingStates}
              onApply={handleApply}
              onSave={handleSave}
              onShare={handleShare}
              //   user={user}
            />
          </StickyBottomBar>
        )} */}

        {/* Share Popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <ShareOptions
            shareUrl={jobUrlWithPath}
            tagline="Check out this job!"
            handleCopyToClipboard={handleCopyLink}
          />
        </Popover>

      
      </Box>
    </>
  );
};

export default JobDetailsPage;
