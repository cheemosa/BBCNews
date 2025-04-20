import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bbcLogo from "../assets/image.png";

const NavbarWrapper = styled.div`
  width: 100%;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    cursor: pointer;
  }
`;

const CenterLogo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  img {
    height: 32px;
  }
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .register-btn {
    background-color: #000;
    color: #fff;
    padding: 6px 12px;
    font-weight: bold;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }

  .signin {
    font-size: 14px;
    color: #000;
    text-decoration: none;
    font-weight: 500;
  }
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 8px 16px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;

  a {
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-family: ReithSans, Arial, sans-serif;
    padding-bottom: 4px;

    &.active {
      border-bottom: 4px solid #000;
      font-weight: bold;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <TopNav>
        <LeftIcons>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zm-6 0A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z" />
          </svg>
        </LeftIcons>

        <CenterLogo>
          <Link to="/">
            <img src={bbcLogo} alt="BBC Logo" />
          </Link>
        </CenterLogo>

        <RightButtons>
          <button className="register-btn">Register</button>
          <Link to="/signin" className="signin">
            Sign In
          </Link>
        </RightButtons>
      </TopNav>

      <BottomNav>
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/news">News</Link>
        <Link to="/sport">Sport</Link>
        <Link to="/business">Business</Link>
        <Link to="/innovation">Innovation</Link>
        <Link to="/culture">Culture</Link>
        <Link to="/arts">Arts</Link>
        <Link to="/travel">Travel</Link>
        <Link to="/earth">Earth</Link>
        <Link to="/audio">Audio</Link>
        <Link to="/video">Video</Link>
        <Link to="/live">Live</Link>
        <Link to="/summarize">Summarize</Link>
      </BottomNav>
    </NavbarWrapper>
  );
};

export default Navbar;
