import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { Reset, ResultGrid } from "./style";
import JarChecker from "../../services/JarChecker";
import { ObserverData } from "../../services/Observer";
import Actions from "../actions";
import Methods from "../methods";

interface AnalyzingProps {
  jarFile: File;
  reset: () => void;
}
const Analyzing: React.FC<AnalyzingProps> = ({ jarFile, reset }) => {
  const [actions, setActions] = useState<string[]>([]);
  const [finish, setFinish] = useState<boolean>(false);
  const [methods, setMethods] = useState<ObserverData["methodResult"][]>([]);

  function updateActions(action: string): void {
    setActions(acts => [action, ...acts]);
  }

  useEffect(() => {
    const jarChecker = new JarChecker(jarFile);

    jarChecker.subscribe("jarReadStart", ({ jarName }) =>
      updateActions(`Analyzing plugin ${jarName}...`)
    );
    jarChecker.subscribe("jarReadFinish", ({ jarName }) => {
      updateActions(`Plugin ${jarName} analyzed!`);
      setFinish(true);
    });
    jarChecker.subscribe("classReadStart", ({ className }) =>
      updateActions(`Analyzing class ${className}...`)
    );
    jarChecker.subscribe("classReadFinish", ({ className }) =>
      updateActions(`Class ${className} analyzed!`)
    );
    jarChecker.subscribe("methodResult", (data) => {
      if (data.analyzers.forceop > 0) setMethods(m => [data, ...m]);
    });

    jarChecker.analyzeJar();
  }, []);

  return (
    <>
      <ResultGrid>
        <Actions actions={actions} />
        <Methods methods={methods} />
      </ResultGrid>

      {finish ? (
        <Reset onClick={reset}><FiArrowLeft /></Reset>
      ) : (
        <></>
      )}
    </>
  );
};

export default Analyzing;
