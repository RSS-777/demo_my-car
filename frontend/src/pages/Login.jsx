import { useState, lazy, Suspense } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "react-i18next";

const FormLogin = lazy(() => import("../components/FormLogin"));
const FormRegistration = lazy(() => import("../components/FormRegistration"));
const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy"));
const TermsAndConditions = lazy(() =>
  import("../components/TermsAndConditions")
);

import styled from "styled-components";
import registrationImage from "../assets/images/registration/registrationFone.jpg";

const MainStyle = styled.main`
  position: relative;
  background-image: url(${registrationImage});
  background-attachment: fixed;
  background-size: cover;
  background-position: top 60px center;
  background-repeat: no-repeat;
  padding: 80px 20px;
  min-height: 500px;
  display: flex;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.pages.login.before.background};
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
      ${({ theme }) => theme.pages.login.after.backgroundImage}
    );
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`;

const ContentStyle = styled.div`
  z-index: 3;
  position: relative;
  max-width: 500px;
  margin: auto;
  box-shadow: 0.5px 0.5px 3px 0
    ${({ theme }) => theme.pages.login.container.shadow};
  background-color: ${({ theme }) => theme.pages.login.container.background};
  border-radius: 8px;
  overflow: hidden;
  height: ${({ $registrationTab }) =>
    $registrationTab === false ? "240px" : "auto"};

  > section:first-of-type {
    text-align: center;

    button:first-child {
      border-bottom: 2px solid
        ${({ theme }) => theme.pages.login.container.button.border};
      border-right: 2px solid
        ${({ theme }) => theme.pages.login.container.button.border};
      border-radius: 0 0 8px 0;
    }

    button:last-child {
      border-bottom: 2px solid
        ${({ theme }) => theme.pages.login.container.button.border};
      border-left: 2px solid
        ${({ theme }) => theme.pages.login.container.button.border};
      border-radius: 0 0 0 8px;
    }

    button {
      color: ${({ theme }) => theme.pages.login.container.button.text};
      font-size: 20px;
      padding: 5px;
      border: none;
      background: transparent;
      width: 50%;
      cursor: pointer;

      &.active {
        color: ${({ theme }) => theme.pages.login.container.button.active};
        border: none;
        border-radius: none;
      }

      &:not(.active):hover {
        &:first-child {
          border-bottom: 2px solid
            ${({ theme }) => theme.pages.login.container.button.hover.border};
          border-right: 2px solid
            ${({ theme }) => theme.pages.login.container.button.hover.border};
        }

        &:last-child {
          border-bottom: 2px solid
            ${({ theme }) => theme.pages.login.container.button.hover.border};
          border-left: 2px solid
            ${({ theme }) => theme.pages.login.container.button.hover.border};
        }
      }

      @media (max-width: 580px) {
        font-size: 16px;
      }

      @media (max-width: 390px) {
        font-size: 14px;
      }
    }
  }
`;

const SectionMessageSuccsesStyle = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h3 {
    color: ${({ theme }) => theme.pages.login.sectionMessage.h3};
  }

  p {
    color: ${({ theme }) => theme.pages.login.sectionMessage.p};
  }
`;

const LoadingMessageStyle = styled.section`
  text-align: center;
  color: black;
`;

const Login = () => {
  const [registrationTab, setRegistrationTab] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [privacyShow, setPrivacyShow] = useState(false);
  const [termsShow, setTermsShow] = useState(false);
  const { t } = useTranslation();

  const handleRegistration = (tab) => {
    if (tab === true) {
      setRegistrationTab(true);
    } else {
      setRegistrationTab(false);
    }
  };

  return (
    <>
      <Header
        h1={
          privacyShow
            ? t("pages.login.privacyPolicy.h1")
            : termsShow
            ? t("pages.login.termsOfService.h1")
            : t("pages.login.h1")
        }
      />
      <MainStyle>
        <ContentStyle $registrationTab={registrationTab}>
          {successMessage ? (
            <SectionMessageSuccsesStyle>
              <h3>{successMessage}</h3>
              <p>{t("pages.login.messageSuccsess")}</p>
            </SectionMessageSuccsesStyle>
          ) : (
            <>
              <section>
                <button
                  onClick={() => handleRegistration(false)}
                  className={!registrationTab ? "active" : ""}
                >
                  {t("pages.login.buttonLogin")}
                </button>
                <button
                  onClick={() => handleRegistration(true)}
                  className={registrationTab ? "active" : ""}
                >
                  {t("pages.login.buttonRegistration")}
                </button>
              </section>
              <section>
                <Suspense
                  fallback={
                    <LoadingMessageStyle>Loading...</LoadingMessageStyle>
                  }
                >
                  <FormRegistration
                    setPrivacyShow={setPrivacyShow}
                    setTermsShow={setTermsShow}
                    registrationTab={registrationTab}
                    setSuccessMessage={setSuccessMessage}
                    setRegistrationTab={setRegistrationTab}
                  />
                  <FormLogin registrationTab={registrationTab} />
                </Suspense>
              </section>
            </>
          )}
        </ContentStyle>
        {privacyShow && (
          <Suspense
            fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}
          >
            <PrivacyPolicy setPrivacyShow={setPrivacyShow} />
          </Suspense>
        )}
        {termsShow && (
          <Suspense
            fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}
          >
            <TermsAndConditions setTermsShow={setTermsShow} />
          </Suspense>
        )}
      </MainStyle>
    </>
  );
};

export default Login;
