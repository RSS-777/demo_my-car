import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonCard } from "./ButtonCard";
import { useTranslation } from "react-i18next";
import { loginAdmin } from "../api/apiAdmin";
import { useDispatch } from "react-redux";
import { setToken } from "../store/admin/adminSlice";
import { StatusMessage } from "./StatusMessage";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 320px;
  width: 100%;
  box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};
  border-radius: 8px;
  padding:30px 20px 0;
  margin: auto;

  > button {
    align-self: flex-end;

    @media (max-width: 580px) {
      align-self: center;
    }
  }
`;

export const FormLoginAdmin = () => {
  const [fetchMessage, setFetchMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await loginAdmin(data, t);

    if (response.success) {
      setFetchMessage("");
      dispatch(setToken(response.tokenAdmin));
      reset();
    } else {
      setFetchMessage(response.message);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          label={t("formRegistration.blockField.label.email")}
          type="email"
          id="email-form-login-admin"
          autoComplete="email"
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
          id="password-form-login-admin"
          autoComplete="new-password"
          register={register("password", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
          })}
        />
        <InputError error={errors.password?.message} />
      </div>
      <ButtonCard type="submit">{t("formAdminPanel.button")}</ButtonCard>
      <StatusMessage>{fetchMessage}</StatusMessage>
    </FormStyle>
  );
};
