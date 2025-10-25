import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { getInfoPayment, setInfoPayment } from "../api/paymentApi";
import { InputField } from "./InputField";
import { StatusMessage } from "./StatusMessage";
import styled from "styled-components";

const FormStyle = styled.form`
  max-width: 480px;
  margin: auto;
  text-align: center;

  > p {
    margin-top: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.mistake};
    text-align: left;
  }

  button {
    margin: 20px;
  }
`;

const BlockFildStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChangePaymentAdmin = () => {
  const [dataPayment, setDataPayment] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const tokenAdmin = useSelector((state) => state.admin.value);
  const lang = useSelector((state) => state.lang.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfoPayment(lang, t);
      if (response.success) {
        setDataPayment(response.data);
      }
    };

    fetchData();
  }, [lang]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setDataPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    const response = await setInfoPayment(tokenAdmin, dataPayment, t);
    setStatusMessage(response.message);
    setTimeout(() => setStatusMessage(""), 2000);
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <p>
          {t("pages.admin.changePayment.strongText.text1")}
          <br />
          {t("pages.admin.changePayment.strongText.text2")}
        </p>
        {dataPayment && (
          <BlockFildStyle>
            <InputField
              label={t("pages.admin.changePayment.lang")}
              id="change-payment-lang"
              type="text"
              name="lang"
              value={dataPayment?.lang}
              onChange={handleChange}
              readOnly
              autoComplete="off"
            />
            <InputField
              label={t("pages.admin.changePayment.edrpou")}
              id="change-payment-edrpou"
              type="text"
              name="edrpou"
              value={dataPayment?.edrpou}
              onChange={handleChange}
              autoComplete="off"
            />
            <InputField
              label={t("pages.admin.changePayment.iban")}
              id="change-payment-iban"
              type="text"
              name="iban"
              value={dataPayment?.iban}
              onChange={handleChange}
              autoComplete="off"
            />
            <InputField
              label={t("pages.admin.changePayment.detailPayee")}
              id="change-payment-detailPayee"
              type="text"
              name="payee_details"
              value={dataPayment?.payee_details}
              onChange={handleChange}
              autoComplete="off"
            />
            <InputField
              label={t("pages.admin.changePayment.purpose")}
              id="change-payment-purpose"
              type="text"
              name="payment_purpose"
              value={dataPayment?.payment_purpose}
              onChange={handleChange}
              autoComplete="off"
            />
            <InputField
              label={t("pages.admin.changePayment.active")}
              id="change-payment-active"
              type="checkbox"
              name="is_active"
              checked={dataPayment?.is_active}
              onChange={handleChange}
              autoComplete="off"
            />
          </BlockFildStyle>
        )}
        <ButtonCard type="submit">
          {t("pages.admin.changePayment.button")}
        </ButtonCard>
      </FormStyle>
      {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
    </>
  );
};

export default ChangePaymentAdmin;
