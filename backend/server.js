require('dotenv').config();
require('./schedulers/orderScheduler');
const logger = require('./utils/logger');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const priceRoutes = require('./routes/priceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const tariffRoutes = require('./routes/tariffRoutes');
const carsRoutes = require('./routes/carsRoutes');
const vehicleRoutes = require('./routes/vehicleRepairRoutes');
const ordersRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes');
const advertisingRoutes = require('./routes/advertisingRoutes');
const notesRoutes = require('./routes/notesRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const sendMessageRoutes = require('./routes/sendMessageRoutes');
const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tariff', tariffRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/advertising', advertisingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/feedback', sendMessageRoutes);
app.use('/api/statistics', statisticsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
});

app.listen(PORT, () => {
    logger.info(`Сервер запущено на порту ${PORT}`);
});