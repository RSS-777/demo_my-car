import { useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonLink } from "./ButtonLink";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getPaymentActive } from "../api/paymentApi";

const BlockCardStyle = styled.div`
  position: relative;
  box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.cardInfoPay.shadow};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 280px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.cardInfoPay.background};

  h4 {
    color: ${({ theme }) => theme.cardInfoPay.h4};
  }

  p {
    font-size: 16px;
    margin-top: 10px;
    color: ${({ theme }) => theme.cardInfoPay.p};
  }

  div:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      text-align: center;
      line-height: 100px;
      width: 100px;
      height: 100px;
      font-size: 14px;
      margin: 0 auto 10px;
      border-radius: 50%;
      background: ${({ theme }) => theme.cardInfoPay.div.background};
      color: ${({ theme }) => theme.cardInfoPay.div.text};
    }

    hr {
      width: 100px;
      margin: 10px auto;
    }

    a {
      margin-bottom: 0;
      bottom: 0;
      padding: 5px 20px;
      max-width: 120px;
      margin: 0 auto;
    }
  }
`;

const HiddenContentStyle = styled.div`
  display: ${({ $disabled }) => ($disabled ? "block" : "none")};
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.cardInfoPay.hiddenContent.background : "none"};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  border-radius: inherit;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    font-size: 22px;
    color: ${({ theme }) => theme.cardInfoPay.hiddenContent.span.text};
  }
`;

export const CardInfoPay = ({ h4, p, price, isPaid, tariff }) => {
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);
  const lang = useSelector((state) => state.lang.value);
  const tariffUser = useSelector((state) => state.user.tariff);
  const redirectionPath = token ? "/user" : "/login";
  const isSelected = tariffUser === tariff;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPaymentActive(lang, t);
      if (response.success) {
        if (response.data.is_active === 1) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };
    fetchData();
  }, [lang]);

  return (
    <BlockCardStyle>
      <h4>{h4}</h4>
      <p>{p}</p>
      <div>
        <hr />
        <div>{price}</div>
        <ButtonLink
          to={redirectionPath}
          className={isSelected ? "activeUserTariff" : ""}
        >
          {isSelected ? t("cardInfoPay.buttonActive") : t("cardInfoPay.button")}
        </ButtonLink>
      </div>
      <HiddenContentStyle $disabled={!isActive && isPaid}>
        <span>{t("cardInfoPay.spanNotActive")}</span>
      </HiddenContentStyle>
    </BlockCardStyle>
  );
};
