import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ButtonCard } from "./ButtonCard";
import { StatusMessage } from "./StatusMessage";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import { deleteUser } from "../api/api";
import { clearToken, clearTariff, deleteName } from "../store/user/userSlice";
import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  transition: right 0.5s ease;
  max-width: 550px;
  margin: auto;
`;

const BlockInformationStyle = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.text.mistake};
    font-size: clamp(18px, 5vw, 22px);
    text-align: center;
  }

  p {
    text-align: center;
    margin: 0;
  }
`;

const ContainerFieldStyle = styled.div`
  padding: 20px 0;
  max-width: 350px;
  width: 100%;
  margin: auto;
  text-align: center;

  button {
    margin-top: 15px;
  }
`;

const FormDeleteUser = ({ token }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    try {
      const dataFetch = await deleteUser(token, data.password, t);

      if (!dataFetch.success) {
        setErrorMessage(dataFetch.message);
        return;
      } else {
        setErrorMessage("");
        reset();
        setSuccessMessage(dataFetch.message);
        setTimeout(() => {
          dispatch(clearToken());
          dispatch(clearTariff());
          dispatch(deleteName());
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(t("formDeleteUser.catch"));
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <BlockInformationStyle>
        <h2>{t("formDeleteUser.title")}</h2>
        <p>
          <strong>{t("formDeleteUser.text")}</strong>
        </p>
      </BlockInformationStyle>
      <ContainerFieldStyle>
        <div style={{ display: "none" }}>
          <label htmlFor="firstname-delete-acount"></label>
          <input
            type="text"
            id="firstname-delete-acount"
            autoComplete="username"
            {...register("firstname")}
          />
        </div>
        <InputField
          label={t("formRegistration.blockField.label.password")}
          type="password"
          id="password-delete-acount"
          autoComplete="current-password"
          register={register("password", {
            required: {
              value: true,
              message: t("formRegistration.blockField.input.required"),
            },
          })}
        />
        <InputError error={errors.password?.message} />
        <ButtonCard type="submit">{t("formDeleteUser.button")}</ButtonCard>
      </ContainerFieldStyle>
      <StatusMessage>{errorMessage || successMessage}</StatusMessage>
    </FormStyle>
  );
};

export default FormDeleteUser;
