import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/Header";
import { MaxWidthContainer } from "../components/MaxWidthContainer";

const FormChangeProfile = lazy(() => import("../components/FormChangeProfile"));
const FormChangePassword = lazy(() => import("../components/FormChangePassword"));
const FormChangeTariff = lazy(() => import("../components/FormChangeTariff"));
const Order = lazy(() => import("../components/Order"));
const FormDeleteUser = lazy(() => import("../components/FormDeleteUser"));

import {
  clearToken,
  setName,
  deleteName,
  clearTariff,
} from "../store/user/userSlice";
import { formatDateWithoutTime } from "../utils/formatDateWithoutTime";
import { getUserData } from "../api/api";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

import personImage from "../assets/images/icons/person.png";
import registrationImage from "../assets/images/registration/registrationFone.jpg";
import settingCoralImage from "../assets/images/icons/mySettingsCoral.png";
import settingGreenImage from "../assets/images/icons/mySettingsGreen.png";
import settingDarkGreenImage from "../assets/images/icons/mySettingsDarkGreen.png";
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
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
  margin: 0;
  background-image: url(${registrationImage});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 80px 20px;
  min-height: 500px;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) =>
      theme.pages.userDashboard.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    background-image: radial-gradient(
      transparent,
      ${({ theme }) => theme.pages.userDashboard.after.backgroundImage}
    );
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`;

const FlexContainerStyle = styled.div`
  position: relative;
  z-index: 3;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  box-shadow: 0.5px 0.5px 3px 0
    ${({ theme }) => theme.pages.userDashboard.flexContainer.shadow};
  background-color: ${({ theme }) =>
    theme.pages.userDashboard.flexContainer.background};
  border-radius: 10px;
`;

const SectionSettingStyle = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  img {
    position: relative;
    display: none;
    width: 30px;
    margin-left: 5px;
    margin-top: 5px;
    cursor: pointer;
    animation: ${animationRotate} 5s linear infinite;
  }

  > nav {
    transition: top 1s ease;
    display: flex;
    gap: 10px;

    button {
      border-radius: 6px;
      padding: 2px 5px;
      background: ${({ theme }) =>
        theme.pages.userDashboard.sectionSetting.button.background};
      color: ${({ theme }) =>
        theme.pages.userDashboard.sectionSetting.button.text};
      box-shadow: 1px 1px 4px 0
        ${({ theme }) => theme.pages.userDashboard.sectionSetting.button.shadow};
      border: none;
      cursor: pointer;

      &.disabled {
        background-color: ${({ theme }) =>
          theme.pages.userDashboard.sectionSetting.button.disabled.background};
        color: ${({ theme }) =>
          theme.pages.userDashboard.sectionSetting.button.disabled.text};
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
      }

      &:hover {
        background: ${({ theme }) =>
          theme.pages.userDashboard.sectionSetting.button.hover.background};
        box-shadow: 0 0 2px 0
          ${({ theme }) =>
            theme.pages.userDashboard.sectionSetting.button.hover.shadow};
        color: ${({ theme }) =>
          theme.pages.userDashboard.sectionSetting.button.hover.text};
      }
    }
  }

  @media (max-width: 678px) {
    justify-content: flex-start;
    margin-top: 0;

    img {
      display: block;
      z-index: 4;
    }

    nav {
      position: absolute;
      z-index: 3;
      top: ${(props) => (props.$openBlock ? "0" : "-200px")};
      flex-direction: column;
      align-items: center;
      box-shadow: 2px 2px 8px 0
        ${({ theme }) => theme.pages.userDashboard.sectionSetting.nav.shadow};
      clip-path: inset(0 0 -10px 0);
      border-radius: 0 0 8px 8px;
      background: ${({ theme }) =>
        `linear-gradient(to bottom, transparent, ${theme.pages.userDashboard.sectionSetting.nav.background})`};
      padding: 20px 10px;
      width: 100%;

      button {
        width: 70%;
      }
    }
  }
`;

const SectionInfoStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BlockImageStyle = styled.div`
  max-width: 180px;

  img {
    width: 100%;
    max-width: 100%;
  }
`;

const BlockUserInfo = styled.div`
  h3 {
    color: ${({ theme }) => theme.pages.userDashboard.blockUser.h3};
    font-size: clamp(24px, 5vw, 38px);
    margin: 20px auto 10px;
  }

  span {
    color: ${({ theme }) => theme.pages.userDashboard.blockUser.span};
    margin-left: 5px;
  }

  > div {
    > p {
      font-size: clamp(14px, 2vw, 18px);
      margin: 10px;
      color: ${({ theme }) => theme.pages.userDashboard.blockUser.p};
    }
  }
`;

const BlockImportantInfo = styled.div`
  > p {
    font-size: clamp(14px, 2vw, 18px);
    color: ${({ theme }) => theme.pages.userDashboard.blockImportant.p};

    strong {
      color: ${({ theme }) => theme.pages.userDashboard.blockImportant.strong};
    }

    span {
      color: ${({ theme }) => theme.pages.userDashboard.blockImportant.span};
    }
  }
`;

