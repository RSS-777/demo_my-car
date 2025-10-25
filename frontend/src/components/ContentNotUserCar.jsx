import { ButtonLink } from "./ButtonLink";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  min-height: 500px;
  padding: 20px;

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
    margin: 0 auto;
    max-width: 600px;
    padding: 0 10px;
  }

  a {
    width: fit-content;
    margin: 0 auto;
  }
`;

export const ContentNotUserCar = () => {
    const {t} = useTranslation();

    return (
        <MainStyle>
            <h2>{t("pages.service.contentNotUserCar.title")}</h2>
            <ButtonLink to="/login">{t("pages.service.contentNotUserCar.button")}</ButtonLink>
        </MainStyle>
    )
};