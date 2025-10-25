const VEHICLE_CATEGORIES = [
  {
    groupLabelKey: "formAddCar.select.vehicleType.optgroupOne",
    options: [
      { value: "bicycle", labelKey: "formAddCar.select.vehicleType.option.bicycle" },
      { value: "scooter", labelKey: "formAddCar.select.vehicleType.option.scooter" },
      { value: "motorcycle", labelKey: "formAddCar.select.vehicleType.option.motorcycle" },
      { value: "atv", labelKey: "formAddCar.select.vehicleType.option.atv" },
      { value: "snowmobile", labelKey: "formAddCar.select.vehicleType.option.snowmobile" },
      { value: "car", labelKey: "formAddCar.select.vehicleType.option.car" },
      { value: "truck", labelKey: "formAddCar.select.vehicleType.option.truck" },
      { value: "bus", labelKey: "formAddCar.select.vehicleType.option.bus" },
    ],
  },
  {
    groupLabelKey: "formAddCar.select.vehicleType.optgroupTwo",
    options: [
      { value: "boat", labelKey: "formAddCar.select.vehicleType.option.boat" },
      { value: "jet_ski", labelKey: "formAddCar.select.vehicleType.option.jet_ski" },
      { value: "yacht", labelKey: "formAddCar.select.vehicleType.option.yacht" },
    ],
  },
  {
    groupLabelKey: "formAddCar.select.vehicleType.optgroupThree",
    options: [
      { value: "other", labelKey: "formAddCar.select.vehicleType.option.other" },
    ],
  },
];

export const getVehicleCategories = (t) => [
  { value: "", label: t("formAddCar.select.vehicleType.choiceOption") },
  ...VEHICLE_CATEGORIES.map(group => ({
    groupLabel: t(group.groupLabelKey),
    options: group.options.map(opt => ({
      value: opt.value,
      label: t(opt.labelKey),
    })),
  })),
];
