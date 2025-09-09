const cron = require('node-cron');
const { resetExpiredTariffs, startNewTariff } = require('../services/orderService');
const logger = require('../utils/logger');

cron.schedule('0 0,12 * * *', async () => { 
    const timestamp = new Date().toISOString();
    logger.info(`Running a check on completed orders... ${timestamp}`);

    try {
        await resetExpiredTariffs();
        logger.info(`resetExpiredTariffs completed successfully ${new Date().toISOString()}`);
        await startNewTariff();
        logger.info(`startNewTariff completed successfully ${new Date().toISOString()}`);
        logger.info(`End of check... ${new Date().toISOString()}`);
    } catch (error) {
        logger.error(`An error occurred while checking: ${error.message}`);
    }
});

module.exports = cron;