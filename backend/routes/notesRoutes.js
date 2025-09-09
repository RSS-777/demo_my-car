const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const notesControler = require('../controllers/notesController');

router.post('/create-note', authMiddleware, notesControler.createCarNotes);
router.get('/get-note', authMiddleware, notesControler.getCarNotes);
router.patch('/update-note', authMiddleware, notesControler.updateCarNotes);
router.delete('/delete-note', authMiddleware, notesControler.deleteCarNotes);

module.exports = router;