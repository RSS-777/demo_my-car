const Statistics = require('../models/Statistics');
const logger = require('../utils/logger');

exports.getVisitStatistics = (req, res) => {
    Statistics.getStatistics((err, result) => {
        if (err) {
            logger.error('Server error while retrieving statistics.')
            return res.status(500).json({ message: 'Server error while retrieving statistics.' });
        }

        return res.status(200).json(result);
    });
};

exports.setVisitStatistics = (req, res) => {
    Statistics.setStatistics((err, result) => {
        if (err) {
            logger.error('Server error while writing statistics.')
            return res.status(500).json({ message: 'Server error while writing statistics.' });
        }

        return res.status(200).json({ message: 'The statistics counter has been successfully updated.' });
    });
};