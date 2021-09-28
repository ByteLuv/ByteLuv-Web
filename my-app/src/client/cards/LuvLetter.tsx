import styled from "styled-components";

const LetterContainer = styled.div`
  margin: 0;
  height: 530px;
  width: 800px;
`;

const EnvelopWrapper = styled.div`
  overflow: hidden;
`;

const Envelop = styled.div``;

const LuvLetter: React.FC = () => {
  return (
    <LetterContainer>
      <EnvelopWrapper></EnvelopWrapper>
    </LetterContainer>
  );
};

export default LuvLetter;
