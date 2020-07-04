import React from "react";
import { useDropzone } from "react-dropzone";

import { ImportButton, Container } from "./style";

interface SelectJarProps {
  updateJar: (jar: File) => void;
}

const SelectJar: React.FC<SelectJarProps> = ({ updateJar }) => {
  const onDropAccepted = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) updateJar(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    multiple: false,
    accept: ".jar",
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="application/java-archive" />
      <ImportButton>Drop the plugin to analyze</ImportButton>
    </Container>
  );
};

export default SelectJar;
