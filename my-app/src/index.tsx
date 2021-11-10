import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./client/pages/App";
import { LetterPage } from "./client/pages/Letter";
import "./index.css";
import LoginPage from "./client/pages/Login";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/letter" element={<LetterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
