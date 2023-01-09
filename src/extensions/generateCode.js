const { CHARACTERS_NUMBER, SUFFIX_CODE } = require("../constants/index");

module.exports.generateOrderCode = (length = 12) => {
    try {
        let code = SUFFIX_CODE;

        for (let i = 0; i < length; i++) {
            code += CHARACTERS_NUMBER.charAt(
                Math.floor(Math.random() * CHARACTERS_NUMBER.length)
            ).toUpperCase();
        }

        return code;
    } catch (e) {
        throw e;
    }
};