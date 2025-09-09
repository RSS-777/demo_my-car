import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { cancelTariffChangeRequest } from "../api/tariffApi";
import { ButtonGarage } from "./ButtonGarage";
import { PaymentBlocker } from "./PaymentBlocker";
import { getInfoPayment } from "../api/paymentApi";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ContainerStyle = styled.div`
   padding: 0;

    hr {
        color: ${({ theme }) => theme.order.hr};
    }
`;

const BlockTitleStyle = styled.div`
    h2 {
        color: ${({ theme }) => theme.order.blockTitle.h2};
        font-size: clamp(24px, 5vw, 38px);
        text-align: center;
        margin: 10px auto;
    }

    >div {
        width: fit-content;
        display: flex;
        flex-direction: column;
        margin: auto;

        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            p {
                margin: 0;
                font-size: clamp(14px, 4vw, 16px);
                color: ${({ theme }) => theme.order.blockTitle.p};
            }

            >span {
                color: ${({ theme }) => theme.order.blockTitle.span};
                font-size: clamp(14px, 4vw, 16px);
                margin-left: 10px;
            }
        }
    }
`;

const BlockPayStyle = styled.div`
    max-width: 550px;
    margin: auto;

    h4 {
        color: ${({ theme }) => theme.order.blockPay.h4};
        font-size: clamp(18px, 5vw, 22px);
    }

    ul {
        margin: 0;
        padding-left: 0;

        li {
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            font-size: clamp(14px, 2vw, 16px);
            color: ${({theme}) => theme.order.blockPay.li.text};

            span {
                color: ${({ theme }) => theme.order.blockPay.li.span};
                margin-left: 6px;
                width: 350px;
                text-align: left;
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
       font-size: clamp(14px, 2vw, 16px);
       margin: 0;
    }
`;

const BlockButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px auto 0;
    width: 100%;
    gap: 15px;

    button {
        width: clamp(100px, 5vw, 150px);
        min-width: 0;
        height: 30px;
        padding: 0;
        font-size: clamp(14px, 1vw, 18px);
    }
`;

const Order = ({ token, userTariff, tariffChange, generateCodeRandom, paymentNumbMonths, amountDue, setUpdateNeeded, handleCloseChange }) => {
    const [currentTariff, setCurrentTariff] = useState('')
    const [selectTariff, setSelectTariff] = useState('')
    const lang = useSelector((state) => state.lang.value)
    const [paymentInfo, setPaymentInfo] = useState()
    const { t } = useTranslation()

    useEffect(() => {
        if (tariffChange === 'basic') setSelectTariff(t("pages.home.cardInfoPayBasses.h4"))
        if (tariffChange === 'family') setSelectTariff(t("pages.home.cardInfoPayFamily.h4"))
        if (tariffChange === 'business') setSelectTariff(t("pages.home.cardInfoPayBusiness.h4"))
    }, [tariffChange, token, lang])

    useEffect(() => {
        if (userTariff === 'basic') setCurrentTariff(t("pages.home.cardInfoPayBasses.h4"))
        if (userTariff === 'family') setCurrentTariff(t("pages.home.cardInfoPayFamily.h4"))
        if (userTariff === 'business') setCurrentTariff(t("pages.home.cardInfoPayBusiness.h4"))
    }, [userTariff, token, lang])

    useEffect(() => {
        const getInformationPayment = async () => {
            const response = await getInfoPayment(lang, t)
            if (response.success) {
                setPaymentInfo(response.data)
            }
        }
        getInformationPayment()
    }, [lang])

    const handleCancelRequestTariff = async () => {
        const response = await cancelTariffChangeRequest(token, generateCodeRandom, t)

        if (response.success) {
            setUpdateNeeded(prev => !prev)
            handleCloseChange()
        }
    }

    return (
        <ContainerStyle>
            <BlockTitleStyle>
                <h2>{t("pages.userDashboard.order.blockTitle.h2")}</h2>
                <div>
                    <div>
                        <p>{t("pages.userDashboard.order.blockTitle.pTariff")}</p>
                        <span>{currentTariff}</span>
                    </div>
                    <div>
                        <p>{t("pages.userDashboard.order.blockTitle.pChangeTariff")}</p>
                        <span>{selectTariff}</span>
                    </div>
                </div>
            </BlockTitleStyle>
            <hr />
            <BlockPayStyle>
                {
                    <>
                        <h4>{t("pages.userDashboard.order.blockPay.h4")}</h4>
                        {paymentInfo?.is_active === 0 ? (
                            <PaymentBlocker />
                        ) : (
                            <ul>
                                <li>{t("pages.userDashboard.order.blockPay.recipient")}<span>{paymentInfo?.payee_details}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.iban")}<span>{paymentInfo?.iban}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.edrpou")}<span>{paymentInfo?.edrpou}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.purpose")}<span>{paymentInfo?.payment_purpose}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.code")}<span>{generateCodeRandom}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.period")} <span>{paymentNumbMonths} {paymentNumbMonths === 1 ? t("pages.userDashboard.order.blockPay.monthDay.1") : (paymentNumbMonths >= 2 && paymentNumbMonths <= 4 ? t("pages.userDashboard.order.blockPay.monthDay.2") : t("pages.userDashboard.order.blockPay.monthDay.5"))}</span></li>
                                <li>{t("pages.userDashboard.order.blockPay.amountDue")} <span>{amountDue}$</span></li>
                            </ul>
                        )}
                    </>
                }
            </BlockPayStyle>
            <hr />
            <BlockInfoStyle>
                <p>{t("pages.userDashboard.order.blockInfo.row.1")}
                    <br />{t("pages.userDashboard.order.blockInfo.row.2")}
                    <br />{t("pages.userDashboard.order.blockInfo.row.3")}
                </p>
                <hr />
                <p>
                    {t("pages.userDashboard.order.blockInfo.row.4")}
                </p>
            </BlockInfoStyle>
            <BlockButtonStyle>
                <ButtonGarage
                    onClick={handleCloseChange}
                >
                    {t("pages.userDashboard.button.cancel")}
                </ButtonGarage>
                <ButtonGarage
                    onClick={handleCancelRequestTariff}
                >
                    {t("pages.userDashboard.order.button")}
                </ButtonGarage>
            </BlockButtonStyle>
        </ContainerStyle>
    )
};

export default Order;