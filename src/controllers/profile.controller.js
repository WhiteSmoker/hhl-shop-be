const { messages } = require("../constants/error");
const User = require("../models/User");

module.exports.profile = async (req, res) => {
    try {
        const profile = await User.findById(req.params.id);

        if (!profile) {
            return res.status(400).json({
                success: false,
                message: messages.USER_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            profile,
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
        const updatedUser = await User.findByIdAndUpdate(
            req.body.profileId, { ...req.body.data }, { new: true }
        ).select(["-password"]);

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: messages.USER_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            profile: updatedUser,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};