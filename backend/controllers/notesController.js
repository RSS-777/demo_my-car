const Notes = require('../models/Notes')
const logger = require('../utils/logger');

exports.createCarNotes = (req, res) => {
    const { text, carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid.' })
    }

    if (!text || text.trim() === '') {
        return res.status(422).json({ error: 'The field cannot be empty.' })
    }

    Notes.createNotes(userId, carId, text, (err, result) => {
        if (err) {
            logger.error('Error creating "note for car" entry.')
            return res.status(500).json({ message: 'Server error.' })
        }

        return res.status(201).json({ message: 'The entry was successfully created.' })
    })
};

exports.getCarNotes = (req, res) => {
    const { carId } = req.query
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid.' })
    }

    Notes.getNotes(userId, carId, (err, result) => {
        if (err) {
            logger.error('Error while receiving "car notes" entries.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(result)
    })
};

exports.updateCarNotes = (req, res) => {
    const { text, carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid.' })
    }

    if (!text || text.trim() === '') {
        return res.status(422).json({ error: 'The field cannot be empty.' })
    }

    if (text.length > 350) {
        return res.status(422).json({ message: 'The note text cannot exceed 350 characters.' })
    }

    Notes.updateNotes(userId, carId, text, (err, result) => {
        if (err) {
            logger.error('Error updating record. "notes".')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'The entry was not found or has not been modified.' })
        }

        return res.status(200).json({ message: 'Record updated successfully.' })
    })
};

exports.deleteCarNotes = (req, res) => {
    const { carId } = req.body
    const userId = req.user.userId

    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid.' })
    }

    Notes.deleteNotes(userId, carId, (err, result) => {
        if (err) {
            logger.error('Error deleting "notes" entry.')
            return res.status(500).json({ message: 'Server error.' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'The entry was not found or has already been deleted.' })
        }

        return res.status(200).json({ message: 'The entry was successfully deleted.' })
    })
};