import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "./Button";
import { RenderContentItem } from "./renderContentItem";
import termsDataUk from "../assets/policiesAndTerms/terms-uk.json";
import termsDataRu from "../assets/policiesAndTerms/terms-ru.json";
import termsDataEn from "../assets/policiesAndTerms/terms-en.json";

const ContainerStyle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 15px 0;

  button {
    margin: 15px auto 0;
  }
`;

const BlockTextStyle = styled.div`
  padding: 10px;
  width: 100%;
  overflow: auto;

  h2 {
    color: ${({ theme }) => theme.colors.text.heading2};
    text-align: center;
  }

  div {
    min-width: 350px;

    p {
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
          <h2>{t("pages.login.termsOfService.title")}</h2>
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
      <Button onClick={() => setTermsShow(false)} disabled={!isScrolledToEnd}>
        {t("pages.login.privacyPolicy.button")}
      </Button>
    </ContainerStyle>
  );
};

export default TermsAndConditions;
