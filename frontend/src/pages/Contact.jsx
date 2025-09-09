import { useTranslation } from "react-i18next";
import { FormContact } from '../components/FormContact'
import { Header } from "../components/Header";
import { Helmet } from 'react-helmet-async';

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
      <Header h1={t('pages.contact.h1')} h3={t('pages.contact.p')} />
      <main>
        <section>
          <FormContact />
        </section>
      </main>
    </>
  )
};

export default Contact;