import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Bar = styled.div`
  position: absolute;
  height: 20px;
  width: ${({ progress }) => progress}%;
  color: white;
  background-color: #4cd964;
  z-index: 1;
`;

const Placeholder = styled.div`
  position: absolute;
  height: 20px;
  width: 100%;
  background-color: #abfbb8;
`;

const ProgressLabel = styled.div`
  position: absolute;
  width: 100%;
  color: white;
  text-align: center;
  z-index: 2;
`;

export const Progress = ({ progress, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Bar progress={progress}></Bar>
      <Placeholder></Placeholder>
      <ProgressLabel>{progress}%</ProgressLabel>
    </Wrapper>
  );
};
