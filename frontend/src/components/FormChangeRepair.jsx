import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateVehicleRepair } from "../api/vehicleApi";
import { setChangeRepair } from "../store/repair/changeRepairFlagSlice";
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
        border-radius: 5px;
        padding: 2px 5px;
        cursor: pointer;
        box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formChangeRepair.button.shadow};
        background: ${({ theme }) => theme.formChangeRepair.button.background};
        color: ${({ theme }) => theme.formChangeRepair.button.text};
        border: none;

        &:hover {
            box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.formChangeRepair.button.hover.shadow};
            background: ${({ theme }) => theme.formChangeRepair.button.hover.background};
            color: ${({ theme }) => theme.formChangeRepair.button.hover.text};
        }   
    }
`;

const FormStyle = styled.form`
    >div {
        display: flex;
        justify-content: center;
        gap: 5px;

        input {
            border-radius: 5px;
            border: none;
            padding: 2px 5px;
            outline-style: none;
            border: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formChangeRepair.form.input.shadow};
        }

        button {
            border-radius: 5px;
            padding: 2px 5px;
            cursor: pointer;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formChangeRepair.form.button.shadow};
            background: ${({ theme }) => theme.formChangeRepair.form.button.background};
            color: ${({ theme }) => theme.formChangeRepair.form.button.text};
            border: none;

             &:hover {
                box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.formChangeRepair.form.button.hover.shadow};
                background: ${({ theme }) => theme.formChangeRepair.form.button.hover.background};
                color: ${({ theme }) => theme.formChangeRepair.form.button.hover.text};
            }   
        }

        @media (max-width: 870px) {
            flex-direction: column;
            padding: 0 10px;

            input {
              margin: auto 25px;
            }

            button {
                margin: 0 auto;
                width: 60%;
            }
        }
    }
`;

const ErrorMessageStyle = styled.div`
    color: ${({ theme }) => theme.formChangeRepair.error.text};
    height: 16px;
    font-size: 12px;
    padding: 4px 10px 0;
    margin: 5px auto 10px;
`;

const FormChangeRepair = () => {
    const dataRepair = useSelector((state) => state.repair.value)
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
    const [messageServer, SetMessageServer] = useState(null)
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const dataRepairNew = { ...data, repairId: dataRepair.repair_id }
        const fetchData = await updateVehicleRepair(dataRepairNew, t)
        if (fetchData.success) {
            dispatch(setChangeRepair(false))
        } else {
            SetMessageServer(fetchData.message)
        }
    }

    return (
        <ContainerStyle>
            <FormStyle onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="number"
                        placeholder={t("formAddServiceRecord.mileage.placeholder3")}
                        defaultValue={dataRepair.mileage}
                        {...register('mileage', {
                            required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                        })}
                    />
                    <input
                        type="text"
                        placeholder={t("formAddServiceRecord.operationName")}
                        defaultValue={dataRepair.operation_name}
                        {...register('operationName', {
                            required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                        })}
                    />
                    <input
                        type="text"
                        placeholder={t("formAddServiceRecord.partName")}
                        defaultValue={dataRepair.part_name}
                        {...register('partName', {
                            required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                        })}
                    />
                    <input
                        type="text"
                        placeholder={t("formAddServiceRecord.price")}
                        defaultValue={dataRepair.price}
                        {...register('price', {
                            required: { value: true, message: t("formAddServiceRecord.mileage.required") },
                        })}
                    />
                    <button type="submit">{t("formAddServiceRecord.buttonChange")}</button>
                </div>
                <ErrorMessageStyle>{
                    errors.mileage?.message
                    || errors.operationName?.message
                    || errors.partName?.message
                    || errors.price?.message
                    || messageServer
                }</ErrorMessageStyle>
            </FormStyle>
            <button onClick={() => dispatch(setChangeRepair(false))}>{t("formAddServiceRecord.buttonCancel")}</button>
        </ContainerStyle>
    )
};

export default FormChangeRepair;