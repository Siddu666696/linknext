import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, 10%)",
  background: "white",
  width: 572,
};

const DeleteModal = ({
  openDeleteModal,
  handleCloseDeleteModal,
  handleDelete,
  title,loading
}) => {

  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              background: "var(--Neutral-1, #FFF)",
              boxShadow: "0px 1px 0px 0px #F0F0F0",
              height: 56,
              gap: 1,
            }}
          >
            <Typography
              sx={{ color: "var(--Dust-Red-6, var(--DustRed-6, #F5222D))" }}
              id="modal-modal-title"
              variant="h6"
            >
              Delete {title}
            </Typography>
            <i
              onClick={handleCloseDeleteModal}
              sx={{ cursor: "pointer" }}
              className="fi-rr-cross-small
"
            ></i>
       
            
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              flexdirection: "column",
              alignitems: "flex-start",
              gap: "16px",
              alignself: "stretch",
            }}
          >
            
              <Typography
                sx={{
                  pb: "10px",
                }}
              >
                Are you sure you want to delete {title}?
              </Typography>
             
                
              </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              padding: "10px 16px",
              borderTop: "1px solid #F0F0F0",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                color: "var(--Primary-6, #0070B3)",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",

                padding: "4px 15px",
              }}
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                height: 30,
                padding: "4px 15px",
                fontWeight: "400",
                fontSize: "14px",
              }}
              onClick={handleDelete}
              disabled={loading ? true : false}
              startIcon={
                loading && <CircularProgress size={20} color="inherit"/>
              }
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
