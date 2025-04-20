import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 24px 32px;
  background-color: #8b0000;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PodcastCard = () => {
  return (
    <Section>
      <h3>Global News Podcast</h3>
      <p>Trump and Meloni talk up chances of US trade deal with Europe</p>
      <button>Listen Now</button>
    </Section>
  );
};

export default PodcastCard;


