import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "./ButtonForm";
import { StatusMessage } from "./StatusMessage";
import { useSelector } from "react-redux";
import { getBlockStatusMessage, updateBlockStatusMessage } from "../api/paymentApi";
import styled from "styled-components";

const ContainerStyle = styled.div`
    h5 {
       text-align: center;
       margin: 10px;
       color: ${({ theme }) => theme.paymentBlock.h5};
    }

    @media (max-width: 992px) {
        margin-top: 20px;
    }
`;

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    color: ${({ theme }) => theme.paymentBlock.form.text};
    
    >p {
        text-align: center;
        padding-top: 0;
        margin-top: 0;
        color: ${({ theme }) => theme.paymentBlock.form.p};
        font-size: 14px;
    }

    span:last-child {
       padding: 0;
       font-size: 14px;
    }
    
    >button {
        margin: 10px auto 40px;
        z-index: 1;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: clamp(14px, 3vw, 18px);
        min-width: 0;
    }
`;

const BlockFieldStyle = styled.div`
    div {
        display: flex;
        flex-direction: column;

        label {
            color: ${({ theme }) => theme.paymentBlock.blockField.label};
        }

        textarea {
            width: 100%;
            height: 80px;
            overflow-y: auto;
            border-radius: 8px;
            resize: none;
            margin-bottom: 10px;
            padding: 5px;
            outline-style: none;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.paymentBlock.blockField.textarea.shadow};;
        }
    }
`;

const PaymentBlockMessage = () => {
    const [messageFromServer, setMessageFromServer] = useState('')
    const [dataMessageBlock, setDataMessageBlock] = useState({})
    const tokenAdmin = useSelector((state) => state.admin.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBlockStatusMessage(t)

            if (response.success) {
                setDataMessageBlock(response.data)
            }
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataMessageBlock((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageFromServer('');
        const response = await updateBlockStatusMessage(tokenAdmin, dataMessageBlock, t)
        setMessageFromServer(response.message);
        setTimeout(() => setMessageFromServer(''), 2000)
    };

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.paymentBlockMessage.h5")}</h5>
            <FormStyle onSubmit={handleSubmit}>
                <p>{t("pages.admin.paymentBlockMessage.strong")}</p>
                <BlockFieldStyle>
                    {dataMessageBlock ? (
                        <>
                            <div>
                                <label htmlFor="text-ua-payment-message">{t("pages.admin.changeAdvertising.label.ua")}</label>
                                <textarea
                                    id="text-ua-payment-message"
                                    type="text"
                                    name="message_text_ua"
                                    value={dataMessageBlock?.message_text_ua}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="text-ru-payment-message">{t("pages.admin.changeAdvertising.label.ru")}</label>
                                <textarea
                                    id="text-ru-payment-message"
                                    type="text"
                                    name="message_text_ru"
                                    value={dataMessageBlock?.message_text_ru}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="text-en-payment-message">{t("pages.admin.changeAdvertising.label.en")}</label>
                                <textarea
                                    id="text-en-payment-message"
                                    type="text"
                                    name="message_text_en"
                                    value={dataMessageBlock?.message_text_en}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <p>{t("pages.admin.changePayment.download")}</p>
                    )}
                </BlockFieldStyle>
                <ButtonForm>{t("pages.admin.changePayment.button")}</ButtonForm>
                <StatusMessage>{messageFromServer}</StatusMessage>
            </FormStyle >
        </ContainerStyle>
    )
};

export default PaymentBlockMessage;