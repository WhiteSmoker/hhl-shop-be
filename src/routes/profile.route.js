const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/profile.controller");

router.get("/:id", verifyToken, controller.profile);

router.put("/", verifyToken, controller.update);

module.exports = router;