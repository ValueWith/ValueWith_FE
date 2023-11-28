import { Global, css } from '@emotion/react';
import './tailwind.css';

const styles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
  }

  html {
    width: 100%;
    min-height: 100%;
    font-size: 10px;
    font-size: 62.5%;
    line-height: normal;
  }

  body {
    height: 100%;
    height: 100dvh;
    font-family: 'Pretendard', 'Noto Sans KR', NanumBarunGothic, 'Malgun Gothic',
      '맑은 고딕', 돋움, Dotum, Helvetica, Arial, sans-serif;
    color: #222;
    background-color: #fff;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    -ms-overflow-style: none;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: -0.384px;
    text-rendering: auto;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    height: 100%;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  dl,
  dt,
  dd {
    text-indent: 0;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  a:visited,
  a:focus,
  a:active {
    text-decoration: none;
  }

  img {
    border: 0;
    vertical-align: top;
    max-width: 100%;
  }

  label,
  input {
    vertical-align: middle;
  }

  textarea,
  input {
    font-family: 'Pretendard', 'Noto Sans KR', NanumBarunGothic, 'Malgun Gothic',
      '맑은 고딕', 돋움, Dotum, Helvetica, Arial, sans-serif;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    width: auto;
    border-radius: 0;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    cursor: pointer;
  }

  button:focus {
    outline: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  *:focus {
    outline: none;
  }

  *[contenteditable='true'] {
    display: inline-block;
  }
`;

function GlobalStyles() {
  return <Global styles={styles} />;
}

export default GlobalStyles;
