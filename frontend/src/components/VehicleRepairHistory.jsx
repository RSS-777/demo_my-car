import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleRepair, deleteVehicleRepair } from "../api/vehicleApi";
import { useTranslation } from "react-i18next";
import { setRepair, deleteRepair } from "../store/repair/repairData";
import { setChangeRepair } from "../store/repair/changeRepairFlagSlice";
import { ButtonCard } from "./ButtonCard";
import { ButtonTabs } from "./ButtonTabs";
import styled from "styled-components";

const Container = styled.div`
  margin: 40px 10px 0;
`;

const TitleStyle = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.heading2};
`;

const TabsContainer = styled.div`
  overflow-x: auto;

  div {
    display: flex;
    gap: 5px;
    min-width: 300px;
    width: fit-content;
    margin: 20px auto 10px;
  }
`;

const TabContent = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.table.border};
  border-top: none;
  padding: 10px;
`;

const RepairItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.table.border};

  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0;
  }

  > div:last-child {
    text-align: right;
  }
`;

const RepairInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 20px;

  @media (min-width: 580px) {
    flex-direction: row;
  }
`;

const TotalCost = styled.div`
  margin-top: 15px;
  text-align: right;
  font-weight: bold;
`;

const NotHistoryStyle = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const VehicleRepairHistory = ({
  mileageUnit,
  carId,
  changeHistory,
  setChangeHistory,
}) => {
  const [dataRepair, setDataRepair] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const changeRepair = useSelector((state) => state.flag.value);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getVehicleRepair(carId, t);
      if (carId && response?.success) {
        setDataRepair(response.data);

        const sortedKeys = Array.from(
          new Set(response.data.map((r) => r.mileage || r.hours || "0"))
        ).sort((a, b) => Number(a) - Number(b));
        setActiveTab(String(sortedKeys[sortedKeys.length - 1]) || null);
      }
    };
    fetchData();
  }, [carId, changeHistory, changeRepair, t]);

  const handleDeleteRepair = async (repairId) => {
    const fetchData = await deleteVehicleRepair(repairId, t);
    if (fetchData) setChangeHistory((prev) => !prev);
  };

  const handleChangeRepair = (elem) => {
    dispatch(deleteRepair());
    dispatch(setChangeRepair(true));
    dispatch(setRepair(elem));
  };

  const groupedByMileage = dataRepair.reduce((acc, elem) => {
    const key = elem.mileage || elem.hours || "0";
    if (!acc[key]) acc[key] = [];
    acc[key].push(elem);
    return acc;
  }, {});

  const mileageKeys = Object.keys(groupedByMileage).sort(
    (a, b) => Number(a) - Number(b)
  );

  return (
    <Container>
      <TitleStyle>{t("pages.service.vehicle.title")}</TitleStyle>
      {dataRepair.length === 0 ? (
        <NotHistoryStyle>
          {t("pages.service.vehicle.messageNotHistory")}
        </NotHistoryStyle>
      ) : (
        <>
          <TabsContainer>
            <div>
              {mileageKeys.map((key) => (
                <ButtonTabs
                  key={key}
                  active={key === activeTab}
                  onClick={() => setActiveTab(key)}
                >
                  {key} {mileageUnit}
                </ButtonTabs>
              ))}
            </div>
          </TabsContainer>
          {mileageKeys.map(
            (key) =>
              key === activeTab && (
                <TabContent key={key}>
                  {groupedByMileage[key].map((r) => (
                    <RepairItem key={r.repair_id}>
                      <div>
                        <RepairInfo>
                          <strong>{r.operation_name}</strong>
                          <span>{r.part_name}</span>
                        </RepairInfo>
                        <Buttons>
                          <ButtonCard onClick={() => handleChangeRepair(r)}>
                            {t("pages.service.vehicle.tbody.buttonChange")}
                          </ButtonCard>
                          <ButtonCard
                            onClick={() => handleDeleteRepair(r.repair_id)}
                            variant="delete"
                          >
                            {t("pages.service.vehicle.tbody.buttonDelete")}
                          </ButtonCard>
                        </Buttons>
                      </div>
                      <div>
                        <small>{r.price}</small>
                      </div>
                    </RepairItem>
                  ))}
                  <TotalCost>
                    {t("pages.service.vehicle.tbody.totalCosts")}:{" "}
                    {groupedByMileage[key].reduce(
                      (sum, r) => sum + Number(r.price || 0),
                      0
                    )}
                  </TotalCost>
                </TabContent>
              )
          )}
        </>
      )}
    </Container>
  );
};

export default VehicleRepairHistory;