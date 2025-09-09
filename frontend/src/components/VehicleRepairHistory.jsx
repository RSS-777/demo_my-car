import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleRepair } from "../api/vehicleApi";
import { useTranslation } from "react-i18next";
import { setRepair, deleteRepair } from "../store/repair/repairData";
import { setChangeRepair } from "../store/repair/changeRepairFlagSlice";
import { deleteVehicleRepair } from "../api/vehicleApi";
import styled from "styled-components";

const TitleStyle = styled.p`
   color: ${({ theme }) => theme.vehicleRepairHistory.text};
`;

const ContainerStyle = styled.div`
   position: relative;
   margin: 0 auto 25px;
   padding: 0;
   overflow-x: auto;
`;

const TableStyle = styled.table`
    margin: 0 auto;
    border: 1px solid black;
    border-collapse: collapse;
    min-width: 500px;
    
    th {
       color: ${({ theme }) => theme.vehicleRepairHistory.table.th};
    }

    td {
       color: ${({ theme }) => theme.vehicleRepairHistory.table.td};

        button {
            border-radius: 5px;
            cursor: pointer;
            margin: 2px;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.vehicleRepairHistory.table.button.shadow};
            background: ${({ theme }) => theme.vehicleRepairHistory.table.button.background};
            color: ${({ theme }) => theme.vehicleRepairHistory.table.button.text};
            border: none;
                
            &:hover {
                background: ${({ theme }) => theme.vehicleRepairHistory.table.button.hover.background};
                color: ${({ theme }) => theme.vehicleRepairHistory.table.button.hover.text};
            }
        }
     }

    th, td {
       border: 2px solid ${({theme}) => theme.vehicleRepairHistory.table.border};
       padding: 3px;
     }

    td:last-child {
       white-space: nowrap;
    }
`;

const NotHistoryStyle = styled.p`
    padding: 0;
    margin: 0 auto;
    font-size: 12px;
    color: ${({ theme }) => theme.vehicleRepairHistory.notHistory.text};
`;

export const VehicleRepairHistory = ({ carIdAll, changeHistory, setChangeHistory }) => {
    const [dataRepair, setDataRepair] = useState([])
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const changeRepair = useSelector((state) => state.flag.value)

    useEffect(() => {
        const dataFetch = async () => {
            const response = await getVehicleRepair(carIdAll, t)

            if (carIdAll && response?.success) {
                setDataRepair(response.data)
            }
        }
        dataFetch()
    }, [carIdAll, changeHistory, changeRepair])

    const handleDeleteRepair = async (repairId) => {
        const fetchData = await deleteVehicleRepair(repairId, t)

        if (fetchData) {
            setChangeHistory(prev => !prev)
        }
    }

    const handleChangeRepair = (elem) => {
        dispatch(deleteRepair())
        dispatch(setChangeRepair(true))
        dispatch(setRepair(elem))
    }

    return (
        <>
            <TitleStyle>{t("pages.service.vehicle.title")}</TitleStyle>
            <ContainerStyle>
                {dataRepair.length !== 0 ? (
                    <TableStyle>
                        <thead>
                            <tr>
                                <th>{t("pages.service.vehicle.thead.th")}</th>
                                {Array.from(new Set(dataRepair.map((elem) => Number(elem.mileage))))
                                    .sort((a, b) => a - b)
                                    .map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                <th>{t("pages.service.vehicle.thead.th2")}</th>
                                <th>{t("pages.service.vehicle.thead.th3")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(
                                new Set(dataRepair.map((elem) => elem.operation_name))
                            ).map((operation, index) => (
                                <tr key={index}>
                                    <td>{operation}</td>
                                    {Array.from(new Set(dataRepair.map((elem) => Number(elem.mileage))))
                                        .sort((a, b) => a - b)
                                        .map((header) => {
                                            const parts = dataRepair
                                                .filter(
                                                    (elem) =>
                                                        Number(elem.mileage) === header &&
                                                        elem.operation_name === operation
                                                ).map((repair, ind) => <div key={ind}>{repair.part_name}</div>);
                                            return (
                                                <td key={`${operation}-${header}`}>
                                                    {parts.length ? parts : '-'}
                                                </td>
                                            );
                                        })}
                                    <td>
                                        {dataRepair
                                            .filter((elem) => elem.operation_name === operation)
                                            .reduce((sum, curr) => sum + curr.price, 0)
                                        }
                                    </td>
                                    <td>
                                        {dataRepair
                                            .filter((elem) => elem.operation_name === operation)
                                            .map((elem, index) => {
                                                return (
                                                    < div key={index} >
                                                        <span>{elem.mileage}{':'}</span>
                                                        <button onClick={() => handleDeleteRepair(elem.repair_id)}>{t("pages.service.vehicle.tbody.buttonDelete")}</button>
                                                        <button onClick={() => handleChangeRepair(elem)}>{t("pages.service.vehicle.tbody.buttonChange")}</button>
                                                    </ div>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={Array.from(new Set(dataRepair.map((elem) => Number(elem.mileage)))).length + 1}>
                                    <strong>{t("pages.service.vehicle.tbody.totalCosts")}</strong>
                                </td>
                                <td>
                                    <strong>
                                        {dataRepair.reduce((acc, elem) => acc + elem.price, 0)}
                                    </strong>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </TableStyle>
                ) : (
                    <NotHistoryStyle>
                        {dataRepair.length === 0 &&
                            t("pages.service.vehicle.messageNotHistory")
                        }
                    </NotHistoryStyle>
                )}
            </ContainerStyle >
        </>
    )
};
