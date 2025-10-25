import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import { StatusMessage } from "./StatusMessage";
import { changePassword } from "../api/api";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  transition: right 0.5s ease;
  max-width: 450px;
  margin: auto;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;

    button {
      align-self: center;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    @media (max-width: 580px) {
      padding: 20px 0 40px;
      max-width: 350px;
      width: 100%;
      margin: auto;
    }
  }
`;

const FormChangePassword = ({ token }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [messageError, setMessageError] = useState("");
  const [messageSeccess, setMessageSeccess] = useState("");
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    const fetchData = await changePassword(token, data, t);

    if (fetchData.success) {
      setMessageError("");
      reset();
      setMessageSeccess(fetchData.message);
      setTimeout(() => {
        setMessageSeccess("");
      }, 2000);
    } else {
      setMessageSeccess("");
      setMessageError(fetchData.message);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div style={{ display: "none" }}>
          <label htmlFor="firstname-change-acount"></label>
          <input
            type="text"
            id="firstname-change-acount"
            autoComplete="username"
            {...register("firstname")}
          />
        </div>
        <InputField
          label={t("FormChangePassword.label.passwordCurrent")}
          type="password"
          id="password-current"
          autoComplete="current-password"
          register={register("passwordCurrent", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
          })}
        />
        <InputError error={errors.passwordCurrent?.message} />
        <InputField
          label={t("formRegistration.blockField.label.newPassword")}
          type="password"
          id="password-new"
          autoComplete="new-password"
          register={register("passwordNew", {
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
        <InputError error={errors.passwordNew?.message} />
        <InputField
          label={t("FormChangePassword.label.passwordConfirm")}
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          register={register("passwordConfirm", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
          })}
        />
        <InputError error={errors.passwordConfirm?.message} />
        <ButtonCard type="submit">{t("formChangeProfile.button")}</ButtonCard>
      </div>
      <StatusMessage>{messageError || messageSeccess}</StatusMessage>
    </FormStyle>
  );
};

export default FormChangePassword;
