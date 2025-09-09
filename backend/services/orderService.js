const OrdersScheduler = require('../models/OrdersScheduler');
const logger = require('../utils/logger');

const resetExpiredTariffs = async () => {
    try {
        const users = await OrdersScheduler.getUsersWithDates()
        const currentDate = new Date()
        const allTariffsAreActive = users.every(user => new Date(user.tariff_end_date) > currentDate)

        if (allTariffsAreActive) {
            logger.info('There are no orders to delete.');
            return;
        }

        for (const user of users) {
            const userEndDate = new Date(user.tariff_end_date)

            if (userEndDate < currentDate) {
                const resultMessage = await OrdersScheduler.cancelTariff(user.user_id)
                logger.info(`User tariff ${user.user_id} ended. ${resultMessage}`);
            }
        }
    } catch (error) {
        logger.error(`Error while checking rates: ${error.message}`);
    }
};

const startNewTariff = async () => {
    try {
        const users = await OrdersScheduler.getUsersWithDates()
        const currentDate = new Date()
        const allNotComfirmed = users.every(user => user.status !== 'confirmed')

        if (allNotComfirmed) {
            logger.info('There are no orders to change rates.');
            return;
        }

        for (const user of users) {
            const userStartDate = new Date(user.tariff_start_date)

            if (userStartDate <= currentDate) {
                const response = await OrdersScheduler.changeTariff(user.user_id, user.tariff_change)

                if (response) {
                    logger.info(`Tariff successfully changed for user ${user.user_id}`);
                } else {
                    logger.warn('An error occurred while changing the tariff!');
                }
            }
        }
    } catch (error) {
        logger.error(`Error while checking rates: ${error.message}`);
    }
};

module.exports = { resetExpiredTariffs, startNewTariff }