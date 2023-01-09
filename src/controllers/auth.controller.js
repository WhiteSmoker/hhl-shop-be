const User = require("../models/User");
const { messages } = require("../constants/error");
const { createAccessToken } = require("../helpers/generateToken");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const environments = require("../constants/environment");

module.exports.register = async (req, res) => {
    try {
        const existedEmail = await User.findOne({ email: req.body.email });

        if (existedEmail) {
            return res.status(400).json({
                success: false,
                message: messages.DUPLICATED_EMAIL,
            });
        }

        const existedUsername = await User.findOne({ username: req.body.username });

        if (existedUsername) {
            return res.status(400).json({
                success: false,
                message: messages.DUPLICATED_USERNAME,
            });
        }

        const existedPhoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });

        if (existedPhoneNumber) {
            return res.status(400).json({
                success: false,
                message: messages.DUPLICATED_PHONE_NUMBER,
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            phoneNumber: req.body.phoneNumber
        });

        const newUser = await user.save();

        const accessToken = await createAccessToken(
            newUser._id,
            newUser.role,
            environments.SECRET_TOKEN
        );

        const { password, ...result } = newUser._doc;

        return res.status(200).json({
            success: true,
            accessToken,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            role: 0,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: messages.USERNAME_NOT_EXIST,
            });
        }

        const validPass = await comparePassword(req.body.password, user.password);

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: messages.INVALID_PASSWORD,
            });
        }

        const accessToken = await createAccessToken(
            user._id,
            user.role,
            environments.SECRET_TOKEN
        );

        const { password, ...result } = user._doc;

        return res.status(200).json({
            success: true,
            accessToken,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.loginAdmin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, role: 1 });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: messages.USERNAME_NOT_EXIST,
            });
        }

        const validPass = await comparePassword(req.body.password, user.password);

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: messages.INVALID_PASSWORD,
            });
        }

        const accessToken = await createAccessToken(
            user._id,
            user.role,
            environments.SECRET_TOKEN
        );

        const { password, ...result } = user._doc;

        return res.status(200).json({
            success: true,
            accessToken,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};