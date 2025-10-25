import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { cancelTariffChangeRequest } from "../api/tariffApi";
import { ButtonCard } from "./ButtonCard";
import { PaymentBlocker } from "./PaymentBlocker";
import { getInfoPayment } from "../api/paymentApi";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ContainerStyle = styled.div`
  padding: 0;
  text-align: center;
`;

const BlockPayStyle = styled.div`
  max-width: 550px;
  margin: auto;

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
  }

  ul {
    margin: 0 auto 15px;
    padding-left: 0;

    li {
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      color: ${({ theme }) => theme.colors.form.label};

      span {
        margin-left: 6px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text.default};
      }

      @media (max-width: 678px) {
        flex-direction: column;
        margin-top: 6px;
        align-items: center;

        span {
          width: auto;
          margin: auto;
          text-align: center;
        }
      }
    }
  }
`;

const BlockInfoStyle = styled.div`
  p {
    text-align: left;
  }
`;

const Order = ({
  token,
  generateCodeRandom,
  paymentNumbMonths,
  amountDue,
  setUpdateNeeded,
  setActiveTab,
}) => {
  const lang = useSelector((state) => state.lang.value);
  const [paymentInfo, setPaymentInfo] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const getInformationPayment = async () => {
      const response = await getInfoPayment(lang, t);
      if (response.success) {
        setPaymentInfo(response.data);
      }
    };
    getInformationPayment();
  }, [lang]);

  const handleCancelRequestTariff = async () => {
    const response = await cancelTariffChangeRequest(
      token,
      generateCodeRandom,
      t
    );

    if (response.success) {
      setUpdateNeeded(true);
      setActiveTab("changeTariff");
    }
  };

  return (
    <ContainerStyle>
      <BlockPayStyle>
        <h2>{t("pages.userDashboard.order.blockPay.title")}</h2>
        {paymentInfo?.is_active === 0 ? (
          <PaymentBlocker />
        ) : (
          <ul>
            <li>
              {t("pages.userDashboard.order.blockPay.recipient")}
              <span>{paymentInfo?.payee_details}</span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.iban")}
              <span>{paymentInfo?.iban}</span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.edrpou")}
              <span>{paymentInfo?.edrpou}</span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.purpose")}
              <span>{paymentInfo?.payment_purpose}</span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.code")}
              <span>{generateCodeRandom}</span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.period")}{" "}
              <span>
                {paymentNumbMonths}{" "}
                {paymentNumbMonths === 1
                  ? t("pages.userDashboard.order.blockPay.monthDay.1")
                  : paymentNumbMonths >= 2 && paymentNumbMonths <= 4
                  ? t("pages.userDashboard.order.blockPay.monthDay.2")
                  : t("pages.userDashboard.order.blockPay.monthDay.5")}
              </span>
            </li>
            <li>
              {t("pages.userDashboard.order.blockPay.amountDue")}{" "}
              <span>{amountDue}$</span>
            </li>
          </ul>
        )}
      </BlockPayStyle>
      <hr />
      <BlockInfoStyle>
        <p>
          {t("pages.userDashboard.order.blockInfo.row.1")}
          <br />
          {t("pages.userDashboard.order.blockInfo.row.2")}
        </p>
        <p>{t("pages.userDashboard.order.blockInfo.row.3")}</p>
      </BlockInfoStyle>
      <ButtonCard onClick={handleCancelRequestTariff}>
        {t("pages.userDashboard.order.button")}
      </ButtonCard>
    </ContainerStyle>
  );
};

export default Order;
