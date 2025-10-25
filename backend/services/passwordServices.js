const bcrypt = require('bcrypt');

const PasswordService = {
    hashPassword: async (password) => {
        return await bcrypt.hash(password, 10)
    },
    comparePassword: async (password, hashPassword) => {
        return await bcrypt.compare(password, hashPassword)
    }

};

module.exports = PasswordService;