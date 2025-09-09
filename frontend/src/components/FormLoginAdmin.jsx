import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonForm } from "./ButtonForm";
import { useTranslation } from "react-i18next";
import { loginAdmin } from "../api/apiAdmin";
import { useDispatch } from "react-redux";
import { setToken } from "../store/admin/adminSlice";
import { StatusMessage } from './StatusMessage';
import styled from "styled-components";

const FormStyle = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 400px;
    width: 100%;
    min-height: 180px;
    box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formLoginAdmin.shadow};
    background-color: ${({ theme }) => theme.formLoginAdmin.background};
    overflow: hidden;
    border-radius: 8px;

    button {
       margin-top: 25px;
       margin-bottom: 20px;
    }

    p:last-child {
      font-size: 14px;
    }

    @media (max-width: 580px) {
        width: 90%;
    }
`;

const BlockField = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    label {
        font-size: 20px;
        color: ${({ theme }) => theme.formLoginAdmin.blockField.label};
    }

    input {
        max-width: 220px;
        height: 22px;
        width: 100%;
        border-radius: 10px;
        padding: 0 10px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formLoginAdmin.blockField.input.shadow};
    }
    
    @media (max-width: 580px) {
        flex-direction: column;
        align-items: center;
        
        label {
            font-size: 14px;
            margin: 0 0 5px 5px;
        }

        input {
            max-width: 250px;
            height: 22px;
            width: auto;
            padding: 0 10px;
        }
    }
`;

const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.formLoginAdmin.errorMessage.text};
    height: 18px;
    font-size: 12px;
    margin-right: 10px;
    align-self: flex-end;

    @media (max-width: 580px) {
       align-self: start;
       margin: auto;
    }
`;

export const FormLoginAdmin = () => {
    const [fetchMessage, setFetchMessage] = useState('')
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const response = await loginAdmin(data, t)

        if (response.success) {
            setFetchMessage('')
            dispatch(setToken(response.tokenAdmin))
            reset()
        } else {
            setFetchMessage(response.message)
        }
    };

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <BlockField>
                <label htmlFor="email-form-login-admin">{t("formRegistration.blockField.label.email")}</label>
                <input
                    type="email"
                    id="email-form-login-admin"
                    autoComplete="email"
                    {...register('email', {
                        required: { value: true, message: t("formRegistration.blockField.input.required") },
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t("formRegistration.blockField.input.email.pattern") }
                    }
                    )} />
            </BlockField>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <BlockField>
                <label htmlFor="password-form-login-admin">{t("formRegistration.blockField.label.password")}</label>
                <input
                    type="password"
                    id="password-form-login-admin"
                    autoComplete="new-password"
                    {...register('password', {
                        required: { value: true, message: t("formRegistration.blockField.input.required") },
                    })}
                />
            </BlockField>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <ButtonForm>{t("formAdminPanel.button")}</ButtonForm>
            <StatusMessage>{fetchMessage}</StatusMessage>
        </FormStyle>
    )
};