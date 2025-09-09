import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "./ButtonForm";
import { getInfoPayment, setInfoPayment } from "../api/paymentApi";
import styled from "styled-components";

const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center:
    position: relative;
    width: 100%;
    max-width: 100%; 

    h5 {
        text-align: center;
        margin: 10px;
        color: ${({ theme }) => theme.changePaymentAdmin.h5};
    }

    @media (max-width: 992px) {
         margin-top: 20px;
    }
`;

const FormStyle = styled.form`
    max-width: 480px;
    margin: auto;
   
    >p {
        margin-top: 0;
        font-size: 14px;
        color: ${({ theme }) => theme.changePaymentAdmin.form.text};
    }
`;

const BlockFildStyle = styled.div`
    div:first-of-type input {
        width: 30px;
        background: ${({ theme }) => theme.changePaymentAdmin.blockField.background};
        cursor: default;
        color: ${({ theme }) => theme.changePaymentAdmin.blockField.text};
        text-align: center;
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        label {
            color: ${({ theme }) => theme.changePaymentAdmin.blockField.label};
        }

        input {
            border-radius: 8px;
            padding: 2px 5px;
            width: 65%;
            outline-style: none;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.changePaymentAdmin.blockField.shadow};
        }

        input[type="checkbox"]  {
            box-shadow: none;
        }

        @media (max-width: 580px) {
            flex-direction: column;
            align-items: center;

            label {
                margin-bottom: 5px;
            }

            input {
                width: 90%;
            }
        }
    }
`;

const BlockButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        z-index: 1;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: clamp(14px, 3vw, 18px);
        min-width: 0;
    }
`;

const BlockErrorStyle = styled.div`
    color: ${({ theme }) => theme.changePaymentAdmin.blockError.text};
    font-size: 12px;
    height: 16px;
    line-height: 16px;

    span {
       margin: auto;
    }
`;

const ChangePaymentAdmin = () => {
    const [dataPayment, setDataPayment] = useState([])
    const [statusMessage, setStatusMessage] = useState('')
    const tokenAdmin = useSelector((state) => state.admin.value)
    const lang = useSelector((state) => state.lang.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getInfoPayment(lang, t)
            if (response.success) {
                setDataPayment(response.data)
            }
        }

        fetchData()
    }, [lang]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setDataPayment((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        const response = await setInfoPayment(tokenAdmin, dataPayment, t)
        setStatusMessage(response.message);
        setTimeout(() => setStatusMessage(''), 2000)
    };

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.ul.li4")}</h5>
            <FormStyle onSubmit={handleSubmit}>
                <p>
                    {t("pages.admin.changePayment.strongText.text1")}<br />
                    {t("pages.admin.changePayment.strongText.text2")}
                </p>
                <BlockFildStyle>
                    {dataPayment ? (
                        <>
                            <div>
                                <label htmlFor="change-payment-lang">{t("pages.admin.changePayment.lang")}</label>
                                <input
                                    id="change-payment-lang"
                                    type="text"
                                    name="lang"
                                    value={dataPayment?.lang}
                                    onChange={handleChange}
                                    readOnly
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="change-payment-edrpou">{t("pages.admin.changePayment.edrpou")}</label>
                                <input
                                    id="change-payment-edrpou"
                                    type="number"
                                    name="edrpou"
                                    value={dataPayment?.edrpou}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="change-payment-iban">{t("pages.admin.changePayment.iban")}</label>
                                <input
                                    id="change-payment-iban"
                                    type="text"
                                    name="iban"
                                    value={dataPayment?.iban}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="change-payment-detailPayee"> {t("pages.admin.changePayment.detailPayee")}</label>
                                <input
                                    id="change-payment-detailPayee"
                                    type="text"
                                    name="payee_details"
                                    value={dataPayment?.payee_details}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="change-payment-purpose">{t("pages.admin.changePayment.purpose")}</label>
                                <input
                                    id="change-payment-purpose"
                                    type="text"
                                    name="payment_purpose"
                                    value={dataPayment?.payment_purpose}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label htmlFor="change-payment-active">{t("pages.admin.changePayment.active")}</label>
                                <input
                                    id="change-payment-active"
                                    type="checkbox"
                                    name="is_active"
                                    checked={dataPayment?.is_active}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        </>
                    ) : (
                        <p>{t("pages.admin.changePayment.download")}</p>
                    )
                    }
                    <BlockErrorStyle><span>{statusMessage}</span></BlockErrorStyle>
                </BlockFildStyle>
                <BlockButtonStyle>
                    <ButtonForm>{t("pages.admin.changePayment.button")}</ButtonForm>
                </BlockButtonStyle>
            </FormStyle>
        </ContainerStyle>
    )
};

export default ChangePaymentAdmin;