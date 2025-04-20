import React from "react";
import styled from "styled-components";
import SummarizeButton from "./SummarizeButton";

const Section = styled.section`
  padding: 24px 32px;
  background: #f5f5f5;
`;

const Grid = styled.div`
  display: flex;
  gap: 24px;
`;

const Card = styled.div`
  flex: 1;
  position: relative;

  img {
    width: 100%;
    cursor: pointer;
  }

  h4 {
    margin: 12px 0 6px;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const bbcArticles = [
  {
    title: "BluSmart breakdown - how Uber's EV rival in India collapsed",
    summary:
      "The fortunes of India's BluSmart, a popular electric ride hailing service and once a formidable rival to Uber, have quickly unravelled, with the company halting new cab bookings.",
    category: "Technology",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/ab0e/live/0837ee30-1b67-11f0-b405-a9063c038ff6.jpg.webp",
    url: "https://www.bbc.com/news/articles/c62znepddq4o",
    timestamp: "21 hrs ago",
    isFeatured: true,
  },
  {
    title: "Buttler's 97 not out leads Gujarat to top of IPL table",
    summary:
      "Jos Buttler's 97 not out led Gujarat Titans to an impressive seven-wicket victory against Delhi Capitals and took them to the top of the Indian Premier League table.",
    category: "Sports",
    image:
      "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/57c4/live/46b8c260-1d2e-11f0-b700-f1f963c8c095.jpg.webp",
    url: "https://www.bbc.com/sport/cricket/articles/c4g89x7yeyxo",
    timestamp: "19 hrs ago",
    isFeatured: false,
  },
];

const OnlyFromBBC = () => {
  const handleArticleClick = (url, event) => {
    if (event.target.closest("button")) {
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <Section>
      <h2>ONLY FROM THE BBC</h2>
      <Grid>
        {bbcArticles.map((article, idx) => (
          <Card key={idx}>
            <img
              src={article.image}
              alt={article.title}
              onClick={(e) => handleArticleClick(article.url, e)}
            />
            <SummarizeButton url={article.url} title={article.title} />
            <h4 onClick={(e) => handleArticleClick(article.url, e)}>
              {article.title}
            </h4>
            <p>{article.summary}</p>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {article.timestamp} | {article.category}
            </span>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default OnlyFromBBC;
