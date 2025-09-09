import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "../components/ButtonForm";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setToken, setTariff } from "../store/user/userSlice";
import { loginUser } from "../api/api";
import styled from "styled-components";

const FormStyle = styled.form`
    position: absolute;
    z-index: 3;
    left: ${({ $registrationTab }) => $registrationTab === false ? '50%' : '-200%'};
    top: 50%;
    transition: left 0.5s ease;
    max-width: 456px;
    width: 100%;
    transform: translate(-50%, -50%);

    >div {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 40px;

        > button {
            position: absolute;
            bottom: 0;
            right: 45px;
            
            @media (max-width: 580px) {
                left: 50%;
                transform: translateX(-50%);
                right: initial;
            }
        }

        @media (max-width: 580px) {
          padding: 30px;
        }
    }
`;

const BlockFildStyle = styled.div`
    display: flex;
    justify-content: space-between;

    label {
        color: ${({ theme }) => theme.formLogin.blockField.label};
    }

    input {
        max-width: 250px;
        height: 22px;
        width: 60%;
        border-radius: 10px;
        padding: 0 10px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formLogin.blockField.input.shadow};
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
            width: 100%;
            padding: 0 10px;
        }
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formLogin.errorMessage.text};
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    margin-right: 10px;
    align-self: flex-end;

    @media (max-width: 768px) {
       font-size: 11px;
    }

    @media (max-width: 580px) {
       align-self: center;
       margin-right: 0;
       margin-bottom: 5px;
       font-size: 10px;
       height: 14px;
    }
`;

const FormLogin = ({ registrationTab }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const [authError, setAuthError] = useState('')
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const onSubmit = async (data) => {
        const response = await loginUser(data, t);

        if (response.success) {
            setAuthError('');
            dispatch(setToken(response.token));
            dispatch(setTariff(response.tariff));
            reset()
        } else {
            setAuthError(response.message)
        }
    };

    return (
        <FormStyle $registrationTab={registrationTab} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <BlockFildStyle>
                    <label htmlFor="email-form-login">{t("formRegistration.blockField.label.email")}</label>
                    <input
                        type="email"
                        id="email-form-login"
                        autoComplete="email"
                        {...register('email', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t("formRegistration.blockField.input.email.pattern") }
                        }
                        )} />
                </BlockFildStyle>
                <ErrorMessageStyle>{errors.email?.message}</ErrorMessageStyle>
                <BlockFildStyle>
                    <label htmlFor="password-form-login">{t("formRegistration.blockField.label.password")}</label>
                    <input
                        type="password"
                        id="password-form-login"
                        autoComplete="current-password"
                        {...register('password', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                        })}
                    />
                </BlockFildStyle>
                <ErrorMessageStyle>{authError ? authError : errors.password?.message}</ErrorMessageStyle>
                <ButtonForm type="submit" children={t('formLogin.button')} />
            </div>
        </FormStyle>
    )
};

export default FormLogin;