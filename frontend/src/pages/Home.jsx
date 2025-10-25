import { useEffect } from "react";
import { Header } from "../components/Header";
import { ButtonLink } from "../components/ButtonLink";
import { setVisitStatistics } from "../api/statisticsApi";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";

const FeaturesSection = lazy(() => import("../components/FeaturesSection"));
const TariffsSection = lazy(() => import("../components/TariffsSection"));

const Home = () => {
  const { t } = useTranslation();

  const sessionStatistic = async () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      sessionStorage.setItem("isLoggedIn", true);
      await setVisitStatistics(t);
    }
  };

  useEffect(() => {
    sessionStatistic();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("helmet.home.title")}</title>
        <meta name="description" content={t("helmet.home.description")} />
        <meta name="keywords" content={t("helmet.home.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/" />
      </Helmet>
      <Header
        title={t("pages.home.header.title")}
        subtitle={t("pages.home.header.subtitle")}
        imageName="car"
      >
        <ButtonLink to="/service" variant="header">
          {t("pages.home.header.button")}
        </ButtonLink>
      </Header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TariffsSection />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
