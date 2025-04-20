import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import styled from "styled-components";

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  padding: 24px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ContentContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HTMLContentBox = styled(Box)`
  background-color: white;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow-y: auto;
  max-height: 600px;

  h1,
  h2,
  h3 {
    font-family: ReithSerif, Helvetica, Arial, sans-serif;
  }

  p,
  div,
  span {
    font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const SummaryBox = styled(Box)`
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 4px;
  border-left: 4px solid #bb1919;
`;

const ErrorMessage = styled(Typography)`
  color: #bb1919;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const LoadingText = styled(Typography)`
  font-style: italic;
  color: #666;
  text-align: center;
  padding: 20px;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-family: ReithSerif, Helvetica, Arial, sans-serif;
  color: #333;
`;

const SummaryModal = ({ open, onClose, url, title }) => {
  const [summary, setSummary] = useState(null);
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("fetching");
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (open && url) {
      fetchAndSummarize();
    }
  }, [open, url]);

  const getSummary = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  };

  const fetchAndSummarize = async () => {
    setLoading(true);
    setLoadingStep("fetching");
    setError("");
    setSummary(null);
    setArticleContent("");

    try {
      const scraperResponse = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );
      const scraperData = await scraperResponse.json();

      if (!scraperData.contents) {
        throw new Error("Could not retrieve the article content");
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(scraperData.contents, "text/html");

      let textForSummary = "";
      let mainContent = "";
      const article =
        doc.querySelector("article") ||
        doc.querySelector(".article-body") ||
        doc.querySelector(".story-body") ||
        doc.querySelector("main");

      if (article) {
        article
          .querySelectorAll(
            "script, style, nav, footer, .ad, .advert, .social-links"
          )
          .forEach((el) => el.remove());

        article
          .querySelectorAll('[aria-label="Share"], [aria-label="Save"]')
          .forEach((el) => el.remove());

        mainContent = article.innerHTML;

        const paragraphs = article.querySelectorAll("p");
        paragraphs.forEach((p) => {
          textForSummary += p.textContent + " ";
        });
      } else {
        const paragraphs = doc.querySelectorAll("p");
        const div = document.createElement("div");
        paragraphs.forEach((p) => {
          if (p.textContent.length > 30) {
            div.appendChild(p.cloneNode(true));
            textForSummary += p.textContent + " ";
          }
        });

        div
          .querySelectorAll('[aria-label="Share"], [aria-label="Save"]')
          .forEach((el) => el.remove());

        mainContent = div.innerHTML;
      }

      setArticleContent(mainContent);
      setLoadingStep("summarizing");

      textForSummary = textForSummary.replace(/\s+/g, " ").trim();

      const data = {
        inputs: textForSummary,
        parameters: { max_length: 250, min_length: 100 },
      };
      const result = await getSummary(data);

      if (result && result[0] && result[0].summary_text) {
        setSummary(result[0].summary_text);
      } else {
        setError(
          "Could not generate summary. The model may be loading or the article is too complex."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="summary-modal-title">
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
        </CloseButton>

        <Typography
          id="summary-modal-title"
          variant="h5"
          component="h2"
          gutterBottom
        >
          {title || "Article Summary"}
        </Typography>

        {loading ? (
          <LoadingText variant="body1">
            {loadingStep === "fetching"
              ? "Fetching the news article. Please wait..."
              : "Article fetched successfully! Now generating summary..."}
          </LoadingText>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <ContentContainer>
            <HTMLContentBox>
              <SectionTitle>Original Article</SectionTitle>
              <div dangerouslySetInnerHTML={{ __html: articleContent }} />
            </HTMLContentBox>

            <SummaryBox>
              <SectionTitle>Summary</SectionTitle>
              <Typography variant="body1">{summary}</Typography>
            </SummaryBox>
          </ContentContainer>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default SummaryModal;