const SectionChangeProfile = styled.section`
  position: relative;
  z-index: 3;
  max-width: 100%;
  box-shadow: 0.5px 0.5px 3px 0
    ${({ theme }) => theme.pages.userDashboard.sectionChange.shadow};
  background: ${({ theme }) =>
    theme.pages.userDashboard.sectionChange.background};
  border-radius: 8px;
  padding: 20px;
`;

const DataStyle = styled.span`
  color: ${({ theme }) => theme.pages.userDashboard.data.text};
`;

const LoadingMessageStyle = styled.div`
  text-align: center;
  color: black;
`;

const UserDashboard = () => {
  const [openBlock, setOpenBlock] = useState(false);
  const [openChangeProfile, setOpenChangeProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeTariff, setOpenChangeTariff] = useState(false);
  const [openInfoOrder, setOpenInfoOrder] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [src, setSrc] = useState(settingDarkGreenImage);
  const theme = useSelector((action) => action.theme.value);
  const token = useSelector((state) => state.user.token);
  const imageRef = useRef(null);
  const navigationRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openBlock) {
      setSrc(theme === "dark" ? settingCoralImage : settingGreenImage);
    } else {
      setSrc(theme === "dark" ? settingWhiteImage : settingDarkGreenImage);
    }
  }, [theme, openBlock]);

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUserData(token, t);

      if (dataUser && dataUser.data) {
        setUserData(dataUser.data);
        dispatch(setName(dataUser.data.first_name));
      }
    };
    fetchData();
  }, [
    token,
    openChangeProfile,
    openChangePassword,
    openChangeTariff,
    openInfoOrder,
    openDeleteUser,
    updateNeeded,
  ]);

  useEffect(() => {
    if (!openBlock) return;

    const handleClickOutside = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target) &&
        imageRef.current &&
        !imageRef.current.contains(event.target)
      ) {
        setOpenBlock(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openBlock]);

  const handleOut = () => {
    dispatch(clearToken());
    dispatch(deleteName());
    dispatch(clearTariff());
  };

  const handleDeleteProfile = () => {
    setOpenDeleteUser((prev) => !prev);
    setOpenChangeProfile(false);
    setOpenInfoOrder(false);
    setOpenChangePassword(false);
    setOpenChangeTariff(false);
  };

  const handleChangeProfile = () => {
    setOpenChangeProfile((prev) => !prev);
    setOpenChangePassword(false);
    setOpenChangeTariff(false);
    setOpenInfoOrder(false);
    setOpenDeleteUser(false);
  };

  const handleChangePassword = () => {
    setOpenChangePassword((prev) => !prev);
    setOpenChangeProfile(false);
    setOpenChangeTariff(false);
    setOpenInfoOrder(false);
    setOpenDeleteUser(false);
  };

  const handleChangeTariff = () => {
    setOpenChangeTariff((prev) => !prev);
    setOpenInfoOrder(false);
    setOpenChangeProfile(false);
    setOpenChangePassword(false);
    setOpenDeleteUser(false);
  };

  const handleOrder = () => {
    setOpenInfoOrder((prev) => !prev);
    setOpenChangeTariff(false);
    setOpenChangeProfile(false);
    setOpenChangePassword(false);
    setOpenDeleteUser(false);
  };

  const handleOpenSetting = () => {
    setOpenBlock((prev) => !prev);
  };

  const handleCloseSetting = () => {
    setOpenBlock(false);
  };

  const handleCloseChange = () => {
    setOpenChangeProfile(false);
    setOpenChangePassword(false);
    setOpenChangeTariff(false);
    setOpenInfoOrder(false);
    setOpenDeleteUser(false);
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
    <>
      <Header h1={t("pages.userDashboard.h1")} />
      <MainStyle>
        <MaxWidthContainer>
          {!openChangeProfile &&
          !openChangePassword &&
          !openChangeTariff &&
          !openInfoOrder &&
          !openDeleteUser ? (
            <FlexContainerStyle>
              <SectionSettingStyle $openBlock={openBlock}>
                <img
                  src={src}
                  alt="Image setting"
                  onClick={handleOpenSetting}
                  ref={imageRef}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
                <nav ref={navigationRef}>
                  <button
                    onClick={() => {
                      handleChangeProfile();
                      handleCloseSetting();
                    }}
                  >
                    {t("pages.userDashboard.button.changeProfile")}
                  </button>
                  <button
                    onClick={() => {
                      handleChangePassword();
                      handleCloseSetting();
                    }}
                  >
                    {t("pages.userDashboard.button.changePassword")}
                  </button>
                  {userData?.status === "processing" ||
                  userData?.status === "confirmed" ? (
                    <button
                      onClick={() => {
                        handleOrder();
                        handleCloseSetting();
                      }}
                      disabled={userData?.status === "confirmed"}
                      className={
                        userData?.status === "confirmed" ? "disabled" : ""
                      }
                    >
                      {t("pages.userDashboard.button.order")}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleChangeTariff();
                        handleCloseSetting();
                      }}
                      disabled={userData?.status === "completed"}
                      className={
                        userData?.status === "completed" ? "disabled" : ""
                      }
                    >
                      {t("pages.userDashboard.button.changeTariff")}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDeleteProfile();
                      handleCloseSetting();
                    }}
                  >
                    {t("pages.userDashboard.button.delete")}
                  </button>
                  <button
                    onClick={() => {
                      handleOut();
                      handleCloseSetting();
                    }}
                  >
                    {t("pages.userDashboard.button.out")}
                  </button>
                </nav>
              </SectionSettingStyle>
              <SectionInfoStyle>
                <BlockImageStyle>
                  <img
                    src={
                      userData && userData.person_image !== null
                        ? userData.person_image
                        : personImage
                    }
                    alt="Icon person"
                  />
                </BlockImageStyle>
                <BlockUserInfo>
                  <h3>
                    {userData && `${userData.last_name} ${userData.first_name}`}
                  </h3>
                  <div>
                    <p>
                      {t("pages.userDashboard.tariff")}
                      <span>
                        {userData?.tariff === "basic" &&
                          t("pages.home.cardInfoPayBasses.h4")}
                        {userData?.tariff === "family" &&
                          t("pages.home.cardInfoPayFamily.h4")}
                        {userData?.tariff === "business" &&
                          t("pages.home.cardInfoPayBusiness.h4")}
                      </span>
                    </p>
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
                    {userData?.tariff_change &&
                      userData?.status !== "completed" && (
                        <p>
                          {t("pages.userDashboard.blockUser.orderTariff")}
                          <span>
                            {userData?.tariff_change === "basic" &&
                              t("pages.home.cardInfoPayBasses.h4")}
                            {userData?.tariff_change === "family" &&
                              t("pages.home.cardInfoPayFamily.h4")}
                            {userData?.tariff_change === "business" &&
                              t("pages.home.cardInfoPayBusiness.h4")}
                          </span>
                        </p>
                      )}
                    <BlockImportantInfo>
                      {userData?.tariff_change &&
                        userData?.status === "processing" && (
                          <p>
                            <strong>
                              {t(
                                "pages.userDashboard.blockUser.importantWaiting"
                              )}
                            </strong>
                          </p>
                        )}
                      {(userData?.status === "processing" ||
                        userData?.status === "confirmed") && (
                        <p>
                          {t("pages.userDashboard.blockUser.status.text")}
                          {userData?.status === "processing" ? (
                            <span>
                              {t(
                                "pages.userDashboard.blockUser.status.processing"
                              )}
                            </span>
                          ) : (
                            <span>
                              {t(
                                "pages.userDashboard.blockUser.status.confirmed"
                              )}
                            </span>
                          )}
                        </p>
                      )}
                      {userData?.status === "completed" && (
                        <p>
                          <strong>
                            {t(
                              "pages.userDashboard.blockUser.infoCompleteTariff"
                            )}
                          </strong>
                        </p>
                      )}
                    </BlockImportantInfo>
                  </div>
                </BlockUserInfo>
              </SectionInfoStyle>
            </FlexContainerStyle>
          ) : (
            <SectionChangeProfile>
              {openDeleteUser && (
                <Suspense fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}>
                  <FormDeleteUser
                    token={token}
                    handleCloseChange={handleCloseChange}
                  />
                </Suspense>
              )}
              {openChangeProfile && (
                <Suspense fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}>
                  <FormChangeProfile
                    userData={userData}
                    handleCloseChange={handleCloseChange}
                  />
                </Suspense>
              )}
              {openChangePassword && (
                <Suspense fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}>
                  <FormChangePassword
                    token={token}
                    handleCloseChange={handleCloseChange}
                  />
                </Suspense>
              )}
              {openChangeTariff && (
                <Suspense fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}>
                  <FormChangeTariff
                    token={token}
                    tariff={userData.tariff}
                    tariffChange={userData.tariff_change}
                    orderCode={userData.order_code}
                    amountDue={userData.amount_due}
                    paymentNumbMonths={userData.payment_months}
                    setUpdateNeeded={setUpdateNeeded}
                    handleOrder={handleOrder}
                    handleCloseChange={handleCloseChange}
                  />
                </Suspense>
              )}
              {openInfoOrder && (
                <Suspense fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}>
                  <Order
                    token={token}
                    userTariff={userData.tariff}
                    tariffChange={userData.tariff_change}
                    generateCodeRandom={userData.order_code}
                    setUpdateNeeded={setUpdateNeeded}
                    paymentNumbMonths={userData.payment_months}
                    amountDue={userData.amount_due}
                    handleCloseChange={handleCloseChange}
                  />
                </Suspense>
              )}
            </SectionChangeProfile>
          )}
        </MaxWidthContainer>
      </MainStyle>
    </>
  );
};

export default UserDashboard;
