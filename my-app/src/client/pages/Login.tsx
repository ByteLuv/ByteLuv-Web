import React, { useState } from "react";
import styled from "styled-components";
import loginbg from "../../assets/login_bg.png";
import { Tabs, Form, Input, Button, message } from "antd";
import axios from "axios";
import { store } from "../../utils/store";

const { TabPane } = Tabs;

const Wrapper = styled.div`
  width: 100%;
  height: ${window.innerHeight + "px"};
  background: url(${loginbg}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 456px;
  height: fit-content;
  background: #f4f6fa;
  box-shadow: 0 0 16px 0 rgb(22 81 163 / 13%);
  display: flex;
  position: absolute;
`;

const LogoBox = styled.div`
  position: absolute;
  top: -100px;
  text-align: center;
  width: 456px;
  font-size: 24px;
  font-weight: bold;
  color: #46a6ff;
`;

const LoginBox = styled.div`
  background: #ffffff;
  padding: 20px 40px;
  width: 100%;
  height: fit-content;
`;

const LoginPage: React.FC = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPwd, setRegisterPwd] = useState("");

  const login = () => {
    axios({
      url: "login",
      method: "get",
      params: {
        uname: loginName,
        pwd: loginPwd,
      },
    }).then((response) => {
      switch (response.data.ErrorCode) {
        case 0:
          message.success("登录成功", 1);
          store.set("uid", Number(response.data.uid));
          break;
        default:
          message.info(response.data.Descript, 1);
      }
    });
  };

  const register = () => {
    axios({
      url: "/signup",
      method: "post",
      params: {
        uname: registerName,
        password: registerPwd,
      },
    }).then((response) => {
      switch (response.data.ErrorCode) {
        case 0:
          message.success("注册成功", 1);
          break;
        default:
          message.error(response.data.Descript, 1);
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <LogoBox>ByteLuv</LogoBox>
        <LoginBox>
          <Tabs defaultActiveKey="1">
            <TabPane tab={"登录"} key={1}>
              <Form name={"login"} labelCol={{ span: 4 }}>
                <Form.Item
                  label={"用户名"}
                  name={"username"}
                  rules={[{ required: true, message: "请输入用户名！" }]}
                >
                  <Input
                    value={loginName}
                    onChange={(event) => setLoginName(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={"密码"}
                  name={"password"}
                  hasFeedback
                  rules={[{ required: true, message: "请输入密码！" }]}
                >
                  <Input.Password
                    value={loginPwd}
                    onChange={(event) => setLoginPwd(event.target.value)}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                  <Button type={"primary"} htmlType={"submit"} onClick={login}>
                    立即登录
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab={"注册"} key={2}>
              <Form name={"register"} labelCol={{ span: 6 }}>
                <Form.Item
                  label={"用户名"}
                  name={"username"}
                  rules={[{ required: true, message: "请输入用户名！" }]}
                >
                  <Input
                    value={registerName}
                    onChange={(event) => setRegisterName(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={"密码"}
                  name={"password"}
                  hasFeedback
                  rules={[{ required: true, message: "请输入密码！" }]}
                >
                  <Input.Password
                    value={registerPwd}
                    onChange={(event) => setRegisterPwd(event.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={"确认密码"}
                  name={"confirm"}
                  hasFeedback
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "请确认密码！" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error("两次输入的密码不同！")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <Button
                    type={"primary"}
                    htmlType={"submit"}
                    onClick={register}
                  >
                    注册
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </LoginBox>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
