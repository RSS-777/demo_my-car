import { useState, useEffect } from "react";
import { getAdvertisingAll } from "../api/apiAdvertising";
import { ButtonCard } from "./ButtonCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { updateAdvertising } from "../api/apiAdvertising";
import { StatusMessage } from "./StatusMessage";
import { InputField } from "./InputField";
import styled from "styled-components";

const FormStyle = styled.form`
  text-align: center;

  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  button {
    margin: 20px;
  }
`;

const ContainerFieldStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  margin-top: 10px;

  h2 {
    font-size: 16px;
    margin: 0;
    color: ${({ theme }) => theme.colors.table.th};
  }
`;

const ChangeAdvertisingAdmin = () => {
  const [advertisingData, setAdvertisingData] = useState([]);
  const [fetchMessage, setFetchMessage] = useState("");
  const [sendData, setSendData] = useState(false);
  const tokenAdmin = useSelector((state) => state.admin.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAdvertising = async () => {
      const response = await getAdvertisingAll(t);

      if (response.success) {
        setAdvertisingData(response.data);
      } else {
        setFetchMessage(response.error);
        setTimeout(() => setFetchMessage(""), 2000);
      }
    };
    fetchAdvertising();
  }, [sendData]);

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;

    setAdvertisingData((prevData) => {
      const updateData = [...prevData];
      updateData[index] = {
        ...updateData[index],
        [field]: value,
      };
      return updateData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateAdvertising(tokenAdmin, advertisingData, t);
    if (response.success) {
      setFetchMessage(response.message);
      setTimeout(() => setFetchMessage(""), 2000);
      setSendData((prev) => !prev);
    } else {
      setFetchMessage(response.error);
      setTimeout(() => setFetchMessage(""), 2000);
    }
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <div>
          {advertisingData?.map((elem, index) => (
            <fieldset key={index}>
              <legend>{`${t("pages.admin.changeAdvertising.banner")} ${
                index + 1
              }`}</legend>
              <ContainerFieldStyle>
                <h2>{t("pages.admin.changeAdvertising.h5Title")}</h2>
                <InputField
                  label={t("pages.admin.changeAdvertising.label.ua")}
                  id={`change-adv-title-ua-${index}`}
                  type="text"
                  value={elem.title_ua}
                  onChange={(e) => handleInputChange(e, index, "title_ua")}
                />

                <InputField
                  label={t("pages.admin.changeAdvertising.label.ru")}
                  id={`change-adv-title-ru-${index}`}
                  type="text"
                  value={elem.title_ru}
                  onChange={(e) => handleInputChange(e, index, "title_ru")}
                />
                <InputField
                  label={t("pages.admin.changeAdvertising.label.en")}
                  id={`change-adv-title-en-${index}`}
                  type="text"
                  value={elem.title_en}
                  onChange={(e) => handleInputChange(e, index, "title_en")}
                />
              </ContainerFieldStyle>
              <ContainerFieldStyle>
                <h2>{t("pages.admin.changeAdvertising.h5Text")}</h2>
                <InputField
                  label={t("pages.admin.changeAdvertising.label.ua")}
                  id={`change-adv-text-ua-${index}`}
                  type="text"
                  value={elem.text_ua}
                  onChange={(e) => handleInputChange(e, index, "text_ua")}
                />
                <InputField
                  label={t("pages.admin.changeAdvertising.label.ru")}
                  id={`change-adv-text-ru-${index}`}
                  type="text"
                  value={elem.text_ru}
                  onChange={(e) => handleInputChange(e, index, "text_ru")}
                />
                <InputField
                  label={t("pages.admin.changeAdvertising.label.en")}
                  id={`change-adv-text-en-${index}`}
                  type="text"
                  value={elem.text_en}
                  onChange={(e) => handleInputChange(e, index, "text_en")}
                />
              </ContainerFieldStyle>
              <ContainerFieldStyle>
                <InputField
                  label={t("pages.admin.changeAdvertising.label.image")}
                  id={`change-adv-image-${index}`}
                  type="text"
                  value={elem.image}
                  onChange={(e) => handleInputChange(e, index, "image")}
                />
              </ContainerFieldStyle>
            </fieldset>
          ))}
        </div>
        <ButtonCard type="submit">
          {t("pages.admin.changeAdvertising.button")}
        </ButtonCard>
      </FormStyle>
      {fetchMessage && <StatusMessage>{fetchMessage}</StatusMessage>}
    </>
  );
};

export default ChangeAdvertisingAdmin;
