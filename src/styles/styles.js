import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    color: #000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
