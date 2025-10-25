const db = require('../config/db');

const Tariff = {
  requestTariffUpdate: (userId, tariff, orderCode, paymentMonths, amountDue, callback) => {
    const query = 'INSERT INTO orders (user_id, tariff_change, order_code, payment_months, amount_due) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [userId, tariff, orderCode, paymentMonths, amountDue], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  cancelTariffChangeRequest: (userId, orderCode, callback) => {
    const query = 'DELETE FROM orders WHERE user_id = ? AND order_code = ?';
    db.query(query, [userId, orderCode], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
  getTariffRequest: (callback) => {
    const query = 'SELECT * FROM orders';

    db.query(query, (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  changeTariff: (userId, tariff, callback) => {
    query = 'UPDATE users SET tariff = ?  WHERE user_id = ?'

    db.query(query, [tariff, userId], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
};

module.exports = Tariff;