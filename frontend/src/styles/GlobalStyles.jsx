import { createGlobalStyle } from 'styled-components';
import RobotoItalic from '../assets/fonts/Roboto-Italic.woff2';
import RobotoRegular from '../assets/fonts/Roboto-Regular.woff2';
import RobotoMedium from '../assets/fonts/Roboto-Medium.woff2';
import RobotoSemiBold from '../assets/fonts/Roboto-SemiBold.woff2';
import RobotoBold from '../assets/fonts/Roboto-Bold.woff2';
import IBMLightItalic from '../assets/fonts/IBMPlexMono-LightItalic.woff2';

export const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: 'Roboto';
      src: url(${RobotoItalic}) format('woff2');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Roboto';
      src: url(${RobotoRegular}) format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoSemiBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold}) format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'IBM Plex Mono';
    src: url(${IBMLightItalic}) format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }

  body {
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: normal;
      min-height: 100vh;
      margin: 0;
      padding: 0;
  }

  h1 {
    line-height: 1; 
    font-size: 65px;
    font-weight: 600;
    text-align: center;
  }

  h2 {
    font-size: clamp(30px, 5vw, 54px);
     font-weight: 500;
  }

  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(22px, 4vw, 32px);
  }

  h4 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }

  h5 {
    margin: 0;
    font-size: clamp(18px, 4vw, 20px);
  }

  p {
    font-style: italic;
    font-size: 18px;
  }

  li {
    font-size: 16px;
  }

  a {
    font-size: 20px;
  }  
`;