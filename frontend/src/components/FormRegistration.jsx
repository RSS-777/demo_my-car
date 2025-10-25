import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import { ButtonCard } from "./ButtonCard";
import { ButtonGhost } from "./ButtonGhost";
import { StatusMessage } from "./StatusMessage";
import {
  sendConfirmationCode,
  validateConfirmationCode,
  registrationUser,
} from "../api/api";
import imageUserBlue from "../assets/images/icons/myUserBlue.png";
import imageUserCoral from "../assets/images/icons/myUserCoral.png";

const FormStyle = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};
  border-radius: 8px;
  padding: 20px;
  margin: auto;

  img {
    align-self: center;
    margin-bottom: 10px;
  }

  > button {
    align-self: flex-end;

    @media (max-width: 580px) {
      align-self: center;
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
    margin-right: 5px;
    cursor: pointer;
    pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  }

  button {
    margin: 0 5px;
  }
`;

export const FormRegistration = ({
  setPrivacyShow,
  setTermsShow,
  setRegistrationTab
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { t } = useTranslation();
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);
  const theme = useSelector((state) => state.theme.value);

  const blockButton = () => {
    setIsButtonBlocked(true);
    setErrorMessage(t("formRegistration.function.errorMessage"));
    setStatusMessage("");

    setTimeout(() => {
      setIsButtonBlocked(false);
      setErrorMessage("");
    }, 100000);
  };

  const onSubmit = async (data) => {
    if (!confirmationCodeSent) {
      setErrorMessage("");
      setStatusMessage(t("formRegistration.function.statusMessage"));
      const result = await sendConfirmationCode(data.email, t);

      if (result.success) {
        setErrorMessage("");
        setConfirmationCodeSent(true);
        setStatusMessage(result.message);
      } else {
        setErrorMessage(result.message);
      }
    } else {
      const response = await validateConfirmationCode(
        data.email,
        data.confirmationCode,
        t
      );

      if (response.success) {
        setErrorMessage("");
        setStatusMessage(response.message);
        const sentFormFinish = await registrationUser(data, t);

        if (sentFormFinish.success) {
          setErrorMessage("");
          setStatusMessage(sentFormFinish.message);
          setTimeout(() => setRegistrationTab(false), 2000)
          reset();
          setConfirmationCodeSent(false);
        } else {
          setErrorMessage(sentFormFinish.message);
        }
      } else {
        setErrorMessage(response.message);
        setAttempts((prev) => prev + 1);

        if (attempts + 1 >= 3) {
          blockButton();
          setAttempts(0);
          reset();
          setConfirmationCodeSent(false);
        }
      }
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <img
        src={theme === "light" ? imageUserBlue : imageUserCoral}
        alt="Logo users"
        width="36px"
        height="36px"
      />
      <div>
        <InputField
          label={t("formRegistration.blockField.label.firstName")}
          type="text"
          id="first-name-form-registration"
          autoComplete="given-name"
          readOnly={confirmationCodeSent}
          register={register("firstName", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
            minLength: {
              value: 3,
              message: t(
                "formRegistration.blockField.input.firstName.minLength"
              ),
            },
            pattern: {
              value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/,
              message: t("formRegistration.blockField.input.firstName.pattern"),
            },
          })}
        />
        <InputError error={errors.firstName?.message} />
        <InputField
          label={t("formRegistration.blockField.label.lastName")}
          type="text"
          id="last-name-form-registration"
          autoComplete="family-name"
          readOnly={confirmationCodeSent}
          register={register("lastName", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
            minLength: {
              value: 3,
              message: t(
                "formRegistration.blockField.input.lastName.minLength"
              ),
            },
            pattern: {
              value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/,
              message: t("formRegistration.blockField.input.lastName.pattern"),
            },
          })}
        />
        <InputError error={errors.lastName?.message} />
        <InputField
          label={t("formRegistration.blockField.label.email")}
          type="email"
          id="email-form-registration"
          autoComplete="email"
          readOnly={confirmationCodeSent}
          register={register("email", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("formRegistration.blockField.input.email.pattern"),
            },
          })}
        />
        <InputError error={errors.email?.message} />
        <InputField
          label={t("formRegistration.blockField.label.password")}
          type="password"
          id="password-form-registration"
          autoComplete="new-password"
          readOnly={confirmationCodeSent}
          register={register("password", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
            minLength: {
              value: 8,
              message: t(
                "formRegistration.blockField.input.password.minLength"
              ),
            },
            validate: {
              noCyrillic: (value) =>
                !/[А-Яа-яЁё]/.test(value) ||
                t("formRegistration.blockField.input.password.validate"),
              pattern: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
                  value
                ) || t("formRegistration.blockField.input.password.pattern"),
            },
          })}
        />
        <InputError error={errors.password?.message} />
        <BlockPrivacyStyle $disabled={confirmationCodeSent}>
          <input
            type="checkbox"
            id="consent-form-registration"
            readOnly={confirmationCodeSent}
            {...register("consent", {
              required: {
                value: true,
                message: t("formRegistration.blockPrivacyStyle.required"),
              },
            })}
          />
          <label htmlFor="consent-form-registration">
            {t("formRegistration.blockPrivacyStyle.label")}
          </label>
          <ButtonGhost onClick={() => setPrivacyShow(true)}>
            {t("formRegistration.blockPrivacyStyle.buttonPolicy")}
          </ButtonGhost>
          <span>{t("formRegistration.blockPrivacyStyle.span")}</span>
          <ButtonGhost onClick={() => setTermsShow(true)}>
            {t("formRegistration.blockPrivacyStyle.buttonRules")}
          </ButtonGhost>
        </BlockPrivacyStyle>
        <InputError error={errors.consent?.message} />
        {confirmationCodeSent && (
          <>
            <InputField
              label={t("formRegistration.blockField.label.code")}
              type="text"
              id="confirmation-code"
              register={register("confirmationCode", {
                required: {
                  value: true,
                  message: t("formRegistration.blockField.input.required"),
                },
                minLength: {
                  value: 6,
                  message: t(
                    "formRegistration.blockField.input.confirmationCode.minLength"
                  ),
                },
                maxLength: {
                  value: 6,
                  message: t(
                    "formRegistration.blockField.input.confirmationCode.minLength"
                  ),
                },
              })}
            />
            <InputError error={errors.confirmationCode?.message} />
          </>
        )}
      </div>
      <ButtonCard type="submit" disabled={isButtonBlocked}>
        {t("formContact.button")}
      </ButtonCard>
      {(errorMessage || statusMessage) && (
        <StatusMessage>{errorMessage || statusMessage}</StatusMessage>
      )}
    </FormStyle>
  );
};
