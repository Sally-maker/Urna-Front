import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    outline: 0;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button, input {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    background: none;
    cursor: pointer;
    border: 0;
  }

  ul, li {
    list-style: none;
  }

  body {
    font-size: 1rem;
  }
`;
