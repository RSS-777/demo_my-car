import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createVehicleRepair } from "../api/vehicleApi";
import { ButtonCard } from "./ButtonCard";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import styled from "styled-components";

const FormStyle = styled.form`
  h2 {
    margin: 20px;
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    gap: 10px;
    max-width: 300px;
    margin: 30px auto 0;

    button {
      margin: 10px auto 0;
    }

    @media (min-width: 580px) {
      max-width: 450px;
    }
  }
`;

const FormAddServiceRecord = ({ carId, type, setChangeHistory }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [messageServer, SetMessageServer] = useState(null);
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    const formData = { ...data, carId: carId };
    const response = await createVehicleRepair(formData, t);
    setChangeHistory((prev) => !prev);

    if (response.success) {
      SetMessageServer(response.message);
      reset();
      setTimeout(() => {
        SetMessageServer(null);
      }, 2000);
    } else {
      SetMessageServer(response.message);
      setTimeout(() => {
        SetMessageServer(null);
      }, 2000);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <h2>{t("pages.service.contentUserCar.listUserCars.p")}</h2>
      <div>
        <InputField
          type="number"
          id="record-serv-mileage"
          label={
            type === "bicycle"
              ? t("formAddServiceRecord.mileage.placeholder2")
              : t("formAddServiceRecord.mileage.placeholder")
          }
          register={register("mileage", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputField
          type="text"
          id="record-serv-operation"
          label={t("formAddServiceRecord.operationName")}
          register={register("operationName", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />

        <InputField
          type="text"
          id="record-serv-part"
          label={t("formAddServiceRecord.partName")}
          register={register("partName", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputField
          type="number"
          id="record-serv-price"
          label={t("formAddServiceRecord.price")}
          register={register("price", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputError
          error={
            errors.mileage?.message ||
            errors.operationName?.message ||
            errors.partName?.message ||
            errors.price?.message ||
            messageServer
          }
        />
        <ButtonCard type="submit">
          {t("formAddServiceRecord.button")}
        </ButtonCard>
      </div>
    </FormStyle>
  );
};

export default FormAddServiceRecord;
