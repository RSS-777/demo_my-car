import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "../api/sendMessageApi";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import { TextareaField } from "./TextareaField";
import { StatusMessage } from "./StatusMessage";
import styled from "styled-components";

const WrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h2 {
    margin: 20px;
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
  }
`;

const FormMessageSendStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};
  border-radius: 8px;
  margin: auto;

  button {
    align-self: center;
    margin-top: 10px;
  }
`;

export const FormContact = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [responseMessage, setResponseMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setResponseMessage(t("formContact.responseMessage"));
    const response = await sendMessage(data, t);

    setIsSubmitting(false);

    if (response.success) {
      setResponseMessage(response.message);
      reset();
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
    } else {
      setResponseMessage(response.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
    }
  };

  return (
    <WrapperStyle>
      <h2>{t("formContact.h2")}</h2>
      <FormMessageSendStyle onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("formContact.label.firstName")}
          type="text"
          id="form-contact-first-name"
          autoComplete="given-name"
          register={register("firstName", {
            required: {
              value: true,
              message: t("formContact.input.required"),
            },
            minLength: {
              value: 3,
              message: t("formContact.input.minLengthFirstName"),
            },
            pattern: {
              value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/,
              message: t("formContact.input.patternFirstName"),
            },
          })}
        />
        <InputError error={errors.firstName?.message} />
        <InputField
          label={t("formContact.label.lastName")}
          type="text"
          id="form-contact-last-name"
          autoComplete="family-name"
          register={register("lastName", {
            required: {
              value: true,
              message: t("formContact.input.required"),
            },
            minLength: {
              value: 3,
              message: t("formContact.input.minLengthLastName"),
            },
            pattern: {
              value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/,
              message: t("formContact.input.patternLastName"),
            },
          })}
        />
        <InputError error={errors.lastName?.message} />
        <InputField
          label={t("formContact.label.email")}
          type="text"
          id="email"
          autocomplete="email"
          register={register("email", {
            required: {
              value: true,
              message: t("formContact.input.required"),
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("formContact.input.patternEmail"),
            },
          })}
        />
        <InputError error={errors.email?.message} />
        <TextareaField
          label={t("formContact.label.textarea")}
          id="user-message"
          placeholder={t("formContact.input.placeholder")}
          register={register("userMessage", {
            required: {
              value: true,
              message: t("formContact.input.required"),
            },
            minLength: {
              value: 15,
              message: t("formContact.input.minLengthTextarea"),
            },
          })}
        />
        <InputError error={errors.userMessage?.message} />
        <ButtonCard type="submit" disabled={isSubmitting}>
          {t("formContact.button")}
        </ButtonCard>
      </FormMessageSendStyle>
      <StatusMessage>{responseMessage}</StatusMessage>
    </WrapperStyle>
  );
};
