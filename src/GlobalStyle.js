import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, *::before, *::after {
      box-sizing: border-box;
  }
  html {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;
