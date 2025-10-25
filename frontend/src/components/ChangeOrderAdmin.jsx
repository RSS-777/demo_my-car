import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAllTariffs } from "../api/tariffApi";
import { changeStatusOrder, deleteOrderRequest } from "../api/orderApi";
import { StatusMessage } from "./StatusMessage";
import { generateTariffDates } from "../utils/generateTariffDates";
import { SelectField } from "../components/SelectField";
import { ButtonCard } from "../components/ButtonCard";
import styled from "styled-components";

const ContainerTableStyle = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
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
    text-align: center;
    padding: 5px;
  }
`;

const FilterStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ManagementGuideStyle = styled.div`
  margin-bottom: 20px;

  ul {
    margin: 10px auto 5px;
  }

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
    font-size: 22px;
  }
`;

const ChangeOrderAdmin = () => {
  const [restart, setRestart] = useState(false);
  const [message, setMessage] = useState("");
  const [requestData, setRequestData] = useState([]);
  const [filter, setFilter] = useState("all");
  const tokenAdmin = useSelector((state) => state.admin.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTariffs(tokenAdmin, t);

      if (response.success) {
        setRequestData(response.data);
      }
    };

    fetchData();
  }, [restart, tokenAdmin, t]);

  const sortData = useMemo(() => {
    return filter === "all"
      ? requestData
      : requestData.filter((elem) => elem.status === filter);
  }, [requestData, filter]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDeleteOrder = async (userId, orderCode) => {
    const data = { userId, orderCode };
    const response = await deleteOrderRequest(tokenAdmin, data, t);

    if (response.success) {
      setRestart((prev) => !prev);
    }
  };

  const handleChangeStatus = async (userId, status, month, tariff) => {
    const date = generateTariffDates(month);
    const data = {
      userId,
      status,
      startDate: date.startDate,
      endDate: date.endDate,
      tariff,
    };
    const userStatus = sortData.find((user) => user.user_id === userId)?.status;

    if (
      (status === "completed" && userStatus === "processing") ||
      (status === "processing" && userStatus === "confirmed")
    ) {
      showMessage(t("pages.admin.changeOrder.handleChangeStatus.sequence"));
      return;
    }

    if (userStatus === "completed") {
      showMessage(
        t("pages.admin.changeOrder.handleChangeStatus.orderComplete")
      );
      return;
    }

    if (date && data) {
      const response = await changeStatusOrder(tokenAdmin, data, t);
      showMessage(response.message);

      if (response.success) {
        setRestart((prev) => !prev);
      }
    }
  };

  return (
    <>
      <FilterStyle>
        <SelectField
          label={t("pages.admin.changeOrder.label")}
          id="change-order-admin"
          onChange={(e) => setFilter(e.target.value)}
          options={[
            { value: "all", label: t("pages.admin.changeOrder.option.all") },
            {
              value: "processing",
              label: t("pages.admin.changeOrder.option.processing"),
            },
            {
              value: "confirmed",
              label: t("pages.admin.changeOrder.option.confirmed"),
            },
            {
              value: "completed",
              label: t("pages.admin.changeOrder.option.completed"),
            },
          ]}
        />
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
                      <td>
                        {
                          <SelectField
                            name="status"
                            value={elem.status}
                            onChange={(e) =>
                              handleChangeStatus(
                                elem.user_id,
                                e.target.value,
                                elem.payment_months,
                                elem.tariff_change
                              )
                            }
                            options={[
                              {
                                value: "processing",
                                label: t(
                                  "pages.admin.changeOrder.option.processing"
                                ),
                              },
                              {
                                value: "confirmed",
                                label: t(
                                  "pages.admin.changeOrder.option.confirmed"
                                ),
                              },
                              {
                                value: "completed",
                                label: t(
                                  "pages.admin.changeOrder.option.completed"
                                ),
                              },
                            ]}
                          />
                        }
                      </td>
                      <td>
                        <ButtonCard
                          onClick={() =>
                            handleDeleteOrder(elem.user_id, elem.order_code)
                          }
                        >
                          {t("pages.admin.changeOrder.button")}
                        </ButtonCard>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableStyle>
          </ContainerTableStyle>
          <ManagementGuideStyle>
            <div>
              <h2>{t("pages.admin.changeOrder.managementGuide.status")}</h2>
              <ul>
                <li>
                  <span>{t("pages.admin.changeOrder.option.processing")}</span>{" "}
                  {t("pages.admin.changeOrder.managementGuide.li1")}
                </li>
                <li>
                  <span>{t("pages.admin.changeOrder.option.confirmed")}</span>{" "}
                  {t("pages.admin.changeOrder.managementGuide.li2")}
                </li>
                <li>
                  <span>{t("pages.admin.changeOrder.option.completed")}</span>{" "}
                  {t("pages.admin.changeOrder.managementGuide.li3")}
                </li>
              </ul>
            </div>
            <div>
              <h2>{t("pages.admin.changeOrder.managementGuide.options")}</h2>
              <ul>
                <li>
                  <span>
                    {t("pages.admin.changeOrder.managementGuide.delete")}
                  </span>{" "}
                  {t("pages.admin.changeOrder.managementGuide.deleteMessage")}
                </li>
              </ul>
            </div>
          </ManagementGuideStyle>
        </>
      ) : (
        <p>{t("pages.admin.changeOrder.notOrder")}</p>
      )}
      {message && <StatusMessage>{message}</StatusMessage>}
    </>
  );
};

export default ChangeOrderAdmin;
