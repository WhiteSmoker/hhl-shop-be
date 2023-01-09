const mongoose = require("mongoose");
const environments = require("../constants/environment");

module.exports.connectDB = async() => {
    try {
        await mongoose.connect(environments.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("🔵🔵🔵 connect database success !");
    } catch (err) {
        console.log("🔴🔴🔴 connect database fail !");
    }
};