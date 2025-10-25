import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/Header";
import { MaxWidthContainer } from "../components/MaxWidthContainer";
import { formatDateWithoutTime } from "../utils/formatDateWithoutTime";
import { getUserData } from "../api/api";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  clearToken,
  setName,
  deleteName,
  clearTariff,
} from "../store/user/userSlice";
import { ButtonTabs } from "../components/ButtonTabs";
import { Button } from "../components/Button";
import personImage from "../assets/images/icons/person.png";

const FormChangeProfile = lazy(() => import("../components/FormChangeProfile"));
const FormChangePassword = lazy(() =>
  import("../components/FormChangePassword")
);
const FormChangeTariff = lazy(() => import("../components/FormChangeTariff"));
const Order = lazy(() => import("../components/Order"));
const FormDeleteUser = lazy(() => import("../components/FormDeleteUser"));

const MainStyle = styled.main`
  padding: 40px 10px;
`;

const BlockUserInfoStyle = styled.div`
  text-align: center;

  p {
    margin: 0;
  }

  span {
    margin-left: 5px;
    font-weight: 500;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.mistake};
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const BlockButtonStyle = styled.div`
  width: 100%;
  margin-top: 15px;
  text-align: center;
`;
const DataStyle = styled.span`
  color: ${({ theme }) => theme.colors.text.mistake};
`;

const TabsContainerStyle = styled.section`
  overflow-x: auto;

  > div {
    display: flex;
    gap: 5px;
    min-width: 300px;
    width: fit-content;
    margin: 20px auto 10px;
  }
`;

const TabContentStyle = styled.section`
  max-width: 100%;

  border-radius: 8px;
  padding: 20px 0;
`;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [activeTab, setActiveTab] = useState("changeProfile");
  const token = useSelector((state) => state.user.token);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUserData(token, t);

      if (dataUser && dataUser.data) {
        setUserData(dataUser.data);
        dispatch(setName(dataUser?.data.first_name));
      }
      setUpdateNeeded(false);
    };
    fetchData();
  }, [token, updateNeeded]);

  const handleOut = () => {
    dispatch(clearToken());
    dispatch(deleteName());
    dispatch(clearTariff());
  };

  const tariffButtonKey =
    userData?.status === "processing" || userData?.status === "confirmed"
      ? "infoOrder"
      : "changeTariff";

  const buttons = {
    changeProfile: t("pages.userDashboard.button.changeProfile"),
    changePassword: t("pages.userDashboard.button.changePassword"),
    [tariffButtonKey]:
      tariffButtonKey === "infoOrder"
        ? t("pages.userDashboard.button.order")
        : t("pages.userDashboard.button.changeTariff"),
    deleteUser: t("pages.userDashboard.button.delete"),
  };

  return (
    <>
      <Header
        title={`${userData?.first_name} ${userData?.last_name}`}
        subtitle={`${t("pages.userDashboard.tariff")} ${
          userData?.tariff === "basic"
            ? t("pages.home.tariffsSection.cards.card1.title")
            : userData?.tariff === "family"
            ? t("pages.home.tariffsSection.cards.card2.title")
            : userData?.tariff === "business"
            ? t("pages.home.tariffsSection.cards.card3.title")
            : ""
        }`}
        imagePath={
          userData?.person_image ? userData?.person_image : personImage
        }
        alt="Icon person"
      >
        <BlockUserInfoStyle>
          {userData?.status === "completed" && (
            <p>
              {t("pages.userDashboard.blockUser.period")}{" "}
              {t("pages.userDashboard.blockUser.start")}
              <DataStyle>
                {formatDateWithoutTime(userData?.tariff_start_date)}
              </DataStyle>{" "}
              {t("pages.userDashboard.blockUser.end")}
              <DataStyle>
                {formatDateWithoutTime(userData?.tariff_end_date)}
              </DataStyle>
            </p>
          )}
          {userData?.tariff_change && userData?.status !== "completed" && (
            <p>
              {t("pages.userDashboard.blockUser.orderTariff")}
              <span>
                {userData?.tariff_change === "basic" &&
                  t("pages.home.tariffsSection.cards.card1.title")}
                {userData?.tariff_change === "family" &&
                  t("pages.home.tariffsSection.cards.card2.title")}
                {userData?.tariff_change === "business" &&
                  t("pages.home.tariffsSection.cards.card3.title")}
              </span>
            </p>
          )}
          {userData?.tariff_change && userData?.status === "processing" && (
            <p>
              <strong>
                {t("pages.userDashboard.blockUser.importantWaiting")}
              </strong>
            </p>
          )}
          {(userData?.status === "processing" ||
            userData?.status === "confirmed") && (
            <p>
              {t("pages.userDashboard.blockUser.status.text")}
              {userData?.status === "processing" ? (
                <span>
                  {t("pages.userDashboard.blockUser.status.processing")}
                </span>
              ) : (
                <span>
                  {t("pages.userDashboard.blockUser.status.confirmed")}
                </span>
              )}
            </p>
          )}
          {userData?.status === "completed" && (
            <p>
              <strong>
                {t("pages.userDashboard.blockUser.infoCompleteTariff")}
              </strong>
            </p>
          )}
        </BlockUserInfoStyle>
        <BlockButtonStyle>
          <Button variant="header" onClick={handleOut}>
            {t("pages.userDashboard.button.out")}
          </Button>
        </BlockButtonStyle>
      </Header>
      <MainStyle>
        <MaxWidthContainer>
          <TabsContainerStyle>
            <div>
              {Object.entries(buttons).map(([id, label]) => (
                <ButtonTabs
                  key={id}
                  active={id === activeTab}
                  onClick={() => setActiveTab(id)}
                  disabled={
                    (id === "infoOrder" && userData?.status === "confirmed") ||
                    (id === "changeTariff" && userData?.status === "completed")
                  }
                >
                  {label}
                </ButtonTabs>
              ))}
            </div>
          </TabsContainerStyle>
          <Suspense fallback={<div>Loading...</div>}>
            {userData && (
              <TabContentStyle>
                {activeTab === "deleteUser" && <FormDeleteUser token={token} />}
                {activeTab === "changeProfile" && (
                  <FormChangeProfile
                    userData={userData}
                    setUpdateNeeded={setUpdateNeeded}
                  />
                )}
                {activeTab === "changePassword" && (
                  <FormChangePassword token={token} />
                )}
                {activeTab === "changeTariff" && (
                  <FormChangeTariff
                    token={token}
                    orderCode={userData.order_code}
                    setUpdateNeeded={setUpdateNeeded}
                    setActiveTab={setActiveTab}
                  />
                )}
                {activeTab === "infoOrder" && (
                  <Order
                    token={token}
                    generateCodeRandom={userData.order_code}
                    paymentNumbMonths={userData.payment_months}
                    amountDue={userData.amount_due}
                    setUpdateNeeded={setUpdateNeeded}
                    setActiveTab={setActiveTab}
                  />
                )}
              </TabContentStyle>
            )}
          </Suspense>
        </MaxWidthContainer>
      </MainStyle>
    </>
  );
};

export default UserDashboard;
