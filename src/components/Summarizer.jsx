import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import styled from "styled-components";

const PageContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SummarizerHeader = styled(Typography)`
  font-family: ReithSerif, Helvetica, Arial, sans-serif;
  margin-bottom: 24px;
  color: #222;
`;

const SummarizerForm = styled(Paper)`
  padding: 24px;
  margin-bottom: 30px;
  border-radius: 8px;
  border-top: 4px solid #bb1919;
`;

const SubmitButton = styled(Button)`
  background-color: #bb1919;
  &:hover {
    background-color: #a00000;
  }
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

const HTMLContentBox = styled(Paper)`
  padding: 16px;
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

const SummaryBox = styled(Paper)`
  padding: 16px;
  border-radius: 4px;
  border-left: 4px solid #bb1919;
  background-color: #f8f8f8;
`;

const ErrorMessage = styled(Typography)`
  color: #bb1919;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-family: ReithSerif, Helvetica, Arial, sans-serif;
  color: #333;
`;

const Summarizer = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(""); 
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const getSummary = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setLoadingStep("fetching"); 
    setError("");
    setSummary(null);
    setArticleContent("");
    setShowContent(true);

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
      setLoadingStep(""); 
    }
  };

  return (
    <PageContainer maxWidth="lg">
      <SummarizerHeader variant="h4" component="h1">
        BBC News Article Summarizer
      </SummarizerHeader>

      <SummarizerForm elevation={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Enter the URL of the article you'd like to summarize
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Article URL"
                variant="outlined"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://www.bbc.com/news/article-url"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton
                variant="contained"
                type="submit"
                size="large"
                disabled={loading}
              >
                {loading ? "Processing..." : "Summarize Article"}
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </SummarizerForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {showContent &&
        (loading ? (
          <LoadingContainer>
            <CircularProgress color="error" />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {loadingStep === "fetching"
                ? "Fetching the news article. Please wait..."
                : "Article fetched successfully! Now generating summary..."}
            </Typography>
          </LoadingContainer>
        ) : (
          !error &&
          articleContent && (
            <ContentContainer>
              <HTMLContentBox elevation={1}>
                <SectionTitle>Original Article</SectionTitle>
                <div dangerouslySetInnerHTML={{ __html: articleContent }} />
              </HTMLContentBox>

              <SummaryBox elevation={1}>
                <SectionTitle>Summary</SectionTitle>
                <Typography variant="body1">{summary}</Typography>
              </SummaryBox>
            </ContentContainer>
          )
        ))}
    </PageContainer>
  );
};

export default Summarizer;
