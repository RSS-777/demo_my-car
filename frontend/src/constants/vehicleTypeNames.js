const VEHICLE_TYPE_NAMES = {
  bicycle: "pages.service.contentUserCar.listUserCars.typeNames.bicycle",
  scooter: "pages.service.contentUserCar.listUserCars.typeNames.scooter",
  motorcycle: "pages.service.contentUserCar.listUserCars.typeNames.motorcycle",
  atv: "pages.service.contentUserCar.listUserCars.typeNames.atv",
  snowmobile: "pages.service.contentUserCar.listUserCars.typeNames.snowmobile",
  car: "pages.service.contentUserCar.listUserCars.typeNames.car",
  truck: "pages.service.contentUserCar.listUserCars.typeNames.truck",
  bus: "pages.service.contentUserCar.listUserCars.typeNames.bus",
  boat: "pages.service.contentUserCar.listUserCars.typeNames.boat",
  jet_ski: "pages.service.contentUserCar.listUserCars.typeNames.jet_ski",
  yacht: "pages.service.contentUserCar.listUserCars.typeNames.yacht",
  other: "pages.service.contentUserCar.listUserCars.typeNames.other",
};

export const getVehicleTypeNames = (type, t) => {
  return t(VEHICLE_TYPE_NAMES[type] ?? "pages.service.contentUserCar.listUserCars.unknown");
};