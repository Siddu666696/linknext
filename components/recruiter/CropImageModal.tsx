"use client";

import React, { useState, useCallback } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal, Box, Button, Typography } from "@mui/material";

const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: "90%",
  maxWidth: 540,
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};


async function getCroppedImg(setImage, srcImage, crop) {
  const image = new Image();
  image.src = srcImage;

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d");
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  const base64Image = canvas.toDataURL("image/jpeg");
  const parts = base64Image?.split(",");
  parts.shift();
  const modifiedString = parts?.join(",");
  setImage(modifiedString);
  return modifiedString;
}

const CropImageModal = ({ setImage, srcImage, isOpen, close, onSave }) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 35,
    y: 35,
    width: 50,
    height: 50,
    aspect: 1,
  });
  // const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(setImage, srcImage, crop);
    await onSave(croppedImage);
    close("crop");
  };

  return (
    <Modal
      open={isOpen("crop")}
      onClose={() => close("crop")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Crop Your Image
        </Typography>

        <div style={{ position: "relative", width: "100%", height: "300px" }}>
          {srcImage && (
            <ReactCrop crop={crop} onChange={setCrop}>
              {" "}
              <img src={srcImage} />
            </ReactCrop>
          )}
        </div>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={() => close("crop")} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave();
            }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CropImageModal;
