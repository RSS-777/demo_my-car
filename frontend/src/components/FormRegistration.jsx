import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonForm } from "../components/ButtonForm";
import styled from "styled-components";
import { sendConfirmationCode, validateConfirmationCode, registrationUser } from '../api/api';

const FormStyle = styled.form`
    position: relative;
    right: ${({ $registrationTab }) => $registrationTab === true ? 0 : '-200%'};
    padding: 15px;
    transition: right 0.5s ease;
    max-width: 456px;
    width: 100%;
    z-index: 3;
    margin-bottom: 0;

    >div {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 30px 40px 60px;

        > button {
            position: absolute;
            bottom: 0;
            right: 45px;
            
            @media (max-width: 580px) {
                left: 50%;
                transform: translateX(-50%);
                right: initial;
                bottom: 10px;
            }
        }

        @media (max-width: 580px) {
          padding: 15px 0 60px;
          max-width: 320px;
          margin: auto;
          align-items: center;
        }
    }

    @media (max-width: 580px) {
        #error-consent-form-registration {
           margin-bottom: 15px;
        }  
    }
`;

const BlockFieldStyle = styled.div`
    display: flex;
    justify-content: space-between;

    label {
        color: ${({ theme }) => theme.formRegistration.blockField.label};
    }

    input {
        max-width: 220px;
        height: 22px;
        width: 100%;
        border-radius: 10px;
        padding: 0 10px;
        outline-style: none;
        border: none;
        box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formRegistration.blockField.input.shadow};
    }

    #confirmation-code {
      width: 70px;
    }

    @media (max-width: 580px) {
        flex-direction: column;
        width: 250px;

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

const BlockPrivacyStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 14px;

    input {
       margin-left: 0;
       pointer-events: ${({$disabled}) => $disabled ? 'none' : 'auto'}
    }

    button {
        background: ${({theme}) => theme.formRegistration.blockPrivacy.button.background};
        border: none;
        cursor: pointer;
        color: ${({theme}) => theme.formRegistration.blockPrivacy.button.text};
        font-size: 14px;

        &:hover {
            color: ${({theme}) => theme.formRegistration.blockPrivacy.button.hover.text};
        }
    }

    @media (max-width: 580px) {
       text-align: center;
       margin-top: 8px;
       width: 250px;
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formRegistration.errorMessage.text};
    min-height: 18px;
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
        font-size: 10px;
        min-height: 14px;
        line-height: 14px;
        margin-top: 2px;
        text-align: center;
        width: 320px;
        padding: 0 20px;
    }
`;

const ErrorConfirmMessageStyle = styled.div`
    color: ${({ theme }) => theme.formRegistration.errorConfirm.text};
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
    align-self: flex-end;

    @media (max-width: 768px) {
       font-size: 11px;
    }

    @media (max-width: 580px) {
        align-self: flex-start;
        font-size: 10px;
        min-height: 14px;
        line-height: 14px;
        margin-top: 2px;
        width: 250px;
        margin: auto;
    }
`;

const StatusMessageStyle = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.formRegistration.statusMessage.text};
    font-size: 16px;
    margin: 5px auto 0;
   
    @media (max-width: 580px) {
        font-size: 14px;
    }
