import React from "react";
import styled from "styled-components";
import SummarizeButton from "./SummarizeButton";

const Section = styled.section`
  padding: 24px 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const Card = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;

  h4 {
    margin: 0 0 6px;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const newsArticles = [
  {
    title: "Starmer and Trump discuss 'productive' trade talks",
    summary:
      "Sir Keir Starmer and Donald Trump discussed ongoing and productive trade talks, No 10 has said, in their first call since the US president imposed tariffs on UK goods.",
    url: "https://www.bbc.com/news/articles/c8073jzr1xko",
  },
  {
    title: "What is the 1798 law that Trump used to deport migrants?",
    summary:
      "The Alien Enemies Act grants the president of the United States sweeping powers to order the detention and deportation of foreign enemies.",
    url: "https://www.bbc.com/news/articles/cy871w21d3vo",
  },
  {
    title:
      "Scientists claim to have discovered 'new colour' no one has seen before",
    summary:
      "A team of scientists claim to have discovered a new colour that no human has ever seen before.",
    url: "https://www.bbc.com/news/articles/clyq0n3em41o",
  },
];

const MoreNews = () => {
  const handleArticleClick = (url, event) => {
    if (event.target.closest("button")) {
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <Section>
      <h2>More News</h2>
      <Grid>
        {newsArticles.map((article, idx) => (
          <Card key={idx}>
            <SummarizeButton url={article.url} title={article.title} />
            <h4 onClick={(e) => handleArticleClick(article.url, e)}>
              {article.title}
            </h4>
            <p>{article.summary}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default MoreNews;
