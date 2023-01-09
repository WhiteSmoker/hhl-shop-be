const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
    publicId: String,
    url: String,
});

const CategorySchema = new Schema({
    name: {
        type: String,
        max: 1024,
    },
    description: {
        type: String,
        max: 1024,
    },
    image: {
        type: ImageSchema,
        default: null
    },
}, {
    versionKey: false,
    timestamps: true,
});

CategorySchema.index({ name: 1 });

module.exports = model("category", CategorySchema);