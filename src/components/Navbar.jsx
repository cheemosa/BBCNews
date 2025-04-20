import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
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
    height: 100px;
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
  padding: 8px 16px 0px 16px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #e0e0e0;

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
  const location = useLocation();
  const currentPath = location.pathname;

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
            <img src={bbcLogo} alt="BBC Logo" height={"100px"} />
          </Link>
        </CenterLogo>

        <RightButtons>
          <button
            className="register-btn"
          >
            Register
          </button>
          <Link to="/signin" className="signin">
            Sign In
          </Link>
        </RightButtons>
      </TopNav>

      <BottomNav>
        <Link to="/" className={currentPath === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/summarize"
          className={currentPath === "/summarize" ? "active" : ""}
        >
          Summarize
        </Link>
        <Link to="/news" className={currentPath === "/news" ? "active" : ""}>
          News
        </Link>
        <Link to="/sport" className={currentPath === "/sport" ? "active" : ""}>
          Sport
        </Link>
        <Link
          to="/business"
          className={currentPath === "/business" ? "active" : ""}
        >
          Business
        </Link>
        <Link
          to="/innovation"
          className={currentPath === "/innovation" ? "active" : ""}
        >
          Innovation
        </Link>
        <Link
          to="/culture"
          className={currentPath === "/culture" ? "active" : ""}
        >
          Culture
        </Link>
        <Link to="/arts" className={currentPath === "/arts" ? "active" : ""}>
          Arts
        </Link>
        <Link
          to="/travel"
          className={currentPath === "/travel" ? "active" : ""}
        >
          Travel
        </Link>
        <Link to="/earth" className={currentPath === "/earth" ? "active" : ""}>
          Earth
        </Link>
        <Link to="/audio" className={currentPath === "/audio" ? "active" : ""}>
          Audio
        </Link>
        <Link to="/video" className={currentPath === "/video" ? "active" : ""}>
          Video
        </Link>
        <Link to="/live" className={currentPath === "/live" ? "active" : ""}>
          Live
        </Link>
      </BottomNav>
    </NavbarWrapper>
  );
};

export default Navbar;
