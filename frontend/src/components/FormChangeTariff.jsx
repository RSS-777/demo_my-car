import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "./ButtonForm";
import { StatusMessage } from "./StatusMessage";
import { gettingPrice } from "../api/priceApi";
import { requestTariffChange } from "../api/tariffApi";
import { generateCode } from "../utils/generateCode";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${({ theme }) => theme.formChangeTariff.h2};
    font-size: clamp(24px, 5vw, 38px);
    text-align: center;
    margin: 10px auto;
  }

  > p:last-child {
    bottom: 5px;
  }
`;

const BlockTextStyle = styled.div`
  h5 {
    padding: 0;
    font-size: clamp(15px, 3vw, 18px);
    color: ${({ theme }) => theme.formChangeTariff.blockText.h5};
  }

  p {
    font-size: clamp(14px, 2vw, 16px);
    margin: 5px;

    > em {
      color: ${({ theme }) => theme.formChangeTariff.blockText.p.em};
    }

    i {
      color: ${({ theme }) => theme.formChangeTariff.blockText.p.i};
    }
  }

  span {
    color: ${({ theme }) => theme.formChangeTariff.blockText.span};
  }
`;

const ContainerFieldStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin: 10px auto;
`;

const BlockFildStyle = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    label {
      font-size: 16px;
      color: ${({ theme }) => theme.formChangeTariff.blockField.label};
    }

    select {
      max-width: 180px;
      width: 100%;
      border-radius: 8px;
      padding: 3px 5px;
      text-align: center;
      font-size: 14px;
      outline-style: none;
      border: none;
      box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formChangeTariff.blockField.select.shadow};
    }

    @media (max-width: 678px) {
      flex-direction: column;
      align-items: center;

      label {
        margin: 0 0 5px 0;
      }
    }
  }

  div:last-child {
    font-size: 16px;
    color: ${({ theme }) => theme.formChangeTariff.blockField.div.text};

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.formChangeTariff.blockField.div.span};
      width: 100%;
      max-width: 180px;
      text-align: left;

      i {
        color: ${({ theme }) => theme.formChangeTariff.blockField.div.i};
      }

      @media (max-width: 678px) {
        text-align: center;
        margin-top: 5px;
      }
    }
  }
`;
const BlockButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 15px;
  padding: 5px;
  margin-bottom: 5px;

  button {
    width: clamp(100px, 5vw, 150px);
    min-width: 0;
    height: 30px;
    padding: 0;
    font-size: clamp(14px, 1vw, 18px);
  }
`;

const FormChangeTariff = ({
  token,
  tariff,
  orderCode,
  setUpdateNeeded,
  handleOrder,
  handleCloseChange,
}) => {
  const [userTariff, setUserTarif] = useState("");
  const [selectTariff, setSelectTariff] = useState("family");
  const [paymentMonths, setPaymentMonths] = useState(1);
  const [newAmountDue, setNewAmountDue] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [dataPrice, setDataPrice] = useState([]);
  const [generateCodeRandom, setGenerateCodeRandom] = useState("");
  const lang = useSelector((state) => state.lang.value);
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

  const setNameforUserTariff = () => {
    if (tariff === "basic") setUserTarif(t("pages.home.cardInfoPayBasses.h4"));
    if (tariff === "family") setUserTarif(t("pages.home.cardInfoPayFamily.h4"));
    if (tariff === "business")
      setUserTarif(t("pages.home.cardInfoPayBusiness.h4"));
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
    setNameforUserTariff();
  }, [tariff, lang]);

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
      setUpdateNeeded((prev) => !prev);
      handleOrder();
    } else {
      setMessageError(response.message);
    }
  };

  return (
    <FormStyle onSubmit={onSubmit}>
      <h2>{t("FormChangeTariff.h2")}</h2>
      <BlockTextStyle>
        <h5>
          {t("FormChangeTariff.blockTextStyle.h4")} <span>{userTariff}</span>
        </h5>
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
                  }${t("pages.home.cardInfoPayBasses.price")}`)}
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
                "pages.home.cardInfoPayFamily.price"
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
              }${t("pages.home.cardInfoPayBusiness.price")}`}
          </i>
        </p>
      </BlockTextStyle>
      <ContainerFieldStyle>
        <BlockFildStyle>
          <div>
            <label htmlFor="tariff">
              {t("FormChangeTariff.blockFieldStyle.label.tariff")}
            </label>
            <select
              name="tariff"
              value={selectTariff}
              id="tariff"
              onChange={(e) => setSelectTariff(e.target.value)}
            >
              <option value="family">
                {t("FormChangeTariff.blockTextStyle.p.family.tariff")}
              </option>
              <option value="business">
                {t("FormChangeTariff.blockTextStyle.p.business.tariff")}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="payment-months">
              {t("FormChangeTariff.blockFieldStyle.label.paymentMonths")}
            </label>
            <select
              name="paymentMonths"
              id="payment-months"
              value={paymentMonths}
              onChange={(e) => setPaymentMonths(Number(e.target.value))}
            >
              <option value="1">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.1")}
              </option>
              <option value="2">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.2")}
              </option>
              <option value="3">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.3")}
              </option>
              <option value="4">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.4")}
              </option>
              <option value="5">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.5")}
              </option>
              <option value="6">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.6")}
              </option>
              <option value="7">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.7")}
              </option>
              <option value="8">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.8")}
              </option>
              <option value="9">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.9")}
              </option>
              <option value="10">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.10")}
              </option>
              <option value="11">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.11")}
              </option>
              <option value="12">
                {t("FormChangeTariff.blockFieldStyle.optionMonths.12")}
              </option>
            </select>
          </div>
          <div>
            {t("FormChangeTariff.blockTextStyle.p.price")}{" "}
            <span>
              {newAmountDue}
              <i>$</i>
            </span>
          </div>
        </BlockFildStyle>
        <BlockButtonStyle>
          <ButtonForm type="button" onClick={handleCloseChange}>
            {t("pages.userDashboard.button.cancel")}
          </ButtonForm>
          <ButtonForm type="submit">{t("FormChangeTariff.button")}</ButtonForm>
        </BlockButtonStyle>
      </ContainerFieldStyle>
      <StatusMessage>{messageError}</StatusMessage>
    </FormStyle>
  );
};

export default FormChangeTariff;
