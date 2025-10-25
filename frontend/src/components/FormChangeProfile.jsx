import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { useSelector } from "react-redux";
import { changeProfile } from "../api/api";
import { StatusMessage } from "./StatusMessage";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import { FileField } from "./FileField";
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

const FormChangeProfile = ({ userData, setUpdateNeeded }) => {
  const {
    first_name: firstName,
    last_name: lastName,
    person_image: personImage,
  } = userData;
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName,
      lastName,
    },
  });
  const [nameChoiseFile, setNameChoiseFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageSeccess, setMessageSeccess] = useState("");
  const token = useSelector((state) => state.user.token);
  const { t } = useTranslation();
  const selectedFile = watch("image");

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setNameChoiseFile(selectedFile[0].name);
    } else {
      if (personImage) {
        setNameChoiseFile(personImage);
      }
    }
  }, [selectedFile, personImage]);

  const onSubmit = async (data) => {
    const existingImagePath = personImage ? personImage : null;
    const fetchData = await changeProfile(token, data, existingImagePath, t);

    if (fetchData.success) {
      setErrorMessage("");
      setMessageSeccess(t("api.changeProfile.success"));
      setTimeout(() => setMessageSeccess(""), 2000);
      setUpdateNeeded(true);
      reset({
        firstName: fetchData.data?.first_name || data.firstName,
        lastName: fetchData.data?.last_name || data.lastName,
      });
    } else {
      setErrorMessage(fetchData.message);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          label={t("formRegistration.blockField.label.firstName")}
          type="text"
          id="first-name"
          autoComplete="given-name"
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
          id="last-name"
          autoComplete="family-name"
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
        <FileField
          nameFile={nameChoiseFile}
          nameInput={t("formAddCar.props.nameInput")}
          nameNotFile={t("formAddCar.props.nameNotFile")}
          label={t("formChangeProfile.label.image")}
          type="file"
          id="image"
          register={register("image")}
        />
        <InputError error={errors.image?.message} />
        <ButtonCard type="submit">{t("formChangeProfile.button")}</ButtonCard>
      </div>
      <StatusMessage>{errorMessage || messageSeccess}</StatusMessage>
    </FormStyle>
  );
};

export default FormChangeProfile;
