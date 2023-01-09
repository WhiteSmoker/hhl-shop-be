const bcrypt = require("bcryptjs");

module.exports.hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (e) {
        throw e;
    }
};

module.exports.comparePassword = async(password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (e) {
        throw e;
    }
};