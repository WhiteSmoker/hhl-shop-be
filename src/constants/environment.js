require("dotenv").config();

const environments = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI || "",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "pet_shop_ahihi",
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUD_FOLDER: process.env.CLOUD_FOLDER,
};

module.exports = environments;