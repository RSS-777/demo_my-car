import { useState, lazy, Suspense } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "react-i18next";
import { FormLogin } from "../components/FormLogin";
import { FormRegistration } from "../components/FormRegistration";
import { ButtonGhost } from "../components/ButtonGhost";
import styled from "styled-components";

const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy"));
const TermsAndConditions = lazy(() =>
  import("../components/TermsAndConditions")
);

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  padding: 10px;

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
  }

  p {
    text-align: center;

    button {
      margin-left: 5px;
    }
  }
`;

const Login = () => {
  const [registrationTab, setRegistrationTab] = useState(false);
  const [privacyShow, setPrivacyShow] = useState(false);
  const [termsShow, setTermsShow] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Header
        title={t("pages.login.title")}
        subtitle={!privacyShow && !termsShow && t("pages.login.subtitle")}
        imageName="login"
      />
      <MainStyle>
        <h2>{t("pages.login.titleSecond")}</h2>
        {registrationTab ? (
          <FormRegistration
            setPrivacyShow={setPrivacyShow}
            setTermsShow={setTermsShow}
            setRegistrationTab={setRegistrationTab}
          />
        ) : (
          <FormLogin />
        )}

        <p>
          {registrationTab
            ? t("pages.login.youRegistration")
            : t("pages.login.notAcount")}
          <ButtonGhost
            onClick={() =>
              registrationTab
                ? setRegistrationTab(false)
                : setRegistrationTab(true)
            }
          >
            {registrationTab
              ? t("pages.login.buttonLogin")
              : t("pages.login.buttonRegistration")}
          </ButtonGhost>
        </p>
        {privacyShow && (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicy setPrivacyShow={setPrivacyShow} />
          </Suspense>
        )}
        {termsShow && (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsAndConditions setTermsShow={setTermsShow} />
          </Suspense>
        )}
      </MainStyle>
    </>
  );
};

export default Login;
