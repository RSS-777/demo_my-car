import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { gettingPrice, changePrice } from "../api/priceApi";
import { ButtonCard } from "./ButtonCard";
import { InputField } from "./InputField";
import { StatusMessage } from "./StatusMessage";
import styled from "styled-components";

const FormStyle = styled.form`
  max-width: 350px;
  width: 100%;
  margin: auto;
  padding: 0 0 20px;
  text-align: center;

  button {
    margin-top: 10px;
  }
`;

const BlockFildStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const ChangeCostAdmin = () => {
  const [dataPrice, setDataPrice] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const tokenAdmin = useSelector((state) => state.admin.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await gettingPrice(t);
      if (response.success) {
        setDataPrice(response.data);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, price, value) => {
    const validValue = value === "" ? "" : Number(value);
    const updataTariffs = [...dataPrice];
    updataTariffs[index][price] = isNaN(validValue) ? "" : validValue;
    setDataPrice(updataTariffs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    const hasEmptyFields = dataPrice.some(
      (item) => item.price === null || item.price === ""
    );

    if (hasEmptyFields) {
      setStatusMessage(t("pages.admin.changeTariff.required"));
      return;
    }

    const response = await changePrice(tokenAdmin, dataPrice, t);
    setStatusMessage(
      response.success
        ? t("pages.admin.changeTariff.success")
        : t("pages.admin.changeTariff.failed")
    );
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
  };

  const nameTariff = {
    basic: t("FormChangeTariff.blockTextStyle.p.basic.tariff"),
    family: t("FormChangeTariff.blockTextStyle.p.family.tariff"),
    business: t("FormChangeTariff.blockTextStyle.p.business.tariff"),
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <BlockFildStyle>
          {dataPrice?.map((item, index) => (
            <InputField
              key={index}
              label={nameTariff[item.tariff]}
              id={`change-cost-tariff-${index}`}
              type="text"
              value={item.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
            />
          ))}
        </BlockFildStyle>
        <ButtonCard type="submit">
          {t("pages.admin.changeTariff.button")}
        </ButtonCard>
      </FormStyle>
      {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
    </>
  );
};

export default ChangeCostAdmin;
