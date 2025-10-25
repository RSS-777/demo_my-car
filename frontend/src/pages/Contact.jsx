import { useTranslation } from "react-i18next";
import { FormContact } from "../components/FormContact";
import { Header } from "../components/Header";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const MainStyle = styled.main`
  padding: 0 10px;
`;

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("helmet.contact.title")}</title>
        <meta name="description" content={t("helmet.contact.description")} />
        <meta name="keywords" content={t("helmet.contact.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/contact" />
      </Helmet>
      <Header
        title={t("pages.contact.title")}
        subtitle={t("pages.contact.subtitle")}
        imageName="contact"
      />
      <MainStyle>
        <FormContact />
      </MainStyle>
    </>
  );
};

export default Contact;
