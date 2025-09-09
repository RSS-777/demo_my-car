import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ButtonGarage } from "./ButtonGarage";
import { RenderContentItem } from "./renderContentItem";
import { darkTheme } from "../styles/theme";
import termsDataUk from "../assets/policiesAndTerms/terms-uk.json";
import termsDataRu from "../assets/policiesAndTerms/terms-ru.json";
import termsDataEn from "../assets/policiesAndTerms/terms-en.json";

const ContainerStyle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  background: ${({ theme }) => theme.termsAndConditions.background};
  background-image: ${({ theme }) =>
    theme === darkTheme
      ? `radial-gradient(transparent, ${theme.termsAndConditions.backgroundImage})`
      : ""};
  height: 100%;
  width: 100%;
  padding: 15px;

  button {
    margin: 15px auto 0;
  }
`;

const BlockTextStyle = styled.div`
  box-shadow: 0 0 8px 0 ${({theme}) => theme.termsAndConditions.blockText.shadow};
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.termsAndConditions.blockText.background};
  overflow: auto;
  color: ${({ theme }) => theme.termsAndConditions.blockText.text};

  div {
    min-width: 350px;

    p {
      color: ${({ theme }) => theme.termsAndConditions.blockText.p};
      font-size: 12px;
    }

    > ol {
      list-style: none;

      > li {
        counter-increment: main-counter;
        margin-top: 5px;

        span {
          font-size: 18px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          span {
            font-size: 16px;
            font-weight: 600;
          }
        }

        > ol {
          counter-reset: sub-counter;
          list-style: none;

          > li {
            counter-increment: sub-counter;

            ul {
              counter-reset: sub-sub-counter;
              list-style: disc;
              margin-left: -10px;
            }
          }

          > li:first-child {
            margin-top: 2px;
          }

          > li::before {
            content: counter(main-counter) "." counter(sub-counter) ". ";
            margin-left: -35px;
          }
        }
      }

      > li::before {
        content: counter(main-counter) ". ";
        margin-left: -35px;
      }
    }

    @media (max-width: 768px) {
      li {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 768px) {
    width: 92%;
  }
`;

const termsDataMap = {
  uk: termsDataUk,
  ru: termsDataRu,
  en: termsDataEn,
};

const TermsAndConditions = ({ setTermsShow }) => {
  const { t } = useTranslation();
  const blockRef = useRef(null);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const lang = useSelector((state) => state.lang.value);

  const termsData = termsDataMap[lang] || termsDataUk;

  const handleScroll = () => {
    const block = blockRef.current;

    if (block) {
      const isAtBottom =
        block.scrollTop + block.clientHeight >= block.scrollHeight - 5;
      setIsScrolledToEnd(isAtBottom);
    }
  };

  return (
    <ContainerStyle>
      <BlockTextStyle ref={blockRef} onScroll={handleScroll}>
        <div>
          <p>
            <strong>
              {t("pages.login.privacyPolicy.update")} {termsData.lastUpdate}
            </strong>
          </p>
          <ol>
            {termsData.sections.map((sections, index) => (
              <li key={index}>
                <span>{sections.title}</span>
                <ol>
                  {sections.content.map(
                    (contentItem, contentIndex, contentArray) => (
                      <RenderContentItem
                        key={contentIndex}
                        content={contentItem}
                        index={contentIndex}
                        allItems={contentArray}
                      />
                    )
                  )}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </BlockTextStyle>
      <ButtonGarage
        onClick={() => setTermsShow(false)}
        disabled={!isScrolledToEnd}
      >
        {t("pages.login.privacyPolicy.button")}
      </ButtonGarage>
    </ContainerStyle>
  );
};

export default TermsAndConditions;
