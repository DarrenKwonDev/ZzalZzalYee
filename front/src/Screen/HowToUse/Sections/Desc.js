import styled from "styled-components";

export const Title = styled.h2`
  font-size: 3em;
  font-weight: bold;
  margin: 0.5em 0;
  @media all and (max-width: 767px) {
    font-size: 1.5em;
  }
`;

export const Description = styled.div`
  font-size: 2em;
  margin: 0.5em 0;
  text-align: start;
  line-height: 1.5;
  @media all and (max-width: 767px) {
    font-size: 1em;
  }
`;

export const Mark = styled.mark`
  background-color: #74b9ff;
`;
