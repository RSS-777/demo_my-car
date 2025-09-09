import styled from 'styled-components';
import { ButtonLink } from '../components/ButtonLink';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import phoneImage from '../assets/images/about/phone2.webp';
import { MyInformation } from '../components/MyInformation';
import { darkTheme } from '../styles/theme';

const SectionContactStyle = styled.section`
  min-height: 500px;
  position: relative;  
  text-align: center;
  padding: 40px 20px;
  background-image: url(${phoneImage});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  &::before {
    content:'';
    position: absolute;
    background-color: ${({ theme }) => theme.pages.about.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%; 
    height: 100%; 
  }

  &::after {
    content:'';
    position: absolute;
    background-image: radial-gradient(transparent, ${({ theme }) => theme.pages.about.after.backgroundImage});
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%; 
    height: 100%;  
  }

  h2 {
    position: relative;
    padding: 0;
    margin: 0;
    z-index: 3;
    color: ${({ theme }) => theme.pages.about.h2};
  }

  p {
    position: relative;
    z-index: 3;
    max-width: 762px;
    padding: 0 20px;
    color: ${({ theme }) => theme.pages.about.p.text};
    text-shadow: 0 0 8px ${({ theme }) => (theme === darkTheme) ? theme.pages.about.p.shadow : 'transparent'};
    margin: 0;
  }  
`;

const About = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t("helmet.about.title")}</title>
        <meta name="description" content={t("helmet.about.description")} />
        <meta name="keywords" content={t("helmet.about.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/about" />
      </Helmet>
      <Header h1={t('pages.about.header.h1')} h3={t('pages.about.header.h3')} />
      <main>
        <MyInformation />
        <SectionContactStyle>
          <h2>{t('pages.about.blockContent.h2')}</h2>
          <p>{t('pages.about.blockContent.p')}</p>
          <ButtonLink to='/contact' children={t('pages.about.button')} />
        </SectionContactStyle>
      </main>
    </>
  )
};

export default About;