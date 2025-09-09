const Advertising = require('../models/Advertising');

exports.getAdvertising = (req, res) => {
    const lang = req.params.lang;

    if (!lang) {
        return res.status(400).json({ message: 'Unknown or missing language.' })
    };

    Advertising.getAdvertising(lang, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred on the server.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No entries found for this language.' })
        }

        return res.status(200).json(result)
    })
};

exports.getAdvertisingAll = (req, res) => {

    Advertising.getAdvertisingAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred on the server.' })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No records found.' })
        }

        return res.status(200).json(result)
    })
};

exports.updateAdvertising = (req, res) => {
    const data = req.body

    if(!Array.isArray(data)) {
        return res.status(400).json({ message: 'The data to be updated is in an incorrect format.'}) 
    }

    Advertising.updateAdvertising(data, (err, result) => {
        if(err) {
            return res.status(500).json({message: 'Server error.'})
        } 

        return res.status(200).json({message: 'Data updated successfully.'})
    })
};