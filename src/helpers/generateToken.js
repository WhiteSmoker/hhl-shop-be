const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (id, role, secretToken) => {
    try {
        return jwt.sign({ userId: id, userRole: role }, secretToken, {
            expiresIn: "90d",
        });
    } catch (err) {
        throw err;
    }
};