const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
    publicId: String,
    url: String,
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    image: {
        type: ImageSchema,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        default: null
    }
}, {
    versionKey: false,
    timestamps: true,
});

UserSchema.index({ username: 1, email: 1 });

module.exports = model("user", UserSchema);