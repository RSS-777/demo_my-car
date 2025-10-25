import { useState, lazy, Suspense } from "react";
import { Header } from "../components/Header";
import { ContentNotUserCar } from "../components/ContentNotUserCar";
import { FormAddCar } from "../components/FormAddCar";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { startAddingCar, stopAddingCar } from "../store/addCar/addCarSlice";
import { Button } from "../components/Button";
import { StatusMessage } from "../components/StatusMessage";
import styled from "styled-components";

const ListUserCars = lazy(() => import("../components/ListUserCars"));

const MainStyle = styled.main`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $hasCar }) =>
    $hasCar ? "flex-start" : "space-evenly"};
  text-align: center;
  min-height: 500px;
  padding: 20px 10px;
`;

const Service = () => {
  const [messageServer, setMessageServer] = useState("");
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);
  const addCar = useSelector((state) => state.addCar.isAddingCar);
  const [hasCar, setHasCars] = useState();
  const dispatch = useDispatch();
  const [lockButton, setLockButton] = useState(false);

  const handleAddCar = () => {
    dispatch(startAddingCar());
  };

  const handleCloseAddCar = () => {
    dispatch(stopAddingCar());
  };
  return (
    <>
      <Helmet>
        <title>{t("helmet.service.title")}</title>
        <meta name="description" content={t("helmet.service.description")} />
        <meta name="keywords" content={t("helmet.service.keywords")} />
        <link rel="canonical" href="https://my-car.if.ua/service" />
      </Helmet>
      <Header
        title={t("pages.service.title")}
        subtitle={t("pages.service.subtitle")}
        imageName={token ? "garageOpen" : "garageClose"}
      >
        {token &&
          (addCar ? (
            <Button onClick={() => handleCloseAddCar()} variant="header">
              {t("pages.service.contentUserCar.buttonCancel")}
            </Button>
          ) : (
            <Button
              onClick={() => handleAddCar()}
              disabled={lockButton}
              variant="header"
            >
              {t("pages.service.contentUserCar.buttonAddCar")}
            </Button>
          ))}
      </Header>
      {token ? (
        <MainStyle $hasCar={hasCar}>
          {addCar && (
            <FormAddCar
              closeAddCar={handleCloseAddCar}
              setMessageServer={setMessageServer}
            />
          )}
          <StatusMessage>{messageServer}</StatusMessage>
          <Suspense fallback={<div>Loading your cars...</div>}>
            <ListUserCars
              setLockButton={setLockButton}
              setHasCars={setHasCars}
            />
          </Suspense>
        </MainStyle>
      ) : (
        <ContentNotUserCar />
      )}
    </>
  );
};

export default Service;
