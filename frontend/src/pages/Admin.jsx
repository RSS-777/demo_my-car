import { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { FormLoginAdmin } from "../components/FormLoginAdmin";
import { MaxWidthContainer } from "../components/MaxWidthContainer";
import { useSelector } from "react-redux";
import { deleteToken } from "../store/admin/adminSlice";
import { useDispatch } from "react-redux";
import { ButtonTabs } from "../components/ButtonTabs";
import styled from "styled-components";

const ListUsersAdmin = lazy(() => import("../components/ListUsersAdmin"));
const ChangeCostAdmin = lazy(() => import("../components/ChangeCostAdmin"));
const ChangePaymentAdmin = lazy(() =>
  import("../components/ChangePaymentAdmin")
);
const ChangeOrderAdmin = lazy(() => import("../components/ChangeOrderAdmin"));
const PaymentBlockMessage = lazy(() =>
  import("../components/PaymentBlockMessage")
);
const VisitorStatistics = lazy(() => import("../components/VisitorStatistics"));
const ChangeAdvertisingAdmin = lazy(() =>
  import("../components/ChangeAdvertisingAdmin")
);

const MainStyle = styled.main`
  padding: 20px 10px;
  display: flex;
  min-height: 100vh;
  align-items: center;
`;

const ContainerStyle = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.default};

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ContentSectionStyle = styled.section`
  width: 100%;
  max-width: 100%;
  padding: 25px 15px 15px;
  min-height: 450px;
`;

const TabsSectionStyle = styled.section`
  background-color: ${({ theme }) => theme.colors.background.cardPrimary};
  overflow-x: auto;
  padding: 10px;

  > div {
    display: flex;
    flex-direction: row;
    align-items: stetch;
    gap: 5px;
    min-width: 300px;
    width: fit-content;
    margin: 0;
  }

  @media (min-width: 992px) {
    overflow-x: initial;

    > div {
      flex-direction: column;
      min-width: auto;
      margin: 20px auto;

      button {
        border-radius: 5px;
      }
    }
  }
`;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("order");
  const tokenAdmin = useSelector((state) => state.admin.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOut = () => {
    dispatch(deleteToken());
  };

  const buttons = {
    order: t("pages.admin.ul.li1"),
    listUsers: t("pages.admin.ul.li2"),
    changeCost: t("pages.admin.ul.li3"),
    changeAdvertising: t("pages.admin.ul.li5"),
    blockAdvertisingMessage: t("pages.admin.ul.li6"),
    changePaymentInformation: t("pages.admin.ul.li4"),
    visitorStatistics: t("pages.admin.ul.li7"),
    handleOut: t("pages.admin.ul.out"),
  };

  return (
    <MainStyle $tokin={tokenAdmin ? true : false}>
      {tokenAdmin ? (
        <ContainerStyle>
          <TabsSectionStyle>
            <div>
              {Object.entries(buttons).map(([id, label]) => (
                <ButtonTabs
                  key={id}
                  active={id === activeTab}
                  onClick={() =>
                    id === "handleOut" ? handleOut() : setActiveTab(id)
                  }
                >
                  {label}
                </ButtonTabs>
              ))}
            </div>
          </TabsSectionStyle>
          <ContentSectionStyle>
            <MaxWidthContainer>
              <Suspense fallback={<div>Loading...</div>}>
                {activeTab === "order" && <ChangeOrderAdmin />}
                {activeTab === "listUsers" && <ListUsersAdmin />}
                {activeTab === "changeCost" && <ChangeCostAdmin />}
                {activeTab === "changeAdvertising" && (
                  <ChangeAdvertisingAdmin />
                )}
                {activeTab === "blockAdvertisingMessage" && (
                  <PaymentBlockMessage />
                )}
                {activeTab === "changePaymentInformation" && (
                  <ChangePaymentAdmin />
                )}
                {activeTab === "visitorStatistics" && <VisitorStatistics />}
              </Suspense>
            </MaxWidthContainer>
          </ContentSectionStyle>
        </ContainerStyle>
      ) : (
        <MaxWidthContainer>
          <FormLoginAdmin />
        </MaxWidthContainer>
      )}
    </MainStyle>
  );
};

export default Admin;
