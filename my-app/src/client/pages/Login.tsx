import React from "react";
import styled from "styled-components";
import loginbg from "../../assets/login_bg.png"
import { Tabs, Form, Input, Button } from "antd";

const { TabPane } = Tabs;

const Wrapper = styled.div`
  width: 100%;
  height: ${window.innerHeight + 'px'};
  background: url(${loginbg}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 456px;
  height: fit-content;
  background: #f4f6fa;
  box-shadow: 0 0 16px 0 rgb(22 81 163 / 13%);
  display: flex;
  position: absolute;
`

const LogoBox = styled.div`
  position: absolute;
  top: -100px;
  text-align: center;
  width: 456px;
  font-size: 24px;
  font-weight: bold;
  color: #46a6ff;
`

const LoginBox = styled.div`
  background: #ffffff;
  padding: 20px 40px;
  width: 100%;
  height: fit-content;
`

const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <LogoBox>
          ByteLuv
        </LogoBox>
        <LoginBox>
          <Tabs defaultActiveKey="1">
            <TabPane tab={"登录"} key={1}>
              <Form name={"login"} labelCol={{span: 4}}>
                <Form.Item label={"用户名"} name={"username"}>
                  <Input/>
                </Form.Item>
                <Form.Item label={"密码"} name={"password"}>
                  <Input.Password/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4}}>
                  <Button type={"primary"} htmlType={"submit"}>立即登录</Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab={"注册"} key={2}>
              <Form name={"register"} labelCol={{span: 4}}>
                <Form.Item label={"用户名"} name={"username"}>
                  <Input/>
                </Form.Item>
                <Form.Item label={"密码"} name={"password1"}>
                  <Input.Password/>
                </Form.Item>
                <Form.Item label={"确认密码"} name={"password2"}>
                  <Input.Password/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4}}>
                  <Button type={"primary"} htmlType={"submit"}>注册</Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </LoginBox>
      </Container>
    </Wrapper>
  )
}

export default LoginPage;