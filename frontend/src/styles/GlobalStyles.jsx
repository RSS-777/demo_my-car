import { createGlobalStyle } from "styled-components";
import RobotoItalic from "../assets/fonts/Roboto-Italic.woff2";
import RobotoRegular from "../assets/fonts/Roboto-Regular.woff2";
import RobotoMedium from "../assets/fonts/Roboto-Medium.woff2";
import RobotoSemiBold from "../assets/fonts/Roboto-SemiBold.woff2";
import RobotoBold from "../assets/fonts/Roboto-Bold.woff2";

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

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    min-height: 100vh;
    font-size: 16px;
    line-height: 1.5;
  }

  h1 {
    font-size: clamp(2.2rem, 4vw, 3.5rem); 
    line-height: 1.2;
    font-weight: 700;
  }

  h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    line-height: 1.25;
    font-weight: 600;
  }

  h3 {
    font-size: clamp(1.5rem, 2.5vw, 2rem); 
    line-height: 1.3;
    font-weight: 600;
  }

  h4 {
    font-size: clamp(1.25rem, 2vw, 1.75rem); 
    line-height: 1.35;
    font-weight: 500;
  }

  h5 {
    font-size: clamp(1.1rem, 1.5vw, 1.5rem); 
    line-height: 1.4;
    font-weight: 500;
  }

  h6 {
    font-size: clamp(1rem, 1vw, 1.25rem); 
    line-height: 1.4;
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }  

  button, a, label {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
`;
