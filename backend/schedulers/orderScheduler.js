const cron = require('node-cron');
const { resetExpiredTariffs, startNewTariff } = require('../services/orderService');
const logger = require('../utils/logger');

cron.schedule('0 0,12 * * *', async () => {
    const timestamp = new Date().toISOString();
    logger.info(`Запуск перевірки завершених замовлень... ${timestamp}`);

    try {
        await resetExpiredTariffs();
        logger.info(`resetExpiredTariffs виконано успішно ${new Date().toISOString()}`);
        await startNewTariff();
        logger.info(`startNewTariff виконано успішно ${new Date().toISOString()}`);
        logger.info(`Кінець перевірки... ${new Date().toISOString()}`);
    } catch (error) {
        logger.error(`Сталась помилка при перевірці: ${error.message}`);
    }
});

module.exports = cron;


