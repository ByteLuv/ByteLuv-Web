import styled from "styled-components";
import bgout from "../../assets/envelop/bg_out.png";
import after from "../../assets/envelop/after.png";
import before from "../../assets/envelop/before.png";
import letterbg from "../../assets/envelop/letter_bg.png";

const LetterPageContainer = styled.div`
  background: #ccc url(${bgout});
  color: #7c7873;
`;

const LetterContainer = styled.div`
  width: 530px;
  margin: 20px auto 0;
  height: 1000px;
`;

const FormContainer = styled.div`
  overflow: hidden;
  height: 446px;
  position: relative;
  top: 0px;
  transition: all 1s ease-in-out 0.3s;
  &:before {
    content: "";
    position: absolute;
    bottom: 128px;
    left: 0;
    background: url(${before});
    width: 530px;
    height: 316px;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(${after});
    width: 530px;
    height: 260px;
  }
  &:hover {
    height: 776px;
    top: -200px;
  }
`;

const Form = styled.div`
  background: #f7f2ec url(${letterbg});
  position: relative;
  top: 200px;
  overflow: hidden;
  height: 200px;
  width: 400px;
  margin: 0px auto;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 3px #9d9d9d, inset 0px 0px 27px #fff;
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
          <Form></Form>
        </FormContainer>
      </LetterContainer>
    </LetterPageContainer>
  );
};
