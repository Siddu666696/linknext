import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import {
  addHospitalPicture,
  deleteDocument,
  deleteHospitalAsset,
  getHospitalPictures,
  updateHospitalVideo,
  uploadDocument,
} from "@/lib/api/recruiter/mutations";
import {
  downloadDocument,
  getHospital,
  getHospitalDetails,
} from "@/lib/api/recruiter/queries";
import UseModalManager from "@/hooks/UseModalManager";
import DeleteModal from "../commonComponents/DeleteModal";

const CompanyGallery = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [galleryURL, setGalleryURL] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isOpen, close, open } = UseModalManager();
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [hospitalPictures, setHospitalPictures] = useState();
  const [hospitalId, setHospitalId] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [videoEmbedUrl, setVideoEmbedUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  // Fetch existing gallery images
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHospitalPictures();
        const profilePics = data?.getHospitalPictures || [];
        setHospitalPictures(profilePics);
        const images = await Promise.all(
          profilePics.map(async (pic) => {
            if (!pic?.url) return null;
            const downloadResponse = await downloadDocument(pic.url);
            const imageContent = JSON.parse(downloadResponse?.downloadDocument)
              ?.response?.content;
            return imageContent ? `data:image/png;base64,${imageContent}` : "";
          })
        );

        setGalleryURL(images);
      } catch (error) {
        console.error(
          "Failed to fetch hospital details or profile pictures:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    try {
      setErrorMessage("");
      const validFiles = Array.from(files).filter((file) => {
        if (file.size > 1024 * 1024) {
          setErrorMessage("Image size should be less than 1 MB");
          return false;
        }
        return true;
      });

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = async (e) => {
        try {
          const content = e.target.result.split(",")[1]; // Extract Base64 content
          const uploadResponse = await uploadDocument({
            content,
            fileName: files[0].name,
            url: "",
          });

          const uploadedUrl = JSON.parse(uploadResponse?.uploadDocument)?.url;
          if (uploadedUrl) {
            await addHospitalPicture(uploadedUrl);
            dispatch(
              openSnackbar({
                message: "Company Image added successfully!",
                severity: false,
              })
            );
            const details = await getHospitalPictures();
            const profilePics = details?.getHospitalPictures || [];
            const images = await Promise.all(
              profilePics.map(async (pic) => {
                const downloadResponse = await downloadDocument(pic?.url);
                const imageContent = JSON.parse(
                  downloadResponse?.downloadDocument
                )?.response?.content;
                return imageContent
                  ? `data:image/png;base64,${imageContent}`
                  : "";
              })
            );

            setGalleryURL(images);
          }
        } catch (err) {
          console.error(err);
        }
      };
    } catch (error) {
      console.error("Failed to upload images:", error);
    }
  };

  const handleDeleteGallery = async () => {
    try {
      const haID = hospitalPictures[deleteIndex]?.haID;
      if (!haID) return;

      await deleteHospitalAsset(haID);
      await deleteDocument(hospitalPictures[deleteIndex]?.url);
      const updatedPictures = hospitalPictures.filter(
        (_, i) => i !== deleteIndex
      );
      setHospitalPictures(updatedPictures);

      const updatedGallery = galleryURL.filter((_, i) => i !== deleteIndex);
      setGalleryURL(updatedGallery);

      dispatch(
        openSnackbar({
          message: "Profile picture deleted successfully.",
          severity: false,
        })
      );
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Error deleting profile picture.",
          severity: true,
        })
      );
    } finally {
      close("delete");
    }
  };

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalData = await getHospital();
        if (hospitalData?.getHospital?.hospitalID) {
          setHospitalId(hospitalData.getHospital.hospitalID);
  
          const details = await getHospitalDetails();
          const videoId = details?.getHospitalDetails?.video;
  
          if (videoId) {
            setVideoEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
            setVideoLink(`https://www.youtube.com/watch?v=${videoId}`);
          }
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };
    fetchHospitalData();
  }, []);

  const validateYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[4] : null;
  };

  const handleSaveVideo = async () => {
    const videoId = validateYouTubeUrl(videoLink);
    if (!videoId) {
      setVideoError("Please enter a valid YouTube video URL.");
      return;
    }
  
    try {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
      const response = await updateHospitalVideo(videoId); // Store only the video ID in the backend
      if (response) {
        setVideoEmbedUrl(embedUrl);
        setVideoLink(watchUrl); // Ensure proper watch link
  
        dispatch(
          openSnackbar({
            message: "Video uploaded successfully!",
            severity: false,
          })
        );
  
        // Fetch updated hospital details to ensure proper display after refresh
        const hospitalDetails = await getHospitalDetails();
        const updatedVideoId = hospitalDetails?.getHospitalDetails?.video;
        if (updatedVideoId) {
          setVideoEmbedUrl(`https://www.youtube.com/embed/${updatedVideoId}`);
          setVideoLink(`https://www.youtube.com/watch?v=${updatedVideoId}`);
        }
      }
    } catch (error) {
      console.error("Error updating video:", error);
      dispatch(
        openSnackbar({
          message: "Failed to update video.",
          severity: true,
        })
      );
    } finally {
      setIsEditing(false);
    }
  };
  

  const handleDeleteVideo = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await updateHospitalVideo(""); // Clear video in backend
      setVideoEmbedUrl(""); // Clear video from state
      setVideoLink(""); // Clear text field

      dispatch(
        openSnackbar({
          message: "Video deleted successfully!",
          severity: false,
        })
      );

      // Fetch updated hospital details
      const hospitalDetails = await getHospitalDetails();
      if (!hospitalDetails?.getHospitalDetails?.video) {
        setVideoEmbedUrl("");
        setVideoLink("");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      dispatch(
        openSnackbar({
          message: "Failed to delete video.",
          severity: true,
        })
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ p: 2, fontSize: 20, color: "#395987" }}>
              Gallery
            </Typography>
            {galleryURL.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mx: 2 }}>
                {galleryURL.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: "120px", // Adjust as needed
                      height: "120px", // Ensures square container
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      marginRight: "10px",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={url}
                      alt={`Hospital-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {hoveredIndex === index && (
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "transparent",
                          color: "red",
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                        onClick={() => {
                          setDeleteIndex(index);
                          open("delete");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ mx: 2 }}>
                No image uploaded yet! Upload an image.
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              sx={{ width: 80, p: 2, height: 8 }}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              Upload
            </Button>
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            {errorMessage && (
              <Typography sx={{ color: "red", mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 25, color: "#395987" }}>
              Company Video
            </Typography>

            {isEditing ? (
              <>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Enter YouTube video link"
                  value={videoLink}
                  onChange={(e) => {
                    setVideoLink(e.target.value);
                    setVideoError("");
                  }}
                  error={Boolean(videoError)}
                  helperText={videoError}
                />

                {videoEmbedUrl && (
                  <Box sx={{ mt: 2 }}>
                    <iframe
                      width="100%"
                      height="300"
                      src={videoEmbedUrl}
                      title="Company Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveVideo}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {videoEmbedUrl ? (
                  <>
                    <a
                      href={videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {videoLink}
                    </a>
                    <iframe
                      width="100%"
                      height="315"
                      src={videoEmbedUrl}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </>
                ) : (
                  <Typography>
                    No YouTube video uploaded yet! Click edit to add.
                  </Typography>
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row",gap:2 }}>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setIsEditing(true)}
            />
            {videoEmbedUrl && (
              <DeleteIcon
                sx={{ cursor: "pointer", marginRight: 2, color: "black" }}
                onClick={handleDeleteVideo}
              />
            )}
          </Box>
        </Box>

        {isOpen("delete") && (
          <DeleteModal
            title="Company Image"
            handleCloseDeleteModal={() => close("delete")}
            openDeleteModal={isOpen("delete")}
            handleDelete={handleDeleteGallery}
          />
        )}
      </Paper>
    </Box>
  );
};

export default CompanyGallery;
