const Product = require("../models/Product");
const { Types } = require("mongoose");

module.exports.calculateOrder = async (data) => {
    try {
        let error = false;
        const productIds = data.products.map((product) =>
            Types.ObjectId(product._id)
        );

        const productDocuments = await Product.find({
            _id: { $in: productIds },
        });

        const result = [];

        productDocuments.forEach((doc) => {
            data.products.find((p) => {
                if (JSON.stringify(p._id) === JSON.stringify(doc._id)) {
                    result.push({
                        ...p,
                        ...doc._doc,
                        _id: doc._id,
                        quantity: p.quantity
                    });
                }
            });
        });

        if (result.length === 0) {
            error = true;
        }

        // calculate subTotal
        const products = result.map((product) => {
            return {
                ...product,
                subTotal: Number(product.quantity) * Number(product.price),
            };
        });

        if (products.length === 0) {
            error = true;
        }


        // calculate total
        const total = products.map(pro => pro.subTotal).reduce(
            (pre, cur) => {
                return Number(pre) + Number(cur);
            }, 0
        );

        return {
            ...data,
            total,
            products,
            error,
        };
    } catch (e) {
        throw e;
    }
};