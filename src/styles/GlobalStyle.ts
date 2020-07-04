import styled, { createGlobalStyle } from "styled-components";

export const InfoContainer = styled.div`
  word-wrap: break-word;

  overflow-y: scroll;

  ::-moz-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Info = styled.div`
  font-size: 1rem;

  &:nth-child(odd) {
    color: var(--text);
  }

  &:nth-child(even) {
    color: var(--text2);
  }

  margin-bottom: 10px;
`;

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Source Sans Pro', sans-serif;
    }

    dd {
      display: block;
      margin-inline-start: 20px;
    }

    html, body, #root {
        width: 100%;
        height: 100%;
    }

    body {
        display: flex;
        justify-content: center;
        padding: 1% 15%;

        background-color: #F5F5F5;
    }

    :root {
        --text: #B4BAFA;
        --text2: #a5acf7;
    }
`;

export default GlobalStyle;
