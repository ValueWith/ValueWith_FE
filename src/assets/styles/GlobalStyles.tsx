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

    scrollbar-face-color: #b4b8c2;
    scrollbar-track-color: #fff;
    scrollbar-arrow-color: transparent;
    scrollbar-highlight-color: #b4b8c2;
    scrollbar-3dlight-color: none;
    scrollbar-shadow-color: #b4b8c2;
    scrollbar-darkshadow-color: none;
  }

  #root {
    height: 100%;
  }

  ul,
  ol {
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

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    transition: 0.2s;
    background-color: #efefef;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b4b8c2;
    /*  border-radius: 60px; */
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  ::-webkit-scrollbar-button {
    display: none;
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
