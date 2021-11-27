import React from "react";
import styled from "styled-components";
import {Avatar, Badge, Dropdown, Menu} from "antd";
import {BellOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {store} from "../../utils/store";

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
  cursor: pointer;
  font-size: 20px;
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

const Message: React.FC = () => {
  let navigate = useNavigate();

  return (
    <MessageContainer onClick={() => navigate("/home")}>
      <HomeOutlined style={{color: "white"}}/>
    </MessageContainer>
  );
};

const AccountOverlay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Item>
        {
          store.get("uid") == null ? (
            <Link to="/login">登录/注册</Link>
          ) : (
            <Link to="/postbox">个人中心</Link>
          )
        }
      </Menu.Item>
      {
        store.get("uid") == null ? (
          <></>
        ) : (
          <Menu.Item>
            <Link to={"/schedule"}>我的日程</Link>
          </Menu.Item>
        )
      }
      {
        store.get("uid") == null ? (
          <></>
        ) : (
          <Menu.Item>
            <div onClick={() => {
              store.set("uid", null);
              setTimeout(() => {
                navigate("/home");
              }, 500)
            }}>退出登录
            </div>
          </Menu.Item>
        )
      }
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