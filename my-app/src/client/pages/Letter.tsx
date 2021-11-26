import styled from "styled-components";
import after from "../../assets/envelop/after.png";
import before from "../../assets/envelop/before.png";
import letterbg from "../../assets/envelop/letter_bg.png";

const letterWidth = "600px";
const letterHeight = "520px";

const LetterPageContainer = styled.div`
  color: #7c7873;
  height: 580px;
  overflow: hidden;
`;

const LetterContainer = styled.div`
  width: ${letterWidth};
  margin: 0 auto;
`;

const FormContainer = styled.div`
  overflow: hidden;
  height: ${letterHeight};
  position: relative;
  top: 0;
  transition: all 1s ease-in-out 0.3s;

  &:before {
    content: "";
    position: absolute;
    bottom: 190px;
    left: 0;
    background: url(${before});
    background-size: 100%;
    width: ${letterWidth};
    height: 316px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(${after});
    background-size: 100%;
    width: ${letterWidth};
    height: 300px;
  }

  &:hover {
    height: 776px;
    top: -200px;
  }
`;

const Form = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background: #f7f2ec url(${letterbg});
  position: relative;
  top: 230px;
  overflow: hidden;
  height: 200px;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px #9d9d9d, inset 0 0 27px #fff;
  transition: all 1s ease-in-out 0.3s;

  ${FormContainer}:hover & {
    height: 530px;
  }
`;

export const LetterPage: React.FC = () => {
  return (
    <LetterPageContainer>
      <LetterContainer>
        <FormContainer>
          <Form>马上来创建你的专属情书吧</Form>
        </FormContainer>
      </LetterContainer>
    </LetterPageContainer>
  );
};
