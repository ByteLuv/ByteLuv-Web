import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {Avatar, Badge, Dropdown, Menu} from "antd";
import {BellOutlined, UserOutlined} from "@ant-design/icons";
import homebg from "../../assets/homepage_bg.png";
import LetterCard from "../cards/letter";
import RecentCard from "../cards/recent";
import ScheduleCard from "../cards/schedule";
import CharmCard from "../cards/charm";

const HomePageContainer = styled.div`
  width: 100%;
  height: 900px;
  padding: 2% 5%;
  background: url(${homebg}) no-repeat;
  background-size: 100% 40%;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  padding: 3% 5%;
`;
const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: grey;
`;
const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: green;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const HeaderRightContainer = styled.div`
  display: flex;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  left: 0;
`;
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`;
const Title: React.FC = () => {
  return <TitleContainer>ByteLuv</TitleContainer>;
};
const Message: React.FC = () => {
  return (
    <Dropdown overlay={MessageOverlay} placement="bottomRight">
      <MessageContainer>
        <BellOutlined style={{color: "white"}}/>
      </MessageContainer>
    </Dropdown>
  );
};
const MessageOverlay = (
  <Menu>
    <Menu.Item>暂无新消息</Menu.Item>
  </Menu>
);
const Account: React.FC = () => {
  return (
    <Dropdown overlay={<AccountOverlay/>} placement="bottomRight">
      <AccountContainer id="account">
        <Badge dot size="small">
          <Avatar shape="square" icon={<UserOutlined/>}/>
        </Badge>
      </AccountContainer>
    </Dropdown>
  );
};

const AccountOverlay: React.FC = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link to="/login">登录</Link>
      </Menu.Item>
    </Menu>
  );
};

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title></Title>
      <HeaderRightContainer>
        <Message></Message>
        <Account></Account>
      </HeaderRightContainer>
    </HeaderContainer>
  );
};
const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <Header></Header>
      <MainContainer>
        <LeftContainer>
          <LetterCard></LetterCard>
          <RecentCard></RecentCard>
        </LeftContainer>
        <RightContainer>
          <ScheduleCard></ScheduleCard>
          <CharmCard></CharmCard>
        </RightContainer>
      </MainContainer>
    </HomePageContainer>
  );
};

export default HomePage;
