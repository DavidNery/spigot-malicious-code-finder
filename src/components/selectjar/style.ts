import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: dashed 2px var(--text);
  border-radius: 5px;

  cursor: pointer;
  
  padding: 2rem 20%;
`;

export const ImportButton = styled.span`
  color: var(--text);
  font-weight: bold;
  font-size: 1rem;
`;