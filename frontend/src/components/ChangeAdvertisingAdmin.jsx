import { useState, useEffect } from "react";
import { getAdvertisingAll } from "../api/apiAdvertising";
import { ButtonForm } from "./ButtonForm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { updateAdvertising } from "../api/apiAdvertising";
import styled from "styled-components";

const ContainerStyle = styled.div`
    h5 {
       text-align: center;
       margin: 10px;
       color: ${({ theme }) => theme.changeAdvertisingAdmin.h5};
    }

    button {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin: 20px auto 10px;
        min-width: 0;
        z-index: 1;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: clamp(14px, 3vw, 18px);
    }

    @media (max-width: 992px) {
        margin-top: 20px;
    }
`;

const FormStyle = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;

    fieldset {
        border: 2px solid ${({ theme }) => theme.changeAdvertisingAdmin.border};
        width: fit-content;
    }

    legend {
       color: ${({theme}) => theme.changeAdvertisingAdmin.legend};
    }
`;

const ContainerFieldStyle = styled.div`
   h6 {
      color: ${({ theme }) => theme.changeAdvertisingAdmin.h6};
      font-size: 16px;
      padding: 0 0 5px;
      margin: 0;
   }

    &:last-child {
        input {
            max-width: 160px;
        }
    }
`;

const BlockInputStyle = styled.div`
    display: flex;
    margin-bottom: 10px;

    label {
       color: ${({ theme }) => theme.changeAdvertisingAdmin.label};
       margin-right: 5px;
       font-size: 14px;
    }

    input {
        width: 100%;
        max-width: 230px;
        border-radius: 8px;
        padding: 2px 5px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.changeAdvertisingAdmin.shadow};
    }
`;

const MessageFetchStyle = styled.div`
   color: ${({ theme }) => theme.changeAdvertisingAdmin.message};
   text-align: center;
`;

const ChangeAdvertisingAdmin = () => {
    const [advertisingData, setAdvertisingData] = useState([])
    const [fetchMessage, setFetchMessage] = useState('')
    const [sendData, setSendData] = useState(false)
    const tokenAdmin = useSelector((state) => state.admin.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchAdvertising = async () => {
            const response = await getAdvertisingAll(t)

            if (response.success) {
                setAdvertisingData(response.data)
            } else {
                setFetchMessage(response.error)
                setTimeout(() => setFetchMessage(''), 2000)
            }
        }
        fetchAdvertising()
    }, [sendData])

    const handleInputChange = (e, index, field) => {
        const { value } = e.target

        setAdvertisingData(prevData => {
            const updateData = [...prevData]
            updateData[index] = {
                ...updateData[index], [field]: value
            }
            return updateData
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await updateAdvertising(tokenAdmin, advertisingData, t)
        if (response.success) {
            setFetchMessage(response.message)
            setTimeout(() => setFetchMessage(''), 2000)
            setSendData(prev => !prev)
        } else {
            setFetchMessage(response.error)
            setTimeout(() => setFetchMessage(''), 2000)
        }
    }

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.ul.li5")}</h5>
            <FormStyle onSubmit={handleSubmit}>
                {advertisingData?.map((elem, index) => (
                    <fieldset key={index}>
                        <legend>{`${t("pages.admin.changeAdvertising.banner")} ${index + 1}`}</legend>
                        <ContainerFieldStyle>
                            <h6>{t("pages.admin.changeAdvertising.h5Title")}</h6>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-title-ua-${index}`}>{t("pages.admin.changeAdvertising.label.ua")}</label>
                                <input
                                    id={`change-adv-title-ua-${index}`}
                                    type="text"
                                    value={elem.title_ua}
                                    onChange={(e) => handleInputChange(e, index, 'title_ua')}
                                />
                            </BlockInputStyle>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-title-ru-${index}`}>{t("pages.admin.changeAdvertising.label.ru")}</label>
                                <input
                                    id={`change-adv-title-ru-${index}`}
                                    type="text"
                                    value={elem.title_ru}
                                    onChange={(e) => handleInputChange(e, index, 'title_ru')}
                                />
                            </BlockInputStyle>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-title-en-${index}`}>{t("pages.admin.changeAdvertising.label.en")}</label>
                                <input
                                    id={`change-adv-title-en-${index}`}
                                    type="text"
                                    value={elem.title_en}
                                    onChange={(e) => handleInputChange(e, index, 'title_en')}
                                />
                            </BlockInputStyle>
                        </ContainerFieldStyle>
                        <ContainerFieldStyle>
                            <h6>{t("pages.admin.changeAdvertising.h5Text")}</h6>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-text-ua-${index}`}>{t("pages.admin.changeAdvertising.label.ua")}</label>
                                <input
                                    id={`change-adv-text-ua-${index}`}
                                    type="text"
                                    value={elem.text_ua}
                                    onChange={(e) => handleInputChange(e, index, 'text_ua')}
                                />
                            </BlockInputStyle>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-text-ru-${index}`}>{t("pages.admin.changeAdvertising.label.ru")}</label>
                                <input
                                    id={`change-adv-text-ru-${index}`}
                                    type="text"
                                    value={elem.text_ru}
                                    onChange={(e) => handleInputChange(e, index, 'text_ru')}
                                />
                            </BlockInputStyle>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-text-en-${index}`}>{t("pages.admin.changeAdvertising.label.en")}</label>
                                <input
                                    id={`change-adv-text-en-${index}`}
                                    type="text"
                                    value={elem.text_en}
                                    onChange={(e) => handleInputChange(e, index, 'text_en')}
                                />
                            </BlockInputStyle>
                        </ContainerFieldStyle>
                        <ContainerFieldStyle>
                            <BlockInputStyle>
                                <label htmlFor={`change-adv-image-${index}`}>{t("pages.admin.changeAdvertising.label.image")}</label>
                                <input
                                    id={`change-adv-image-${index}`}
                                    type="text"
                                    value={elem.image}
                                    onChange={(e) => handleInputChange(e, index, 'image')}
                                />
                            </BlockInputStyle>
                        </ContainerFieldStyle>
                    </fieldset>
                ))}
            </FormStyle>
            <ButtonForm>{t("pages.admin.changeAdvertising.button")}</ButtonForm>
            <MessageFetchStyle><span>{fetchMessage}</span></MessageFetchStyle>
        </ContainerStyle>
    )
};

export default ChangeAdvertisingAdmin;