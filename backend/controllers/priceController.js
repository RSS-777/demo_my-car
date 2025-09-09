const Price = require('../models/Price');
const logger = require('../utils/logger');

exports.gettingPrice = (req, res) => {
    Price.getAllPrice((err, result) => {
        if (err) {
            logger.error('Error retrieving all rates.')
            return res.status(500).json({ message: 'Server error.' })
        } else {
            return res.status(200).json({
                message: 'Data successfully received.',
                data: result
            })
        }
    })
};

exports.changePrice = (req, res) => {
    const tariffs = req.body

    if(!Array.isArray(tariffs) || tariffs.length === 0) {
        return res.status(422).json({message: 'There are no renewal fees.'})
    }

    const invalidTariff = tariffs.find(tariff => tariff.price === undefined)
    if (invalidTariff) {
        return res.status(400).json({ message: 'The price must be indicated.' })
    }

    Price.changePrice(tariffs, (err, result) => {
        if (err) {
            logger.error('Error when changing tariffs.')
            return res.status(500).json({ message: 'Server error.' })
        }  

        return res.status(200).json({ message: 'Price changed successfully.' })
    })
};
