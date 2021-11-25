import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import homebg from "../../assets/homepage_bg.png";

import HeaderBar from "../components/HeaderBar";

const HomePageContainer = styled.div`
  width: 100%;
  height: 900px;
  padding: 2% 5%;
  background: url(${homebg}) no-repeat;
  background-size: 100% 30%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 3% 5%;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: #EBF2F8;
  font-weight: 700;
  font-size: 40px;
  margin: 20px 0;
`

const Title: React.FC = () => {
  return (
    <TitleContainer>免费在线表白情书</TitleContainer>
  )
}

const IntroContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
  color: #F3F5F9;
  text-align: center;
`

const Intro: React.FC = () => {
  return (
    <IntroContainer>专业强大的整活工具，支持情侣实时在线协作，可用于线上表白、促进沟通、加深感情等各种不同的需求目的</IntroContainer>
  )
}

const ToLoginContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 50px 0;
  justify-content: center;
`

const ToLogin: React.FC = () => {
  let buttonStyle: React.CSSProperties = {
    background: "#067BEF",
    border: "#067BEF",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: 500,
    color: "white",
    lineHeight: "20px",
    padding: "14px 40px",
    height: "auto"
  }
  let navigate = useNavigate();

  return (
    <ToLoginContainer>
      <Button style={buttonStyle} onClick={() => {
        navigate("/login");
      }}>立即使用</Button>
    </ToLoginContainer>
  )
}

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <HeaderBar/>
      <MainContainer>
        <Title/>
        <Intro/>
        <ToLogin/>
      </MainContainer>
    </HomePageContainer>
  );
};

export default HomePage;
