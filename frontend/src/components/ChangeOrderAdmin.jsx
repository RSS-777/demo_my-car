import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAllTariffs } from "../api/tariffApi";
import { changeStatusOrder } from "../api/orderApi";
import { deleteOrderRequest } from "../api/orderApi";
import { StatusMessage } from "./StatusMessage";
import { generateTariffDates } from "../utils/generateTariffDates";
import styled from "styled-components";

const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center:
    position: relative;
    width: 100%;
    max-width: 100%; 

    h5 {
       text-align: center;
       margin: 10px;
       color: ${({ theme }) => theme.changeOrderAdmin.h5};
    }

    p {
       color: ${({ theme }) => theme.changeOrderAdmin.text};
    }

    @media (max-width: 992px) {
         margin-top: 20px;
    }
`;

const ContainerTableStyle = styled.div`
    width: 100%;
    max-width: 100%; 
    overflow-x: auto;
`;

const TableStyle = styled.table`
    border: 2px solid ${({theme}) => theme.changeOrderAdmin.table.border};
    border-collapse: collapse;
    min-width: 500px;
  
    th {
        border: 2px solid black;
        color: ${({theme}) => theme.changeOrderAdmin.table.th};
    }

    td {
       border: 2px solid black;
       color: ${({theme}) => theme.changeOrderAdmin.table.td};
       text-align: center;
    }
`;

const ButtonStyle = styled.button`
    border-radius: 5px;
    background: ${({ theme }) => theme.changeOrderAdmin.button.background};
    color: ${({ theme }) => theme.changeOrderAdmin.button.text};
    box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.changeOrderAdmin.button.shadow};
    border: none;
    cursor: pointer;
    margin: 2px 5px;

    &:hover {
        background: ${({ theme }) => theme.changeOrderAdmin.button.hover.background};
        box-shadow: 0 0 3px 0 ${({ theme }) => theme.changeOrderAdmin.button.hover.shadow};
        color: ${({ theme }) => theme.changeOrderAdmin.button.hover.text};
    }
`;

const SelectStyle = styled.select`
    border-radius: 5px;
    background: ${({ theme }) => theme.changeOrderAdmin.select.background};
    color: ${({ theme }) => theme.changeOrderAdmin.select.text};
    box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.changeOrderAdmin.select.shadow};
    border: none;
    outline: none;
    cursor: pointer;
    text-align: center;
    margin: 2px 5px;

    &:hover {
        background: ${({ theme }) => theme.changeOrderAdmin.select.hover.background};
        box-shadow: 0 0 3px 0 ${({ theme }) => theme.changeOrderAdmin.select.hover.shadow};
        color: ${({ theme }) => theme.changeOrderAdmin.select.hover.text};
    }
`;

const FilterStyle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    label {
       color: ${({ theme }) => theme.changeOrderAdmin.filter.text};
    }
`;

const ManagementGuideStyle = styled.div`
    ul {
       margin: 10px auto 5px;
    } 

    li {
        color: ${({ theme }) => theme.changeOrderAdmin.list.li};
    }

    span {
       color: ${({ theme }) => theme.changeOrderAdmin.list.span};
    }
`;

const MessageStyle = styled.div`
  position: relative;
  min-height: 50px;
  width: 100%;
`;

