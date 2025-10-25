import styled from "styled-components";
import { gettingPrice } from "../api/priceApi";
import { useEffect, useState, useRef, useMemo } from "react";
import { CardInfoPay } from "../components/CardInfoPay";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getPaymentActive } from "../api/paymentApi";

const SectionStyle = styled.section`
  padding: 20px 25px;
  text-align: center;

  h2 {
    margin: 20px;
    color: ${({ theme }) => theme.colors.text.heading2};
  }

  > div {
    display: flex;
    justify-content: space-evenly;
    gap: 30px;
    margin-top: 40px;

    @media (max-width: 900px) {
      flex-wrap: wrap;
    }
  }
`;

const TariffsSection = () => {
  const [dataPrice, setDataPrice] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const lang = useSelector((state) => state.lang.value);
  const cachePrice = useRef(null);
  const { t } = useTranslation();

  const fetchDataPrice = async () => {
    if (cachePrice.current) return;

    const response = await gettingPrice(t);
    if (response.success) {
      cachePrice.current = response.data;
      setDataPrice(cachePrice.current);
    }
  };

  const fetchDataActive = async () => {
    const response = await getPaymentActive(lang, t);
    if (response.success) {
      setIsActive(response.data.is_active === 1);
    }
  };

  useEffect(() => {
    fetchDataPrice();
    fetchDataActive();
  }, [lang]);

  const prices = useMemo(() => {
    const basic = dataPrice.find((item) => item.tariff === "basic")?.price;
    const family = dataPrice.find((item) => item.tariff === "family")?.price;
    const business = dataPrice.find(
      (item) => item.tariff === "business"
    )?.price;
    return { basic, family, business };
  }, [dataPrice]);

  return (
    <SectionStyle>
      <h2>{t("pages.home.tariffsSection.title")}</h2>
      <p>{t("pages.home.tariffsSection.text")}</p>
      <div>
        <CardInfoPay
          tariff="basic"
          h3={t("pages.home.tariffsSection.cards.card1.title")}
          p={t("pages.home.tariffsSection.cards.card1.text")}
          price={
            prices.basic > 0
              ? `${prices.basic}${t(
                  "pages.home.tariffsSection.cards.card1.price"
                )}`
              : prices.basic === 0
              ? t("FormChangeTariff.blockTextStyle.free")
              : "-"
          }
          isActive={isActive}
        />
        <CardInfoPay
          tariff="family"
          isPaid={true}
          h3={t("pages.home.tariffsSection.cards.card2.title")}
          p={t("pages.home.tariffsSection.cards.card2.text")}
          price={
            prices.family > 0
              ? `${prices.family}${t(
                  "pages.home.tariffsSection.cards.card2.price"
                )}`
              : "-"
          }
          isActive={isActive}
        />
        <CardInfoPay
          tariff="business"
          isPaid={true}
          h3={t("pages.home.tariffsSection.cards.card3.title")}
          p={t("pages.home.tariffsSection.cards.card3.text")}
          price={
            prices.business > 0
              ? `${prices.business}${t(
                  "pages.home.tariffsSection.cards.card3.price"
                )}`
              : "-"
          }
          isActive={isActive}
        />
      </div>
    </SectionStyle>
  );
};

export default TariffsSection;
