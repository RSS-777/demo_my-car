import { lazy, Suspense } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
const ContentNotUserCar = lazy(() => import("../components/ContentNotUserCar"));
const ContentUserCar = lazy(() => import("../components/ContentUserCar"));
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const LoadingMessageStyle = styled.div`
  text-align: center;
  color: black;
`;

const Service = () => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);

  return (
    <>
      <Helmet>
        <title>{t("helmet.service.title")}</title>
        <meta name="description" content={t("helmet.service.description")} />
        <meta name="keywords" content={t("helmet.service.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/service" />
      </Helmet>
      <Header
        h1={t("pages.service.title.h1")}
        h3={t("pages.service.title.h3")}
      />
      <Suspense
        fallback={<LoadingMessageStyle>loading...</LoadingMessageStyle>}
      >
        {token ? <ContentUserCar /> : <ContentNotUserCar />}
      </Suspense>
    </>
  );
};

export default Service;
