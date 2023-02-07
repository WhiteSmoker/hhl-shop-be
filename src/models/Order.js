const { Schema, Types, model } = require("mongoose");
const { ORDER_STATUS } = require("../constants/index");

const OrderSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    customerId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    byDate: {
      type: Date,
      default: Date.now(),
    },
    total: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PLACED,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

OrderSchema.index({ code: 1 });

module.exports = model("order", OrderSchema);
