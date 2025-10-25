import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { StatusMessage } from "./StatusMessage";
import { gettingPrice } from "../api/priceApi";
import { requestTariffChange } from "../api/tariffApi";
import { generateCode } from "../utils/generateCode";
import { SelectField } from "./SelectField";
import { getOptionMonth } from "../constants/optionsMonth";
import styled from "styled-components";

const BlockTextStyle = styled.div`
  p {

    > em {
      color: ${({ theme }) => theme.colors.text.static};
    }

    i {
      font-weight: 600;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text.heading3};
    font-weight: 500;
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  margin: 20px auto;

  select {
    min-width: 100px;
  }

  button {
    align-self: center;
  }

  @media (max-width: 580px) {
    label {
      margin: 0;
    }
  }
`;

const PriceStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: 580px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FormChangeTariff = ({ token, orderCode, setUpdateNeeded, setActiveTab }) => {
  const [selectTariff, setSelectTariff] = useState("family");
  const [paymentMonths, setPaymentMonths] = useState(1);
  const [newAmountDue, setNewAmountDue] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [dataPrice, setDataPrice] = useState([]);
  const [generateCodeRandom, setGenerateCodeRandom] = useState("");
  const { t } = useTranslation();

  const gettingPriceData = async () => {
    const response = await gettingPrice(t);
    if (response.success) {
      if (response.data) {
        setDataPrice(response.data);
      }
    }
  };

  const generateSetOrderCode = () => {
    const code = generateCode();
    if (code && !orderCode) {
      setGenerateCodeRandom(code);
    } else {
      setGenerateCodeRandom(orderCode);
    }
  };

  const setChangeAmountDue = () => {
    if (dataPrice.length > 0) {
      const result =
        dataPrice.find((item) => item.tariff === selectTariff)?.price *
        paymentMonths;
      setNewAmountDue(result || 0);
    }
  };

  const clearPaymentInfoForBasicTariff = () => {
    if (selectTariff === "basic") {
      setPaymentMonths(null);
      setNewAmountDue(null);
    }
  };

  useEffect(() => {
    gettingPriceData();
    generateSetOrderCode();
  }, []);

  useEffect(() => {
    clearPaymentInfoForBasicTariff();
    setChangeAmountDue();
  }, [paymentMonths, selectTariff, dataPrice]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await requestTariffChange(
      token,
      selectTariff,
      generateCodeRandom,
      paymentMonths,
      newAmountDue,
      t
    );

    if (response.success) {
      setMessageError("");
      setUpdateNeeded(true);
      setActiveTab("infoOrder")
    } else {
      setMessageError(response.message);
    }
  };

  return (
    <>
      <BlockTextStyle>
        <p>
          {t("FormChangeTariff.blockTextStyle.p.tariffWord")}{" "}
          <span>"{t("FormChangeTariff.blockTextStyle.p.basic.tariff")}"</span>{" "}
          {t("FormChangeTariff.blockTextStyle.p.basic.text")}
          <br />
          <em>{t("FormChangeTariff.blockTextStyle.p.price")}</em>{" "}
          <i>
            {dataPrice.length > 0 &&
              (dataPrice.find((item) => item.tariff === "basic")?.price === 0
                ? t("FormChangeTariff.blockTextStyle.free")
                : `${
                    dataPrice.find((item) => item.tariff === "basic")?.price
                  }${t("pages.home.tariffsSection.cards.card1.price")}`)}
          </i>
        </p>
        <p>
          {t("FormChangeTariff.blockTextStyle.p.tariffWord")}{" "}
          <span>"{t("FormChangeTariff.blockTextStyle.p.family.tariff")}"</span>{" "}
          {t("FormChangeTariff.blockTextStyle.p.family.text")}
          <br />
          <em>{t("FormChangeTariff.blockTextStyle.p.price")}</em>{" "}
          <i>
            {dataPrice.length > 0 &&
              `${dataPrice.find((item) => item.tariff === "family")?.price}${t(
                "pages.home.tariffsSection.cards.card2.price"
              )}`}
          </i>
        </p>
        <p>
          {t("FormChangeTariff.blockTextStyle.p.tariffWord")}{" "}
          <span>
            "{t("FormChangeTariff.blockTextStyle.p.business.tariff")}"
          </span>{" "}
          {t("FormChangeTariff.blockTextStyle.p.business.text")}
          <br />
          <em>{t("FormChangeTariff.blockTextStyle.p.price")}</em>{" "}
          <i>
            {dataPrice.length > 0 &&
              `${
                dataPrice.find((item) => item.tariff === "business")?.price
              }${t("pages.home.tariffsSection.cards.card3.price")}`}
          </i>
        </p>
      </BlockTextStyle>
      <FormStyle onSubmit={onSubmit}>
        <SelectField
          label={t("FormChangeTariff.blockFieldStyle.label.tariff")}
          value={selectTariff}
          id="tariff"
          onChange={(e) => setSelectTariff(e.target.value)}
          options={[
            {
              value: "family",
              label: t("FormChangeTariff.blockTextStyle.p.family.tariff"),
            },
            {
              value: "business",
              label: t("FormChangeTariff.blockTextStyle.p.business.tariff"),
            },
          ]}
        />
        <SelectField
          label={t("FormChangeTariff.blockFieldStyle.label.paymentMonths")}
          id="payment-months"
          value={paymentMonths}
          onChange={(e) => setPaymentMonths(Number(e.target.value))}
          options={getOptionMonth(t)}
        />
        <PriceStyle>
          {t("FormChangeTariff.blockTextStyle.p.price")}{" "}
          <span>
            {newAmountDue}
            <i>$</i>
          </span>
        </PriceStyle>
        <ButtonCard type="submit">{t("FormChangeTariff.button")}</ButtonCard>
        <StatusMessage>{messageError}</StatusMessage>
      </FormStyle>
    </>
  );
};

export default FormChangeTariff;
