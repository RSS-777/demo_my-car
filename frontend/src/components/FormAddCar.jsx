import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonForm } from "./ButtonForm";
import { useTranslation } from "react-i18next";
import { createNewCar } from "../api/carsApi";
import { useSelector } from "react-redux";

const FormStyle = styled.form`
   max-width: 480px;
   margin: auto;
   padding: 20px 10px;
   border-radius: 8px;
   color: ${({ theme }) => theme.formAddCar.text};
   box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.formAddCar.shadow};
   background-color: ${({ theme }) => theme.formAddCar.background};

   button {
      margin-top: 40px;
   }
`;

const BlockFildStyle = styled.div`
    div {
        &:first-child {
           display: flex;
            justify-content: space-between;

            select {
                text-align: center;
                width: 250px;
                border-radius: 8px;
                padding: 2px 5px;
                cursor: pointer;
                outline-style: none;
                border: none;
                 box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formAddCar.blockField.input.shadow};

                optgroup {
                   color: ${({ theme }) => theme.formAddCar.blockField.optgroup.text};

                    option {
                        color: ${({theme}) => theme.formAddCar.blockField.option.text};
                    }
                }
            }

            label {
              color: ${({ theme }) => theme.formAddCar.blockField.label};
              text-align: left;
            }

            input {
                border-radius: 8px;
                padding: 2px 5px;
                outline-style: none;
                border: none;
                box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.formAddCar.blockField.input.shadow};
            }

            #image {
                position: relative;
                width: 250px;
                height: 20px;
                border-radius: 10px;
                border: none;
                padding: 0;

                &::before {
                    position: absolute;
                    z-index: 2;
                    left: 0;
                    top: 0;
                    content: "${props => props.$nameInput}";
                    width: 110px;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 20px;
                    background: ${({theme}) => theme.formAddCar.blockField.image.before.background};
                    border-radius: 8px 0 0 8px;
                    cursor: pointer;
                    color: ${({theme}) => theme.formAddCar.blockField.image.before.text};
                }

                &:hover::before {
                    color: ${({ theme }) => theme.formAddCar.blockField.image.hover.text}; 
                }

                &::after {
                    position: absolute;
                    right: 0;
                    top: 0;
                    content: "${(prop) => prop.$nameFile ? prop.$nameFile : prop.$nameNotFile}";
                    width: 145px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 21px;
                    background: ${({theme}) => theme.formAddCar.blockField.image.after.background};
                    color: ${({theme}) => theme.formAddCar.blockField.image.after.text};
                }
            }

            #mileage-block {
               width: 250px;
               display: flex;
               gap: 5px;
               box-sizing: border-box;

               #mileage {
                  width: 110px;
               }

               #mileage-unit {
                  width: 120px;
                  text-align: center;
               }
            }

            @media (max-width: 580px) {
               display: flex;
               flex-direction: column;
               align-items: center;

               input {
                 width: 90%;
               }
            }
        }
    }
`;

const BlockErrorStyle = styled.div`
    line-height: 16px;
    color: ${({ theme }) => theme.formAddCar.blockError.text};
    font-size: 12px;
    height: 16px;
    text-align: right;

    @media (max-width: 580px) {
       text-align: center;
    }
`;

