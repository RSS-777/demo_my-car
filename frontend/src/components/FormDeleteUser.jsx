import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ButtonForm } from "../components/ButtonForm";
import { StatusMessage } from "./StatusMessage";
import { deleteUser } from "../api/api";
import { clearToken, clearTariff, deleteName } from "../store/user/userSlice";
import styled from "styled-components";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 0 80px;
    transition: right 0.5s ease;
    max-width: 550px;
    margin: auto;

    h2 {
        color: ${({ theme }) => theme.formDeleteUser.h2};
        font-size: clamp(24px, 3vw, 38px);
        text-align: center;
        margin: 10px auto;
    }
`;

const BlockInformationStyle = styled.div`
    h4 {
        color: ${({ theme }) => theme.formDeleteUser.blockInformation.h4};
        font-size: clamp(18px, 5vw, 22px);
    }

    p {
        text-align: center;
        margin: 0;
    }

    @media (max-width: 580px) {
        p {
            font-size: 14px;
        }
    }
`;

const ContainerFieldStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px 20px 40px;

    @media (max-width: 580px) {
        padding: 20px 0 25px;
        max-width: 350px;
        width: 100%;
        margin: auto;
    }
`;
const BlockFieldStyle = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    margin: auto;

    label {
        font-size: clamp(14px, 3vw, 20px);
        color: ${({ theme }) => theme.formDeleteUser.blockField.label};
    }

    input {
      max-width: 225px;
      height: 22px;
      width: 100%;
      border-radius: 10px;
      padding: 0 10px;
      outline-style: none;
      border: none;
      box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formDeleteUser.input.shadow};
    }

    @media (max-width: 580px) {
        flex-direction: column;
        align-items: center;

        label {
            margin: 0 0 5px 5px;
        }
    }
`;
const BlockButtonStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 30px auto 0;
    padding-right: 5px;
    width: 100%;
    max-width: 320px;
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

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formDeleteUser.error};
    height: 18px;
    font-size: 12px;
    margin-right: 10px;
    margin-left: 105px;

    @media (max-width: 768px) {
       font-size: 11px;
    }

    @media (max-width: 580px) {
       font-size: 10px;
       height: 14px;
       margin: 2px auto;
    }
`;

const FormDeleteUser = ({ token, handleCloseChange }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSubmit = async (data) => {
        try {
            const dataFetch = await deleteUser(token, data.password, t);

            if (!dataFetch.success) {
                setErrorMessage(dataFetch.message);
                return;
            } else {
                setErrorMessage('');
                reset();
                setSuccessMessage(dataFetch.message);
                setTimeout(() => {
                    dispatch(clearToken())
                    dispatch(clearTariff())
                    dispatch(deleteName())
                }, 2000);
            }

        } catch (error) {
            setErrorMessage(t("formDeleteUser.catch"));
        }
    };

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <h2>{t("formDeleteUser.h2")}</h2>
            <BlockInformationStyle>
                <h4>{t("formDeleteUser.h4")}</h4>
                <p><strong>{t("formDeleteUser.text")}</strong></p>
            </BlockInformationStyle>
            <ContainerFieldStyle>
                <BlockFieldStyle style={{ display: 'none' }}>
                    <label htmlFor="firstname-delete-acount"></label>
                    <input
                        type="text"
                        id="firstname-delete-acount"
                        autoComplete="username"
                        {...register('firstname')}
                    />
                </BlockFieldStyle>
                <BlockFieldStyle>
                    <label htmlFor="password-delete-acount">{t("formRegistration.blockField.label.password")}</label>
                    <input
                        type="password"
                        id="password-delete-acount"
                        autoComplete="current-password"
                        {...register('password', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") }
                        })}
                    />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.password?.message}</ErrorMessageStyle>
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
                        {t("formDeleteUser.button")}
                    </ButtonForm>
                </BlockButtonStyle>
            </ContainerFieldStyle>
            <StatusMessage>{errorMessage || successMessage}</StatusMessage>
        </FormStyle>
    )
};

export default FormDeleteUser;