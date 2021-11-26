import React from "react";
import styled from "styled-components";
import {Avatar, Badge, Dropdown, Menu} from "antd";
import {BellOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HeaderRightContainer = styled.div`
  display: flex;
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  left: 0;
  color: #EBF2F8;
`;

const Logo: React.FC = () => {
  return <LogoContainer>ByteLuv</LogoContainer>;
};

const MessageOverlay: React.FC = () => {
  return (
    <Menu>
      <Menu.Item>暂无新消息</Menu.Item>
    </Menu>
  );
}

const Message: React.FC = () => {
  return (
    <Dropdown overlay={<MessageOverlay/>} placement="bottomRight">
      <MessageContainer>
        <BellOutlined style={{color: "white"}}/>
      </MessageContainer>
    </Dropdown>
  );
};

const AccountOverlay: React.FC = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link to="/login">登录/注册</Link>
      </Menu.Item>
    </Menu>
  );
};

const Account: React.FC = () => {
  let accountCount = 0;

  return (
    <Dropdown overlay={<AccountOverlay/>} placement="bottomRight">
      <AccountContainer id="account">
        <Badge count={accountCount} dot size="small">
          <Avatar shape="square" icon={<UserOutlined/>}/>
        </Badge>
      </AccountContainer>
    </Dropdown>
  );
};

const HeaderBar: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo/>
      <HeaderRightContainer>
        <Message/>
        <Account/>
      </HeaderRightContainer>
    </HeaderContainer>
  );
};

export default HeaderBar;