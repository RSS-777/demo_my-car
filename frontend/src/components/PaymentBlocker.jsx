import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlockStatusMessage } from "../api/paymentApi";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import dolarImage from '../assets/images/advertising/dolar.jpg';

const ContainerStyle = styled.div`
    background-image: url(${dolarImage});
    background-position: center;
    background-size: cover;
    min-height: 150px;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.paymentBlocker.shadow};
    margin: 10px auto;

    p {
        font-size: clamp(14px, 2vw, 16px);
    }
`;

export const PaymentBlocker = () => {
    const [dataMessage, setDataMessage] = useState({})
    const lang = useSelector((state) => state.lang.value)
    const { t } = useTranslation()

    useEffect(() => {
        const getFetchData = async () => {
            const response = await getBlockStatusMessage(t)

            if (response.success) {
                setDataMessage(response.data)
            }
        }
        getFetchData()
    }, [])

    return (
        <ContainerStyle>
            <p>{dataMessage?.[`message_text_${lang}`]}</p>
        </ContainerStyle>
    )
};