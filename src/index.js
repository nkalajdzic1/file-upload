import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "theme";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "GlobalStyle";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <App />
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
