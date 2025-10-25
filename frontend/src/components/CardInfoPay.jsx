import styled from "styled-components";
import { ButtonLink } from "./ButtonLink";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const BlockCardStyle = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 0 20px 20px;
  width: 100%;
  max-width: 280px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.cardPrimary};
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.default};

  div:first-of-type {
    h3 {
      color: ${({ theme }) => theme.colors.text.heading3};
      font-size: 24px;
    }

    p {
      font-size: 16px;
      margin: 0;
    }
  }

  div:nth-of-type(2) {
    hr {
      width: 100px;
      margin: 20px auto;
    }

    p {
      font-weight: bold;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.text.cardSecondary};
      background-color: ${({ theme }) => theme.colors.background.default};
      border-radius: 50%;
      width: 140px;
      height: 140px;
      margin: 0 auto 25px;
      line-height: 140px;
    }

    p::first-letter {
      text-transform: uppercase;
    }
  }
`;

const HiddenContentStyle = styled.div`
  display: ${({ $disabled }) => ($disabled ? "block" : "none")};
  background-color: ${({ theme }) => theme.colors.background.overlayPrimary};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  border-radius: inherit;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    font-size: 22px;
    color: ${({ theme }) => theme.colors.text.heading3};
  }
`;

export const CardInfoPay = ({ h3, p, price, isPaid, tariff, isActive }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);
  const tariffUser = useSelector((state) => state.user.tariff);
  const redirectionPath = token ? "/user" : "/login";
  const isSelected = tariffUser === tariff;

  return (
    <BlockCardStyle>
      <div>
        <h3>{h3}</h3>
        <p>{p}</p>
      </div>
      <div>
        <hr />
        <p>{price}</p>
        <ButtonLink
          to={redirectionPath}
          className={isSelected ? "activeUserTariff" : ""}
        >
          {isSelected ? t("cardInfoPay.buttonActive") : t("cardInfoPay.button")}
        </ButtonLink>
      </div>

      <HiddenContentStyle $disabled={!isActive && isPaid}>
        <span>{t("cardInfoPay.spanNotActive")}</span>
      </HiddenContentStyle>
    </BlockCardStyle>
  );
};
