const month = {
  1: "FormChangeTariff.blockFieldStyle.optionMonths.1",
  2: "FormChangeTariff.blockFieldStyle.optionMonths.2",
  3: "FormChangeTariff.blockFieldStyle.optionMonths.3",
  4: "FormChangeTariff.blockFieldStyle.optionMonths.4",
  5: "FormChangeTariff.blockFieldStyle.optionMonths.5",
  6: "FormChangeTariff.blockFieldStyle.optionMonths.6",
  7: "FormChangeTariff.blockFieldStyle.optionMonths.7",
  8: "FormChangeTariff.blockFieldStyle.optionMonths.8",
  9: "FormChangeTariff.blockFieldStyle.optionMonths.9",
  10: "FormChangeTariff.blockFieldStyle.optionMonths.10",
  11: "FormChangeTariff.blockFieldStyle.optionMonths.11",
  12: "FormChangeTariff.blockFieldStyle.optionMonths.12"
};

export const getOptionMonth = (t) => {
  return Object.entries(month).map(([key, translationKey]) => ({
    value: key,
    label: t(translationKey),
  }))
};
