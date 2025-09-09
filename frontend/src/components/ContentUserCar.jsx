import { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ButtonGarage } from "./ButtonGarage";
const FormAddCar = lazy(() => import("./FormAddCar"));
const FormChangeRepair = lazy(() => import("./FormChangeRepair"));
import { StatusMessage } from "./StatusMessage";
import { ListUserCars } from "./ListUserCars";
import styled from "styled-components";
import garageOpenImage from "../assets/images/home/garageOpen.jpg";

const MainStyle = styled.main`
  background-image: url(${garageOpenImage});
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  min-height: 500px;
  padding: 60px 20px 80px;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.contentUserCar.before.background};
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    background-image: radial-gradient(
      transparent,
      ${({ theme }) => theme.contentUserCar.after.background}
    );
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  h2 {
    position: relative;
    z-index: 3;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.contentUserCar.h2};

    @media (max-width: 580px) {
      font-size: 32px;
    }
  }

  > p {
    position: relative;
    z-index: 3;
    color: ${({ theme }) => theme.contentUserCar.text};
  }

  @media (max-width: 580px) {
    h2 {
      margin-top: 20px;
    }
  }
`;

const ContentStyle = styled.div`
  position: relative;
  min-height: 10px;
  z-index: 3;

  > button {
    position: absolute;
    bottom: -60px;
    right: ${(props) => (props.$addCar ? 0 : "50%")};
    transform: ${(props) => (props.$addCar ? "" : "translateX(50%)")};

    @media (max-width: 580px) {
      width: 85%;
      right: 50%;
      transform: translateX(50%);
    }
  }
`;

const ModalWindowStyle = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.contentUserCar.modal.background};
`;

const LoadingMessageStyle = styled.div`
  color: black;
  text-align: center;
`;

const ContentUserCar = () => {
  const [addCar, setAddCar] = useState(false);
  const [messageServer, setMessageServer] = useState("");
  const [lockButton, setLockButton] = useState(false);
  const [isCar, setIsCar] = useState(false);
  const { t } = useTranslation();
  const changeRepair = useSelector((state) => state.flag.value);

  useEffect(() => {
    if (changeRepair) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [changeRepair]);

  const handleAddCar = () => {
    setAddCar(true);
  };

  const handleCloseAddCar = () => {
    setAddCar(false);
    setMessageServer("");
  };

  return (
    <MainStyle>
      {!isCar && <p>{t("pages.service.contentUserCar.p")}</p>}
      <ListUserCars
        setIsCar={setIsCar}
        addCar={addCar}
        setLockButton={setLockButton}
      />
      {changeRepair && (
        <ModalWindowStyle>
          <Suspense
            fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}
          >
            <FormChangeRepair />
          </Suspense>
        </ModalWindowStyle>
      )}
      <ContentStyle $addCar={addCar}>
        {addCar ? (
          <Suspense
            fallback={<LoadingMessageStyle>Loading...</LoadingMessageStyle>}
          >
            <FormAddCar
              closeAddCar={handleCloseAddCar}
              setMessageServer={setMessageServer}
            />
            <ButtonGarage onClick={() => handleCloseAddCar()}>
              {t("pages.service.contentUserCar.buttonCancel")}
            </ButtonGarage>
          </Suspense>
        ) : (
          <ButtonGarage onClick={() => handleAddCar()} disabled={lockButton}>
            {t("pages.service.contentUserCar.buttonAddCar")}
          </ButtonGarage>
        )}
      </ContentStyle>
      <StatusMessage>{messageServer}</StatusMessage>
    </MainStyle>
  );
};

export default ContentUserCar;
