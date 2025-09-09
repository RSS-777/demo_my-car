const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig')
const errorMulterMiddleware = require('../middleware/errorMulterMiddleware')

router.post('/create-car', authMiddleware, upload.single('image'), carsController.createNewCar, errorMulterMiddleware);
router.get('/get-cars', authMiddleware, carsController.getUserCars);
router.delete('/delete-car/:carId',  authMiddleware, carsController.deleteUserCar);

module.exports = router;