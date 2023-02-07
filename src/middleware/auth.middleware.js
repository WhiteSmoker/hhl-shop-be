const { messages } = require("../constants/error");
const jwt = require("jsonwebtoken");
const environments = require("../constants/environment");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: messages.AUTHORIZATION_ERROR,
      });
    }

    const decodedToken = jwt.decode(token, environments.SECRET_TOKEN);

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;

    next();
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

module.exports = verifyToken;
