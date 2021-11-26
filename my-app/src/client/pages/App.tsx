import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, Divider} from "antd";
import homebg from "../../assets/homepage_bg.png";

import HeaderBar from "../Components/HeaderBar";
import {LetterPage} from "./Letter";

const HomePageContainer = styled.div`
  width: 100%;
  height: 900px;
  padding: 0;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 3% 5%;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 3% 5%;
  background: url(${homebg}) no-repeat;
  background-size: 100% 100%;
`

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
  margin: 10px 0;
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

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 0 5%;
  flex-direction: column;
  background-color: #212930;
`

const FooterTitleContainer = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  padding: 30px 0;
`

const FooterTitle: React.FC = () => {
  return (
    <FooterTitleContainer>
      每天有
      <text style={{color: "#067BEF"}}>10000+</text>
      情书在ByteLuv创建
      <Divider style={{backgroundColor: "#30393F"}}/>
    </FooterTitleContainer>
  )
}

const FooterContentContainer = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #6C7D8F;
  text-align: center;
  padding-bottom: 20px;
`

const FooterContent: React.FC = () => {
  return (
    <FooterContentContainer>
      <p>开发者: 武汉大学ByteLuv团队 ByteLuv v0.0.1</p>
      <p>武汉大学ByteLuv团队 @2021 京ICP备114514号-1 | 京公网安备 1145141919810号</p>
    </FooterContentContainer>
  )
}

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <HeaderContainer>
        <HeaderBar/>
        <Title/>
        <Intro/>
      </HeaderContainer>
      <MainContainer>
        <ToLogin/>
        <LetterPage/>
      </MainContainer>
      <FooterContainer>
        <FooterTitle/>
        <FooterContent/>
      </FooterContainer>
    </HomePageContainer>
  );
};

export default HomePage;
