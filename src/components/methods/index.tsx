import React from "react";
import { Info, InfoContainer } from "../../styles/GlobalStyle";
import { ObserverData } from "../../services/Observer";
import { MethodProperty } from "./style";

interface MethodsProps {
  methods: ObserverData["methodResult"][];
}

const Methods: React.FC<MethodsProps> = ({ methods }) => (
  <InfoContainer>
    {methods.length === 0 ? (
      <Info>
        <strong>No malicious code found!</strong>
      </Info>
    ) : (
      methods.map((method) => (
        <Info key={new Date().getMilliseconds()}>
          <MethodProperty>Class: </MethodProperty>
          <span>{method.className}</span><br/>

          <MethodProperty>Method: </MethodProperty>
          <span>{method.methodName}</span><br/>

          <dl>
            <dt>
              <MethodProperty>Analyzer: </MethodProperty>
            </dt>
            <dd>
              <MethodProperty>Malicious code: </MethodProperty>
              <span>ForceOP</span>
            </dd>
            <dd>
              <MethodProperty>Amount: </MethodProperty>
              <span>{method.analyzers.forceop}</span>
            </dd>
          </dl>
        </Info>
      ))
    )}
  </InfoContainer>
);

export default Methods;
