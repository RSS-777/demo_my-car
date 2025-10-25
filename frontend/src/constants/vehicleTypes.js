export const VEHICLE_TYPE_OPTIONS = {
  car: [
    { value: "sedan", label: "formAddCar.select.carType.option.sedan" },
    { value: "hatchback", label: "formAddCar.select.carType.option.hatchback" },
    { value: "wagon", label: "formAddCar.select.carType.option.wagon" },
    { value: "coupe", label: "formAddCar.select.carType.option.coupe" },
    { value: "convertible", label: "formAddCar.select.carType.option.convertible" },
    { value: "suv", label: "formAddCar.select.carType.option.suv" },
    { value: "minivan", label: "formAddCar.select.carType.option.minivan" },
    { value: "crossover", label: "formAddCar.select.carType.option.crossover" },
    { value: "roadster", label: "formAddCar.select.carType.option.roadster" },
    { value: "pickup", label: "formAddCar.select.carType.option.pickup" },
  ],
  truck: [
    { value: "pickup", label: "formAddCar.select.carType.option.pickup" },
    { value: "flatbed", label: "formAddCar.select.carType.option.flatbed" },
    { value: "van", label: "formAddCar.select.carType.option.van" },
    { value: "tipper", label: "formAddCar.select.carType.option.tipper" },
  ],
  bus: [
    { value: "city", label: "formAddCar.select.carType.option.city" },
    { value: "coach", label: "formAddCar.select.carType.option.coach" },
    { value: "minibus", label: "formAddCar.select.carType.option.minibus" },
  ],
  motorcycle: [
    { value: "cruiser", label: "formAddCar.select.carType.option.cruiser" },
    { value: "sport", label: "formAddCar.select.carType.option.sport" },
    { value: "touring", label: "formAddCar.select.carType.option.touring" },
    { value: "dirt", label: "formAddCar.select.carType.option.dirt" },
  ],
};

export const getCarTypeOptions = (vehicleType, t) => {
  return VEHICLE_TYPE_OPTIONS[vehicleType]?.map(opt => ({
    value: opt.value,
    label: t(opt.label)
  })) || []
};

const ALL_VEHICLE_SUBTYPE_MAP = Object.values(VEHICLE_TYPE_OPTIONS)
  .flat()
  .reduce((acc, opt) => {
    acc[opt.value] = opt.label;
    return acc;
  }, {});

export const getVehicleSubtypeName = (type, t) => {
  return t(ALL_VEHICLE_SUBTYPE_MAP[type] ?? "formAddCar.select.carType.option.unknown");
};