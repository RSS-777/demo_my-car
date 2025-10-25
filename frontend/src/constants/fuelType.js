const FUEL_TYPE_OPTIONS = [
  { value: "petrol", labelKey: "formAddCar.select.fuelType.option.petrol" },
  { value: "diesel", labelKey: "formAddCar.select.fuelType.option.diesel" },
  { value: "electric", labelKey: "formAddCar.select.fuelType.option.electric" },
  { value: "hybrid", labelKey: "formAddCar.select.fuelType.option.hybrid" },
  { value: "gas", labelKey: "formAddCar.select.fuelType.option.gas" },
  { value: "hydrogen", labelKey: "formAddCar.select.fuelType.option.hydrogen" },
];

export const getFuelTypeOptions = (t) => {
  return FUEL_TYPE_OPTIONS.map(opt => ({ value: opt.value, label: t(opt.labelKey) }))
};

export const getFuelTypeName = (type, t) => {
  const option = FUEL_TYPE_OPTIONS.find(opt => opt.value === type);
  return t(option?.labelKey ?? "formAddCar.select.fuelType.option.unknown");
};