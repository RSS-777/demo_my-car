import { memo } from "react";
import { MaxWidthContainer } from "./MaxWidthContainer";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SectionStyle = styled.section`
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
  }
`;

const ContainerCardsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 10px;
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1 1 150px;
    max-width: 220px;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.background.cardSecondary};

    > div {
      height: 90px;

      h3 {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
        margin: 10px 0;
        color: ${({ theme }) => theme.colors.text.heading3};
      }
    }

    p {
      flex-grow: 1;
      margin: 0;
    }
  }
`;

const ContentStyle = styled.div`
  padding: 20px;
  text-align: left;

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 25px;
      margin-bottom: 10px;
      font-size: 16px;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.text.heading2};
        font-weight: bold;
      }
    }
  }
`;

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <SectionStyle>
      <MaxWidthContainer>
        <h2>{t("pages.home.featuresSection.title")}</h2>
        <ContainerCardsStyle>
          <div>
            <div>
              <span>🛠️</span>
              <h3>{t("pages.home.featuresSection.cards.card1.title")}</h3>
            </div>
            <p>{t("pages.home.featuresSection.cards.card1.text")}</p>
          </div>
          <div>
            <div>
              <span>📅</span>
              <h3>{t("pages.home.featuresSection.cards.card2.title")}</h3>
            </div>
            <p>{t("pages.home.featuresSection.cards.card2.text")}</p>
          </div>
          <div>
            <div>
              <span>🚗</span>
              <h3>{t("pages.home.featuresSection.cards.card3.title")}</h3>
            </div>
            <p>{t("pages.home.featuresSection.cards.card3.text")}</p>
          </div>
          <div>
            <div>
              <span>⚙️</span>
              <h3>{t("pages.home.featuresSection.cards.card4.title")}</h3>
            </div>
            <p>{t("pages.home.featuresSection.cards.card4.text")}</p>
          </div>
          <div>
            <div>
              <span>💰</span>
              <h3>{t("pages.home.featuresSection.cards.card5.title")}</h3>
            </div>
            <p>{t("pages.home.featuresSection.cards.card5.text")}</p>
          </div>
        </ContainerCardsStyle>
        <ContentStyle>
          <p>{t("pages.home.featuresSection.content.text")}</p>
          <ul>
            <li>{t("pages.home.featuresSection.content.list1")}</li>
            <li>{t("pages.home.featuresSection.content.list2")}</li>
            <li>{t("pages.home.featuresSection.content.list3")}</li>
            <li>{t("pages.home.featuresSection.content.list4")}</li>
            <li>{t("pages.home.featuresSection.content.list5")}</li>
          </ul>
        </ContentStyle>
      </MaxWidthContainer>
    </SectionStyle>
  );
};

export default memo(FeaturesSection);