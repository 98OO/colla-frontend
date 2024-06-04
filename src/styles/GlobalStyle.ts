import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  body,
  input,
  select,
  textarea,
  button {
    font-family: 'Pretendard', system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  main {
    width: 100%;
  }
`;

export default GlobalStyle;
