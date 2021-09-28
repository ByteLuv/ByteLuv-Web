import React from "react";
import styled from "styled-components";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import homebg from "../../assets/homepage_bg.png";

const HomePageContainer = styled.div`
  width: 100%;
  height: 900px;
  padding: 2% 5%;
  background: url(${homebg}) center 0 no-repeat;
`;
const MainContainer = styled.div`
  display: flex;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
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
        <BellOutlined style={{ color: "white" }} />
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
    <Dropdown overlay={AccountOverlay} placement="bottomRight">
      <AccountContainer id="account">
        <Badge dot size="small">
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      </AccountContainer>
    </Dropdown>
  );
};
const AccountOverlay = (
  <Menu>
    <Menu.Item>注册</Menu.Item>
  </Menu>
);
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
        <LeftContainer></LeftContainer>
        <RightContainer></RightContainer>
      </MainContainer>
    </HomePageContainer>
  );
};

export default HomePage;
