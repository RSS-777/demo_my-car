import { useState, useEffect } from "react";
import { getUsersList } from "../api/apiAdmin";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDateWithoutTime } from "../utils/formatDateWithoutTime";
import styled from "styled-components";

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  text-align: center;

  p {
    align-self: flex-end;
  }
`;

const TableStyle = styled.table`
  border-collapse: collapse;
  min-width: 500px;

  th {
    border: 2px solid ${({ theme }) => theme.colors.table.border};
    color: ${({ theme }) => theme.colors.table.th};
  }

  td {
    border: 2px solid ${({ theme }) => theme.colors.table.border};
    color: ${({ theme }) => theme.colors.table.td};
  }
`;

const ListUsersAdmin = () => {
  const [listUsers, setListUsers] = useState([]);
  const tokenAdmin = useSelector((state) => state.admin.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      if (tokenAdmin) {
        const response = await getUsersList(tokenAdmin, t);

        if (response.success) {
          setListUsers(response.users);
        }
      }
    };
    fetchData();
  }, [tokenAdmin]);

  return (
    <ContainerStyle>
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
      <p>
        {t("pages.admin.listUsers.numberOfUsers")} {listUsers.length}
      </p>
    </ContainerStyle>
  );
};

export default ListUsersAdmin;
