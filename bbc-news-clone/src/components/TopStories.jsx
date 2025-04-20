import React from "react";
import styled from "styled-components";
import SummarizeButton from "./SummarizeButton";

const Section = styled.section`
  padding: 24px 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: ${(props) => (props.noBorder ? "none" : "1px solid #eaeaea")};
  padding-bottom: ${(props) => (props.noBorder ? "0" : "16px")};

  img {
    width: 100%;
    height: auto;
    display: block;
    cursor: pointer;
  }

  h3 {
    font-size: ${(props) => (props.isMainStory ? "22px" : "18px")};
    margin: 12px 0 6px;
    font-weight: ${(props) => (props.isMainStory ? "700" : "600")};
    line-height: 1.2;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }
`;

const MainStory = styled(Card)`
  grid-column: span 2;
  grid-row: span 2;
`;

const SecondaryStory = styled(Card)`
  grid-column: ${(props) => (props.wide ? "span 2" : "span 1")};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: #757575;
`;

const TimeStamp = styled.span`
  margin-right: ${(props) => (props.hasCategory ? "8px" : "0")};
`;

const Category = styled.span`
  &:before {
    content: "|";
    margin: 0 8px;
  }
`;

const dummyArticles = [
  {
    title: "Myanmar's capital Nay Pyi Taw to be redrawn following earthquake",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/ef74/live/c85ca880-1d20-11f0-b700-f1f963c8c095.jpg.webp",
    summary:
      "The layout of Myanmar's capital city Nay Pyi Taw will be redrawn after the devastating earthquake last month, the country's military ruler has said.",
    url: "https://www.bbc.com/news/articles/clyq0v25dm6o",
    timestamp: "4 hrs ago",
    type: "wide",
  },
  {
    title:
      "Man used police officer mum's gun to kill two at Florida college, police say",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/0b70/live/e6af1f80-1bc1-11f0-b1b3-7358f8d35a35.jpg.webp",
    summary:
      "The 20-year-old alleged gunman began shooting at around lunchtime near the student union building.",
    url: "https://www.bbc.com/news/articles/cvgq7l32r98o",
    timestamp: "6 hrs ago",
    category: "US & Canada",
    type: "secondary",
  },
  {
    title: "PM Modi and Elon Musk talk India-US tech collaboration",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/ab15/live/399adf50-1c39-11f0-857e-c31f6e495ac8.jpg.webp",
    summary:
      "Indian Prime Minister Narendra Modi said he discussed his country's potential to collaborate with the US on technology and innovation during a conversation with Elon Musk.",
    url: "https://www.bbc.com/news/articles/c8073ggz1eeo",
    timestamp: "3 hrs ago",
    category: "Asia",
    type: "secondary",
  },
  {
    title: "Google has illegal advertising monopoly, judge rules",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/8242/live/d3082c00-1ba4-11f0-82aa-a13f8272cbc5.jpg.webp",
    summary:
      "The US Department of Justice, along with 17 US states, sued Google, arguing the tech giant was illegally dominating the technology which determines which adverts should be placed online and where.",
    url: "https://www.bbc.com/news/articles/c3674nl7g74o",
    timestamp: "3 hrs ago",
    category: "World",
    type: "wide",
  },
  {
    title: "Oldest serving US astronaut returns to Earth on 70th birthday",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/cb92/live/d049de80-1d95-11f0-a71c-ebf2a471f30c.png.webp",
    summary:
      "America's oldest serving astronaut Dan Pettit has returned to Earth on his 70th birthday.",
    url: "https://www.bbc.com/news/articles/czx1g0q43gqo",
    timestamp: "9 hrs ago",
    category: "Technology",
    type: "secondary",
  },
  {
    title:
      "Australia opposition leader clarifies he believes in climate change after debate",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/cf9e/live/d4a97f90-1b5a-11f0-8f7b-f14ee83762cb.jpg.webp",
    summary:
      "Australian opposition leader Peter Dutton has clarified he believes in climate change after facing backlash for comments made during an election debate on Wednesday night.",
    url: "https://www.bbc.com/news/articles/clyq9pr47ejo",
    timestamp: "7 hrs ago",
    category: "Australia",
    type: "secondary",
  },
  {
    title: "India's sword-wielding grandmother still going strong at 82",
    image:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/c987/live/766d0190-1c1d-11f0-affc-3f3499e2f5e2.jpg.webp",
    summary:
      "An 82-year-old woman who teaches the ancient Indian martial art of Kalaripayattu says she has no plans to retire.",
    url: "https://www.bbc.com/news/articles/clyqqz9mr6yo",
    timestamp: "7 hrs ago",
    category: "India",
    type: "wide",
  },
];

const TopStories = () => {

  const handleArticleClick = (url, event) => {
    if (event.target.closest("button")) {
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <Section>
      <Grid>
        {dummyArticles.map((article, idx) => {
          if (article.type === "main") {
            return (
              <MainStory key={idx} isMainStory noBorder>
                <img
                  src={article.image}
                  alt={article.title}
                  onClick={(e) => handleArticleClick(article.url, e)}
                />
                <SummarizeButton url={article.url} title={article.title} />
                <h3 onClick={(e) => handleArticleClick(article.url, e)}>
                  {article.title}
                </h3>
                <p>{article.summary}</p>
                <MetaInfo>
                  <TimeStamp>{article.timestamp}</TimeStamp>
                  {article.category && <Category>{article.category}</Category>}
                </MetaInfo>
              </MainStory>
            );
          } else if (article.type === "wide") {
            return (
              <SecondaryStory key={idx} wide>
                <img
                  src={article.image}
                  alt={article.title}
                  onClick={(e) => handleArticleClick(article.url, e)}
                />
                <SummarizeButton url={article.url} title={article.title} />
                <h3 onClick={(e) => handleArticleClick(article.url, e)}>
                  {article.title}
                </h3>
                <p>{article.summary}</p>
                <MetaInfo>
                  <TimeStamp hasCategory={!!article.category}>
                    {article.timestamp}
                  </TimeStamp>
                  {article.category && <Category>{article.category}</Category>}
                </MetaInfo>
              </SecondaryStory>
            );
          } else {
            return (
              <SecondaryStory key={idx}>
                <img
                  src={article.image}
                  alt={article.title}
                  onClick={(e) => handleArticleClick(article.url, e)}
                />
                <SummarizeButton url={article.url} title={article.title} />
                <h3 onClick={(e) => handleArticleClick(article.url, e)}>
                  {article.title}
                </h3>
                <p>{article.summary}</p>
                <MetaInfo>
                  <TimeStamp hasCategory={!!article.category}>
                    {article.timestamp}
                  </TimeStamp>
                  {article.category && <Category>{article.category}</Category>}
                </MetaInfo>
              </SecondaryStory>
            );
          }
        })}
      </Grid>
    </Section>
  );
};

export default TopStories;
