const Category = require("../models/Category");
const { messages } = require("../constants/error");
const Pagination = require("../helpers/pagination");
const { uploadImage } = require("../extensions/upload");

module.exports.categories = async (req, res) => {
    try {
        const categoryQuery = new Pagination(
            Category.find({}),
            req.query
        ).paginating();

        const categories = await categoryQuery.query.sort({ name: 1 });

        const total = await Category.countDocuments({});

        return res.status(200).json({
            success: true,
            result: {
                categories,
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

module.exports.category = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: messages.CATEGORY_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            category,
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

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
        });

        const newCategory = await category.save();

        return res.status(200).json({
            success: true,
            category: newCategory,
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

        const category = await Category.findByIdAndUpdate(
            req.body.categoryId, { ...req.body }, { new: true }
        );

        return res.status(200).json({
            success: true,
            category,
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
        await Category.findByIdAndDelete(req.params.id);

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