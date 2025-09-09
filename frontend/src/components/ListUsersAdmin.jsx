import { useState, useEffect } from "react";
import { getUsersList } from "../api/apiAdmin";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDateWithoutTime } from "../utils/formatDateWithoutTime";
import styled from 'styled-components';

const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center:
    position: relative;
    width: 100%;
    max-width: 100%; 
    overflow-x: auto;

    h5 {
       text-align: center;
       margin: 10px;
       color: ${({ theme }) => theme.listUsersAdmin.h5};
    }

    p {
        text-align: right;
        color: ${({ theme }) => theme.listUsersAdmin.p.text};

        span {
           color: ${({ theme }) => theme.listUsersAdmin.p.span};
        }
    }

    @media (max-width: 992px) {
        margin-top: 20px;
    }
`;

const TableStyle = styled.table`
    border-collapse: collapse;
    min-width: 500px;
  
    th {
        border: 2px solid ${({theme}) => theme.listUsersAdmin.table.border};
        color: ${({theme}) => theme.listUsersAdmin.table.th};
    }

    td {
       border: 2px solid ${({theme}) => theme.listUsersAdmin.table.border};
       color: ${({theme}) => theme.listUsersAdmin.table.td};
       text-align: center;
    }
`;

const ListUsersAdmin = () => {
    const [listUsers, setListUsers] = useState([])
    const tokenAdmin = useSelector((state) => state.admin.value)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            if (tokenAdmin) {
                const response = await getUsersList(tokenAdmin, t)

                if (response.success) {
                    setListUsers(response.users)
                }
            }
        }
        fetchData()
    }, [tokenAdmin])

    return (
        <ContainerStyle>
            <h5>{t("pages.admin.ul.li2")}</h5>
            <TableStyle>
                <thead>
                    <tr>
                        <th>{t("pages.admin.listUsers.id")}</th>
                        <th>{t("pages.admin.listUsers.email")}</th>
                        <th>{t("pages.admin.listUsers.tariff")}</th>
                        <th>{t("pages.admin.listUsers.startDate")}</th>
                        <th>{t("pages.admin.listUsers.endDate")}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers?.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.user_id}</td>
                            <td>{elem.email}</td>
                            <td>{elem.tariff}</td>
                            <td>{formatDateWithoutTime(elem.tariff_start_date)}</td>
                            <td>{formatDateWithoutTime(elem.tariff_end_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
            <p>{t("pages.admin.listUsers.numberOfUsers")} <span>{listUsers.length}</span></p>
        </ContainerStyle>
    )
};

export default ListUsersAdmin;