import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonCard } from "./ButtonCard";
import { forwardRef } from "react";

const ContainerStyle = styled.div`
  flex: 1 1 262px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  max-width: 280px;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background.cardSecondary};

  div:first-child {
    display: flex;
    gap: 10px;
    align-items: flex-start;

    img {
      width: 80px;
      max-width: 100%;
      border-radius: 5px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h3 {
        color: ${({ theme }) => theme.colors.text.heading3};
        font-size: 18px;
        margin: 0;
      }

      p {
        color: ${({ theme }) => theme.colors.text.subtitle};
        margin: 0;
      }
    }
  }
`;

const ButtonsStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const VehicleCard = forwardRef(({ card, handleDeleteCar }, ref) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoTo = (id, car) => {
    navigate(`/car/${id}`, { state: { car } });
  };

  return (
    <ContainerStyle key={card.car_id} ref={ref}>
      <div>
        <img src={card.image} alt="Image vehicle" />
        <div>
          <h3>
            {card.brand} {card.model}
          </h3>
          <p>{card.serial_number || card.hin_number || card.vin_number}</p>
        </div>
      </div>
      <ButtonsStyle>
        <ButtonCard onClick={() => handleGoTo(card.car_id, card)}>
          {t("pages.service.contentUserCar.listUserCars.buttonView")}
        </ButtonCard>
        <ButtonCard
          onClick={() => handleDeleteCar(card.car_id, card.image)}
          variant="delete"
        >
          {t("pages.service.contentUserCar.listUserCars.buttonDelete")}
        </ButtonCard>
      </ButtonsStyle>
    </ContainerStyle>
  );
});
