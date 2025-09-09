import inovativeImage from "../assets/images/about/inovative.webp";
import styled from "styled-components";

const HeaderStyle = styled.header`
  > div:first-of-type {
    background: ${({ theme }) => theme.header.background};
    padding: 80px 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      max-width: 750px;
      width: 90%;
      color: ${({ theme }) => theme.header.h1};
    }
  }

  > div:nth-of-type(2) {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    background-image: url(${inovativeImage});
    background-attachment: fixed;
    background-size: cover;
    background-position: center;

    &::before {
      content: "";
      position: absolute;
      background-color: ${({ theme }) => theme.header.div.before.background};
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    h3 {
      position: relative;
      max-width: 767px;
      text-align: center;
      color: ${({ theme }) => theme.header.div.h3};
      z-index: 3;
    }
  }

  @media (max-width: 768px) {
    > div:first-of-type {
      h1 {
        font-size: 50px;
      }
    }
  }

  @media (max-width: 580px) {
    > div:first-of-type {
      h1 {
        font-size: 35px;
        max-width: 400px;
      }
    }
  }

  @media screen and (orientation: landscape) and (min-aspect-ratio: 16/9) and (pointer: coarse) {
    > div:first-of-type {
      min-height: calc(100vh - 67px);
      height: auto;
    }

    > div:nth-of-type(2) {
      min-height: calc(100vh - 67px);
      height: auto;

      h3 {
        font-size: 25px;
      }
    }
  }
`;

export const Header = ({ h1, h3, children }) => {
  return (
    <HeaderStyle>
      <div>
        <h1>{h1}</h1>
      </div>
      {h3 && (
        <div>
          <h3>{h3}</h3>
          {children}
        </div>
      )}
    </HeaderStyle>
  );
};
