const { Schema, Types, model } = require("mongoose");

const ImageSchema = new Schema({
  publicId: String,
  url: String,
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      max: 1024,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: ImageSchema,
      default: null,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    quantity: [
      {
        color: String,
        size: String,
      },
    ],
    amount: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ProductSchema.index({ name: 1 });

module.exports = model("product", ProductSchema);
