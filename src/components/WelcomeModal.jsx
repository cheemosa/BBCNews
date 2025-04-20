import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import styled from "styled-components";
import summarize from "../assets/summarize.JPG";

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  padding: 32px;
  text-align: center;
`;

const WelcomeTitle = styled(Typography)`
  color: #bb1919;
  margin-bottom: 16px;
  font-family: ReithSerif, Helvetica, Arial, sans-serif;
  font-weight: 700;
`;

const FeatureImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const FeatureIcon = styled.div`
  background-color: #bb1919;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 16px;
`;

const FeatureDescription = styled(Typography)`
  margin-bottom: 24px;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  line-height: 1.5;
`;

const CloseButton = styled(Button)`
  margin-top: 16px;
  background-color: #bb1919;
  color: white;
  &:hover {
    background-color: #a00000;
  }
`;

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBBCClone");

    if (!hasVisitedBefore) {
      setOpen(true);
      localStorage.setItem("hasVisitedBBCClone", "true");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <WelcomeTitle variant="h4">Welcome to BBC News</WelcomeTitle>

        <Typography variant="h6" gutterBottom>
          Discover our new feature: Article Summarizer
        </Typography>

        <FeatureDescription variant="body1">
          We're excited to introduce our new Summarizer feature that helps you
          quickly grasp the key points of any news article. Perfect for when
          you're short on time but want to stay informed.
        </FeatureDescription>

        <IconContainer>
          <FeatureIcon>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
            </svg>
          </FeatureIcon>
        </IconContainer>

        <Typography variant="body1" gutterBottom>
          Look for this icon on articles to generate a quick summary!
        </Typography>

        <FeatureImage src={summarize} alt="BBC Summarizer Feature" />

        <FeatureDescription variant="body1">
          Try it now by clicking the summarizer icon on any article, or visit
          the Summarizer page to summarize external news articles.
        </FeatureDescription>

        <CloseButton variant="contained" onClick={handleClose}>
          Got it!
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default WelcomeModal;
