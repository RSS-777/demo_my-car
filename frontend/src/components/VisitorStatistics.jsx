import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getVisitStatistics } from "../api/statisticsApi";
import { StatusMessage } from "./StatusMessage";
import styled from "styled-components";

const TableStyle = styled.table`
  border-collapse: collapse;
  margin: auto;

  td,
  th {
    border: 2px solid ${({ theme }) => theme.colors.table.border};
    text-align: center;
    padding: 0 5px;
  }

  th {
    color: ${({ theme }) => theme.colors.table.th};
  }

  td {
    color: ${({ theme }) => theme.colors.table.td};
  }
`;

const VisitorStatistics = () => {
  const tokenAdmin = useSelector((state) => state.admin.value);
  const [fetchMessage, setFetchMessage] = useState("");
  const [dataStatistics, setDataStatistics] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const dataFetch = async () => {
      const response = await getVisitStatistics(tokenAdmin, t);

      if (response.success) {
        setDataStatistics(response.statistics);
      } else {
        setFetchMessage(response.message);
        setTimeout(() => setFetchMessage(""), 2000);
      }
    };

    dataFetch();
  }, []);

  return (
    <>
      <TableStyle>
        <thead>
          <tr>
            <th>{t("pages.admin.statistics.thead.th1")}</th>
            <th>{t("pages.admin.statistics.thead.th2")}</th>
            <th>{t("pages.admin.statistics.thead.th3")}</th>
          </tr>
        </thead>
        <tbody>
          {dataStatistics
            ?.sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date))
            .map((elem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(elem.visit_date).toLocaleDateString()}</td>
                <td>{elem.visit_count}</td>
              </tr>
            ))}
        </tbody>
      </TableStyle>
      {fetchMessage && <StatusMessage>{fetchMessage}</StatusMessage>}
    </>
  );
};

export default VisitorStatistics;
