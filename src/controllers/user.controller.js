const { messages } = require("../constants/error");
const User = require("../models/User");
const { hashPassword } = require("../helpers/hashPassword");
const Pagination = require("../helpers/pagination");
const { uploadImage } = require("../extensions/upload");

module.exports.users = async (req, res) => {
    try {

        const searchQuery = req.query.keyword ?
            { username: { $regex: req.query.keyword, $options: "i" } } :
            {};

        const userQuery = new Pagination(
            User.find({ ...searchQuery }).select([
                "-password",
            ]),
            req.query
        ).paginating();

        const users = await userQuery.query.sort({ username: 1 });

        const total = await User.countDocuments({
            ...searchQuery
        });

        return res.status(200).json({
            success: true,
            result: {
                users,
                total,
            },
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(["-password"]);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.create = async (req, res) => {
    try {
        const userExist = await User.findOne({
            username: req.body.username,
        }).select(["-password"]);

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: messages.USER_EXIST,
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        if (req.body.image && typeof req.body.image === 'string') {
            const { error, result } = await uploadImage(req.body.image)
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: messages.UPLOAD_FAIL
                })
            } else {
                req.body.image = result
            }
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            image: req.body.image
        });

        const newUser = await user.save();

        const { password, ...result } = newUser._doc;

        return res.status(200).json({
            success: true,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.update = async (req, res) => {
    try {

        if (req.body.image && typeof req.body.image === 'string') {
            const { error, result } = await uploadImage(req.body.image)
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: messages.UPLOAD_FAIL
                })
            } else {
                req.body.image = result
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.body.id, { ...req.body }, { new: true }
        ).select(["-password"]);

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: messages.USER_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};