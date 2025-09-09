import { useState, useEffect, useRef } from "react";
import { getAdvertising } from "../api/apiAdvertising";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import advertisingImage from "../assets/images/advertising/Advertising.png";

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
  z-index: 5;
  width: 100%;
  height: auto;
  max-width: 1440px;
  pointer-events: none;
  background: ${({ theme }) => theme.advertising.container.background};
  transition: bottom 2s ease;

  > div {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    z-index: 5;
  }
`;

const ButtonContainerStyle = styled.button`
  position: absolute;
  top: -20px;
  right: 0;
  height: 20px;
  border: none;
  border-radius: 5px 0 0 0;
  cursor: pointer;
  pointer-events: auto;
  color: ${({ theme }) => theme.advertising.button.text};
  background: ${({ theme }) => theme.advertising.container.background};
  font-size: 18px;

  &:hover {
    color: ${({ theme }) => theme.advertising.button.hover};
  }
`;

const AdvertisingBlockStyle = styled.div`
  position: relative;
  z-index: 6;
  min-height: 150px;
  max-width: 400px;
  background: ${({ theme }) => theme.advertising.background};
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  box-shadow: 1px 1px 3px 0 ${({ theme }) => theme.advertising.boxShadow};
  overflow: hidden;
  animation: ${({ $animateOut }) => ($animateOut ? slideOut : slideIn)} 0.8s
    ease forwards;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) =>
      props.$image ? props.$image : advertisingImage});
    background-position: center;
    background-size: cover;
    filter: blur(${(props) => (props.$image ? 0 : "4px")});
    z-index: -1;
  }

  h5 {
    color: ${({ theme }) => theme.advertising.h5};
    text-shadow: 0 0 3px ${({ theme }) => theme.advertising.textShadow};
    margin-top: 8px;
  }

  > p {
    font-size: 14px;
    text-shadow: 0 0 3px ${({ theme }) => theme.advertising.textShadow};
  }

  button {
    cursor: pointer;
    pointer-events: auto;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.advertising.button.text};
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 18px;

    &:hover {
      color: ${({ theme }) => theme.advertising.button.hover};
    }
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
    }, 5000);
  }, []);

  const handleHideAdvertising = (index) => {
    setAnimateOut(true);

    setTimeout(() => {
      const updatedAds = advertising.filter((_, i) => i !== index);

      if (updatedAds.length === 0) {
        setHideContainer(true)

        setTimeout(() => {
          setAdvertising([])
          setChaiceAdverising(null)
          setAdvertisingOn(false)
        }, 2000);
      } else {
        setAdvertising(updatedAds);
        const newIndex = 0;
        setChaiceAdverising({ index: newIndex, data: updatedAds[newIndex] });
      }

      setAnimateOut(false);
    }, 800);
  };

  const handleHideContainer = () => {
    setAnimateOut(true);

    setTimeout(() => {
      setHideContainer(true);
    }, 800);

    setTimeout(() => {
      setAdvertising([])
      setChaiceAdverising(null)
      setAnimateOut(false)
       setAdvertisingOn(false)
    }, 2000);
  };

  return (
    <ContainerStyle $hideContainer={hideContainer}>
      <div>
        {choiceAdvertising?.data && advertisingOn && (
          <AdvertisingBlockStyle
            $image={choiceAdvertising.data.image}
            $animateOut={animateOut}
          >
            <h5>{choiceAdvertising.data[`title_${lang}`]}</h5>
            <p>{choiceAdvertising.data[`text_${lang}`]}</p>
            <button
              onClick={() => handleHideAdvertising(choiceAdvertising.index)}
            >
              X
            </button>
          </AdvertisingBlockStyle>
        )}
      </div>
      <ButtonContainerStyle onClick={handleHideContainer}>
        X
      </ButtonContainerStyle>
    </ContainerStyle>
  );
};
