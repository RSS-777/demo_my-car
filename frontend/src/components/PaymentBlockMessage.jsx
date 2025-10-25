import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { StatusMessage } from "./StatusMessage";
import { useSelector } from "react-redux";
import {
  getBlockStatusMessage,
  updateBlockStatusMessage,
} from "../api/paymentApi";
import { TextareaField } from "./TextareaField";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.mistake};
  }

  button {
    margin: 20px;
    align-self: center;
  }
`;

const BlockFieldStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PaymentBlockMessage = () => {
  const [messageFromServer, setMessageFromServer] = useState("");
  const [dataMessageBlock, setDataMessageBlock] = useState({});
  const tokenAdmin = useSelector((state) => state.admin.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBlockStatusMessage(t);

      if (response.success) {
        setDataMessageBlock(response.data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataMessageBlock((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageFromServer("");
    const response = await updateBlockStatusMessage(
      tokenAdmin,
      dataMessageBlock,
      t
    );
    setMessageFromServer(response.message);
    setTimeout(() => setMessageFromServer(""), 2000);
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <p>{t("pages.admin.paymentBlockMessage.strong")}</p>
        {dataMessageBlock && (
          <BlockFieldStyle>
            <TextareaField
              label={t("pages.admin.changeAdvertising.label.ua")}
              id="text-ua-payment-message"
              name="message_text_ua"
              value={dataMessageBlock?.message_text_ua}
              onChange={handleChange}
            />
            <TextareaField
              label={t("pages.admin.changeAdvertising.label.ru")}
              id="text-ru-payment-message"
              type="text"
              name="message_text_ru"
              value={dataMessageBlock?.message_text_ru}
              onChange={handleChange}
            />
            <TextareaField
              label={t("pages.admin.changeAdvertising.label.en")}
              id="text-en-payment-message"
              type="text"
              name="message_text_en"
              value={dataMessageBlock?.message_text_en}
              onChange={handleChange}
            />
          </BlockFieldStyle>
        )}
        <ButtonCard type="submit">
          {t("pages.admin.changePayment.button")}
        </ButtonCard>
      </FormStyle>
      <StatusMessage>{messageFromServer}</StatusMessage>
    </>
  );
};

export default PaymentBlockMessage;
