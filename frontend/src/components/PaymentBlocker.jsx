import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlockStatusMessage } from "../api/paymentApi";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import dolarImage from "../assets/images/payment/dolar.webp";

const ContainerStyle = styled.div`
  background-image: url(${dolarImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  border-radius: 8px;
  margin: 20px auto 25px;

  p {
    font-size: 18px;
    color: ${({theme}) => theme.colors.text.fixed};
  }
`;

export const PaymentBlocker = () => {
  const [dataMessage, setDataMessage] = useState({});
  const lang = useSelector((state) => state.lang.value);
  const { t } = useTranslation();

  useEffect(() => {
    const getFetchData = async () => {
      const response = await getBlockStatusMessage(t);

      if (response.success) {
        setDataMessage(response.data);
      }
    };
    getFetchData();
  }, []);

  return (
    <ContainerStyle>
      <p>{dataMessage?.[`message_text_${lang}`]}</p>
    </ContainerStyle>
  );
};
