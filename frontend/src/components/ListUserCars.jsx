import { useEffect, useState, useRef } from "react";
import { getUserCars } from "../api/carsApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteUserCar } from "../api/carsApi";
import { FormAddServiceRecord } from "./FormAddServiceRecord";
import { VehicleRepairHistory } from "./VehicleRepairHistory";
import { UserNotesCar } from "./UserNotesCar";
import { getUserTariff } from "../api/api";
import styled from "styled-components";

const ContainerStyle = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;

    h5 {
        padding: 0 10px 10px;
        margin: 10px 0 0;
        color: ${({ theme }) => theme.listUserCars.h5};
    }
`;

const BlockSearchStyle = styled.div`
   display: flex;
   flex-direction: column;
   align-items: start;
   position: absolute;
   z-index: 3;
   top: 10px;
   left: 20px;

    >div {
        input {
            border-radius: 5px;
            margin-right: 5px;
            padding: 0 5px;
            border: none;
            outline-style: none;
            box-shadow: 0.5px 0.5px 3px 0 ${({theme}) => theme.listUserCars.blockSearch.input.shadow};
            padding: 3px 5px;
            font-size: 12px;
            outline-style: none;
        }
        
        button {
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.listUserCars.blockSearch.button.shadow};
            background: ${({ theme }) => theme.listUserCars.blockSearch.button.background};
            color: ${({ theme }) => theme.listUserCars.blockSearch.button.text};
            border: none;
            padding: 3px 5px;
            font-size: 12px;
            
            &:hover {
                box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.listUserCars.blockSearch.button.hover.shadow};
                background:  ${({ theme }) => theme.listUserCars.blockSearch.button.hover.background};
                color: ${({ theme }) => theme.listUserCars.blockSearch.button.hover.text};
            }
        }
    }

    span {
        margin-top: 5px;
        font-size: 10px;
        color: ${({ theme }) => theme.listUserCars.blockSearch.span};
    }
`;

const BlockVehicleStyle = styled.div`
    height: 90px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0.5px 0.5px 3px 0 ${({ theme }) => theme.listUserCars.blockVehicle.shadow};
    background-color: ${({theme}) => theme.listUserCars.blockVehicle.background};
    border: 10px;
    border-radius: 10px;

    &.open {
        height: auto;
    }

    >div {
        position: relative;
        display: flex;
        gap: 10px;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        img {
            width: 80px;
            max-width: 100%;
        }
    }

    &:hover {
       box-shadow: 0.5px 0.5px 1px 0 ${({ theme }) => theme.listUserCars.blockVehicle.hover.shadow};
    }
`;

const BlockElementStyle = styled.div`
    position: relative;
    width: 100%;
    text-align: left;

    ul {
        list-style: none;
    }

    li {
        color: ${({ theme }) => theme.listUserCars.blockElement.li};
    }

    @media (max-width: 580px) {
        ul {
            padding-left: 10px;
        }
    }
`;

const ButtonDeleteCarStyle = styled.button`
   color:  ${({theme}) => theme.listUserCars.buttonDeleteCar.text};
   position: absolute;
   top: 5px;
   right: 0;
   background: ${({theme}) => theme.listUserCars.buttonDeleteCar.background};
   border: none;
   font-size: 12px;
   cursor: pointer;

   &:hover {
      color: ${({ theme }) => theme.listUserCars.buttonDeleteCar.hover.text};
   }
`;

const ButtonOpenStyle = styled.button`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-width: 1px 1px 0 1px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    color: ${({ theme }) => theme.listUserCars.buttonOpen.text};
    background: ${({ theme }) => theme.listUserCars.buttonOpen.background};

    &.button-active {
      color: ${({ theme }) => theme.listUserCars.buttonOpen.active.text};
    }
    &:hover {
      background: ${({ theme }) => theme.listUserCars.buttonOpen.hover.background};
      color: ${({ theme }) => theme.listUserCars.buttonOpen.hover.text};
    }
