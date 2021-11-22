import styled from "styled-components";

const LetterContainer = styled.div`
  margin: 0;
  height: 80%;
  background-color: white;
`;

const LetterHeader = styled.div`
  margin: 5px;
`
const LetterResContent = styled.div`

`
const LetterSentContent = styled.div`

`
const LetterCard: React.FC = () => {
  return (
    <LetterContainer>
      <LetterHeader>今日情书</LetterHeader>
      <LetterResContent>情书正在路上，请稍作等待</LetterResContent>
      <LetterSentContent>还未制作今日情书，快来试试吧</LetterSentContent>
    </LetterContainer>
  );
};

export default LetterCard;
