import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { gettingPrice, changePrice } from "../api/priceApi";
import { ButtonForm } from "./ButtonForm";
import styled from "styled-components";

const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h5 {
       text-align: center;
       margin: 10px;
       color: ${({ theme }) => theme.changeCostAdmin.h5};
    }

    @media (max-width: 992px) {
        margin-top: 20px;
    }
`;

const FormStyle = styled.form`
    max-width: 480px;
    width: 100%;
    margin: auto;
    padding: 20px 10px;
    border-radius: 8px;
`;

const BlockFildStyle = styled.div`
    div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        label {
            color: ${({ theme }) => theme.changeCostAdmin.label};
        }

        input {
            border-radius: 8px;
            padding: 2px 5px;
            outline-style: none;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.changeCostAdmin.shadow};
        }

        @media (max-width: 580px) {
            flex-direction: column;
            align-items: center;

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
    color: ${({ theme }) => theme.changeCostAdmin.blockError.text};
    font-size: 12px;
    height: 16px;
    line-height: 16px;

    span {
       margin: auto;
    }
`;

const ChangeCostAdmin = () => {
    const [dataPrice, setDataPrice] = useState([])
    const [statusMessage, setStatusMessage] = useState('')
    const tokenAdmin = useSelector((state) => state.admin.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await gettingPrice(t)
            if (response.success) {
                setDataPrice(response.data)
            }
        }

        fetchData()
    }, []);

    const handleInputChange = (index, price, value) => {
        const validValue = value === "" ? "" : Number(value)
        const updataTariffs = [...dataPrice]
        updataTariffs[index][price] = isNaN(validValue) ? "" : validValue
        setDataPrice(updataTariffs)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('')

        const hasEmptyFields = dataPrice.some((item) => item.price === null || item.price === '');

        if (hasEmptyFields) {
            setStatusMessage(t("pages.admin.changeTariff.required"));
            return;
        }

        const response = await changePrice(tokenAdmin, dataPrice, t)
        setStatusMessage(response.success ? t("pages.admin.changeTariff.success") : t("pages.admin.changeTariff.failed"));
        setTimeout(() => { setStatusMessage('') }, 2000)
    };

    const nameTariff = {
        basic: t("FormChangeTariff.blockTextStyle.p.basic.tariff"),
        family: t("FormChangeTariff.blockTextStyle.p.family.tariff"),
        business: t("FormChangeTariff.blockTextStyle.p.business.tariff")
    }

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.ul.li3")}</h5>
            <FormStyle onSubmit={handleSubmit}>
                <BlockFildStyle>
                    {dataPrice?.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={`change-cost-tariff-${index}`}>{nameTariff[item.tariff]}</label>
                            <input
                                id={`change-cost-tariff-${index}`}
                                type="text"
                                value={item.price}
                                onChange={(e) =>
                                    handleInputChange(index, 'price', e.target.value)
                                }
                            />
                        </div>

                    ))}
                    <BlockErrorStyle><span>{statusMessage}</span></BlockErrorStyle>
                </BlockFildStyle>
                <BlockButtonStyle>
                    <ButtonForm>{t("pages.admin.changeTariff.button")}</ButtonForm>
                </BlockButtonStyle>
            </FormStyle>
        </ContainerStyle>
    )
};

export default ChangeCostAdmin;