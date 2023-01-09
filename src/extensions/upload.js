const { cloudinary } = require("../utils/cloudinary.connect");
const environments = require("../constants/environment");

module.exports.uploadImage = async (image) => {
    try {
        let error = false
        let result
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: environments.CLOUD_FOLDER,
            })
            if (!(uploadResponse.public_id && uploadResponse.url)) {
                error = true
            } else {
                result = {
                    publicId: uploadResponse.public_id,
                    url: uploadResponse.url
                }
            }
        }
        return { error, result }
    } catch (e) {
        throw e
    }
}