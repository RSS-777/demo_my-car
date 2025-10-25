import { useEffect, useState, lazy, Suspense } from "react";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FormChangeRepair } from "../components/FormChangeRepair";
import { ButtonLink } from "../components/ButtonLink";
import { getVehicleSubtypeName } from "../constants/vehicleTypes";
import { getFuelTypeName } from "../constants/fuelType";
import { MaxWidthContainer } from "../components/MaxWidthContainer";
import styled from "styled-components";

const FormAddServiceRecord = lazy(() =>
  import("../components/FormAddServiceRecord")
);
const VehicleRepairHistory = lazy(() =>
  import("../components/VehicleRepairHistory")
);
const UserNotesCar = lazy(() => import("../components/UserNotesCar"));

const InformationHeaderStyle = styled.div`
  width: 100%;
  text-align: center;

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 0;
    margin: 0 0 10px;
    max-width: 340px;

    div {
      flex: 1 1 80px;
      max-width: 150px;

      h2 {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }
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
  background-color: ${({ theme }) => theme.colors.background.overlayPrimary};
`;

const UserCarDetails = () => {
  const location = useLocation();
  const car = location.state?.car;
  const { t } = useTranslation();
  const [changeHistory, setChangeHistory] = useState(false);
  const changeRepair = useSelector((state) => state.flag.value);

  useEffect(() => {
    if (changeRepair) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [changeRepair]);

  return (
    <>
      <Header
        imagePath={car.image}
        alt={`Image ${car.vehicle_type} the ${car.brand}`}
        title={`${car.brand} ${car.model}`}
        subtitle={`${car.vin_number ? "VIN: " + car.vin_number : ""} ${
          car.serial_number ? "Serial: " + car.serial_number : ""
        } ${car.hin_number ? "HIN: " + car.hin_number : ""}`}
      >
        <InformationHeaderStyle>
          <div>
            {car.year && (
              <div>
                <h2>{t("formAddCar.label.year")}</h2>
                <p>{car.year}</p>
              </div>
            )}
            {car.car_type && (
              <div>
                <h2>{t("formAddCar.label.carType")}</h2>
                <p>{getVehicleSubtypeName(car.car_type, t)}</p>
              </div>
            )}
            {car.color && (
              <div>
                <h2>{t("formAddCar.label.color")}</h2>
                <p>{car.color}</p>
              </div>
            )}
            {car.fuel_type && (
              <div>
                <h2>{t("formAddCar.label.fuelType")}</h2>
                <p>{getFuelTypeName(car.fuel_type, t)}</p>
              </div>
            )}
            {car.mileage && (
              <div>
                <h2>{t("formAddCar.label.mileage")}</h2>
                <p>
                  {car.mileage} {car.mileage_unit}
                </p>
              </div>
            )}
            {car.engine_volume && (
              <div>
                <h2>{t("formAddCar.label.engineVolume")}</h2>
                <p>{car.engine_volume}</p>
              </div>
            )}
          </div>
          <ButtonLink to="/service" variant={"header"}>
            {t("pages.service.contentUserCar.listUserCars.buttonBack")}
          </ButtonLink>
        </InformationHeaderStyle>
      </Header>

      {Object.keys(car).length > 0 && (
        <MaxWidthContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <FormAddServiceRecord
              carId={car.car_id}
              type={car.vehicle_type}
              setChangeHistory={setChangeHistory}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <VehicleRepairHistory
              mileageUnit={car.mileage_unit}
              carId={car.car_id}
              changeHistory={changeHistory}
              setChangeHistory={setChangeHistory}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <UserNotesCar carId={car.car_id} />
          </Suspense>
          {changeRepair && (
            <ModalWindowStyle>
              <FormChangeRepair />
            </ModalWindowStyle>
          )}
        </MaxWidthContainer>
      )}
    </>
  );
};

export default UserCarDetails;
