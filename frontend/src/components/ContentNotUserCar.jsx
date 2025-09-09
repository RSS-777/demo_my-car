import { ButtonLink } from "./ButtonLink";
import { useTranslation } from "react-i18next";
import { darkTheme } from '../styles/theme';
import styled from "styled-components";
import garageImage from '../assets/images/home/garage.jpg';

const MainStyle = styled.main`
  background-image: url(${garageImage});
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  min-height: 500px;
  padding: 20px;

  &::before {
    content:'';
    position: absolute;
    background-color: ${({ theme }) => theme.contentNotUser.main.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%; 
    height: 100%; 
  }

  &::after {
    content:'';
    position: absolute;
    background-image: radial-gradient(transparent, ${({ theme }) => theme.contentNotUser.main.after.background});
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%; 
    height: 100%; 
  }

  h4 {
    position: relative;
    z-index: 3;
    color: ${({ theme }) => theme.contentNotUser.main.h4};
    margin: 0 auto;
    max-width: 800px;
    padding: 0 10px;
  }

  a {
    width: fit-content;
    margin: 0 auto;
  }
`;

const ContentNotUserCar = () => {
    const {t} = useTranslation();

    return (
        <MainStyle>
            <h4>{t("pages.service.contentNotUserCar.h2")}</h4>
            <ButtonLink to="/login">{t("pages.service.contentNotUserCar.button")}</ButtonLink>
        </MainStyle>
    )
};

export default ContentNotUserCar;