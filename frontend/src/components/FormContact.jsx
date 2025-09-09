import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonForm } from "./ButtonForm";
import { sendMessage } from "../api/sendMessageApi";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { darkTheme } from "../styles/theme";
import letterImage from "../assets/images/contact/myLеtter.jpg";

const WrapperStyle = styled.div`
  position: relative;
  background-image: url(${letterImage});
  background-attachment: fixed;
  background-size: cover;
  background-position: top 60px center;
  background-repeat: no-repeat;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 40px;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.formContact.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    background-image: radial-gradient(
      transparent,
      ${({ theme }) => theme.formContact.after.background}
    );
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  h2 {
    color: ${({ theme }) => theme.formContact.h2};
    position: relative;
    text-align: center;
    margin: 0;
    z-index: 3;
  }
`;
const FormMessageSendStyle = styled.form`
  position: relative;
  z-index: 3;

  > div {
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-width: 420px;
    margin: auto;
    box-shadow: 0.5px 0.5px 3px 0
      ${({ theme }) => theme.formContact.formMessage.div.shadow};
    background-color: ${({ theme }) =>
      theme.formContact.formMessage.div.background};
    border-radius: 8px;

    > div:nth-of-type(7) {
      flex-direction: column;
      gap: 10px;

      @media (max-width: 480px) {
        gap: 2px;
      }
    }

    > button {
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      margin: 10px;
    }
  }
`;

const BlockFieldStyle = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    font-size: clamp(16px, 5vw, 20px);
    color: ${({ theme }) => theme.formContact.blockField.label};
  }

  input {
    max-width: 220px;
    height: 22px;
    width: 100%;
    border-radius: 10px;
    padding: 0 10px;
    outline-style: none;
    border: none;
    box-shadow: 0.5px 0.5px 3px 0
      ${({ theme }) => theme.formContact.blockField.input.shadow};
  }

  textarea {
    resize: none;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    overflow: auto;
    border-radius: 10px;
    outline-style: none;
    border: none;
    box-shadow: 0.5px 0.5px 3px 0
      ${({ theme }) => theme.formContact.blockField.textarea.shadow};
    margin-bottom: 2px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2px;
  }
`;

const ErrorMessageStyle = styled.div`
  color: ${({ theme }) => theme.formContact.errorMessage.text};
  height: 16px;
  font-size: 12px;
  margin-right: 10px;
  align-self: ${({ $textarea }) => ($textarea ? "center" : "flex-end")};

  @media (max-width: 480px) {
    align-self: ${({ $textarea }) => ($textarea ? "center" : "flex-start")};
    margin-left: ${({ $textarea }) => ($textarea ? "0" : "10px")};
    margin-right: 0;
    margin-top: 2px;
  }
`;

const MessageStyle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.formContact.message.text};

  span {
    font-size: clamp(14px, 2vw, 16px);
    text-shadow: 0 0 5px
      ${({ theme }) =>
        theme === darkTheme
          ? theme.formContact.message.span.shadow
          : "transparent"};
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
        <div>
          <BlockFieldStyle>
            <label htmlFor="form-contact-first-name">
              {t("formContact.label.firstName")}
            </label>
            <input
              type="text"
              id="form-contact-first-name"
              {...register("firstName", {
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
          </BlockFieldStyle>
          <ErrorMessageStyle>{errors.firstName?.message}</ErrorMessageStyle>
          <BlockFieldStyle>
            <label htmlFor="form-contact-last-name">
              {t("formContact.label.lastName")}
            </label>
            <input
              type="text"
              id="form-contact-last-name"
              {...register("lastName", {
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
          </BlockFieldStyle>
          <ErrorMessageStyle>{errors.lastName?.message}</ErrorMessageStyle>
          <BlockFieldStyle>
            <label htmlFor="email">{t("formContact.label.email")}</label>
            <input
              type="text"
              id="email"
              autocomplete="email"
              {...register("email", {
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
          </BlockFieldStyle>
          <ErrorMessageStyle>{errors.email?.message}</ErrorMessageStyle>
          <BlockFieldStyle>
            <label htmlFor="user-message">
              {t("formContact.label.textarea")}
            </label>
            <textarea
              id="user-message"
              placeholder={t("formContact.input.placeholder")}
              {...register("userMessage", {
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
          </BlockFieldStyle>
          <ErrorMessageStyle $textarea={true}>
            {errors.userMessage?.message}
          </ErrorMessageStyle>
          <ButtonForm
            type="submit"
            children={t("formContact.button")}
            disabled={isSubmitting}
          />
          <MessageStyle>
            <span>{responseMessage}</span>
          </MessageStyle>
        </div>
      </FormMessageSendStyle>
    </WrapperStyle>
  );
};