`;

const DetalisBlockStyle = styled.div`
    margin: 0 auto 25px;
    padding: 0;
    overflow-x: auto;
    
    table {
        margin: 10px auto;
        border: 1px solid black;
        border-collapse: collapse;

        th {
           color: ${({ theme }) => theme.listUserCars.detalisBlock.th};
        }

        td {
           color: ${({ theme }) => theme.listUserCars.detalisBlock.td};
        }

        th, td {
        border: 2px solid ${({theme}) => theme.listUserCars.detalisBlock.border};
        padding: 3px;
        }
    }
`;

const MessageCountStyle = styled.p`
   span {
       color: ${({theme}) => theme.listUserCars.messageCount.span};
       margin-right: 5px;
   }
`;

const TitleAddRecordStyle = styled.p`
   color: ${({ theme }) => theme.listUserCars.titleAdd.text};
`;

const quantityAllowed = {
    basic: 1,
    family: 5,
    business: Infinity
};

export const ListUserCars = ({ setIsCar, addCar, setLockButton }) => {
    const [listCars, setListCars] = useState({})
    const [changeHistory, setChangeHistory] = useState(false)
    const [tariff, setTariff] = useState()
    const [removedCount, setRemovedCount] = useState(0)
    const changeRepair = useSelector((state) => state.flag.value)
    const token = useSelector((state) => state.user.token)
    const { t } = useTranslation()
    const [deletedCarId, setDletedCarId] = useState(null)
    const [openNumberBlock, setOpenNumberBlock] = useState(null)
    const [searchMessage, setSearchMessage] = useState('')
    const inputReff = useRef()
    const blockReffs = useRef({});

    const typeNames = {
        bicycle: t("pages.service.contentUserCar.listUserCars.typeNames.bicycle"),
        scooter: t("pages.service.contentUserCar.listUserCars.typeNames.scooter"),
        motorcycle: t("pages.service.contentUserCar.listUserCars.typeNames.motorcycle"),
        atv: t("pages.service.contentUserCar.listUserCars.typeNames.atv"),
        snowmobile: t("pages.service.contentUserCar.listUserCars.typeNames.snowmobile"),
        car: t("pages.service.contentUserCar.listUserCars.typeNames.car"),
        truck: t("pages.service.contentUserCar.listUserCars.typeNames.truck"),
        bus: t("pages.service.contentUserCar.listUserCars.typeNames.bus"),
        boat: t("pages.service.contentUserCar.listUserCars.typeNames.boat"),
        jet_ski: t("pages.service.contentUserCar.listUserCars.typeNames.jet_ski"),
        yacht: t("pages.service.contentUserCar.listUserCars.typeNames.yacht"),
        other: t("pages.service.contentUserCar.listUserCars.typeNames.other")
    };

    const fuelType = {
        petrol: t("formAddCar.select.fuelType.option.petrol"),
        diesel: t("formAddCar.select.fuelType.option.diesel"),
        electric: t("formAddCar.select.fuelType.option.electric"),
        hybrid: t("formAddCar.select.fuelType.option.hybrid"),
        gas: t("formAddCar.select.fuelType.option.gas"),
        hydrogen: t("formAddCar.select.fuelType.option.hydrogen")
    };

    const carType = {
        sedan: t("formAddCar.select.carType.option.sedan"),
        hatchback: t("formAddCar.select.carType.option.hatchback"),
        wagon: t("formAddCar.select.carType.option.wagon"),
        coupe: t("formAddCar.select.carType.option.coupe"),
        convertible: t("formAddCar.select.carType.option.convertible"),
        suv: t("formAddCar.select.carType.option.suv"),
        minivan: t("formAddCar.select.carType.option.minivan"),
        crossover: t("formAddCar.select.carType.option.crossover"),
        roadster: t("formAddCar.select.carType.option.roadster"),
        pickup: t("formAddCar.select.carType.option.pickup"),
        flatbed: t("formAddCar.select.carType.option.flatbed"),
        van: t("formAddCar.select.carType.option.van"),
        tipper: t("formAddCar.select.carType.option.tipper"),
        city: t("formAddCar.select.carType.option.city"),
        coach: t("formAddCar.select.carType.option.coach"),
        minibus: t("formAddCar.select.carType.option.minibus"),
        cruiser: t("formAddCar.select.carType.option.cruiser"),
        sport: t("formAddCar.select.carType.option.sport"),
        touring: t("formAddCar.select.carType.option.touring"),
        dirt: t("formAddCar.select.carType.option.dirt")
    };

    useEffect(() => {
        if (Object.keys(listCars).length > 0) {
            setIsCar(true)
        }
    }, [listCars, deletedCarId])

    useEffect(() => {
        const fetchTariff = async () => {
            const response = await getUserTariff(token, t)
            if (response.success) {
                setTariff(response.data.tariff)
            }
        }

        fetchTariff()
    }, [])

    useEffect(() => {
        const fetchCars = async () => {
            const response = await getUserCars(token, t)

            if (response.success) {
                const countElements = response.data.data.slice(0, quantityAllowed[tariff])
                setRemovedCount(response.data.data.length - countElements.length)
                const limit = (tariff === 'basic') ? 1 : (tariff === 'family' ? 5 : Infinity)
                setLockButton(countElements.length >= limit);
                const groupedCars = countElements.reduce((acc, car) => {
                    if (!acc[car.vehicle_type]) {
                        acc[car.vehicle_type] = []
                    }
                    acc[car.vehicle_type].push(car)
                    return acc
                }, {})

                setListCars(groupedCars)
            }
        }
        fetchCars()
    }, [addCar, deletedCarId, changeHistory, changeRepair, tariff]);

    const handleDeleteCar = async (carId, image) => {
        const fetchData = await deleteUserCar(token, carId, image, t)

        if (fetchData.success) {
            setDletedCarId(carId)

            setTimeout(() => {
                setDletedCarId(null)
            }, 2000)
        }
    };

    const handleOpenBlock = (carId) => {
        if (openNumberBlock === carId) {
            setOpenNumberBlock(null)
        } else {
            setOpenNumberBlock(carId)
        }
    };

    const handleSearchVehicle = () => {
        const code = inputReff.current.value.toLowerCase();
        setSearchMessage('');
        let found = false;

        if (!code) {
            setSearchMessage(t("pages.service.contentUserCar.listUserCars.setMessage"));
            return;
        }

        Object.keys(listCars).forEach((type) => {
            listCars[type].forEach((elem) => {
                const serial = elem.serial_number?.toLowerCase();
                const vin = elem.vin_number?.toLowerCase();
                const hin = elem.hin_number?.toLowerCase();

                if ([serial, vin, hin].includes(code)) {
                    if (blockReffs.current[elem.car_id]) {
                        blockReffs.current[elem.car_id].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        blockReffs.current[elem.car_id].focus();
                        found = true;
                    }
                }
            });
        });

        if (!found) {
            setSearchMessage(t("pages.service.contentUserCar.listUserCars.setMessageNotFound"));
        }
    };

    return (
        <>
            <BlockSearchStyle>
                <div>
                    <input
                        type="text"
                        id="vehicle-search"
                        ref={inputReff}
                        placeholder="VIN, HIN, Serial"
                    />
                    <button onClick={handleSearchVehicle}>{t("pages.service.contentUserCar.listUserCars.button")}</button>
                </div>
                <span>{searchMessage}</span>
            </BlockSearchStyle>
            <ContainerStyle>
                {Object.keys(listCars).length > 0 &&
                    Object.keys(listCars).map((type) => (
                        <div key={type}>
                            <h5>{typeNames[type] || t("pages.service.contentUserCar.listUserCars.unknown")}</h5>
                            {listCars[type].map((elem) => (
                                <BlockVehicleStyle
                                    key={elem.car_id}
                                    className={openNumberBlock === elem.car_id ? 'open' : ''}
                                    ref={(el) => (blockReffs.current[elem.car_id] = el)}
                                >
                                    <div>
                                        <img src={elem.image} alt="Image vehicle" />
                                        <BlockElementStyle>
                                            <ul>
                                                <li>{elem.brand}</li>
                                                <li>{elem.model}</li>
                                                <li>{elem.serial_number || elem.hin_number || elem.vin_number}</li>
                                            </ul>
                                            <ButtonDeleteCarStyle onClick={() => handleDeleteCar(elem.car_id, elem.image)}>{t("pages.service.contentUserCar.listUserCars.buttonDelete")}</ButtonDeleteCarStyle>
                                        </BlockElementStyle>
                                    </div>
                                    <DetalisBlockStyle>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>{t("formAddCar.label.brand")}</th>
                                                    <th>{t("formAddCar.label.model")}</th>
                                                    {elem.car_type && <th>{t("formAddCar.label.carType")}</th>}
                                                    {elem.serial_number && <th>{t("formAddCar.label.serialNumber")}</th>}
                                                    {elem.vin_number && <th>VIN </th>}
                                                    {elem.hin_number && <th>HIN </th>}
                                                    <th>{t("formAddCar.label.color")}</th>
                                                    <th>{t("formAddCar.label.year")}</th>
                                                    {elem.engine_volume && <th>{t("formAddCar.label.engineVolume")}</th>}
                                                    {elem.fuel_type && <th>{t("formAddCar.label.fuelType")}</th>}
                                                    {elem.mileage && <th>{t("formAddCar.label.mileage")}</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{elem.brand}</td>
                                                    <td>{elem.model}</td>
                                                    {elem.car_type && <td>{carType[elem.car_type]}</td>}
                                                    {elem.serial_number && <td>{elem.serial_number}</td>}
                                                    {elem.vin_number && <td>{elem.vin_number}</td>}
                                                    {elem.hin_number && <td>{elem.hin_number}</td>}
                                                    <td>{elem.color}</td>
                                                    <td>{elem.year}</td>
                                                    {elem.engine_volume && <td>{elem.engine_volume}</td>}
                                                    {elem.fuel_type && <td>{fuelType[elem.fuel_type]}</td>}
                                                    {elem.mileage && <td>{elem.mileage} {elem.mileage_unit}</td>}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </DetalisBlockStyle>
                                    <TitleAddRecordStyle>{t("pages.service.contentUserCar.listUserCars.p")}</TitleAddRecordStyle>
                                    <FormAddServiceRecord carId={elem.car_id} type={type} setChangeHistory={setChangeHistory} />
                                    <VehicleRepairHistory
                                        carIdAll={elem.car_id}
                                        changeHistory={changeHistory}
                                        setChangeHistory={setChangeHistory}
                                    />
                                    <UserNotesCar carId={elem.car_id} />
                                    <ButtonOpenStyle
                                        onClick={() => handleOpenBlock(elem.car_id)}
                                        className={openNumberBlock !== null && openNumberBlock === elem.car_id ? 'button-active' : null}
                                    >
                                        {(openNumberBlock !== null && openNumberBlock === elem.car_id) ? t("pages.service.contentUserCar.listUserCars.buttonOpen") : t("pages.service.contentUserCar.listUserCars.buttonClose")}
                                    </ButtonOpenStyle>
                                </BlockVehicleStyle>
                            ))}
                        </div>
                    ))
                }
                {removedCount > 0 &&
                    <MessageCountStyle>{t("pages.service.contentUserCar.listUserCars.removedCount.0")} <span>{removedCount}</span>
                        {removedCount === 1 && t("pages.service.contentUserCar.listUserCars.removedCount.1")}
                        {(removedCount === 2 || removedCount === 3 || removedCount === 4) && t("pages.service.contentUserCar.listUserCars.removedCount.234")}
                        {removedCount > 4 && t("pages.service.contentUserCar.listUserCars.removedCount.all")}
                    </MessageCountStyle>
                }
            </ContainerStyle>
        </>
    )
};