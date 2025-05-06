import {
  Avatar,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  deleteDocument,
  updateHospitalAbout,
  updateProfilePicURL,
  uploadDocument,
} from "@/lib/api/recruiter/mutations";
import {
  downloadDocument,
  getHospitalDetails,
} from "@/lib/api/recruiter/queries";
import CropImageModal from "./CropImageModal";
import UseModalManager from "@/hooks/UseModalManager";
import { openSnackbar } from "@/redux/features/snackbarSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../commonComponents/DeleteModal";
import { useAppSelector } from "@/lib/utils/reduxHooks";

const RecruiterProfile = ({ getCroppedImg }) => {
  const [aboutText, setAboutText] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicURL, setProfilePicURL] = useState();
  const [srcImage, setSrcImage] = useState("");
  const [imageName, setImageName] = useState("");
  const { isOpen, open, close } = UseModalManager();
  const [hovered, setHovered] = useState(false);
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();
  const profile = useAppSelector((state) => state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHospitalDetails();

        const profilePic = data?.getHospitalDetails?.profilePicURL;
        setAboutText(data?.getHospitalDetails?.about);

        if (profilePic) {
          const downloadResponse = await downloadDocument(profilePic);
          const imageSource = `data:image/png;base64,${
            JSON.parse(downloadResponse?.downloadDocument)?.response?.content
          }`;
          if (
            JSON.parse(downloadResponse?.downloadDocument)?.response?.content
          ) {
            setProfilePicURL(imageSource);
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch hospital details or profile picture:",
          error
        );
      }
    };

    fetchData();
  }, []);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setDescription(aboutText);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!description.trim()) return;

    try {
      const data = await getHospitalDetails();
      const hospId = data?.getHospitalDetails?.hospitalID;
      if (hospId) {
        const response = await updateHospitalAbout(description);
        if (response) {
          setAboutText(description);
          setIsEditing(false);
          dispatch(
            openSnackbar({
              message: "Company about updated successfully",
              severity: false,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error updating About section:", error);
      dispatch(
        openSnackbar({
          message: "Failed to update About section",
          severity: true,
        })
      );
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("No file selected.");
      return;
    }
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      dispatch(
        openSnackbar({
          message: "Image size should be less than 1 MB",
          severity: true,
        })
      );
      return;
    }
    try {
      const content = await toBase64(file);
      const fileName = file.name;
      setImageName(file?.name);
      const url = "https://your-api-endpoint.com/upload";

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrcImage(reader.result);
        open("crop");
      };
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleCropSave = async (croppedImage) => {
    try {
      const uploadResponse = await uploadDocument({
        content: croppedImage,
        fileName: imageName,
        url: "",
      });

      const uploadedUrl = JSON.parse(uploadResponse?.uploadDocument)?.url;

      if (uploadedUrl) {
        await updateProfilePicURL({ profilePictureURL: uploadedUrl });
        const downloadResponse = await downloadDocument(uploadedUrl);
        const imageSource = `data:image/png;base64,${
          JSON.parse(downloadResponse?.downloadDocument)?.response?.content
        }`;
        setProfilePicURL(imageSource);

        dispatch(
          openSnackbar({
            message: "Profile picture updated successfully.",
            severity: false,
          })
        );
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Error updating profile picture.",
          severity: true,
        })
      );
    }
  };
  const handleDeleteImage = async () => {
    try {
      const data = await getHospitalDetails();
      const profilePic = data?.getHospitalDetails?.profilePicURL;
      if (profilePic) {
        const deleteImage = await deleteDocument(profilePic);
        setProfilePicURL(null);
        setHovered(false);
        dispatch(
          openSnackbar({
            message: "Profile picture deleted successfully.",
            severity: false,
          })
        );
      }
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

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ px: { xs: 2, md: 8 } }}
      width="100%"
    >
      <Paper elevation={3} sx={{ width: "100%", p: 2, mx: 12, my: 4 }}>
        <Typography sx={{ fontSize: "17px", fontWeight: 800 }}>
          medlink
        </Typography>

        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
          <Box
            sx={{ position: "relative" }}
            onMouseEnter={() => profilePicURL && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {profilePicURL ? (
              <img
                className="proPics"
                style={{ marginRight: "38px" }}
                height="108px"
                width="108px"
                src={profilePicURL}
                alt="profile pic"
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 80,
                  height: 80,
                  fontSize: 30,
                }}
                variant="rounded"
              >
                M
              </Avatar>
            )}

            {profilePicURL && hovered && (
              <IconButton
                onClick={() => open("delete")}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "white",
                  color: "red",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "white" },
                }}
                size="small"
                component="label"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "white",
                border: "1px solid #ccc",
                boxShadow: 1,
                "&:hover": { bgcolor: "lightgray" },
              }}
              size="small"
              component="label"
            >
              <PhotoCameraIcon fontSize="small" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {!isEditing ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {aboutText}
                </Typography>
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              </Box>
            ) : (
              <Accordion
                elevation={0}
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                }}
                expanded
              >
                <AccordionSummary>
                  <Typography>Edit About Section</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Update your About section"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveClick}
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
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Box>

        {isOpen && (
          <CropImageModal
            setImage={setImage}
            isOpen={isOpen}
            srcImage={srcImage}
            // crop={crop}
            close={close}
            onSave={handleCropSave}
            getCroppedImg={getCroppedImg}
          />
        )}
        {isOpen("delete") && (
          <DeleteModal
            title={"Company Logo"}
            // details={data}
            handleCloseDeleteModal={() => {
              close("delete");
            }}
            openDeleteModal={isOpen("delete")}
            handleDelete={handleDeleteImage}
          />
        )}
      </Paper>
    </Grid>
  );
};

export default RecruiterProfile;
