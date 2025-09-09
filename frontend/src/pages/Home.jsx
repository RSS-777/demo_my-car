import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { CardInfoPay } from "../components/CardInfoPay";
import { ButtonLink } from "../components/ButtonLink";
import { ContentText } from "../components/ContentText";
import { gettingPrice } from "../api/priceApi";
import { setVisitStatistics } from "../api/statisticsApi";
import { useTranslation } from "react-i18next";
import { darkTheme } from "../styles/theme";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import garageImage from "../assets/images/home/garage.jpg";

const SectionInfoPayStyle = styled.section`
  position: relative;
  padding: 40px 25px;
  text-align: center;
  background-image: url(${garageImage});
  background-attachment: fixed;
  background-size: cover;
  background-position: 44% 50%;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.pages.home.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    background-image: radial-gradient(
      transparent,
      ${({ theme }) => theme.pages.home.after.backgroundImage}
    );
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  h2 {
    color: ${({ theme }) => theme.pages.home.h2};
    position: relative;
    z-index: 3;
    margin: 20px;
  }

  > p {
    position: relative;
    z-index: 3;
    color: ${({ theme }) =>
      theme === darkTheme
        ? theme.pages.home.p.textIsDark
        : theme.pages.home.p.text};
  }

  > div {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: space-evenly;
    gap: 30px;

    @media (max-width: 900px) {
      flex-wrap: wrap;
    }
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const [dataPrice, setDataPrice] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await gettingPrice(t);
      if (response.success) {
        setDataPrice(response.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      setVisitStatistics(t);
      sessionStorage.setItem("isLoggedIn", true);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("helmet.home.title")}</title>
        <meta name="description" content={t("helmet.home.description")} />
        <meta name="keywords" content={t("helmet.home.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/" />
      </Helmet>
      <Header h1={t("pages.home.header.h1")} h3={t("pages.home.header.h3")}>
        <ButtonLink to="/service">{t("pages.home.header.button")}</ButtonLink>
      </Header>
      <main>
        <ContentText
          h4={t("pages.home.contentText.h4")}
          p={t("pages.home.contentText.p")}
          p2={t("pages.home.contentText.p2")}
          li1={t("pages.home.contentText.ul.li1")}
          li2={t("pages.home.contentText.ul.li2")}
          li3={t("pages.home.contentText.ul.li3")}
          li4={t("pages.home.contentText.ul.li4")}
          li5={t("pages.home.contentText.ul.li5")}
        />
        <SectionInfoPayStyle>
          <h2>{t("pages.home.sectionInfoPay.h2")}</h2>
          <p>{t("pages.home.sectionInfoPay.p")}</p>
          <div>
            <CardInfoPay
              tariff="basic"
              h4={t("pages.home.cardInfoPayBasses.h4")}
              p={t("pages.home.cardInfoPayBasses.p")}
              price={
                dataPrice.length > 0 &&
                (dataPrice.find((item) => item.tariff === "basic")?.price === 0
                  ? t("FormChangeTariff.blockTextStyle.free")
                  : `${
                      dataPrice.find((item) => item.tariff === "basic")?.price
                    }${t("pages.home.cardInfoPayBasses.price")}`)
              }
            />
            <CardInfoPay
              tariff="family"
              isPaid={true}
              h4={t("pages.home.cardInfoPayFamily.h4")}
              p={t("pages.home.cardInfoPayFamily.p")}
              price={
                dataPrice.length > 0 &&
                `${
                  dataPrice.find((item) => item.tariff === "family")?.price
                }${t("pages.home.cardInfoPayFamily.price")}`
              }
            />
            <CardInfoPay
              tariff="business"
              isPaid={true}
              h4={t("pages.home.cardInfoPayBusiness.h4")}
              p={t("pages.home.cardInfoPayBusiness.p")}
              price={
                dataPrice.length > 0 &&
                `${
                  dataPrice.find((item) => item.tariff === "business")?.price
                }${t("pages.home.cardInfoPayBusiness.price")}`
              }
            />
          </div>
        </SectionInfoPayStyle>
      </main>
    </>
  );
};

export default Home;
