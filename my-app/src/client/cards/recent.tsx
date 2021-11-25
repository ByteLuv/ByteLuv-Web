import styled from "styled-components";

const RecentCardContainer = styled.div`
  width: 100%;
  height: 20%;
  background: red;
  border-radius: 16px;
  margin: 8px;
`

const RecentCardHeader = styled.div`
  margin: 5px;
`
const RecentCardContent = styled.div`

`

const RecentCard: React.FC = () => {
  return (
    <RecentCardContainer>
      <RecentCardHeader>最近使用</RecentCardHeader>
      <RecentCardContent>暂无最近使用的功能，快去体验吧</RecentCardContent>
    </RecentCardContainer>
  )
}

export default RecentCard;