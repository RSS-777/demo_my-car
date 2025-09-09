import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "../components/ButtonForm";
import { useSelector } from "react-redux";
import { changeProfile } from "../api/api";
import { StatusMessage } from "./StatusMessage";
import styled from "styled-components";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 0 80px;
    transition: right 0.5s ease;
    max-width: 550px;
    margin: auto;

    h2 {
        color: ${({ theme }) => theme.formChangeProfile.h2};
        font-size: clamp(24px, 5vw, 38px);
        text-align: center;
        margin: 10px auto;
    }

    >div {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 25px 20px 40px;

        @media (max-width: 580px) {
          padding: 20px 0 40px;
          max-width: 350px;
          width: 100%;
          margin: auto;
        }
    }
`;

const BlockButtonStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 30px auto 0;
    padding-right: 20px;
    width: 100%;
    gap: 15px;

    button {
        width: clamp(100px, 5vw, 150px);
        min-width: 0;
        height: 30px;
        padding: 0;
        font-size: clamp(14px, 1vw, 18px);
    }

    @media (max-width: 580px) {
        justify-content: center;
        padding-right: 0;
    }
`;

const BlockFieldStyle = styled.div`
    display: flex;
    justify-content: space-between;

    label {
        font-size: clamp(14px, 3vw, 20px);
        color: ${({ theme }) => theme.formChangeProfile.blockField.label};
    }

    input {
        max-width: 250px;
        height: 22px;
        width: 100%;
        border-radius: 10px;
        padding: 0 10px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formChangeProfile.blockField.input.shadow};
    }

    #image {
        position: relative;
        max-width: 250px;
        width: 100%;
        height: 20px;
        padding: 0;
        border-radius: 8px;

        &::before {
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            content: "${props => props.$nameInput}";
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;
            background: ${({theme}) => theme.formChangeProfile.blockField.image.before.background};
            border-radius: 8px 0 0 8px;
            cursor: pointer;
        }

        &:hover::before {
            color: ${({ theme }) => theme.formChangeProfile.blockField.image.hover.text}; 
        }

        &::after {
            position: absolute;
            right: 0;
            top: 0;
            content: "${(prop) => prop.$nameFile ? prop.$nameFile : prop.$nameNotFile}";
            width: 145px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 21px;
            background: ${({ theme }) => theme.formChangeProfile.blockField.image.after.background}; 
            color: ${({ theme }) => theme.formChangeProfile.blockField.image.after.text};
        }
    }

    @media (max-width: 580px) {
        flex-direction: column;
        align-items: center;

        label {
            margin: 0 0 5px 5px;
        }
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formChangeProfile.error.text};
    height: 18px;
    font-size: 12px;
    margin-right: 10px;
    align-self: flex-end;

    @media (max-width: 768px) {
       font-size: 11px;
    }

    @media (max-width: 580px) {
       margin: auto;
       font-size: 10px;
       height: 14px;
    }
`;

const FormChangeProfile = ({ userData, handleCloseChange }) => {
    const { first_name: firstName, last_name: lastName, person_image: personImage } = userData
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            firstName,
            lastName,
        }
    });
    const [nameChoiseFile, setNameChoiseFile] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const token = useSelector((state) => state.user.token)
    const { t } = useTranslation();
    const selectedFile = watch('image');

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            setNameChoiseFile(selectedFile[0].name)
        } else {
            if (personImage) {
                setNameChoiseFile(personImage)
            }
        }
    }, [selectedFile, personImage]);

    const onSubmit = async (data) => {
        const existingImagePath = ((personImage) ? personImage : null)
        const fetchData = await changeProfile(token, data, existingImagePath, t)

        if (fetchData.success) {
            setErrorMessage('')
            reset()
            handleCloseChange()
        } else {
            setErrorMessage(fetchData.message)
        }
    };

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <h2>{t("formChangeProfile.h2")}</h2>
            <div>
                <BlockFieldStyle>
                    <label htmlFor="first-name">{t("formRegistration.blockField.label.firstName")}</label>
                    <input
                        type="text"
                        id="first-name"
                        autoComplete="given-name"
                        {...register('firstName', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            minLength: { value: 3, message: t("formRegistration.blockField.input.firstName.minLength") },
                            pattern: { value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/, message: t("formRegistration.blockField.input.firstName.pattern") }
                        }
                        )} />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.firstName?.message}</ErrorMessageStyle>
                <BlockFieldStyle>
                    <label htmlFor="last-name">{t("formRegistration.blockField.label.lastName")}</label>
                    <input
                        type="text"
                        id="last-name"
                        autoComplete="family-name"
                        {...register('lastName', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            minLength: { value: 3, message: t("formRegistration.blockField.input.lastName.minLength") },
                            pattern: { value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/, message: t("formRegistration.blockField.input.lastName.pattern") }
                        }
                        )} />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.lastName?.message}</ErrorMessageStyle>
                <BlockFieldStyle $nameFile={nameChoiseFile} $nameInput={t("formAddCar.props.nameInput")} $nameNotFile={t("formAddCar.props.nameNotFile")}>
                    <label htmlFor="image">{t("formChangeProfile.label.image")}</label>
                    <input
                        type="file"
                        id="image"
                        {...register('image')}
                    />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.image?.message}</ErrorMessageStyle>
                <BlockButtonStyle>
                    <ButtonForm
                        type="button"
                        onClick={handleCloseChange}
                    >
                        {t("pages.userDashboard.button.cancel")}
                    </ButtonForm>
                    <ButtonForm
                        type="submit"
                    >
                        {t("formChangeProfile.button")}
                    </ButtonForm>
                </BlockButtonStyle>
            </div>
            <StatusMessage>{errorMessage}</StatusMessage>
        </FormStyle>
    )
};

export default FormChangeProfile;