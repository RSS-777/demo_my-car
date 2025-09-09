import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { FormLoginAdmin } from "../components/FormLoginAdmin";
import { MaxWidthContainer } from "../components/MaxWidthContainer";
import { useSelector } from "react-redux";
import { deleteToken } from "../store/admin/adminSlice";
import { useDispatch } from "react-redux";

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

import styled, { keyframes } from "styled-components";
import settingCoralImage from "../assets/images/icons/mySettingsCoral.png";
import settingDarkGreenImage from "../assets/images/icons/mySettingsDarkGreen.png";
import settingGreenImage from "../assets/images/icons/mySettingsGreen.png";
import settingWhiteImage from "../assets/images/icons/mySettingsWhite.png";

const animationRotate = keyframes`
   0% {
      transform: rotateZ(0deg);
   }
   100% {
      transform: rotateZ(360deg);
   }
`;

const MainStyle = styled.main`
  position: relative;
  background: ${({ theme }) => theme.pages.admin.background};
  min-height: calc(100vh - 67px);
  padding: 20px;
  display: flex;
  align-items: center;
`;

const ContainerStyle = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0.5px 0.5px 3px 0
    ${({ theme }) => theme.pages.admin.container.shadow};
  background-color: ${({ theme }) => theme.pages.admin.container.background};
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ImageSetingOpenStyle = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  display: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  animation: ${animationRotate} 5s linear infinite;

  @media (max-width: 992px) {
    display: block;
    z-index: 4;
  }
`;

const TabsStyle = styled.div`
  width: 280px;
  min-width: 170px;
  background: ${({ theme }) => theme.pages.admin.tabs.background};
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  transition: top 1s ease;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 210px;

    li {
      position: relative;
      color: ${({ theme }) => theme.pages.admin.tabs.li.text};
      cursor: pointer;
      display: inline-block;
      margin-bottom: 10px;
      border-bottom: 2px solid transparent;
      width: fit-content;

      &.active {
        color: ${({ theme }) => theme.pages.admin.tabs.li.active.text};
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        transform-origin: center;
        display: block;
        width: 80%;
        height: 1.5px;
        background-color: ${({ theme }) =>
          theme.pages.admin.tabs.li.after.background};
        transition: transform 0.3s ease;
      }

      &:hover::after {
        transform: translateX(-50%) scaleX(1);
      }
    }
  }

  @media (max-width: 992px) {
    width: 100%;
    max-width: 100%;
    position: absolute;
    top: ${({ $openBlock }) => ($openBlock ? "0" : "-240px")};
    z-index: 3;
    border-radius: 0 0 10px 10px;
    box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.pages.admin.tabs.shadow};

    ul {
      align-items: center;

      li {
        margin-bottom: 5px;
      }
    }
  }
`;

const ContentStyle = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 15px;
  min-height: 450px;
`;

const LoadingMessageStyle = styled.div`
  text-align: center;
  color: black;
`;

const Admin = () => {
  const [selectTabs, setSelectTabs] = useState("order");
  const [openBlock, setOpenBlock] = useState(false);
  const [src, setSrc] = useState(settingDarkGreenImage);
  const tokenAdmin = useSelector((state) => state.admin.value);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelectTabs = (value) => {
    setOpenBlock(false);
    if (value === "order") setSelectTabs("order");
    if (value === "listUsers") setSelectTabs("listUsers");
    if (value === "changeCost") setSelectTabs("changeCost");
    if (value === "changeAdvertising") setSelectTabs("changeAdvertising");
    if (value === "blockAdvertisingMessage")
      setSelectTabs("blockAdvertisingMessage");
    if (value === "changePaymentInformation")
      setSelectTabs("changePaymentInformation");
    if (value === "visitorStatistics") setSelectTabs("visitorStatistics");
  };

  useEffect(() => {
    if (openBlock) {
      setSrc(theme === "dark" ? settingCoralImage : settingGreenImage);
    } else {
      setSrc(theme === "dark" ? settingWhiteImage : settingDarkGreenImage);
    }
  }, [theme, openBlock]);

  useEffect(() => {
    if (!openBlock) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenBlock(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openBlock]);

  const handleOpenSetting = () => {
    setOpenBlock((prev) => !prev);
  };

  const handleOut = () => {
    dispatch(deleteToken());
  };

  const handleMouseOver = () => {
    if (!openBlock) {
      setSrc(theme === "dark" ? settingCoralImage : settingGreenImage);
    }
  };

  const handleMouseOut = () => {
    if (!openBlock) {
      setSrc(theme === "dark" ? settingWhiteImage : settingDarkGreenImage);
    }
  };

  return (
    <MainStyle>
      {tokenAdmin ? (
        <ContainerStyle>
          <ImageSetingOpenStyle
            ref={buttonRef}
            className="setting-button"
            src={src}
            alt="Image setting"
            onClick={handleOpenSetting}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          <TabsStyle $openBlock={openBlock} ref={menuRef} className="tabs-menu">
            <ul>
              <li
                onClick={() => handleSelectTabs("order")}
                className={selectTabs === "order" ? "active" : ""}
              >
                {t("pages.admin.ul.li1")}
              </li>
              <li
                onClick={() => handleSelectTabs("listUsers")}
                className={selectTabs === "listUsers" ? "active" : ""}
              >
                {t("pages.admin.ul.li2")}
              </li>
              <li
                onClick={() => handleSelectTabs("changeCost")}
                className={selectTabs === "changeCost" ? "active" : ""}
              >
                {t("pages.admin.ul.li3")}
              </li>
              <li
                onClick={() => handleSelectTabs("changeAdvertising")}
                className={selectTabs === "changeAdvertising" ? "active" : ""}
              >
                {t("pages.admin.ul.li5")}
              </li>
              <li
                onClick={() => handleSelectTabs("blockAdvertisingMessage")}
                className={
                  selectTabs === "blockAdvertisingMessage" ? "active" : ""
                }
              >
                {t("pages.admin.ul.li6")}
              </li>
              <li
                onClick={() => handleSelectTabs("changePaymentInformation")}
                className={
                  selectTabs === "changePaymentInformation" ? "active" : ""
                }
              >
                {t("pages.admin.ul.li4")}
              </li>
              <li
                onClick={() => handleSelectTabs("visitorStatistics")}
                className={selectTabs === "visitorStatistics" ? "active" : ""}
              >
                {t("pages.admin.ul.li7")}
              </li>
              <li onClick={handleOut}>{t("pages.admin.ul.out")}</li>
            </ul>
          </TabsStyle>
          <ContentStyle>
            <Suspense
              fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}
            >
              {selectTabs === "order" && <ChangeOrderAdmin />}
              {selectTabs === "listUsers" && <ListUsersAdmin />}
              {selectTabs === "changeCost" && <ChangeCostAdmin />}
              {selectTabs === "changeAdvertising" && <ChangeAdvertisingAdmin />}
              {selectTabs === "blockAdvertisingMessage" && (
                <PaymentBlockMessage />
              )}
              {selectTabs === "changePaymentInformation" && (
                <ChangePaymentAdmin />
              )}
              {selectTabs === "visitorStatistics" && <VisitorStatistics />}
            </Suspense>
          </ContentStyle>
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
