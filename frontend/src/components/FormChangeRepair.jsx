import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateVehicleRepair } from "../api/vehicleApi";
import { setChangeRepair } from "../store/repair/changeRepairFlagSlice";
import { ButtonCard } from "./ButtonCard";
import { InputField } from "./InputField";
import { InputError } from "./InputError";
import styled from "styled-components";

const ContainerStyle = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  width: 100vw;

  >button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 300px;
  margin: auto;

  button {
    width: 60%;
    margin: 10px auto;
  }

  @media (min-width: 580px) {
    max-width: 450px;
  }
`;

export const FormChangeRepair = () => {
  const dataRepair = useSelector((state) => state.repair.value);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [messageServer, SetMessageServer] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const dataRepairNew = { ...data, repairId: dataRepair.repair_id };
    const fetchData = await updateVehicleRepair(dataRepairNew, t);
    if (fetchData.success) {
      dispatch(setChangeRepair(false));
    } else {
      SetMessageServer(fetchData.message);
    }
  };

  return (
    <ContainerStyle>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="number"
          label={t("formAddServiceRecord.mileage.placeholder3")}
          defaultValue={dataRepair.mileage}
          register={register("mileage", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputField
          type="text"
          label={t("formAddServiceRecord.operationName")}
          defaultValue={dataRepair.operation_name}
          register={register("operationName", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputField
          type="text"
          label={t("formAddServiceRecord.partName")}
          defaultValue={dataRepair.part_name}
          register={register("partName", {
            required: {
              value: true,
              message: t("formAddServiceRecord.mileage.required"),
            },
          })}
        />
        <InputField
          type="text"
          label={t("formAddServiceRecord.price")}
          defaultValue={dataRepair.price}
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
          {t("formAddServiceRecord.buttonChange")}
        </ButtonCard>
      </FormStyle>
      <ButtonCard onClick={() => dispatch(setChangeRepair(false))}>
        {t("formAddServiceRecord.buttonCancel")}
      </ButtonCard>
    </ContainerStyle>
  );
};
