import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";
import { createNewCar } from "../api/carsApi";
import { useSelector } from "react-redux";
import { InputError } from "./InputError";
import { InputField } from "./InputField";
import { InputSelectField } from "./InputSelectField";
import { SelectField } from "./SelectField";
import { getCarTypeOptions } from "../constants/vehicleTypes";
import { getFuelTypeOptions } from "../constants/fuelType";
import { getVehicleCategories } from "../constants/vehicleCategories";
import { FileField } from "./FileField";

const FormStyle = styled.form`
  max-width: 380px;
  margin: 0 auto 10px;
  padding: 20px 0;

  button {
    margin-top: 40px;
  }
`;

export const FormAddCar = ({ closeAddCar, setMessageServer }) => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [inputFile, setInputFile] = useState(false);
  const { t } = useTranslation();
  const token = useSelector((state) => state.user.token);

  const onSubmit = async (data) => {
    const response = await createNewCar(token, data, t);

    if (!response.success) {
      setMessageServer(response.message);
      setTimeout(() => {
        setMessageServer("");
      }, 2000);
    } else {
      setMessageServer("");
      reset();
      closeAddCar();
    }
  };

  const vehicleType = watch("vehicleType");
  const selectedFile = watch("image");

  // useEffect(() => {
  //   reset();
  //   reset({ vehicleType });
  // }, [vehicleType, reset]);

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setInputFile(selectedFile[0].name);
    }
  }, [selectedFile]);

  return (
    <FormStyle action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <SelectField
          id="vehicle-type"
          label={t("formAddCar.label.vehicleType")}
          register={register("vehicleType", {
            required: t("formAddCar.select.vehicleType.required"),
          })}
          options={getVehicleCategories(t)}
        />
        <InputError error={errors.vehicleType?.message} />
      </div>

      {vehicleType && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.brand")}
            id="brand"
            register={register("brand", {
              required: t("formAddCar.input.brand"),
            })}
          />
          <InputError error={errors.brand?.message} />
        </div>
      )}

      {vehicleType && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.model")}
            id="model"
            register={register("model", {
              required: t("formAddCar.input.model"),
            })}
          />
          <InputError error={errors.model?.message} />
        </div>
      )}

      {vehicleType && (
        <div>
          <InputField
            type="number"
            label={t("formAddCar.label.year")}
            id="year"
            register={register("year", {
              required: t("formAddCar.input.year.required"),
              pattern: {
                value: /^\d{4}$/,
                message: t("formAddCar.input.year.pattern"),
              },
              validate: (value) => {
                const year = parseInt(value, 10);
                const currentYear = new Date().getFullYear();
                return (
                  year <= currentYear || t("formAddCar.input.year.validate")
                );
              },
            })}
          />
          <InputError error={errors.year?.message} />
        </div>
      )}

      {[
        "scooter",
        "motorcycle",
        "atv",
        "snowmobile",
        "car",
        "truck",
        "bus",
        "boat",
        "jet_ski",
        "yacht",
        "other",
      ].includes(vehicleType) && (
        <div>
          <InputSelectField
            type="number"
            label={t("formAddCar.label.mileage")}
            id="mileage"
            registerInput={register("mileage", {
              required: t("formAddCar.input.mileage.required"),
              min: {
                value: 0,
                message: t("formAddCar.input.mileage.min"),
              },
              pattern: {
                value: /^[0-9]+$/,
                message: t("formAddCar.input.mileage.pattern"),
              },
            })}
            registerSelect={register("mileageUnit")}
            options={[
              { value: "km", label: t("formAddCar.select.mileage.km") },
              { value: "mi", label: t("formAddCar.select.mileage.miles") },
              { value: "h", label: t("formAddCar.select.mileage.hours") },
            ]}
          />
          <InputError error={errors.mileage?.message} />
        </div>
      )}

      {["car", "truck", "bus", "motorcycle"].includes(vehicleType) && (
        <div>
          <SelectField
            label={t("formAddCar.label.carType")}
            id="car-type"
            register={register("carType", {
              required: t("formAddCar.select.carType.required"),
            })}
            options={[
              { value: "", label: t("formAddCar.select.carType.choiceOption") },
              ...getCarTypeOptions(vehicleType, t),
            ]}
          />
          <InputError error={errors.carType?.message} />
        </div>
      )}

      {[
        "scooter",
        "motorcycle",
        "atv",
        "snowmobile",
        "car",
        "truck",
        "bus",
        "boat",
        "jet_ski",
        "yacht",
        "other",
      ].includes(vehicleType) && (
        <div>
          <SelectField
            label={t("formAddCar.label.fuelType")}
            id="fuel-type"
            register={register("fuelType", {
              required: t("formAddCar.select.fuelType.required"),
            })}
            options={[
              {
                value: "",
                label: t("formAddCar.select.fuelType.choiceOption"),
              },
              ...getFuelTypeOptions(t),
            ]}
          />
          <InputError error={errors.fuelType?.message} />
        </div>
      )}

      {[
        "scooter",
        "motorcycle",
        "atv",
        "snowmobile",
        "car",
        "truck",
        "bus",
        "boat",
        "jet_ski",
        "yacht",
        "other",
      ].includes(vehicleType) && (
        <div>
          <InputField
            type="number"
            label={t("formAddCar.label.engineVolume")}
            id="engine-volume"
            register={register("engineVolume", {
              required: t("formAddCar.input.engineVolume.required"),
              min: {
                value: 0,
                message: t("formAddCar.input.engineVolume.min"),
              },
            })}
            step="0.01"
          />
          <InputError error={errors.engineVolume?.message} />
        </div>
      )}

      {vehicleType && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.color")}
            id="color"
            register={register("color", {
              required: t("formAddCar.input.color.required"),
              minLength: {
                value: 3,
                message: t("formAddCar.input.color.minLength"),
              },
            })}
          />
          <InputError error={errors.color?.message} />
        </div>
      )}

      {[
        "scooter",
        "motorcycle",
        "atv",
        "snowmobile",
        "car",
        "truck",
        "bus",
      ].includes(vehicleType) && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.vin")}
            id="vin"
            register={register("vinNumber", {
              required: t("formAddCar.input.vin.required"),
              validate: {
                correctLength: (value) =>
                  value.length === 17 ||
                  t("formAddCar.input.vin.correctLength"),
                validFormat: (value) =>
                  /^[A-HJ-NPR-Z0-9]{17}$/.test(value) ||
                  t("formAddCar.input.vin.validFormat"),
              },
            })}
          />
          <InputError error={errors.vinNumber?.message} />
        </div>
      )}

      {["bicycle"].includes(vehicleType) && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.serialNumber")}
            id="serial-number"
            register={register("serialNumber", {
              required: t("formAddCar.input.serialNumber.required"),
              validate: {
                correctLength: (value) =>
                  value.length > 0 ||
                  t("formAddCar.input.serialNumber.validate"),
              },
            })}
          />
          <InputError error={errors.serialNumber?.message} />
        </div>
      )}

      {["boat", "jet_ski", "yacht"].includes(vehicleType) && (
        <div>
          <InputField
            type="text"
            label={t("formAddCar.label.hinNumber")}
            id="hin-number"
            register={register("hinNumber", {
              required: t("formAddCar.input.hinNumber.required"),
              validate: {
                correctLength: (value) =>
                  value.length === 12 ||
                  t("formAddCar.input.hinNumber.correctLength"),
                validFormat: (value) =>
                  /^[A-Z0-9]{12}$/.test(value) ||
                  t("formAddCar.input.hinNumber.validFormat"),
              },
            })}
          />
          <InputError error={errors.hinNumber?.message} />
        </div>
      )}

      {vehicleType && (
        <div>
          <FileField
            nameFile={
              inputFile
                ? inputFile.length > 15
                  ? inputFile.slice(0, 15) + "..."
                  : inputFile
                : ""
            }
            nameInput={t("formAddCar.props.nameInput")}
            nameNotFile={t("formAddCar.props.nameNotFile")}
            label={t("formAddCar.label.image")}
            id="image"
            register={register("image", {
              required: t("formAddCar.input.image.required"),
              validate: {
                fileSize: (fileList) => {
                  const file = fileList?.[0];
                  if (file && file.size > 256 * 1024) {
                    return t("formAddCar.input.image.maxSize");
                  }
                  return true;
                },
                fileType: (fileList) => {
                  const file = fileList?.[0];
                  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                  if (file && !allowedTypes.includes(file.type)) {
                    return t("formAddCar.input.image.invalidFormat");
                  }
                  return true;
                },
              },
            })}
          />
          <InputError error={errors.image?.message} />
        </div>
      )}
      {vehicleType && (
        <Button type="submit">{t("formAddCar.button.submit")}</Button>
      )}
    </FormStyle>
  );
};