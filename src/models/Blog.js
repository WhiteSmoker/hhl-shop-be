const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
    publicId: String,
    url: String,
});

const BlogSchema = new Schema({

    title: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    image: {
        type: ImageSchema,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

BlogSchema.index({ title: 1 });

module.exports = model('blog', BlogSchema)