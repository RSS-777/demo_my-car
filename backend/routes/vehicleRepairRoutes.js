const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleRepairController');

router.post('/create-entry', vehicleController.createVehicleRepair);
router.put('/update-entry', vehicleController.updateVehicleRepair);
router.delete('/delete-entry/:repairId', vehicleController.deleteVehicleRepair);
router.get('/get-entry/:carId', vehicleController.getVehicleRepair);

module.exports = router;