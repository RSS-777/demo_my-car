const db = require('../config/db');

const User = {
  create: (firstName, lastName, email, hashedPassword, callback) => {
    const query = 'INSERT INTO users(first_name, last_name, email, password) VALUES (?,?,?,?)';
    db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  findEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    db.query(query, [email], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  deleteUser: (userId, callback) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  findById: (userId, callback) => {
    const query = `
      SELECT users.*, 
        orders.order_code, 
        orders.tariff_change, 
        orders.amount_due, 
        orders.payment_months, 
        orders.status, 
        orders.tariff_end_date, 
        orders.tariff_start_date
      FROM users
      LEFT JOIN orders 
        ON users.user_id = orders.user_id
      WHERE users.user_id = ?
    `;

    db.query(query, [userId], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result[0]);
      }
    });
  },
  changeProfile: (userId, firstName, lastName, personImage, callback) => {
    const query = 'UPDATE users SET first_name = ?, last_name = ?, person_image = ? WHERE user_id = ?';
    db.query(query, [firstName, lastName, personImage, userId], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  changePassword: (userId, hashedPassword, callback) => {
    const query = 'UPDATE users SET password = ? WHERE user_id = ?';
    db.query(query, [hashedPassword, userId], (err, result) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, result)
      }
    })
  },
  updateFailedAttempts: (userId, failedAttempts, lockUntil, callback) => {
    const query = `
      UPDATE users 
      SET failed_attempts = ?, account_locked_until = ? 
      WHERE user_id = ?
    `;
    db.query(query, [failedAttempts, lockUntil, userId], (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    });
  },
  resetFailedAttempts: (userId, callback) => {
    const query = `
      UPDATE users 
      SET failed_attempts = 0, account_locked_until = NULL 
      WHERE user_id = ?
    `;
    db.query(query, [userId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  checkLockStatus: (email, callback) => {
    const query = `
      SELECT user_id, failed_attempts, account_locked_until, password, tariff
      FROM users 
      WHERE email = ?
    `;
    db.query(query, [email], (err, result) => {
      if (err) {
        return callback(err);
      }
      if (result.length === 0) {
        return callback(null, { userExists: false });
      }
      return callback(null, { userExists: true, user: result[0] });
    });
  },
};

module.exports = User;