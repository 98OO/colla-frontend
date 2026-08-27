import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { GNB_HEIGHT } from '@styles/layout';

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height : calc(100vh - ${GNB_HEIGHT});
  }

  .tiptap * {
    all: revert;

    :first-child {
      margin-top: 0;
    }
  }

  .ProseMirror:focus-visible {
		outline: none;
	}
`;

export default GlobalStyle;
