import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createVehicleRepair } from "../api/vehicleApi";
import styled from "styled-components";

const FormStyle = styled.form`
    >div {
        display: flex;
        justify-content: center;
        gap: 5px;

        input {
            border-radius: 5px;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formAddServiceRecord.input.shadow};
            padding: 2px 5px;
            outline-style: none;
        }

        button {
            border-radius: 5px;
            padding: 2px 5px;
            cursor: pointer;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formAddServiceRecord.button.shadow};
            background: ${({ theme }) => theme.formAddServiceRecord.button.background};
            color: ${({ theme }) => theme.formAddServiceRecord.button.text};
            border: none;

            &:hover {
                box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.formAddServiceRecord.button.hover.shadow};
                background: ${({ theme }) => theme.formAddServiceRecord.button.hover.background};
                color: ${({ theme }) => theme.formAddServiceRecord.button.hover.text};
            }   
        }

        @media (max-width: 870px) {
            flex-direction: column;
            padding: 0 10px;

            button {
                margin: 0 auto;
            }
        }
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formAddServiceRecord.errorMessage.text};
    height: 16px;
    font-size: 12px;
    padding: 4px 10px 0;
`;

export const FormAddServiceRecord = ({ carId, type, setChangeHistory }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
    const [messageServer, SetMessageServer] = useState(null)
    const { t } = useTranslation();

    const onSubmit = async (data) => {
        const formData = { ...data, carId: carId }
        const response = await createVehicleRepair(formData, t)
        setChangeHistory(prev => !prev)

        if (response.success) {
            SetMessageServer(response.message)
            reset()
            setTimeout(() => { SetMessageServer(null) }, 2000)
        } else {
            SetMessageServer(response.message)
            setTimeout(() => { SetMessageServer(null) }, 2000)
        }
    };

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="number"
                    placeholder={type === "bicycle" ? t("formAddServiceRecord.mileage.placeholder2") : t("formAddServiceRecord.mileage.placeholder")}
                    {...register('mileage', {
                        required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                    })}
                />
                <input
                    type="text"
                    placeholder={t("formAddServiceRecord.operationName")}
                    {...register('operationName', {
                        required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                    })}
                />
                <input
                    type="text"
                    placeholder={t("formAddServiceRecord.partName")}
                    {...register('partName', {
                        required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                    })}
                />
                <input
                    type="number"
                    placeholder={t("formAddServiceRecord.price")}
                    {...register('price', {
                        required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                    })}
                />
                <button type="submit">{t("formAddServiceRecord.button")}</button>
            </div>
            <ErrorMessageStyle>{
                errors.mileage?.message
                || errors.operationName?.message
                || errors.partName?.message
                || errors.price?.message
                || messageServer
            }</ErrorMessageStyle>
        </FormStyle>
    )
}; 