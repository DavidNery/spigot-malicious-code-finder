import styled from "styled-components";

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 1rem;

  height: 100%;
`;

export const Reset = styled.span`
  position: absolute;
  cursor: pointer;

  top: 10px;
  left: 10px;
`;
