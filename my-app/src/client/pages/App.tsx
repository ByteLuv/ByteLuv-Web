import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
const HomePageContainer = styled.div`
  width: 100%;
  height: 900px;
  background: linear-gradient(blue, white 30%, white 30%)
`
const MainContainer = styled.div`
  display: flex;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #000000;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  position: relative;
  top: 0;
  left: 0;
`
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  right: 0;
`
const Title: React.FC = ()=>{
  return (
    <TitleContainer>
      ByteLuv
    </TitleContainer>
  )
}
const Message: React.FC = ()=>{
  return (
    <div></div>
  )
}
const Account: React.FC = () =>{
  return(
    <AccountContainer>
      <Message></Message>
      <Avatar></Avatar>
    </AccountContainer>
  )
}
const Header: React.FC = ()=>{
  return (
    <HeaderContainer>
      <Title></Title>
      <Account></Account>
    </HeaderContainer>
  )
}
function App() {
  return (
    <HomePageContainer>
      <Header></Header>
      <MainContainer>
        <LeftContainer></LeftContainer>
        <RightContainer></RightContainer>
      </MainContainer>
    </HomePageContainer>
    
  );
}

export default App;
