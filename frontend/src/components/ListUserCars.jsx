import { useEffect, useState, useRef } from "react";
import { getUserCars } from "../api/carsApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteUserCar } from "../api/carsApi";
import { getUserTariff } from "../api/api";
import styled from "styled-components";
import { ButtonCard } from "./ButtonCard";

import { getVehicleTypeNames } from "../constants/vehicleTypeNames";
import { VehicleCard } from "./VehicleCard";

const TitleStyle = styled.h2`
  color: ${({ theme }) => theme.colors.text.heading2};
  max-width: 600px;
  padding: 20px 10px;
  margin: 0 auto 40px;
`;

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    padding: 0 10px 10px;
    margin: 10px 0 0;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.heading2};
  }
`;

const BlockSearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;

    input {
      border-radius: 5px;
      margin-right: 5px;
      padding: 0 5px;
      border: none;
      outline-style: none;
      box-shadow: 1px 1px 3px 0 ${({ theme }) => theme.colors.boxShadow.default};
      padding: 3px 5px;
      font-size: 12px;
    }
  }

  span {
    margin-top: 5px;
    font-size: 10px;
  }

  @media (min-width: 480px) {
    align-items: flex-start;
  }
`;

const MessageCountStyle = styled.p`
  span {
    margin-right: 5px;
    color: ${({theme}) => theme.colors.text.mistake};
  }
`;

const CardsGroupStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const quantityAllowed = {
  basic: 1,
  family: 5,
  business: Infinity,
};

const ListUserCars = ({ setLockButton, setHasCars }) => {
  const [listCars, setListCars] = useState({});
  const [isCar, setIsCar] = useState(false);
  const [tariff, setTariff] = useState();
  const [removedCount, setRemovedCount] = useState(0);
  const token = useSelector((state) => state.user.token);
  const addCar = useSelector((state) => state.addCar.isAddingCar);
  const { t } = useTranslation();
  const [deletedCarId, setDletedCarId] = useState(null);

  const [searchMessage, setSearchMessage] = useState("");
  const inputReff = useRef();
  const blockReffs = useRef({});

  useEffect(() => {
    if (Object.keys(listCars).length > 0) {
      setIsCar(true);
      setHasCars(true);
    } else {
      setIsCar(false);
      setHasCars(false);
    }
  }, [listCars, deletedCarId]);

  useEffect(() => {
    const fetchTariff = async () => {
      const response = await getUserTariff(token, t);
      if (response.success) {
        setTariff(response.data.tariff);
      }
    };

    fetchTariff();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await getUserCars(token, t);

      if (response.success) {
        const countElements = response.data.data.slice(
          0,
          quantityAllowed[tariff]
        );
        setRemovedCount(response.data.data.length - countElements.length);
        const limit =
          tariff === "basic" ? 1 : tariff === "family" ? 5 : Infinity;
        setLockButton(countElements.length >= limit);
        const groupedCars = countElements.reduce((acc, car) => {
          if (!acc[car.vehicle_type]) {
            acc[car.vehicle_type] = [];
          }
          acc[car.vehicle_type].push(car);
          return acc;
        }, {});

        setListCars(groupedCars);
      }
    };
    fetchCars();
  }, [addCar, deletedCarId, tariff]);

  const handleDeleteCar = async (carId, image) => {
    const fetchData = await deleteUserCar(token, carId, image, t);

    if (fetchData.success) {
      setDletedCarId(carId);

      setTimeout(() => {
        setDletedCarId(null);
      }, 2000);
    }
  };

  const handleSearchVehicle = () => {
    const code = inputReff.current.value.toLowerCase();
    setSearchMessage("");
    let found = false;

    if (!code) {
      setSearchMessage(
        t("pages.service.contentUserCar.listUserCars.setMessage")
      );
      return;
    }

    Object.keys(listCars).forEach((type) => {
      listCars[type].forEach((elem) => {
        const serial = elem.serial_number?.toLowerCase();
        const vin = elem.vin_number?.toLowerCase();
        const hin = elem.hin_number?.toLowerCase();

        if ([serial, vin, hin].includes(code)) {
          if (blockReffs.current[elem.car_id]) {
            blockReffs.current[elem.car_id].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            blockReffs.current[elem.car_id].focus();
            found = true;
          }
        }
      });
    });

    if (!found) {
      setSearchMessage(
        t("pages.service.contentUserCar.listUserCars.setMessageNotFound")
      );
    }
  };

  return (
    <>
      {!isCar ? (
        <TitleStyle>{t("pages.service.contentUserCar.title")}</TitleStyle>
      ) : (
        Object.keys(listCars).length > 0 && (
          <ContainerStyle>
            <BlockSearchStyle>
              <div>
                <input
                  type="text"
                  id="vehicle-search"
                  ref={inputReff}
                  placeholder="VIN, HIN, Serial"
                />
                <ButtonCard onClick={handleSearchVehicle}>
                  {t("pages.service.contentUserCar.listUserCars.button")}
                </ButtonCard>
              </div>
              <span>{searchMessage}</span>
            </BlockSearchStyle>

            {Object.keys(listCars).map((type) => (
              <>
                <h2>{getVehicleTypeNames(type, t)}</h2>
                <CardsGroupStyle key={type}>
                  {listCars[type].map((elem) => (
                    <VehicleCard
                    ref={(el) => (blockReffs.current[elem.car_id] = el)}
                      card={elem}
                      handleDeleteCar={handleDeleteCar}
                    />
                  ))}
                </CardsGroupStyle>
              </>
            ))}
            {removedCount > 0 && (
              <MessageCountStyle>
                {t("pages.service.contentUserCar.listUserCars.removedCount.0")}{" "}
                <span>{removedCount}</span>
                {removedCount === 1 &&
                  t("pages.service.contentUserCar.listUserCars.removedCount.1")}
                {(removedCount === 2 ||
                  removedCount === 3 ||
                  removedCount === 4) &&
                  t(
                    "pages.service.contentUserCar.listUserCars.removedCount.234"
                  )}
                {removedCount > 4 &&
                  t(
                    "pages.service.contentUserCar.listUserCars.removedCount.all"
                  )}
              </MessageCountStyle>
            )}
          </ContainerStyle>
        )
      )}
    </>
  );
};

export default ListUserCars;