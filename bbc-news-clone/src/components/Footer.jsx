import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #111;
  color: white;
  padding: 24px 32px;
  text-align: center;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterWrapper>© 2025 BBC Clone | Built for educational use</FooterWrapper>
  );
};

export default Footer;
