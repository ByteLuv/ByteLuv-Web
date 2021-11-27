import React from "react";
import { Studio } from "@idraw/studio";
import "@idraw/studio/dist/idraw-studio.css";
import styled from "styled-components";

const EditPageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const BackToPostBox = styled.div`
  
`

export const EditPage: React.FC = () => {
  return (
      <Studio
        {...{
          studioWidth: window.innerWidth,
          studioHeight: window.innerHeight,
          contextWidth: 800,
          contextHeight: 600,
          data: { elements: [] },
        }}
      ></Studio>

  );
};
