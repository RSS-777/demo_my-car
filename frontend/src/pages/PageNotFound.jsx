import styled from "styled-components";
import { ButtonLink } from '../components/ButtonLink';
import { useTranslation } from "react-i18next";
import { darkTheme } from "../styles/theme";

const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-height: calc(100vh - 182px);
    margin: 0;
    background-color: ${({theme}) => theme.pages.pageNotFound.background};
    color: ${({theme}) => theme.pages.pageNotFound.text};
    text-align: center;
    padding: 80px 20px;

    a {
      margin-top: 20px;
    }
`;

const TitleStyle = styled.h1`
    font-size: 5rem;
    margin: 0;
`;

const MessageStyle = styled.p`
    font-size: clamp(18px, 4vw, 28px);
    margin: 10px 0;
`;

const PageNotFound = () => {
    const { t } = useTranslation()

    return (
        <>
            <ContainerStyle>
                <TitleStyle>404</TitleStyle>
                <MessageStyle>{t("pages.404.message.text1")} <br /> {t("pages.404.message.text2")}</MessageStyle>
                <ButtonLink to="/">{t("pages.404.button")}</ButtonLink>
            </ContainerStyle>
        </>
    )
};

export default PageNotFound;