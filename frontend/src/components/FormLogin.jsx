import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setTariff } from "../store/user/userSlice";
import { loginUser } from "../api/api";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import imageUserBlue from "../assets/images/icons/myUserBlue.png";
import imageUserCoral from "../assets/images/icons/myUserCoral.png";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 320px;
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

export const FormLogin = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value);
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    const response = await loginUser(data, t);

    if (response.success) {
      setAuthError("");
      dispatch(setToken(response.token));
      dispatch(setTariff(response.tariff));
      reset();
    } else {
      setAuthError(response.message);
    }
  };

  return (
    <FormStyle
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        src={theme === "light" ? imageUserBlue : imageUserCoral}
        alt="Logo users"
        width="36px"
        height="36px"
      />
      <div>
        <InputField
          label={t("formRegistration.blockField.label.email")}
          type="email"
          id="email-form-login"
          autoComplete="email"
          name="email"
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
          id="password-form-login"
          autoComplete="current-password"
          name="password"
          register={register("password", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
          })}
        />
        <InputError error={authError ? authError : errors.password?.message} />
      </div>
      <ButtonCard type="submit">{t("formLogin.button")}</ButtonCard>
    </FormStyle>
  );
};
