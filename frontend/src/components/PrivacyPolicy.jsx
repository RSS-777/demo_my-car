import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ButtonGarage } from "./ButtonGarage";
import { darkTheme } from "../styles/theme";
import { RenderContentItem } from "./renderContentItem";
import styled from "styled-components";
import policyDataUk from "../assets/policiesAndTerms/policy-uk.json";
import policyDataRu from "../assets/policiesAndTerms/policy-ru.json";
import policyDataEn from "../assets/policiesAndTerms/policy-en.json";

const ContainerStyle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  background: ${({ theme }) => theme.privacyPolicy.background};
  background-image: ${({ theme }) =>
    theme === darkTheme
      ? `radial-gradient(transparent, ${theme.privacyPolicy.backgroundImage})`
      : ""};
  height: 100%;
  width: 100%;
  padding: 15px;

  button {
    margin: 15px auto 0;
  }
`;

const BlockTextStyle = styled.div`
  box-shadow: 0 0 8px 0 ${({theme}) => theme.privacyPolicy.blockText.shadow};
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.privacyPolicy.blockText.background};
  overflow: auto;
  color: ${({ theme }) => theme.privacyPolicy.blockText.text};

  div {
    min-width: 350px;

    p {
      color: ${({ theme }) => theme.privacyPolicy.blockText.p};
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
`;

const policyDataMap = {
  uk: policyDataUk,
  ru: policyDataRu,
  en: policyDataEn,
};

const PrivacyPolicy = ({ setPrivacyShow }) => {
  const { t } = useTranslation();
  const blockRef = useRef(null);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const lang = useSelector((state) => state.lang.value);
  const policyData = policyDataMap[lang] || policyDataUk;

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
              {t("pages.login.privacyPolicy.update")} {policyData.lastUpdate}
            </strong>
          </p>
          <ol>
            {policyData.sections.map((sections, index) => (
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
        onClick={() => setPrivacyShow(false)}
        disabled={!isScrolledToEnd}
      >
        {t("pages.login.privacyPolicy.button")}
      </ButtonGarage>
    </ContainerStyle>
  );
};

export default PrivacyPolicy;