const FormAddCar = ({ closeAddCar, setMessageServer }) => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" })
    const [inputFile, setInputFile] = useState(false)
    const { t } = useTranslation()
    const token = useSelector((state) => state.user.token)

    const onSubmit = async (data) => {
        const response = await createNewCar(token, data, t)

        if (!response.success) {
            setMessageServer(response.message)
            setTimeout(() => { setMessageServer('') }, 2000)
        } else {
            setMessageServer('')
            reset()
            closeAddCar()
        }
    }

    const vehicleType = watch('vehicleType');
    const selectedFile = watch('image');

    useEffect(() => {
        reset()
        reset({ vehicleType })
    }, [vehicleType, reset]);

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            setInputFile(selectedFile[0].name)
        }
    }, [selectedFile]);

    return (
        <FormStyle action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
            <BlockFildStyle>
                <div>
                    <label htmlFor="vehicle-type">{t("formAddCar.label.vehicleType")}</label>
                    <select id="vehicle-type" {...register('vehicleType', { required: t("formAddCar.select.vehicleType.required") })}>
                        <option value="">{t("formAddCar.select.vehicleType.choiceOption")}</option>
                        <optgroup label={t("formAddCar.select.vehicleType.optgroupOne")}>
                            <option value="bicycle">{t("formAddCar.select.vehicleType.option.bicycle")}</option>
                            <option value="scooter">{t("formAddCar.select.vehicleType.option.scooter")}</option>
                            <option value="motorcycle">{t("formAddCar.select.vehicleType.option.motorcycle")}</option>
                            <option value="atv">{t("formAddCar.select.vehicleType.option.atv")}</option>
                            <option value="snowmobile">{t("formAddCar.select.vehicleType.option.snowmobile")}</option>
                            <option value="car">{t("formAddCar.select.vehicleType.option.car")}</option>
                            <option value="truck">{t("formAddCar.select.vehicleType.option.truck")}</option>
                            <option value="bus">{t("formAddCar.select.vehicleType.option.bus")}</option>
                        </optgroup>
                        <optgroup label={t("formAddCar.select.vehicleType.optgroupTwo")}>
                            <option value="boat">{t("formAddCar.select.vehicleType.option.boat")}</option>
                            <option value="jet_ski">{t("formAddCar.select.vehicleType.option.jet_ski")}</option>
                            <option value="yacht">{t("formAddCar.select.vehicleType.option.yacht")}</option>
                        </optgroup>
                        <optgroup label={t("formAddCar.select.vehicleType.optgroupThree")}>
                            <option value="other">{t("formAddCar.select.vehicleType.option.other")}</option>
                        </optgroup>
                    </select>
                </div>
                <BlockErrorStyle>{errors.vehicleType?.message}</BlockErrorStyle>
            </BlockFildStyle>

            {vehicleType &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="brand">{t("formAddCar.label.brand")}</label>
                        <input type="text" id="brand"{...register('brand', { required: t("formAddCar.input.brand") })} />
                    </div>
                    <BlockErrorStyle>{errors.brand?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {vehicleType &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="model">{t("formAddCar.label.model")}</label>
                        <input type="text" id="model" {...register('model', { required: t("formAddCar.input.model") })} />
                    </div>
                    <BlockErrorStyle>{errors.model?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {vehicleType &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="year">{t("formAddCar.label.year")}</label>
                        <input
                            type="text"
                            id="year"
                            {...register('year', {
                                required: t("formAddCar.input.year.required"),
                                pattern: {
                                    value: /^\d{4}$/,
                                    message: t("formAddCar.input.year.pattern")
                                },
                                validate: (value) => {
                                    const year = parseInt(value, 10);
                                    const currentYear = new Date().getFullYear();
                                    return (
                                        year <= currentYear || t("formAddCar.input.year.validate")
                                    )
                                }
                            })} />
                    </div>
                    <BlockErrorStyle>{errors.year?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['scooter', 'motorcycle', 'atv', 'snowmobile', 'car', 'truck', 'bus', 'boat', 'jet_ski', 'yacht', 'other'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="mileage">{t("formAddCar.label.mileage")}</label>
                        <div id="mileage-block">
                            <input
                                type="text"
                                id="mileage"
                                {...register('mileage', {
                                    required: t("formAddCar.input.mileage.required"),
                                    min: {
                                        value: 0,
                                        message: t("formAddCar.input.mileage.min"),
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: t("formAddCar.input.mileage.pattern")
                                    }
                                })}
                            />
                            <select id="mileage-unit" {...register('mileageUnit')}>
                                <option value="km">{t("formAddCar.select.mileage.km")}</option>
                                <option value="mi">{t("formAddCar.select.mileage.miles")}</option>
                                <option value="h">{t("formAddCar.select.mileage.hours")}</option>
                            </select>
                        </div>
                    </div>
                    <BlockErrorStyle>{errors.mileage?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['car', 'truck', 'bus', 'motorcycle'].includes(vehicleType) && (
                <BlockFildStyle>
                    <div>
                        <label htmlFor="car-type">{t("formAddCar.label.carType")}</label>
                        <select id="car-type" {...register('carType', { required: t("formAddCar.select.carType.required") })}>
                            <option value="">{t("formAddCar.select.carType.choiceOption")}</option>

                            {vehicleType === 'car' && (
                                <>
                                    <option value="sedan">{t("formAddCar.select.carType.option.sedan")}</option>
                                    <option value="hatchback">{t("formAddCar.select.carType.option.hatchback")}</option>
                                    <option value="wagon">{t("formAddCar.select.carType.option.wagon")}</option>
                                    <option value="coupe">{t("formAddCar.select.carType.option.coupe")}</option>
                                    <option value="convertible">{t("formAddCar.select.carType.option.convertible")}</option>
                                    <option value="suv">{t("formAddCar.select.carType.option.suv")}</option>
                                    <option value="minivan">{t("formAddCar.select.carType.option.minivan")}</option>
                                    <option value="crossover">{t("formAddCar.select.carType.option.crossover")}</option>
                                    <option value="roadster">{t("formAddCar.select.carType.option.roadster")}</option>
                                    <option value="pickup">{t("formAddCar.select.carType.option.pickup")}</option>
                                </>
                            )}

                            {vehicleType === 'truck' && (
                                <>
                                    <option value="pickup">{t("formAddCar.select.carType.option.pickup")}</option>
                                    <option value="flatbed">{t("formAddCar.select.carType.option.flatbed")}</option>
                                    <option value="van">{t("formAddCar.select.carType.option.van")}</option>
                                    <option value="tipper">{t("formAddCar.select.carType.option.tipper")}</option>
                                </>
                            )}

                            {vehicleType === 'bus' && (
                                <>
                                    <option value="city">{t("formAddCar.select.carType.option.city")}</option>
                                    <option value="coach">{t("formAddCar.select.carType.option.coach")}</option>
                                    <option value="minibus">{t("formAddCar.select.carType.option.minibus")}</option>
                                </>
                            )}

                            {vehicleType === 'motorcycle' && (
                                <>
                                    <option value="cruiser">{t("formAddCar.select.carType.option.cruiser")}</option>
                                    <option value="sport">{t("formAddCar.select.carType.option.sport")}</option>
                                    <option value="touring">{t("formAddCar.select.carType.option.touring")}</option>
                                    <option value="dirt">{t("formAddCar.select.carType.option.dirt")}</option>
                                </>
                            )}

                        </select>
                    </div>
                    <BlockErrorStyle>{errors.carType?.message}</BlockErrorStyle>
                </BlockFildStyle>
            )}

            {['scooter', 'motorcycle', 'atv', 'snowmobile', 'car', 'truck', 'bus', 'boat', 'jet_ski', 'yacht', 'other'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="fuel-type">{t("formAddCar.label.fuelType")}</label>
                        <select
                            id="fuel-type"
                            {...register('fuelType', { required: t("formAddCar.select.fuelType.required") })}
                        >
                            <option value="">{t("formAddCar.select.fuelType.choiceOption")}</option>
                            <option value="petrol">{t("formAddCar.select.fuelType.option.petrol")}</option>
                            <option value="diesel">{t("formAddCar.select.fuelType.option.diesel")}</option>
                            <option value="electric">{t("formAddCar.select.fuelType.option.electric")}</option>
                            <option value="hybrid">{t("formAddCar.select.fuelType.option.hybrid")}</option>
                            <option value="gas">{t("formAddCar.select.fuelType.option.gas")}</option>
                            <option value="hydrogen">{t("formAddCar.select.fuelType.option.hydrogen")}</option>
                        </select>
                    </div>
                    <BlockErrorStyle>{errors.fuelType?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['scooter', 'motorcycle', 'atv', 'snowmobile', 'car', 'truck', 'bus', 'boat', 'jet_ski', 'yacht', 'other'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="engine-volume">{t("formAddCar.label.engineVolume")}</label>
                        <input
                            id="engine-volume"
                            type="number"
                            {...register('engineVolume', { required: t("formAddCar.input.engineVolume.required"), min: { value: 0, message: t("formAddCar.input.engineVolume.min") } })}
                            step="0.01"
                        />
                    </div>
                    <BlockErrorStyle>{errors.engineVolume?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {vehicleType &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="color">{t("formAddCar.label.color")}</label>
                        <input
                            type="text"
                            id="color"
                            {...register('color', {
                                required: t("formAddCar.input.color.required"),
                                minLength: {
                                    value: 3,
                                    message: t("formAddCar.input.color.minLength")
                                }
                            })} />
                    </div>
                    <BlockErrorStyle>{errors.color?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['scooter', 'motorcycle', 'atv', 'snowmobile', 'car', 'truck', 'bus'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="vin">{t("formAddCar.label.vin")}</label>
                        <input type="text" id="vin" {...register('vinNumber', {
                            required: t("formAddCar.input.vin.required"),
                            validate: {
                                correctLength: value => value.length === 17 || t("formAddCar.input.vin.correctLength"),
                                validFormat: value => /^[A-HJ-NPR-Z0-9]{17}$/.test(value) || t("formAddCar.input.vin.validFormat")
                            }
                        })} />
                    </div>
                    <BlockErrorStyle>{errors.vinNumber?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['bicycle'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="serial-number">{t("formAddCar.label.serialNumber")}</label>
                        <input type="text" id="serial-number" {...register('serialNumber', {
                            required: t("formAddCar.input.serialNumber.required"),
                            validate: {
                                correctLength: value => value.length > 0 || t("formAddCar.input.serialNumber.validate")
                            }
                        })} />
                    </div>
                    <BlockErrorStyle>{errors.serialNumber?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {['boat', 'jet_ski', 'yacht'].includes(vehicleType) &&
                <BlockFildStyle>
                    <div>
                        <label htmlFor="hin-number">{t("formAddCar.label.hinNumber")}</label>
                        <input type="text" id="hin-number" {...register('hinNumber', {
                            required: t("formAddCar.input.hinNumber.required"),
                            validate: {
                                correctLength: value => value.length === 12 || t("formAddCar.input.hinNumber.correctLength"),
                                validFormat: value => /^[A-Z0-9]{12}$/.test(value) || t("formAddCar.input.hinNumber.validFormat")
                            }
                        })} />
                    </div>
                    <BlockErrorStyle>{errors.hinNumber?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }

            {vehicleType &&
                <BlockFildStyle
                    $nameFile={inputFile}
                    $nameInput={t("formAddCar.props.nameInput")}
                    $nameNotFile={t("formAddCar.props.nameNotFile")}
                >
                    <div>
                        <label htmlFor="image">{t("formAddCar.label.image")}</label>
                        <input
                            type="file"
                            id="image"
                            {...register('image', {
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
                                        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                                        if (file && !allowedTypes.includes(file.type)) {
                                            return t("formAddCar.input.image.invalidFormat");
                                        }
                                        return true;
                                    }
                                }
                            })}
                        />
                    </div>
                    <BlockErrorStyle>{errors.image?.message}</BlockErrorStyle>
                </BlockFildStyle>
            }
            {vehicleType &&
                <ButtonForm type="submit">{t("formAddCar.button.image")}</ButtonForm>
            }
        </FormStyle>
    )
};

export default FormAddCar;