`;

const FormRegistration = ({ registrationTab, setSuccessMessage, setRegistrationTab, setPrivacyShow, setTermsShow }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const { t } = useTranslation();
    const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);

    const handleSuccsesMessage = (result) => {
        setRegistrationTab(false)
        setSuccessMessage(result.firstName)
        setTimeout(() => { setSuccessMessage('') }, 2000)
    };

    const blockButton = () => {
        setIsButtonBlocked(true)
        setErrorMessage(t("formRegistration.function.errorMessage"))
        setStatusMessage('')

        setTimeout(() => {
            setIsButtonBlocked(false)
            setErrorMessage('')
        }, 100000)
    };

    const onSubmit = async (data) => {
        if (!confirmationCodeSent) {
            setErrorMessage('')
            setStatusMessage(t("formRegistration.function.statusMessage"))
            const result = await sendConfirmationCode(data.email, t)

            if (result.success) {
                setErrorMessage('')
                setConfirmationCodeSent(true)
                setStatusMessage(result.message)
            } else {
                setErrorMessage(result.message)
            }
        } else {
            const response = await validateConfirmationCode(data.email, data.confirmationCode, t)

            if (response.success) {
                setErrorMessage('')
                setStatusMessage(response.message)
                const sentFormFinish = await registrationUser(data, t)

                if (sentFormFinish.success) {
                    setErrorMessage('')
                    setStatusMessage(sentFormFinish.message)
                    handleSuccsesMessage(sentFormFinish.data)
                    reset()
                    setConfirmationCodeSent(false)
                } else {
                    setErrorMessage(sentFormFinish.message)
                }
            } else {
                setErrorMessage(response.message)
                setAttempts((prev) => prev + 1)

                if (attempts + 1 >= 3) {
                    blockButton()
                    setAttempts(0);
                    reset()
                    setConfirmationCodeSent(false)
                }
            }
        }
    };

    return (
        <FormStyle $registrationTab={registrationTab} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <BlockFieldStyle>
                    <label htmlFor="first-name-form-registration">{t("formRegistration.blockField.label.firstName")}</label>
                    <input
                        type="text"
                        id="first-name-form-registration"
                        autoComplete="given-name"
                        readOnly={confirmationCodeSent}
                        {...register('firstName', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            minLength: { value: 3, message: t("formRegistration.blockField.input.firstName.minLength") },
                            pattern: { value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/, message: t("formRegistration.blockField.input.firstName.pattern") }
                        }
                        )} />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.firstName?.message}</ErrorMessageStyle>
                <BlockFieldStyle>
                    <label htmlFor="last-name-form-registration">{t("formRegistration.blockField.label.lastName")}</label>
                    <input
                        type="text"
                        id="last-name-form-registration"
                        autoComplete="family-name"
                        readOnly={confirmationCodeSent}
                        {...register('lastName', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            minLength: { value: 3, message: t("formRegistration.blockField.input.lastName.minLength") },
                            pattern: { value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/, message: t("formRegistration.blockField.input.lastName.pattern") }
                        }
                        )} />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.lastName?.message}</ErrorMessageStyle>
                <BlockFieldStyle>
                    <label htmlFor="email-form-registration">{t("formRegistration.blockField.label.email")}</label>
                    <input
                        type="email"
                        id="email-form-registration"
                        autoComplete="email"
                        readOnly={confirmationCodeSent}
                        {...register('email', {
                            required: { value: true, message: t("formRegistration.blockField.input.required") },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t("formRegistration.blockField.input.email.pattern") }
                        }
                        )} />
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.email?.message}</ErrorMessageStyle>
                <BlockFieldStyle>
                    <label htmlFor="password-form-registration">{t("formRegistration.blockField.label.password")}</label>
                    <input
                        type="password"
                        id="password-form-registration"
                        autoComplete="new-password"
                        readOnly={confirmationCodeSent}
                        {...register('password', {
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
                </BlockFieldStyle>
                <ErrorMessageStyle>{errors.password?.message}</ErrorMessageStyle>
                <BlockPrivacyStyle $disabled={confirmationCodeSent}>
                    <input
                        type="checkbox"
                        id="consent-form-registration"
                        readOnly={confirmationCodeSent}
                        {...register('consent', { required: { value: true, message: t("formRegistration.blockPrivacyStyle.required") } })}
                    />
                    <label htmlFor="consent-form-registration">
                        {t("formRegistration.blockPrivacyStyle.label")}
                    </label>
                    <button onClick={() => setPrivacyShow(true)}>{t("formRegistration.blockPrivacyStyle.buttonPolicy")}</button>
                    <span>{t("formRegistration.blockPrivacyStyle.span")}</span>
                    <button onClick={() => setTermsShow(true)}>{t("formRegistration.blockPrivacyStyle.buttonRules")}</button>
                </BlockPrivacyStyle>
                <ErrorMessageStyle id="error-consent-form-registration">{errors.consent?.message}</ErrorMessageStyle>
                {confirmationCodeSent &&
                    <>
                        <BlockFieldStyle>
                            <label htmlFor="confirmation-code">{t("formRegistration.blockField.label.code")}</label>
                            <input
                                type="text"
                                id="confirmation-code"
                                {...register('confirmationCode', {
                                    required: { value: true, message: t("formRegistration.blockField.input.required") },
                                    minLength: {
                                        value: 6,
                                        message: t("formRegistration.blockField.input.confirmationCode.minLength")
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: t("formRegistration.blockField.input.confirmationCode.minLength")
                                    }
                                })}
                            />
                        </BlockFieldStyle>
                        <ErrorConfirmMessageStyle>{errors.confirmationCode?.message}</ErrorConfirmMessageStyle>
                    </>
                }
                <ButtonForm
                    type="submit"
                    children={t('formContact.button')}
                    disabled={isButtonBlocked}
                    className={isButtonBlocked ? 'disableButton' : ''}
                />
            </div>
            <StatusMessageStyle><span>{errorMessage || statusMessage}</span></StatusMessageStyle>
        </FormStyle>
    )
};

export default FormRegistration;