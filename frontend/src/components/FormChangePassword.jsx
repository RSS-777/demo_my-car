import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "./ButtonForm";
import { StatusMessage } from "./StatusMessage";
import { changePassword } from "../api/api";
import styled from "styled-components";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 0 80px;
    transition: right 0.5s ease;
    max-width: 550px;
    margin: auto;

    h2 {
        color: ${({ theme }) => theme.formChangePassword.h2};
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

    @media (max-width: 633px) {
        justify-content: center;
        padding-right: 0;
    }
`;

const BlockFildStyle = styled.div`
    display: flex;
    justify-content: space-between;

    label {
        font-size: clamp(14px, 3vw, 20px);
        color: ${({ theme }) => theme.formChangePassword.blockField.label};
    }

    input {
        max-width: 250px;
        height: 22px;
        width: 100%;
        border-radius: 10px;
        padding: 0 10px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formChangePassword.blockField.input.shadow};
    }

    @media (max-width: 633px) {
        flex-direction: column;
        align-items: center;

        label {
            margin: 0 0 5px 5px;
        }
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formChangePassword.error.text};
    height: 18px;
    font-size: 12px;
    margin-right: 10px;
    align-self: flex-end;

    @media (max-width: 768px) {
       font-size: 11px;
    }

    @media (max-width: 633px) {
       margin: auto;
       font-size: 10px;
       height: 14px;
    }
`;

const FormChangePassword = ({ token, handleCloseChange }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const [messageError, setMessageError] = useState('')
    const [messageSeccess, setMessageSeccess] = useState('')
    const { t } = useTranslation();

    const onSubmit = async (data) => {
        const fetchData = await changePassword(token, data, t)

        if (fetchData.success) {
            setMessageError('')
            reset()
            setMessageSeccess(fetchData.message)
            setTimeout(() => {
                setMessageSeccess('')
                handleCloseChange()
            }, 2000)
        } else {
            setMessageSeccess('')
            setMessageError(fetchData.message)
        }
    };

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <h2>{t("pages.userDashboard.button.changePassword")}</h2>
            <div>
                <BlockFildStyle style={{ display: 'none' }}>
                    <label htmlFor="firstname-change-acount"></label>
                    <input
                        type="text"
                        id="firstname-change-acount"
                        autoComplete="username"
                        {...register('firstname')}
                    />
                </BlockFildStyle>
                <BlockFildStyle>
                    <label htmlFor="password-current">{t('FormChangePassword.label.passwordCurrent')}</label>
                    <input
                        type="password"
                        id="password-current"
                        autoComplete="current-password"
                        {...register('passwordCurrent', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") }
                        })}
                    />
                </BlockFildStyle>
                <ErrorMessageStyle>{errors.passwordCurrent?.message}</ErrorMessageStyle>
                <BlockFildStyle>
                    <label htmlFor="password-new">{t("formRegistration.blockField.label.newPassword")}</label>
                    <input
                        type="password"
                        id="password-new"
                        autoComplete="new-password"
                        {...register('passwordNew', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            minLength: {
                                value: 8,
                                message: t("formRegistration.blockField.input.password.minLength")
                            },
                            validate: {
                                noCyrillic: value => !/[А-Яа-яЁё]/.test(value) || t("formRegistration.blockField.input.password.validate"),
                                pattern: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(value) ||
                                    t("formRegistration.blockField.input.password.pattern")
                            }
                        })}
                    />
                </BlockFildStyle>
                <ErrorMessageStyle>{errors.passwordNew?.message}</ErrorMessageStyle>
                <BlockFildStyle>
                    <label htmlFor="confirm-password">{t('FormChangePassword.label.passwordConfirm')}</label>
                    <input
                        type="password"
                        id="confirm-password"
                        autoComplete="new-password"
                        {...register('passwordConfirm', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") }
                        })}
                    />
                </BlockFildStyle>
                <ErrorMessageStyle>{errors.passwordConfirm?.message}</ErrorMessageStyle>
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
            <StatusMessage>{messageError || messageSeccess}</StatusMessage>
        </FormStyle>
    )
};

export default FormChangePassword;