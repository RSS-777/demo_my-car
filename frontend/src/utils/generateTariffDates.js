const formatToMySQLDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 19).replace('T', ' '); 
};

export const generateTariffDates = (month) => {
    const startDate =  new Date();

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + month);

    return {
        startDate: formatToMySQLDate(startDate),
        endDate: formatToMySQLDate(endDate)
    }
};