import { MaxWidthContainer } from "./MaxWidthContainer";
import { useTranslation } from 'react-i18next';
import { BlockMyFoto } from "./BlockMyFoto";
import styled from "styled-components";

const SectionStyle = styled.section`
  background: ${({ theme }) => theme.myInformation.background};
  padding: 40px 20px;

  h2 {
    text-align: center;
    color: ${({ theme }) => theme.myInformation.h2}
  }
`;

const BlockInfoStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 20px;
  border-radius: 15px;
  background: ${({theme}) => theme.myInformation.blockInfo.background};
  box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.myInformation.blockInfo.shadow};

  p {
    color: ${({ theme }) => theme.myInformation.blockInfo.p};
    margin: 0;
    text-align: left;
    flex: 1;
    font-size: clamp(14px, 4vw, 18px);
  }

  @media(max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;

      p {
        text-align: center;
      }
  }
`;

const ContainerProjectStyle = styled.div`
    margin-top: 30px;

    h2 {
      font-size: clamp(26px, 4vw, 36px);
    }

    >p {
      font-size: clamp(14px, 4vw, 18px);
      font-style: normal;
      color: ${({theme}) => theme.myInformation.containerProject.text};
    }
`;

const BlockProjectTextStyle = styled.div`
  h4 {
    text-align: center;
    color: ${({ theme }) => theme.myInformation.blockProject.h4};
  }

  p {
    color: ${({ theme }) => theme.myInformation.blockProject.p};
    font-size: clamp(16px, 4vw, 20px);
    font-style: normal;
    margin: 5px 0;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;

    li {
      font-size: clamp(14px, 4vw, 16px);
      color: ${({ theme }) => theme.myInformation.blockProject.li};
    }
  }
`;

const BlockProjectNoteStyle = styled.div`
  color: ${({ theme }) => theme.myInformation.blockProjectNote.text};
`;

export const MyInformation = () => {
  const { t } = useTranslation()

  return (
    <SectionStyle>
      <MaxWidthContainer>
        <h2>{t('pages.about.containerText.h2')}</h2>
        <BlockInfoStyle>
          <BlockMyFoto />
          <p>{t('pages.about.containerText.p')}</p>
        </BlockInfoStyle>
        <ContainerProjectStyle>
          <p>{t('pages.about.containerText.p2')}</p>
          <BlockProjectTextStyle>
            <h4>{t('pages.about.containerText.list.title')}</h4>
            <ul>
              <li>{t('pages.about.containerText.list.li1')}</li>
              <li>{t('pages.about.containerText.list.li2')}</li>
              <li>{t('pages.about.containerText.list.li3')}</li>
              <li>{t('pages.about.containerText.list.li4')}</li>
              <li>{t('pages.about.containerText.list.li5.title')}
                <ul>
                  <li>{t('pages.about.containerText.list.li5.li1')}</li>
                  <li>{t('pages.about.containerText.list.li5.li2')}</li>
                  <li>{t('pages.about.containerText.list.li5.li3')}</li>
                  <li>{t('pages.about.containerText.list.li5.li4')}</li>
                  <li>{t('pages.about.containerText.list.li5.li5')}</li>
                  <li>{t('pages.about.containerText.list.li5.li6')}</li>
                  <li>{t('pages.about.containerText.list.li5.li7')}</li>
                </ul>
              </li>
            </ul>
          </BlockProjectTextStyle>
          <BlockProjectTextStyle>
            <h4>{t('pages.about.containerText.technology.title')}</h4>
            <p>{t('pages.about.containerText.technology.frontend.title')}</p>
            <ul>
              <li>{t('pages.about.containerText.technology.frontend.li1')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li2')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li3')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li4')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li5')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li6')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li7')}</li>
              <li>{t('pages.about.containerText.technology.frontend.li8')}</li>
            </ul>
            <p>{t('pages.about.containerText.technology.backend.title')}</p>
            <ul>
              <li>{t('pages.about.containerText.technology.backend.li1')}</li>
              <li>{t('pages.about.containerText.technology.backend.li2')}</li>
              <li>{t('pages.about.containerText.technology.backend.li3')}</li>
              <li>{t('pages.about.containerText.technology.backend.li4')}</li>
              <li>{t('pages.about.containerText.technology.backend.li5')}</li>
              <li>{t('pages.about.containerText.technology.backend.li6')}</li>
              <li>{t('pages.about.containerText.technology.backend.li7')}</li>
              <li>{t('pages.about.containerText.technology.backend.li8')}</li>
              <li>{t('pages.about.containerText.technology.backend.li9')}</li>
              <li>{t('pages.about.containerText.technology.backend.li10')}</li>
            </ul>
            <p>{t('pages.about.containerText.technology.infrastructure.title')}</p>
            <ul>
              <li>{t('pages.about.containerText.technology.infrastructure.li1')}</li>
              <li>{t('pages.about.containerText.technology.infrastructure.li2')}</li>
              <li>{t('pages.about.containerText.technology.infrastructure.li3')}</li>
            </ul>
          </BlockProjectTextStyle>
          <BlockProjectNoteStyle>
            <strong>{t('pages.about.containerText.technology.additionally.text')}</strong>
          </BlockProjectNoteStyle>
        </ContainerProjectStyle>
      </MaxWidthContainer>
    </SectionStyle>
  )
};