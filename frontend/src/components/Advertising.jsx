import { useState, useEffect } from "react";
import { getAdvertising } from "../api/apiAdvertising";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import advertisingImage from "../assets/images/advertising/Advertising.webp";

const slideIn = keyframes`
  from {
    transform: translateX(-250%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(250%);
  }
`;

const ContainerStyle = styled.div`
  position: fixed;
  bottom: ${(props) => (props.$hideContainer ? "-150%" : "0")};
  z-index: 7;
  width: 100%;
  height: auto;
  max-width: 1440px;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.background.overlaySecondary};
  transition: bottom 2s ease;

  > div {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 190px;
    padding: 20px;
    overflow: hidden;
  }
`;

const CloseButtonStyle = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.button.close};
  color: ${({ theme }) => theme.colors.button.closeText};
  font-size: 16px;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.button.closeHover};
      color: ${({ theme }) => theme.colors.button.closeTextHover};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:active {
      background-color: ${({ theme }) => theme.colors.button.closeHover};
      color: ${({ theme }) => theme.colors.button.closeTextHover};
    }
  }
`;

const AdvertisingCardStyle = styled.div`
  position: relative;
  height: 150px;
  max-width: 350px;
  background-image: url(${(props) =>
    props.$image ? props.$image : advertisingImage});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.reverse};
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
  animation: ${({ $animateOut }) => ($animateOut ? slideOut : slideIn)} 0.8s
    ease forwards;
  cursor: pointer;

  h2 {
    color: ${({ theme }) => theme.colors.text.fixed};
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.fixed};
  }

  &.hideBlock {
    display: none;
  }
`;

export const Advertising = () => {
  const [hideContainer, setHideContainer] = useState(true);
  const [advertising, setAdvertising] = useState([]);
  const [choiceAdvertising, setChaiceAdverising] = useState(null);
  const [animateOut, setAnimateOut] = useState(false);
  const [advertisingOn, setAdvertisingOn] = useState(false);
  const lang = useSelector((state) => state.lang.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAdvertisingData = async () => {
      const response = await getAdvertising(t, lang);

      if (response) {
        setAdvertising(response.data);
      }
    };

    fetchAdvertisingData();
  }, [lang]);

  useEffect(() => {
    if (advertisingOn) {
      if (!advertising.length) {
        setChaiceAdverising(null);
        setHideContainer(true);
        return;
      }

      let ind = 0;
      setChaiceAdverising({ index: ind, data: advertising[ind] });
      setHideContainer(false);

      const interval = setInterval(() => {
        setAnimateOut(true);

        setTimeout(() => {
          ind = (ind + 1) % advertising.length;
          setChaiceAdverising({ index: ind, data: advertising[ind] });
          setAnimateOut(false);
        }, 800);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [advertising, lang, advertisingOn]);

  useEffect(() => {
    setTimeout(() => {
      setAdvertisingOn(true);
    }, 15000);
  }, []);

  const handleHideContainer = () => {
    setAnimateOut(true);

    setTimeout(() => {
      setHideContainer(true);
    }, 800);

    setTimeout(() => {
      setAdvertising([]);
      setChaiceAdverising(null);
      setAnimateOut(false);
      setAdvertisingOn(false);
    }, 2000);
  };

  return (
    <ContainerStyle $hideContainer={hideContainer}>
      <div>
        {choiceAdvertising?.data && advertisingOn && (
          <AdvertisingCardStyle
            $image={choiceAdvertising.data.image}
            $animateOut={animateOut}
          >
            <h2>{choiceAdvertising.data[`title_${lang}`]}</h2>
            <p>{choiceAdvertising.data[`text_${lang}`]}</p>
          </AdvertisingCardStyle>
        )}
      </div>
      <CloseButtonStyle onClick={handleHideContainer}>X</CloseButtonStyle>
    </ContainerStyle>
  );
};
