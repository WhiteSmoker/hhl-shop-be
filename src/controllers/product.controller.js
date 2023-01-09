const { messages } = require("../constants/error");
const Product = require("../models/Product");
const Pagination = require("../helpers/pagination");
const { uploadImage } = require("../extensions/upload");
require("dotenv").config();

module.exports.products = async (req, res) => {
  try {
    const searchQuery = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : req.query.categoryId
      ? {
          categoryId: req.query.categoryId,
        }
      : {};

    const products = await Product.find({ ...searchQuery }).sort({
      createdAt: -1,
    });

    const total = await Product.countDocuments({ ...searchQuery });

    return res.status(200).json({
      success: true,
      result: {
        products,
        total,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      ["name", "description", "image"]
    );

    if (!product) {
      return res.status(400).json({
        success: false,
        message: messages.PRODUCT_NOT_EXIST,
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    if (!req.body.categoryId) {
      return res.status(400).json({
        success: false,
        message: messages.REQUIRED_CATEGORY,
      });
    }

    if (req.body.image && typeof req.body.image === "string") {
      const { error, result } = await uploadImage(req.body.image);
      if (error) {
        return res.status(400).json({
          success: false,
          message: messages.UPLOAD_FAIL,
        });
      } else {
        req.body.image = result;
      }
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      status: req.body.status,
      quantity: req.body.quantity,
      categoryId: req.body.categoryId,
    });

    const newProduct = await product.save();

    return res.status(200).json({
      success: true,
      product: newProduct,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    if (req.body.image && typeof req.body.image === "string") {
      const { error, result } = await uploadImage(req.body.image);
      if (error) {
        return res.status(400).json({
          success: false,
          message: messages.UPLOAD_FAIL,
        });
      } else {
        req.body.image = result;
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.body.productId,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
