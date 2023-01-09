const { messages } = require("../constants/error");

const verifyTokenAdmin = async (req, res, next) => {
    try {
        if (req.userRole === 0) {
            return res.status(403).json({
                success: false,
                message: messages.AUTHORIZATION_ADMIN_ERROR,
            });
        }

        next();
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
};

module.exports = verifyTokenAdmin;