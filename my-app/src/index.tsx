import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./client/pages/App";
import {LetterPage} from "./client/pages/Letter";
import "./index.css";
import LoginPage from "./client/pages/Login";
import {SchedulePage} from "./client/pages/Schedule"
import {PostboxPage} from "./client/pages/Postbox";
import {EditPage} from "./client/pages/Edit";
import axios from "axios";
import {message} from "antd";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api";
axios.interceptors.response.use(
  response => {
    // normally pass by
    return response
  },
  error => {
    // show message when request occur some error
    message.error("出现了一些小问题", 1)
  })

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/letter" element={<LetterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/schedule" element={<SchedulePage/>}/>
        <Route path="/postbox" element={<PostboxPage/>}/>
        <Route path="/editor" element={<EditPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
