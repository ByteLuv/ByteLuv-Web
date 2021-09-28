import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./client/pages/App";
import { LetterPage } from "./client/pages/Letter";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <HomePage />
    <LetterPage />
  </React.StrictMode>,
  document.getElementById("root")
);
