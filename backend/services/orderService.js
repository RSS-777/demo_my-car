const OrdersScheduler = require('../models/OrdersScheduler');
const logger = require('../utils/logger');

const resetExpiredTariffs = async () => {
    try {
        const users = await OrdersScheduler.getUsersWithDates()
        const currentDate = new Date()
        const allTariffsAreActive = users.every(user => new Date(user.tariff_end_date) > currentDate)

        if (allTariffsAreActive) {
            logger.info('Немає замовлень для видалення.');
            return;
        }

        for (const user of users) {
            const userEndDate = new Date(user.tariff_end_date)

            if (userEndDate < currentDate) {
                const resultMessage = await OrdersScheduler.cancelTariff(user.user_id)
                logger.info(`Тариф користувача ${user.user_id} зкінчився. ${resultMessage}`);
            }
        }
    } catch (error) {
        logger.error(`Помилка під час перевірки тарифів: ${error.message}`);
    }
};

const startNewTariff = async () => {
    try {
        const users = await OrdersScheduler.getUsersWithDates()
        const currentDate = new Date()
        const allNotComfirmed = users.every(user => user.status !== 'confirmed')

        if (allNotComfirmed) {
            logger.info('Немає замовлень на зміну тарифів.');
            return;
        }

        for (const user of users) {
            const userStartDate = new Date(user.tariff_start_date)

            if (userStartDate <= currentDate) {
                const response = await OrdersScheduler.changeTariff(user.user_id, user.tariff_change)

                if (response) {
                    logger.info(`Тариф успішно змінено користувачеві ${user.user_id}`);
                } else {
                    logger.warn('Сталась помилка при зміні тарифу!');
                }
            }
        }
    } catch (error) {
        logger.error(`Помилка під час перевірки тарифів: ${error.message}`);
    }
};

module.exports = { resetExpiredTariffs, startNewTariff }