const ChangeOrderAdmin = () => {
    const [restart, setRestart] = useState()
    const [message, setMessage] = useState()
    const [requestData, setRequestData] = useState([])
    const [sortData, setSortData] = useState([])
    const [filter, setFilter] = useState('all')
    const tokenAdmin = useSelector((state) => state.admin.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllTariffs(tokenAdmin, t)

            if (response.success) {
                setRequestData(response.data)
            }
        }

        fetchData()
    }, [restart])

    useEffect(() => {
        if (requestData) {
            if (filter === 'all') {
                setSortData(requestData)
            } else {
                const sortArr = requestData.filter(elem => elem.status === filter)
                setSortData(sortArr)
            }
        }
    }, [requestData, filter]);

    const handleDeleteOrder = async (userId, orderCode) => {
        const data = { userId, orderCode }
        const response = await deleteOrderRequest(tokenAdmin, data, t)

        if (response.success) {
            setRestart(prev => !prev)
        }
    };

    const handleChangeStatus = async (userId, status, month, tariff) => {
        const date = generateTariffDates(month)
        const data = { userId, status, startDate: date.startDate, endDate: date.endDate, tariff }
        const userStatus = sortData.find(user => user.user_id === userId)?.status;

        if (status === 'completed' && userStatus === 'processing') {
            setMessage(t("pages.admin.changeOrder.handleChangeStatus.sequence"))
            setTimeout(() => { setMessage('') }, 2000)
            return
        }
        if (status === 'processing' && userStatus === 'confirmed') {
            setMessage(t("pages.admin.changeOrder.handleChangeStatus.sequence"))
            setTimeout(() => { setMessage('') }, 2000)
            return
        }

        if (userStatus === 'completed') {
            setMessage(t("pages.admin.changeOrder.handleChangeStatus.orderComplete"))
            setTimeout(() => { setMessage('') }, 2000)
            return
        }

        if (date && data) {
            const response = await changeStatusOrder(tokenAdmin, data, t)
            setMessage(response.message)
            setTimeout(() => { setMessage('') }, 2000)

            if (response.success) {
                setRestart(prev => !prev)
            }
        }
    };

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.changeOrder.h5")}</h5>
            <FilterStyle>
                <label htmlFor="change-order-admin">{t("pages.admin.changeOrder.label")}</label>
                <SelectStyle id="change-order-admin" onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">{t("pages.admin.changeOrder.option.all")}</option>
                    <option value="processing">{t("pages.admin.changeOrder.option.processing")}</option>
                    <option value="confirmed">{t("pages.admin.changeOrder.option.confirmed")}</option>
                    <option value="completed">{t("pages.admin.changeOrder.option.completed")}</option>
                </SelectStyle>
            </FilterStyle>
            {sortData.length ? (
                <>
                    <ContainerTableStyle>
                        <TableStyle>
                            <thead>
                                <tr>
                                    <th>{t("pages.admin.changeOrder.th.1")}</th>
                                    <th>{t("pages.admin.changeOrder.th.2")}</th>
                                    <th>{t("pages.admin.changeOrder.th.3")}</th>
                                    <th>{t("pages.admin.changeOrder.th.4")}</th>
                                    <th>{t("pages.admin.changeOrder.th.5")}</th>
                                    <th>{t("pages.admin.changeOrder.th.6")}</th>
                                    <th>{t("pages.admin.changeOrder.th.7")}</th>
                                    <th>{t("pages.admin.changeOrder.th.8")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortData?.map((elem, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{elem.id}</td>
                                            <td>{elem.user_id}</td>
                                            <td>{elem.order_code}</td>
                                            <td>{elem.payment_months}</td>
                                            <td>{elem.amount_due}</td>
                                            <td>{elem.tariff_change}</td>
                                            <td>{
                                                <SelectStyle
                                                    name="status"
                                                    value={elem.status}
                                                    onChange={(e) => handleChangeStatus(elem.user_id, e.target.value, elem.payment_months, elem.tariff_change)}
                                                >
                                                    <option value="processing">{t("pages.admin.changeOrder.option.processing")}</option>
                                                    <option value="confirmed">{t("pages.admin.changeOrder.option.confirmed")}</option>
                                                    <option value="completed">{t("pages.admin.changeOrder.option.completed")}</option>
                                                </SelectStyle>
                                            }</td>
                                            <td><ButtonStyle onClick={() => handleDeleteOrder(elem.user_id, elem.order_code)}>{t("pages.admin.changeOrder.button")}</ButtonStyle></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </TableStyle>
                    </ContainerTableStyle>
                    <ManagementGuideStyle>
                        <div>
                            <h5>{t("pages.admin.changeOrder.managementGuide.status")}</h5>
                            <ul>
                                <li><span>{t("pages.admin.changeOrder.option.processing")}</span> {t("pages.admin.changeOrder.managementGuide.li1")}</li>
                                <li><span>{t("pages.admin.changeOrder.option.confirmed")}</span> {t("pages.admin.changeOrder.managementGuide.li2")}</li>
                                <li><span>{t("pages.admin.changeOrder.option.completed")}</span> {t("pages.admin.changeOrder.managementGuide.li3")}</li>
                            </ul>
                        </div>
                        <div>
                            <h5>{t("pages.admin.changeOrder.managementGuide.options")}</h5>
                            <ul>
                                <li><span>{t("pages.admin.changeOrder.managementGuide.delete")}</span> {t("pages.admin.changeOrder.managementGuide.deleteMessage")}</li>
                            </ul>
                        </div>
                    </ManagementGuideStyle>
                </>
            ) : (
                <p>{t("pages.admin.changeOrder.notOrder")}</p>
            )}
            <MessageStyle>
                <StatusMessage>{message}</StatusMessage>
            </MessageStyle>
        </ContainerStyle>
    )
};

export default ChangeOrderAdmin;