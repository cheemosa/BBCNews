import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";
import SummaryModal from "./SummaryModal";

const SummaryIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SummarizeButton = ({ url, title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Summarize article">
        <IconButton
          onClick={handleOpen}
          size="small"
          sx={{
            color: "#bb1919",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "1px solid #ddd",
          }}
        >
          <SummaryIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
            </svg>
          </SummaryIcon>
        </IconButton>
      </Tooltip>

      <SummaryModal open={open} onClose={handleClose} url={url} title={title} />
    </>
  );
};

export default SummarizeButton;
