import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./client/pages/App";
import { LetterPage } from "./client/pages/Letter";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/letter" element={<LetterPage/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
