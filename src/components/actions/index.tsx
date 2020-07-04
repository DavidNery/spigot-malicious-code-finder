import React from "react";
import { Info, InfoContainer } from "../../styles/GlobalStyle";
import { FiChevronRight } from "react-icons/fi";

interface ActionsProps {
  actions: string[];
}

const Actions: React.FC<ActionsProps> = ({ actions }) => (
  <InfoContainer>
    {actions.map((action) => (
      <Info key={action}>
        <FiChevronRight />{action}
      </Info>
    ))}
  </InfoContainer>
);

export default Actions;
